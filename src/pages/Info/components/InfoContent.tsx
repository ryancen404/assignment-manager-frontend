import { Button, Space, Table } from "antd"
import React, { useContext, useEffect } from "react";
import { InfoContext } from "..";
import StatusWrapper from "../../../components/StatusWrapper";
import { ClassBrowse, ClassStudent } from "../../../types";
import { initialClassData, onDeleteStudent } from "../reducer";
import { InfoContextType } from "../type";

const getColumns = (
  onDelete: (classId: string, sid: string) => void
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
      title: '班级',
      key: "className",
      dataIndex: 'className',
    },
    {
      title: '班级号',
      key: "classNumber",
      dataIndex: "classNumber"
    },
    {
      title: '年级',
      key: "grade",
      dataIndex: 'grade',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: ClassStudent) => {
        return (
          <Space size="small">
            <Button type="link" onClick={() => onDelete(record.classId, record.sId)}>删除</Button>
          </Space>
        )
      },
    },
  ];
}

type StudentWithClass = ClassStudent & {
  className?: string,
  classNumber?: string
}

/**
 * 
 * @returns 信息管理页面的内容/ 不包含头信息
 */
const InfoContent = () => {
  const context = useContext<InfoContextType>(InfoContext)

  console.log("current state", context.state);

  const currentIndex = Number(context.state?.tabKey)
  const classs: ClassBrowse[] | undefined = context.state?.class
  const currentClass = classs?.[Number(currentIndex)];
  const students: ClassStudent[] | undefined = currentClass?.students;

  const showStudents = students?.map(s => {
    const stu: StudentWithClass = {
      ...s,
      className: currentClass?.className,
      classNumber: currentClass?.classNumber
    }
    return stu;
  })

  // 点击列表删除回调
  const onDelete = (classId: string, sId: string) => {
    context.dispatch!(onDeleteStudent(classId, sId))
  }

  return (
    <div>
      <StatusWrapper
        isLoading={false}
        isShowError={false}
        emptyDes="还没导入学生，快去导入吧～"
        isShowEmpty={students === undefined || students.length === 0}
        content={
          <Table columns={getColumns(onDelete)} dataSource={showStudents} />
        } />
    </div>
  )
}

export default InfoContent;
