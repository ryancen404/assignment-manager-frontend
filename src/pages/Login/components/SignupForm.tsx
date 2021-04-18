import { Button, Form, Input, message, Radio } from "antd";
import React, { useContext } from "react";
import { LoginContext } from "..";
import { SignupParams } from "../../../services/userService";
import { onSignup } from "../reducer";
import { LoginAction, LoginContextType } from "../type";
import "./SignupForm.css"

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 5,
    },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const SignupForm = () => {
  const context = useContext<LoginContextType>(LoginContext);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    if (values.type === "学生") {
      if (values.class === undefined || values.class.trim() === "") {
        message.error("请输入正确的班级号");
        return;
      }
      const numberAccount = Number(values.account);
      if (isNaN(numberAccount)) {
        message.error("请输入正确的学号");
        return;
      }
    } else {
      if (values.account.trim().indexOf("@") === -1) {
        message.error("请输入正确的邮箱格式")
        return;
      }
    }
    const signupParams: SignupParams = {
      account: values.account,
      password: values.password,
      username: values.name,
      type: values.type === "学生" ? 1 : 0,
      college: values.college,
      class: values.class
    }
    context.dispatch!(onSignup(signupParams))
  };

  const onClickLogin = () => {
    const action: LoginAction = {
      type: "changeIndex",
      index: "login"
    }
    context.dispatch!(action);
  }

  return (
    <div className="signup-form">
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        scrollToFirstError>
        <Form.Item
          name="account"
          label="账号"
          rules={[
            {
              required: true,
              message: '请输入你的邮箱或学号!',
            },
          ]}>
          <Input placeholder="请输入邮箱或学号" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入你的密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="再次确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请确认你的密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次密码不一致!'));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名!', whitespace: false }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="college"
          label="学院"
          rules={[{ required: true, message: '请输入学院信息!', whitespace: false }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="class"
          label="班级"
          rules={[{ required: false, whitespace: false }]}>
          <Input placeholder="如果是学生请输入班级号" />
        </Form.Item>
        <Form.Item name="type" {...{ wrapperCol: { span: 24, offset: 2 } }}>
          <Radio.Group defaultValue="教师">
            <Radio value="教师">教师</Radio>
            <Radio value="学生">学生</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
        </Button>
         已有账号请
        <Button type="link" onClick={onClickLogin} size="small" >登陆</Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default SignupForm;