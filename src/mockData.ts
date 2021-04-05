import { Assignment } from "./types"

export const fakeAssignmentData: Assignment[] = [
  {
    assignId: "1",
    name: "大学物理第一章",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "进行中",
  },
  {
    assignId: "2",
    name: "图论算法课后题",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "进行中",
  },
  {
    assignId: "3",
    name: "Hadoop环境搭建",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "4",
    name: "实变函数第三章课后题",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "未开始",
  },
  {
    assignId: "5",
    name: "Java类第三次实验",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "进行中",
  },
  {
    assignId: "6",
    name: "MySql第三范式课后题",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "7",
    name: "多元统计实验一",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "8",
    name: "毛概大作业",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "9",
    name: "高等数学多重定积分",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "10",
    name: "高等数学大作业",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "11",
    name: "高等数学大作业",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
  {
    assignId: "12",
    name: "数学分析",
    timeFromTo: "2021-3-3 2021-3-10",
    classs: [{
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701"
    }],
    status: "已结束",
  },
];

export const fakeAssignment: Assignment = {
  assignId: "12",
  name: "高等数学大作业",
  description: "请同学们一定要认真对待这次作业，不按时完成将直接取消考试资格。里面要用的资料都可以在PPT里找到，PPT已经放到附件里。一定要按时在这个系统提交！！！",
  timeFromTo: "2021-3-3 2021-3-10",
  classs: [
    {
      classId: 11111,
      className: "应数1班",
      classNumber: "11031701",
      students: [
        {
          sId: 12,
          studentName: "岑金富",
          studentNumber: "2017213276",
          className: "应数1班",
          classNumber: "11031701"
        },
        {
          sId: 13,
          studentName: "李赫",
          studentNumber: "2017213236",
          className: "应数1班",
          classNumber: "11031701"
        },
      ]
    },
    {
      classId: 11112,
      className: "应数3班",
      classNumber: "11031702",
      students: [
        {
          sId: 14,
          studentName: "岑金富2",
          studentNumber: "2017213279",
          className: "应数3班",
          classNumber: "11031702"
        },
        {
          sId: 19,
          studentName: "李赫2",
          studentNumber: "2017213222",
          className: "应数3班",
          classNumber: "11031702"
        },
      ]
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