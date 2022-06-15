import React, { useState } from 'react'
import { Button, Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import api from '../../../api/api'
import { defaultDateTimeParams,timeSort } from '../../../stores/utils';

const columns = [
    {
        title: '时间',
        width: 80,
        align: "center",
        dataIndex: 'log_datetime',
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
        formItemProps: {
            name: "services",
        },
        fieldProps: () => ({ mode: "multiple" }),
        request: async () => {
            let res = await api.getLogsServicesList()
            if (res.status === 200)
                return res.data.services.map(item => ({ label: item, value: item }))
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
            let res = await api.getHostList()
            if (res.status === 200)
                return res.data.hosts.map(item => ({ label: item, value: item }))
        }
    },
    {
        title: '开始时间',
        dataIndex: 'start_datetime',
        valueType: "dateTime",
        align: 'center',
        hideInTable: true,
        order: 10,
        formItemProps: {
            initialValue: defaultDateTimeParams().start,
        },
    },
    {
        title: '结束时间',
        dataIndex: 'end_datetime',
        valueType: "dateTime",
        align: 'center',
        hideInTable: true,
        order: 9,
        formItemProps: {
            initialValue: defaultDateTimeParams().end,
        },
        fieldProps: () => ({ showNow: true }),
    },
    {
        title: '级别',
        dataIndex: 'log_level',
        align: 'center',
        valueType: "select",
        width: 80,
        fieldProps:()=>({allowClear:false}),
        formItemProps: {
            label:"最低日志级别",
            name: "level",
            initialValue: "DEBUG",
        },
        request: async () => {
            const res = await api.getLogsLevelList()
            if (res && res.status === 200) {
                return res.data.levels.map(item => (
                    {
                        label: item,
                        value: item
                    }
                ))
            }
        }
    },
    {
        title: '日志信息',
        dataIndex: 'log_message',
        copyable: true,
        hideInSearch: true
    },
];

export default () => {
    const [outParams, setParams] = useState(null)
    return (
        <div className='query_list_container graphData_wrapper'>
            <p style={{ color: "#fa8c16" }}>本搜索结果包括所有图空间相关数据</p>
            <ProTable
                columns={columns}
                search={{ 
                    defaultCollapsed: false,
                    labelWidth:100,
                    span: 12
                }}
                x-scroll={1500}
                request={async (params) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    let apiParams = {
                        ...params,
                        page_no: params.current,
                        page_size: params.pageSize,
                    }
                    setParams(apiParams)
                    let res = await api.getLogTableData(apiParams)
                    let records = res.data.records
                    if (res.status === 200) {
                        return {
                            data: records,
                            total: res.data.total,
                            success: true
                        }
                    }
                }}
                editable={{
                    type: 'multiple',
                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                }}
                rowKey="index"
                pagination={{
                    pageSizeOptions: [5, 10, 15, 20],
                    defaultPageSize: 20
                }}
                dateFormatter="string"
                headerTitle="日志列表"
                toolBarRender={() => [
                    <Tooltip title="只能导出当前显示数据">
                        <Button key="out" onClick={() => api.outTheData('/logs/export', outParams)}>
                            导出数据
                        </Button>
                    </Tooltip>
                ]
                }
            />
        </div>
    );
};
