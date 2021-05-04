import { Assignment } from "../../types";

// todo: delete fake data
import { fakeAssignment } from "../../mockData";
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
 * 通过Assignment唯一Id返回Assignment
 * @param assignId: Assignment唯一id
 */
const getAssignmentDeatil = (assignId: string): Assignment => {
  return fakeAssignment;
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
const deleteAssignment = (assignId: string) => {
  return true
}

const assignmentService = {
  getEasyAll,
  getAssignmentDeatil,
  createAssignment,
  signAssignmentComplete,
  deleteAssignment
}

export default assignmentService