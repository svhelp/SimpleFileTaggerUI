import { Button } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { TagCardContainer, TagNameContainer, TagToolbar } from "./TagContainer.styles"

interface ITagContainerProps {
    title: string;
    isSelected?: boolean;
    onClick?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
}

export const TagContainer = (props: ITagContainerProps) => {
    return (
        <TagCardContainer hoverable>
            <TagToolbar>

                {props.onEdit &&
                    <Button type="text" onClick={props.onEdit}>
                        <EditOutlined />
                    </Button>}
                
                {props.onRemove &&
                    <Button type="text" onClick={props.onRemove}>
                        <DeleteOutlined />
                    </Button>}
                
            </TagToolbar>
            <TagNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>
            </TagNameContainer>
        </TagCardContainer>
    )
}