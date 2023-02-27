import { useState, useCallback, useEffect } from "react";
import { CreateLocationModal } from "./CreateLocationModal";
import { LocationPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationDrawer } from "./LocationDrawer";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { LocationNewCard } from "components/Common/Location/LocationNewCard";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useOpenDirectory } from "customHooks/useOpenDirectory";

interface ILocationContentProps {
    currentLocation: LocationPlainModel | undefined;
    locations: LocationPlainModel[];
    selectedLocations: string[];
    setSelectedLocations: (elementId: string, e: CheckboxChangeEvent) => void;
    clearSelection: () => void;
    goToLocation: (locations: LocationPlainModel) => void;
    goToPreviousLocation: (locations: LocationPlainModel[]) => void;
}

export const LocationContent = (props: ILocationContentProps) => {
    const { currentLocation, locations, selectedLocations, setSelectedLocations, clearSelection, goToLocation, goToPreviousLocation } = props;

    const openDirectory = useOpenDirectory();

    const [ isAddingLocation, setIsAddingLocation ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState<LocationPlainModel | undefined>(undefined);

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
        ? locations.filter(l => l.parentId === currentLocation.id)
        : locations.filter(l => !l.parentId);

    useEffect(() => {
        if (!!currentLocation && locationsToShow.length === 0) {
            clearSelection();
            goToPreviousLocation(locations);
        }
    })

    return (
        <>
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
                <LocationNewCard onClick={() => setIsAddingLocation(true)} />
            </Space>

            <LocationDrawer
                location={selectedLocation}
                closeDrawer={() => setSelectedLocation(undefined)}
            />

            <CreateLocationModal
                isModalOpen={isAddingLocation}
                closeModal={() => setIsAddingLocation(false)} />
        </>
    );
};
