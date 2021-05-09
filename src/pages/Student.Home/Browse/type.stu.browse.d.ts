import { DispatchType } from "../../../other/reducer.config";
import { StudentBrowseAssignment } from "../../../types";

export interface StuBrowseContextType {
  state?: StuBrowseState,
  dispatch?: DispatchType<StuBrowseAction>
}

export type StuBrowseAction = {
 type: "setLoading",
 isLoading: boolean
} | {
  type: "browseResSuccess",
  data: StudentBrowseAssignment[]
} | {
  type: "completeReq",
  fileId: string
} | {
  type: "completeSuccess"
} | {
  type:"resetState",
  isCompSuccess: boolean
}

export interface StuBrowseState {
 isLoading: boolean,
 data: StudentBrowseAssignment[],
 isCompleteSuccess: boolean
}