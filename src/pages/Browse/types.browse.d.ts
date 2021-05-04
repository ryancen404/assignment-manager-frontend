import { ActionWithLoading, DispatchType } from "../../other/reducer.config";
import { Assignment } from "../../types";

export interface BrowseContextType {
  state?: BrowseState,
  dispatch?: DispatchType<BrowseAction>
}

export type BrowseAction = ActionWithLoading |
{
  type: "initial",
  data: Assignment[]
}

export interface BrowseState {
  browseAssignment: Assignment[],
  loading: boolean
}