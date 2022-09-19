import {
    PlusOutlined,
  } from '@ant-design/icons';
import { NewCardContainer } from './NewCard.styles';

interface INewCardProps {
    onClick: () => void;
}

export const NewCard = (props: INewCardProps) => {
    return (
        <NewCardContainer hoverable onClick={props.onClick}>
            <PlusOutlined />
        </NewCardContainer>
    )
}