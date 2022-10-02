import { Input, Modal } from "antd";
import { useState } from "react";

interface ICreateTagGroupModalProps {
    isModalOpen: boolean;
    onCreate: (gropName: string) => void;
    closeModal: () => void;
}

export const CreateTagGroupModal = (props: ICreateTagGroupModalProps) => {
    const [ gropName, setGroupName ] = useState("");

    return (
        <Modal
            title="New group"
            visible={props.isModalOpen}
            onOk={() => props.onCreate(gropName)}
            onCancel={props.closeModal}>
            <Input placeholder="Group name" value={gropName} onChange={(e) => setGroupName(e.target.value)} />
        </Modal>
    )
}