import { Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import React, { CSSProperties } from 'react';

/**
 * 对Antd Result 组件的封装
 * @param isError: 是否显示异常情况
 * @param onClick: 当extra的默认实现为Button时的点击回调
 */
export interface ContentWrapperProps {
    style?: CSSProperties,
    isError: boolean,
    status?: ResultStatusType,
    title?: string,
    subTitle?: string,
    extra?: JSX.Element,
    children: JSX.Element[] | JSX.Element
}

const renderContent = (props: ContentWrapperProps) => {
    if (props.isError) {
        return (
            <Result
                status={props.status}
                title={props.title}
                subTitle={props.subTitle}
                extra={props.extra}/>
        )
    } else {
        return props.children
    }
}

const ContentWrapper: React.FC<ContentWrapperProps> = (props: ContentWrapperProps) => (
    <div style={props.style}>
        {renderContent(props)}
    </div>
)

/**
 * note:
 * 定义组件的默认props, 默认为404
 */
ContentWrapper.defaultProps = {
    status: '404',
    title: "404",
    subTitle: "抱歉，出了点问题。"
}

/**
 * 对显示的内容包一层 可能出现的网络错误等情况的Result组件
 */
export default ContentWrapper;