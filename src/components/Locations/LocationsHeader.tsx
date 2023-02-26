import {  Button, PageHeader } from "antd";
import { TabHeaderContainer } from "components/Common/Tab/Tab.styles";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";
import { LocationPlainModel } from "domain/models";

interface ILocationHeaderProps {
    currentLocation: LocationPlainModel | undefined;
    locations: LocationPlainModel[];
    selectedLocations: string[];
    clearSelection: () => void;
    goToPreviousLocation: (locations: LocationPlainModel[]) => void;
}

export const LocationsHeader = (props: ILocationHeaderProps) => {
    const { currentLocation, locations, selectedLocations, clearSelection, goToPreviousLocation } = props;
    
    const canGoBack = !!currentLocation;

    const onBackClicked = () => {
        clearSelection();
        goToPreviousLocation(locations);
    }

    return (
        <TabHeaderContainer>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title="Locations"
                onBack={canGoBack ? () => onBackClicked() : undefined}
                breadcrumbRender={() => <LocationsBreadCrumb />}
                extra={
                    <>
                        {selectedLocations.length > 0 &&
                            <Button onClick={clearSelection}>
                                Clear selection
                            </Button>}
                    </>
                } />
        </TabHeaderContainer>
    )
}