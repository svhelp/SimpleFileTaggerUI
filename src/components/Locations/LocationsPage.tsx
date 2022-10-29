import { LocationContent } from "./LocationContent";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useLocationAllQuery } from "api/enchanced/location";
import { LocationsHeader } from "./LocationsHeader";

export const LocationsPage = () => {
    const { data, isFetching, isError, error } = useLocationAllQuery();

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <LocationsHeader/>
            <TabContentContainer>
                <LocationContent locations={data ?? []} />
            </TabContentContainer>
        </Tab>
    )
}