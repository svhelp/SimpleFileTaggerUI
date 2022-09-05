import { Alert, Card, Skeleton } from "antd";
import { useGetTagsQuery } from "api/sftApi"
import { TagModel } from "domain/TagModel";
import styled from 'styled-components'

export const TagsPage = () => {
    const { data, isFetching, isError, error } = useGetTagsQuery('');

    return <div>
        <h1>
            Tags page       
        </h1>

        {isFetching && <Skeleton.Image active />}

        {isError && <Alert
            message="Error"
            description={error.toString()}
            type="error"
            showIcon />}
        
        <div>
            {data?.map(tag => <Tag tag={tag} />)}
        </div>
    </div>
}

interface ITagProps{
    tag: TagModel
}

const Tag = ({tag}: ITagProps) => 
    <TagCard>
        <p>
            {tag.name}
        </p>
    </TagCard>

const TagCard = styled(Card)`
    width: 300px;
`