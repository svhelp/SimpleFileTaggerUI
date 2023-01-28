import {  Button, Space } from "antd";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useState } from "react";
import { AddTagModal } from "./AddTagModal";
import { useTagGetQuery, useTagMergeMutation } from "api/enchanced/tag";
import { TagDrawer } from "./TagDrawer";
import { TagPlainModel } from "domain/models";
import { TagCard } from "./TagCard";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { TagNewCard } from "components/Common/Tag/TagNewCard";
import { TabHeader } from "components/Common/Tab/TabHeader";
import { useQueryResult } from 'customHooks/useQueryResult'
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";

export const TagsPage = () => {

    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const [ selectedTags, setSelectedTags, clearSelection ] = useSelectedItems();
    const [ selectedTag, setSelectedTag ] = useState<TagPlainModel | undefined>(undefined);

    const { data: availableTags, isFetching, isError, error } = useGetVirtualRemovable(useTagGetQuery);

    const [ mergeTagsQuery, mergeTagsResult ] = useTagMergeMutation();

    useQueryResult(mergeTagsResult);

    const mergeTags = () => {
        const model = {
            mergeTagsCommandModel: {
                tagIds: selectedTags
            }
        }

        mergeTagsQuery(model);
    }

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeader title="Tags">
                <>
                    {/* {selectedTags.length > 1 &&
                        <Button onClick={mergeTags}>
                            Merge
                        </Button>} */}
                    {selectedTags.length > 0 &&
                        <Button onClick={clearSelection}>
                            Clear selection
                        </Button>}
                </>
            </TabHeader>
            <TabContentContainer>
                <Space wrap>
                    {availableTags?.map(tag =>
                        <TagCard
                            key={tag.id}
                            tag={tag}
                            isSelected={selectedTags.includes(tag.id)}
                            onSelect={(e) => setSelectedTags(tag.id, e)}
                            setSelectedTag={() => setSelectedTag(tag)} />)}
                    <TagNewCard onClick={() => setIsCreatingTag(true)}/>
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