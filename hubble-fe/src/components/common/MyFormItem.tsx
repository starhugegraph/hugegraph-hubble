import React from 'react'
import { Form, Space } from 'antd'

type Props = {
    label: string
}

const MyFormItem: React.FC<Props> = ({ label, children }) => {
    return (
        <Form.Item label={label} required>
            <Space>
                {children}
                <span className='spanFontSize'>G</span>
            </Space>
        </Form.Item>
    )
}
export default React.memo(MyFormItem)