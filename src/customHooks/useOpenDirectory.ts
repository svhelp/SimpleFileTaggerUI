import { useMarkNotFoundMutation } from "api/enchanced/location";
import { LocationModel } from "domain/models";
import { useCallback } from "react";
import { useQueryResult } from "./useQueryResult";

export const useOpenDirectory = () => {
    const [ markNotFoundQuery, markNotFoundResult ] = useMarkNotFoundMutation();
    
    useQueryResult(markNotFoundResult);

    const openDirectory = useCallback(async (location: LocationModel) => {
        const locationOpenedError = await window.electron.shell.openLocation(location.path);
    
        if (!!locationOpenedError){
            const locationIdsToMarkNotFound = getLocationIds(location);
            markNotFoundQuery({locationIds: locationIdsToMarkNotFound});
        }
    }, [ markNotFoundQuery ]);

    return openDirectory;
}

const getLocationIds = (location: LocationModel) => {
    if (!location.children || location.children.length === 0){
        return [ location.id ];
    }

    const childrenData: string[] =
        location.children.reduce((acc, l) => acc.concat(getLocationIds(l)), [] as string[])

    return childrenData.concat([ location.id ]);
}
