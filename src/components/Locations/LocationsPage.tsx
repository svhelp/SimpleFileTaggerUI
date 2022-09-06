import { Alert, Skeleton } from "antd";
import Search from "antd/lib/input/Search";
import { useGetLocationsQuery, useGetLocationTagsQuery } from "api/sftApi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { LocationsBreadCrumb } from "./LocationsBreadCrumb";
import { LocationContent } from "./LocationContent";

export const LocationsPage = () => {
    const [ locationPath, setLocationPath ] = useState('');

    const { data, isFetching, isError, error } = useGetLocationsQuery('');
    //const { data, isFetching, isError, error } = useGetLocationTagsQuery(locationPath);

    const currentLocation = useLocation();
    
    return (
        <div>
            <h1>
                Locations page
            </h1>
            
            {isFetching && <Skeleton.Image active />}

            {isError && <Alert
                message="Error"
                description={error.toString()}
                type="error"
                showIcon />}

            <div>
                {data && 
                    <>
                        <LocationsBreadCrumb />
                        <LocationContent locations={data} />
                    </>}
                {/* <Search 
                    onSearch={setLocationPath}
                    placeholder="Input location path" 
                    enterButton="Search"
                    size="large"
                    disabled={isFetching}
                    loading={isFetching} /> */}
            </div>
        </div>
    )
}