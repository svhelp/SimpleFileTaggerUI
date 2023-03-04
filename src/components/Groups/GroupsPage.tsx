import { Button, Space } from "antd";

import { TabContentContainer } from "components/Common/Page/Tab.styles";
import { useState } from "react";
import { CreateTagGroupModal } from "./CreateTagGroupModal";
import { GroupDrawer } from "./GroupDrawer";
import { useTagGroupGetQuery } from "api/enchanced/taggroup";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { TagNewCard } from "components/Common/Tag/TagNewCard";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { Tab } from "components/Common/Page/Tab";
import { TabHeader } from "components/Common/Page/TabHeader";
import { PageContainer } from "components/Common/Page/Page.styles";
import { TagContainer } from "components/Common/Tag/TagContainer";

export const GroupsPage = () => {
    
    const [ selectedGroups, setSelectedGroups, clearSelection ] = useSelectedItems();
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);

    const { data: tagGroups, isFetching, isError, error } = useGetVirtualRemovable(useTagGroupGetQuery);
    
    return (
        <PageContainer>
            <Tab isError={isError} isFetching={isFetching} error={error} hasDetails>
                <TabHeader title="Groups">
                    {selectedGroups.length > 0 &&
                        <Button onClick={clearSelection}>
                            Clear selection
                        </Button>}
                </TabHeader>
                <TabContentContainer>
                    <Space wrap>
                        {tagGroups.map(tagGroup =>
                            <TagContainer
                                key={tagGroup.id}
                                title={tagGroup.name}
                                isSelected={selectedGroups.includes(tagGroup.id)}
                                onClick={() => setSelectedGroups(tagGroup.id)} />)}
                        <TagNewCard onClick={() => setIsCreatingGroup(true)}/>
                    </Space>

                </TabContentContainer>

                <CreateTagGroupModal
                    isModalOpen={isCreatingGroup}
                    closeModal={() => setIsCreatingGroup(false)}/>
            </Tab>

            <GroupDrawer selectedGroupIds={selectedGroups} />
        </PageContainer>
    )
}

