import { useMarkNotFoundMutation } from "api/enchanced/location";
import { LocationPlainModel } from "domain/models";
import { useCallback } from "react";
import { useQueryResult } from "./useQueryResult";

export const useOpenDirectory = () => {
    const [ markNotFoundQuery, markNotFoundResult ] = useMarkNotFoundMutation();
    
    useQueryResult(markNotFoundResult);

    const openDirectory = useCallback(async (location: LocationPlainModel) => {
        const locationOpenedError = await window.electron.shell.openLocation(location.path);
    
        if (!!locationOpenedError){
            markNotFoundQuery({locationId: location.id});
        }
    }, [ markNotFoundQuery ]);

    return openDirectory;
}
