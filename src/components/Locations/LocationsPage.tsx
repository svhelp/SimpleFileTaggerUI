import { LocationsTreeContent } from "./LocationsTreeContent";
import { Tab } from "components/Common/Page/Tab";
import { TabContentContainer } from "components/Common/Page/Tab.styles";
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
import { LocationWizardModal } from "./Wizard/LocationWizard";
import { PageContainer } from "components/Common/Page/Page.styles";

export const LocationsPage = () => {
    const [ viewType, setViewType ] = useState(LocationsViewType.Tree);

    const [ isAddingLocation, setIsAddingLocation ] = useState(false);
    const [ wizardLocation, setWizardLocation ] = useState<LocationPlainModel | undefined>(undefined);

    const { data, isFetching, isError, error } = useGetVirtualRemovable(useLocationAllQuery);
    
    const [ selectedLocations, toggleSelectedLocation, setSelectedLocations, clearSelection ] = useSelectedItems();

    const onViewTypeChange = (e: RadioChangeEvent) => {
        setViewType(e.target.value);
    };

    return (
        <PageContainer>
            <Tab isError={isError} isFetching={isFetching} error={error} hasDetails>
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
                            toggleSelectedLocation={toggleSelectedLocation}
                            setSelectedLocations={setSelectedLocations}
                            clearSelection={clearSelection} />
                        : <LocationsListContent
                            locations={data ?? []}
                            selectedLocations={selectedLocations}
                            toggleSelectedLocation={toggleSelectedLocation} 
                            setSelectedLocations={setSelectedLocations} />}
                </TabContentContainer>

                <CreateLocationModal
                    isModalOpen={isAddingLocation}
                    closeModal={() => setIsAddingLocation(false)} />

                <LocationWizardModal
                    isModalOpen={!!wizardLocation}
                    location={wizardLocation}
                    closeModal={() => setWizardLocation(undefined)} />
            </Tab>

            <LocationDrawer
                selectedLocationIds={selectedLocations}
                openWizard={setWizardLocation} />
        </PageContainer>
    )
}

export const ToolbarContainer = styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 8px;
`