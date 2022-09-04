import { useGetLocationTagsQuery } from "api/sftApi";

export const LocationsPage = () => {
    const { data, isLoading, isError, error } = useGetLocationTagsQuery('');
    
    return <div>Locations page</div>
}