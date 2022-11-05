import {  Button, PageHeader } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { TabHeaderContainer } from "components/Common/Tab/Tab.styles";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";

interface ILocationHeaderProps {
    selectedLocations: string[];
    clearSelection: () => void;
}

export const LocationsHeader = ({ selectedLocations, clearSelection }: ILocationHeaderProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const lastLevelName = location.pathname.split('/').filter(i => i).pop()
    const canGoBack = lastLevelName !== "locations";

    const goBack = () => {
        clearSelection();
        navigate(-1);
    }

    return (
        <TabHeaderContainer>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title="Locations"
                onBack={canGoBack ? () => goBack() : undefined}
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