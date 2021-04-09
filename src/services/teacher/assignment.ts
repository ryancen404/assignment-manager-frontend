import { Assignment } from "../../types";

// todo: delete fake data
import { fakeAssignmentData, fakeAssignment } from "../../mockData";

/**
 * 作业浏览页请求 Assignment 数组
 * 这里Assignment对象是专门为浏览页的简易Assignment，Class数组对象不含学生信息
 * @param tid  教师用户唯一id
 */
const getEasyAll = (tid: string): Assignment[] => {
  return fakeAssignmentData;
}

/**
 * 通过Assignment唯一Id返回Assignment
 * @param assignId: Assignment唯一id
 */
const getAssignmentDeatil = (assignId: string): Assignment => {
  return fakeAssignment;
}

/**
 * 创建新的Assignment
 * @param assignment 新的作业
 */
const createAssignmentDetail = (assignment: Assignment) => {
  return true;
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
  createAssignmentDetail,
  signAssignmentComplete,
  deleteAssignment
}

export default assignmentService