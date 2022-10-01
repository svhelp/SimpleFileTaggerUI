import { Space } from "antd";
import { useTagGetQuery, useTagCreateMutation, useTagRemoveMutation } from "api/partial/tag";
import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from 'components/Common/Tag/TagContainer';
import { useState } from "react";
import { AddTagModal } from "./AddTagModal";

export const TagsPage = () => {
    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const { data, isFetching, isError, error } = useTagGetQuery();
    const [ crateTag, {} ] = useTagCreateMutation();
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
                    {data?.map(tag =>
                        <TagContainer title={tag.name} onRemove={() => removeTag({id: tag.id})} />)}
                    <NewCard onClick={() => setIsCreatingTag(true)}/>
                </Space>
            </TabContentContainer>

            <AddTagModal
                isModalOpen={isCreatingTag}
                onCreate={(tag) => crateTag({simpleNamedModel: {name: tag}})}
                closeModal={() => setIsCreatingTag(false)} />
        </Tab>
    )
}