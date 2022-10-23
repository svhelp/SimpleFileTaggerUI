import Checkbox, { CheckboxChangeEvent } from "antd/lib/checkbox";
import { TagBackground, TagCardContainer, TagNameContainer } from "./TagContainer.styles"

interface ITagContainerProps {
    title: string;
    background?: string;
    isSelected?: boolean;
    onSelect?: (e: CheckboxChangeEvent) => void;
    onClick?: () => void;
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
                <TagBackground src={`data:image/jpeg;base64,${props.background}`} />}

            {props.onSelect &&
                <Checkbox value={props.isSelected} onChange={props.onSelect} /> }
        </TagCardContainer>
    )
}