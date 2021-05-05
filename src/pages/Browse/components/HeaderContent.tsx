import { Button, Descriptions, Divider, Space } from "antd";
import fileDownload from 'js-file-download';
import React from "react";
import Axios from "../../../services/config.service";
import { ShowAssignment } from "../index.browse";

// 渲染PageHeader内容
const renderHeaderContent = (column: number = 3, assignment: ShowAssignment) => (
    <Descriptions size="small" column={column}>
        <Descriptions.Item label="作业">{assignment.assignName}</Descriptions.Item>
        <Descriptions.Item label="时间">{assignment.timeFromTo}</Descriptions.Item>
        {getClassesItem(assignment)}
        <Descriptions.Item label="完成情况">{assignment.completion}</Descriptions.Item>
        {getDescItem(assignment)}
        {getAttachmentItem(assignment)}
    </Descriptions>
)

const onFileDownload = async (fileName: string) => {
    try {
        const response = await Axios.instance.get(`/api/files/assignment/attachment/${fileName}`, {
            responseType: 'blob',
        });
        fileDownload(response.data, fileName);
    } catch (error) {
        console.log("onFileDownload error:", error);
    }
}

export interface HeaderContentProps {
    assignment: ShowAssignment,
    column?: number
}

const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => (
    <div className="content">
        <div className="main">{renderHeaderContent(props.column, props.assignment)}</div>
    </div>
);

export default HeaderContent;

function getClassesItem(assignment: ShowAssignment) {
    return <Descriptions.Item label="班级">
        <Space split={<Divider type="vertical" />} align="baseline">
            {assignment.classs.map(clazz => {
                return (<p key={clazz.classId}>{clazz.className} </p>);
            })}
        </Space>
    </Descriptions.Item>;
}

function getAttachmentItem(assignment: ShowAssignment) {
    if (assignment.files === undefined || assignment.files.length === 0) {
        return null;
    }
    return (
        <Descriptions.Item label="附件">
            <Space split={<Divider type="vertical" />}>
                {assignment.files?.map((file, index) =>
                    <Button type="link" size="small" key={index} onClick={() => onFileDownload(file.name)}>
                        {file.name}
                    </Button>
                )}
            </Space>
        </Descriptions.Item>
    )
}

function getDescItem(assignment: ShowAssignment): JSX.Element | null {
    if (assignment.description === undefined || assignment.description === "") {
        return null
    }
    return (
        <Descriptions.Item label="描述" span={3} style={{ textAlign: "left" }}>
            {assignment.description}
        </Descriptions.Item>
    );
}
