import { TagContainer } from 'components/Common/Tag/TagContainer';
import { TagPlainModel } from "domain/models";
import { useThumbnailGetQuery } from "api/enchanced/thumbnail";

interface ITagCardProps {
    tag: TagPlainModel
    isSelected: boolean;
    removeTag: () => void;
    setSelectedTag: () => void;
}

export const TagCard = (props: ITagCardProps) => {
    const { tag, isSelected, removeTag, setSelectedTag } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    return (
        <TagContainer
            key={tag.id}
            title={tag.name}
            background={thumbnail?.image}
            isSelected={isSelected}
            onClick={setSelectedTag}
            onRemove={removeTag} />
    )
}