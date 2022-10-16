import { Input, Modal } from "antd"
import { useState } from "react"

interface IBindTagModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    onAdd: (tag: string) => void;
}

export const BindTagModal = (props: IBindTagModalProps) => {
    const [ tagValue, setTagValue ] = useState("");

    return (
        <Modal
            title="Add Tag"
            open={props.isModalOpen}
            onOk={() => props.onAdd(tagValue)}
            onCancel={props.closeModal}>
            <Input placeholder="Tag name" value={tagValue} onChange={(e) => setTagValue(e.target.value)} />
        </Modal>
    )
}