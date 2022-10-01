import { Space } from "antd";
import { useTagGroupAddMutation, useTagGroupGetQuery, useTagGroupRemoveMutation } from "api/partial/taggroup";
import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useState } from "react";
import { CreateTagGroupModal } from "./CreateTagGroupModal";

export const GroupsPage = () => {
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);
    const { data, isFetching, isError, error } = useTagGroupGetQuery();
    const [ crateTagGroup, {} ] = useTagGroupAddMutation();
    const [ removeTagGroup, {} ] = useTagGroupRemoveMutation();
    
    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeaderContainer>
                <h1>
                    Groups
                </h1>
            </TabHeaderContainer>
            <TabContentContainer>
                <Space wrap>
                    {data?.map(tag =>
                        <TagContainer title={tag.name} onRemove={() => removeTagGroup({id: tag.id})} />)}
                    <NewCard onClick={() => setIsCreatingGroup(true)}/>
                </Space>
            </TabContentContainer>
            
            <CreateTagGroupModal
                isModalOpen={isCreatingGroup}
                onCreate={(groupName) => crateTagGroup({
                    updateGroupCommandModel: {
                        groupName: groupName,
                        tagIds: []
                    }
                })}
                closeModal={() => setIsCreatingGroup(false)}/>
        </Tab>
    )
}
