import { LocationPlainModel } from "domain/models";
import { Modal } from "antd"
import {
    ExclamationCircleFilled
  } from '@ant-design/icons';
import { useCallback } from "react";

const { confirm } = Modal;

export const usePerformRecoursiveAction = (
        header: string,
        text: string,
        performAction: (location: LocationPlainModel, isRecoursive: boolean) => void,
        locations: LocationPlainModel[]
    ) => {
    return useCallback((location: LocationPlainModel) => {
        const affectedLocations = locations.filter(l => l.parentId === location.id);

        if (affectedLocations.length === 0) {
            performAction(location, false);
            return;
        }

        confirm({
            title: header,
            icon: <ExclamationCircleFilled />,
            content: text,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => performAction(location, true),
            onCancel: () => performAction(location, false),
        });
    }, [ header, text, performAction, locations ]);
}
