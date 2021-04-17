import { message } from "antd";
import React from "react";
import Global from "../../Global";
import userService, { LoginParams } from "../../services/teacher/userService";
import { LoginAction, LoginState } from "./type";

export const initState: LoginState = {
  index: "login",
  isLogin: false,
  isLoading: false
}

/**
 * 基于状态的操作调度器
 * @param state 原来的状态
 * @param action 当前的操作
 * @returns 新的状态
 */
export const reducer = (state: LoginState, action: LoginAction): LoginState => {
  console.log("login reduce an action:", action);
  switch (action.type) {
    case "changeIndex":
      return { ...state, index: action.index };
    case "loginSuccess":
      return { ...state, isLogin: true };
    case "setLoading": {
      return { ...state, isLoading: action.isLoading }
    }
    default:
      return { ...state }
  }
}

export const onLogin = (account: string, password: string, type: 0 | 1, remember: boolean) => {
  return async (dispatch: React.Dispatch<LoginAction>) => {
    dispatch({
      type: "setLoading",
      isLoading: true
    })
    const requestParams: LoginParams = { account, password, type }
    const token = await userService.login(requestParams);
    if (token !== undefined && token !== "") {
      if (remember) {
        Global.storageToken(token);
      }
      Global.setToken(token);
      dispatch({
        type: "loginSuccess",
      })
    } else {
      message.error("账号或密码错误请重试")
    }
    dispatch({
      type: "setLoading",
      isLoading: false
    })
  }
}