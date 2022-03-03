import React, { useMemo, useState, useEffect } from 'react'
import { Form, Input, Button, Modal, Space, InputNumber, Select, message, Switch, Skeleton } from 'antd';
import api from '../../../../api/api'
const { Option } = Select
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
const Index = ({ visible, setVisible, detailData }) => {
    const [form] = Form.useForm();
    const [userList, setUserList] = useState([])//用户list
    const [SkeLoading, setSkeLoading] = useState(false)//加载
    const [loading, setLoading] = useState(false)//加载
    // 是否禁用
    const isDisabled = useMemo(() => {
        if (Object.keys(detailData).length !== 0) return true
        return false
    }, [detailData])

    // 是否回显
    useEffect(() => {
        getUser()
        if (isDisabled) {
            setSkeLoading(true)
            api.getDetailTenant(detailData.name).then(res => {
                if (res && res.status === 200) {
                    form.setFieldsValue(res.data)
                }
                setSkeLoading(false)
            })
        } else {
            form.resetFields()
        }
    }, [detailData])

    // 获取user下拉框
    const getUser = () => {
        api.getUserList().then(res => {
            if (res && res.status === 200) {
                setUserList(res.data.users)
            }
        })
    }

    // 完成提交
    const onFinish = (values) => {
        setLoading(true)
        if (isDisabled) {
            api.putGraphspaces(values.name, values).then(res => {
                setLoading(false)
                if (res && res.status === 200) {
                    message.success("编辑成功")
                    setVisible(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 700);
                }
            })
        } else {
            api.addGraphspacesList(values).then(res => {
                setLoading(false)
                if (res && res.status === 200) {
                    message.success("新增成功")
                    setVisible(false)
                    setTimeout(() => {
                        window.location.reload()
                    }, 700);
                }
            })
        }
    };
    // 验证
    const serviceValidator = (_, value) => {
        let res = /^[5A-Za-z0-9\_]+$/.test(value)
        if (!res) {
            return Promise.reject("格式错误,只可包含英文、数字、下划线")
        } else {
            return Promise.resolve()
        }
    }
    // 管理员
    const userSelect = useMemo(() => userList.map(item => (<Option key={item.id}>{item.user_name}</Option>)), [userList])
    return (
        <Modal
            title={Object.keys(detailData).length === 0 ? "创建" : "编辑"}
            closable={false}
            visible={visible}
            footer={null}
            forceRender
        >
            <Skeleton loading={SkeLoading} active>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                    <div className='fromDiv'>
                        <Form.Item
                            name="name"
                            label="租户名称"
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                    { max: 48, message: "字符长度最多48位" },
                                    { validator: serviceValidator }
                                ]
                            }
                        >
                            <Input disabled={isDisabled} />
                        </Form.Item>

                        <Form.Item
                            label="是否开启鉴权"
                            name="auth"
                            valuePropName="checked"
                            labelCol={10}
                        >
                            <Switch disabled={isDisabled} />
                        </Form.Item>
                    </div>

                    <div className='fromDiv'>
                        <Form.Item
                            name="max_graph_number"
                            label="最大图数"
                            initialValue={100}
                            labelCol={10}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber precision={0} stringMode min={1}></InputNumber>
                        </Form.Item>

                        <Form.Item
                            name="max_role_number"
                            label="最大角色数"
                            labelCol={10}
                            initialValue={100}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber precision={0} stringMode min={1}></InputNumber>
                        </Form.Item>

                        <Form.Item
                            name="storage_limit"
                            label="储存资源"
                            initialValue={1000}
                            labelCol={10}
                            extra={<span className='spanFontSize'>此单位为G</span>}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber placeholder='G' precision={0} stringMode min={1} />
                        </Form.Item>

                        <Form.Item
                            name="cpu_limit"
                            label="计算资源"
                            labelCol={10}
                            initialValue={100}
                            extra={<span className='spanFontSize'>此单位为G</span>}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber placeholder='核' precision={0} stringMode min={1} />
                        </Form.Item>

                        <Form.Item
                            name="memory_limit"
                            label="内存资源"
                            labelCol={10}
                            initialValue={1000}
                            extra={<span className='spanFontSize'>此单位为G</span>}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber placeholder='G' precision={0} stringMode min={1} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="olap_namespace"
                        label="算法绑定命名空间"
                        rules={
                            [
                                { required: true, message: "此项为必填项" },
                            ]
                        }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="oltp_namespace"
                        label="服务绑定命名空间"
                        rules={
                            [
                                { required: true, message: "此项为必填项" },
                            ]
                        }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="storage_namespace"
                        label="存储绑定命名空间"
                        rules={
                            [
                                { required: true, message: "此项为必填项" },
                            ]
                        }
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="graphspace_admin"
                        label="租户管理员"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="选择租户管理员"
                        >
                            {userList.length ? userSelect : null}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="描述"
                        initialValue={""}
                        rules={
                            [
                                { max: 128, message: "最多字符128位" },
                            ]
                        }
                    >
                        <Input.TextArea placeholder='租户描述，可选'></Input.TextArea>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                {Object.keys(detailData).length === 0 ? "创建" : "保存"}
                            </Button>
                            <Button htmlType="button" onClick={() => setVisible(false)}>
                                取消
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Skeleton>
        </Modal>
    );
};
export default React.memo(Index)