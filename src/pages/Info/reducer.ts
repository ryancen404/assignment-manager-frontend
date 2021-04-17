// Info页面的reducer

import { message } from "antd";
import { DispatchType } from ".";
import classService from "../../services/teacher/class";
import { ClassBrowse, ClassStudent } from "../../types";

export interface InfoState {
  tabKey: string
  class: ClassBrowse[]
  // student: []
}

export const initState: InfoState = {
  tabKey: "0",
  class: []
}

export type Action = {
  // 切换tab
  type: "changeTab",
  index: string
} | {
  // 初始化请求
  type: "initialClass",
  data: ClassBrowse[]
} | {
  // 删除某个学生
  type: "onDeleteStudent",
  sId: string,
}

export const reducer = (state: InfoState, action: Action): InfoState => {
  console.log("reduce an action:", action);
  switch (action.type) {
    case "changeTab":
      return { ...state, tabKey: action.index };
    case "initialClass":
      return { ...state, class: action.data };
    case "onDeleteStudent":
      // 找到被删除学生的班级
      const targetClass = state.class[Number(state.tabKey)]
      // 将该学生过滤 返回新的学生数组
      const newStudents = targetClass.students.filter(student => student.sId !== action.sId)
      // 包含新的students的新的class
      const newClass = { ...targetClass, students: newStudents }
      const newStateClass = state.class.map(
        clazz => clazz.classId === newClass.classId ? newClass : clazz
      )
      return { ...state, class: newStateClass }
    default:
      return state;
  }
}

/**
 * 初始化
 */
export const initialClassData = (tid: string) => {
  return async (dispatch: DispatchType) => {
    const classs = await classService.getAllClass(tid);
    console.log("request classs length:", classs.length);
    dispatch({
      type: "initialClass",
      data: classs
    })
  }
}

export const onDeleteStudent = (sId: string) => {
  return async (dispatch: DispatchType) => {
    const result = await classService.deleteStudent(sId);
    console.log("request delete student result:", result);
    if (!result) {
      message.error("删除失败！")
      return
    }
    dispatch({
      type: "onDeleteStudent",
      sId,
    })
  }
}