import { FolderOpenOutlined } from '@ant-design/icons';
import { Drawer, Button, Divider } from "antd";
import { DrawerBody, DrawerButtonContainer, DrawerContent, DrawerFooter } from "components/Common/Drawer.styles";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useOpenDirectory } from 'customHooks/useOpenDirectory';
import { useGetVirtualRemovable } from 'customHooks/useGetVirtualRemovable';
import { compareArrays } from 'utils/compare';

interface ILocationDrawerProps {
    location?: LocationPlainModel;
    closeDrawer: () => void;
}

export const LocationDrawer = (props: ILocationDrawerProps) => {
    const { location, closeDrawer } = props;

    const [ name, setName ] = useState("");
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ removeLocation, removeLocationResult ] = useLocationRemoveMutation();
    const [ updateLocationQuery, updateLocationResult ] = useLocationSetTagsMutation();
    
    useQueryResult(updateLocationResult);
    useQueryResult(removeLocationResult, closeDrawer);

    useEffect(() => {
        if (!location){
            return;
        }

        setName(location.name);
        setTags(availableTags?.filter(t => location.tagIds.includes(t.id)) ?? []);
    }, [ location ]);
    
    const openDirectory = useOpenDirectory();
    
    const updateLocation = () => {
        const model = {
            updateLocationCommandModel: {
                path: location!.path,
                tags: tags.map(t => t.name),
                isRecoursive: false,
            }
        }

        updateLocationQuery(model);
    }
    
    const onRemove = useCallback(() => {
        if (!location){
            return;
        }

        closeDrawer();
        removeLocation({ removeLocationCommandModel: { locationId: location.id, isRecoursive: false } });
    }, [ closeDrawer, removeLocation, location ]);

    const hasChanges = !!location &&
        !compareArrays(tags.map(t => t.id), location.tagIds);

    return (
        <Drawer
            title={name}
            placement="right"
            onClose={closeDrawer}
            open={!!location}
            closable={false}
        >
            <DrawerContent>
                <DrawerBody>
                    <TagsListContent
                        tags={tags}
                        availableTags={availableTags ?? []}
                        updateTags={setTags}
                    />

                    {hasChanges &&
                        <DrawerButtonContainer>
                            <Button onClick={closeDrawer}>Cancel</Button>
                            <Button type="primary" onClick={updateLocation}>
                                Save
                            </Button>
                        </DrawerButtonContainer>}
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