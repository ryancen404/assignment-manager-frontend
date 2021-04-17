import { Button, PageHeader, Tabs } from 'antd'
import React, { CSSProperties, Reducer, useReducer } from 'react'
import ContentWrapper from '../../components/ContentWrapper'
import { pageName } from '../../router';
import InfoContent from './components/InfoContent';
import { BatchImport, ClearAll, OneImport } from './components/InfoHeaderButtons';
import { Action, InfoState, initState, reducer } from './reducer';

export const InfoContext = React.createContext<InfoContextType>({});

export type InfoContextType = {
    state?: InfoState,
    dispatch?: DispatchType
}

export type DispatchType = (action: Action | ((p: any) => void)) => void

export interface InfoManagerPageProps {
    style?: CSSProperties
}

// 信息管理页
const InfoManagerPage = (props: InfoManagerPageProps) => {
    const [state, defDispatch] = useReducer<Reducer<InfoState, Action>>(reducer, initState);
    // 支持异步函数
    const dispatch = (action: Action | ((p: any) => void)) => {
        if (typeof action === "function") {
            console.log("dispatch func");
            return action(defDispatch);
        }
        console.log("dispatch not fuc");
        return defDispatch(action);
    };
    const onTabsChange = (index: string) => {
        console.log("current tab:", index);
        dispatch({ type: "changeTab", index: index })
    }
    const contextObject: InfoContextType = { state, dispatch }
    

    return (
        <InfoContext.Provider value={contextObject}>
            <ContentWrapper
                isError={false}
                style={props.style}
                extra={<Button type="primary">Back Home</Button>}>
                <PageHeader
                    onBack={() => window.history.back()}
                    title={pageName.info}
                    extra={[
                        <ClearAll />,
                        <OneImport />,
                        <BatchImport />
                    ]}
                    // tabs
                    footer={
                        <Tabs defaultActiveKey={state.tabKey} onChange={onTabsChange}>
                            {state.class.map((clazz, index) =>
                                <Tabs.TabPane tab={clazz.className} key={index.toString()} />
                            )}
                            {/* todo: delete here */}
                            {/* <Tabs.TabPane tab={"班级1"} key={"0"} />
                            <Tabs.TabPane tab={"班级2"} key={"1"} />
                            <Tabs.TabPane tab={"班级3"} key={"2"} /> */}
                        </Tabs>
                    } />
                <InfoContent />
            </ContentWrapper>
        </InfoContext.Provider>
    )
}

export default InfoManagerPage;