import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
  timeout: 30 * 1000,
});


const init = () => {
  // 设置日志拦截
  instance.interceptors.request.use(config => {
    logger("request config:", config)
    return config;
  }, error => {
    logger("request error:", error)
    return Promise.reject(error);
  })
  instance.interceptors.response.use(response => {
    logger("response 2xx, data:", response.data);
    return response;
  }, error => {
    logger("response error:", error);
    // 约定>500是服务内部错误
    const response = error.response;
    if (response && "code" in response && response.code >= StatusCode.serverError) {
      message.error("服务端错误，请重试！");
    }
    return Promise.reject(error);
  })
}

const logger = (...params: any) => {
  console.log("[Axios] =>", params);
}

const setRequestToken = (token: string) => {
  instance.defaults.headers.common['Authorization'] = token;
}

/**
 * 约定401错误就是Token校验失败
 * @param callback 当token失效和miss会回调
 */
const setTokenErrorCallback = (callback: () => void) => {
  instance.interceptors.response.use(response => {
    return response;
  }, error => {
    if (error.response.code === StatusCode.tokenError) {
      logger("the 401 token error");
      callback();
    }
    return Promise.reject(error);
  })
}

const clear = () => {
  instance.defaults.headers.common['Authorization'] = "";
}

// 服务端约定的HTTP错误
export const StatusCode = {
  parmasError: 400,
  tokenError: 401,
  serverError: 500
}

// 业务状态
export const StateCode = {
  success: 1,
  fail: 0
}

const Axios = {
  instance,
  init,
  setRequestToken,
  setTokenErrorCallback,
  StatusCode,
  StateCode,
  clear
}

export default Axios;