export interface BaseAssignment {
  assignId: string,
  assignName: string,
  description?: string,
}

export interface Assignment extends BaseAssignment {
  // 时间区间
  startTime: string,
  endTime: string,
  // 与作业关联的班级数组
  classs: BaseClass[],
  // 当前作业状态，以时间区间作为状态依据
  status: AssignmentStatus,
  // 是否已经被我(教师)批改
  corrected?: boolean,
  // 附件列表
  files?: AssignmentFile[],
  total: number,
  complete: number
}

export type AssignmentStatus = '未开始' | '进行中' | '已结束';

/**
 * 作业附件对象，md5用作校验
 */
export interface AssignmentFile {
  fileId: string,
  name: string,
  link?: string,
  md5?: string,
  length: number
}


/**
 * 班级实体
 * 在浏览页和详情页表头使用
 * @param classId 班级唯一标识
 * @param className 班级名
 * @param className 班级号
 */
export interface BaseClass {
  classId: string,
  className: string,
  classNumber: string
}

/**
 * 在详情页的学生列表对象中使用，其中学生信息包含作业完成情况
 * @param students 班级学生
 */
export interface DetailClass extends BaseClass {
  students: StudentAssignment[]
}

/**
 * 在信息管理中使用的班级浏览
 */
export interface ClassBrowse extends BaseClass {
  students: ClassStudent[]
}

/**
 * 班级的学生信息
 */
export interface ClassStudent {
  sId: string,
  // 绑定的班级id
  classId: string
  // 学号
  studentNumber: string,
  // 学生姓名
  studentName: string,
  // 年级
  grade: string
}

/**
 * Student作业完成情况类型
 * @field status: 学生是否已经完成作业
 * @field scroe: 分数
 * @field corrected: 我(学生)作业是否已经被老师批改
 */
export interface StudentAssignment extends BaseAssignment, ClassStudent {
  assignmentStatus: boolean,
  corrected: boolean
  score: number,
}


/**
 * 教师用户
 */
export interface Teacher {
  tId: number,
  username: string,
  avator: string,
  classs: string[],
}

/**
 * 学生端用户
 */
export interface StudentUser {
  username: string,
  avator: string,
  studentNumber: string,
}