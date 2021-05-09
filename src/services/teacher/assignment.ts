import { Assignment, DetailClass, StudentAssignment, StudentBrowseAssignment } from "../../types";
import Axios from "../config.service";
import { BaseResponse } from "../type";

const baseUrl = "/api/assignment"


/**
 * 作业浏览页请求 Assignment 数组
 * 这里Assignment对象是专门为浏览页的简易Assignment，Class数组对象不含学生信息
 */
const getEasyAll = async () => {
  const response = await Axios.instance.get<BaseResponse<Assignment[]>>(baseUrl);
  return response.data
}

/**
 * 学生获取自己的作业信息
 */
const getStuEasyAll = async () => {
  const response = await Axios.instance.get<BaseResponse<StudentBrowseAssignment[]>>(`${baseUrl}`)
  return response.data;
}

/**
 * 通过Assignment唯一Id返回Assignment
 * @param assignId: Assignment唯一id
 */
const getAssignmentClass = async (assignId: string) => {
  const response = await Axios.instance.get<BaseResponse<DetailClass[]>>(`${baseUrl}/class/${assignId}`);
  return response.data;
}


export interface NewAssignmentParams {
  name: string,
  startTime: number,
  endTime: number,
  desc?: string,
  classIds: string[],
  filesName: string[]
}
/**
 * 创建新的Assignment
 * @param assignment 新的作业
 */
const createAssignment = async (assignment: NewAssignmentParams) => {
  const response = await Axios.instance.post<BaseResponse>(baseUrl, assignment);
  return response.data;
}

/**
 * 将某个作业标记为是否已经完成
 * @param assignId 作业id
 * @returns 是否成功
 */
const signAssignmentComplete = (assignId: string) => {
  return true;
}

/**
 * 删除某个作业
 * @param assignId 作业id
 * @returns 是否成功
 */
const deleteAssignment = async (assignId: string) => {
  const response = await Axios.instance.delete<BaseResponse>(`${baseUrl}/${assignId}`);
  return response.data;
}

export interface ScoringParams {
  assignId: string,
  sId: string,
  score: number
}
/**
 * 打分请求
 */
const scoring = async (params: ScoringParams) => {
  const response = await Axios.instance.put<BaseResponse>(`${baseUrl}/score`, params);
  return response.data;
}

// 将作业标记为已经完成，即所有学生作业状态变为已批改, 作业整体状态已经结束
const completeAssignment = async (assignId: string) => {
  const response = await Axios.instance.post<BaseResponse>(`${baseUrl}/complete`, { assignId });
  return response.data;
}

export interface StuCompleteParams {
  assignId: string,
  fileId: string
}
const stuCompleteAssignment = async (params: StuCompleteParams) => {
  const response = await Axios.instance.post<BaseResponse>(`${baseUrl}/complete/stu`, params);
  return response.data;
}

const downloadStuFile = async (fId: string) => {
  const response = await Axios.instance.get(`/api/files/assignment/student/${fId}`, {
    responseType: 'blob',
  });
  return response.data
}

const assignmentService = {
  downloadStuFile,
  stuCompleteAssignment,
  getEasyAll,
  getAssignmentClass,
  createAssignment,
  signAssignmentComplete,
  deleteAssignment,
  scoring,
  completeAssignment,
  getStuEasyAll
}

export default assignmentService