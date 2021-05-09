import { DispatchType } from "../../other/reducer.config"

export type LoginContextType = {
  state?: LoginState,
  dispatch?: DispatchType<LoginAction>
}


export type LoginAction = {
  type: "changeIndex",
  index: LoginIndex
} | {
  type: "loginSuccess",
  isLoading: boolean,
  userType: 0 | 1
} | {
  type: "setLoading",
  isLoading: boolean
}

export type LoginIndex = "login" | "signup"

export interface LoginState {
  index: LoginIndex,
  isLogin: boolean,
  isLoading: boolean,
  userType: 0 | 1
}