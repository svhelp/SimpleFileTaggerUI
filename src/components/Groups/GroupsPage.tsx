import { Space } from "antd";

import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useState } from "react";
import { CreateTagGroupModal } from "./CreateTagGroupModal";
import { GroupDrawer } from "./GroupDrawer";
import { TagGroupPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupGetQuery, useTagGroupUpdateMutation, useTagGroupRemoveMutation } from "api/enchanced/taggroup";

export const GroupsPage = () => {
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);
    const [ selectedGroup, setSelectedGroup ] = useState<TagGroupPlainModel | undefined>(undefined);

    const { data: tagGroups, isFetching, isError, error } = useTagGroupGetQuery();
    const { data: tags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    const [ removeTagGroup, removeTagGroupResult ] = useTagGroupRemoveMutation();

    useQueryResult(updateTagGroupQueryResult);
    useQueryResult(removeTagGroupResult);

    const createTagGroup = (groupName: string, tagIds: string[]) => {
        doUpdateTagGroup(undefined, groupName, tagIds);
        setIsCreatingGroup(false);
    }

    const updateTagGroup = (groupId: string | undefined, groupName: string, tagIds: string[]) => {
        doUpdateTagGroup(groupId, groupName, tagIds);
        setSelectedGroup(undefined);
    }

    const doUpdateTagGroup = (groupId: string | undefined, groupName: string, tagIds: string[]) => {
        const model = {
            updateGroupCommandModel: {
                id: groupId,
                name: groupName,
                tagIds: tagIds
            }
        }

        updateTagGroupQuery(model);
    }
    
    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            {/* {contextHolder} */}
            <TabHeaderContainer>
                <h1>
                    Groups
                </h1>
            </TabHeaderContainer>
            <TabContentContainer>
                <Space wrap>
                    {tagGroups?.map(tagGroup =>
                        <TagContainer
                            key={tagGroup.id}
                            title={tagGroup.name}
                            isSelected={false}
                            onClick={() => setSelectedGroup(tagGroup)}
                            onRemove={() => removeTagGroup({id: tagGroup.id})} />)}
                    <NewCard onClick={() => setIsCreatingGroup(true)}/>
                </Space>

            </TabContentContainer>
            
            <GroupDrawer
                group={selectedGroup}
                availableTags={tags ?? []}
                updateTags={ids => updateTagGroup(selectedGroup?.id, selectedGroup?.name ?? "", ids)}
                closeDrawer={() => setSelectedGroup(undefined)}
            />

            <CreateTagGroupModal
                isModalOpen={isCreatingGroup}
                onCreate={(groupName) => createTagGroup(groupName, [])}
                closeModal={() => setIsCreatingGroup(false)}/>
        </Tab>
    )
}

