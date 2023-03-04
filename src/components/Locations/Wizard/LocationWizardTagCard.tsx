import { useThumbnailGetQuery } from "api/enchanced/thumbnail";
import { WizardTagContainer } from "components/Common/Tag/WizardTagContainer";
import { TagPlainModel } from "domain/models";

interface ILocationWizardTagCardProps {
    tag: TagPlainModel
    isSelected: boolean;
    isSelectionActive: boolean;
    onClick: () => void;
}

export const LocationWizardTagCard = (props: ILocationWizardTagCardProps) => {
    const { tag, isSelected, isSelectionActive, onClick } = props;

    const { data: thumbnail, isFetching, isError, error } = useThumbnailGetQuery({ id: tag?.id });

    return (
        <WizardTagContainer
            key={tag.id}
            title={tag.name}
            background={thumbnail?.image}
            isSelected={isSelected}
            isSelectionActive={isSelectionActive}
            onClick={onClick} />
    )
}