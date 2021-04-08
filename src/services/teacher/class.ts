// 班级相关请求
import { fakeClass } from "../../mockData"
import { DetailClass } from "../../types";

/**
 * 根据班级id请求班级的具体信息,包含学生的信息
 * @param id classId
 */
const getClassById = (id: string): DetailClass => {
    return fakeClass
}

export default { getClassById };