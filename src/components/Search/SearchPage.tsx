import { Alert, Skeleton } from "antd";
import Search from "antd/lib/input/Search"
import { TaggerDirectoryInfo, useSearchGetQuery } from "api/partial/search";
import { CardContainer } from "components/Common/CardContainer";
import { useCallback, useState } from "react";
import styled from "styled-components"

export const SearchPage = () => {

    const [ searchValue, setSearchValue ] = useState([] as string[]);
    const { data, isFetching, isError, error } = useSearchGetQuery({tags: searchValue});

    const parseSearchValues = useCallback((value: string) => {
        const tags = value.split(' ')
        setSearchValue(tags)
    }, [setSearchValue]);

    const openDirectory = useCallback((path: string) => window.electron.shell.openLocation(path), []);

    return (
        <SearchPageContainer>
            <h1>
                Search
            </h1>
            
            <SearchContainer>
                <Search 
                    onSearch={parseSearchValues}
                    placeholder="Input location path" 
                    enterButton="Search"
                    size="large"
                    disabled={isFetching}
                    loading={isFetching} />
            </SearchContainer>
            <ContentContainer>      
                {isFetching && <Skeleton.Image active />}

                {isError && <Alert
                    message="Error"
                    description={error.toString()}
                    type="error"
                    showIcon />}

                {data &&
                    data.map(loc => <LocationCard key={loc.id} location={loc} openDirectory={openDirectory} />)}
            </ContentContainer>
        </SearchPageContainer>
    )
}

const SearchPageContainer = styled.div`
    height: 100%;
`

const SearchContainer = styled.div`
    position: sticky;
    top: 0;
`

const ContentContainer = styled.div`
    overflow: auto;
    height: 100%;
`

interface ILocationCardProps {
    openDirectory: (path: string) => void;
    location: TaggerDirectoryInfo;
}

export const LocationCard = ({ location, openDirectory }: ILocationCardProps) => {
    return (
        <CardContainer onClick={() => openDirectory(location.path)}>
            <p>
                {location.name}
            </p>
        </CardContainer>
    );
};