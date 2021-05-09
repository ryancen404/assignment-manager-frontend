import { message } from "antd";
import React from "react";
import Global from "../../Global";
import { StateCode } from "../../services/config.service";
import userService, { LoginParams, SignupParams } from "../../services/userService";
import { LoginAction, LoginState } from "./type";

export const initState: LoginState = {
  index: "login",
  isLogin: false,
  isLoading: false,
  userType: 0
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
      return { ...state, isLogin: true, isLoading: action.isLoading, userType: action.userType };
    case "setLoading": {
      return { ...state, isLoading: action.isLoading }
    }
    default:
      return { ...state }
  }
}

// 登陆异步action
export const onLogin = (account: string, password: string, type: 0 | 1, remember: boolean) => {
  return async (dispatch: React.Dispatch<LoginAction>) => {
    dispatch({
      type: "setLoading",
      isLoading: true
    })
    const requestParams: LoginParams = { account, password, type }
    try {
      const response = await userService.login(requestParams);
      const content = response.content;
      if (response.code === StateCode.success && content !== null) {
        const token = content.token;
        if (token !== null && token !== "") {
          if (remember) {
            Global.storageToken(content);
          }
          Global.setToken(content);
          dispatch({
            type: "loginSuccess",
            isLoading: false,
            userType: type
          })
          return
        }
      }
      message.error("账号或密码错误请重试");
      dispatch({
        type: "setLoading",
        isLoading: false
      })
    } catch (error) {
      if (type === 0) {
        message.error("账号或密码错误请重试");
      } else {
        message.error("请联系老师导入学生信息")
      }
      dispatch({
        type: "setLoading",
        isLoading: false
      })
    }
  }
}

export const onSignup = (signupParams: SignupParams) => {
  return async (dispatch: React.Dispatch<LoginAction>) => {
    dispatch({
      type: "setLoading",
      isLoading: true
    })
    try {
      const result = await userService.signup(signupParams);
      // 成功
      if (result.code === StateCode.success) {
        message.info("注册成功，请登录");
        dispatch({
          type: "changeIndex",
          index: "login"
        })
      } else {
        message.error("注册失败，请重试！")
      }
    } catch (error) {
      message.error("注册失败，请重试！")
    }
    dispatch({
      type: "setLoading",
      isLoading: false
    })
  }
}