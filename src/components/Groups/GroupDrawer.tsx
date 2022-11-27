import { Drawer, Button, Divider, Checkbox } from "antd";
import { TagsListContent } from "components/Common/Tag/TagsListContent";
import { TagGroupPlainModel, TagPlainModel } from "domain/models";
import { useState, useEffect, useCallback } from "react";
import { useQueryResult } from "customHooks/useQueryResult";
import { useTagGetQuery } from "api/enchanced/tag";
import { useTagGroupRemoveMutation, useTagGroupUpdateMutation } from "api/enchanced/taggroup";
import { DrawerBody, DrawerButtonContainer, DrawerContent, DrawerFooter } from "components/Common/Drawer.styles";
import styled from "styled-components";
import { compareArrays } from "utils/compare";
import { EditableInput } from "components/Common/Input/EditableInput";

interface IGroupDrawerProps {
    group?: TagGroupPlainModel;
    closeDrawer: () => void;
}

export const GroupDrawer = (props: IGroupDrawerProps) => {
    const { group, closeDrawer } = props;

    const [ name, setName ] = useState("");
    const [ isRequired, setIsRequired ] = useState(false);
    const [ tags, setTags ] = useState<TagPlainModel[]>([]);

    const { data: availableTags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();

    const [ updateTagGroupQuery, updateTagGroupQueryResult ] = useTagGroupUpdateMutation();
    const [ removeTagGroup, removeTagGroupResult ] = useTagGroupRemoveMutation();
    
    useQueryResult(removeTagGroupResult, closeDrawer);
    useQueryResult(updateTagGroupQueryResult);

    useEffect(() => {
        if (!props.group){
            setName("");
            setIsRequired(false);
            setTags([]);
            return;
        }

        setName(props.group?.name);
        setIsRequired(props.group?.isRequired);
        setTags((availableTags ?? []).filter(t => props.group?.tagIds.includes(t.id)));
    }, [ group, availableTags ]);
    
    const onRemove = useCallback(() => {
        if (!group){
            return;
        }

        closeDrawer();
        removeTagGroup({ id:  group.id });
    }, [ closeDrawer, removeTagGroup, group ]);

    const onUpdate = () => {
        const model = {
            updateGroupCommandModel: {
                id: group!.id,
                name: name,
                isRequired: isRequired,
                tagIds: tags.map(t => t.id)
            }
        }

        updateTagGroupQuery(model);
        closeDrawer();
    }

    const hasChanges = !!group
        && (isRequired !== group.isRequired
        || name !== group.name
        || !compareArrays(tags.map(t => t.id), group.tagIds));

    return (
        <Drawer
            title={<EditableInput initValue={name} updateValue={setName}/>}
            placement="right"
            onClose={closeDrawer}
            open={!!group}
            getContainer={false}
            closable={false}
            style={{ position: 'absolute' }}
        >
            <DrawerContent>
                <DrawerBody>
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
                        <DrawerButtonContainer>
                            <Button onClick={closeDrawer}>Cancel</Button>
                            <Button type="primary" onClick={onUpdate}>
                                Save
                            </Button>
                        </DrawerButtonContainer>}
                </DrawerBody>

                <DrawerFooter>
                    <Divider />
                    <Button
                        onClick={onRemove}
                        danger>
                        Remove group
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

const DividedCheckbox = styled(Checkbox)`
    margin-bottom: 8px;
`