import axios from "axios";

const baseUrl = '/api/login'

export interface LoginParams{
  account: string,
  password: string,
  // 0: 教师 1: 学生
  type: 0 | 1
}

const login =  async (loginParms: LoginParams): Promise<string> => {
  // const reponse = await axios.post(`${baseUrl}`)
  return Promise.resolve("token");
}


const userService = {
  login
};

export default userService;