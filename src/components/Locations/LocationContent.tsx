import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState, useCallback } from "react";
import { CreateLocationModal } from "./CreateLocationModal";
import { LocationModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";
import { LocationDrawer } from "./LocationDrawer";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Space } from "antd";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { LocationNewCard } from "components/Common/Location/LocationNewCard";

interface ILocationContentProps {
    locations: LocationModel[];
}

export const LocationContent = ({ locations }: ILocationContentProps) => {
    const navigate = useNavigate();

    const [ selectedLocations, setSelectedLocations ] = useSelectedItems();
    const [ isAddingLocation, setIsAddingLocation ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState<LocationModel | undefined>(undefined);

    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(removeLocationResult);

    const path = useLocation();
    const pathSnippets = path.pathname.split('/').filter(i => i).slice(1);

    const location = getTargetLocation(pathSnippets, {
        id: '',
        path: '',
        name: '',
        children: locations || [],
        tagIds: [],
    });

    const onTabClick = useCallback((location: LocationModel) => {
        if (location.children.length === 0){
            return;
        }

        navigate(`${path.pathname}/${location.name}`, { replace: true });
    }, [navigate]);

    return (
        <>
            {location.children.length > 0 &&
                <>
                    <LocationSubheader>
                        Locations
                    </LocationSubheader>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        {location.children.map(l =>
                            <LocationContainer
                                key={l.path}
                                title={l.name}
                                isSelected={selectedLocations.includes(l.id)}
                                onSelect={(e) => setSelectedLocations(l.id, e)}
                                onEdit={() => setSelectedLocation(l)}
                                onClick={() => onTabClick(l)}
                                onRemove={() => removeLocation({id: l.id})} />)}
                        <LocationNewCard onClick={() => setIsAddingLocation(true)} />
                    </Space>
                </>}

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

const getTargetLocation = (pathSnippets: string[], location?: LocationModel): LocationModel => {
    if (!location) {
        throw new Error("Location not found.");
    }

    if (pathSnippets.length === 0) {
        return location;
    }

    const levelName = pathSnippets[0];
    return getTargetLocation(pathSnippets.slice(1), location.children.find(l => l.name === levelName));
};

const LocationSubheader = styled.h2`
    position: sticky;
    top: 0;
    background: #f0f2f5;
    z-index: 2;
`
