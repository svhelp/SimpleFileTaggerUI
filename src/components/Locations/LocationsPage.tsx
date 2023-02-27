import { LocationContent } from "./LocationContent";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useLocationAllQuery } from "api/enchanced/location";
import { LocationsHeader } from "./LocationsHeader";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { useLocationsNavigation } from "customHooks/useLocationsNavigation";

export const LocationsPage = () => {
    const { data, isFetching, isError, error } = useGetVirtualRemovable(useLocationAllQuery);
    
    const { currentLocation, goToLocation, goToPreviousLocation } = useLocationsNavigation();
    const [ selectedLocations, setSelectedLocations, clearSelection ] = useSelectedItems();

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <LocationsHeader
                currentLocation={currentLocation}
                locations={data ?? []}
                selectedLocations={selectedLocations}
                clearSelection={clearSelection}
                goToPreviousLocation={goToPreviousLocation} />
            <TabContentContainer>
                <LocationContent
                    currentLocation={currentLocation}
                    locations={data ?? []}
                    selectedLocations={selectedLocations}
                    setSelectedLocations={setSelectedLocations}
                    clearSelection={clearSelection}
                    goToLocation={goToLocation}
                    goToPreviousLocation={goToPreviousLocation} />
            </TabContentContainer>
        </Tab>
    )
}