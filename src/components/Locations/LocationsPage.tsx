import { LocationContent } from "./LocationContent";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useLocationAllQuery } from "api/enchanced/location";
import { LocationsHeader } from "./LocationsHeader";
import { useSelectedItems } from "customHooks/useSelectedItems";

export const LocationsPage = () => {
    const { data, isFetching, isError, error } = useLocationAllQuery();
    
    const [ selectedLocations, setSelectedLocations, clearSelection ] = useSelectedItems();

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <LocationsHeader
                selectedLocations={selectedLocations}
                clearSelection={clearSelection} />
            <TabContentContainer>
                <LocationContent
                    locations={data ?? []}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    clearSelection={clearSelection} />
            </TabContentContainer>
        </Tab>
    )
}