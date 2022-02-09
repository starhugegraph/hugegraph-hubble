import { Modal, Descriptions, Badge } from 'antd';
import React from 'react'

const Index = (props) => {
    const { isModalVisible, setIsModalVisible } = props

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <Modal
                title="计算服务详情"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}>
                <Descriptions bordered>
                    <Descriptions.Item label="算法名称"></Descriptions.Item>
                    <Descriptions.Item label="图空间"></Descriptions.Item>
                    <Descriptions.Item label="实例名称"></Descriptions.Item>
                    <Descriptions.Item label="状态" span={3}>
                        <Badge status="processing" text="Running" />
                    </Descriptions.Item>
                    <Descriptions.Item label="创建时间"></Descriptions.Item>
                    <Descriptions.Item label="运行参数"></Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};
export default React.memo(Index)
