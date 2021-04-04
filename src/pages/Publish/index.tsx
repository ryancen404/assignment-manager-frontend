import { CSSProperties } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';


const { Option } = Select;
const { RangePicker } = DatePicker;


interface PublishProps {
  style: CSSProperties,
}

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


const PublishPage = (props: PublishProps) => {

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
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"large"}
        scrollToFirstError={true}
        onChange={onChange}
        onFinish={onFinish}>
        <Form.Item
          name="name"
          label="作业名"
          rules={[{required: true, message: '必须要输入作业名', type: 'string'}]}>
          <Input
            placeholder="Assignment 1" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="添加描述"
          rules={[{ type: 'string' }]}>
          <Input
            placeholder="更多描述写在这里" />
        </Form.Item>
        <Form.Item
          name="class"
          label="选择班级"
          rules={[{ required: true, message: '至少选择一个班级!', type: 'array' }]}>
          <Select mode="multiple" placeholder="请选择该作业发布的班级">
            <Option value="red">班级1</Option>
            <Option value="green">班级2</Option>
            <Option value="blue">班级3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="time"
          label="设置时间"
          wrapperCol={{ span: 6 }}
          rules={[{ type: 'array' as const, required: true, message: '请选择时间' }]}>
          <RangePicker showTime format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item label="上传附件">
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
              <p className="ant-upload-hint">支持单个或批量上传</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
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