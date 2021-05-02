import { Button, PageHeader, Tabs } from 'antd'
import React, { CSSProperties, Reducer, useEffect, useReducer } from 'react'
import ContentWrapper from '../../components/ContentWrapper'
import { supportAsyncDispatch } from '../../other/reducer.config';
import { pageName } from '../../router';
import InfoContent from './components/InfoContent';
import { BatchImport, ClearAll } from './components/InfoHeaderButtons';
import { initialClassData, initState, reducer } from './reducer';
import { InfoAction, InfoContextType, InfoState } from './type';

export const InfoContext = React.createContext<InfoContextType>({});

export interface InfoManagerPageProps {
    style?: CSSProperties
}

// 信息管理页
const InfoManagerPage = (props: InfoManagerPageProps) => {
    const [state, defDispatch] = useReducer<Reducer<InfoState, InfoAction>>(reducer, initState);
    // 支持异步函数
    const dispatch = supportAsyncDispatch<InfoAction>(defDispatch);

    useEffect(() => {
        dispatch(initialClassData())
    }, [])

    // 切换tab
    const onTabsChange = (index: string) => {
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
                        <BatchImport />
                    ]}
                    // tabs
                    footer={
                        <Tabs defaultActiveKey={state.tabKey} onChange={onTabsChange}>
                            {state.class.map((clazz, index) =>
                                <Tabs.TabPane tab={clazz.className} key={index.toString()} />
                            )}
                        </Tabs>
                    } />
                <InfoContent />
            </ContentWrapper>
        </InfoContext.Provider>
    )
}

export default InfoManagerPage;