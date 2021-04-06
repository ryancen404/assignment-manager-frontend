import { CSSProperties, useEffect, useState } from 'react';
import { Button, PageHeader, Tabs } from 'antd';
import { useRouteMatch } from 'react-router-dom';

import HeaderContent from './components/HeaderContent';
import DetailContent from './components/DetailContent';
import ContentWrapper from '../../components/ContentWrapper'

import { router, pageName } from '../../router';
import { Assignment } from '../../types';
import assignmentService from "../../services/teacher/assignment";
const { TabPane } = Tabs;

interface MatchParams {
  assignId: string;
}

export interface BrowseDetailPageProps {
  style?: CSSProperties
}

const BrowseDetailPage = (props: BrowseDetailPageProps) => {
  // 作业对象
  const [assignment, setAssignment] = useState<Assignment>();
  // 当前选择的tab
  const [tabIndex, setTabIndex] = useState("1");

  const match = useRouteMatch<MatchParams>(`${router.browse.root}${router.browse.detail}`);
  console.log("BrowseDetailPage", match?.params.assignId);

  const assignId = match?.params.assignId;
  const files = assignment?.files

  useEffect(() => {
    requestAssignmentDeatil(assignId!!)
  }, [assignId]);

  // 根据id请求具体的信息
  const requestAssignmentDeatil = (assignId: string) => {
    const result = assignmentService.getAssignmentDeatil(assignId)
    setAssignment(result)
  }

  console.log("BrowseDetailPage data:", assignment);
  console.log("the files is null?", files);

  const onTabsChange = (index: string) => {
    console.log("BrowseDetailPage curren tab:", index);
    setTabIndex(index);
  }

  return (
    // <div style={props.style}>
    <ContentWrapper
      isError={assignment === undefined}
      style={props.style}
      extra={<Button type="primary">Back Home</Button>}>
      <PageHeader
        onBack={() => window.history.back()}
        title={pageName.browse}
        subTitle={assignment?.name}
        extra={[
          // todo onClick
          <Button key="3">删除</Button>,
          <Button key="2">修改</Button>,
          <Button key="1" type="primary">
            完成
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1" onChange={onTabsChange}>
            {assignment?.classs.map((value, index) => {
              return <TabPane tab={value.className} key={index} />
            })}
          </Tabs>
        }>
        <HeaderContent assignment={assignment} column={3} />
      </PageHeader>
    </ContentWrapper>
  )
}

/**
 * 作业详情页
 * 在浏览页点击作业名跳入，传入作业id
 */
export default BrowseDetailPage;