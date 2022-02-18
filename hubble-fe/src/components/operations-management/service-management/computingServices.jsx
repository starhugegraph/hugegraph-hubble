import React, { useState, useEffect, useContext } from 'react'
import { Table, Space, Button, message, Popconfirm, Input } from 'antd';
import DetailComputing from './computing-detail'
import { AppStoreContext } from '../../../stores';
import api from '../../../api/api'

let demoData = {
    "status": 200,
    data: {
        records: [
            {
                "id": "1", // id
                "task_type": "2",//  
                "task_algorithm": "3", // 算法
                "task_name": "4",// 
                "task_progress": "5",
                "task_status": "6",
                "task_create": "7",// 创建时间
                "task_description": "888" // 任务描述
            },
        ],
        "total": 2,  //
        "size": 10,  //
        "current": 1, //
        "orders": [],
        "searchCount": true,
        "pages": 1 //
    },
    "message": "msg",
    "cause": ""
}
export default function ComputingServices() {
    const [dataList, setDataList] = useState({})//数据列表
    const [page, setPage] = useState({})//分页条件
    const [isModalVisible, setIsModalVisible] = useState(false);//详情的显隐 
    const [detail, setDetail] = useState("");
    const appStore = useContext(AppStoreContext)

    // 获取数据
    useEffect(() => {
        setDataList(demoData.data)
        if (appStore.graphs !== "null") {
            getComputedTable()
        }
    }, [appStore.tenant, appStore.graphs, page])

    // 获取计算table数据
    const getComputedTable = () => {
        api.getComputeTableData(appStore.tenant, appStore.graphs, page).then(res => {
            console.log(res, "res");
        })
    };


    // 分页条件
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    // 详情
    const detailHandle = (params) => {
        setDetail(params.id)
        setIsModalVisible(true)
    }

    // 确认删除
    function confirm(value) {
        // {service_name: value.service }异步请求
        message.success('删除成功');
    }
    // 取消删除
    function cancel() {
        message.error('取消删除')
    }
    const columns = [
        {
            title: '实例名称',
            dataIndex: 'task_name',
            align: 'center'
        },
        {
            title: '租户',
            dataIndex: 'graphspace',
            align: 'center',
        },
        {
            title: '就绪',
            dataIndex: 'task_progress',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'task_status',
            align: 'center',
        },
        {
            title: '算法名称',
            dataIndex: 'task_algorithm',
            align: 'center',
        },
        {
            title: '创建时间',
            dataIndex: 'task_create',
            align: 'center',
        },
        {
            title: '操作',
            align: 'center',
            fixed: "right",
            render: (tag) => (
                <Space>
                    <Button onClick={() => detailHandle(tag)}>详情</Button>
                    <Popconfirm
                        title={`你确定要停止计算实例${tag.task_name}吗?`}
                        onConfirm={() => confirm(tag)}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>停止</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];
    return (
        <div className='query_list_container graphData_wrapper'>
            <div className='topDiv'>
                {/* <Input.Group compact className='inputBox'>
                    <Input.Search
                        allowClear
                        style={{ width: '100%' }}
                        placeholder='请输入实例名称'
                        onSearch={(params) => setSearch(params)} />
                </Input.Group>
                <Button
                    onClick={createHandle}
                    type="primary"
                    className='query_list_addButton'
                >
                    创建计算服务
                </Button> */}
            </div>
            <Table
                scroll={{ x: 1200 }}
                columns={columns}
                dataSource={dataList.records}
                rowKey={'id'}
                pagination={
                    {
                        pageSizeOptions: ['5', '10', '15', '20'],
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                        showSizeChanger: true
                    }
                }
                onChange={pageChange}
            />
            <DetailComputing
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                detail={detail}
            >
            </DetailComputing>
        </div>
    )
}
