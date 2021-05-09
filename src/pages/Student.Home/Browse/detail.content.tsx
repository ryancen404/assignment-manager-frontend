import { Button, Descriptions, Divider, Space, Upload } from "antd";
import fileDownload from "js-file-download";
import React from "react";
import Axios from "../../../services/config.service";
import { StuShowAssignment } from "./index.stu.browse";

export interface StuDetailContentProps {
  assignment: StuShowAssignment
}

const StuDetailContent = (props: StuDetailContentProps) => {
  const assignment = props.assignment;
  return (
    <div style={{ fontSize: "18px" }}>
      <Descriptions column={3} size="default" labelStyle={{ fontSize: "18px" }}>
        <Descriptions.Item label="作业">
          {renderContent(assignment.assignName)}
        </Descriptions.Item>
        <Descriptions.Item label="任课老师">
          {renderContent(assignment.teacherName)}
        </Descriptions.Item>
        <Descriptions.Item label="时间">
          {renderContent(assignment.timeFromTo)}
        </Descriptions.Item>
        <Descriptions.Item label="作业状态">
          {renderContent(assignment.status)}
        </Descriptions.Item>
        {getDescItem(assignment)}
        <Descriptions.Item label="作业是否已批改">
          {renderContent(assignment.corrected ? "已批改" : "未批改")}
        </Descriptions.Item>
        <Descriptions.Item label="提交状态">
          {renderContent(assignment.assignmentStatus ? "已完成" : "未完成")}
        </Descriptions.Item>
        {getAttachmentItem(assignment)}
        {getMyAssignment(assignment)}
      </Descriptions>
    </div>
  )
}

const renderContent = (text: string, color?: string) => <p style={{ fontSize: "18px", color: "black" }}>{text}</p>

const getMyAssignment = (assignment: StuShowAssignment) => {
  if (!assignment.myFiles || assignment.myFiles.length === 0) {
    return null
  }
  return (
    <Descriptions.Item label="我的作业">
      <Space split={<Divider type="vertical" />}>
        {assignment.myFiles?.map((file, index) =>
          <Button type="link" size="small" key={index}
            onClick={() => onMyFileDownload(file.fileId, file.name)}>
            {file.name}
          </Button>
        )}
      </Space>
    </Descriptions.Item>
  )
}

const onMyFileDownload = async (fId: string, fileName: string) => {
  try {
    const response = await Axios.instance.get(`/api/files/assignment/student/${fId}`, {
      responseType: 'blob',
    });
    fileDownload(response.data, fileName);
  } catch (error) {
    console.log("onFileDownload error:", error);
  }
}

function getAttachmentItem(assignment: StuShowAssignment) {
  if (assignment.files === undefined || assignment.files.length === 0) {
    return null;
  }
  return (
    <Descriptions.Item label="附件">
      <Space split={<Divider type="vertical" />}>
        {assignment.files?.map((file, index) =>
          <Button type="link" size="small" key={index}
            onClick={() => onFileDownload(file.fileId, file.name)}>
            {file.name}
          </Button>
        )}
      </Space>
    </Descriptions.Item>
  )
}

const onFileDownload = async (fId: string, fileName: string) => {
  try {
    const response = await Axios.instance.get(`/api/files/assignment/attachment/${fId}`, {
      responseType: 'blob',
    });
    fileDownload(response.data, fileName);
  } catch (error) {
    console.log("onFileDownload error:", error);
  }
}

function getDescItem(assignment: StuShowAssignment): JSX.Element | null {
  if (assignment.description === undefined || assignment.description === "") {
    return null
  }
  return (
    <Descriptions.Item label="作业详情" span={3} style={{ textAlign: "left" }}>
      {renderContent(assignment.description)}
    </Descriptions.Item>
  );
}


export default StuDetailContent;