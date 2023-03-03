import { FolderOpenOutlined } from '@ant-design/icons';
import { Drawer, Button, Divider } from "antd";
import { DrawerBody, DrawerButtonContainer, DrawerContent, DrawerFooter } from "components/Common/Drawer.styles";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationAllQuery, useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useOpenDirectory } from 'customHooks/useOpenDirectory';
import { useGetVirtualRemovable } from 'customHooks/useGetVirtualRemovable';
import { compareArrays } from 'utils/compare';
import { usePerformRecoursiveAction } from 'customHooks/usePerformRecoursiveAction';
import styled from 'styled-components';

interface ILocationDrawerProps {
    location?: LocationPlainModel;
    openWizard: (location: LocationPlainModel) => void;
    closeDrawer: () => void;
}

export const LocationDrawer = (props: ILocationDrawerProps) => {
    const { location, closeDrawer, openWizard } = props;

    const [ name, setName ] = useState("");
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: locations, isFetching, isError, error } = useGetVirtualRemovable(useLocationAllQuery);
    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ removeLocationQuery, removeLocationResult ] = useLocationRemoveMutation();
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
    
    const removeLocation = usePerformRecoursiveAction(
        "The directory contains children",
        "Do you want to remove sub-directories as well?",
        (location: LocationPlainModel, isRecoursive: boolean) =>
            removeLocationQuery({ removeLocationCommandModel: { locationId: location.id, isRecoursive: isRecoursive } }),
        locations
    );

    const onRemove = useCallback(() => {
        if (!location){
            return;
        }

        closeDrawer();
        removeLocation(location);
    }, [ closeDrawer, removeLocation, location ]);

    const startWizard = () => {
        openWizard(location!);
        closeDrawer();
    }

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
                    <WizardButtonContainer>
                        <Button type="primary" onClick={startWizard}>
                            Wizard
                        </Button>
                    </WizardButtonContainer>

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

export const WizardButtonContainer = styled.div`
    margin-bottom: 8px;
`