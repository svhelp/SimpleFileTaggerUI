import { Card } from "antd";
import { TagModel } from "api/partial/location";
import styled from "styled-components";

interface ILocationTagCardProps {
    tag: TagModel;
}

export const LocationTagCard = ({ tag }: ILocationTagCardProps) => {
    return (
        <CardContainer>
            <p>
                {tag.name}
            </p>
        </CardContainer>
    );
};

const CardContainer = styled(Card)`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
    height: 120px;

    cursor: pointer;
`
