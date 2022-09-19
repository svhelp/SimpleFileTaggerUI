import { Input, Modal } from "antd"
import { useState } from "react"

interface IAddTagModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    onCreate: (tag: string) => void;
}

export const AddTagModal = (props: IAddTagModalProps) => {
    const [ tagValue, setTagValue ] = useState("");

    return (
        <Modal
            title="New Tag"
            visible={props.isModalOpen}
            onOk={() => props.onCreate(tagValue)}
            onCancel={props.closeModal}>
            <Input placeholder="Tag name" value={tagValue} onChange={(e) => setTagValue(e.target.value)} />
        </Modal>
    )
}