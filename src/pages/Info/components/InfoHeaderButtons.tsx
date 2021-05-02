import { Button, Modal, Popconfirm, Space, Upload, UploadProps } from "antd";
import React, { useContext, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { requestWraaper } from "../../../services/utils";
import Global from "../../../Global";
import { UploadChangeParam } from "antd/lib/upload";
import { InfoContextType } from "../type";
import InfoContent from "./InfoContent";
import { InfoContext } from "..";
import { initialClassData } from "../reducer";

export const ClearAll = () => {
  // 提示是否可见
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    // setTimeout(() => {
    //   setVisible(false);
    //   setConfirmLoading(false);
    // }, 2000);
    requestWraaper(async () => {
      // const isSuucess = await assignmentService.deleteAssignment(assignId);
    })
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  return (
    <Popconfirm
      title="确认清空吗？"
      visible={visible}
      onConfirm={handleOk}
      cancelText={"取消"}
      okText={"确认"}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button onClick={showPopconfirm}>
        清空
        </Button>
    </Popconfirm>
  )
}

const onUploadChange = (info: UploadChangeParam) => {
  console.log("onUploadChange:", info);
}


export const BatchImport = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const context = useContext<InfoContextType>(InfoContext);
  const templateDownloadUrl = "http://127.0.0.1:3001/api/files/studentTemplate";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    // 点击OK后重新拉一次班级学生信息
    context.dispatch!(initialClassData());
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadProps: UploadProps = {
    name: "StuentImportToBackendFileName",
    accept: ".xlsx",
    action: "/api/files/studentImport",
    headers: {
      Authorization: Global.getGlobalToken()!,
      ContentType: "multipart/form-data"
    },
    method: "POST",
    onChange: onUploadChange
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        批量导入
    </Button>
      <Modal title="批量导入" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Space direction="vertical">
          <div>
            <Button type="link" size="small" href={templateDownloadUrl}>
              点击此处
              </Button>
              下载学生信息模版
          </div>
          <Upload {...uploadProps}>
            <Button>
              <UploadOutlined />上传学生信息
            </Button>
          </Upload>
        </Space>
      </Modal>
    </>
  )
}