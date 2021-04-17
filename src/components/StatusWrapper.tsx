import { Empty, Result, ResultProps } from "antd"
import { CSSProperties, ReactNode } from "react"

export interface EmptyWrapperProps {
  style?: CSSProperties
  // 是否展示空数据
  isShowEmpty: boolean,
  // 正常显示的内容
  content: JSX.Element,
  // 请求错误
  errorContent?: ResultProps
  // 是否展示空数据
  isShowError: boolean
}

const renderContent = (props: EmptyWrapperProps)=> {
  if (props.isShowError) {
    return <Result {...props.errorContent}/>
  }else if (props.isShowEmpty) {
    return <Empty/>
  } else {
    return props.content
  }
}

const StatusWrapper = (props: EmptyWrapperProps) => {
  return (
    <div style={props.style}>
      {renderContent(props)}
    </div>
  )
}

StatusWrapper.defaultProps = {
  errorContent: {
    status: 404,
    title: "404",
    subTitle: "抱歉，出了点问题。"
  }
}

export default StatusWrapper;