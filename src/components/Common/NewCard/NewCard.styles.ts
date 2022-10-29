import { Card } from "antd";
import styled from "styled-components";

interface NewCardContainerProps {
    width: string;
    height: string;
}

export const NewCardContainer = styled(Card)<NewCardContainerProps>`
    width: ${({width}) => width};
    height: ${({height}) => height};

    .ant-card-body {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 0;

        cursor: pointer;

        p {
            overflow-wrap: anywhere;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`