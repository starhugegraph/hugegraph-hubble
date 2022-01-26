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
        valueType: 'select',
        align: 'center',
        // sorter: (a, b) => a.log_service - b.log_service,
        formItemProps: {
            name: "services",
        },
        fieldProps: () => ({ mode: "multiple" }),
        request: async () => {
            let res = await api.getServicesList()
            console.log(res, "log-servicesList");
        }

    },
    {
        title: '主机名',
        dataIndex: 'log_host',
        align: 'center',
        valueType: 'select',
        fieldProps: () => ({ mode: "multiple" }),
        formItemProps: {
            name: "hosts",
            label: "主机范围",
        },
        request: async () => {
            let data = await api.getHostList()
            console.log(data, "log-hostList");
        }
    },
    {
        title: '开始时间',
        dataIndex: 'time',
        valueType: "dateTime",
        align: 'center',
        hideInTable: true,
        order: 10,
        formItemProps: {
            name: "start_datetime",
        },
        // fieldProps:()=>({format: 'YYYY-MM-DD hh:mm:ss'}),
    },
    {
        title: '结束时间',
        dataIndex: 'over_time',
        valueType: "dateTime",
        align: 'center',
        hideInTable: true,
        order: 9,
        formItemProps: {
            name: "end_datetime",
        },
        fieldProps: () => ({ showNow: true }),
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
        <div className='query_list_container graphData_wrapper'>
            <ProTable
                columns={columns}
                search={{ defaultCollapsed: false }}
                x-scroll={1500}
                request={(params, sorter, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    if (!params.start_datetime)
                        params.start_datetime = new Date().Format("yyyy-MM-dd") + " 00:00:00"
                    if (!params.end_datetime)
                        params.end_datetime = new Date().Format("yyyy-MM-dd HH:mm:ss")
                    api.getLogTableData(
                        {
                            ...params,
                            page_no: params.current,
                            page_size: params.pageSize,
                        }
                    ).then(res => {
                        console.log(res, "log");
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
