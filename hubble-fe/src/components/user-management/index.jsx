import React, { useState, useEffect, useContext } from 'react'
import { Button, Table, Space, Popconfirm, message, Tooltip } from 'antd'
import CreatModal from './user-modal'
import { InputAdd } from '../common'
import api from '../../api/api'
import './Index.less'
import { AppStoreContext } from '../../stores'

let textStyle = {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "250px",
}
export default function Index() {
    const [page, setPage] = useState(null)//分页条件
    const [listData, setListData] = useState({})//列表数据
    const [detailData, setDetailData] = useState({})//具体项的查询条件
    const [visible, setVisible] = useState(false)//编辑与创建的模态框
    const [query, setQuery] = useState("")//搜索值
    const [loading, setLoading] = useState(true)//table加载
    const appStore = useContext(AppStoreContext)

    // 获取数据
    useEffect(() => {
        getUserData()
        return () => {
            setListData({})
        }
    }, [page, query, appStore.tenant])
    // 获取用户数据
    const getUserData = () => {
        api.getAuthUser(appStore.tenant, { ...page, query }).then(res => {
            setLoading(false)
            if (res && res.status === 200) {
                setListData(res.data)
            }
        })
    }

    // 默认排序
    /*     const reverseDataWithUpdateTime = useMemo(() => {
            // if (listData.records) return listData.records.sort((a, b) => (+b.create_time.split("/").join("")) - (+a.create_time.split("/").join("")))
            return []
        }, [listData]) */

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
        let groups = value.groups.map(item => (item.group_id + " " + item.group_name))
        setDetailData({ ...value, groups })
        setVisible(true)
    }
    // 删除
    function confirm(value) {
        api.deleteAuthUser(appStore.tenant, value.user_id).then(res => {
            if (res && res.status === 200) {
                message.success("删除成功")
                getUserData()
            }
        })
    }
    const columns = [
        {
            title: '用户账号',
            dataIndex: 'user_name',
            align: "center"
        },
        {
            title: '角色',
            dataIndex: 'groups',
            align: "center",
            width: 250,
            render: (array) => (
                <Tooltip title={array.map(item => item.group_name + '、')}>
                    <p style={textStyle}>{array.map(item => item.group_name + " ")}</p>
                </Tooltip>
            )
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            align: "center"
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            align: "center"
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
                        title={`你确定要删除用户账号${tag.user_name}吗?`}
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
                    placeholder='请输入用户关键字'
                    >
                    创建用户
                </InputAdd>
            </div>
            <Table
                columns={columns}
                dataSource={listData.records}
                loading={loading}
                rowKey={'user_id'}
                scroll={{ x: 1200 }}
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
            <CreatModal visible={visible} getUserData={getUserData} setVisible={setVisible} detailData={detailData}></CreatModal>
        </div>
    )
}
React.memo(Index)
