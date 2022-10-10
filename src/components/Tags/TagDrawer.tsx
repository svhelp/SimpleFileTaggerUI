import { Drawer, Space, Button, UploadFile, Upload } from "antd";
import { TagPlainModel } from "domain/models";
import { useQueryResult } from "customHooks/useQueryResult";
import styled from "styled-components";
import { useThumbnailAddMutation, useThumbnailGetQuery, useThumbnailRemoveMutation } from "api/enchanced/thumbnail";
import { useState } from "react";

interface IGroupDrawerProps {
    tag?: TagPlainModel;
    closeDrawer: () => void;
}

export const TagDrawer = (props: IGroupDrawerProps) => {
    const { tag, closeDrawer } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    const [ addThumbnail, addThubmnailResult ] = useThumbnailAddMutation();
    const [ removeThumbnail, removeThubmnailResult ] = useThumbnailRemoveMutation();
    
    useQueryResult(addThubmnailResult);
    useQueryResult(removeThubmnailResult);

    const [fileList, setFileList] = useState<UploadFile[]>([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]);

    return (
        <Drawer
            title={tag?.name}
            placement="right"
            onClose={closeDrawer}
            visible={!!tag}
            getContainer={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                
                {!!thumbnail &&
                    <img src={`data:image/jpeg;base64,${thumbnail.image}`} />}


                {/* <ImgCrop rotate>
                    <Upload
                        name='file'
                        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                        onChange = {(info) => {
                            if (info.file.status !== 'uploading') {
                            console.log(info.file, info.fileList);
                            }
                            if (info.file.status === 'done') {
                            message.success(`${info.file.name} file uploaded successfully`);
                            } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} file upload failed.`);
                            }
                        }}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </ImgCrop> */}
            </DrawerContent>
        </Drawer>
    );
}

const DrawerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    height: 100%;
`