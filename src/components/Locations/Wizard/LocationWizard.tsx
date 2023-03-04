import { Modal } from "antd";
import { useLocationSetTagsMutation } from "api/enchanced/location";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupGetQuery } from "api/enchanced/taggroup";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { LocationPlainModel } from "domain/models";
import { useEffect, useState } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { LocationWizardGroup } from "./LocationWizardGroup";

interface ILocationWizardModalProps {
    isModalOpen: boolean;
    location?: LocationPlainModel;
    closeModal: () => void;
}

export const LocationWizardModal = (props: ILocationWizardModalProps) => {
    const { location } = props;

    const [ tags, setTags ] = useState<string[]>([]);

    const { data: tagGroups, isFetching, isError, error } = useGetVirtualRemovable(useTagGroupGetQuery);
    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);

    const [ updateLocationQuery, updateLocationResult ] = useLocationSetTagsMutation();
    
    useQueryResult(updateLocationResult);
    
    useEffect(() => {
        if (!location || !availableTags){
            return;
        }

        const initialTags = availableTags.filter(t => location.tagIds.includes(t.id)).map(t => t.name);
        setTags(initialTags);
    }, [ location, availableTags, setTags ]);
    
    const onToggleTag = (tagId: string) => {
        setTags(state =>
            state.includes(tagId)
                ? state.filter(t => t !== tagId)
                : state.concat([tagId]));
    }

    const closeModal = () => {
        props.closeModal();
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
        closeModal();
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
                            isRequired={group.isRequired}
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