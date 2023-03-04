import { Checkbox } from "antd";
import { TagBackground, TagCardContainer, TagNameContainer } from "./TagContainer.styles"

interface ITagContainerProps {
    title: string;
    background?: string;
    isSelected?: boolean;
    isSelectionActive?: boolean;
    onClick: (e: React.MouseEvent) => void;
}

export const TagContainer = (props: ITagContainerProps) => {
    return (
        <TagCardContainer hoverable>
            <TagNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>
            </TagNameContainer>

            {!!props.background &&
                <TagBackground
                    isSelected={props.isSelected}
                    isSelectionActive={props.isSelectionActive}
                    src={`data:image/jpeg;base64,${props.background}`} />}

            <Checkbox checked={props.isSelected} />
        </TagCardContainer>
    )
}