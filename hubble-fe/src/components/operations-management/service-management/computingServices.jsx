import React, { useState, useEffect, useContext } from 'react'
import { Table, Space, Button, message, Popconfirm, Input } from 'antd';
import DetailComputing from './computing-detail'
import { AppStoreContext } from '../../../stores';
import api from '../../../api/api'
import { timestampToTime } from '../../../stores/utils';

export default function ComputingServices() {
    const appStore = useContext(AppStoreContext)
    const [dataList, setDataList] = useState({})//数据列表
    const [page, setPage] = useState({})//分页条件
    const [isModalVisible, setIsModalVisible] = useState(false);//详情的显隐 
    const [loading, setLoading] = useState(false);//loading
    const [detail, setDetail] = useState("");

    // 获取数据
    useEffect(() => {
        if (appStore.graphs !== "null") {
            getComputedTable()
        } else {
            setDataList({})
        }
    }, [appStore.tenant, appStore.graphs, page])

    // 获取计算table数据
    const getComputedTable = () => {
        setLoading(true)
        api.getComputeTableData(appStore.tenant, appStore.graphs, page).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setDataList(res.data)
            }
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

    // 确认停止
    function confirm(id) {
        api.stopComputeDetail(appStore.tenant, appStore.graphs, id).then(
            res => {
                if (res.status === 200) message.success("停止成功")
            }
        )
    }

    // 确认删除
    function confirmDelete(id) {
        api.deleteCompute(appStore.tenant, appStore.graphs, id).then(
            res => {
                if (res.status === 200){
                    message.success("删除成功")
                    getComputedTable()
                }
            }
        )
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
            title: '任务类型',
            dataIndex: 'task_type',
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
            render: (value) => (<span>{timestampToTime(value)}</span>)
        },
        {
            title: '操作',
            align: 'center',
            width:250,
            fixed: "right",
            render: (tag) => (
                <Space>
                    <Button onClick={() => detailHandle(tag)}>详情</Button>
                    <Popconfirm
                        title={`你确定要停止计算实例${tag.task_name}吗?`}
                        onConfirm={() => confirm(tag.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>停止</Button>
                    </Popconfirm>
                    <Popconfirm
                        title={`你确定要删除计算实例${tag.task_name}吗?`}
                        onConfirm={() => confirmDelete(tag.id)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>删除</Button>
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
                loading={loading}
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
                tenant={appStore.tenant}
                graphs={appStore.graphs}
            >
            </DetailComputing>
        </div>
    )
}
