import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { Outlet, useLocation } from "react-router-dom"
import { AppMenu } from "./AppMenu"

export const MainLayout = () => {
  let location = useLocation();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <AppMenu />
        <div>
          {location.pathname}
        </div>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
