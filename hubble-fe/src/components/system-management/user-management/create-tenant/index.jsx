import React, { useEffect, useMemo } from 'react'
import { Form, Input, Button, Modal, Space, Switch, message } from 'antd';
import api from '../../../../api/api'
import { useLocation } from 'wouter';
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
const Index = ({ visible, setVisible, detailData, getUserData }) => {
    const [form] = Form.useForm();
    const [_, setLocation] = useLocation()
    // 是否禁用
    const isDisabled = useMemo(() => {
        if (Object.keys(detailData).length !== 0) return true
        return false
    }, [detailData])

    // 是否回显
    useEffect(() => {
        if (isDisabled && visible) {
            form.setFieldsValue(detailData)
        } else if (!isDisabled && visible) {
            form.resetFields()
        }
    }, [detailData, visible])

    const cancel = () => {
        form.resetFields()
        setVisible(false)
    }

    // 完成提交
    const onFinish = (values) => {
        let res = Object.keys(values).every(key => values[key] === detailData[key])
        if (res) {
            message.warning("您没有进行任何修改")
            return;
        }
        form.resetFields()
        if (!isDisabled) {
            api.addUser(values).then(res => {
                if (res.status === 200) {
                    message.success("创建成功")
                } else {
                    message.error("创建失败")
                }
                getUserData()
                setVisible(false)
            })
        } else {
            api.putUser(detailData.id, values).then(res => {
                if (res.status === 200) {
                    message.success("编辑成功")
                    let nowLoginUser = JSON.parse(localStorage.getItem("userInfo"))
                    if (detailData.user_name === nowLoginUser.user_name) {
                        setTimeout(() => {
                            setLocation('/');
                            window.location.reload();
                        }, 700)
                        return;
                    }
                } else {
                    message.error("编辑失败")
                }
                getUserData()
                setVisible(false)
            })
        }
    };

    // 验证
    const serviceValidator = (rule, value) => {
        let res = /^[a-zA-Z][a-zA-Z0-9_]{0,47}$/.test(value)
        if (!res && value !== "") {
            return Promise.reject("以字母开头,只能包含大小写字母、数字、-,最长48位")
        } else {
            return Promise.resolve()
        }
    }
    const passwordValidator = (_, value) => {
        const res = /^[\w+@]{5,16}$/
        if (res.test(value) || isDisabled) {
            return Promise.resolve()
        } else {
            return Promise.reject("密码格式错误")
        }
    }
    const phoneValidator = (_, value) => {
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (reg.test(value) || value == "" || value == null) return Promise.resolve()
        return Promise.reject("手机格式错误")
    }
    const urlValidator = (_, value) => {
        let res = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
        if (res || value == "") {
            return Promise.resolve();
        } else if (value.length > 48) {
            return Promise.reject("最长48位")
        } else {
            return Promise.reject("邮箱格式错误");
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
                            { required: !isDisabled, message: "此项为必填项" },
                            { validator: passwordValidator }
                        ]
                    }
                    extra={<>
                        <span
                            style={{ fontSize: "12px" }}
                        >
                            长度5-16，可以为字母、数字和特殊符号(_ @)
                        </span>
                        {isDisabled ? <span
                            style={{ fontSize: "12px", display: "block" }}
                        >
                            密码为空,则不更新。
                        </span> : null}
                    </>}
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
                            {isDisabled ? "保存" : "创建"}
                        </Button>
                        <Button htmlType="button" onClick={cancel}>
                            取消
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default React.memo(Index)
