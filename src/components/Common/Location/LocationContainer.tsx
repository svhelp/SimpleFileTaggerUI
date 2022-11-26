import { Button, Checkbox, Popconfirm } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    WarningOutlined,
  } from '@ant-design/icons';
import { LocationCardContainer, LocationNameContainer, LocationToolbar } from "./LocationContainer.styles";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

interface ILocationContainerProps {
    title: string;
    isSelected?: boolean;
    notFound?: boolean;
    onSelect?: (e: CheckboxChangeEvent) => void;
    onClick?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
}

export const LocationContainer = (props: ILocationContainerProps) => {
    return (
        <LocationCardContainer hoverable>
            {props.onSelect &&
                <Checkbox checked={props.isSelected} onChange={props.onSelect} /> }

            <LocationNameContainer onClick={props.onClick}>
                <p>
                    {props.title}
                </p>

                {props.notFound && <WarningOutlined style={{color: "#a00"}} />}
            </LocationNameContainer>

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

        </LocationCardContainer>
    )
}