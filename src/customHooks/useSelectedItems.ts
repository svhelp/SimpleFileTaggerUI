import { useState } from "react";

export const useSelectedItems = (): [ string[], (elementId: string) => void, (elementId: string) => void, () => void ] => {
    const [ selectedItems, setSelectedItems ] = useState<string[]>([]);

    const onSet = (elementId: string) => {
        if (selectedItems.length === 1 && selectedItems[0] === elementId) {
            setSelectedItems([]);
            return;
        }

        setSelectedItems([elementId]);
    }

    const onToggle = (elementId: string) => {
        setSelectedItems(state => 
            state.includes(elementId)
                ? state.filter(id => id !== elementId)
                : state.concat([elementId]));
    }

    const clearSelection = () => {
        setSelectedItems([]);
    }

    return [ selectedItems, onToggle, onSet, clearSelection ];
}