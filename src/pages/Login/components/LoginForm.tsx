import { Button, Checkbox, Form, Input, message, Radio } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useContext } from "react";
import "./LoginForm.css";
import { LoginAction, LoginContextType } from "../type";
import { LoginContext } from "..";
import { onLogin } from "../reducer";


const LoginForm = () => {
  const context = useContext<LoginContextType>(LoginContext);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const type = values.type === "学生" ? 1 : 0;
    context.dispatch!(onLogin(values.account, values.password, type, values.remember))
  };

  const onClickSignup = () => {
    const action: LoginAction = {
      type: "changeIndex",
      index: "signup"
    }
    context.dispatch!(action)
  }

  const onForget = () => {
    message.error("请联系管理员找回密码")
  }


  return (
    <div className="login-form">
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: '请输入你的邮箱!' }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入你的密码!' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码" />
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group defaultValue={"教师"}>
            <Radio value="教师">教师</Radio>
            <Radio value="学生">学生</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Button type="link" onClick={onForget}>忘记密码</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
        </Button>
          <Button type="link" onClick={onClickSignup} size="small">注册账号</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;