import { DispatchType } from "../../other/reducer.config"
import {ClassBrowse} from '../../types';

export type InfoContextType = {
  state?: InfoState,
  dispatch?: DispatchType<InfoAction>
}

export interface InfoState {
  tabKey: string
  class: ClassBrowse[],
  isLoading: boolean
  // student: []
}

export type InfoAction = {
  // 切换tab
  type: "changeTab",
  index: string
} | {
  // 初始化请求
  type: "initialClass",
  data: ClassBrowse[]
} | {
  // 删除某个学生
  type: "onDeleteStudent",
  sId: string,
} | {
  type: "setLoading",
  isLoading: boolean
}