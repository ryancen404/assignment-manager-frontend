import { Space, Tag } from "antd";
import React, { CSSProperties, Reducer, useEffect, useReducer } from "react"
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { StuBrowseAction, StuBrowseContextType, StuBrowseState } from "./type.stu.browse";
import { reducer, initState, initStuBrowse } from './reducer.stu.browse';
import { supportAsyncDispatch } from "../../../other/reducer.config";
import { AssignmentStatus, StudentBrowseAssignment } from "../../../types";
import Table, { ColumnsType } from "antd/lib/table/Table";
import StatusWrapper from "../../../components/StatusWrapper";
import { stu_router } from "../../../router";
import StuAssignmentDeatil from "./stu.browse.detail";

export interface StuBrowseProps {
  style: CSSProperties
}

export const StuBrowseContext = React.createContext<StuBrowseContextType>({});

const StuBrowsePage = (props: StuBrowseProps) => {
  const [state, defDispatch] = useReducer<Reducer<StuBrowseState, StuBrowseAction>>(reducer, initState);
  const dispatch = supportAsyncDispatch<StuBrowseAction>(defDispatch);
  const match = useRouteMatch(`${stu_router.stu}${stu_router.browse.root}`)
  console.log("match: ", match?.path);

  useEffect(() => {
    dispatch(initStuBrowse())
  }, [])

  const showAssignment = handleTime(state.data);
  const columns = getColumns(match);

  return (
    <StuBrowseContext.Provider value={{ state, dispatch }}>
      <div style={props.style}>
        <Switch>
          {/* 点击后的作业详情页 :assignId作业Id */}
          <Route path={`${match?.path}${stu_router.browse.detail}`}>
            <StuAssignmentDeatil />
          </Route>
          <Route path={match?.path}>
            <StatusWrapper
              isLoading={state.isLoading}
              isShowEmpty={state.data.length === 0}
              emptyDes="还没有作业，休息一下吧～"
              content={<Table columns={columns} dataSource={showAssignment} />}
            />
          </Route>
        </Switch>
      </div>
    </StuBrowseContext.Provider>

  )
}

export type StuShowAssignment = StudentBrowseAssignment & { timeFromTo: string };
const handleTime = (assignments: StudentBrowseAssignment[]) => {
  return assignments.map((a): StuShowAssignment => {
    const start = new Date(a.startTime.replace(/-/g, "/"));
    const end = new Date(a.endTime.replace(/-/g, "/"));
    const today = new Date()
    let text: AssignmentStatus = "未开始"
    if (today > start && today < end) {
      text = "进行中"
    } else if (today > end) {
      text = "已结束"
    }
    return {
      ...a,
      teacherName: a.teacherName + "老师",
      status: text,
      timeFromTo: `${a.startTime} - ${a.endTime}`,
    }
  })
}

function getColumns(match: any): ColumnsType<StudentBrowseAssignment> {
  return [
    {
      title: "作业",
      dataIndex: "assignName",
      key: "name",
      render: (text: string, record: StudentBrowseAssignment) => {
        const routerParams = {
          pathname: `${match?.path}/${record.assignId}`,
          state: {
            assignment: record
          }
        };
        return (<Link to={routerParams}>{text}</Link>);
      },
    },
    {
      title: "任课老师",
      dataIndex: "teacherName",
      key: "tname",
      render: (value: string) => {
        return value
      }
    },
    {
      title: '时间',
      key: "time",
      dataIndex: 'timeFromTo',
    },
    {
      title: "是否已完成",
      key: "assignmentStatus",
      dataIndex: "assignmentStatus",
      render: (value: boolean) => {
        let color = "volcano";
        if (value) color = "green"
        return <Tag color={color}>{value ? "已完成" : "未完成"}</Tag>
      }
    },
    {
      title: "批改状态",
      key: "corrected",
      dataIndex: "corrected",
      render: (value: boolean) => {
        let color = "volcano";
        if (value) color = "green"
        return <Tag color={color}>{value ? "已批改" : "未批改"}</Tag>
      }
    },
    {
      title: "分数",
      key: "score",
      dataIndex: "score",
      render: (value: string) => {
        return Number(value) <= 0 ? "无" : value
      }
    },
    {
      title: '作业状态',
      key: "status",
      dataIndex: 'status',
      render: (text: string) => {
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
      render: (text: string, record: StudentBrowseAssignment) => {
        const routerParams = {
          pathname: `${match?.path}/${record.assignId}`,
          state: {
            assignment: record
          }
        };
        return (
          <Space size="small">
            <Link to={routerParams}>查看详情</Link>
          </Space>
        );
      },
    },
  ];
}


export default StuBrowsePage;