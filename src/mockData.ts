import { Assignment, DetailClass } from "./types"

export const fakeAssignmentData: Assignment[] = [];

export const fakeAssignment: Assignment = {
  assignId: "12",
  assignName: "高等数学大作业",
  description: "请同学们一定要认真对待这次作业，不按时完成将直接取消考试资格。里面要用的资料都可以在PPT里找到，PPT已经放到附件里。一定要按时在这个系统提交！！！",
  startTime: "2021/3/3",
  endTime: "2021/3/21",
  total: 100,
  complete: 1,
  classs: [
    {
      classId: "11111",
      className: "应数1班",
      classNumber: "11031701",
    },
    {
      classId: "11112",
      className: "应数3班",
      classNumber: "11031702",
    }
  ],
  status: "进行中",
  files: [
    {
      name: "xxx.ppt",
      link: "https://www.baidu.com/",
      length: 22222,
      md5: "dslfjiajfoiowef"
    },
    {
      name: "工具包.zip",
      link: "https://www.baidu.com/",
      length: 22222,
      md5: "dslfjiajfoiowef2"
    }
  ]
}

export const fakeClass: DetailClass = {
  classId: "11112",
  className: "应数1班",
  classNumber: "11031701",
  studentsAssignment: []
}