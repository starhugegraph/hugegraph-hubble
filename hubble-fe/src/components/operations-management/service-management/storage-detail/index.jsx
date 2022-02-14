import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import api from '../../../../api/api';

const Index = ({ isModalVisible, setIsModalVisible, node_id }) => {
    // const [page, setPage] = useState("")
    const [dataList, setDataList] = useState({})
    const [loading, setLoading] = useState(true)
    // 获取详情数据
    useEffect(() => {
        if (node_id) {
            api.getStorageDetailData(node_id).then(res => {
                res.status === 200 && setDataList(res.data)
                setLoading(false)
            })
        }
    }, [node_id])

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

 /*    // 分页条件
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    } */

    const columns = [
        {
            title: 'Partition_id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: 'Graph_name',
            dataIndex: 'graph_name',
            align: 'center',
        }
        /* {
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
        }, */
    ];

    return (
        <>
            <Modal title="储存服务详情"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Table
                    columns={columns}
                    dataSource={dataList.shards}
                    loading={loading}
                    pagination={
                        {
                            pageSizeOptions: ['4', '6', '8'],
                            defaultPageSize: 6,
                            defaultCurrent: 1,
                            showSizeChanger: true,
                        }
                    }
                    // onChange={pageChange}
                />
            </Modal>
        </>
    );
};
export default React.memo(Index)
