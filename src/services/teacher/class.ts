// 班级相关请求
import { fakeClass } from "../../mockData"
import { ClassBrowse, DetailClass } from "../../types";
import Axios from "../config.service";
import { BaseResponse } from "../type";

const classUrl = "/api/class"

/**
 * 根据班级id请求班级的具体信息,包含学生的信息
 * @param id classId
 */
const getClassById = (id: string): DetailClass => {
    return fakeClass
}

/**
 * 信息管理页面请求所有的班级信息
 */
const getAllClass = async (): Promise<BaseResponse<ClassBrowse[]>> => {
    const response = await Axios.instance.get<BaseResponse<ClassBrowse[]>>(`${classUrl}/all`);
    return response.data;
}

export interface DeleteClassStudentParams {
    sId: string,
    classId: string
}

/**
 * 删除班级上的一个学生
 */
const deleteStudent = async (params: DeleteClassStudentParams): Promise<BaseResponse> => {
    const response = await Axios.instance.post<BaseResponse>(`${classUrl}/${params.classId}`, params.sId)
    return response.data
}

const classService = {
    getClassById,
    getAllClass,
    deleteStudent
}

export default classService;