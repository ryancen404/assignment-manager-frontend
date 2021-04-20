import React from "react";

// 支持异步函数的返回值类型
export type DispatchType<ActionType> = ((action: ActionType | ((dispatch: React.Dispatch<ActionType>) => void)) => void)

/**
 * 让默认的dispatch函数支持异步函数调度的功能
 * <ActionType> reducer Action的类型
 * @param defDispatch: 默认的dispatch
 * @returns action: 如果是ActionType则为正常的dispatch，
 *                如果是个需要dispatch的函数则先执行函数再dispatch传给它
 */
export const supportAsyncDispatch = <ActionType>(
  defDispatch: React.Dispatch<ActionType>
): DispatchType<ActionType> => {
  return (action: ActionType | ((dispatch: React.Dispatch<ActionType>) => void)) => {
    if (typeof action === "function" && action instanceof Function) {
      return action(defDispatch);
    }
    return defDispatch(action);
  }
}

export type ActionWithLoading = {
  type: "setLoading",
  isLoading: boolean
}