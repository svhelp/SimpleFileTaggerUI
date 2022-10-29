import { Space } from "antd";

import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { useState } from "react";
import { CreateTagGroupModal } from "./CreateTagGroupModal";
import { GroupDrawer } from "./GroupDrawer";
import { TagGroupPlainModel } from "domain/models";
import { useTagGroupGetQuery } from "api/enchanced/taggroup";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { TagNewCard } from "components/Common/Tag/TagNewCard";
import { TabHeader } from "components/Common/Tab/TabHeader";

export const GroupsPage = () => {
    
    const [ selectedGroups, setSelectedGroups ] = useSelectedItems();
    const [ isCreatingGroup, setIsCreatingGroup ] = useState(false);
    const [ selectedGroup, setSelectedGroup ] = useState<TagGroupPlainModel | undefined>(undefined);

    const { data: tagGroups, isFetching, isError, error } = useTagGroupGetQuery();
    
    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeader title="Groups"/>
            <TabContentContainer>
                <Space wrap>
                    {tagGroups?.map(tagGroup =>
                        <TagContainer
                            key={tagGroup.id}
                            title={tagGroup.name}
                            isSelected={selectedGroups.includes(tagGroup.id)}
                            onSelect={(e) => setSelectedGroups(tagGroup.id, e)}
                            onClick={() => setSelectedGroup(tagGroup)} />)}
                    <TagNewCard onClick={() => setIsCreatingGroup(true)}/>
                </Space>

            </TabContentContainer>
            
            <GroupDrawer
                group={selectedGroup}
                closeDrawer={() => setSelectedGroup(undefined)}
            />

            <CreateTagGroupModal
                isModalOpen={isCreatingGroup}
                closeModal={() => setIsCreatingGroup(false)}/>
        </Tab>
    )
}

