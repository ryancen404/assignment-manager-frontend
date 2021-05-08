import { Button, Input, message, Popover } from "antd";
import React, { useContext, useState } from "react";
import { BrowseContext } from "../index.browse";
import { onAssignmentScoring } from "../reducer.browse";
import { BrowseContextType } from "../types.browse";
import { StudentAssignmentWithKey } from "./DetailContent";

export interface ScoringButtonProps {
  text: string,
  assignment: StudentAssignmentWithKey,
}

// 打分组件
const ScoringButton = (props: ScoringButtonProps) => {
  const context = useContext<BrowseContextType>(BrowseContext);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(-1);

  const handleVisibleChange = (visible: boolean) => {
    // 未完成不能逐个打分
    if (!props.assignment.assignmentStatus) {
      return
    }
    setVisible(visible);
  };

  const onInputChange = (e: any) => {
    const input = e.target.value;
    const num = Number(input);
    setValue(num);
  }

  const onFinishScore = () => {
    if (value < 0 || value > 100) {
      message.error("分数只能在0-100");
      return
    }
    context.dispatch!(
      onAssignmentScoring(
        props.assignment.assignId,
        props.assignment.sId,
        value
      ))
    setVisible(false)
  }

  const onClickScoring = () => {
    if (!props.assignment.assignmentStatus) {
      message.info(`${props.assignment.studentName}还没完成作业暂时无法打分`);
    }
  }

  return (
    <Popover
      content={
        <div style={{ display: "flex", justifyContent: "flex-start", width: "150px" }}>
          <Input type="number" placeholder="请输入..." maxLength={3} onChange={onInputChange} />
          <Button type="primary" loading={context.state!.scoringLoading} onClick={onFinishScore}>确定</Button>
        </div>
      }
      title="打分"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button type="link" size="small" onClick={onClickScoring}>{props.text}</Button>
    </Popover>
  );
}

export default ScoringButton;