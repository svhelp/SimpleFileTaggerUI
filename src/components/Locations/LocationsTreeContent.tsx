import { useCallback, useEffect } from "react";
import { LocationPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useOpenDirectory } from "customHooks/useOpenDirectory";
import { useLocationsNavigation } from "customHooks/useLocationsNavigation";
import { usePerformRecoursiveAction } from "customHooks/usePerformRecoursiveAction";

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

    const [ removeLocationQuery, removeLocationResult ] = useLocationRemoveMutation();
    
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
    
    const removeLocation = usePerformRecoursiveAction(
        "The directory contains children",
        "Do you want to remove sub-directories as well?",
        (location: LocationPlainModel, isRecoursive: boolean) =>
            removeLocationQuery({ removeLocationCommandModel: { locationId: location.id, isRecoursive: isRecoursive } }),
        locations
    );

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {locationsToShow.map(l =>
                <LocationContainer
                    key={l.id}
                    location={l}
                    isSelected={selectedLocations.includes(l.id)}
                    onSelect={(e) => setSelectedLocations(l.id, e)}
                    onClick={setSelectedLocation}
                    onDoubleClick={onTabClick}
                    onOpen={openDirectory}
                    onEdit={setSelectedLocation}
                    onRemove={removeLocation} />)}
        </Space>
    );
};
