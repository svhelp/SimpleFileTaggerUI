import { Card } from "antd";
import styled from "styled-components";

export const NewCardContainer = styled(Card)`
    width: 240px;
    height: 160px;

    .ant-card-body {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        p {
            overflow-wrap: anywhere;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`