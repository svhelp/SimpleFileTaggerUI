import { FolderOpenOutlined } from '@ant-design/icons';
import { Drawer, Button, Divider } from "antd";
import { DrawerBody, DrawerButtonContainer, DrawerContent, DrawerFooter } from "components/Common/Drawer.styles";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationModel, TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useOpenDirectory } from 'customHooks/useOpenDirectory';

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
    useQueryResult(removeLocationResult, closeDrawer);

    useEffect(() => {
        if (!location){
            setTags([]);
            return;
        }

        setTags(availableTags?.filter(t => location?.tagIds.includes(t.id)) ?? []);
    }, [ location ]);
    
    const openDirectory = useOpenDirectory();
    
    const updateLocation = () => {
        const model = {
            updateLocationCommandModel: {
                path: location!.path,
                tags: tags.map(t => t.name)
            }
        }

        updateLocationQuery(model);
    }
    
    const onRemove = useCallback(() => {
        if (!location){
            return;
        }

        closeDrawer();
        removeLocation({ id:  location.id });
    }, [ closeDrawer, removeLocation, location ]);

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
                <DrawerBody>
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
                </DrawerBody>
                
                <DrawerFooter>
                    <Divider />
                    <DrawerButtonContainer>
                        <Button icon={<FolderOpenOutlined />} onClick={() => openDirectory(location!)} >
                            Open location
                        </Button>
                        <Button
                            onClick={onRemove}
                            danger>
                            Remove location
                        </Button>
                    </DrawerButtonContainer>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}