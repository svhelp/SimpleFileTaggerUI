import {
    UploadOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import { Drawer, Button, Upload, message, notification } from "antd";
import ImgCrop from 'antd-img-crop';
import { TagPlainModel } from "domain/models";
import styled from "styled-components";
import { useThumbnailGetQuery, useThumbnailRemoveMutation } from "api/enchanced/thumbnail";
import { BaseURL } from 'api/emptyApi';
import { useQueryResult } from 'customHooks/useQueryResult'
import { ErrorNotification } from "components/Common/ErrorNotification.styles";
import { UploadChangeParam, UploadFile } from 'antd/lib/upload';

interface IGroupDrawerProps {
    tag?: TagPlainModel;
    closeDrawer: () => void;
}

export const TagDrawer = (props: IGroupDrawerProps) => {
    const { tag, closeDrawer } = props;

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
        <Drawer
            title={tag?.name}
            placement="right"
            onClose={closeDrawer}
            open={!!tag}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <h1>
                    Thumbnail
                </h1>

                {!!thumbnail &&
                    <img width="100%" src={`data:image/jpeg;base64,${thumbnail.image}`} />}

                <ButtonContainer>
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
                </ButtonContainer>
            </DrawerContent>
        </Drawer>
    );
}

const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    height: 100%;
`

const ButtonContainer = styled.div`
    display: flex;

    margin: 16px 0;

    & > *:not(:last-child) {
        margin-right: 8px;
    }
`