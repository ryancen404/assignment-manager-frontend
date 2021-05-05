import { ActionWithLoading, DispatchType } from "../../other/reducer.config";
import { Assignment, DetailClass } from "../../types";

export interface BrowseContextType {
  state?: BrowseState,
  dispatch?: DispatchType<BrowseAction>
}

export type BrowseAction = ActionWithLoading |
{
  type: "initial",
  data: Assignment[]
} | {
  type: "deleteLoading",
  isLoading: boolean
} | {
  type: "deleteSuccess",
  assignId: string
} | {
  type: "appendDeatilMap",
  key: string,
  value: DetailClass[]
}

export interface BrowseState {
  browseAssignment: Assignment[],
  loading: boolean,
  deleteLoading: boolean,
  detailClassesMap: Map<string, DetailClass[]>
}