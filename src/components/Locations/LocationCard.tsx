import { Card } from "antd";
import { TaggerDirectoryInfo } from "api/partial/location";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const CardContainer = styled(Card)`
    width: 200px;
    height: 120px;

    cursor: pointer;

    .ant-card-body {
        height: 100%;

        p {
            height: 100%;
            overflow-wrap: anywhere;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`
