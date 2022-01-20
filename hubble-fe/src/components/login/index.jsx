import React, { useLayoutEffect, useState } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from 'antd';
import api from '../../api/api'
import { userStorage } from '../../utils';
import { useLocation } from 'wouter';

export default function Index(props) {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { setLogin } = props
    const [_,setLocation] = useLocation()
    // const appStore = useContext(AppStoreContext)
    // 登陆
    const onFinish = (values) => {
        setLoading(true)
        api.getUser(values).then(res => {
            if (res && res.status === 200) {
                message.success("登陆成功")
                setLocation('/')
                if (values.remember) {
                    userStorage.setStorage(["user_key", "user_value"], [values.user_name, values.user_password])
                } else {
                    userStorage.removeStorage(["user_key", "user_value"])
                }
                localStorage.setItem("userInfo", JSON.stringify({ user_name: res.data.user_name, avatar: res.data.avatar }))
                localStorage.setItem('lg', "true")
                setLogin("true")
            }
            setLoading(false)
        })
    };
    // 本地是否有账号，有则为记住密码
    useLayoutEffect(() => {
        let userObj = userStorage.getStorage(["user_key", "user_value"])
        form.setFieldsValue(userObj)
    }, [])
    // 验证
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

    return (
        <div style={
            {
                width: "100vw",
                height: "98vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }
        }>
            <Card title="登陆" headStyle={{ textAlign: "center" }} bordered={false} style={{ width: 400 }}>
                <Form
                    form={form}
                    wrapperCol={{
                        span: 24,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="user_name"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的账号!',
                            },
                            {
                                max: 48,
                                message: "最长不能超过48位"
                            }
                        ]}
                    >
                        <Input placeholder='账号类型提醒,如手机号/邮箱/用户名' />
                    </Form.Item>

                    <Form.Item
                        name="user_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入您的密码!',
                            },
                            {
                                // validator: passwordValidator
                            }
                        ]}
                    >
                        <Input.Password placeholder='密码' />
                    </Form.Item>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <a>
                                找回密码
                            </a>
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button style={{ width: "100%" }} type="primary" htmlType="submit" loading={loading}>
                            登陆
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    )
}
