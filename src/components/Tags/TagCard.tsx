import { TagContainer } from 'components/Common/Tag/TagContainer';
import { TagPlainModel } from "domain/models";
import { useThumbnailGetQuery } from "api/enchanced/thumbnail";
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface ITagCardProps {
    tag: TagPlainModel
    isSelected: boolean;
    onSelect?: (e: CheckboxChangeEvent) => void;
    setSelectedTag: () => void;
}

export const TagCard = (props: ITagCardProps) => {
    const { tag, isSelected, onSelect, setSelectedTag } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    return (
        <TagContainer
            key={tag.id}
            title={tag.name}
            background={thumbnail?.image}
            isSelected={isSelected}
            onSelect={onSelect}
            onClick={setSelectedTag} />
    )
}