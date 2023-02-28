import { Breadcrumb } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import { useGetVirtualRemovable } from "customHooks/useGetVirtualRemovable";
import { useLocationAllQuery } from "api/enchanced/location";
import { LocationsViewType } from "domain/LocationsViewType";

interface ILocationsBreadCrumbProps {
    viewType: LocationsViewType;
}

export const LocationsBreadCrumb = ({ viewType }: ILocationsBreadCrumbProps) => {
    const { data } = useGetVirtualRemovable(useLocationAllQuery);
    
    const currentPath = useLocation();
    const pathElements = currentPath.pathname.split('/').filter(i => i)
    const pathSnippets = pathElements.slice(1);

    const extraBreadcrumbItems = viewType === LocationsViewType.Tree
        ? pathSnippets.map((pathSnippet, index) => {
            const url = `/locations/${pathSnippets.slice(0, index + 1).join('/')}`;
            const location = data.find(l => l.id === pathSnippet);

            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>{location?.name}</Link>
                </Breadcrumb.Item>
            );
        })
        : [];

    return (
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link to="/locations">
                    <HomeOutlined />
                </Link>
            </Breadcrumb.Item>
            {extraBreadcrumbItems}
        </Breadcrumb>
    );
};
