import React, { useState } from 'react';
import { Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import api from '../../../api/api'
import { defaultDateTimeParams, timeSort } from '../../../stores/utils';

const columns = [
    {
        title: "操作",
        dataIndex: 'audit_action',
        valueType: 'select',
        width: 50,
        initialValue: [],
        formItemProps: {
            label: "操作类型",
            name: "operations",
        },
        fieldProps: () => ({ mode: "multiple" }),
        request: async () => {
            let res = await api.getOperationList()
            if (res.status === 200) return res.data.map(item => ({ label: item, value: item }))
        }
    },
    {
        title: '开始时间',
        dataIndex: 'audit_datetime',
        valueType: 'dateTime',
        width: 50,
        formItemProps: {
            name: "start_datetime",
            initialValue: defaultDateTimeParams().start,
        },
        order: 13,
    },
    {
        title: "服务",
        dataIndex: 'audit_service',
        valueType: 'select',
        fieldProps: () => ({ mode: "multiple" }),
        width: 50,
        initialValue: [],
        formItemProps: {
            name: "services"
        },
        request: async () => {
            let res = await api.getAuditServicesList()
            if (res.status === 200) {
                return res.data.map(item => ({ label: item, value: item }))
            }
        }
    },
    {
        title: '结束时间',
        valueType: 'dateTime',
        order: 12,
        hideInTable: true,
        formItemProps: {
            name: "end_datetime",
            initialValue: defaultDateTimeParams().end,
        },
    },
    {
        title: "图空间",
        dataIndex: 'audit_graphspace',
        valueType: 'text',
        width: 50,
        formItemProps: {
            name: "graphspace",
            label: "图空间"
        }
    },
    {
        title: "图",
        dataIndex: 'audit_graph',
        valueType: 'text',
        width: 50,
        formItemProps: {
            name: "graph",
        }
    },
    {
        title: '安全级别',
        dataIndex: 'audit_level',
        width: 50,
        hideInSearch: true
    },
    {
        title: "用户",
        dataIndex: 'audit_user',
        valueType: 'text',
        width: 50,
        formItemProps: {
            name: "user",
        }
    },
    {
        title: "操作结果",
        dataIndex: 'audit_result',
        width: 50,
        hideInSearch: true
    },
];

export default () => {
    const [outParams, setParams] = useState(null)
    return (
        <div className='graphData_wrapper query_list_container'>
            <p style={{ color: "#fa8c16" }}>本搜索结果包括所有图空间相关数据</p>
            <ProTable
                columns={columns}
                request={async (params = {}) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    let apiParams = {
                        ...params,
                        page_no: params.current,
                        page_size: params.pageSize,
                    }
                    setParams(apiParams);
                    let res = await api.getAuditTableData(apiParams);
                    let records = res.data.records;
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
                rowKey="id"
                search={{
                    labelWidth: 100,
                    span: 12,
                    defaultCollapsed: false
                }}
                pagination={{
                    pageSizeOptions: [5, 10, 15, 20],
                    defaultPageSize: 20
                }}
                dateFormatter="string"
                headerTitle="审计"
                toolBarRender={() => [
                    <Button key="out" onClick={() => api.outTheData('/audits/export', outParams)}>
                        导出数据
                    </Button>,
                ]}
            />
        </div>
    );
};
