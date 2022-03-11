import { message, Modal, Table } from 'antd';
import React, { useMemo, useState } from 'react'
import api from '../../../../api/api';

const Index = ({ isModalVisible, setIsModalVisible, data, getStorageData }) => {
    const [loading, setLoading] = useState(false)

    // 确认下线还是上线
    const isOnOrOff = useMemo(() => {
        if (data.length) {
            if (data[0].state === "Up") return "下线";
            else return "上线";
        }
    }, [data])

    const handleOk = () => {
        setLoading(true)
        let idArray = {nodes:data.map(item => item.id)}
        const thenCallback = (res) => {
            setLoading(false)
            if (res.status === 200) {
                message.success(isOnOrOff + "成功")
            }
            getStorageData()
            setIsModalVisible(false)
        }
        if (isOnOrOff === "下线") {
            api.StorageOutline(idArray).then(thenCallback)
        } else {
            api.StorageLine(idArray).then(thenCallback)
        }
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            align: 'center'
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
        }
    ];

    return data.length ? (
        <>
            <Modal title={`确定对如下节点进行${isOnOrOff}操作？`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                okType={"danger"}
                confirmLoading={loading}
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    pagination={false}
                />
            </Modal>
        </>
    ) : null;
};
export default React.memo(Index)
