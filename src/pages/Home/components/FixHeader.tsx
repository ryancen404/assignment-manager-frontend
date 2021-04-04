import React, { CSSProperties, FC, useState } from 'react';
import { Layout, Avatar, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "./FixHeadr.css"
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
  flexDirection: 'row',
  //内容居中和靠右
  alignItems: "center",
  justifyContent: "flex-end"
}

const FixHeader = (props: HeaderProps) => {

  return (
    <Header
      className="fix-header-layout"
      style={headerStyle}
    >
      <div
        onClick={props.onAvatorClick}
        style={avatorStyle}>
        <Avatar
          alt={"avator"}
          size={"small"}
          shape={"circle"}
          src={"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"}
          icon={<UserOutlined />}
          style={{
            marginRight: "6px"
          }} />
        <div>{props.userName}</div>
      </div>
    </Header>
  )
}

export default FixHeader;