import { Space, Table, Tag } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";

import BrowseDetailPage from "./Detail";
import { router } from "../../router" 
import { AssignmentStatus, Assignment, DetailClass } from "../../types"

import assignmentService from "../../services/teacher/assignment";
import { ColumnsType } from 'antd/lib/table/Table';

interface BrowseProps {
  style: CSSProperties,
}

const log = (...message: any[]) => console.log("AssignmentBrowsePage", message)

const AssignmentBrowsePage = (props: BrowseProps) => {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const match = useRouteMatch()
  log("match: ", match.path);

  // 首次执行请求作业列表数组
  useEffect(() => {
    requestAllAssignment()
  }, [])

  const columns: ColumnsType<Assignment> = [
    {
      title: "作业",
      dataIndex: "assignName",
      key: "name",
      render: (text: string, record: Assignment) =>
        (<Link to={`${match.path}/${record.assignId}`}>{text}</Link>),
    },
    {
      title: '时间',
      key: "time",
      dataIndex: 'timeFromTo',
    },
    {
      title: '班级',
      key: "classs",
      dataIndex: 'classs',
      render: (record: DetailClass[]) => {
        log("render.", record)
        return(
          <>
            {record.map(clazz => 
              <p>{clazz.className}</p>
            )}
          </>
        )
      }
    },
    {
      title: '状态',
      key: "status",
      dataIndex: 'status',
      render: (text: AssignmentStatus) => {
        let color = ''
        if (text === '未开始') {
          color = 'green';
        } else if (text === '进行中') {
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
      title: '操作',
      key: 'action',
      render: (text: string, record: Assignment) => {
        return (
          <Space size="small">
            {record.status === '已结束' ? <a>批改</a> : null}
            <a>删除</a>
          </Space>
        )
      },
    },
  ];

  // 请求, todo: loading 状态？
  const requestAllAssignment = () => {
    // todo delete
    const allAssignment = assignmentService.getEasyAll("my_tid");
    setAssignments(allAssignment)
  }

  return (
    <div style={props.style}>
      <Switch>
        {/* 点击后的作业详情页 :assignId作业Id */}
        <Route path={`${match.path}${router.browse.detail}`}>
          <BrowseDetailPage />
        </Route>
        <Route path={match.path}>
          <Table columns={columns} dataSource={assignments} />
        </Route>
      </Switch>
    </div>
  )
}

// 作业浏览页，路由:"/"，详情页:"/browse/:assignId"
export default AssignmentBrowsePage;