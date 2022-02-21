import React, { useEffect, useState, useContext } from 'react'
import { Modal, Table, Button, Space, message, Popconfirm } from 'antd'
import SecondModal from './second-window'
import api from '../../../api/api'
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
    const [loading, setLoading] = useState(false)//table加载
    const [targetDetail, setTargetDetail] = useState("")
    const appStore = useContext(AppStoreContext)
    // 获取数据
    useEffect(() => {
        if (detailData.group_id) {
            setLoading(true)
            getAssData()
        }
    }, [detailData, page])
    // 获取关联数据
    const getAssData = () => {
        api.lookAssResources(appStore.tenant, { group_id: detailData.group_id, ...page }).then(res => {
            if (res && res.status === 200) {
                setListData(res)
                setLoading(false)
            }
        })
    }
    // 编辑按钮
    const changeHandle = (value) => {
        setTargetDetail(value)
        setVisibleCreate(true)
    }
    // 删除
    function confirm(value) {
        api.deleteAssResources(appStore.tenant, value).then(res => {
            if (res && res.status === 200) {
                message.success('删除成功');
                getAssData()
            }
        })
    }
    // 取消删除
    function cancel() {
        message.warning('取消删除')
    }
    // 分页数据
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }
    // 新增关联资源
    const createHandle = () => {
        setTargetDetail(false)
        setVisibleCreate(true)
    }
    const columns = [
        {
            title: '图名称',
            dataIndex: 'graph',
            align: "center",
        },
        {
            title: '资源ID',
            dataIndex: 'target_id',
            align: "center",
            /*  render: (array) => (
                 <Tooltip title={array.map(item => item + ' ')}>
                     <p style={textStyle}>{array.map(item => item + " ")}</p>
                 </Tooltip>
             ) */
        },
        {
            title: '资源名',
            dataIndex: 'target_name',
            align: "center",
            /*  render: (array) => (
                 <Tooltip title={array.map(item => item + ' ')}>
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
                    <Button onClick={() => changeHandle(tag)}>编辑</Button>
                    <Popconfirm
                        title={`你确定要删除资源${tag.graph}吗?`}
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
            closable={false}
            footer={null}
            forceRender
            onCancel={() => setVisible(false)}
            width={"700px"}
        >
            <span>角色名称：</span>{detailData.group_name}
            <Table
                columns={columns}
                dataSource={listData.data}
                rowKey={'target_id'}
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
                    <Button onClick={() => setVisible(false)}>取消</Button>
                </Space>
            </div>
            <SecondModal getAssData={getAssData} visible={visibleCreate} setVisible={setVisibleCreate} detailData={detailData} targetDetail={targetDetail}></SecondModal>
        </Modal>
    )
}
export default React.memo(Index)