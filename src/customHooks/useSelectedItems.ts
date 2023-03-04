import { useState } from "react";

export const useSelectedItems = (): [ string[], (elementId: string) => void, () => void ] => {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const onChange = (elementId: string) => {
        setSelectedItems(state => 
            state.includes(elementId)
                ? state.filter(id => id !== elementId)
                : state.concat([elementId]))
    }

    const clearSelection = () => {
        setSelectedItems([]);
    }

    return [ selectedItems, onChange, clearSelection ];
}