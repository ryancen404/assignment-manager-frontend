import { message } from "antd";
import React from "react";
import assignmentService from "../../services/teacher/assignment";
import { isNull } from "../../services/utils";
import { BrowseAction, BrowseState } from "./types.browse";

export const initState: BrowseState = {
  browseAssignment: [],
  loading: false,
  deleteLoading: false
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