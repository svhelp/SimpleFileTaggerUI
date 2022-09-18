import { Alert, Skeleton, Space } from "antd";
import { useTagGetQuery } from "api/partial/tag";
import { TagContainer } from 'components/Common/Tag/TagContainer';
import styled from 'styled-components'

export const TagsPage = () => {
    const { data, isFetching, isError, error } = useTagGetQuery();

    return <TagsPageContainer>
        <h1>
            Tags       
        </h1>

        {isFetching && <Skeleton.Image active />}

        {isError && <Alert
            message="Error"
            description={error.toString()}
            type="error"
            showIcon />}
        
        <ContentContainer>
            <Space wrap>
                {data?.map(tag => <TagContainer title={tag.name} />)}
            </Space>
        </ContentContainer>
    </TagsPageContainer>
}

const TagsPageContainer = styled.div`
    height: 100%;
`

const ContentContainer = styled.div`
    overflow: auto;
    height: 100%;
`