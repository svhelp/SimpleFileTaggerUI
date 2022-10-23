import { Button, Popconfirm } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { TagBackground, TagCardContainer, TagNameContainer, TagToolbar } from "./TagContainer.styles"

interface ITagContainerProps {
    title: string;
    background?: string;
    isSelected?: boolean;
    onClick?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
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
            
            <TagToolbar>
                {props.onEdit &&
                    <Button type="text" onClick={props.onEdit}>
                        <EditOutlined />
                    </Button>}
                
                {props.onRemove &&
                    <Popconfirm
                        title="Are you sure?"
                        onConfirm={props.onRemove}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="text">
                            <DeleteOutlined color="#000" />
                        </Button>
                    </Popconfirm>
                }
                
            </TagToolbar>
        </TagCardContainer>
    )
}