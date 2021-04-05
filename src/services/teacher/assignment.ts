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
 * 通过Assignment唯一Id返回完整Assignment对象，Class含学生信息
 * @param assignId: Assignment唯一id
 */
const getAssignmentDeatil = (assignId: string): Assignment => {
  return fakeAssignment;
}


export default { getEasyAll, getAssignmentDeatil }