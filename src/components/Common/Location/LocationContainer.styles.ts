import { Card } from "antd";
import styled from "styled-components";

export const LocationCardContainer = styled(Card)`
    width: 100%;

    .ant-card-body {
        display: flex;

        height: 100%;
        padding: 0;

        label {
            padding: 4px;
        }
    }
`

export const LocationToolbar = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const LocationNameContainer = styled.div`
    display: flex;
    align-items: center;

    width: 100%;

    cursor: pointer;

    p {
        overflow-wrap: anywhere;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 0;
    }
`