import { Checkbox, Divider, Input, Modal } from "antd";
import { useTagGroupUpdateMutation } from "api/enchanced/taggroup";
import { useState } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { useTagGetQuery } from "api/enchanced/tag";
import { TagPlainModel } from "domain/models";
import styled from "styled-components";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";

interface ICreateTagGroupModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const CreateTagGroupModal = (props: ICreateTagGroupModalProps) => {
    const [ groupName, setGroupName ] = useState("");
    const [ isRequired, setIsRequired ] = useState(false);
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    
    useQueryResult(updateTagGroupQueryResult);

    const closeModal = () => {
        setGroupName("");
        setIsRequired(false);
        setTags([]);

        props.closeModal();
    }

    const createTagGroup = () => {
        const model = {
            updateGroupCommandModel: {
                id: undefined,
                name: groupName,
                isRequired: isRequired,
                tagIds: tags.map(t => t.id)
            }
        }

        updateTagGroupQuery(model);
        closeModal();
    }

    return (
        <Modal
            title="New group"
            open={props.isModalOpen}
            onOk={createTagGroup}
            onCancel={closeModal}>
            <Input placeholder="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
            <DividedCheckbox
                checked={isRequired}
                onChange={e => setIsRequired(e.target.checked)}>
                    Required
            </DividedCheckbox>
            <Divider />
            <TagsListContent
                tags={tags}
                availableTags={availableTags ?? []}
                updateTags={setTags}
            />
        </Modal>
    )
}

const DividedCheckbox = styled(Checkbox)`
    margin-top: 8px;
`