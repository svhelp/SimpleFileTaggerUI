import { SearchOutlined } from '@ant-design/icons';
import { Button, Select, Space } from "antd";
import { useTagGetQuery } from "api/enchanced/tag";
import { useSearchGetQuery } from "api/partial/search";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Tab } from 'components/Common/Page/Tab';
import { TabHeaderContainer, TabContentContainer } from "components/Common/Page/Tab.styles";
import { useGetVirtualRemovable } from 'customHooks/useGetVirtualRemovable';
import { LocationPlainModel } from 'domain/models';
import { useCallback, useState } from "react";
import styled from 'styled-components';

export const SearchPage = () => {

    const [ searchQuery, setSearchQuery ] = useState<string[]>([]);
    const [ searchValue, setSearchValue ] = useState([] as string[]);

    const { data: tags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useGetVirtualRemovable(useTagGetQuery);
    const { data, isFetching, isError, error } = useSearchGetQuery({tags: searchValue});

    const onSearch = useCallback(() => {
        setSearchValue(searchQuery)
    }, [ searchQuery, setSearchValue ]);

    const openDirectory = useCallback((location: LocationPlainModel) =>
        window.electron.shell.openLocation(location.path), []);

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeaderContainer>
                <SearchInputContainer>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        options={tags?.map(t => ({value: t.name})) ?? []}
                        />
                    <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
                        Search
                    </Button>
                </SearchInputContainer>
            </TabHeaderContainer>
            <TabContentContainer>
                <Space direction="vertical" style={{ display: 'flex' }}>
                    {(data ?? []).map(loc =>
                        <LocationContainer key={loc.id} location={loc} onClick={openDirectory} />)}
                </Space>
            </TabContentContainer>
        </Tab>
    )
}

const SearchInputContainer = styled.div`
    display: flex;
`