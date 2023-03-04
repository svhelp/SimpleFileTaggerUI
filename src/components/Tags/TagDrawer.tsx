import {
    UploadOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import { Button, Upload, notification, Select } from "antd";
import ImgCrop from 'antd-img-crop';
import { TagPlainModel } from "domain/models";
import { useThumbnailGetQuery, useThumbnailRemoveMutation } from "api/enchanced/thumbnail";
import { BaseURL } from 'api/emptyApi';
import { useQueryResult } from 'customHooks/useQueryResult'
import { ErrorNotification } from "components/Common/ErrorNotification.styles";
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useTagGetQuery, useTagRemoveMutation, useTagUpdateMutation } from 'api/enchanced/tag';
import { useTagGroupGetQuery } from 'api/enchanced/taggroup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EditableInput } from 'components/Common/Input/EditableInput';
import { useGetVirtualRemovable } from 'customHooks/useGetVirtualRemovable';
import { DetailsSection, DetailsSectionFooter } from 'components/Common/Page/DetailsSection';
import { DetailsSectionBody, DetailsSectionBodyButtons } from 'components/Common/Page/DetailsSection.styles';

interface ITagDrawerProps {
    selectedTagIds: string[];
}

export const TagDrawer = ({ selectedTagIds }: ITagDrawerProps) => {
    const [ name, setName ] = useState("");
    const [ tagGroupId, setTagGroupId ] = useState<string | undefined>(undefined);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);
    const { data: tagGroups } = useGetVirtualRemovable(useTagGroupGetQuery);

    const [ updateTag, urdateTagResult ] = useTagUpdateMutation();
    const [ removeTag, removeTagResult ] = useTagRemoveMutation();

    useQueryResult(urdateTagResult);
    useQueryResult(removeTagResult);
    
    const tag = useMemo(() => selectedTagIds.length === 1
        ? availableTags.find(t => t.id === selectedTagIds[0])
        : undefined,
        [ selectedTagIds, availableTags ]);

    useEffect(() => {
        if (!tag){
            return;
        }

        setName(tag.name);
        setTagGroupId(tagGroups?.find(gr => gr.tagIds.includes(tag.id))?.id);
    }, [ tag, tagGroups, setName, setTagGroupId ]);


    const onUpdate = useCallback(() => {
        if (!tag){
            return;
        }

        const model = {
            updateTagCommandModel: {
                id: tag?.id,
                name: name,
                groupId: tagGroupId
            }
        }

        updateTag(model);
    }, [ tag, name, tagGroupId, updateTag ]);

    const onCancel = useCallback(() => {
        if (!tag){
            return;
        }

        setName(tag.name);
        setTagGroupId(tagGroups?.find(gr => gr.tagIds.includes(tag.id))?.id);
    }, [ tag, tagGroups, setName, setTagGroupId ]);

    const onRemove = useCallback(() => {
        if (!tag){
            return;
        }

        removeTag({ id:  tag.id });
    }, [ removeTag, tag ]);

    const hasChanges = !!tag && (name !== tag.name);

    return (
        <DetailsSection
            title={<EditableInput initValue={name} updateValue={setName}/>}
            selectedCount={selectedTagIds.length}>
                <DetailsSectionBody>
                    <h1>
                        Thumbnail
                    </h1>

                    <TagThumbnailUploader tag={tag} />

                    <h1>
                        Group
                    </h1>

                    <Select
                        style={{ width: "100%" }}
                        allowClear
                        disabled
                        value={tagGroupId}
                        options={tagGroups?.map(gr => ({
                            value: gr.id,
                            label: gr.name
                        }) ?? [])}
                    />

                    {hasChanges &&
                        <DetailsSectionBodyButtons>
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button type="primary" onClick={onUpdate}>
                                Save
                            </Button>
                        </DetailsSectionBodyButtons>}
                </DetailsSectionBody>

                <DetailsSectionFooter>
                    <Button
                        onClick={onRemove}
                        danger>
                        Remove tag
                    </Button>
                </DetailsSectionFooter>
        </DetailsSection>
    );
}

interface ITagThumbnailUploaderProps {
    tag?: TagPlainModel;
}

const TagThumbnailUploader = ({ tag }: ITagThumbnailUploaderProps) => {
    const { data: thumbnail, refetch, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    const [ removeThumbnail, removeThumbnailResult ] = useThumbnailRemoveMutation();
    
    useQueryResult(removeThumbnailResult);

    const onThumbnailUploading = (info: UploadChangeParam<UploadFile<any>>) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }

        if (info.file.status === 'done') {
            notification.success({
                message: `Success`,
                placement: "bottomRight",
            });

            refetch();
        } else if (info.file.status === 'error') {
            notification.error({
                message: `Error`,
                description: <ErrorNotification>{`${info.file.name} file upload failed.`}</ErrorNotification>,
                placement: "bottomRight",
                duration: 0,
            });
        }
    };

    return (
        <>
            {!!thumbnail &&
                <img width="100%" src={`data:image/jpeg;base64,${thumbnail.image}`} />}
            <DetailsSectionBodyButtons>
                <ImgCrop rotate>
                    <Upload
                        name='file'
                        action={`${BaseURL}/api/Thumbnail/Add?tagId=${tag?.id}`}
                        showUploadList={false}
                        onChange = {onThumbnailUploading}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </ImgCrop>
                {!!thumbnail &&
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => removeThumbnail({ id: tag?.id })}>
                        Remove
                    </Button>}
            </DetailsSectionBodyButtons>
        </>
    );
}