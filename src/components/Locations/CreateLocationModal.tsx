import { Divider, Input, Modal } from "antd"
import { useState } from "react"
import { useQueryResult } from "customHooks/useQueryResult";
import { useLocationAddTagsMutation } from "api/enchanced/location";
import { TagPlainModel } from "domain/models";
import { useTagGetQuery } from "api/enchanced/tag";
import { TagsListContent } from "components/Common/Tag/TagsListContent";

interface IBindTagModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export const CreateLocationModal = (props: IBindTagModalProps) => {
    const [ locationPath, setLocationPath ] = useState("");
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();
    
    const [ createLocationQuery, createLocationQueryResult ] = useLocationAddTagsMutation();
    
    useQueryResult(createLocationQueryResult);

    const closeModal = () => {
        setLocationPath("");
        setTags([]);

        props.closeModal();
    }

    const createLocation = () => {
        const model = {
            updateLocationCommandModel: {
                path: locationPath,
                tags: tags.map(t => t.id)
            }
        }

        createLocationQuery(model);
        closeModal();
    }

    return (
        <Modal
            title="New Location"
            open={props.isModalOpen}
            onOk={createLocation}
            onCancel={closeModal}>
            <Input placeholder="Path" value={locationPath} onChange={(e) => setLocationPath(e.target.value)} />
            <Divider />
            <TagsListContent
                tags={tags}
                availableTags={availableTags ?? []}
                updateTags={setTags}
            />
        </Modal>
    )
}