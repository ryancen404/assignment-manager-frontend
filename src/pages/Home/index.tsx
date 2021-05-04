import { Layout, Menu, message } from 'antd';
import { CSSProperties, FC, useState } from 'react';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import {
  VideoCameraOutlined,
  UploadOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import "./index.css"
import { router } from '../../router';
import FixHeader from './components/FixHeader';
import AssignmentBrowsePage from "../Browse/index.browse";
import PublishPage from '../Publish/index.publish';
import InfoManagerPage from '../Info';
import LoginPage from '../Login';
import Global from '../../Global';
import Axios from '../../services/config.service';

const { Sider, Content, Footer } = Layout;

/**
 * 侧边栏Layout
 * @param 选择项
 */
const SiderLayout = ({ defaultSelect }: { defaultSelect: string[] }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [select, setSelect] = useState(Global.currSelectIndex);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={() => { setCollapsed(!collapsed) }}>
      <div className="logo" >
        <h1>高校作业管理系统</h1>
      </div>
      <Menu theme="dark"
        onClick={({ key }) => {
          console.log("on menu click:", key);
          Global.currSelectIndex = key.toString();
          setSelect(key.toString());
        }}
        defaultSelectedKeys={defaultSelect}
        mode="inline"
        selectedKeys={[select]}>
        <Menu.Item key="1" icon={<PieChartOutlined />} >
          <Link to={router.browse.root}>作业浏览</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UploadOutlined />}>
          <Link to={router.publish.root}>作业发布</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<VideoCameraOutlined />}>
          <Link to={router.infoImport}>信息管理</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

/**
 * 除了侧边栏的主内容
 */
const MainContent = () => {
  return (
    <Layout
      className="site-layout">
      <FixHeader
        userName={"岑金富"}
        onAvatorClick={() => message.info("点击头像路由到个人页")} />
      <Content style={{ margin: '16px 16px' }}>
        {/* 发布页 */}
        <Route path={[router.publish.root, `${router.publish.root}${router.publish.fix}`]}>
          <PublishPage style={contentStyle} />
        </Route>
        {/* 信息管理页 */}
        <Route path={router.infoImport}>
          <InfoManagerPage style={contentStyle} />
        </Route>
        {/* 默认的作业浏览页 */}
        <Route path={router.browse.root}>
          <AssignmentBrowsePage style={contentStyle} />
        </Route>
        {/* 无根页面直接重定向到浏览页 */}
        <Route exact path={router.home}>
          {Global.isLogin() ? <Redirect to={router.browse.root} /> : <Redirect to={router.login} />}
        </Route>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  )
}


const Home: FC = () => {
  const history = useHistory()

  // render count
  console.log("!Home render!");

  // 设置全局token错误回调
  Axios.setTokenErrorCallback(() => {
    history.push(router.login);
    Global.currSelectIndex = "1";
    message.warning("登陆信息失效，请重新登陆！");
  });

  // 判断当前默认选择的menu
  let defaultSelect = ['1']
  const pathname = history.location.pathname;
  if (pathname.indexOf(router.publish.root) !== -1) {
    defaultSelect = ['2']
  } else if (pathname.indexOf(router.infoImport) !== -1) {
    defaultSelect = ['3']
  }

  return (
    <Switch>
      <Route path={router.login}>
        <LoginPage />
      </Route>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderLayout defaultSelect={defaultSelect} />
        <MainContent />
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