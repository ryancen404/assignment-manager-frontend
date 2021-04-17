import { Button, Popconfirm } from "antd";
import React, { useState } from "react";
import { requestWraaper } from "../../../services/utils";

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

// 导入一个
export const OneImport = () => {
  return (
    <Button>
      导入
    </Button>
  )
}

export const BatchImport = () => {
  return (
    <Button type="primary">
      批量导入
    </Button>
  )
}