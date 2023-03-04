import { Divider } from "antd";
import { DetailsSectionWrapper, DetailsSectionContainer, DetailsSectionTitle, DetailsSectionContent, DetailsSectionFooterContainer } from "./DetailsSection.styles";

interface IDetailsSectionProps {
    title?: React.ReactNode;
    selectedCount?: number;
    children?: React.ReactNode;
}

export const DetailsSection = ({title, selectedCount, children}: IDetailsSectionProps) => {
    let content = children;
    let placeholderUsed = false;

    if (selectedCount === 0) {
        placeholderUsed= true;
        content = "No items selected";
    }
    
    if (!!selectedCount && selectedCount > 1) {
        placeholderUsed= true;
        content = `Selected items: ${selectedCount}`;
    }

    return (
        <DetailsSectionWrapper>
            <DetailsSectionContainer>
                {!placeholderUsed && title &&
                    <DetailsSectionTitle>
                        {title}
                    </DetailsSectionTitle>}
                <DetailsSectionContent>
                    {content}
                </DetailsSectionContent>
            </DetailsSectionContainer>
        </DetailsSectionWrapper>
    )
}

interface IDetailsSectionFooterProps {
    children: React.ReactNode;
}

export const DetailsSectionFooter = ({children}: IDetailsSectionFooterProps) => 
    <DetailsSectionFooterContainer>
        <Divider />
        {children}
    </DetailsSectionFooterContainer>