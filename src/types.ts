export interface Assignment {
  name: string,
  description?: string,
  // 时间区间
  timeFromTo: string,
  // 班级号
  classNumber: string[],
  status: AssignmentStatus,
  // actions: string,
}

export type AssignmentStatus = '未开始' | '进行中' | '已结束'

export interface Teacher {
  username: string,
  avator: string,
  classs: Class[],
}

/**
 * 班级实体
 */
export interface Class {
  className: string,
  students: ClassStudent[]
}

/**
 * 班级的学生信息
 */
export interface ClassStudent {
  studentNumber: string,
  studentName: string,
  className: string,
}

export interface StudentUser {
  username: string,
  avator: string,
  studentNumber: string,
}