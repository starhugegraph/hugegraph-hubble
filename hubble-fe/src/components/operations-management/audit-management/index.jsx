import React, { useRef, useContext, useEffect } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { AppStoreContext } from '../../../stores';
import api from '../../../api/api'

const columns = [
    {
        title: "操作",
        dataIndex: 'audit_operation',
        valueType: 'select',
        width: 50,
        initialValue: [],
        formItemProps: {
            label: "操作类型",
            name: "operations",
        },
        fieldProps: () => ({ mode: "multiple" }),
        request: () => {
            api.getOperationList(res => {
                console.log(res, "OperationList");
            })
        }
    },
    {
        title: '开始时间',
        dataIndex: 'audit_datetime',
        valueType: 'dateTime',
        width: 50,
        formItemProps: {
            name: "start_datetime",
        },
        order: 13,
        sorter: true,
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
            let res = api.getServicesList()
            console.log(res, "audit-servicesList");
        }
    },
    {
        title: '结束时间',
        valueType: 'dateTime',
        order: 12,
        hideInTable: true,
        formItemProps: {
            name: "end_datetime",
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
        title: "用户IP",
        dataIndex: 'audit_ip',
        valueType: 'text',
        width: 50,
        formItemProps: {
            name: "ip",
            label: "IP"
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
    const appStore = useContext(AppStoreContext)
    useEffect(() => {
        appStore.setMenuObj({
            c_key: "8",
            f_key: "sub2"
        })
        appStore.setCurrentKey("0")
    }, [])
    const actionRef = useRef();
    return (
        <div className='graphData_wrapper query_list_container'>
            <p style={{color:"#fa8c16"}}>本搜索结果包括所有图空间相关数据</p>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                request={async (params = {}, sort, filter) => {
                    // 表单搜索项会从 params 传入，传递给后端接口。
                    if (!params.start_datetime)
                        params.start_datetime = new Date().Format("yyyy-MM-dd") + " 00:00:00"
                    if (!params.end_datetime)
                        params.end_datetime = new Date().Format("yyyy-MM-dd HH:mm:ss")
                    console.log(params);
                    api.getAuditTableData({
                        ...params,
                        page_no: params.current,
                        page_size: params.pageSize
                    }).then(res => {
                        console.log(res, "audit");
                    })
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
                    labelWidth: '100',
                    span: 12,
                    defaultCollapsed: false
                }}
                pagination={{
                    pageSize: 5,
                    pageSizeOptions: ['5', '10', '15', '20']
                }}
                dateFormatter="string"
                headerTitle="审计"
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
