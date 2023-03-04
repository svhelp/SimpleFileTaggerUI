import { Button, Checkbox } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupGetQuery, useTagGroupRemoveMutation, useTagGroupUpdateMutation } from "api/enchanced/taggroup";
import styled from "styled-components";
import { compareArrays } from "utils/compare";
import { EditableInput } from "components/Common/Input/EditableInput";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { DetailsSection, DetailsSectionFooter } from "components/Common/Page/DetailsSection";
import { DetailsSectionBody, DetailsSectionBodyButtons } from "components/Common/Page/DetailsSection.styles";

interface IGroupDrawerProps {
    selectedGroupIds: string[];
}

export const GroupDrawer = (props: IGroupDrawerProps) => {
    const { selectedGroupIds } = props;

    const [ name, setName ] = useState("");
    const [ isRequired, setIsRequired ] = useState(false);
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);
    const { data: tagGroups, isFetching, isError, error } = useGetVirtualRemovable(useTagGroupGetQuery);

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    const [ removeTagGroup, removeTagGroupResult ] = useTagGroupRemoveMutation();
    
    useQueryResult(removeTagGroupResult);
    useQueryResult(updateTagGroupQueryResult);

    const group = useMemo(() => selectedGroupIds.length === 1
        ? tagGroups.find(gr => gr.id === selectedGroupIds[0])
        : undefined,
        [ selectedGroupIds, tagGroups ]);

    useEffect(() => {
        if (!group){
            return;
        }

        setName(group.name);
        setIsRequired(group.isRequired);
        setTags((availableTags ?? []).filter(t => group?.tagIds.includes(t.id)));
    }, [ group, availableTags ]);
    
    const onRemove = useCallback(() => {
        if (!group){
            return;
        }

        removeTagGroup({ id:  group.id });
    }, [ group, removeTagGroup ]);

    const onUpdate = () => {
        if (!group){
            return;
        }

        const model = {
            updateGroupCommandModel: {
                id: group.id,
                name: name,
                isRequired: isRequired,
                tagIds: tags.map(t => t.id)
            }
        }

        updateTagGroupQuery(model);
    }

    const onCancel = useCallback(() => {
        if (!group){
            return;
        }

        setName(group.name);
        setIsRequired(group.isRequired);
        setTags((availableTags ?? []).filter(t => group?.tagIds.includes(t.id)));
    }, [ group, availableTags, setName, setIsRequired, setTags ]);

    const hasChanges = !!group
        && (isRequired !== group.isRequired
        || name !== group.name
        || !compareArrays(tags.map(t => t.id), group.tagIds));

    return (
        <DetailsSection
            title={<EditableInput initValue={name} updateValue={setName}/>}
            selectedCount={selectedGroupIds.length}>
                <DetailsSectionBody>
                    <DividedCheckbox
                        checked={isRequired}
                        onChange={e => setIsRequired(e.target.checked)}>
                            Required
                    </DividedCheckbox>
                    <TagsListContent
                        tags={tags}
                        availableTags={availableTags ?? []}
                        updateTags={setTags}
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
                        Remove group
                    </Button>
                </DetailsSectionFooter>
        </DetailsSection>
    );
}

const DividedCheckbox = styled(Checkbox)`
    margin-bottom: 8px;
`