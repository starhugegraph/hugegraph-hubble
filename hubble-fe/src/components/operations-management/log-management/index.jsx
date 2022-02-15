import React, { useEffect, useContext, useState } from 'react'
import { AppStoreContext } from '../../../stores'
import { Button, Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import api from '../../../api/api'
import { defaultDateTimeParams } from '../../../stores/utils';

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
            if(res.status===200)
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
            if(res.status===200)
            return res.data.hosts.map(item => ({ label: item, value: item }))
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
        width: 80,
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
        copyable: true,
        hideInSearch: true
    },
];

export default () => {
    const appStore = useContext(AppStoreContext)
    const [outParams, setParams] = useState(null)
    useEffect(() => {
        appStore.setMenuObj({
            c_key: "7",
            f_key: "sub2"
        })
        appStore.setCurrentKey("0")
    }, [])

    return (
        <div className='query_list_container graphData_wrapper'>
            <p style={{ color: "#fa8c16" }}>本搜索结果包括所有图空间相关数据</p>
            <ProTable
                columns={columns}
                search={{ defaultCollapsed: false }}
                x-scroll={1500}
                request={async (params) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    const apiParams = defaultDateTimeParams(params)
                    setParams(apiParams)
                    let res = await api.getLogTableData(apiParams)
                    console.log(res);
                    if (res.status === 200) {
                        return {
                            data: res.data.records,
                            total: res.data.total,
                            success: true
                        }
                    }
                }}
                rowKey="index"
                pagination={{
                    showQuickJumper: true,
                    pageSizeOptions: [5, 10, 15, 20],
                    defaultPageSize: 20
                }}
                form={{
                    ignoreRules: false
                }}
                dateFormatter="string"
                headerTitle="日志列表"
                toolBarRender={(res) => [
                    <Tooltip title="只能导出当前显示数据">
                        <Button key="out" onClick={() => api.outTheData('/logs/export',outParams)}>
                            导出数据
                        </Button>
                    </Tooltip>
                ]
                }
            />
        </div>
    );
};
