import { useCallback, useEffect } from "react";
import { LocationPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useOpenDirectory } from "customHooks/useOpenDirectory";
import { useLocationsNavigation } from "customHooks/useLocationsNavigation";

interface ILocationsTreeContentProps {
    locations: LocationPlainModel[];
    selectedLocations: string[];
    setSelectedLocation: (element: LocationPlainModel) => void;
    setSelectedLocations: (elementId: string, e: CheckboxChangeEvent) => void;
    clearSelection: () => void;
}

export const LocationsTreeContent = (props: ILocationsTreeContentProps) => {
    const {
        locations,
        selectedLocations,
        setSelectedLocation,
        setSelectedLocations,
        clearSelection,
    } = props;

    const openDirectory = useOpenDirectory();
    const {
        currentLocation,
        goToLocation,
        goToPreviousLocation,
    } = useLocationsNavigation();

    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(removeLocationResult);

    const onTabClick = useCallback((location: LocationPlainModel) => {
        const children = locations.filter(l => l.parentId === location.id);
        if (children.length === 0){
            return;
        }

        clearSelection();
        goToLocation(location);
    }, [ locations, clearSelection, goToLocation ]);

    const locationsToShow = !!currentLocation
        ? locations.filter(l => l.parentId === currentLocation)
        : locations.filter(l => !l.parentId);

    useEffect(() => {
        if (!!currentLocation && locationsToShow.length === 0) {
            clearSelection();
            goToPreviousLocation();
        }
    })

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {locationsToShow.map(l =>
                <LocationContainer
                    key={l.path}
                    title={l.name}
                    notFound={l.notFound}
                    isSelected={selectedLocations.includes(l.id)}
                    onSelect={(e) => setSelectedLocations(l.id, e)}
                    onClick={() => setSelectedLocation(l)}
                    onDoubleClick={() => onTabClick(l)}
                    onOpen={() => openDirectory(l)}
                    onEdit={() => setSelectedLocation(l)}
                    onRemove={() => removeLocation({ removeLocationCommandModel: { locationId: l.id, isRecoursive: false } })} />)}
        </Space>
    );
};
