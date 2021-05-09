import { Button, Modal, Popconfirm, Space, Upload, UploadProps } from "antd";
import React, { useContext, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import Global from "../../../Global";
import { UploadChangeParam } from "antd/lib/upload";
import { InfoContextType } from "../type";
import { InfoContext } from "..";
import { initialClassData, onDeleteAll } from "../reducer";

export const ClearAll = () => {
  const context = useContext<InfoContextType>(InfoContext);
  // 提示是否可见
  const [visible, setVisible] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  if (context.state?.deleteAllSuccess) {
    setTimeout(() => {
      setVisible(false);
      context.dispatch!({ type: "resetDeleteAll" })
    }, 1000)
  }

  const handleOk = () => {
    const index = context.state!.tabKey;
    const classId = context.state!.class[Number(index)].classId
    context.dispatch!(onDeleteAll(classId))
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
      okButtonProps={{ loading: context.state!.deleteAllLoading }}
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
  const [okLoading, setOkLing] = useState(false)
  const context = useContext<InfoContextType>(InfoContext);
  const templateDownloadUrl = "http://127.0.0.1:3001/api/files/studentTemplate";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setOkLing(true);
    // 点击OK后重新拉一次班级学生信息
    context.dispatch!(initialClassData());
    setOkLing(false);
    setIsModalVisible(false);
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
      <Modal title="批量导入" visible={isModalVisible} onOk={handleOk} okButtonProps={{ loading: okLoading }} onCancel={handleCancel}>
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