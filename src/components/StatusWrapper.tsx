import { Empty, Result, ResultProps, Spin } from "antd"
import { CSSProperties } from "react"

export interface EmptyWrapperProps {
  style?: CSSProperties
  // 是否展示空数据
  isShowEmpty: boolean,
  // 正常显示的内容
  content: JSX.Element,
  // 请求错误
  errorContent?: ResultProps
  // 是否展示错误
  isShowError: boolean,
  // 设置loading状态
  isLoading: boolean
}


const renderContent = (props: EmptyWrapperProps) => {
  // 如果loading保证其他状态不被显示
  if (props.isLoading) {
    return null
  }
  if (props.isShowError) {
    return <Result {...props.errorContent} />
  } else if (props.isShowEmpty) {
    return <Empty />
  } else {
    return props.content
  }
}

const StatusWrapper = (props: EmptyWrapperProps) => {
  return (
    <div style={props.style}>
      <Spin size="large" spinning={props.isLoading}>
        {renderContent(props)}
      </Spin>
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