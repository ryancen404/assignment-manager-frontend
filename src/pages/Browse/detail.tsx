import { Button, Descriptions, Divider, PageHeader, Space, Typography } from 'antd';
import React, { CSSProperties, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { router, pageName } from '../../router';
import { Assignment, AssignmentFile } from '../../types';
import assignmentService from "../../services/teacher/assignment";

interface MatchParams {
  assignId: string;
}

export interface BrowseDetailPageProps {
  style?: CSSProperties
}

const BrowseDetailPage = (props: BrowseDetailPageProps) => {
  const [assignment, setAssignment] = useState<Assignment>()
  const match = useRouteMatch<MatchParams>(`${router.browse.root}${router.browse.detail}`)
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

  return (
    <div style={props.style}>
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
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="作业">{assignment?.name}</Descriptions.Item>
          <Descriptions.Item label="时间">{assignment?.timeFromTo}</Descriptions.Item>
          <Descriptions.Item label="班级">
            <Space split={<Divider type="vertical" />} align="baseline">
              {assignment?.classs.map(clazz => {
                return (<p key={clazz.classId}>{clazz.className} </p>);
              })}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="描述" span={3} style={{ textAlign: "left" }}>
            {assignment?.description}
          </Descriptions.Item>
          <Descriptions.Item label="附件">
            {
              files === undefined
                ? <p>无</p>
                : <Space split={<Divider type="vertical" />}>
                  {
                    files?.map(file => {
                      return (<Typography.Link key={file.md5} href={file.link}>{file.name}</Typography.Link>)
                    })
                  }
                </Space>
            }
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </div>
  )
}

/**
 * 作业详情页
 * 在浏览页点击作业名跳入，传入作业id
 */
export default BrowseDetailPage;