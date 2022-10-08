import { Space } from "antd";
import { useTagCreateMutation, useTagGetQuery, useTagRemoveMutation } from "api/partial/tag";
import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from 'components/Common/Tag/TagContainer';
import { useState } from "react";
import { AddTagModal } from "./AddTagModal";

export const TagsPage = () => {
    const { data: availableTags, isFetching, isError, error } = useTagGetQuery();

    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const [ createTag, {} ] = useTagCreateMutation();
    const [ removeTag, {} ] = useTagRemoveMutation();

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeaderContainer>
                <h1>
                    Tags
                </h1>
            </TabHeaderContainer>
            <TabContentContainer>
                <Space wrap>
                    {availableTags?.map(tag =>
                        <TagContainer key={tag.id} title={tag.name} onRemove={() => removeTag({id: tag.id})} />)}
                    <NewCard onClick={() => setIsCreatingTag(true)}/>
                </Space>
            </TabContentContainer>

            <AddTagModal
                isModalOpen={isCreatingTag}
                onCreate={(tagName) => createTag({simpleNamedModel: {name: tagName}})}
                closeModal={() => setIsCreatingTag(false)} />
        </Tab>
    )
}