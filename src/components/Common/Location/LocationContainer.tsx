import { Button, Checkbox } from "antd"
import {
    DeleteOutlined,
    WarningOutlined,
    FolderOpenOutlined,
  } from '@ant-design/icons';
import { LocationCardContainer, LocationNameContainer, LocationToolbar } from "./LocationContainer.styles";
import { useSingleAndDoubleClick } from "customHooks/useSingleAndDoubleClick";
import { LocationPlainModel } from "domain/models";

interface ILocationContainerProps {
    location: LocationPlainModel;
    isSelected?: boolean;
    isSelectionActive?: boolean;
    onClick: (location: LocationPlainModel) => void;
    onCtrlClick?: (location: LocationPlainModel) => void;
    onDoubleClick?: (location: LocationPlainModel) => void;
    onOpen?: (location: LocationPlainModel) => void;
    onRemove?: (location: LocationPlainModel) => void;
}

export const LocationContainer = (props: ILocationContainerProps) => {
    const { location } = props;

    const onLocationClick = useSingleAndDoubleClick(
        () => props.onClick(location),
        !!props.onCtrlClick
            ? () => props.onCtrlClick?.(location)
            : undefined,
        !!props.onDoubleClick
            ? () => props.onDoubleClick?.(location)
            : undefined
    );

    return (
        <LocationCardContainer hoverable>
            {props.isSelectionActive &&
                <Checkbox checked={props.isSelected} /> }

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
                
                {props.onRemove &&
                    <Button type="text" onClick={() => props.onRemove?.(location)}>
                        <DeleteOutlined />
                    </Button>
                }
            </LocationToolbar>
        </LocationCardContainer>
    )
}