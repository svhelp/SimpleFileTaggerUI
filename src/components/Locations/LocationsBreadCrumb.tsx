import { Breadcrumb } from "antd";
import { HomeOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";

export const LocationsBreadCrumb = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i).slice(1);

    const extraBreadcrumbItems = pathSnippets.map((pathSnippet, index) => {
        const url = `/locations/${pathSnippets.slice(0, index + 1).join('/')}`;

        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{pathSnippet}</Link>
            </Breadcrumb.Item>
        );
    });

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
