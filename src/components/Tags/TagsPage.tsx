import { Alert, Skeleton, Space } from "antd";
import { useTagGetQuery, useTagCreateMutation, useTagRemoveMutation } from "api/partial/tag";
import { NewCard } from "components/Common/NewCard/NewCard";
import { TagContainer } from 'components/Common/Tag/TagContainer';
import { useState } from "react";
import styled from 'styled-components'
import { AddTagModal } from "./AddTagModal";

export const TagsPage = () => {
    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const { data, isFetching, isError, error } = useTagGetQuery();
    const [ crateTag, {} ] = useTagCreateMutation();
    const [ removeTag, {} ] = useTagRemoveMutation();

    return <TagsPageContainer>
        <h1>
            Tags       
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
                    <TagContainer title={tag.name} onRemove={() => removeTag({id: tag.id})} />)}
                <NewCard onClick={() => setIsCreatingTag(true)}/>
            </Space>
        </ContentContainer>

        <AddTagModal
            isModalOpen={isCreatingTag}
            onCreate={(tag) => crateTag({simpleNamedModel: {name: tag}})}
            closeModal={() => setIsCreatingTag(false)} />
    </TagsPageContainer>
}

const TagsPageContainer = styled.div`
    height: 100%;
`

const ContentContainer = styled.div`
    overflow: auto;
    height: 100%;
`