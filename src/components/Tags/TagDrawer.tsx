import {
    UploadOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import { Drawer, Button, Upload, notification, Divider, Select } from "antd";
import ImgCrop from 'antd-img-crop';
import { TagPlainModel } from "domain/models";
import { useThumbnailGetQuery, useThumbnailRemoveMutation } from "api/enchanced/thumbnail";
import { BaseURL } from 'api/emptyApi';
import { useQueryResult } from 'customHooks/useQueryResult'
import { ErrorNotification } from "components/Common/ErrorNotification.styles";
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';
import { useTagRemoveMutation } from 'api/enchanced/tag';
import { DrawerButtonContainer, DrawerContent } from 'components/Common/Drawer.styles';
import { useTagGroupGetQuery } from 'api/enchanced/taggroup';

interface IGroupDrawerProps {
    tag?: TagPlainModel;
    closeDrawer: () => void;
}

export const TagDrawer = (props: IGroupDrawerProps) => {
    const { tag, closeDrawer } = props;

    const { data: tagGroups } = useTagGroupGetQuery();
    const { data: thumbnail, refetch, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    const [ removeThumbnail, removeThumbnailResult ] = useThumbnailRemoveMutation();
    const [ removeTag, removeTagResult ] = useTagRemoveMutation();

    useQueryResult(removeTagResult, closeDrawer);
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
        <Drawer
            title={tag?.name}
            placement="right"
            onClose={closeDrawer}
            open={!!tag}
            closable={false}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <h1>
                    Thumbnail
                </h1>

                {!!thumbnail &&
                    <img width="100%" src={`data:image/jpeg;base64,${thumbnail.image}`} />}

                <DrawerButtonContainer>
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
                </DrawerButtonContainer>

                <h1>
                    Group
                </h1>

                <Select
                    style={{ width: "100%" }}
                    allowClear
                    disabled
                    value={tag?.groupId}
                    options={tagGroups?.map(gr => ({
                        value: gr.id,
                        label: gr.name
                    }) ?? [])}
                />

                <Divider />

                <Button
                    onClick={() => removeTag({id: tag?.id})}
                    danger>
                    Remove tag
                </Button>
            </DrawerContent>
        </Drawer>
    );
}