import React, { useState, useEffect, useContext } from 'react'
import CreateQuery from './create-query'
import DetailModal from './detail-query'
import { Button, Table, Space, Popconfirm, message, Tag } from 'antd'
import api from '../../../api/api'
import { AppStoreContext } from '../../../stores'
import { InputAdd } from '../../common'

export default function QueryServiceList() {
    const [listData, setListData] = useState({})//列表数据
    const [detailData, setDetailData] = useState({})//具体项的查询条件
    const [putDetailData, setPutDetailData] = useState({})//修改项的查询条件
    const [visible, setVisible] = useState(false)//编辑与创建的模态框
    const [visibleDetail, setVisibleDetail] = useState(false)//详情模态框
    const [page, setPage] = useState({})//分页条件
    const [search, setSearch] = useState("")//搜索条件
    const [loading, setLoading] = useState(false)//加载
    let appStore = useContext(AppStoreContext);

    // 获取数据
    useEffect(() => {
        getQuery()
    }, [page, search, appStore.tenant])

    useEffect(() => {
        return () => {
            setListData({});
            setDetailData({});
            setPutDetailData({});
            setVisible(false);
            setVisibleDetail(false);
            setPage({});
            setSearch("");
            setLoading(false);
        }
    }, [])
    // 获取list数据
    const getQuery = () => {
        setLoading(true)
        api.getQueryList(appStore.tenant, { query: search, ...page }).then(res => {
            if (res && res.status === 200) {
                setListData(res.data)
            }
            setLoading(false)
        })
    }

    // 创建按钮
    const createHandle = () => {
        setPutDetailData({})
        setVisible(true)
    }
    // 编辑按钮
    const changeHandle = (value) => {
        setPutDetailData({ graphspace: value.graphspace, name: value.name })
        setVisible(true)
    }
    // 详情按钮
    const detailHandle = (value) => {
        setDetailData({ graphspace: value.graphspace, name: value.name })
        setVisibleDetail(true)
    }
    // 删除
    function confirm(value) {
        api.deleteQuery(appStore.tenant, value.name).then(res => {
            if (res && res.status === 200) {
                message.success("删除成功")
            }
            getQuery()
        })
    }
    // 分页数据
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    const columns = [
        {
            title: '实例名称',
            dataIndex: 'name',
            align: "center",
            fixed: "left"
        },
        {
            title: '运行方式',
            dataIndex: 'deployment_type',
            align: "center",
            render: (value) => {
                if (value === 'MANUAL') return "手动";
                return "容器";
            }
        },
        {
            title: '运行节点',
            align: "center",
            render: (tag) => {
                if (tag.deployment_type === 'MANUAL'){
                    return <Tag color="success">{tag.running}</Tag>
                }
                return <span>{tag.count}&nbsp;/&nbsp;<span style={{color:"#7cb305"}}>{tag.running}</span></span>
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            align: "center"
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            align: "center"
        },
        {
            title: '访问地址',
            dataIndex: 'urls',
            align: "center",
            width: 250,
            render: (value) => (<p>{value.map(e => e + " ")}</p>)
        },
        {
            title: '操作',
            key: 'action',
            align: "center",
            width: 450,
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Button onClick={() => detailHandle(tag)}>详情</Button>
                    <Button onClick={() => changeHandle(tag)}>编辑</Button>
                    <Popconfirm
                        title={`确定要停止${tag.name}服务吗？`}
                        onConfirm={() => api.queryEnd(appStore.tenant, tag.name).then(res => {
                            if (res.status === 200) {
                                message.success(`停止${tag.name}成功`)
                            }
                            getQuery()
                        })}
                        okText="确定"
                        cancelText="取消"
                        disabled={(tag.deployment_type === 'MANUAL') || tag.running <= 0}
                    >
                        <Button
                            disabled={(tag.deployment_type === 'MANUAL') || tag.running <= 0}
                        >
                            停止
                        </Button>
                    </Popconfirm>

                    <Popconfirm
                        title={`确定要启动${tag.name}服务吗？`}
                        onConfirm={() => api.queryStart(appStore.tenant, tag.name).then(res => {
                            if (res.status === 200) {
                                message.success(`启动${tag.name}成功`)
                            }
                            getQuery()
                        })}
                        okText="确定"
                        cancelText="取消"
                        disabled={(tag.deployment_type === 'MANUAL') || tag.running > 0}
                    >
                        <Button
                            disabled={(tag.deployment_type === 'MANUAL') || tag.running > 0}
                        >
                            启动
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title={`你确定要删除实例${tag.name}吗?`}
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
        <div className='query_list_container graphData_wrapper'>
            <div className='topDiv'>
                <InputAdd
                    setSearch={setSearch}
                    createHandle={createHandle}
                    placeholder='请输入服务实例关键字'
                >
                    创建服务
                </InputAdd>
            </div>
            <Table
                columns={columns}
                dataSource={listData.records}
                loading={loading}
                rowKey={'name'}
                scroll={{ x: 1500 }}
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
            <CreateQuery
                getQuery={getQuery}
                detailData={putDetailData}
                visible={visible}
                setVisible={setVisible}
            ></CreateQuery>
            <DetailModal
                visibleDetail={visibleDetail}
                setVisibleDetail={setVisibleDetail}
                detailData={detailData}
                tenant={appStore.tenant}
            ></DetailModal>
        </div>
    )
}
