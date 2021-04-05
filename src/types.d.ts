export interface Assignment {
  assignId: string,
  name: string,
  description?: string,
  // 时间区间
  timeFromTo: string,
  // 与作业关联的班级数组
  classs: Class[],
  // 当前作业状态，以时间区间作为状态依据
  status: AssignmentStatus,
  // 附件列表
  files?: AssignmentFile[]
  // actions: string,
}

/**
 * 作业附件对象，md5用作校验
 */
export interface AssignmentFile {
  name: string,
  link: string,
  md5: string,
  length: number
}

export type AssignmentStatus = '未开始' | '进行中' | '已结束'

export interface Teacher {
  tId: number,
  username: string,
  avator: string,
  classs: Class[],
}

/**
 * 班级实体
 */
export interface Class {
  classId: number,
  // 班级名
  className: string,
  // 班级号
  classNumber: string
  // 班级学生, 在浏览页时为空
  students?: ClassStudent[]
}

/**
 * 班级的学生信息
 */
export interface ClassStudent {
  sId: number,
  // 学号
  studentNumber: string,
  // 学生姓名
  studentName: string,
  // 班级名
  className: string,
  // 班级号
  classNumber: string
}

/**
 * 学生端用户
 */
export interface StudentUser {
  username: string,
  avator: string,
  studentNumber: string,
}