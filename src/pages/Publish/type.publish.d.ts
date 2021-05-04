import { DispatchType } from "../../other/reducer.config";
import { BaseClass } from "../../types";

export type PublishContextType = {
  state?: PublishState,
  dispatch?: DispatchType<PublishAction>
}

export type PublishAction = {
  type: "initial",
  data: BaseClass[]
} | {
  type: "setLoading",
  loading: boolean
} | {
  type: "appendFileNames",
  fileName: string
} | {
  type: "publishSuccess"
}

export interface PublishState {
  classes: BaseClass[],
  isLoading: boolean,
  fileNames: string[],
  isPublishSucess: boolean
}