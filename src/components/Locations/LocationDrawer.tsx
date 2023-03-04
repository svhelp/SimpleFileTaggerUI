import { FolderOpenOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationAllQuery, useLocationRemoveMutation, useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useOpenDirectory } from 'customHooks/useOpenDirectory';
import { useGetVirtualRemovable } from 'customHooks/useGetVirtualRemovable';
import { compareArrays } from 'utils/compare';
import { usePerformRecoursiveAction } from 'customHooks/usePerformRecoursiveAction';
import styled from 'styled-components';
import { DetailsSection, DetailsSectionFooter } from 'components/Common/Page/DetailsSection';
import { DetailsSectionBody, DetailsSectionBodyButtons, DetailsSectionFooterButtons } from 'components/Common/Page/DetailsSection.styles';

interface ILocationDrawerProps {
    selectedLocationIds: string[];
    openWizard: (location: LocationPlainModel) => void;
}

export const LocationDrawer = ({ selectedLocationIds, openWizard }: ILocationDrawerProps) => {
    const [ name, setName ] = useState("");
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: locations, isFetching, isError, error } = useGetVirtualRemovable(useLocationAllQuery);
    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ removeLocationQuery, removeLocationResult ] = useLocationRemoveMutation();
    const [ updateLocationQuery, updateLocationResult ] = useLocationSetTagsMutation();
    
    useQueryResult(updateLocationResult);
    useQueryResult(removeLocationResult);

    const location = useMemo(() => selectedLocationIds.length === 1
        ? locations.find(t => t.id === selectedLocationIds[0])
        : undefined,
        [ selectedLocationIds, locations ]);

    useEffect(() => {
        if (!location){
            return;
        }

        setName(location.name);
        setTags(availableTags.filter(t => location.tagIds.includes(t.id)) ?? []);
    }, [ location, availableTags, setName, setTags ]);
    
    const openDirectory = useOpenDirectory();
    
    const updateLocation = () => {
        if (!location){
            return;
        }

        const model = {
            updateLocationCommandModel: {
                path: location?.path,
                tags: tags.map(t => t.name),
                isRecoursive: false,
            }
        }

        updateLocationQuery(model);
    }

    const onCancel = useCallback(() => {
        if (!location){
            return;
        }

        setName(location.name);
        setTags(availableTags.filter(t => location.tagIds.includes(t.id)) ?? []);
    }, [ location, availableTags, setName, setTags ]);
    
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

        removeLocation(location);
    }, [ removeLocation, location ]);

    const startWizard = () => {
        openWizard(location!);
    }

    const hasChanges = !!location &&
        !compareArrays(tags.map(t => t.id), location.tagIds);

    return (
        <DetailsSection
            title={name}
            selectedCount={selectedLocationIds.length}>
                <DetailsSectionBody>
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
                        <DetailsSectionBodyButtons>
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button type="primary" onClick={updateLocation}>
                                Save
                            </Button>
                        </DetailsSectionBodyButtons>}
                </DetailsSectionBody>
                
                <DetailsSectionFooter>
                    <DetailsSectionFooterButtons>
                        <Button icon={<FolderOpenOutlined />} onClick={() => openDirectory(location!)} >
                            Open location
                        </Button>
                        <Button
                            onClick={onRemove}
                            danger>
                            Remove location
                        </Button>
                    </DetailsSectionFooterButtons>
                </DetailsSectionFooter>
        </DetailsSection>
    );
}

export const WizardButtonContainer = styled.div`
    margin-bottom: 8px;
`