import { Table, Button, Space, Popconfirm, Tag, Spin, message } from 'antd';
import { SlidersTwoTone, ApiTwoTone, BuildTwoTone } from '@ant-design/icons'
import React, { useEffect, useMemo, useState } from 'react'
import DetailModal from './storage-detail'
import StorageSecondModal from './storage-secondModal';
import api from '../../../api/api'
import { useTranslation } from 'react-i18next'
import { useInterval } from '../../../hooks'

function StorageService() {
    const [dataList, setDataList] = useState({})//数据列表
    const [page, setPage] = useState({})//分页条件
    const [isModalVisible, setIsModalVisible] = useState(false);//详情的显隐 
    const [secondModal, setSecondModal] = useState(false);//弹窗的显隐 
    const [detailNode, setDetailNode] = useState("");//详情node
    const [loading, setLoading] = useState(false)//加载
    const [splitLoading, setSplitLoading] = useState(false)//分裂加载
    const [checkData, setCheckData] = useState([])
    const [rowKeys, setRowKeys] = useState([])
    const [clusterState, setClusterState] = useState("")
    const { t } = useTranslation()
    // const [query, setSearch] = useState("");//搜索值

    // 获取数据
    useEffect(() => {
        getStorageData()
    }, [page])

    // 集群状态
    const getClusterState = () => {
        api.StorageCluster().then(res => {
            if (res.status === 200) {
                if (res.data.status !== clusterState) {
                    setClusterState(res.data.status);
                }
            }
        })
    }

    // 获取数据
    const getStorageData = () => {
        setRowKeys([])
        setCheckData([])
        setLoading(true)
        api.getStorageTableData(page).then(res => {
            setLoading(false)
            if (res.status === 200) {
                setDataList(res.data)
            }
        })
    }

    useInterval(() => {
        getClusterState()
    }, 2000)

    // 重置
    useEffect(() => {
        getClusterState()
        return () => {
            setDataList({})
            setPage({})
            setIsModalVisible(false)
            setDetailNode("")
            setLoading(false)
            setCheckData([])
            setRowKeys([])
            setClusterState("")
        }
    }, [])


    // 详情
    const detailHandle = (params) => {
        setDetailNode(params.id)
        setIsModalVisible(true)
    }
    // 分页条件
    const pageChange = (params) => {
        setPage({ page_no: params.current, page_size: params.pageSize })
    }

    // 多选框
    const rowSelection = {
        onChange: (rowKeys, selectedRows) => {
            setRowKeys(rowKeys)
            if (selectedRows.length) {
                setCheckData(selectedRows.map(item => ({ id: item.id, state: item.state })));
            } else {
                setCheckData([])
            }
        },
        getCheckboxProps: (record) => ({
            name: record.name,
        }),
        selectedRowKeys: rowKeys,
        columnWidth: "100px",
        fixed: "left"
    };

    const memoCallBack = (params) => {
        if (checkData.length === 0) return true;
        let res = checkData.every(item => item.state === params)
        if (res && clusterState === "Cluster_OK") {
            return false;
        }
        return true
    }
    // 计算是否禁用上线
    const isDisableOn = useMemo(() => memoCallBack("Tombstone"), [checkData, clusterState])
    // 计算是否禁用下线
    const isDisableOff = useMemo(() => memoCallBack("Up"), [checkData, clusterState])

    // 数据分裂
    const dataFar = () => {
        setSplitLoading(true)
        api.StorageClusterSplit().then(res => {
            setSplitLoading(false)
            if (res.status === 200) {
                message.success("操作成功!")
            }
            getStorageData()
        })
    }
    // 列表项
    const columns = [
        {
            title: '节点名称',
            dataIndex: 'id',
            width: 250,
            align: 'center'
        },
        {
            title: '总空间',
            dataIndex: 'capacity',
            align: 'center',
        },
        {
            title: '占用储存空间',
            dataIndex: 'used',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
        },
        {
            title: '分片数量',
            dataIndex: 'partitions',
            align: 'center',
            render: (value) => (
                <span>{value.length}</span>
            )
        },
        {
            title: '操作',
            align: 'center',
            fixed: "right",
            render: (tag) => (
                <Button
                    type="primary"
                    onClick={() => detailHandle(tag)}
                >
                    详情
                </Button>
            )
        },
    ];
    return (
        <div className='query_list_container graphData_wrapper'>
            <div className='topDiv' style={{ justifyContent: "space-between", color: "#08979c" }}>
                <Space>
                    <span>储存集群状态:</span>
                    {clusterState ? <Tag color={t(`clusterColor.${clusterState}`)}>
                        {t(`clusterState.${clusterState}`)}
                    </Tag> : <Spin size="small" />}
                    <Popconfirm
                        title="确认进行数据分裂吗?"
                        onConfirm={dataFar}
                        disabled={clusterState !== "Cluster_OK"}
                    >
                        <Button
                            disabled={clusterState !== "Cluster_OK"}
                            icon={<BuildTwoTone />}
                            loading={splitLoading}
                        >
                            数据分裂
                        </Button>
                    </Popconfirm>
                </Space>
                <Space className='outLineBox'>
                    <Button
                        disabled={isDisableOn}
                        icon={<SlidersTwoTone />}
                    >
                        上线
                    </Button>
                    <Button
                        disabled={isDisableOff}
                        onClick={() => setSecondModal(true)}
                        icon={<ApiTwoTone />}
                    >
                        下线
                    </Button>
                </Space>
            </div>
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                scroll={{ x: 1000 }}
                loading={loading}
                columns={columns}
                dataSource={dataList.records}
                rowKey={'id'}
                pagination={
                    {
                        pageSizeOptions: ['5', '10', '15', '20'],
                        defaultPageSize: 10,
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        total: dataList.total
                    }
                }
                onChange={pageChange}
            />
            <DetailModal
                node_id={detailNode}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            >
            </DetailModal>
            <StorageSecondModal
                isModalVisible={secondModal}
                setIsModalVisible={setSecondModal}
                data={checkData}
                getStorageData={getStorageData}
            >
            </StorageSecondModal>
        </div>
    )
}
export default React.memo(StorageService)