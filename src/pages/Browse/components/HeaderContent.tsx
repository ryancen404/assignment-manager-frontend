import { Descriptions, Divider, Space, Typography } from "antd";
import React from "react";
import { Assignment } from "../../../types";

// 渲染PageHeader内容
const renderHeaderContent = (column: number = 3, assignment?: Assignment) => (
    <Descriptions size="small" column={column}>
        <Descriptions.Item label="作业">{assignment?.name}</Descriptions.Item>
        <Descriptions.Item label="时间">{assignment?.timeFromTo}</Descriptions.Item>
        <Descriptions.Item label="班级">
            <Space split={<Divider type="vertical" />} align="baseline">
                {assignment?.classs.map(clazz => {
                    return (<p key={clazz.classId}>{clazz.className} </p>);
                })}
            </Space>
        </Descriptions.Item>
        <Descriptions.Item label="描述" span={3} style={{ textAlign: "left" }}>
            {assignment?.description}
        </Descriptions.Item>
        <Descriptions.Item label="附件">
            {
                assignment?.files === undefined
                    ? <p>无</p>
                    : <Space split={<Divider type="vertical" />}>
                        {
                            assignment?.files?.map(file => {
                                return (<Typography.Link key={file.md5} href={file.link}>{file.name}</Typography.Link>)
                            })
                        }
                    </Space>
            }
        </Descriptions.Item>
    </Descriptions>
)

export interface HeaderContentProps {
    assignment?: Assignment,
    column?: number
}

const HeaderContent: React.FC<HeaderContentProps> = (props: HeaderContentProps) => (
    <div className="content">
        <div className="main">{renderHeaderContent(props.column, props.assignment)}</div>
    </div>
);

export default HeaderContent;