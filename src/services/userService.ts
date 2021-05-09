import axios from "axios";
import Axios from "./config.service";
import { BaseResponse } from "./type";

const loginUrl = '/api/login'
const teacherUrl = '/api/user/teacher'
const studentUrl = '/api/user/student'

export interface LoginParams {
  account: string,
  password: string,
  // 0: 教师 1: 学生
  type: 0 | 1
}

export interface SignupParams {
  account: string,
  password: string,
  username: string,
  type: 0 | 1,
  college: string,
  class?: string,
}

export interface LoginResponse {
  token: string,
  uid: string,
  username: string,
  type: 0 | 1
}
/**
 * 
 * @param loginParms 登陆参数
 * @returns 返回携带Token的Response
 */
const login = async (loginParms: LoginParams): Promise<BaseResponse<LoginResponse>> => {
  const response = await Axios.instance.post<BaseResponse<LoginResponse>>(loginUrl, loginParms);
  return response.data;
}

/**
 * 注册新用户
 * @returns 
 */
const signup = async (signupParams: SignupParams): Promise<BaseResponse> => {
  let response;
  if (signupParams.type === 0) {
    response = await Axios.instance.post<BaseResponse>(`${teacherUrl}/signup`, signupParams);
    console.log("signup res:", response);
  } else {
    response = await Axios.instance.post<BaseResponse>(studentUrl, signupParams);
  }
  return response.data;
}


const userService = {
  login,
  signup
};

export default userService;