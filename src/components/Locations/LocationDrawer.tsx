import { Drawer, Button, Divider } from "antd";
import { DrawerButtonContainer, DrawerContent } from "components/Common/Drawer.styles";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationModel, TagPlainModel } from "domain/models";
import { useState, useEffect } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";

interface ILocationDrawerProps {
    location?: LocationModel;
    closeDrawer: () => void;
}

export const LocationDrawer = (props: ILocationDrawerProps) => {
    const { location, closeDrawer } = props;

    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    const [ updateLocationQuery, updateLocationResult ] = useLocationSetTagsMutation();
    
    useQueryResult(updateLocationResult);
    useQueryResult(removeLocationResult);

    useEffect(() => {
        if (!location){
            setTags([]);
            return;
        }

        setTags(availableTags?.filter(t => location?.tagIds.includes(t.id)) ?? []);
    }, [ location ]);
    
    const updateLocation = () => {
        const model = {
            updateLocationCommandModel: {
                path: location!.path,
                tags: tags.map(t => t.id)
            }
        }

        updateLocationQuery(model);
    }

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
                    availableTags={availableTags ?? []}
                    updateTags={setTags}
                />
                <DrawerButtonContainer>
                    <Button onClick={closeDrawer}>Cancel</Button>
                    <Button type="primary" onClick={updateLocation}>
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