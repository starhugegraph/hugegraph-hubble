import React, { useEffect, useContext, useState } from 'react';
import { AppStoreContext } from '../../../stores';
import { Table, Button, Space, message, Popconfirm, Tooltip } from 'antd'


function PdService() {
    const appStore = useContext(AppStoreContext)
    const [loading, setLoading] = useState(false)//table加载
    const [page, setPage] = useState({})//分页条件

    useEffect(() => {
        appStore.setMenuObj({
            c_key: "4",
            f_key: "sub2"
        })
        appStore.setCurrentKey("3")
    }, [])

    // 删除
    function confirm(value) {

    }

    // 分页数据
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    const columns = [
        {
            title: 'IP',
            dataIndex: 'graph',
            align: "center",
        },
        {
            title: '状态',
            dataIndex: 'target_id',
            align: "center",
        },
        {
            title: '角色',
            dataIndex: 'target_name',
            align: "center",
        },
        {
            title: '操作',
            align: "center",
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Popconfirm
                        title={`你确定要删除资源${tag.graph}吗?`}
                        onConfirm={() => confirm(tag)}
                        onCancel={() => message.warning('取消删除')}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (<div className='query_list_container graphData_wrapper'>
        <Table
            columns={columns}
            // dataSource={listData.data}
            rowKey={'target_id'}
            loading={loading}
            pagination={
                {
                    pageSizeOptions: ['5', '10', '15', '20'],
                    defaultPageSize: 4,
                    defaultCurrent: 1,
                    showSizeChanger: true
                }
            }
            onChange={pageChange}
        >
        </Table>
    </div>);
}
export default React.memo(PdService)
