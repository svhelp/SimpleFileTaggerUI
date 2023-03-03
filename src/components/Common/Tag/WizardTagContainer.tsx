import { Checkbox } from "antd";
import { WizardTagBackground, WizardTagCardContainer, WizardTagNameContainer } from "./WizardTagContainer.styles"

interface ITagContainerProps {
    title: string;
    background?: string;
    isSelected?: boolean;
    isSelectionActive?: boolean;
    onClick: () => void;
}

export const WizardTagContainer = (props: ITagContainerProps) => {
    return (
        <WizardTagCardContainer hoverable>
            <WizardTagNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>
            </WizardTagNameContainer>

            {!!props.background &&
                <WizardTagBackground
                    isSelected={props.isSelected}
                    isSelectionActive={props.isSelectionActive}
                    src={`data:image/jpeg;base64,${props.background}`} />}

            <Checkbox checked={props.isSelected} />
        </WizardTagCardContainer>
    )
}