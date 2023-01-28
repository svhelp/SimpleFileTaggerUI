import { FolderOpenOutlined } from '@ant-design/icons';
import { Button, Input } from "antd"
import React from 'react';
import styled from "styled-components";

interface LocationInputProps {
    path: string;
    setPath: (value: string) => void;
}

export const LocationInput = (props: LocationInputProps) => {
    const { path, setPath } = props;

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setPath(e.target.value)

    const selectDirectory = async () => {
        const selectedLocation = await window.electron.ipcRenderer.selectFolder();

        if (!selectedLocation){
            return;
        }

        setPath(selectedLocation);
    };

    return (
        <LocationInputContainer>
            <Input placeholder="Path" value={path} onChange={onInputChange} />
            <Button type="text" icon={<FolderOpenOutlined />} onClick={selectDirectory} />
        </LocationInputContainer>
    )
}

const LocationInputContainer = styled.div`
    display: flex;
    
    & > *:not(:last-child) {
        margin-right: 8px;
    }
`