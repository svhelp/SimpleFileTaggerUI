import {  PageHeader } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { TabHeaderContainer } from "components/Common/Tab/Tab.styles";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";

export const LocationsHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const lastLevelName = location.pathname.split('/').filter(i => i).pop()
    const canGoBack = lastLevelName !== "locations";

    return (
        <TabHeaderContainer>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title="Locations"
                onBack={canGoBack ? () => navigate(-1) : undefined}
                breadcrumbRender={() => <LocationsBreadCrumb />} />
        </TabHeaderContainer>
    )
}