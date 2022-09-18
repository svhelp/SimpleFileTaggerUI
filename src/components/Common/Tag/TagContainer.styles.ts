import { Card } from "antd";
import styled from "styled-components";

export const TagCardContainer = styled(Card)`
    width: 240px;
    height: 160px;

    .ant-card-body {
        display: flex;

        height: 100%;
        padding: 0;

        cursor: pointer;

        p {
            overflow-wrap: anywhere;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`

export const TagToolbar = styled.div`
    display: flex;
    justify-content: flex-end;

    position: absolute;
    width: 100%;
`

export const TagNameContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`