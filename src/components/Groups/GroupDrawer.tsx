import { Drawer, Space, Button } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { TagGroupPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import styled from "styled-components";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupUpdateMutation } from "api/enchanced/taggroup";

interface IGroupDrawerProps {
    group?: TagGroupPlainModel;
    closeDrawer: () => void;
}

export const GroupDrawer = (props: IGroupDrawerProps) => {
    const { group, closeDrawer } = props;

    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    
    useQueryResult(updateTagGroupQueryResult);

    useEffect(() => {
        if (!props.group){
            setTags([]);
            return;
        }

        setTags((availableTags ?? []).filter(t => props.group?.tagIds.includes(t.id)));
    }, [ group, availableTags ]);
    

    const updateTags = () => {
        const model = {
            updateGroupCommandModel: {
                id: group!.id,
                name: group!.name,
                tagIds: tags.map(t => t.id)
            }
        }

        updateTagGroupQuery(model);
        closeDrawer();
    }

    return (
        <Drawer
            title={group?.name}
            placement="right"
            onClose={closeDrawer}
            open={!!group}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <TagsListContent
                    tags={tags}
                    availableTags={availableTags ?? []}
                    updateTags={setTags}
                />
                <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button type="primary" onClick={updateTags}>
                        Save
                    </Button>
                </Space>
            </DrawerContent>
        </Drawer>
    );
}

const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    height: 100%;
`