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

        :hover img {
            filter: brightness(0.7);
        }
        
        :hover p {
            font-size: 20px;
        }
    }
`

export const TagBackground = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;

    filter: brightness(0.9);

    transition: filter 0.2s;
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
        
    p {
        background: #0006;
        width: 100%;
        margin: 0;
        text-align: center;

        overflow-wrap: anywhere;
        text-overflow: ellipsis;
        overflow: hidden;

        font-weight: 600;
        color: white;
        text-transform: uppercase;
        font-size: 18px;

        z-index: 1;
        
        transition: font-size 0.2s;
    }
`