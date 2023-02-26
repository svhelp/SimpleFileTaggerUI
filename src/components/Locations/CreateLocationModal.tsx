import { Checkbox, Divider, Modal } from "antd"
import { useState } from "react"
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationCreateMutation } from "api/enchanced/location";
import { TagPlainModel } from "domain/models";
import { useTagGetQuery } from "api/enchanced/tag";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { LocationInput } from 'components/Common/Input/LocationInput';
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import styled from "styled-components";

interface IBindTagModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const CreateLocationModal = (props: IBindTagModalProps) => {
    const [ locationPath, setLocationPath ] = useState("");
    const [ isRecoursive, setIsRecoursive ] = useState(true);
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);
    
    const [ createLocationQuery, createLocationQueryResult ] = useLocationCreateMutation();
    
    useQueryResult(createLocationQueryResult);

    const closeModal = () => {
        setLocationPath("");
        setIsRecoursive(true);
        setTags([]);

        props.closeModal();
    }

    const createLocation = () => {
        const model = {
            createLocationCommandModel: {
                path: locationPath,
                tags: tags.map(t => t.id),
                isRecoursive: isRecoursive,
            }
        };

        createLocationQuery(model);
        closeModal();
    }

    return (
        <Modal
            title="New Location"
            open={props.isModalOpen}
            onOk={createLocation}
            onCancel={closeModal}>
                <LocationInput path={locationPath} setPath={setLocationPath} />
                <DividedCheckbox
                    checked={isRecoursive}
                    onChange={e => setIsRecoursive(e.target.checked)}>
                        Add recoursively
                </DividedCheckbox>
                <Divider />
                <TagsListContent
                    tags={tags}
                    availableTags={availableTags ?? []}
                    updateTags={setTags}
                />
        </Modal>
    )
}

const DividedCheckbox = styled(Checkbox)`
    margin-top: 8px;
`