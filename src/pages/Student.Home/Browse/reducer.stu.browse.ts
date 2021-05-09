import { message } from "antd";
import assignmentService from "../../../services/teacher/assignment";
import { StuBrowseAction, StuBrowseState } from "./type.stu.browse";

export const initState: StuBrowseState = {
  isLoading: false,
  data: [],
  isCompleteSuccess: false
}

export const reducer = (state: StuBrowseState, action: StuBrowseAction): StuBrowseState => {
  console.log("stu browse reduce an action:", action);
  switch (action.type) {
    case "setLoading": {
      return { ...state, isLoading: action.isLoading }
    }
    case "browseResSuccess": {
      return { ...state, data: action.data, isLoading: false }
    }
    case "completeSuccess": {
      return { ...state, isCompleteSuccess: true }
    }
    case "resetState": {
      return { ...state, isCompleteSuccess: action.isCompSuccess }
    }
    default:
      return { ...state }
  }
}

export const initStuBrowse = () => {
  return async (dispatch: React.Dispatch<StuBrowseAction>) => {
    dispatch({ type: "setLoading", isLoading: true })
    try {
      const response = await assignmentService.getStuEasyAll();
      if (response.code === 0 || response.content == null) {
        dispatch({ type: "setLoading", isLoading: false })
        message.error("获取作业失败!");
        return
      } else {
        dispatch({ type: "browseResSuccess", data: response.content })
      }
    } catch (error) {
      dispatch({ type: "setLoading", isLoading: false })
    }
  }
}

export const onCompleteAssignment = (assignId: string, fileId: string) => {
  return async (dispatch: React.Dispatch<StuBrowseAction>) => {
    try {
      const response = await assignmentService.stuCompleteAssignment({ assignId, fileId })
      if (response.code === 1) {
        message.info("作业已经完成！");
        dispatch({ type: "completeSuccess" })
      } else {
        message.error("作业提交失败！")
      }
    } catch (error) {
      message.error("作业提交失败！")
    }
  }
}