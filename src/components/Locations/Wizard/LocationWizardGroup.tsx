import { Button, Space } from "antd";
import { TagPlainModel } from "domain/models";
import { useState } from "react";
import styled from "styled-components";
import {
    WarningOutlined,
  } from '@ant-design/icons';
import { LocationWizardTagCard } from "./LocationWizardTagCard";

interface ILocationWizardGroupProps {
    groupName: string;
    isRequired?: boolean;
    groupTags: TagPlainModel[];
    selectedTags: string[];
    onToggleTag: (tagId: string) => void;
}

export const LocationWizardGroup = (props: ILocationWizardGroupProps) => {
    const { groupName, isRequired, groupTags, selectedTags, onToggleTag } = props;

    const isSelectionActive = groupTags.some(t => selectedTags.includes(t.name));

    const [ isCollapsed, setIsCollapsed ] = useState(isSelectionActive);

    const shownTags = isCollapsed
        ? groupTags.filter(t => selectedTags.includes(t.name))
        : groupTags;

    return (
        <div>
            <LocationWizardGroupHeaderContainer>
                <LocationWizardGroupHeader>
                    <h2>{groupName}</h2>
                    {isRequired && !isSelectionActive && <WarningOutlined style={{fontSize: '22px', color: "#a00"}} />}
                </LocationWizardGroupHeader>
                <Button disabled={!isSelectionActive} onClick={() => setIsCollapsed(state => !state)}>
                    Toggle
                </Button>
            </LocationWizardGroupHeaderContainer>
            <Space wrap>
                {shownTags.map(tag => 
                    <LocationWizardTagCard
                        key={tag.id}
                        tag={tag}
                        isSelected={selectedTags.includes(tag.name)}
                        isSelectionActive={isSelectionActive}
                        onClick={() => onToggleTag(tag.name)} />)}
            </Space>
        </div>
    )
}

export const LocationWizardGroupHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 8px;
`

export const LocationWizardGroupHeader = styled.span`
    display: flex;
    align-items: center;

    h2 {
        margin: 0 8px 0 0;
    }
`