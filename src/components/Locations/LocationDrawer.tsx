import { Drawer, Button, Divider } from "antd";
import { DrawerButtonContainer, DrawerContent } from "components/Common/Drawer.styles";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationModel, TagPlainModel } from "domain/models";
import { useState, useEffect } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation } from "api/enchanced/location";

interface ILocationDrawerProps {
    location?: LocationModel;
    availableTags: TagPlainModel[];
    updateTags: (ids: string[]) => void;
    closeDrawer: () => void;
}

export const LocationDrawer = (props: ILocationDrawerProps) => {
    const { location, availableTags, updateTags, closeDrawer } = props;

    const [ tags, setTags ] = useState<TagPlainModel[]>([]);
    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    
    useQueryResult(removeLocationResult);

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
            open={!!location}
            getContainer={false}
            closable={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <TagsListContent
                    tags={tags}
                    availableTags={availableTags}
                    updateTags={setTags}
                />
                <DrawerButtonContainer>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button type="primary" onClick={() => updateTags(tags.map(t => t.id))}>
                        Save
                    </Button>
                </DrawerButtonContainer>
                <Divider />
                <Button
                    onClick={() => removeLocation({id: location?.id})}
                    danger>
                    Remove location
                </Button>
            </DrawerContent>
        </Drawer>
    );
}