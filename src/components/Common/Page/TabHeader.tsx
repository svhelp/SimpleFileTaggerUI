import { PageHeader } from "antd";
import { FC, ReactNode } from "react";
import { TabHeaderContainer } from "./Tab.styles";

interface ITabHeaderProps {
    title: string;
    children?: ReactNode
}

export const TabHeader: FC<ITabHeaderProps> = (props) => {
    return (
        <TabHeaderContainer>
            <PageHeader
                className="site-page-header"
                ghost={false}
                title={props.title}
                extra={props.children} />
        </TabHeaderContainer>
    )
}