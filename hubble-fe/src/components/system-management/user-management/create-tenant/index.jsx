import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button, Modal, Space, Switch, Select, message } from 'antd';
import api from '../../../../api/api'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
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
    const { visible, setVisible, detailData, getUserData } = props
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
        if (!isDisabled) {
            api.addUser(values).then(res => {
                if (res.status === 200) {
                    getUserData()
                    message.success("创建成功")
                    setVisible(false)
                } else {
                    message.error("创建失败")
                }
            })
        } else {
            api.putUser(detailData.id, values).then(res => {
                if (res.status === 200) {
                    message.success("编辑成功")
                    getUserData()
                } else {
                    message.error("编辑失败")
                }
                setVisible(false)
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
        let res = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)
        if (!res && value != "") {
            return Promise.reject("格式错误,不能包含特殊字符和中文")
        } else {
            return Promise.resolve()
        }
    }
    const passwordValidator = (rule, value) => {
        // let res = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
        // let res = /^(?=.*\d)(?=.*[A-Za-z])[\x20-\x7e]{8,16}$/
        const res = /^[-\w+!@#$%~^&*]{8,16}$/
        if (res.test(value)) {
            return Promise.resolve()
        } else {
            return Promise.reject("格式错误,并且长度为8-16位")
        }
    }
    const phoneValidator = (_, value) => {
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (reg.test(value) || value == "" || value == null) return Promise.resolve()
        return Promise.reject("手机格式错误")
    }
    const urlValidator = (_, value) => {
        let res = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
        if (res || value =="") {
            return Promise.resolve();
        } else if (value.length > 48) {
            return Promise.reject("最长48位")
        } else {
            return Promise.reject("域名格式错误");
        }
    }
    return (
        <Modal
            title={isDisabled ? "编辑" : "创建"}
            closable={false}
            visible={visible}
            footer={null}
            forceRender
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="user_name"
                    label="用户账号"
                    rules={
                        [
                            { required: true, message: "此项为必填项" },
                            { max: 16, message: "字符长度最多16位" },
                            { min: 5, message: "字符长度最少5位" },
                            { validator: serviceValidator }
                        ]
                    }
                >
                    <Input disabled={isDisabled} />
                </Form.Item>

                <Form.Item
                    name="user_password"
                    label="用户密码"
                    rules={
                        [
                            { required: true, message: "此项为必填项" },
                            { validator: passwordValidator }
                        ]
                    }
                >
                    <Input type={'password'} />
                </Form.Item>

                <Form.Item
                    name="user_phone"
                    initialValue={""}
                    label="手机号"
                    rules={
                        [
                            {
                                validator: phoneValidator
                            },
                        ]
                    }
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="user_email"
                    label="邮箱"
                    initialValue={""}
                    rules={[{ validator: urlValidator }]}
                >
                    <Input></Input>
                </Form.Item>

                <Form.Item
                    name="is_superadmin"
                    label="是否为超级管理员"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch defaultChecked={false}></Switch>
                </Form.Item>

                <Form.Item
                    name="is_clusteradmin"
                    label="是否为集群管理员"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch defaultChecked={false}></Switch>
                </Form.Item>

                <Form.Item
                    name="user_description"
                    label="描述"
                    initialValue={""}
                    rules={
                        [
                            { max: 128, message: "最多字符128位" },
                        ]
                    }
                >
                    <Input.TextArea placeholder='用户描述'></Input.TextArea>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
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