import React from "react";
import { DispatchType } from "../../other/reducer.config";
import assignmentService from "../../services/teacher/assignment";
import { BrowseAction, BrowseState } from "./types";

export const initState: BrowseState = {

}

export const reducer = (state: BrowseState, action: BrowseAction): BrowseState => {
  console.log("[Browse] reduce an anction:", action);
  switch (action.type) {
    default:
      return { ...state }
  }
}


// 初始化作业列表数据异步Action
export const initialData = () => {
  return (dispatch: React.Dispatch<BrowseAction>) => {
    blockWithLoading(dispatch, async () => {
      try {
        const data = await assignmentService.getEasyAll();
      } catch (error) {

      }
    })
  }
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