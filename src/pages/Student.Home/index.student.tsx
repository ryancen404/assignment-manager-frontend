
import { Layout, Menu, message } from 'antd';
import React, { CSSProperties, FC, useState } from 'react';
import { Link, Redirect, Route, useHistory, useRouteMatch } from 'react-router-dom';
import {
  InfoCircleOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import { router, stu_router } from '../../router';
import InfoManagerPage from '../Info';
import Global from '../../Global';
import Axios from '../../services/config.service';
import FixHeader from '../Home/components/FixHeader';
import StuBrowse from './Browse/index.stu.browse';

const { Sider, Content, Footer } = Layout;

/**
 * 侧边栏Layout
 * @param 选择项
 */
const SiderLayout = ({ path }: { path: string }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [select, setSelect] = useState(Global.currSelectIndex);

  history.listen((listener) => {
    const pathname = listener.pathname;
    if (pathname.indexOf(router.publish.root) !== -1) {
      setSelect('2');
    } else if (pathname.indexOf(router.infoImport) !== -1) {
      setSelect('3');
    } else {
      setSelect("1");
    }
  })

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => { setCollapsed(!collapsed) }}>
      <div style={{ marginLeft: "50px" }} >
        {/* <h1 style={{ color: "whitesmoke" }}>功能选择</h1> */}
      </div>
      <Menu theme="dark"
        onClick={({ key }) => {
          console.log("on menu click:", key);
          Global.currSelectIndex = key.toString();
          setSelect(key.toString());
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        selectedKeys={[select]}>
        <Menu.Item key="1" icon={<PieChartOutlined />} >
          <Link to={`${path}${stu_router.browse.root}`}>作业浏览</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>
          <Link to={`${path}${stu_router.info}`}>我的信息</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

/**
 * 除了侧边栏的主内容
 */
const MainContent = ({ path }: { path: string }) => {
  const history = useHistory();
  const myself = Global.getMyself();
  if (myself === null) {
    history.push(router.login);
    Global.clearUser()
    message.warning("登陆信息失效，请重新登陆！");
    return null
  }
  return (
    <Layout
      className="site-layout">
      <FixHeader
        userName={myself.username}
      />
      <Content style={{ margin: '16px 16px' }}>
        {/* 我的信息 */}
        <Route path={`${path}${stu_router.info}`}>
          {/* <InfoManagerPage style={contentStyle} /> */}
        </Route>
        {/* 默认的作业浏览页 */}
        <Route path={`${path}${stu_router.browse.root}`}>
          <StuBrowse style={contentStyle} />
        </Route>
        <Route path={path}>
          <Redirect to={`${path}${stu_router.browse.root}`} />
        </Route>
      </Content>
      <Footer style={{ textAlign: 'center' }}>重庆邮电大学理学院©2021 Created by 岑金富</Footer>
    </Layout>
  )
}


const StudentHome: FC = () => {
  const history = useHistory()
  const match = useRouteMatch()

  // render count
  console.log("!Home render!");

  // 设置全局token错误回调
  Axios.setTokenErrorCallback(() => {
    history.push(router.login);
    Global.currSelectIndex = "1";
    message.warning("登陆信息失效，请重新登陆！");
    Global.clearUser()
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SiderLayout path={match.path} />
      <MainContent path={match.path} />
    </Layout>
  );
}

const contentStyle: CSSProperties = {
  padding: 24,
  minHeight: 700,
  background: "#fff",
}

export default StudentHome;