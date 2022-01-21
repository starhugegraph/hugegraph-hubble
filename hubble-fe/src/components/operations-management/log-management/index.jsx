import React, { useEffect, useContext } from 'react'
import { AppStoreContext } from '../../../stores'
import { Button, Tooltip } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import api from '../../../api/api'

const tableListDataSource = [];

const columns = [
    {
        title: '时间',
        width: 80,
        align: "center",
        dataIndex: 'log_datetime',
        // sorter: (a, b) => a.log_datetime - b.log_datetime,
        formItemProps: {
            label: "检索内容",
            name: "query",
            initialValue: ""
        },
        fixed: "left",
    },
    {
        title: '服务',
        dataIndex: 'log_service',
        align: 'center',
        // sorter: (a, b) => a.log_service - b.log_service,
        formItemProps: {
            name: "services",
        },
        valueType: 'select',
        fieldProps: () => ({ mode: "multiple" }),
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
            },
        },
    },
    {
        title: '主机名',
        dataIndex: 'log_host',
        align: 'center',
        valueType: 'select',
        fieldProps: () => ({ mode: "multiple" }),
        valueEnum: {
            all: { text: '全部', status: 'Default' },
            open: {
                text: '未解决',
                status: 'Error',
            },
            closed: {
                text: '已解决',
                status: 'Success',
            },
        },
        formItemProps: {
            name: "hosts",
            label: "主机范围",
        },
    },
    {
        title: '位置',
        dataIndex: 'log_location',
        align: 'center',
        hideInSearch: true
    },
    {
        title: '行号',
        dataIndex: 'log_file_rownu',
        align: 'center',
        hideInSearch: true
    },
    {
        title: '级别',
        dataIndex: 'log_level',
        align: 'center',
        valueType: "select",
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: "必填项"
                }
            ],
            label: "日志级别",
            name: "level",
            initialValue: "DEBUG"
        },
    },
    {
        title: '日志信息',
        dataIndex: 'log_message',
        width: 200,
        ellipsis: true,
        copyable: true,
        hideInSearch: true
    },
];

export default () => {
    const appStore = useContext(AppStoreContext)
    useEffect(() => {
        appStore.setMenuObj({
            c_key: "7",
            f_key: "sub2"
        })
        appStore.setCurrentKey("0")
    }, [])
    return (
        <div className='graphData_wrapper' style={{ width: "100%", height: "calc(100vh - 130px)", margin: "20px 0px" }}>
            <ProTable
                columns={columns}
                search={{ defaultCollapsed: false }}
                scroll={{ x: 1500 }}
                request={(params, sorter, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    console.log(params);
                    api.getLogTableData(
                        {
                            ...params,
                            page_no: params.current,
                            page_size: params.pageSize
                        }
                    ).then(res => {
                        console.log(res);
                    })
                    return Promise.resolve({
                        data: tableListDataSource,
                        success: true
                    })
                }}
                rowKey="key"
                pagination={{
                    showQuickJumper: true,
                }}
                form={{
                    ignoreRules: false
                }}
                dateFormatter="string"
                headerTitle="日志列表"
                toolBarRender={() => [
                    <Button key="out">
                        导出数据
                        <DownOutlined />
                    </Button>,
                ]}
            />
        </div>
    );
};
