import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Button, Table, Space, Popconfirm, message, Tooltip } from 'antd'
import api from '../../../api/api'
import CreatModal from './create-tenant'
import { InputAdd } from '../../common'
import './Index.less'

function Index() {
    const [page, setPage] = useState({})//分页条件
    const [listData, setListData] = useState({})//列表数据
    const [detailData, setDetailData] = useState({})//具体项的查询条件
    const [visible, setVisible] = useState(false)//编辑与创建的模态框
    const [query, setQuery] = useState("")//搜索
    const [loading, setLoading] = useState(false)//搜索

    // 获取数据
    useEffect(() => {
        getGraphspacesData()
    }, [page, query])
    // 获取租户
    const getGraphspacesData = () => {
        setLoading(true)
        api.getGraphspaces({ ...page, query }).then(res => {
            if (res && res.status === 200) {
                console.log(res.data, "tenant");
                setListData(res.data)
            }
            setLoading(false)
        })
    }
    /*     // 默认排序
        const reverseDataWithUpdateTime = useMemo(() => {
            if (listData.records) return listData.records.sort((a, b) => (+b.update_time.split("/").join("")) - (+a.update_time.split("/").join("")))
            return []
        }, [listData]) */

    // 创建租户
    const createHandle = () => {
        setDetailData({})
        setVisible(true)
    }
    // 分页数据
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }
    // 编辑按钮
    const changeHandle = (value) => {
        setDetailData(value)
        setVisible(true)
    }
    // 删除
    function confirm(value) {
        api.deleteGraphspaces(value.name).then(res => {
            if (res && res.status === 200) {
                message.success('删除成功');
                setTimeout(() => {
                    window.location.reload()
                }, 500);
            }
        })
    }
    const columns = [
        {
            title: '名称',
            dataIndex: 'name',
            align: "center",
            fixed: "left"
        },
        {
            title: '是否开启鉴权',
            dataIndex: 'auth',
            align: "center",
            render: (value) => (<span>{value ? "是" : "否"}</span>)
        },
        {
            title: '描述',
            dataIndex: 'description',
            align: "center",
            width: 150,
            render: (value) => (
                <Tooltip title={value}>
                    <p style={{ overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{value}</p>
                </Tooltip>
            )
        },
        {
            title: '计算资源',
            dataIndex: 'cpu_limit',
            align: "center",
        },
        {
            title: '储存资源',
            dataIndex: 'storage_limit',
            align: "center",
        },
        {
            title: '内存资源',
            dataIndex: 'memory_limit',
            align: "center",
        },
        {
            title: '算法绑定名字空间',
            dataIndex: 'olap_namespace',
            align: "center",
            width: 150
        },
        {
            title: '服务绑定名字空间',
            dataIndex: 'oltp_namespace',
            align: "center",
            width: 150
        },
        {
            title: '储存绑定名字空间',
            dataIndex: 'storage_namespace',
            align: "center",
            width: 150
        },
        {
            title: '操作',
            align: "center",
            width: 200,
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Button onClick={() => changeHandle(tag)}>编辑</Button>
                    <Popconfirm
                        title={`你确定要删除租户账号${tag.name}吗?`}
                        onConfirm={() => confirm(tag)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type='ghost' danger>删除</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <div className='graphData_wrapper' style={{ width: "100%", height: "calc(100vh - 130px)" }}>
            <div className='topDiv'>
                <InputAdd
                    setSearch={setQuery}
                    createHandle={createHandle}
                    placeholder='输入租户关键字'
                >
                    创建租户
                </InputAdd>
            </div>
            <Table
                columns={columns}
                dataSource={listData.records}
                rowKey={'name'}
                scroll={{ x: 1700 }}
                loading={loading}
                pagination={
                    {
                        pageSizeOptions: ['5', '10', '15', '20'],
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: listData.total
                    }
                }
                onChange={pageChange}
            />
            <CreatModal
                getGraphspaces={getGraphspacesData}
                visible={visible}
                setVisible={setVisible}
                detailData={detailData}
            >
            </CreatModal>
        </div>
    )
}
export default React.memo(Index)
