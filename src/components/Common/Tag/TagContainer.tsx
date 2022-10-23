import { TagBackground, TagCardContainer, TagNameContainer } from "./TagContainer.styles"

interface ITagContainerProps {
    title: string;
    background?: string;
    isSelected?: boolean;
    onClick?: () => void;
}

export const TagContainer = (props: ITagContainerProps) => {
    return (
        <TagCardContainer hoverable>

            {!!props.background &&
                <TagBackground src={`data:image/jpeg;base64,${props.background}`} />}

            <TagNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>
            </TagNameContainer>
        </TagCardContainer>
    )
}