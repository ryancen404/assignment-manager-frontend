import React, { CSSProperties, useEffect, useState } from 'react';
import { Button, PageHeader, Popconfirm, Tabs, Tooltip } from 'antd';
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

/**
 * 对删除做二次确认处理
 * @param assignId 用于做删除请求 
 * @returns 组件
 */
const DeleteButton = ({ assignId }: { assignId: string }) => {
  // 提示是否可见
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <Popconfirm
      title="确认删除该作业吗？"
      visible={visible}
      onConfirm={handleOk}
      cancelText={"取消"}
      okText={"确认"}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button onClick={showPopconfirm}>
        删除
        </Button>
    </Popconfirm>
  )
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
    <ContentWrapper
      isError={assignment === undefined}
      style={props.style}
      extra={<Button type="primary">Back Home</Button>}>
      <PageHeader
        onBack={() => window.history.back()}
        title={pageName.browse}
        subTitle={assignment?.assignName}
        extra={[
          // todo onClick
          <DeleteButton assignId={assignId!!}/>,
          <Tooltip placement="topLeft" title="如果数据有误可以修改～" arrowPointAtCenter>
            <Button key="2">修改</Button>
          </Tooltip>,
          <Tooltip placement="topLeft" title="将该作业标记为已经全部批改" arrowPointAtCenter>
            <Button key="1" type="primary">
              完成
            </Button>
          </Tooltip>,
        ]}
        footer={
          <Tabs defaultActiveKey="0" onChange={onTabsChange}>
            {assignment?.classs.map((value, index) => {
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
        classId={assignment?.classs[Number(tabIndex)]?.classId} />
    </ContentWrapper>
  )
}

/**
 * 作业详情页
 * 在浏览页点击作业名跳入，传入作业id
 */
export default BrowseDetailPage;