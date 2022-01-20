import { Modal, Descriptions, Tag, Space } from 'antd';
import React, { useEffect } from 'react'

/* const demoData = {
    "status": 200,
    data: {
        shards: [
            {
                shard_id: "",
                shard_name: "",
                status: "",
            },
        ]
    },
    "message": "msg",
    "cause": ""
} */

const tagStyle = {
    width: "100px",
    height: "25px",
}
const Index = (props) => {
    const { isModalVisible, setIsModalVisible, node } = props

    useEffect(() => {
        if (node) {

        }
    }, [node])

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Modal title="详情"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Descriptions>
                    <Descriptions.Item label="节点名称">{node}</Descriptions.Item>
                    <Descriptions.Item label="状态图例">
                        <Space style={{ display: "flex", flexDirection: "column" }} size={'small'}>
                            <Tag style={tagStyle} color={'#f50'}></Tag>
                            <Tag style={tagStyle} color={'#2db7f5'}></Tag>
                            <Tag style={tagStyle} color={'#87d068'}></Tag>
                            <Tag style={tagStyle} color={'#108ee9'}></Tag>
                        </Space>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
};
export default React.memo(Index)
