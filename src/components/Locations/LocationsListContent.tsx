import { LocationPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useOpenDirectory } from "customHooks/useOpenDirectory";

interface ILocationsListContentProps {
    locations: LocationPlainModel[];
    selectedLocations: string[];
    setSelectedLocation: (element: LocationPlainModel) => void;
    setSelectedLocations: (elementId: string, e: CheckboxChangeEvent) => void;
}

export const LocationsListContent = (props: ILocationsListContentProps) => {
    const {
        locations,
        selectedLocations,
        setSelectedLocation,
        setSelectedLocations,
    } = props;

    const openDirectory = useOpenDirectory();

    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(removeLocationResult);

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {locations.map(l =>
                <LocationContainer
                    key={l.path}
                    title={l.name}
                    notFound={l.notFound}
                    isSelected={selectedLocations.includes(l.id)}
                    onSelect={(e) => setSelectedLocations(l.id, e)}
                    onClick={() => setSelectedLocation(l)}
                    onDoubleClick={() => openDirectory(l)}
                    onOpen={() => openDirectory(l)}
                    onEdit={() => setSelectedLocation(l)}
                    onRemove={() => removeLocation({ removeLocationCommandModel: { locationId: l.id, isRecoursive: false } })} />)}
        </Space>
    );
};
