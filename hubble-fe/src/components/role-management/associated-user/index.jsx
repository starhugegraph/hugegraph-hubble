import React, { useEffect, useState, useContext } from 'react'
import { Modal, Table, Button, Space, message, Popconfirm } from 'antd'
import api from '../../../api/api'
import SecondModal from './second-window'
import { AppStoreContext } from '../../../stores'

/* let textStyle = {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "150px"
} */
function Index(props) {
    const { visible, setVisible, detailData } = props
    const [listData, setListData] = useState({})//列表数据
    const [page, setPage] = useState({})//分页条件
    const [visibleCreate, setVisibleCreate] = useState(false)//二级模态框
    const [needDeleteIds, setNeedDeleteIds] = useState([])//需要删除的Id数组
    const [loading, setLoading] = useState(false)//table加载
    const appStore = useContext(AppStoreContext)

    // 获取数据
    useEffect(() => {
        if (detailData.group_id) {
            getAssUserData()
        }
    }, [detailData, page])

    useEffect(() => {
        return () => {
            setListData({})
            setPage({})
            setVisibleCreate(false)
            setNeedDeleteIds([])
            setLoading(false)
        }
    }, [])
    // 获取关联用户
    const getAssUserData = () => {
        setLoading(true)
        api.lookAssUsers(appStore.tenant, { group_id: detailData.group_id }).then(res => {
            if (res && res.status === 200) {
                setListData(res.data)
            }
            setLoading(false)
        })
    }
    // 删除
    function confirm(value) {
        api.deleteAssUser(appStore.tenant, value.id).then(res => {
            if (res && res.status === 200) {
                message.success('删除成功');
            }
            getAssUserData()
            setVisible(false)
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
    // 新增关联资源
    const createHandle = () => {
        setVisibleCreate(true)
    }
    // 选择的用户ID
    const chooseRow = (params) => {
        setNeedDeleteIds(params)
    }
    // 批量删除
    const deleteHandle = () => {
        if (needDeleteIds.length !== 0) {
            api.deleteAssUserArray(appStore.tenant, { ids: needDeleteIds }).then(res => {
                if (res && res.status === 200) {
                    message.success("删除成功")
                }
                getAssUserData()
            })
        } else {
            message.error("没有选中任何关联用户")
        }
    }

    const columns = [
        {
            title: '用户',
            dataIndex: 'user_name',
            align: "center",
            width: 150,
            /*             render: (array) => (
                            <Tooltip title={array.map(item => item + ' ')} style={{ textAlign: "center", width: "100%" }}>
                                <p style={textStyle}>{array.map(item => item + " ")}</p>
                            </Tooltip>
                        ) */
        },
        {
            title: '操作',
            align: "center",
            fixed: "right",
            render: (tag) => (
                <Space size="middle">
                    <Popconfirm
                        title={`你确定要删除关联用户${tag.user_name}吗?`}
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
        <Modal
            title="关联"
            visible={visible}
            footer={null}
            forceRender
            onCancel={() => setVisible(false)}
            width={"700px"}
        >
            <span>角色名称：</span>{detailData.group_name}
            <Table
                columns={columns}
                dataSource={listData.records}
                rowSelection={{ onChange: chooseRow }}
                rowKey={'id'}
                loading={loading}
                pagination={
                    {
                        pageSizeOptions: ['2', '4', '6'],
                        defaultPageSize: 4,
                        defaultCurrent: 1,
                        showSizeChanger: true
                    }
                }
                onChange={pageChange}
            >
            </Table>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Space>
                    <Button type="primary" onClick={createHandle}>新增</Button>
                    <Popconfirm
                        title="你确定删除选中的关联用户吗?"
                        onConfirm={deleteHandle}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button>删除</Button>
                    </Popconfirm>
                </Space>
            </div>
            <SecondModal
                visible={visibleCreate}
                getAssUserData={getAssUserData}
                setVisible={setVisibleCreate}
                detailData={detailData}
                listData={listData.records}
            >
            </SecondModal>
        </Modal>
    )
}
export default React.memo(Index)