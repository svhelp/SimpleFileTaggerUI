import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Space } from "antd";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useState, useCallback } from "react";
import { BindTagModal } from "./BindTagModal";
import { LocationModel } from "domain/models";
import { useTagGetQuery } from "api/enchanced/tag";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationAddTagsMutation, useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { LocationDrawer } from "./LocationDrawer";

interface ILocationContentProps {
    locations: LocationModel[];
}

export const LocationContent = ({ locations }: ILocationContentProps) => {
    const navigate = useNavigate();

    const [ isAddingTag, setIsAddingTag ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState<LocationModel | undefined>(undefined);

    const { data: tags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ createLocation, createLocationResult ] = useLocationAddTagsMutation();
    const [ updateLocation, updateLocationResult ] = useLocationSetTagsMutation();
    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(createLocationResult);
    useQueryResult(updateLocationResult);
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
        navigate(`${path.pathname}/${location.name}`, { replace: true });
    }, [navigate]);

    return (
        <>
            {location.children.length > 0 &&
                <>
                    <LocationSubheader>
                        Locations
                    </LocationSubheader>
                    <Space wrap>
                        {location.children.map(l =>
                            <TagContainer
                                key={l.path}
                                title={l.name}
                                isSelected={false}
                                onEdit={() => setSelectedLocation(l)}
                                onClick={() => onTabClick(l)}
                                onRemove={() => removeLocation({id: l.id})} />)}
                    </Space>
                </>}

            <LocationDrawer
                location={selectedLocation}
                availableTags={tags ?? []}
                updateTags={ids => updateLocation({updateLocationCommandModel: {path: selectedLocation!.path, tags: ids }})}
                closeDrawer={() => setSelectedLocation(undefined)}
            />

            <BindTagModal
                isModalOpen={isAddingTag}
                onAdd={(tags) => createLocation({
                    updateLocationCommandModel: {
                        path: location.path,
                        tags: tags.split(' ')
                    }
                })}
                closeModal={() => setIsAddingTag(false)} />
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
