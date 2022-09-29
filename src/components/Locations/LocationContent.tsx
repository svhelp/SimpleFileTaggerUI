import { useLocation } from "react-router-dom";
import { LocationCard } from "./LocationCard";
import styled from "styled-components";
import { Space } from "antd";
import { TaggerDirectoryInfo, useLocationAddTagsMutation } from "api/partial/location";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { NewCard } from "components/Common/NewCard/NewCard";
import { useState } from "react";
import { BindTagModal } from "./BindTagModal";

interface ILocationContentProps {
    locations: TaggerDirectoryInfo[];
}

export const LocationContent = ({ locations }: ILocationContentProps) => {
    const path = useLocation();
    const [ isAddingTag, setIsAddingTag ] = useState(false);

    const pathSnippets = path.pathname.split('/').filter(i => i).slice(1);

    const location = getTargetLocation(pathSnippets, {
        id: '',
        path: '',
        name: '',
        children: locations || [],
        tags: [],
    });

    const [ addTag, {} ] = useLocationAddTagsMutation();

    return (
        <>
            {location.children.length > 0 &&
                <>
                    <LocationSubheader>
                        Locations
                    </LocationSubheader>
                    <Space wrap>
                        {location.children.map(l =>
                            <LocationCard key={l.path} location={l} />)}
                    </Space>
                </>}

            {location.tags.length > 0 &&
                <>
                    <LocationSubheader>
                        Tags
                    </LocationSubheader>
                    <Space wrap>
                        {location.tags.map(t =>
                            <TagContainer key={t.id} title={t.name} />)}
                        <NewCard onClick={() => setIsAddingTag(true)}/>
                    </Space>
                </>}

            <BindTagModal
                isModalOpen={isAddingTag}
                onAdd={(tags) => addTag({
                    updateLocationCommandModel: {
                        path: location.path,
                        tags: tags.split(' ')
                    }
                })}
                closeModal={() => setIsAddingTag(false)} />
        </>
    );
};

const getTargetLocation = (pathSnippets: string[], location?: TaggerDirectoryInfo): TaggerDirectoryInfo => {
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
