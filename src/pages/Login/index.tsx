import { Spin } from "antd";
import React, { Reducer, useReducer } from "react";
import { supportAsyncDispatch } from "../../utils/reducerHelper";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./index.css"
import { initState, reducer } from "./reducer";
import { LoginAction, LoginContextType, LoginState } from "./type";


export const LoginContext = React.createContext<LoginContextType>({})

const LoginPage: React.FC = () => {
  const [state, defDispatch] = useReducer<Reducer<LoginState, LoginAction>>(reducer, initState)
  // 支持异步函数
  const dispatch = supportAsyncDispatch<LoginAction>(defDispatch)
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      <div className="Container">
        <Title />
        <div className="ColumContainer">
          <Spin spinning={state.isLoading}>
            {state.index === "login"
              ? <LoginForm />
              : <SignupForm />}
          </Spin>
        </div>
      </div>
    </LoginContext.Provider>
  )
}

const Title = () => {
  return <div className="TextContainer">
    <p style={{ fontSize: "36px", letterSpacing: "10px", margin: "auto" }}>
      高等数学平时作业管理系统
    </p>
    <p style={{ fontSize: "22px", margin: "auto" }}>
      Advanced Mathematics assignment management system
    </p>
  </div>;
}

export default LoginPage;