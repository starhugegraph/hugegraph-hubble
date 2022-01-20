import React, { useEffect, useMemo,useState,useContext} from 'react'
import { Form, Input, Button, Modal, Space, Select, message } from 'antd';
import api from '../../../api/api'
import { AppStoreContext } from '../../../stores';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Index = (props) => {
    const [form] = Form.useForm();
    const { visible, setVisible, detailData,getRoleData} = props
    const [loading,setLoading]= useState(false)
    const appStore = useContext(AppStoreContext)
    // 是否禁用
    const isDisabled = useMemo(() => {
        if (Object.keys(detailData).length !== 0) return true
        return false
    }, [detailData])
    // 是否回显
    useEffect(() => {
        if (isDisabled) {
            form.setFieldsValue(detailData)
        } else {
            form.resetFields()
        }
    }, [detailData])
    // 完成提交
    const onFinish = (values) => {
        setLoading(true)
        if(isDisabled){
            api.putRole(appStore.tenant,detailData.id,values).then(res=>{
                if(res&&res.status===200){
                    message.success("编辑成功")
                    setVisible(false)
                    getRoleData()
                }
                setLoading(false)
            })
        }else{
            api.addRole(appStore.tenant,values).then(res=>{
                if(res&&res.status===200){
                    message.success("添加成功")
                    setVisible(false)
                    getRoleData()
                }
                setLoading(false)
            })
        }
        form.resetFields()
    };
    // 取消
    const onReset = () => {
        setVisible(false)
    };
    // 验证
    const serviceValidator = (rule, value) => {
        let res = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)
        if (!res) {
            return Promise.reject("格式错误,只包含中英文,下划线,不能以下划线结尾")
        } else {
            return Promise.resolve()
        }
    }
    return (
        <Modal
            title={Object.keys(detailData).length === 0 ? "创建" : "查询"}
            closable={false}
            visible={visible}
            footer={null}
            forceRender
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                {detailData.id ? <Form.Item label="角色id" name="id">
                    <Input disabled={isDisabled} style={{ width: "100px" }} />
                </Form.Item> : null}

                <Form.Item
                    name="group_name"
                    label="角色名称"
                    rules={
                        [
                            { required: true, message: "此项为必填项" },
                            { max: 48, message: "字符长度最多48位" },
                            { validator: serviceValidator }
                        ]
                    }
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="group_description"
                    label="描述"
                    initialValue={""}
                    rules={
                        [
                            { max: 128, message: "最多字符128位" },
                        ]
                    }
                >
                    <Input.TextArea placeholder='角色描述，可填'></Input.TextArea>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            {Object.keys(detailData).length === 0 ? "创建" : "保存"}
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            取消
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default React.memo(Index)