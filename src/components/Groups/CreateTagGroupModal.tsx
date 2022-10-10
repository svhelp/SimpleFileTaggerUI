import { Input, Modal } from "antd";
import { useTagGroupUpdateMutation } from "api/enchanced/taggroup";
import { useState } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { useTagGetQuery } from "api/enchanced/tag";
import { TagPlainModel } from "domain/models";

interface ICreateTagGroupModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const CreateTagGroupModal = (props: ICreateTagGroupModalProps) => {
    const [ groupName, setGroupName ] = useState("");
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    
    useQueryResult(updateTagGroupQueryResult);

    const closeModal = () => {
        setGroupName("");
        setTags([]);

        props.closeModal();
    }

    const createTagGroup = () => {
        const model = {
            updateGroupCommandModel: {
                id: undefined,
                name: groupName,
                tagIds: tags.map(t => t.id)
            }
        }

        updateTagGroupQuery(model);
        closeModal();
    }

    return (
        <Modal
            title="New group"
            visible={props.isModalOpen}
            onOk={createTagGroup}
            onCancel={closeModal}>
            <Input placeholder="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <TagsListContent
                tags={tags}
                availableTags={availableTags ?? []}
                updateTags={setTags}
            />
        </Modal>
    )
}