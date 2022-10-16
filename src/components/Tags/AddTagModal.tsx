import { Input, Modal } from "antd"
import { useState } from "react"
import { useQueryResult } from "customHooks/useQueryResult";
import { useTagCreateMutation } from "api/enchanced/tag";

interface IAddTagModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const AddTagModal = (props: IAddTagModalProps) => {
    const [ tagValue, setTagValue ] = useState("");

    const [ createTag, createTagResult ] = useTagCreateMutation();

    useQueryResult(createTagResult);

    const closeModal = () => {
        setTagValue("");
        props.closeModal();
    }

    const onCreate = () => {
        createTag({simpleNamedModel: {name: tagValue}});
        closeModal();
    }

    return (
        <Modal
            title="New Tag"
            open={props.isModalOpen}
            onOk={onCreate}
            onCancel={closeModal}>
            <Input placeholder="Tag name" value={tagValue} onChange={(e) => setTagValue(e.target.value)} />
        </Modal>
    )
}