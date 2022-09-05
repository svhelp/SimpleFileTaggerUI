import { Alert, Card, Skeleton } from "antd";
import Search from "antd/lib/input/Search";
import { useGetLocationsQuery, useGetLocationTagsQuery } from "api/sftApi";
import { TaggerDirectoryInfo } from "domain/TaggerDirectoryInfo";
import { TagModel } from "domain/TagModel";
import { useState } from "react";

export const LocationsPage = () => {
    const [ locationPath, setLocationPath ] = useState('');

    const { data, isFetching, isError, error } = useGetLocationsQuery('');
    //const { data, isFetching, isError, error } = useGetLocationTagsQuery(locationPath);
    
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
                <Search 
                    onSearch={setLocationPath}
                    placeholder="Input location path" 
                    enterButton="Search"
                    size="large"
                    disabled={isFetching}
                    loading={isFetching} />
                {data && <LocationContent location={{path: '', children: data, tags: []}} />}
            </div>
        </div>
    )
}

interface ILocationContentProps {
    location: TaggerDirectoryInfo
}

const LocationContent = ({ location }: ILocationContentProps) => {
    return (
        <div>
            {location.children.map(l => <LocationCard location={l} />)}
            {location.tags.map(t => <LocationTagCard tag={t} />)}
        </div>
    )
}

const LocationCard = ({ location }: ILocationContentProps) => {
    return (
        <Card>
            <p>
                {location.path}
            </p>
        </Card>
    )
}

interface ILocationTagCardProps {
    tag: TagModel
}

const LocationTagCard = ({tag}: ILocationTagCardProps) => {
    return (
        <Card>
            <p>
                {tag.name}
            </p>
        </Card>
    )
}