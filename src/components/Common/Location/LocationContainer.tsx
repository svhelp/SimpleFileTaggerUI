import { Button, Checkbox } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    WarningOutlined,
    FolderOpenOutlined,
  } from '@ant-design/icons';
import { LocationCardContainer, LocationNameContainer, LocationToolbar } from "./LocationContainer.styles";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSingleAndDoubleClick } from "customHooks/useSingleAndDoubleClick";
import { LocationPlainModel } from "domain/models";

interface ILocationContainerProps {
    isSelected?: boolean;
    location: LocationPlainModel;
    onSelect?: (e: CheckboxChangeEvent) => void;
    onClick: (location: LocationPlainModel) => void;
    onDoubleClick?: (location: LocationPlainModel) => void;
    onOpen?: (location: LocationPlainModel) => void;
    onEdit?: (location: LocationPlainModel) => void;
    onRemove?: (location: LocationPlainModel) => void;
}

export const LocationContainer = (props: ILocationContainerProps) => {
    const { location } = props;

    const onLocationClick = useSingleAndDoubleClick(
        () => props.onClick(location),
        !!props.onDoubleClick
            ? () => props.onDoubleClick?.(location)
            : undefined
    );

    return (
        <LocationCardContainer hoverable>
            {props.onSelect &&
                <Checkbox checked={props.isSelected} onChange={props.onSelect} /> }

            <LocationNameContainer onClick={onLocationClick}>
                <p>
                    {location.name}
                </p>

                {location.notFound && <WarningOutlined style={{color: "#a00"}} />}
            </LocationNameContainer>

            <LocationToolbar>
                {props.onOpen &&
                    <Button type="text" onClick={() => props.onOpen?.(location)}>
                        <FolderOpenOutlined />
                    </Button>}
                
                {props.onEdit &&
                    <Button type="text" onClick={() => props.onEdit?.(location)}>
                        <EditOutlined />
                    </Button>}
                
                {props.onRemove &&
                    <Button type="text" onClick={() => props.onRemove?.(location)}>
                        <DeleteOutlined />
                    </Button>
                }
            </LocationToolbar>
        </LocationCardContainer>
    )
}