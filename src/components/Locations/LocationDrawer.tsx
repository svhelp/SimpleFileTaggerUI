import { Drawer, Space, Button } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationModel, TagPlainModel } from "domain/models";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface ILocationDrawerProps {
    location?: LocationModel;
    availableTags: TagPlainModel[];
    updateTags: (ids: string[]) => void;
    closeDrawer: () => void;
}

export const LocationDrawer = (props: ILocationDrawerProps) => {
    const { location, availableTags, updateTags, closeDrawer } = props;

    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    useEffect(() => {
        if (!location){
            setTags([]);
            return;
        }

        setTags(availableTags.filter(t => location?.tagIds.includes(t.id)));
    }, [ location ]);
    

    return (
        <Drawer
            title={location?.name}
            placement="right"
            onClose={closeDrawer}
            visible={!!location}
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