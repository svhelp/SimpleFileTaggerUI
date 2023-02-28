import { LocationPlainModel } from "domain/models";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useLocationsNavigation = () => {
    const currentPath = useLocation();
    const navigate = useNavigate();

    const goToLocation = useCallback((location: LocationPlainModel) => {
        navigate(`${currentPath.pathname}/${location.id}`);
    }, [ currentPath, navigate ]);

    const goToPreviousLocation = useCallback(() => {
        navigate(-1);
    }, [ navigate ]);

    const currentLocation = useMemo(() => {
        const lastPathPart = currentPath.pathname.split('/').filter(i => i).pop();
        
        return lastPathPart === "locations"
            ? undefined
            : lastPathPart;
    }, [ currentPath ]);
    

    return {
        currentPath,
        currentLocation,
        goToLocation,
        goToPreviousLocation,
    };
}