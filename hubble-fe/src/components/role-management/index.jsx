import React, { useState, useEffect, useMemo, useContext } from 'react'
import { Input, Button, Table, Space, Popconfirm, message } from 'antd'
import CreatModal from './create-tenant'
import AssociatedModal from './associated-resources'
import AssociatedUser from './associated-user'
import api from '../../api/api'
import './Index.less'
import { AppStoreContext } from '../../stores'

function Index() {
    const [page, setPage] = useState({})//分页条件
    const [listData, setListData] = useState({})//列表数据
    const [detailData, setDetailData] = useState({})//具体项的查询条件
    const [visible, setVisible] = useState(false)//编辑与创建的模态框显隐
    const [visibleAss, setVisibleAss] = useState(false)//关联资源的模态框显隐
    const [visibleUser, setVisibleUser] = useState(false)//关联用户的模态框显隐
    const [groupId_resources, setGroupId_resources] = useState({})//关联查询条件
    const [groupId_user, setGroupId_user] = useState({})//关联查询条件
    const [query, setQuery] = useState("")//搜索值
    const [loading, setLoading] = useState(false)//搜索值
    const appStore = useContext(AppStoreContext)
    useEffect(() => {
        appStore.setMenuObj({
            c_key: "3",
            f_key: "sub1"
        })
        appStore.setCurrentKey("0")
    }, [])
    // 获取数据
    useEffect(() => {
        setLoading(true)
        getRoleData()
    }, [page, query,appStore.tenant])
    // 获取角色数据
    const getRoleData = () => {
        api.getRole(appStore.tenant, { ...page, query }).then(res => {
            setLoading(false)
            if (res && res.status === 200) {
                setListData(res.data)
            }
        })
    }
    // 默认排序
    const reverseDataWithUpdateTime = useMemo(() => {
        if (listData.records) return listData.records.sort((a, b) => +(new Date(b.group_create).getTime()) - +(new Date(a.group_create).getTime()))
        return []
    }, [listData])
    // 创建用户
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
        api.deleteRole(appStore.tenant, value.id).then(res => {
            if (res && res.status === 200) {
                message.success('删除成功');
                getRoleData()
            }
        })
    }
    // 取消删除
    function cancel() {
        message.error('取消删除')
    }
    // 搜索值
    function searchHandle(value) {
        setQuery(value)
    }
    // 关联资源按钮
    function associatedHandle(tag) {
        setGroupId_resources({ group_id: tag.id, group_name: tag.group_name })
        setVisibleAss(true)
    }
    // 关联用户
    function userHandle(tag) {
        setGroupId_user({ group_id: tag.id, group_name: tag.group_name })
        setVisibleUser(true)
    }
    const columns = [
        {
            title: '角色id',
            dataIndex: 'id',
            align: "center"
        },
        {
            title: '角色名称',
            dataIndex: 'group_name',
            align: "center",
        },

        {
            title: '创建人',
            dataIndex: 'group_creator',
            align: "center"
        },
        {
            title: '创建时间',
            dataIndex: 'group_create',
            align: "center"
        },
        {
            title: '更新时间',
            dataIndex: 'group_update',
            align: "center"
        },
        {
            title: '描述',
            dataIndex: 'group_description',
            align: "center"
        },
        {
            title: '操作',
            align: "center",
            width: 400,
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Button onClick={() => changeHandle(tag)}>编辑</Button>
                    <Button onClick={() => associatedHandle(tag)}>关联资源</Button>
                    <Button onClick={() => userHandle(tag)}>关联用户</Button>
                    <Popconfirm
                        title={`你确定要删除角色${tag.group_name}吗?`}
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
        <div className='graphData_wrapper' style={{ width: "100%", height: "calc(100vh - 130px)" }}>
            <div className='topDiv'>
                <Input.Group compact className='inputBox'>
                    <Input.Search allowClear style={{ width: '100%' }} placeholder='角色名称' onSearch={searchHandle} />
                </Input.Group>
                <Button type='primary' className='addBtn' onClick={createHandle}>添加角色</Button>
            </div>
            <Table
                columns={columns}
                dataSource={reverseDataWithUpdateTime}
                rowKey={'id'}
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
            <CreatModal tenant={appStore.tenant} visible={visible} setVisible={setVisible} detailData={detailData} getRoleData={getRoleData}></CreatModal>
            <AssociatedModal visible={visibleAss} setVisible={setVisibleAss} detailData={groupId_resources}></AssociatedModal>
            <AssociatedUser visible={visibleUser} setVisible={setVisibleUser} detailData={groupId_user}></AssociatedUser>
        </div>
    )
}
export default React.memo(Index)
