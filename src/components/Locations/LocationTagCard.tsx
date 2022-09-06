import { Card } from "antd";
import { TagModel } from "domain/TagModel";

interface ILocationTagCardProps {
    tag: TagModel;
}

export const LocationTagCard = ({ tag }: ILocationTagCardProps) => {
    return (
        <Card>
            <p>
                {tag.name}
            </p>
        </Card>
    );
};
