import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { CSSProperties, Reducer, useEffect, useReducer, useState } from 'react';
import { Route, Switch, useRouteMatch, Link } from "react-router-dom";
import BrowseDetailPage from "./Detail";
import { router } from "../../router"
import { AssignmentStatus, Assignment, BaseClass } from "../../types"
import { ColumnsType } from 'antd/lib/table/Table';
import { BrowseAction, BrowseContextType, BrowseState } from './types.browse';
import { initialAssignment, initState, onDeleteAssignment, reducer } from './reducer.browse';
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

  const match = useRouteMatch()
  log("match: ", match?.path);

  // 首次执行请求作业列表数组
  useEffect(() => {
    dispatch(initialAssignment());
  }, [])

  const showAssignment = handleTime(state.browseAssignment);

  const onDelete = (id: string) => {
    dispatch(onDeleteAssignment(id));
  }
  const columns: ColumnsType<ShowAssignment> = getColumns(match, state, onDelete);

  console.log("state.browseAssignment = ", state.browseAssignment);

  return (
    <BrowseContext.Provider value={{ state, dispatch }}>
      <div style={props.style}>
        <Switch>
          {/* 点击后的作业详情页 :assignId作业Id */}
          <Route exact path={`${match.path}${router.browse.detail}`}>
            <BrowseDetailPage />
          </Route>
          <Route path={match.path}>
            <StatusWrapper
              isLoading={state.loading}
              isShowEmpty={state.browseAssignment.length === 0}
              emptyDes="还没有作业，快去发布吧～"
              content={<Table columns={columns} dataSource={showAssignment} />} />
          </Route>
        </Switch>
      </div>
    </BrowseContext.Provider>
  )
}

export type ShowAssignment = Assignment & { timeFromTo: string, completion: string };
const handleTime = (assignments: Assignment[]) => {
  return assignments.map((a): ShowAssignment => {
    return {
      ...a,
      timeFromTo: `${a.startTime} - ${a.endTime}`,
      completion: `${a.complete} / ${a.total}`
    }
  })
}

// 作业浏览页，路由:"/"，详情页:"/browse/:assignId"
export default AssignmentBrowsePage;

function getColumns(match: any, state: BrowseState, onDelete: (id: string) => void): ColumnsType<ShowAssignment> {
  return [
    {
      title: "作业",
      dataIndex: "assignName",
      key: "name",
      render: (text: string, record: ShowAssignment) => {
        const routerParams = {
          pathname: `${match.path}/${record.assignId}`,
          state: {
            assignment: record
          }
        };
        return (<Link to={routerParams}>{text}</Link>);
      },
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
        log("render.", record);
        return (
          <>
            {record.map(clazz => <p>{clazz.className}</p>
            )}
          </>
        );
      }
    },
    {
      title: "完成情况",
      key: "completion",
      dataIndex: "completion",
    },
    {
      title: '状态',
      key: "status",
      dataIndex: 'status',
      render: (text: AssignmentStatus) => {
        let color = '';
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
        );
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ShowAssignment) => {
        const routerParams = {
          pathname: `${match?.path}/${record.assignId}`,
          state: {
            assignment: record
          }
        };
        return (
          <Space size="small">
            <Link to={routerParams}>批改</Link>
            <Popconfirm
              title="确认删除该作业吗？"
              okText="确认"
              okButtonProps={{
                loading: state.deleteLoading,
                onClick: () => onDelete(record.assignId)
              }}
              cancelText="取消"
            >
              <Button type="link">删除</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
}
