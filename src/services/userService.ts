import axios from "axios";
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

const login = async (loginParms: LoginParams): Promise<string> => {
  // const response = await axios.post(`${baseUrl}`)
  return Promise.resolve("token");
}

/**
 * 注册新用户
 * @returns 
 */
const signup = async (signupParams: SignupParams): Promise<boolean> => {
  if (signupParams.type === 0) {
    const response = await axios.post<BaseResponse>(teacherUrl, signupParams);
    console.log("signup res:", response);
  } else {
    const reponse = await axios.post<BaseResponse>(studentUrl, signupParams);
  }
  return Promise.resolve(true);
}


const userService = {
  login,
  signup
};

export default userService;