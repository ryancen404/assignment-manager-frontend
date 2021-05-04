import { Space, Table, Tag } from 'antd';
import React, { CSSProperties, Reducer, useEffect, useReducer, useState } from 'react';
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import BrowseDetailPage from "./Detail";
import { router } from "../../router"
import { AssignmentStatus, Assignment, DetailClass, BaseClass } from "../../types"
import assignmentService from "../../services/teacher/assignment";
import { ColumnsType } from 'antd/lib/table/Table';
import { BrowseAction, BrowseContextType, BrowseState } from './types.browse';
import { initialAssignment, initState, reducer } from './reducer.browse';
import { supportAsyncDispatch } from '../../other/reducer.config';
import StatusWrapper from '../../components/StatusWrapper';

export interface BrowseProps {
  style: CSSProperties,
}

// 浏览页Context
export const BrowseContext = React.createContext<BrowseContextType>({});


const log = (...message: any[]) => console.log("[AssignmentBrowsePage] =>", message)

const AssignmentBrowsePage = (props: BrowseProps) => {
  const [state, defDispatch] = useReducer<Reducer<BrowseState, BrowseAction>>(reducer, initState);

  const dispatch = supportAsyncDispatch<BrowseAction>(defDispatch);

  const match = useRouteMatch(router.browse.root)
  log("match: ", match?.path);

  // 首次执行请求作业列表数组
  useEffect(() => {
    dispatch(initialAssignment());
  }, [])

  const columns: ColumnsType<Assignment> = [
    {
      title: "作业",
      dataIndex: "assignName",
      key: "name",
      render: (text: string, record: Assignment) =>
        (<Link to={`${match?.path}/${record.assignId}`}>{text}</Link>),
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
      render: (record: BaseClass[]) => {
        log("render.", record)
        return (
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
            <a>批改</a>
            <a>删除</a>
          </Space>
        )
      },
    },
  ];

  console.log("state.browseAssignment = ", state.browseAssignment);

  const showAssignment = handleTime(state.browseAssignment);

  return (
    <BrowseContext.Provider value={{ state, dispatch }}>
      <div style={props.style}>
        <Switch>
          {/* 点击后的作业详情页 :assignId作业Id */}
          <Route path={`${match?.path}${router.browse.detail}`}>
            <BrowseDetailPage />
          </Route>
          <Route path={match?.path}>
            <StatusWrapper
              isLoading={state.loading}
              isShowEmpty={state.browseAssignment.length === 0}
              emptyDes="还没有作业，快去发布吧～"
              content={<Table columns={columns} dataSource={showAssignment} />}
            />
          </Route>
        </Switch>
      </div>
    </BrowseContext.Provider>
  )
}

type ShowAssignment = Assignment & { timeFromTo: string }
const handleTime = (assignments: Assignment[]) => {
  return assignments.map((a): ShowAssignment => {
    return { ...a, timeFromTo: `${a.startTime} - ${a.endTime}` }
  })
}

// 作业浏览页，路由:"/"，详情页:"/browse/:assignId"
export default AssignmentBrowsePage;