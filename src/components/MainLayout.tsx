import { Layout } from "antd"
import { Content } from "antd/lib/layout/layout"
import Sider from "antd/lib/layout/Sider"
import { Outlet } from "react-router-dom"
import { AppMenu } from "./AppMenu"

export const MainLayout = () => {
  return (
    <Layout hasSider
      style={{
        height: '100vh',
        overflow: 'hidden',
      }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          background: '#fff'
        }}
      >
        <AppMenu />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          className="site-layout-background"
          style={{
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
