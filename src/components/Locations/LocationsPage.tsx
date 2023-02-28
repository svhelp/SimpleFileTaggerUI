import { LocationsTreeContent } from "./LocationsTreeContent";
import { Tab } from "components/Common/Tab/Tab";
import { TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useLocationAllQuery } from "api/enchanced/location";
import { LocationsHeader } from "./LocationsHeader";
import { useSelectedItems } from "customHooks/useSelectedItems";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { PlusOutlined, UnorderedListOutlined, PartitionOutlined } from '@ant-design/icons';
import { Button, Radio, RadioChangeEvent } from "antd";
import { LocationsViewType } from "domain/LocationsViewType";
import { useState } from "react";
import styled from "styled-components";
import { LocationDrawer } from "./LocationDrawer";
import { CreateLocationModal } from "./CreateLocationModal";
import { LocationPlainModel } from "domain/models";
import { LocationsListContent } from "./LocationsListContent";

export const LocationsPage = () => {
    const [ viewType, setViewType ] = useState(LocationsViewType.Tree);

    const [ isAddingLocation, setIsAddingLocation ] = useState(false);
    const [ selectedLocation, setSelectedLocation ] = useState<LocationPlainModel | undefined>(undefined);

    const { data, isFetching, isError, error } = useGetVirtualRemovable(useLocationAllQuery);
    
    const [ selectedLocations, setSelectedLocations, clearSelection ] = useSelectedItems();

    const onViewTypeChange = (e: RadioChangeEvent) => {
        setViewType(e.target.value);
    };

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <LocationsHeader
                viewType={viewType}
                selectedLocations={selectedLocations}
                clearSelection={clearSelection} />

            <ToolbarContainer>
                <Button icon={<PlusOutlined />} onClick={() => setIsAddingLocation(true)} >
                    Create
                </Button>
                <Radio.Group value={viewType} onChange={onViewTypeChange}>
                    <Radio.Button value={LocationsViewType.List}><UnorderedListOutlined /></Radio.Button>
                    <Radio.Button value={LocationsViewType.Tree}><PartitionOutlined /></Radio.Button>
                </Radio.Group>
            </ToolbarContainer>

            <TabContentContainer>
                {viewType === LocationsViewType.Tree
                    ? <LocationsTreeContent
                        locations={data ?? []}
                        selectedLocations={selectedLocations}
                        setSelectedLocation={setSelectedLocation}
                        setSelectedLocations={setSelectedLocations}
                        clearSelection={clearSelection} />
                    : <LocationsListContent
                        locations={data ?? []}
                        selectedLocations={selectedLocations}
                        setSelectedLocation={setSelectedLocation}
                        setSelectedLocations={setSelectedLocations} />}
            </TabContentContainer>
            
            <LocationDrawer
                location={selectedLocation}
                closeDrawer={() => setSelectedLocation(undefined)}
            />

            <CreateLocationModal
                isModalOpen={isAddingLocation}
                closeModal={() => setIsAddingLocation(false)} />
        </Tab>
    )
}

export const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 8px;
`