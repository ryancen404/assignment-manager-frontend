import { Button, message } from "antd"
import { useContext } from "react";
import { BrowseContext } from "../index.browse";
import { onDownloadStuFile } from "../reducer.browse";
import { BrowseContextType } from "../types.browse";
import { StudentAssignmentWithKey } from "./DetailContent";

export interface PreviewButtnProps {
  assignment: StudentAssignmentWithKey
}

/**
 * 预览学生作业按钮
 */
const PreviewButton = (props: PreviewButtnProps) => {
  const context = useContext<BrowseContextType>(BrowseContext);

  const onPreview = () => {
    if (!props.assignment.assignmentStatus || props.assignment.myFile === undefined) {
      message.info(`${props.assignment.studentName}还没完成作业暂时无法预览`);
      return;
    }
    context.dispatch!(onDownloadStuFile(props.assignment.myFile.fileId, props.assignment.myFile.name))
  }

  return (
    <Button type="link" size="small" onClick={onPreview}>预览作业</Button>
  )
}

export default PreviewButton;