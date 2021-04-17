import React, { CSSProperties } from "react";
import { Form, Button, PageHeader } from 'antd';
import { useLocation, useRouteMatch } from "react-router";
import { Assignment } from "../../types";
import { router } from "../../router";
import { ClassItem, DesItem, FileItem, NameItem, TimeItem } from "./components/PublishItems";

interface PublishProps {
  style: CSSProperties,
}

interface MatchParams {
  assignId: string
}

interface LoactionParams {
  assignment: Assignment
}

const PublishPage = (props: PublishProps) => {
  const match = useRouteMatch<MatchParams>(`${router.publish.root}${router.publish.fix}`);
  const location = useLocation<LoactionParams>();
  // 当前路由进入是否是为了修改
  const forModfiy = match !== null
  console.log("forModfiy:", forModfiy);

  // 要修改的作业对象
  const modifyAssignment = location?.state?.assignment;
  console.log("modify assignment:", modifyAssignment)

  /**
   * 当表单被提交时返回
   * @param values 该对象的属性由Form.Item的name决定
   */
  const onFinish = (values: any) => {
    console.log("onFinish:", values);
  }

  const onChange = (value: any) => {
    console.log(value)
  }

  return (
    <div style={props.style}>
      <PageHeader
        style={{ marginLeft: '170px' }}
        onBack={() => window.history.back()}
        title="信息发布"
        subTitle="This is a subtitle"
      />
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"large"}
        scrollToFirstError={true}
        onChange={onChange}
        onFinish={onFinish}>
        <NameItem defaultAssignment={modifyAssignment} />
        <DesItem defaultAssignment={modifyAssignment} />
        <ClassItem defaultAssignment={modifyAssignment} />
        <TimeItem defaultAssignment={modifyAssignment} />
        <FileItem />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            立即发布
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

//css

// 作业发布页
export default PublishPage;

