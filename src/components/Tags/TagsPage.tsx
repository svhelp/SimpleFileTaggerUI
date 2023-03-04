import {  Button, Space } from "antd";
import { TabContentContainer } from "components/Common/Page/Tab.styles";
import { useState } from "react";
import { AddTagModal } from "./AddTagModal";
import { useTagGetQuery } from "api/enchanced/tag";
import { TagDrawer } from "./TagDrawer";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { TagNewCard } from "components/Common/Tag/TagNewCard";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { MergeTagsModal } from "./MergeTagsModal";
import { Tab } from "components/Common/Page/Tab";
import { TabHeader } from "components/Common/Page/TabHeader";
import { PageContainer } from "components/Common/Page/Page.styles";
import { TagCard } from "./TagCard";

export const TagsPage = () => {
    const [ isCreatingTag, setIsCreatingTag ] = useState(false);
    const [ isMergingTags, setIsMergingTags ] = useState(false);
    const [ selectedTags, toggleSelectedTag, setSelectedTags, clearSelection ] = useSelectedItems();

    const { data: availableTags, isFetching, isError, error } = useGetVirtualRemovable(useTagGetQuery);

    const closeMergingDialog = () => {
        setIsMergingTags(false);
        clearSelection();
    }

    const onTagClick = (e: React.MouseEvent, tagId: string) => {
        if (e.ctrlKey) {
            toggleSelectedTag(tagId);
            return;
        }

        setSelectedTags(tagId);
    }

    return (
        <PageContainer>
            <Tab isError={isError} isFetching={isFetching} error={error} hasDetails>
                <TabHeader title="Tags">
                    <>
                        {selectedTags.length > 1 &&
                            <Button onClick={() => setIsMergingTags(true)}>
                                Merge
                            </Button>}
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
                                isSelectionActive={selectedTags.length > 0}
                                onClick={(e) => onTagClick(e, tag.id)} />)}
                        <TagNewCard onClick={() => setIsCreatingTag(true)}/>
                    </Space>
                </TabContentContainer>


                <AddTagModal
                    isModalOpen={isCreatingTag}
                    closeModal={() => setIsCreatingTag(false)} />
                    
                <MergeTagsModal
                    isModalOpen={isMergingTags}
                    selectedTagIds={selectedTags}
                    closeModal={closeMergingDialog} />
            </Tab>

            <TagDrawer selectedTagIds={selectedTags} />
        </PageContainer>
    )
}