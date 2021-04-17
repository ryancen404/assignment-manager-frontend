import { Button, Space, Table } from "antd"
import React, { useContext, useEffect } from "react";
import { InfoContext, InfoContextType } from "..";
import StatusWrapper from "../../../components/StatusWrapper";
import { ClassBrowse, ClassStudent } from "../../../types";
import { initialClassData, onDeleteStudent } from "../reducer";

const getColumns = (
  onDelete: (sid: string) => void
) => {
  return [
    {
      title: "姓名",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: '学号',
      key: "studentNumber",
      dataIndex: 'studentNumber',
    },
    {
      title: '年级',
      key: "grade",
      dataIndex: 'grade',
    },
    {
      title: '班级',
      key: "className",
      dataIndex: 'className',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ClassStudent) => {
        return (
          <Space size="small">
            <Button type="link" onClick={() => onDelete(record.sId)}>删除</Button>
          </Space>
        )
      },
    },
  ];
}

/**
 * 
 * @returns 信息管理页面的内容/ 不包含头信息
 */
const InfoContent = () => {
  const context = useContext<InfoContextType>(InfoContext)

  useEffect(() => {
    console.log("useEffect");
    context.dispatch!(initialClassData("tid"))
  }, [])

  console.log("current state", context.state);

  const currentIndex = Number(context.state?.tabKey)
  const classs: ClassBrowse[] | undefined = context.state?.class
  const students: ClassStudent[] | undefined = classs?.[Number(currentIndex)]?.students;

  // 点击列表删除回调
  const onDelete = (sId: string) => {
    context.dispatch!(onDeleteStudent(sId))
  }

  return (
    <div>
      <StatusWrapper
      // todo: set request state
        isShowError={false}
        isShowEmpty={students === undefined || students.length === 0}
        content={
          <Table columns={getColumns(onDelete)} dataSource={students} />
        } />
    </div>
  )
}

export default InfoContent;
