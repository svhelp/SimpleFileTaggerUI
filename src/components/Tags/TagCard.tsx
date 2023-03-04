import { useThumbnailGetQuery } from "api/enchanced/thumbnail";
import { TagContainer } from "components/Common/Tag/TagContainer";
import { TagPlainModel } from "domain/models";

interface ITagCardProps {
    tag: TagPlainModel
    isSelected: boolean;
    isSelectionActive: boolean;
    onClick: (e: React.MouseEvent) => void;
}

export const TagCard = (props: ITagCardProps) => {
    const { tag, isSelected, isSelectionActive, onClick } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    return (
        <TagContainer
            key={tag.id}
            title={tag.name}
            background={thumbnail?.image}
            isSelected={isSelected}
            isSelectionActive={isSelectionActive}
            onClick={onClick} />
    )
}