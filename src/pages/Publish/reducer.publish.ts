import { message } from "antd";
import React from "react";
import assignmentService, { NewAssignmentParams } from "../../services/teacher/assignment";
import classService from "../../services/teacher/class";
import { PublishAction, PublishState } from "./type.publish";

export const initState: PublishState = {
  classes: [],
  isLoading: false,
  fileNames: [],
  isPublishSucess: false,
}

export const reducer = (state: PublishState, action: PublishAction): PublishState => {
  console.log("publish action:", action);
  switch (action.type) {
    case "initial": {
      return { ...state, classes: action.data };
    }
    case "setLoading": {
      return { ...state, isLoading: action.loading };
    }
    case "appendFileNames": {
      const newNames = state.fileNames.concat(action.fileName);
      return { ...state, fileNames: newNames };
    }
    case "publishSuccess": {
      return { ...state, isPublishSucess: true }
    }
    default:
      return { ...state }
  }
}

/**
 * 发布页初始化拿能获取的班级名
 */
export const initPublish = () => {
  return async (dispatch: React.Dispatch<PublishAction>) => {
    try {
      const response = await classService.getBaseClasses();
      if (response.code === 1) {
        const data = response.content === null ? [] : response.content;
        dispatch({ type: "initial", data });
        return;
      }
      initPublishFail();
    } catch (error) {
      console.error("getBaseClasses error:", error);
      initPublishFail();
    }
  }
}

/**
 * 发布作业
 */
export const onPublish = (params: NewAssignmentParams) => {
  return async (dispatch: React.Dispatch<PublishAction>) => {
    dispatch({ type: "setLoading", loading: true })
    try {
      const response = await assignmentService.createAssignment(params);
      if (response.code === 1) {
        dispatch({ type: "publishSuccess" })
      } else {
        onPublishFail();
      }
    } catch (error) {
      console.log("onPublish error:", error);
      onPublishFail();
    }
    dispatch({ type: "setLoading", loading: false })
  }
}

function onPublishFail() {
  message.error("发布失败，请稍后再试！")
}

function initPublishFail() {
  message.error("获取班级信息失败，请重试！")
}
