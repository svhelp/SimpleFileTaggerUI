import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useState } from "react";

export const useSelectedItems = (): [ string[], (elementId: string, e: CheckboxChangeEvent) => void ] => {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const onChange = (elementId: string, e: CheckboxChangeEvent) => {
        setSelectedItems(state => {
            if (e.target.checked){
                return state.concat([elementId]);
            } else {
                return state.filter(id => id !== elementId);
            }
        })
    }

    return [ selectedItems, onChange ];
}