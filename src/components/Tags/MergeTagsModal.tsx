import { Modal, Select } from "antd"
import { useState } from "react"
import { useQueryResult } from "customHooks/useQueryResult";
import { useTagGetQuery, useTagMergeMutation } from "api/enchanced/tag";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";

interface IMergeTagsModalProps {
    isModalOpen: boolean;
    selectedTagIds: string[];
    closeModal: () => void;
}

export const MergeTagsModal = (props: IMergeTagsModalProps) => {
    const [ mainTagId, setMainTagId ] = useState("");

    const { data: availableTags, isFetching, isError, error } = useGetVirtualRemovable(useTagGetQuery);

    const [ mergeTagsQuery, mergeTagsResult ] = useTagMergeMutation();

    useQueryResult(mergeTagsResult);

    const mergeTags = () => {
        const model = {
            mergeTagsCommandModel: {
                mainTagId: mainTagId,
                tagIds: props.selectedTagIds
            }
        }

        mergeTagsQuery(model);
        closeModal();
    }

    const closeModal = () => {
        setMainTagId("");
        props.closeModal();
    }

    const tagsToMerge = availableTags.filter(t => props.selectedTagIds.includes(t.id));

    return (
        <Modal
            title="New Tag"
            open={props.isModalOpen}
            onOk={mergeTags}
            onCancel={closeModal}>
                <label>Select aggregation tag:</label>
                <Select
                    style={{ width: "100%" }}
                    value={mainTagId}
                    onChange={value => setMainTagId(value)}
                    options={tagsToMerge.map(t => ({
                        value: t.id,
                        label: t.name
                    }))}
                />
        </Modal>
    )
}