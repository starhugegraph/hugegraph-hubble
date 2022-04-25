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

    useEffect(() => {
        return () => {
            setPage({})
            setListData({})
            setDetailData({})
            setVisible(false)
            setQuery("")
            setLoading(false)
        }
    }, [])

    // 获取租户
    const getGraphspacesData = () => {
        setLoading(true)
        api.getGraphspaces({ ...page, query }).then(res => {
            if (res && res.status === 200) {
                setListData(res.data)
            }
            setLoading(false)
        })
    }

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
                if (value.name === localStorage.getItem("tenant")) localStorage.removeItem("tenant");
                message.success('删除成功');
                setTimeout(() => {
                    window.location.reload()
                }, 700);
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
            width: 150,
            align: "center",
            render: (value) => (<span>{value ? "是" : "否"}</span>)
        },
        {
            title: '描述',
            dataIndex: 'description',
            align: "center",
            width: 150,
            ellipsis: true,
        },
        {
            title: '图服务',
            align: "center",
            width: 190,
            render: (value) => (
                <p style={{ overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {`${value.cpu_limit}核/${value.memory_limit}G/${value.oltp_namespace}`}
                </p>
            ),
            ellipsis: true,

        },
        {
            title: '计算任务',
            align: "center",
            width: 190,
            render: (value) => (
                <p style={{ overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                    {`${value?.compute_cpu_limit}核/${value?.compute_memory_limit}G/${value?.olap_namespace}`}
                </p>
            ),
            ellipsis: true,
        },
        {
            title: '存储服务',
            dataIndex: 'storage_limit',
            align: "center",
            render: (value) => (
                <span>{value}G</span>
            )
        },
        {
            title: '管理员',
            dataIndex: 'graphspace_admin',
            align: "center",
            width: 125,
            render: (value) => (
                <Tooltip title={value?.join(",")}>
                    <span style={{ overflow: 'hidden', whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{value?.join(",")}</span>
                </Tooltip>
            )
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
                        title={`你确定要删除图空间${tag.name}吗?`}
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
                    placeholder='输入图空间关键字'
                >
                    创建图空间
                </InputAdd>
            </div>
            <Table
                columns={columns}
                dataSource={listData.records}
                rowKey={'name'}
                scroll={{ x: 1200 }}
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
