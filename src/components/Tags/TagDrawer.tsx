import {
    UploadOutlined,
    DeleteOutlined
  } from '@ant-design/icons';
import { Drawer, Button, Upload, message } from "antd";
import ImgCrop from 'antd-img-crop';
import { TagPlainModel } from "domain/models";
import styled from "styled-components";
import { useThumbnailGetQuery, useThumbnailRemoveMutation } from "api/enchanced/thumbnail";
import { BaseURL } from 'api/emptyApi';
import { useQueryResult } from 'customHooks/useQueryResult'

interface IGroupDrawerProps {
    tag?: TagPlainModel;
    closeDrawer: () => void;
}

export const TagDrawer = (props: IGroupDrawerProps) => {
    const { tag, closeDrawer } = props;

    const { data: thumbnail, refetch, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    const [ removeThumbnail, removeThumbnailResult ] = useThumbnailRemoveMutation();

    useQueryResult(removeThumbnailResult);

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
                {!!thumbnail &&
                    <img width="100%" src={`data:image/jpeg;base64,${thumbnail.image}`} />}

                <ButtonContainer>
                    <ImgCrop rotate>
                        <Upload
                            name='file'
                            action={`${BaseURL}/api/Thumbnail/Add?tagId=${tag?.id}`}
                            showUploadList={false}
                            onChange = {(info) => {
                                if (info.file.status !== 'uploading') {
                                    console.log(info.file, info.fileList);
                                }
                                if (info.file.status === 'done') {
                                    message.success(`${info.file.name} file uploaded successfully`);
                                    refetch();
                                } else if (info.file.status === 'error') {
                                    message.error(`${info.file.name} file upload failed.`);
                                }
                            }}>
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