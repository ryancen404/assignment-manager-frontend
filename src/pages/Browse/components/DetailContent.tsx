import { Button, Space, Table, Tag } from 'antd';
import React, { CSSProperties, Key, useEffect, useState } from 'react';
import { StudentAssignment } from '../../../types';

import classService from '../../../services/teacher/class';
import ContentWrapper from '../../../components/ContentWrapper';
import { TableRowSelection } from 'antd/lib/table/interface';

export interface DetailContentProps {
    style: CSSProperties,
    classId?: string
}

export interface StudentAssignmentWithKey extends StudentAssignment {
    key: Key
}

const columns = [
    {
        title: "姓名",
        key: "1",
        dataIndex: "studentName"
    },
    {
        title: "学号",
        key: "2",
        dataIndex: "studentNumber"
    },
    {
        title: "学生状态",
        key: "3",
        dataIndex: "status",
        render: (record: boolean) => {
            let color = "red"
            let text = "未完成"
            if (record) {
                color = 'green';
                text = '已完成';
            }
            return (
                <Tag color={color} key={"tag"}>{text}</Tag>
            )
        }
    },
    {
        title: "批改状态",
        key: "4",
        dataIndex: "corrected",
        render: (record: boolean) => {
            let color = "magenta"
            let text = "未批改"
            if (record) {
                color = 'geekblue';
                text = '已批改';
            }
            return (
                <Tag color={color} key={"tag"}>{text}</Tag>
            )
        }
    },
    {
        title: "分数",
        key: "5",
        dataIndex: "score",
    },
    {
        title: "操作",
        key: "6",
        render: (text: string) => {
            return (
                <Space size="small">
                    <a>预览作业</a>
                    <Button type="link" onClick={onClickScoring}>打分</Button>
                </Space>
            )
        },
    }
];

const onClickScoring = () => {
    
}

const getRowSelection = (
    dataSource: StudentAssignmentWithKey[] | undefined,
    selectedRowKeys: Key[],
    setSelectedKeys: ((keys: Key[]) => void),
    onChange: ((selectedRowKeys: Key[], selectedRows: StudentAssignmentWithKey[]) => void),
): TableRowSelection<StudentAssignmentWithKey> => {
    return {
        selectedRowKeys,
        onChange: onChange,
        selections: [
            {
                key: 'Select uncomplete',
                text: '选择未批改',
                onSelect: (currentRowKeys: Key[]) => {
                    console.log("onSelect:", currentRowKeys);
                    let newSelectedRowKeys: Key[] = [];
                    let newSelectedRow: StudentAssignmentWithKey[] = [];
                    newSelectedRowKeys = currentRowKeys.filter(value => {
                        console.log("currentRowKeys:", value);
                        if (dataSource && dataSource[Number(value)].corrected === false) {
                            newSelectedRow.push(dataSource[Number(value)])
                            return true
                        }
                        return false;
                    });
                    onChange(newSelectedRowKeys, newSelectedRow)
                },
            },
            {
                key: 'Select complete',
                text: '选择已批改',
                onSelect: (currentRowKeys: Key[]) => {
                    console.log("onSelect", currentRowKeys);
                    let newSelectedRowKeys: Key[] = [];
                    let newSelectedRow: StudentAssignmentWithKey[] = [];
                    newSelectedRowKeys = currentRowKeys.filter((value) => {
                        if (dataSource && dataSource[Number(value)].corrected) {
                            newSelectedRow.push(dataSource[Number(value)])
                            return true;
                        }
                        return false;
                    });
                    onChange(newSelectedRowKeys, newSelectedRow)
                },
            },
        ]
    }
}

/**
 * 详情页内容
 * @param props 
 * @returns 内容组件
 */
const DetailContent: React.FC<DetailContentProps> = (props: DetailContentProps) => {
    console.log("DetailContent props:", props);

    // 展示的学生信息数据
    const [studentData, setStudentData] = useState<StudentAssignment[]>([])
    // 当前选择的学生对象
    const [selectedKeys, setSelectedKeys] = useState<Key[]>([])

    useEffect(() => {
        if (props.classId !== undefined) {
            requestOneClass(props.classId)
        }
    }, [props.classId])

    // 带自增Key的数据
    // 如果要支持筛选功能必须加上key，否则数据错乱!!!!
    const studentWithKeyData: StudentAssignmentWithKey[]
        = studentData.map((element, index) => ({
            key: index,
            ...element
        }))

    const requestOneClass = (classId: string) => {
        const result = classService.getClassById(classId)
        setStudentData(result.studentsAssignment)
    }

    /**
     * 当全选、单击时会被回调，注意对于自定义筛选规则得自己回调！！
     * @param selectedRowKeys 前面为数据设的Key
     * @param selectedRows 数据对象
     */
    const onChange = (selectedRowKeys: React.Key[], selectedRows: StudentAssignmentWithKey[]) => {
        console.log("onChange: ", selectedRowKeys, selectedRows);
        setSelectedKeys(selectedRowKeys)
    };

    const rowSelection = getRowSelection(studentWithKeyData, selectedKeys, setSelectedKeys, onChange);


    console.log("DetailContent studentData:", studentWithKeyData);
    console.log("DetailContent selectedKeys:", selectedKeys);


    return (
        <ContentWrapper
            style={props.style}
            isError={(studentData === undefined) || (studentData.length === 0)}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={studentWithKeyData} />
        </ContentWrapper>
    )
}

export default DetailContent;