import {
    PlusOutlined,
  } from '@ant-design/icons';
import { NewCardContainer } from './NewCard.styles';

interface INewCardProps {
    width: string;
    height: string;

    onClick: () => void;
}

export const NewCard = (props: INewCardProps) => {
    return (
        <NewCardContainer
            width={props.width}
            height={props.height}
            onClick={props.onClick}
            hoverable>
            <PlusOutlined />
        </NewCardContainer>
    )
}