import { Button, Checkbox, Popconfirm } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    WarningOutlined,
    FolderOpenOutlined,
  } from '@ant-design/icons';
import { LocationCardContainer, LocationNameContainer, LocationToolbar } from "./LocationContainer.styles";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSingleAndDoubleClick } from "customHooks/useSingleAndDoubleClick";

interface ILocationContainerProps {
    title: string;
    isSelected?: boolean;
    notFound?: boolean;
    onSelect?: (e: CheckboxChangeEvent) => void;
    onClick: () => void;
    onDoubleClick?: () => void;
    onOpen?: () => void;
    onEdit?: () => void;
    onRemove?: () => void;
}

export const LocationContainer = (props: ILocationContainerProps) => {

    const onLocationClick = useSingleAndDoubleClick(props.onClick, props.onDoubleClick);

    return (
        <LocationCardContainer hoverable>
            {props.onSelect &&
                <Checkbox checked={props.isSelected} onChange={props.onSelect} /> }

            <LocationNameContainer onClick={onLocationClick}>
                <p>
                    {props.title}
                </p>

                {props.notFound && <WarningOutlined style={{color: "#a00"}} />}
            </LocationNameContainer>

            <LocationToolbar>
                {props.onOpen &&
                    <Button type="text" onClick={props.onOpen}>
                        <FolderOpenOutlined />
                    </Button>}
                
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