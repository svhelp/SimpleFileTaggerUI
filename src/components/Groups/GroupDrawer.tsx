import { Drawer, Space, Button } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { TagGroupPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface IGroupDrawerProps {
    group?: TagGroupPlainModel;
    availableTags: TagPlainModel[];
    updateTags: (ids: string[]) => void;
    closeDrawer: () => void;
}

export const GroupDrawer = (props: IGroupDrawerProps) => {
    const { group, availableTags, updateTags, closeDrawer } = props;

    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    useEffect(() => {
        if (!props.group){
            setTags([]);
            return;
        }

        setTags(availableTags.filter(t => props.group?.tagIds.includes(t.id)));
    }, [ props.group ]);
    

    return (
        <Drawer
            title={group?.name}
            placement="right"
            onClose={closeDrawer}
            visible={!!group}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <TagsListContent
                    tags={tags}
                    availableTags={availableTags}
                    updateTags={setTags}
                />
                <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button type="primary" onClick={() => updateTags(tags.map(t => t.id))}>
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