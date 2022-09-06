import { Card } from "antd";
import { TaggerDirectoryInfo } from "domain/TaggerDirectoryInfo";
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
        <Card onClick={onTabClick}>
            <p>
                {location.name}
            </p>
        </Card>
    );
};
