import { ActionWithLoading, DispatchType } from "../../other/reducer.config";

export interface BrowseContextType {
  state?: BrowseState,
  dispatch?: DispatchType<BrowseAction>
}

export type BrowseAction = ActionWithLoading &
{
}

export interface BrowseState {

}