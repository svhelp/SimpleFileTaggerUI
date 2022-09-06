import { TaggerDirectoryInfo } from "domain/TaggerDirectoryInfo";
import { useLocation } from "react-router-dom";
import { LocationTagCard } from "./LocationTagCard";
import { LocationCard } from "./LocationCard";

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
        <div>
            {location.children.map(l => <LocationCard location={l} />)}
            {location.tags.map(t => <LocationTagCard tag={t} />)}
        </div>
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
