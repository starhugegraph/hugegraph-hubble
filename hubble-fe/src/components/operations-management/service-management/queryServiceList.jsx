import React, { useState, useEffect, useContext } from 'react'
import CreateQuery from './create-query'
import DetailModal from './detail-query'
import { Button, Table, Space, Popconfirm, message, Input } from 'antd'
import api from '../../../api/api'
import { AppStoreContext } from '../../../stores'

export default function QueryServiceList() {
    const [listData, setListData] = useState({})//列表数据
    const [detailData, setDetailData] = useState({})//具体项的查询条件
    const [putDetailData, setPutDetailData] = useState({})//修改项的查询条件
    const [visible, setVisible] = useState(false)//编辑与创建的模态框
    const [visibleDetail, setVisibleDetail] = useState(false)//详情模态框
    const [page, setPage] = useState({})//分页条件
    const [search, setSearch] = useState("")//搜索条件
    const [loading, setLoading] = useState(true)//加载
    let appStore = useContext(AppStoreContext);

    /* // 默认排序
    const reverseDataWithCreateTime = useMemo(() => {
        if (listData.records) return listData.records.sort((a, b) => (+b.create_time.split("/").join("")) - (+a.create_time.split("/").join("")))
        return []
    }, [listData]) */

    useEffect(() => {
        appStore.setMenuObj({
            c_key: "4",
            f_key: "sub2"
        })
        appStore.setCurrentKey("0")
    }, [])
    // 获取数据
    useEffect(() => {
        getQuery()
    }, [page, search, appStore.tenant])

    // 获取list数据
    const getQuery = () => {
        api.getQueryList(appStore.tenant, { query: search, ...page }).then(res => {
            if (res && res.status === 200) {
                setListData(res.data)
                console.log(res.data);
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
                getQuery()
            }
        })
    }
    // 取消删除
    function cancel() {
        message.error('取消删除')
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
            title: '租户',
            dataIndex: 'graphspace',
            align: "center",
        },
        {
            title: '运行方式',
            dataIndex: 'deployment_type',
            align: "center",
            render: (value) => {
                if (value === 'MANUAL') return "手动"
                return "容器"
            }
        },
        {
            title: '就绪',
            align: "center",
            render: (tag) => (<span>{tag.count + "/" + tag.running}</span>)
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
            render: (value) => (<p>{value.map(e => e)}</p>)
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
                    <Button disabled>停止</Button>
                    <Button disabled>启动</Button>
                    <Popconfirm
                        title={`你确定要删除实例${tag.name}吗?`}
                        onConfirm={() => confirm(tag)}
                        onCancel={cancel}
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
                <Input.Group compact className='inputBox'>
                    <Input.Search allowClear style={{ width: '100%' }} placeholder='请输入实例名称' onSearch={(params) => setSearch(params)} />
                </Input.Group>
                <Button onClick={createHandle} type="primary" className='query_list_addButton'>创建服务</Button>
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
