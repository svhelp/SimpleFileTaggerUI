import { Alert, Skeleton, Space } from "antd";
import { useTagGroupAddMutation, useTagGroupGetQuery, useTagGroupRemoveMutation } from "api/partial/taggroup";
import { NewCard } from "components/Common/NewCard/NewCard";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useState } from "react";
import styled from "styled-components";
import { CreateTagGroupModal } from "./CreateTagGroupModal";

export const GroupsPage = () => {
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);
    const { data, isFetching, isError, error } = useTagGroupGetQuery();
    const [ crateTagGroup, {} ] = useTagGroupAddMutation();
    const [ removeTagGroup, {} ] = useTagGroupRemoveMutation();
    
    return (
        <TagGroupsPageContainer>
            <h1>
                Groups
            </h1>
            
            {isFetching && <Skeleton.Image active />}

            {isError && <Alert
                message="Error"
                description={error.toString()}
                type="error"
                showIcon />}

            <ContentContainer>
                <Space wrap>
                    {data?.map(tag =>
                        <TagContainer title={tag.name} onRemove={() => removeTagGroup({id: tag.id})} />)}
                    <NewCard onClick={() => setIsCreatingGroup(true)}/>
                </Space>
            </ContentContainer>

            <CreateTagGroupModal
                isModalOpen={isCreatingGroup}
                onCreate={(groupName) => crateTagGroup({
                    updateGroupCommandModel: {
                        groupName: groupName,
                        tagIds: []
                    }
                })}
                closeModal={() => setIsCreatingGroup(false)}/>
        </TagGroupsPageContainer>
    )
}

const TagGroupsPageContainer = styled.div`
    height: 100%;
`

const ContentContainer = styled.div`
    overflow: auto;
    height: 100%;
`