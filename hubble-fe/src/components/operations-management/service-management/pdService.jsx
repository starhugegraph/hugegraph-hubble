import React, { useEffect, useState } from 'react';
import { Table} from 'antd'
import api from '../../../api/api'

function PdService() {
    const [listData, setListData] = useState([])//table数据
    const [loading, setLoading] = useState(true)//table加载
    const [page, setPage] = useState({})//分页条件

    useEffect(() => {
        getPdData()
        return ()=>{
            setListData([])
            setLoading(false)
            setPage({})
        }
    }, [])

    //获取表格数据
    const getPdData = () => {
        api.getPdTableData().then(res => {
            if (res.status === 200) {
                setListData(res.data)
            }
            setLoading(false)
        })
    }

 /*    // 删除
    function confirm(value) {

    } */

    // 分页数据
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    const columns = [
        {
            title: 'IP',
            dataIndex: 'ip',
            align: "center",
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: "center",
        },
        {
            title: '是否为leader',
            dataIndex: 'is_leader',
            align: "center",
            render:(value)=>(
                <span>{value?"是":"否"}</span>
            )
        },
      /*   {
            title: '操作',
            align: "center",
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Popconfirm
                        title={`你确定要删除资源${tag.ip}吗?`}
                        onConfirm={() => confirm(tag)}
                        onCancel={() => message.warning('取消删除')}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        }, */
    ];
    return (<div className='query_list_container graphData_wrapper'>
        <Table
            columns={columns}
            dataSource={listData}
            rowKey={'ip'}
            loading={loading}
            pagination={
                {
                    pageSizeOptions: ['5', '10', '15', '20'],
                    defaultPageSize: 10,
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
