import { Card } from "antd";
import styled from "styled-components";

export const LocationCardContainer = styled(Card)`
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