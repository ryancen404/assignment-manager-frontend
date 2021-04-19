// 全局App配置信息
import Axios from "./services/config.service";
const APP_NAME = "assignment-manager"
const TOKEN_KEY = APP_NAME + "_token";

// 全局Token
let globalToken: string | null = null

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

const storageToken = (token: string) => {
  globalToken = token;
  localStorage.setItem(TOKEN_KEY, globalToken);
  Axios.setRequestToken(token);
}

const setToken = (token: string) => {
  globalToken = token;
}

const getGlobalToken = () => globalToken;

const isLogin = () => globalToken !== null

const Global = {
  initApp,
  setToken,
  storageToken,
  getGlobalToken,
  isLogin
}

export default Global;