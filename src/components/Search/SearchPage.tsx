import { AutoComplete, Input, Space } from "antd";
import { useTagGetQuery } from "api/enchanced/tag";
import { useSearchGetQuery } from "api/partial/search";
import { LocationContainer } from "components/Common/Location/LocationContainer";
import { Tab } from "components/Common/Tab/Tab";
import { TabHeaderContainer, TabContentContainer } from "components/Common/Tab/Tab.styles";
import { useCallback, useState } from "react";

export const SearchPage = () => {

    const [ searchQuery, setSearchQuery ] = useState("");
    const [ searchValue, setSearchValue ] = useState([] as string[]);

    const { data: tags, isFetching: isTagsFetching, isError: isTagsError, error: tagsError } = useTagGetQuery();
    const { data, isFetching, isError, error } = useSearchGetQuery({tags: searchValue});

    const parseSearchValues = useCallback((value: string) => {
        const tags = value.split(' ')
        setSearchValue(tags)
    }, [setSearchValue]);

    const openDirectory = useCallback((path: string) => window.electron.shell.openLocation(path), []);

    return (
        <Tab isError={isError} isFetching={isFetching} error={error}>
            <TabHeaderContainer>
                <AutoComplete
                    value={searchQuery}
                    onChange={(query, selectedTag) => {
                        if (!Array.isArray(selectedTag) && !!selectedTag.value && !searchQuery.endsWith(query + ' ')) {
                            const previousValue = searchQuery.split(' ');
    
                            previousValue.pop();
                            previousValue.push(query);
    
                            const newValue = `${previousValue.join(' ')} `;
                            setSearchQuery(newValue);
    
                            return;
                        }

                        setSearchQuery(query)
                    }}
                    options={tags?.map(t => ({value: t.name})) ?? []}
                    filterOption={(query, option) => {
                        const queryTags = query.split(' ');

                        if (!queryTags.length){
                            return true;
                        }

                        return option?.value.startsWith(queryTags[queryTags.length-1]) ?? false
                    }}
                    style={{ width: "100%" }}
                >
                    <Input.Search 
                        onSearch={parseSearchValues}
                        placeholder="Input tags" 
                        enterButton="Search"
                        size="large"
                        disabled={isFetching}
                        loading={isFetching} />
                </AutoComplete>
            </TabHeaderContainer>
            <TabContentContainer>
                <Space wrap>
                    {(data ?? []).map(loc =>
                        <LocationContainer key={loc.id} title={loc.name} onClick={() => openDirectory(loc.path)} />)}
                </Space>
            </TabContentContainer>
        </Tab>
    )
}