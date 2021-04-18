import { message } from 'antd';
import axios from 'axios';

const instance = axios.create({
  timeout: 10 * 1000,
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
    if (error.response.status >= 500) {
      message.error("服务端错误，请重试！")
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
    if (error.response.status === 401) {
      logger("the 401 token error");
      callback();
    }
    return Promise.reject(error);
  })
}

const AxiosInstane = {
  instance,
  init,
  setRequestToken,
  setTokenErrorCallback
}

export default AxiosInstane;