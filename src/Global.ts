// 全局App配置信息
import React from "react";
import Axios from "./services/config.service";
import { LoginResponse } from "./services/userService";
const APP_NAME = "assignment-manager"
const TOKEN_KEY = APP_NAME + "_token";
const USERNAME_KEY = APP_NAME + "_myusername"
const UID_KEY = APP_NAME + "_s_uid";

// 全局Token
let globalToken: string | null = null

let currSelectIndex: React.Key = "1";

/**
 * 在整个React App初始化时调用
 */
const initApp = () => {
  Axios.init();
  let localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken !== null) {
    globalToken = localToken;
    Axios.setRequestToken(globalToken);
  }
}

const storageToken = (content: LoginResponse) => {
  globalToken = content.token;
  localStorage.setItem(TOKEN_KEY, globalToken);
  localStorage.setItem(USERNAME_KEY, content.username);
  localStorage.setItem(UID_KEY, content.uid);
  Axios.setRequestToken(content.token);
}

const setToken = (content: LoginResponse) => {
  globalToken = content.token;
  myself = {
    uid: content.uid,
    username: content.username,
    type: content.type
  }
}

const clearUser = () => {
  localStorage.clear();
  globalToken = null
}

const getGlobalToken = () => globalToken;

const isLogin = () => globalToken !== null

let myself: User | null = null

const getMyself = () => {
  return myself;
}

export interface User {
  username: string,
  type: 0 | 1,
  uid: string
}

const Global = {
  initApp,
  setToken,
  storageToken,
  getGlobalToken,
  isLogin,
  currSelectIndex,
  getMyself,
  clearUser
}

export default Global;