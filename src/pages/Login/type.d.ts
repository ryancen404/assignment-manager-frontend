import { DispatchType } from "../../utils/reducerHelper"

export type LoginContextType = {
  state?: LoginState,
  dispatch?: DispatchType<LoginAction>
}


export type LoginAction = {
  type: "changeIndex",
  index: LoginIndex
} | {
  type: "loginSuccess",
} | {
  type: "setLoading",
  isLoading: boolean
}

export type LoginIndex = "login" | "signup"

export interface LoginState {
  index: LoginIndex,
  isLogin: boolean,
  isLoading: boolean
}