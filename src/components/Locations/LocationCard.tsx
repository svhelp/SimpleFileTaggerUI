import { TaggerDirectoryInfo } from "api/partial/location";
import { CardContainer } from "components/Common/CardContainer";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ILocationCardProps {
    location: TaggerDirectoryInfo;
}

export const LocationCard = ({ location }: ILocationCardProps) => {
    const path = useLocation();
    const navigate = useNavigate();

    const onTabClick = useCallback(() => {
        navigate(`${path.pathname}/${location.name}`, { replace: true });
    }, [navigate]);

    return (
        <CardContainer onClick={onTabClick}>
            <p>
                {location.name}
            </p>
        </CardContainer>
    );
};
