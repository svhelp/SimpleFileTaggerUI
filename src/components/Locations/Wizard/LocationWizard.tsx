import { Modal, Space } from "antd";
import { useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupGetQuery } from "api/enchanced/taggroup";
import { useThumbnailGetQuery } from "api/enchanced/thumbnail";
import { WizardTagContainer } from "components/Common/Tag/WizardTagContainer";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { LocationPlainModel, TagGroupPlainModel, TagPlainModel } from "domain/models";
import { useState } from "react";
import { useQueryResult } from "customHooks/useQueryResult";

interface ILocationWizardModalProps {
    isModalOpen: boolean;
    location?: LocationPlainModel;
    closeModal: () => void;
}

export const LocationWizardModal = (props: ILocationWizardModalProps) => {
    const { location } = props;

    const [ tags, setTags ] = useState(location?.tagIds ?? []);

    const { data: tagGroups, isFetching, isError, error } = useGetVirtualRemovable(useTagGroupGetQuery);
    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ updateLocationQuery, updateLocationResult ] = useLocationSetTagsMutation();
    
    useQueryResult(updateLocationResult);
    
    const onToggleTag = (tagId: string) => {
        setTags(state =>
            state.includes(tagId)
                ? state.filter(t => t !== tagId)
                : state.concat([tagId]));
    }

    const updateLocation = () => {
        const model = {
            updateLocationCommandModel: {
                path: location?.path ?? "",
                tags: tags,
                isRecoursive: false,
            }
        }

        updateLocationQuery(model);
    }

    const closeModal = () => {
        setTags([]);

        props.closeModal();
    }

    const otherTags = availableTags.filter(t => !tagGroups.some(gr => gr.tagIds.includes(t.id)));

    return (
        <Modal
            title="Location wizard"
            width="90%"
            open={props.isModalOpen}
            onOk={updateLocation}
            onCancel={closeModal}>
                {tagGroups
                    .filter(gr => gr.tagIds.length > 0)
                    .map(group =>
                        <LocationWizardGroup
                            key={group.id}
                            groupName={group.name}
                            groupTags={availableTags.filter(t => group.tagIds.includes(t.id))}
                            selectedTags={tags}
                            onToggleTag={onToggleTag} />)}
                <LocationWizardGroup
                    groupName="Other"
                    groupTags={otherTags}
                    selectedTags={tags}
                    onToggleTag={onToggleTag} />
        </Modal>
    )
}

interface ILocationWizardGroupProps {
    groupName: string;
    groupTags: TagPlainModel[];
    selectedTags: string[];
    onToggleTag: (tagId: string) => void;
}

export const LocationWizardGroup = (props: ILocationWizardGroupProps) => {
    const { groupName, groupTags, selectedTags, onToggleTag } = props;


    const isSelectionActive = groupTags.some(t => selectedTags.includes(t.id));

    return (
        <div>
            <h2>
                {groupName}
            </h2>
            <Space wrap>
                {groupTags.map(tag => 
                    <TagCard
                        key={tag.id}
                        tag={tag}
                        isSelected={selectedTags.includes(tag.id)}
                        isSelectionActive={isSelectionActive}
                        onClick={() => onToggleTag(tag.id)} />)}
            </Space>
        </div>
    )
}

interface ITagCardProps {
    tag: TagPlainModel
    isSelected: boolean;
    isSelectionActive: boolean;
    onClick: () => void;
}

export const TagCard = (props: ITagCardProps) => {
    const { tag, isSelected, isSelectionActive, onClick } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    return (
        <WizardTagContainer
            key={tag.id}
            title={tag.name}
            background={thumbnail?.image}
            isSelected={isSelected}
            isSelectionActive={isSelectionActive}
            onClick={onClick} />
    )
}