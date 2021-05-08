import Axios from "./config.service";

const baseUrl = "/api/user/student"

export interface DownloadStuAssignParams {
  assignId: string
  sId: string,
}

// 下载学生作业
const downloadStuAssignment = async (params: DownloadStuAssignParams) => {
  const response = await Axios.instance.post(`${baseUrl}/assignment/file`, params, {
    responseType: 'blob',
  });
  return response.data
}

const StudentService = {
  downloadStuAssignment
}

export default StudentService;