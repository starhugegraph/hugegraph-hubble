import { Modal } from 'antd';
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
            <Modal title="详情" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>

            </Modal>
        </>
    );
};
export default React.memo(Index)
