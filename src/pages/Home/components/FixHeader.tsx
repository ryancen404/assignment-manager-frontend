import React, { CSSProperties } from 'react';
import { Layout, Avatar, Button, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./FixHeadr.css"
import Global from '../../../Global';
import { useHistory } from 'react-router';
import { router } from '../../../router';
const { Header } = Layout

/**
 * TODO：先让头像的url为空，完成后端后加上
 */
interface HeaderProps {
  userName: string,
  avatorImage?: string,
  className?: string,
  onAvatorClick?: () => {},
}

const avatorStyle: CSSProperties = {
  display: 'flex',
  alignSelf: "flex-end",
  fontSize: "12px",
  alignItems: "center",
  marginRight: "12px",
  textAlign: "center",
  alignmentBaseline: "auto",
  // 设置鼠标移到这变成小手
  cursor: "pointer"
}

const headerStyle: CSSProperties = {
  background: "#ffffff",
  padding: 0,
  display: 'flex',
  position: 'relative',
  flexDirection: 'row',
  //内容居中和靠右
  alignItems: "center",
  justifyContent: "flex-end",
}

const FixHeader = (props: HeaderProps) => {
  const history = useHistory();
  const exitLogin = () => {
    Global.clearUser();
    history.push(router.login);
  }

  return (
    <Header
      style={headerStyle}>
      <div style={{ position: 'absolute', left: '50px', fontSize: '3.5ex' }}>高等数学平时作业管理系统</div>
      <div
        onClick={props.onAvatorClick}
        style={avatorStyle}>
        <Avatar
          alt={"avator"}
          size={"default"}
          shape={"circle"}
          src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}
          icon={<UserOutlined />}
          style={{
            marginRight: "6px"
          }} />
        <div style={{ fontSize: "3ex" }}>{props.userName}</div>
        <Button type={"text"} size="small" style={{ color: "red" }} onClick={exitLogin}>退出登陆</Button>
      </div>
    </Header>
  )
}

export default FixHeader;