import { Space, Table, Tag } from 'antd';
import React, { CSSProperties } from 'react';

import { AssignmentStatus } from "../../types"
import {fakeAssignmentData} from "./mockData"

interface BrowseProps {
  style: CSSProperties,
}

const columns = [
  {
    title: "作业",
    dataIndex: "name",
    render: (text: string) =>(<a>{text}</a>),
  },
  {
    title: '时间',
    dataIndex: 'timeFromTo',
  },
  {
    title: '班级号',
    dataIndex: 'classNumber',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (text: AssignmentStatus) => {
      let color = ''
      if (text === '未开始') {
        color = 'green';
      } else if (text === '进行中'){
        color = 'geekblue';
      } else if (text === '已结束') {
        color = 'volcano';
      }
      return (
        <Tag color={color} key={"tag"}>
              {text.toUpperCase()}
        </Tag>
      )
    }
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

// 作业浏览组件
const AssignmentBrowsePage = (props: BrowseProps) => {
  return (
    <div style={props.style}>
      <Table columns={columns} dataSource={fakeAssignmentData} />
    </div>
  )
}

export default AssignmentBrowsePage;