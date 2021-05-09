import { message } from "antd";
import fileDownload from "js-file-download";
import React from "react";
import StudentService from "../../services/student.service";
import assignmentService from "../../services/teacher/assignment";
import { isNull } from "../../services/utils";
import { DetailClass } from "../../types";
import { BrowseAction, BrowseState } from "./types.browse";

export const initState: BrowseState = {
  browseAssignment: [],
  loading: false,
  deleteLoading: false,
  detailClassesMap: new Map<string, DetailClass[]>(),
  scoringLoading: false,
  detailTabIndex: 0,
  completeLoading: false,
  goBack: false
}

export const reducer = (state: BrowseState, action: BrowseAction): BrowseState => {
  console.log("[Browse] reduce an anction:", action);
  switch (action.type) {
    case "initial": {
      return { ...state, browseAssignment: action.data };
    }
    case "setLoading": {
      return { ...state, loading: action.isLoading };
    }
    case "deleteLoading": {
      return { ...state, deleteLoading: action.isLoading };
    }
    case "deleteSuccess": {
      const newAssignments = state.browseAssignment.filter(a => a.assignId !== action.assignId);
      return { ...state, browseAssignment: newAssignments };
    }
    case "appendDeatilMap": {
      state.detailClassesMap.set(action.key, action.value);
      return { ...state }
    }
    case "setScoringLoading": {
      return { ...state, scoringLoading: action.isLoading };
    }
    case "scoringResponse": {
      // 打分成功，更新学生分数
      if (action.isSuucess) {
        const targetClasses = state.detailClassesMap.get(action.assignId);
        if (targetClasses === undefined) {
          return { ...state }
        }
        const index = state.detailTabIndex;
        const targetClass = targetClasses[index];
        const newClassStu = targetClass.students.map(s => {
          if (s.sId === action.sId) {
            return { ...s, score: action.score, corrected: true };
          }
          return s;
        })
        const newClass: DetailClass = { ...targetClass, students: newClassStu };
        const newClasses = targetClasses.map(clazz => clazz.classId === newClass.classId ? newClass : clazz);
        state.detailClassesMap.set(action.assignId, newClasses);
        return { ...state }
      }
      return { ...state }
    }
    case "setTabIndex": {
      return { ...state, detailTabIndex: action.index }
    }
    case "setGoBack": {
      return { ...state, goBack: action.isGoBack }
    }
    case "completeSucess": {
      const targetClasses = state.detailClassesMap.get(action.assignId);
      if (targetClasses === undefined) {
        return { ...state }
      }
      const newClasses = targetClasses.map(clazz => {
        const newStu = clazz.students.map(stu => {
          return { ...stu, corrected: true, assignmentStatus: true }
        })
        return { ...clazz, students: newStu }
      })
      state.detailClassesMap.set(action.assignId, newClasses);
      return { ...state }
    }
    default:
      return { ...state }
  }
}


// 初始化作业列表数据异步Action
export const initialAssignment = () => {
  return (dispatch: React.Dispatch<BrowseAction>) => {
    blockWithLoading(dispatch, async () => {
      try {
        const response = await assignmentService.getEasyAll();
        if (response.code === 0) {
          initialFail();
          return
        }
        dispatch({ type: "initial", data: isNull(response.content) ? [] : response.content })
      } catch (error) {
        console.log("initialAssignment error:", error);
        initialFail();
      }
    })
  }
}

// 删除作业
export const onDeleteAssignment = (assignId: string) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    dispatch({ type: "deleteLoading", isLoading: true })
    try {
      const response = await assignmentService.deleteAssignment(assignId);
      if (response.code === 1) {
        message.info("删除成功！");
        dispatch({ type: "deleteSuccess", assignId })
      } else {
        deleteFail();
      }
    } catch (error) {
      console.log("onDeleteAssignment id: ", assignId, "error:", error);
      deleteFail();
    }
    dispatch({ type: "deleteLoading", isLoading: false })
  }
}

// 获取作业详情
export const getAssignmentClasses = (assignId: string) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    try {
      const response = await assignmentService.getAssignmentClass(assignId);
      if (response.code === 1 && response.content) {
        dispatch({ type: "appendDeatilMap", key: assignId, value: response.content })
      } else {
        getDetailFail();
      }
    } catch (error) {
      console.log("getAssignmentDetail error:", error);
      getDetailFail();
    }
  }
}

// 打分请求
export const onAssignmentScoring = (assignId: string, sId: string, score: number) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    dispatch({ type: "setScoringLoading", isLoading: true })
    try {
      const response = await assignmentService.scoring({ assignId, score, sId });
      if (response.code === 1) {
        dispatch({ type: "scoringResponse", isSuucess: true, assignId, sId, score })
        message.info("打分成功！")
      } else {
        message.error("打分失败，请稍后！")
      }
    } catch (error) {
      console.log(`onAssignmentScoring assignId:${assignId}, sId:${sId}, score:${score} error:`, error);
      // dispatch({ type: "scoringResponse", isSuucess: false })
      message.error("打分失败，请稍后！")
    }
    dispatch({ type: "setScoringLoading", isLoading: false })
  }
}

/**
 * 下载学生的作业
 * @param sName 学生名
 * @returns 
 */
export const onDownloadStuAssign = (assignId: string, sId: string, sName: string) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    try {
      const response = await StudentService.downloadStuAssignment({ assignId, sId });
      fileDownload(response, `${sName}_${assignId}`);
    } catch (error) {
      console.log(`onDownloadStuAssign error:`, error);
      message.error("下载失败！")
    }
  }
}

export const onCompleteAssignment = (assignId: string) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    dispatch({ type: "setCompleteLoading", isLoading: true })
    try {
      const response = await assignmentService.completeAssignment(assignId);
      if (response.code === 1) {
        dispatch({ type: "completeSucess", assignId })
        dispatch({ type: "setGoBack", isGoBack: true })
      } else {
        message.error("网络错误，请稍后！")
      }
    } catch (error) {
      message.error("网络错误，请稍后！")
    }
    dispatch({ type: "setCompleteLoading", isLoading: false })
  }
}

export const onDownloadStuFile = (fId: string, fName: string) => {
  return async (dispatch: React.Dispatch<BrowseAction>) => {
    try {
      const response = await assignmentService.downloadStuFile(fId);
      fileDownload(response, fName);
    } catch (error) {
      message.error("网络错误！")
    }
  }
}

function deleteFail() {
  message.error("删除失败！")
}

const initialFail = () => {
  message.error("获取作业信息失败，请重试！");
}

// 包一层loading的函数任务
const blockWithLoading = async (dispatch: React.Dispatch<BrowseAction>, block: () => Promise<void>) => {
  dispatch({
    type: "setLoading",
    isLoading: true
  })
  try {
    await block()
  } catch (any) {
    // do nothing
  }
  dispatch({
    type: "setLoading",
    isLoading: false
  })
}

function getDetailFail() {
  message.error("获取作业失败！");
}
