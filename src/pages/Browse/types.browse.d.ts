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
} | {
  type: "setScoringLoading",
  isLoading: boolean
} | {
  type: "scoringResponse",
  isSuucess: boolean,
  assignId: string,
  sId: string,
  score: number
} | {
  type: "setTabIndex",
  index: number
} | {
  type: "setCompleteLoading",
  isLoading: boolean
} | {
  type: "setGoBack",
  isGoBack: boolean
} | {
  type: "completeSucess",
  assignId: string
}

export interface BrowseState {
  browseAssignment: Assignment[],
  loading: boolean,
  deleteLoading: boolean,
  detailClassesMap: Map<string, DetailClass[]>,
  scoringLoading: boolean,
  detailTabIndex: number,
  completeLoading: boolean,
  goBack: boolean
}