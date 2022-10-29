import { NewCard } from "../NewCard/NewCard";

interface ITagNewCardProps {
    onClick: () => void;
}

export const TagNewCard = (props: ITagNewCardProps) =>
    <NewCard width="240px" height="160px" onClick={props.onClick} />