import { Breadcrumb, Layout, Menu, message } from 'antd';
import React, { CSSProperties, FC, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {
  VideoCameraOutlined,
  UploadOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import "./index.css"
import {router} from '../../router';
import FixHeader from './components/FixHeader';
import AssignmentBrowsePage from "../Browse/index";
import PublishPage from '../Publish/index';

const { Sider, Content, Footer } = Layout;

const Home: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory()

  // render count
  console.log("!Home render!");
  

  // 判断当前默认选择的menu
  let defaultSelect = ['1']
  const pathname = history.location.pathname;
  if (pathname.indexOf(router.publish) !== -1) {
    defaultSelect = ['2']
  } else if (pathname.indexOf(router.infoImport) !== -1) {
    defaultSelect = ['3']
  }

  return (
    <Switch>
      <Route path={router.login}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          login!!!
      </div>
      </Route>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => { setCollapsed(!collapsed) }}>
          <div className="logo" >
            <h1>高校作业管理系统</h1>
          </div>
          <Menu theme="dark" defaultSelectedKeys={defaultSelect} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />} >
              <Link to={router.browse.root}>作业浏览</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
              <Link to={router.publish}>作业发布</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
              <Link to={router.infoImport}>信息管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout">
          <FixHeader
            userName={"岑金富"}
            onAvatorClick={() => message.info("点击头像路由到个人页")} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            {/* 发布页 */}
            <Route path={router.publish}>
              <PublishPage style={contentStyle} />
            </Route>
            <Route path={router.infoImport}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                信息管理!!!
              </div>
            </Route>
            <Route path={router.browse.root}>
              <AssignmentBrowsePage style={contentStyle} />
            </Route>
            <Route exact path={router.home}>
              <Redirect to={router.browse.root}/>
            </Route>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </Switch>
  );
}

export default Home;

const contentStyle: CSSProperties = {
  padding: 24,
  minHeight: 700,
  background: "#fff",
}