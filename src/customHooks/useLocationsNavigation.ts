import { LocationPlainModel } from "domain/models";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useLocationsNavigation = () => {
    const currentPath = useLocation();
    const navigate = useNavigate();

    const [ currentLocation, setCurrentLocation ] =
        useState<LocationPlainModel | undefined>(undefined);

    const goToLocation = useCallback((location: LocationPlainModel) => {
        setCurrentLocation(location)
        navigate(`${currentPath.pathname}/${location.name}`);
    }, [ setCurrentLocation, navigate ]);

    const goToPreviousLocation = useCallback((locations: LocationPlainModel[]) => {
        const prevLocation = locations.find(l => l.id === currentLocation?.parentId);

        setCurrentLocation(prevLocation);
        navigate(-1);
    }, [ currentLocation, setCurrentLocation, navigate ]);

    return {
        currentLocation,
        goToLocation,
        goToPreviousLocation,
    };
}