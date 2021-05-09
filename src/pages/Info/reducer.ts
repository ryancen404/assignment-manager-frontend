// Info页面的reducer

import { message } from "antd";
import React from "react";
import { DispatchType } from "../../other/reducer.config";
import classService, { DeleteClassStudentParams } from "../../services/teacher/class";
import { InfoAction, InfoState } from "./type";

export const initState: InfoState = {
  tabKey: "0",
  isLoading: false,
  class: [],
  deleteAllLoading: false,
  deleteAllSuccess: false
}

export const reducer = (state: InfoState, action: InfoAction): InfoState => {
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
    case "setLoading": {
      return { ...state, isLoading: action.isLoading }
    }
    case "setDeleteLoading": {
      return { ...state, deleteAllLoading: action.isLoading }
    }
    case "deleteClassesSuccess": {
      const newClasses = state.class.filter(clazz => clazz.classId !== action.classId);
      return { ...state, class: newClasses, deleteAllSuccess: true };
    }
    case "resetDeleteAll": {
      return { ...state, deleteAllSuccess: false }
    }
    default:
      return state;
  }
}

/**
 * 初始化
 */
export const initialClassData = () => {
  return async (dispatch: React.Dispatch<InfoAction>) => {
    dispatch({
      type: "setLoading",
      isLoading: true
    })
    try {
      const response = await classService.getAllClass();
      let classs = response.content;
      console.log("request classs length:", classs?.length);
      if (classs === null) {
        classs = []
      }
      dispatch({
        type: "initialClass",
        data: classs
      })
    } catch (error) {
      message.error("请求失败，请重试！")
    }
    dispatch({
      type: "setLoading",
      isLoading: false
    })
  }
}

export const onDeleteStudent = (classId: string, sId: string) => {
  return async (dispatch: React.Dispatch<InfoAction>) => {
    try {
      const params: DeleteClassStudentParams = {
        classId, sId
      }
      const result = await classService.deleteStudent(params);
      console.log("request delete student result:", result);
      if (result.code === 0) {
        message.error("删除失败！")
        return
      }
      dispatch({
        type: "onDeleteStudent",
        sId,
      })
    } catch (error) {
      message.error("删除失败！")
      return
    }
  }
}

export const onDeleteAll = (classId: string) => {
  return async (dispatch: React.Dispatch<InfoAction>) => {
    dispatch({ type: "setDeleteLoading", isLoading: true })
    try {
      const response = await classService.deleteAll(classId);
      if (response.code === 1) {
        dispatch({ type: "deleteClassesSuccess", classId })
        message.info("删除成功")
        return
      }
      message.error("删除失败，请稍后！")
    } catch (error) {
      message.error("删除失败，请稍后！")
    }
    dispatch({ type: "setDeleteLoading", isLoading: false })
  }
}