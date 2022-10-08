import { InputRef, Tag, Tooltip, AutoComplete, Input } from "antd";
import {
    PlusOutlined,
  } from '@ant-design/icons';
import { useRef, useState, useEffect } from "react";
import { TagPlainModel } from "domain/models";

interface ITagsListContentProps {
    tags: TagPlainModel[];
    availableTags: TagPlainModel[];
    updateTags: (tags: TagPlainModel[]) => void;
}

export const TagsListContent = (props: ITagsListContentProps) => {
    const { tags, availableTags, updateTags } = props;

    const inputRef = useRef<InputRef>(null);

    const [ newTagValue, setNewTagValue ] = useState("");
    const [ newTagVisible, setNewTagVisible ] = useState(false);

    useEffect(() => {
        inputRef.current?.focus();
    }, [ newTagVisible ]);

    const activateInput = () => {
        setNewTagVisible(true);
    }

    const handleRemove = (id: string) => {
        updateTags(tags.filter(t => t.id !== id));
    }
    
    const handleAdd = (id: string) => {
        updateTags(tags.concat(availableTags.filter(t => t.id === id)));
    }

    const handleInputConfirm = (tagValue: string) => {
        const tagToAdd = availableTags.find(t => t.name === tagValue);

        if (!!tagValue && !!tagToAdd){
            handleAdd(tagToAdd.id);
        }

        setNewTagValue("");
        setNewTagVisible(false);
    }

    return (
        <div>
            {tags.map(tag => {
                const isLongTag = tag.name.length > 20;

                const tagElem = (
                <Tag
                    className="edit-tag"
                    key={tag.id}
                    closable={true}
                    onClose={() => handleRemove(tag.id)}
                >
                    <span>
                        {isLongTag
                            ? `${tag.name.slice(0, 20)}...`
                            : tag.name}
                    </span>
                </Tag>
                );

                return isLongTag ? (
                    <Tooltip title={tag.name} key={tag.id}>
                        {tagElem}
                    </Tooltip>
                ) : (
                    tagElem
                );
            })}

            {newTagVisible && (
                <AutoComplete
                    value={newTagValue}
                    onChange={query => setNewTagValue(query)}
                    onSelect={(query: string, selectedTag: { value: string }) => {
                        if (!!selectedTag && !Array.isArray(selectedTag)){
                            handleInputConfirm(query);
                        }
                    }}
                    options={availableTags?.map(t => ({value: t.name})) ?? []}
                    filterOption={(query, option) => {
                        if (!query){
                            return true;
                        }

                        return option?.value.startsWith(query) ?? false
                    }}
                >
                    <Input
                        ref={inputRef}
                        type="text"
                        size="small"
                        className="tag-input"
                        onBlur={() => handleInputConfirm("")}
                        //onPressEnter={handleInputConfirm}
                        />
                </AutoComplete>
            )}

            {!newTagVisible && (
                <Tag className="site-tag-plus" onClick={activateInput}>
                    <PlusOutlined /> Add Tag
                </Tag>
            )}
        </div>
    )
}