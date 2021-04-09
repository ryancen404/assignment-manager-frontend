export const router = {
  // 默认主页是作业浏览
  home: "/",
  browse: {
    root: "/browse",
    detail: "/:assignId"
  },
  // 学生浏览
  student: "/student",
  // 作业发布
  publish: {
    root: "/publish",
    // 修改作业内容页
    fix: "/:assignId"
  },
  // 信息导入
  infoImport: "/import",
  // 个人信息
  profile: "/profile",
  // 登陆
  login: "/login"
}

export const pageName = {
  browse: "作业浏览",
  
}