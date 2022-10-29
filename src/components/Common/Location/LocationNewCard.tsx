import { NewCard } from "../NewCard/NewCard";

interface ILocationNewCardProps {
    onClick: () => void;
}

export const LocationNewCard = (props: ILocationNewCardProps) =>
    <NewCard width="100%" height="32px" onClick={props.onClick} />