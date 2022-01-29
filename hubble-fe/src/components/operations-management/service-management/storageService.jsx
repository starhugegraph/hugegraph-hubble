import { Table, Space, Button, Input } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import DetailModal from './storage-detail'
import { AppStoreContext } from '../../../stores';
import api from '../../../api/api'
let demoData = {
    "status": 200,
    data: {
        records: [
            {
                "node_id": "模拟数据",
                "node_capacity": "1000G",
                "node_used": "10G",
                "node_status": "",
                "node_partitions": "10",
            },
        ],
        total: 2,
        size: 10,
        current: 1,
        orders: [],
        searchCount: true,
        pages: 1
    },
    "message": "msg",
    "cause": ""
}

function StorageService() {
    const [dataList, setDataList] = useState({})//数据列表
    const [page, setPage] = useState({})//分页条件
    const [isModalVisible, setIsModalVisible] = useState(false);//详情的显隐 
    const [detailNode, setDetailNode] = useState();//详情node
    const [query, setSearch] = useState("");//搜索值
    const appStore = useContext(AppStoreContext)
    // 设置当前展开
    useEffect(() => {
        appStore.setMenuObj({
            c_key: "4",
            f_key: "sub2"
        })
        appStore.setCurrentKey("1")
    }, [])

    // 获取数据
    useEffect(() => {
        setDataList(demoData.data)
        api.getStorageTableData(appStore.tenant, page).then(res => {
            if(res.status===200){
                console.log(res, "storage");
            }
        })
    }, [appStore.tenant, page])

    // 详情
    const detailHandle = (params) => {
        setDetailNode(params.node_id)
        setIsModalVisible(true)
    }
    // 分页条件
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    /* // 创建
    const createHandle = () => {

    } */

    const columns = [
        {
            title: '节点名称',
            dataIndex: 'node_id',
            align: 'center'
        },
        {
            title: '总空间',
            dataIndex: 'node_capacity',
            align: 'center',
        },
        {
            title: '占用储存空间',
            dataIndex: 'node_used',
            align: 'center',
        },
        {
            title: '状态',
            align: 'center',
            dataIndex: 'node_status',
            render: (status) => (
                <Space size="middle">
                    <span>OK</span>
                </Space>
            ),
        },
        {
            title: '分片数量',
            dataIndex: 'node_partitions',
            align: 'center',
        },
        {
            title: '操作',
            align: 'center',
            fixed: "right",
            render: (tag) => [
                <Button
                    type="primary"
                    onClick={() => detailHandle(tag)}
                >
                    详情
                </Button>
            ]
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
                    创建储存服务
                </Button> */}
            </div>
            <Table
                scroll={{ x: 1200 }}
                columns={columns}
                dataSource={dataList.records}
                rowKey={'node_id'}
                pagination={
                    {
                        pageSizeOptions: ['5', '10', '15', '20'],
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: dataList.total
                    }
                }
                onChange={pageChange}
            />
            <DetailModal
                node={detailNode}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
            </DetailModal>
        </div>
    )
}
export default React.memo(StorageService)