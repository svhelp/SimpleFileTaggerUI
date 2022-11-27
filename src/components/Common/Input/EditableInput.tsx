import { Button, Input } from "antd";
import { useCallback, useEffect, useState } from "react"
import {
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
  } from '@ant-design/icons';
import styled from "styled-components";

interface IEditableInputProps {
    initValue: string;
    updateValue: (newValue: string) => void
}

export const EditableInput = (props: IEditableInputProps) => {
    const [ isEditMode, setIsEditMode ] = useState(false);
    const [ value, setValue ] = useState(props.initValue);

    useEffect(() => {
        setValue(props.initValue);
    }, [ props.initValue ])

    const toggleEditModel = useCallback(() => {
        setIsEditMode(value => !value);
    }, [ setIsEditMode ]);

    const onApply = useCallback(() => {
        setIsEditMode(false);
        props.updateValue(value);
    }, [ value, props.updateValue, setIsEditMode ]);

    const onCancel = useCallback(() => {
        setIsEditMode(false);
        setValue(props.initValue);
    }, [ props.initValue, setValue, setIsEditMode ]);

    if (!isEditMode){
        return (
            <EditableInputContainer onClick={toggleEditModel}>
                {props.initValue}
                <Button type="text">
                    <EditOutlined />
                </Button>
            </EditableInputContainer>
        );
    }

    return (
        <EditableInputContainer>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}/>
            <Button type="text" onClick={onApply}>
                <CheckCircleOutlined />
            </Button>
            <Button type="text" onClick={onCancel}>
                <CloseCircleOutlined />
            </Button>
        </EditableInputContainer>
    )
}

const EditableInputContainer = styled.div`
    display: flex;

    button {
        margin-left: 4px;
    }
`