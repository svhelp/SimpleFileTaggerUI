import { LocationPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { useOpenDirectory } from "customHooks/useOpenDirectory";
import { usePerformRecoursiveAction } from "customHooks/usePerformRecoursiveAction";

interface ILocationsListContentProps {
    locations: LocationPlainModel[];
    selectedLocations: string[];
    setSelectedLocations: (elementId: string) => void;
}

export const LocationsListContent = (props: ILocationsListContentProps) => {
    const {
        locations,
        selectedLocations,
        setSelectedLocations,
    } = props;

    const openDirectory = useOpenDirectory();

    const [ removeLocationQuery, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(removeLocationResult);

    const removeLocation = usePerformRecoursiveAction(
        "The directory contains children",
        "Do you want to remove sub-directories as well?",
        (location: LocationPlainModel, isRecoursive: boolean) =>
            removeLocationQuery({ removeLocationCommandModel: { locationId: location.id, isRecoursive: isRecoursive } }),
        locations
    );

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {locations.map(l =>
                <LocationContainer
                    key={l.id}
                    location={l}
                    isSelected={selectedLocations.includes(l.id)}
                    onClick={() => setSelectedLocations(l.id)}
                    onDoubleClick={openDirectory}
                    onOpen={openDirectory}
                    onRemove={removeLocation}
                    isSelectionActive />)}
        </Space>
    );
};
