import {  Space } from "antd";
import { NewCard } from "components/Common/NewCard/NewCard";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from 'components/Common/Tag/TagContainer';
import { useState } from "react";
import { AddTagModal } from "./AddTagModal";
import { useQueryResult } from 'customHooks/useQueryResult'
import { useTagGetQuery, useTagRemoveMutation } from "api/enchanced/tag";
import { TagDrawer } from "./TagDrawer";
import { TagPlainModel } from "domain/models";

export const TagsPage = () => {

    const [ selectedTag, setSelectedTag ] = useState<TagPlainModel | undefined>(undefined);

    const { data: availableTags, isFetching, isError, error } = useTagGetQuery();

    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const [ removeTag, removeTagResult ] = useTagRemoveMutation();

    useQueryResult(removeTagResult);

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
                        <TagContainer
                            key={tag.id}
                            title={tag.name}
                            isSelected={false}
                            onClick={() => setSelectedTag(tag)}
                            onRemove={() => removeTag({id: tag.id})} />)}
                    <NewCard onClick={() => setIsCreatingTag(true)}/>
                </Space>
            </TabContentContainer>

            <TagDrawer
                tag={selectedTag}
                closeDrawer={() => setSelectedTag(undefined)} />

            <AddTagModal
                isModalOpen={isCreatingTag}
                closeModal={() => setIsCreatingTag(false)} />
        </Tab>
    )
}