// 班级相关请求
import { fakeClass } from "../../mockData"
import { ClassBrowse, ClassStudent, DetailClass } from "../../types";

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
const getAllClass = (tid: string): ClassBrowse[] => {
    const data: ClassBrowse[] = []
    for (let i = 0; i < 6; i++) {
        const students: ClassStudent[] = [];
        for (let index = 0; index < 30; index++) {
            const element: ClassStudent = {
                sId: "sid+" + index,
                classId: "class_" + i,
                studentName: "学生" + index,
                studentNumber: "20172132" + index,
                className: `应数${i}班`,
                classNumber: "11031701",
                grade: "2017"
            }
            students.push(element)
        }
        const classBrowse: ClassBrowse = {
            classId: "class_" + i,
            className: `应数${i}班`,
            classNumber: "1103170" + i,
            students: students
        }
        data.push(classBrowse)
    }
    return data
}

/**
 * delete one student
 * @param sId student id
 * @returns request is success
 */
const deleteStudent = (sId: string): boolean => {
    return true
}

const classService = {
    getClassById,
    getAllClass,
    deleteStudent
}

export default classService;