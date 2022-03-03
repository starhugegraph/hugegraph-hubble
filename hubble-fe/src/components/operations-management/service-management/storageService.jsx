import { Table, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import DetailModal from './storage-detail'
import api from '../../../api/api'

function StorageService() {
    const [dataList, setDataList] = useState({})//数据列表
    const [page, setPage] = useState({})//分页条件
    const [isModalVisible, setIsModalVisible] = useState(false);//详情的显隐 
    const [detailNode, setDetailNode] = useState();//详情node
    const [loading, setLoading] = useState(true)
    // const [query, setSearch] = useState("");//搜索值

    // 获取数据
    useEffect(() => {
        getStorageData()
        return ()=>{
            setDataList({})
            setPage({})
            setIsModalVisible(false)
            setDetailNode(null)
            setLoading(false)
        }
    }, [page])

    // 获取数据
    const getStorageData = () => {
        api.getStorageTableData(page).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setDataList(res.data)
            }
        })
    }

    // 详情
    const detailHandle = (params) => {
        setDetailNode(params.id)
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
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '总空间',
            dataIndex: 'capacity',
            align: 'center',
        },
        {
            title: '占用储存空间',
            dataIndex: 'used',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
            /*  render: (status) => (
                 <Space size="middle">
                     <span>OK</span>
                 </Space>
             ), */
        },
        {
            title: '分片数量',
            dataIndex: 'partitions',
            align: 'center',
            render: (value) => (
                <span>{value.length}</span>
            )
        },
        {
            title: '操作',
            align: 'center',
            fixed: "right",
            render: (tag) => (
                <Button
                    type="primary"
                    onClick={() => detailHandle(tag)}
                >
                    详情
                </Button>
            )
        },
    ];
    return (
        <div className='query_list_container graphData_wrapper'>
            <div className='topDiv'>
            </div>
            <Table
                scroll={{ x: 1200 }}
                loading={loading}
                columns={columns}
                dataSource={dataList.records}
                rowKey={'id'}
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
                node_id={detailNode}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
            </DetailModal>
        </div>
    )
}
export default React.memo(StorageService)