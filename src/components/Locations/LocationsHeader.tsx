import {  Button, PageHeader } from "antd";
import { TabHeaderContainer } from "components/Common/Tab/Tab.styles";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";
import { LocationsViewType } from "domain/LocationsViewType";
import { useLocationsNavigation } from "customHooks/useLocationsNavigation";

interface ILocationHeaderProps {
    viewType: LocationsViewType;
    selectedLocations: string[];
    clearSelection: () => void;
}

export const LocationsHeader = (props: ILocationHeaderProps) => {
    const { viewType, selectedLocations, clearSelection } = props;

    const {
        currentLocation,
        goToPreviousLocation,
    } = useLocationsNavigation();
    
    const isTree = viewType === LocationsViewType.Tree;
    const canGoBack = isTree && !!currentLocation;

    const onBackClicked = () => {
        clearSelection();
        goToPreviousLocation();
    }

    return (
        <TabHeaderContainer>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title="Locations"
                onBack={canGoBack ? () => onBackClicked() : undefined}
                breadcrumbRender={() => <LocationsBreadCrumb viewType={viewType} />}
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