// 全局App配置信息

const APP_NAME = "assignment-manager"
const TOKEN_KEY = APP_NAME + "_token";

// 全局Token
let globalToken: string | null = null

/**
 * 在整个React App初始化时调用
 */
const initApp = () => {
  let localToken = localStorage.getItem(TOKEN_KEY);
  if (localToken !== null) {
    globalToken = localToken;
  }
}

const storageToken = (token: string) => {
  globalToken = token;
  localStorage.setItem(TOKEN_KEY, globalToken);
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