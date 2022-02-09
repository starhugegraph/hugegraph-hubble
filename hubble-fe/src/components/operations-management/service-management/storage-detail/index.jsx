import { Modal, Table } from 'antd';
import React, { useEffect,useState} from 'react'

const Index = (props) => {
    const { isModalVisible, setIsModalVisible, node } = props
    const [page,setPage] = useState("")
    const [dataList,setDataList] = useState({})
    // 获取详情数据
    useEffect(() => {
        if (node) {

        }
    }, [node])

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 分页条件
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    const columns = [
        {
            title: 'Partition_id',
            dataIndex: 'partiton_id',
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
                    // dataSource={dataList.shards}
                    rowKey={'partiton_id'}
                    pagination={
                        {
                            pageSizeOptions: ['2', '4', '6'],
                            defaultPageSize: 10,
                            defaultCurrent: 1,
                            showSizeChanger: true,
                            // total: dataList.total
                        }
                    }
                    onChange={pageChange}
                />
            </Modal>
        </>
    );
};
export default React.memo(Index)
