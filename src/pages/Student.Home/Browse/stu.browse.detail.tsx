import { Button, PageHeader, Upload, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import React, { useContext } from "react";
import { InboxOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from "react-router";
import { useRouteMatch } from "react-router-dom";
import ContentWrapper from "../../../components/ContentWrapper";
import Global from "../../../Global";
import { stu_router } from "../../../router";
import StuDetailContent from "./detail.content";
import { StuBrowseContext, StuShowAssignment } from "./index.stu.browse";
import { StuBrowseContextType } from "./type.stu.browse";
import { onCompleteAssignment } from "./reducer.stu.browse";

interface LoactionParams {
  assignment: StuShowAssignment
}
interface MatchParams {
  assignId: string;
}

const StuAssignmentDeatil = () => {
  const context = useContext<StuBrowseContextType>(StuBrowseContext);
  const history = useHistory();
  const location = useLocation<LoactionParams>();
  const match = useRouteMatch<MatchParams>(`${stu_router.stu}${stu_router.browse.root}${stu_router.browse.detail}`);

  if (context.state?.isCompleteSuccess) {
    history.push(`${stu_router.stu}${stu_router.browse.root}`)
    context.dispatch!({ type: "resetState", isCompSuccess: false })
    return null
  }

  const assignment = location.state.assignment;
  console.log("StuAssignmentDeatil assignment:", assignment);

  const onUploadChange = (info: UploadChangeParam) => {
    console.log("onUploadChange:", info);
    if (info.file.status === "done" && info.file.response !== null) {
      const response = info.file.response;
      if (response.code === 1) {
        // 上传成功后将旧文件名再请求标记为已经完成
        context.dispatch!(onCompleteAssignment(assignment.assignId, response.content))
      }
    }
  }

  const uploadProps: UploadProps = {
    name: "stuAssignFile",
    accept: ".pdf",
    action: "/api/files/assignment/stu",
    headers: {
      Authorization: Global.getGlobalToken()!,
      ContentType: "multipart/form-data",
    },
    method: "POST",
    onChange: onUploadChange
  }

  return (
    <ContentWrapper
      isError={assignment === undefined}
      extra={<Button type="primary">Back Home</Button>}>
      <PageHeader
        onBack={() => window.history.back()}
        title={"作业浏览"}
        subTitle={assignment?.assignName}>
        <StuDetailContent assignment={assignment} />
      </PageHeader>
      <div>
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
          <p className="ant-upload-hint">仅支持PDF文件</p>
        </Upload.Dragger>
      </div>
    </ContentWrapper>
  )
}

export default StuAssignmentDeatil;