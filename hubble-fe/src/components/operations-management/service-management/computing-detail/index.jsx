import React, { useEffect, useState } from 'react'
import { Modal, Descriptions, Badge, Skeleton } from 'antd';
import api from '../../../../api/api'
import { timestampToTime } from '../../../../stores/utils';

const Index = ({ isModalVisible, setIsModalVisible, detail, tenant, graphs }) => {
    const [computedDetail, setDetail] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        detail && api.getComputeDetail(tenant, graphs, detail).then(res => {
            if (res.status === 200) setDetail(res.data)
            setLoading(false)
        })
        return () => {
            setLoading(false)
        }
    }, [detail])

    return (
        <>
            <Modal
                title="计算服务详情"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}>
                <Skeleton loading={loading} active>
                    <Descriptions
                        bordered
                        column={1}
                        contentStyle={{ padding: '10px' }}
                    >
                        <Descriptions.Item label="实例名称">{computedDetail.task_name}</Descriptions.Item>
                        <Descriptions.Item label="状态" span={0}>{computedDetail.task_status} </Descriptions.Item>
                        <Descriptions.Item label="创建时间">{timestampToTime(computedDetail.task_create)}</Descriptions.Item>
                        <Descriptions.Item label="运行参数">{computedDetail.task_input}</Descriptions.Item>
                    </Descriptions>
                </Skeleton>
            </Modal>
        </>
    );
};
export default React.memo(Index)
