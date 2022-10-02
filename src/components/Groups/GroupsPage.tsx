import { notification, Space } from "antd";

import { TagGroupModel, useTagGroupAddMutation, useTagGroupGetQuery, useTagGroupRemoveMutation } from "api/partial/taggroup";
import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useEffect, useState } from "react";
import { CreateTagGroupModal } from "./CreateTagGroupModal";
import { useTagGetQuery } from "api/partial/tag";
import { GroupDrawer } from "./GroupDrawer";

export const GroupsPage = () => {
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);
    const [ selectedGroup, setSelectedGroup ] = useState<TagGroupModel | undefined>(undefined);

    const { data, isFetching, isError, error } = useTagGroupGetQuery();
    const { data: tags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupAddMutation();
    const [ removeTagGroup, {} ] = useTagGroupRemoveMutation();

    useEffect(() => {
        if (!updateTagGroupQueryResult.data){
            return;
        }

        if (updateTagGroupQueryResult.data.isSuccessful) {
            notification.success({
                message: `Update successful`,
                placement: "bottomRight",
            });
        }

        if (!updateTagGroupQueryResult.data.isSuccessful) {
            notification.success({
                message: `Update error`,
                description: <span>{updateTagGroupQueryResult.data.message}</span>,
                placement: "bottomRight",
            });
        }
    }, [updateTagGroupQueryResult])

    const createTagGroup = (groupName: string, tagIds: string[]) => {
        doUpdateTagGroup(groupName, tagIds);
        setIsCreatingGroup(false);
    }

    const updateTagGroup = (groupName: string, tagIds: string[]) => {
        doUpdateTagGroup(groupName, tagIds);
        setSelectedGroup(undefined);
    }

    const doUpdateTagGroup = (groupName: string, tagIds: string[]) => {
        const model = {
            updateGroupCommandModel: {
                groupName: groupName,
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
                    {data?.map(tagGroup =>
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
                updateTags={ids => updateTagGroup(selectedGroup?.name ?? "", ids)}
                closeDrawer={() => setSelectedGroup(undefined)}
            />

            <CreateTagGroupModal
                isModalOpen={isCreatingGroup}
                onCreate={(groupName) => createTagGroup(groupName, [])}
                closeModal={() => setIsCreatingGroup(false)}/>
        </Tab>
    )
}
