// 全局App配置信息
import AxiosInstane from "./services/config.service";
const APP_NAME = "assignment-manager"
const TOKEN_KEY = APP_NAME + "_token";

// 全局Token
let globalToken: string | null = null

/**
 * 在整个React App初始化时调用
 */
const initApp = () => {
  AxiosInstane.init();
  let localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken !== null) {
    globalToken = localToken;
    AxiosInstane.setRequestToken(globalToken);
  }
}

const storageToken = (token: string) => {
  globalToken = token;
  localStorage.setItem(TOKEN_KEY, globalToken);
  AxiosInstane.setRequestToken(token);
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