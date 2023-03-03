import { Card } from "antd";
import styled from "styled-components";

interface IWizardTagBackgroundProps {
    isSelected?: boolean;
    isSelectionActive?: boolean;
}

export const WizardTagCardContainer = styled(Card)`
    width: 240px;
    height: 160px;

    .ant-card-body {
        display: flex;

        height: 100%;
        padding: 0;

        cursor: pointer;

        label {
            position: absolute;
            margin: 4px;
        }

        :hover img {
            filter: grayscale(0);
        }
        
        :hover p {
            font-size: 20px;
        }
    }
`

export const WizardTagBackground = styled.img<IWizardTagBackgroundProps>`
    width: 100%;
    height: 100%;
    position: absolute;
    object-fit: cover;

    filter: grayscale(${({isSelected, isSelectionActive}) => !isSelectionActive || isSelected ? "0" : "0.8"});

    transition: filter 0.3s;
`

export const WizardTagNameContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
        
    z-index: 1;

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
        
        transition: font-size 0.2s;
    }
`