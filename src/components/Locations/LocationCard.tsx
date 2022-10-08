import { LocationCardContainer } from "components/Common/CardContainer";
import { LocationModel } from "domain/models";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ILocationCardProps {
    location: LocationModel;
}

export const LocationCard = ({ location }: ILocationCardProps) => {
    const path = useLocation();
    const navigate = useNavigate();

    const onTabClick = useCallback(() => {
        navigate(`${path.pathname}/${location.name}`, { replace: true });
    }, [navigate]);

    return (
        <LocationCardContainer onClick={onTabClick}>
            <p>
                {location.name}
            </p>
        </LocationCardContainer>
    );
};
