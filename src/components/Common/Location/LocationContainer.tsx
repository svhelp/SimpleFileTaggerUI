import { Button, Popconfirm } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import { LocationCardContainer, LocationNameContainer, LocationToolbar } from "./LocationContainer.styles";

interface ILocationContainerProps {
    title: string;
    isSelected?: boolean;
    onClick?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
}

export const LocationContainer = (props: ILocationContainerProps) => {
    return (
        <LocationCardContainer hoverable>
            <LocationToolbar>
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
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                }
                
            </LocationToolbar>

            <LocationNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>
            </LocationNameContainer>
        </LocationCardContainer>
    )
}