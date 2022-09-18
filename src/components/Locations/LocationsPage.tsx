import { Alert, Skeleton } from "antd";
import Search from "antd/lib/input/Search";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";
import { LocationContent } from "./LocationContent";
import styled from "styled-components";
import { useLocationAllQuery } from "api/partial/location";

export const LocationsPage = () => {
    const [ locationPath, setLocationPath ] = useState('');

    const { data, isFetching, isError, error } = useLocationAllQuery();
    //const { data, isFetching, isError, error } = useGetLocationTagsQuery(locationPath);

    const currentLocation = useLocation();
    
    return (
        <LocationPageContainer>
            <BreadcrumbContainer>
                <LocationsBreadCrumb />
            </BreadcrumbContainer>
            <ContentContainer>
            {isFetching && <Skeleton.Image active />}

            {isError && <Alert
                message="Error"
                description={error.toString()}
                type="error"
                showIcon />}

            {data &&
                <LocationContent locations={data} />}
                
            </ContentContainer>

            <div>
                {/* <Search 
                    onSearch={setLocationPath}
                    placeholder="Input location path" 
                    enterButton="Search"
                    size="large"
                    disabled={isFetching}
                    loading={isFetching} /> */}
            </div>
        </LocationPageContainer>
    )
}

const LocationPageContainer = styled.div`
    height: 100%;
`

const BreadcrumbContainer = styled.div`
    position: sticky;
    top: 0;
`

const ContentContainer = styled.div`
    overflow: auto;
    height: 100%;
`