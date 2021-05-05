import { Button, Popconfirm, Tooltip } from "antd";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { router } from "../../../router";
import { Assignment } from "../../../types";
import { BrowseContext } from "../index.browse";
import { onDeleteAssignment } from "../reducer.browse";
import { BrowseContextType } from "../types.browse";

/**
 * 对删除做二次确认处理
 * @param assignId 用于做删除请求 
 * @returns 组件
 */
export const DeleteButton = ({ assignId }: { assignId: string }) => {
    const context = useContext<BrowseContextType>(BrowseContext);
    const history = useHistory();
    // 提示是否可见
    const [visible, setVisible] = React.useState(false);

    // 删除成功后将提示设置为不可见
    if (context.state!.browseAssignment.find(a => a.assignId === assignId) === undefined) {
        history.push(router.home);
        return null;
    }

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = () => {
        context.dispatch!(onDeleteAssignment(assignId));
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <Popconfirm
            title="确认删除该作业吗？"
            visible={visible}
            onConfirm={handleOk}
            cancelText={"取消"}
            okText={"确认"}
            okButtonProps={{ loading: context.state?.deleteLoading }}
            onCancel={handleCancel}
        >
            <Button onClick={showPopconfirm}>
                删除
          </Button>
        </Popconfirm>
    )
}

/**
 * 对完成做二次确认处理
 * @param assignId 用于完成请求 
 * @returns 组件
 */
export const CompleteButton = ({ assignId }: { assignId: string }) => {
    // 提示是否可见
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        // setTimeout(() => {
        //   setVisible(false);
        //   setConfirmLoading(false);
        // }, 2000);
        // requestWraaper(async () => {
        //     const isSuucess = await assignmentService.signAssignmentComplete(assignId);
        // })
        setVisible(false);
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <Popconfirm
            title="确认将作业标记为全部批改完成吗？"
            visible={visible}
            onConfirm={handleOk}
            cancelText={"取消"}
            okText={"确认"}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}>
            <Button
                type="primary"
                onClick={showPopconfirm}>
                完成
          </Button>
        </Popconfirm>
    )
}

/**
 * 点击修改会路由到/publish/:assignId，根据id内容请求原先内容填充
 */
export const ModifyButton = ({ assignment }: { assignment: Assignment }) => {
    const routerParams = {
        pathname: `${router.publish.root}/${assignment.assignId}`,
        state: {
            assignment: assignment
        }
    }
    return (
        <Tooltip placement="topLeft" title="如果数据有误可以修改～" arrowPointAtCenter>
            <Link to={routerParams}>
                <Button key="2">修改</Button>
            </Link>
        </Tooltip>
    )
}