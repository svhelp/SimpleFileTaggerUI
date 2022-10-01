import { LocationsBreadCrumb } from "./LocationsBreadCrumb";
import { LocationContent } from "./LocationContent";
import { useLocationAllQuery } from "api/partial/location";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer, TabHeaderContainer } from "components/Common/Tab/Tab.styles";

export const LocationsPage = () => {
    const { data, isFetching, isError, error } = useLocationAllQuery();
    //const { data, isFetching, isError, error } = useGetLocationTagsQuery(locationPath);

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeaderContainer>
                <LocationsBreadCrumb />
            </TabHeaderContainer>
            <TabContentContainer>
                <LocationContent locations={data ?? []} />
            </TabContentContainer>
        </Tab>
    )
}