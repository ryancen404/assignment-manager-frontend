import { DatePicker, Form, Input, Select, Upload, UploadProps } from "antd"
import { InboxOutlined } from '@ant-design/icons';
import React, { useContext } from "react"
import { Assignment } from "../../../types";
import moment from "moment";
import Global from "../../../Global";
import { UploadChangeParam } from "antd/lib/upload";
import { PublishContextType } from "../type.publish";
import { PublishContext } from "../index.publish";

const { Option } = Select;

/**
 * 修改作业时会传的默认作业参数
 */
export interface DefaultProps {
    defaultAssignment?: Assignment
}

// 作业名称Item
export const NameItem = (props: DefaultProps) => {
    return (
        <Form.Item
            name="name"
            label="作业名"
            rules={[{ required: true, message: '作业名不能为空', type: 'string' }]}>
            <Input
                allowClear={true}
                defaultValue={props.defaultAssignment?.assignName}
                placeholder={"输入本次作业名称"} />
        </Form.Item>
    )
}

export const DesItem = (props: DefaultProps) => {
    return (
        <Form.Item
            name="desc"
            label="添加描述"
            rules={[{ type: 'string' }]}>
            <Input
                defaultValue={props.defaultAssignment?.description}
                placeholder="更多描述写在这里" />
        </Form.Item>
    )
}

// 班级选择Item
export const ClassItem = (props: DefaultProps) => {
    const context = useContext<PublishContextType>(PublishContext);
    const classes = context.state?.classes;

    return <Form.Item
        name="class"
        label="选择班级"
        rules={[{ required: true, message: '至少选择一个班级!', type: 'array' }]}>
        <Select
            defaultValue={props.defaultAssignment?.classs.map(clazz => clazz.className)}
            allowClear
            mode="multiple"
            placeholder="请选择该作业发布的班级">
            {classes?.map(clazz =>
                <Option value={clazz.classId}>{clazz.className}</Option>
            )}
        </Select>
    </Form.Item>;
}

export const FileItem = () => {
    const context = useContext<PublishContextType>(PublishContext);

    const onUploadChange = (info: UploadChangeParam) => {
        console.log("onUploadChange:", info);
        if (info.file.status === "done" && info.file.response !== null) {
            const response = info.file.response;
            if (response.code === 1) {
                context.dispatch!({
                    type: "appendFileNames",
                    fileName: response.content
                })
            }
        }
    }
    const uploadProps: UploadProps = {
        name: "tempAttachment",
        action: '/api/files/assignment/attachment',
        headers: {
            Authorization: Global.getGlobalToken()!,
            ContentType: "multipart/form-data"
        },
        method: "POST",
        onChange: onUploadChange
    }

    console.log("the upload session: ", uploadProps.name);

    return (
        <Form.Item label="上传附件">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
                    <p className="ant-upload-hint">支持单个或批量上传</p>
                </Upload.Dragger>
            </Form.Item>
        </Form.Item>
    )
}

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};

/**
 * 时间范围选择
 * @param props
 */
export const TimeItem = (props: DefaultProps) => {
    const dateFormat = "YYYY/MM/DD";
    let defaultValue: any = null;
    if (props.defaultAssignment !== undefined) {
        const assignment = props.defaultAssignment;
        defaultValue = [moment(assignment.startTime, dateFormat), moment(assignment.endTime, dateFormat)];
    }
    return (
        <Form.Item
            name="time"
            label="设置时间"
            wrapperCol={{ span: 6 }}
            rules={[{ type: 'array' as const, required: true, message: '请选择时间' }]}>
            <DatePicker.RangePicker
                showTime
                defaultValue={defaultValue}
                format={dateFormat} />
        </Form.Item>
    )
}