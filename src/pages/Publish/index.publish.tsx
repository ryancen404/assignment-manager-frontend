import React, { CSSProperties, Reducer, useEffect, useReducer } from "react";
import { Form, Button, PageHeader } from 'antd';
import { useHistory, useLocation, useRouteMatch } from "react-router";
import { Assignment } from "../../types";
import { router } from "../../router";
import { ClassItem, DesItem, FileItem, NameItem, TimeItem } from "./components/PublishItems";
import { PublishAction, PublishContextType, PublishState } from "./type.publish";
import { initPublish, initState, onPublish, reducer } from "./reducer.publish";
import { supportAsyncDispatch } from "../../other/reducer.config";
import { NewAssignmentParams } from "../../services/teacher/assignment";
import Global from "../../Global";

interface PublishProps {
  style: CSSProperties,
}

interface MatchParams {
  assignId: string
}

interface LoactionParams {
  assignment: Assignment
}

export const PublishContext = React.createContext<PublishContextType>({})

const PublishPage = (props: PublishProps) => {
  const match = useRouteMatch<MatchParams>(`${router.publish.root}${router.publish.fix}`);
  const location = useLocation<LoactionParams>();
  const history = useHistory()
  const [state, defDisptach] = useReducer<Reducer<PublishState, PublishAction>>(reducer, initState);

  const dispatch = supportAsyncDispatch<PublishAction>(defDisptach);

  useEffect(() => {
    dispatch(initPublish());
  }, []);

  // 当前路由进入是否是为了修改
  const forModfiy = match !== null
  console.log("forModfiy:", forModfiy);

  // 要修改的作业对象
  const modifyAssignment = location?.state?.assignment;
  console.log("modify assignment:", modifyAssignment)

  if (state.isPublishSucess === true) {
    Global.currSelectIndex = "1";
    history.push(router.home);
    return null;
  }

  /**
   * 当表单被提交时返回
   * @param values 该对象的属性由Form.Item的name决定
   */
  const onFinish = (values: any) => {
    console.log("onFinish:", values);
    const newAssignment: NewAssignmentParams = {
      name: values.name,
      desc: values.desc,
      classIds: values.class,
      startTime: values.time[0].valueOf(),
      endTime: values.time[1].valueOf(),
      filesName: [...state.fileNames]
    }
    dispatch(onPublish(newAssignment));
    console.log(newAssignment);
  }

  const onChange = (value: any) => {
    console.log(value)
  }

  return (
    <PublishContext.Provider value={{ state, dispatch }}>
      <div style={props.style}>
        <PageHeader
          style={{ marginLeft: '170px' }}
          onBack={() => window.history.back()}
          title="作业发布"
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
            <Button style={{marginLeft: "40%"}} type="primary" htmlType="submit" loading={state.isLoading}>
              立即发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </PublishContext.Provider>
  )
}

//css

// 作业发布页
export default PublishPage;

