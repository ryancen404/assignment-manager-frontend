import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Button, PageHeader, Tabs } from 'antd';
import { useLocation, useRouteMatch } from 'react-router-dom';

import HeaderContent from './components/HeaderContent';
import DetailContent from './components/DetailContent';
import ContentWrapper from '../../components/ContentWrapper'
import { router, pageName } from '../../router';
import { Assignment } from '../../types';
import assignmentService from "../../services/teacher/assignment";
import { CompleteButton, DeleteButton, ModifyButton } from './components/DetailHeaderButton';
import { BrowseContextType } from './types.browse';
import { BrowseContext, ShowAssignment } from './index.browse';
import { getAssignmentClasses } from './reducer.browse';
const { TabPane } = Tabs;

interface MatchParams {
  assignId: string;
}

export interface BrowseDetailPageProps {
  style?: CSSProperties
}

interface LoactionParams {
  assignment: ShowAssignment
}

const BrowseDetailPage = (props: BrowseDetailPageProps) => {
  const context = useContext<BrowseContextType>(BrowseContext);
  // 通过路由传过来的参数
  const location = useLocation<LoactionParams>();
  const match = useRouteMatch<MatchParams>(`${router.browse.root}${router.browse.detail}`);

  // 当前选择的tab
  const [tabIndex, setTabIndex] = useState("0");

  console.log("BrowseDetailPage", match?.params.assignId);

  const assignId = match?.params.assignId;
  const assignment = location.state.assignment;

  useEffect(() => {
    if (assignId && context.state?.detailClassesMap.get(assignId) === undefined)
      context.dispatch!(getAssignmentClasses(assignId));
  }, [assignId])

  console.log("BrowseDetailPage data:", assignment);
  // console.log("the files is null?", files);

  const onTabsChange = (index: string) => {
    console.log("BrowseDetailPage curren tab:", index);
    setTabIndex(index);
  }

  const detailClasses = context.state!.detailClassesMap.get(assignId!);
  const showClass = detailClasses?.find((_, index) => index === Number(tabIndex));
  return (
    <ContentWrapper
      isError={assignment === undefined}
      style={props.style}
      extra={<Button type="primary">Back Home</Button>}>
      <PageHeader
        onBack={() => window.history.back()}
        title={pageName.browse}
        subTitle={assignment?.assignName}
        extra={[
          // 右上角的按钮
          <DeleteButton assignId={assignId!} />,
          <ModifyButton assignment={assignment!} />,
          <CompleteButton assignId={assignId!} />,
        ]}
        footer={
          <Tabs defaultActiveKey="0" onChange={onTabsChange}>
            {assignment.classs.map((value, index) => {
              return <TabPane tab={value.className} key={index} />
            })}
          </Tabs>
        }>
        <HeaderContent assignment={assignment} column={3} />
      </PageHeader>
      <DetailContent
        style={{
          marginTop: "20px",
          marginLeft: "22px"
        }}
        class={showClass} />
    </ContentWrapper>
  )
}

/**
 * 作业详情页
 * 在浏览页点击作业名跳入，传入作业id
 */
export default BrowseDetailPage;