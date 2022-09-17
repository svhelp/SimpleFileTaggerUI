import { TaggerDirectoryInfo } from "domain/TaggerDirectoryInfo";
import { useLocation } from "react-router-dom";
import { LocationTagCard } from "./LocationTagCard";
import { LocationCard } from "./LocationCard";
import styled from "styled-components";
import { Space } from "antd";

interface ILocationContentProps {
    locations: TaggerDirectoryInfo[];
}

export const LocationContent = ({ locations }: ILocationContentProps) => {
    const path = useLocation();

    const pathSnippets = path.pathname.split('/').filter(i => i).slice(1);

    const location = getTargetLocation(pathSnippets, {
        path: '',
        name: '',
        children: locations || [],
        tags: [],
    });

    return (
        <>
            {location.children.length > 0 &&
                <>
                    <LocationSubheader>
                        Locations
                    </LocationSubheader>
                    <Space wrap>
                        {location.children.map(l => <LocationCard key={l.path} location={l} />)}
                    </Space>
                </>}

            {location.tags.length > 0 &&
                <>
                    <LocationSubheader>
                        Tags
                    </LocationSubheader>
                    <Space wrap>
                        {location.tags.map(t => <LocationTagCard key={t.id} tag={t} />)}
                    </Space>
                </>}
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