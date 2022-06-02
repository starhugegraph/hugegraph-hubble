import React, { useMemo, useState, useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Space,
    InputNumber,
    Select,
    message,
    Switch,
    Skeleton
} from 'antd';
import MyFormItem from '../../../common/MyFormItem';
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
        const thenCallBack = res => {
            setLoading(false)
            if (res && res.status === 200) {
                message.success(`${isDisabled ? "编辑" : "新增"}成功，即将刷新页面`)
                setTimeout(() => {
                    window.location.reload()
                }, 700);
            }
        }
        if (isDisabled) {
            api.putGraphspaces(values.name, values).then(thenCallBack)
        } else {
            api.addGraphspacesList(values).then(thenCallBack)
        }
    };
    // 验证
    const serviceValidator = (_, value) => {
        if (value === 'DEFAULT') {
          return Promise.resolve();
        }
        let res = /^[a-z][a-z0-9_]{0,47}$/.test(value);
        if (!res) {
            return Promise.reject('以字母开头,只能包含小写字母、数字、_, 最长48位');
        } else {
            return Promise.resolve()
        }
    }
    // 验证
    const k8sValidator = (_, value) => {
        let res = /^[a-z][a-z0-9\-]{0,47}$/.test(value)
        if (!res) {
            return Promise.reject("以字母开头,只能包含小写字母、数字、-,最长48位")
        } else {
            return Promise.resolve()
        }
    }
    // 管理员
    const userSelect = useMemo(() => userList.map(item => (<Option key={item.id}>{item.user_name}</Option>)), [userList])
    return (
        <Modal
            title={isDisabled ? "编辑" : "创建"}
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
                            label="图空间名称"
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

                    <div className='fromDiv fromDiv2'>
                        <Form.Item
                            name="max_graph_number"
                            label="最大图数"
                            initialValue={100}
                            labelCol={10}
                            colon={false}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber precision={0} min={1}></InputNumber>
                        </Form.Item>

                        <Form.Item
                            name="max_role_number"
                            label="最大角色数"
                            labelCol={10}
                            initialValue={100}
                            colon={false}
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                ]
                            }
                        >
                            <InputNumber precision={0} min={1}></InputNumber>
                        </Form.Item>
                    </div>

                    <div id='formBox'>
                        <h4 style={{ marginBottom: "10px" }}>图服务：</h4>
                        <div className='fromDiv formDivCenter'>
                            <MyFormItem label='cpu资源' >
                                <Form.Item
                                    name="cpu_limit"
                                    initialValue={100}
                                    noStyle
                                    rules={
                                        [
                                            { required: true, message: "此项为必填项" },
                                        ]
                                    }
                                >
                                    <InputNumber placeholder='核' precision={0} min={1} />
                                </Form.Item>
                            </MyFormItem>

                            <MyFormItem label="内存资源" >
                                <Form.Item
                                    name="memory_limit"
                                    initialValue={1000}
                                    noStyle
                                    rules={
                                        [
                                            { required: true, message: "此项为必填项" },
                                        ]
                                    }
                                >
                                    <InputNumber placeholder='G' precision={0} min={1} />
                                </Form.Item>
                            </MyFormItem>
                        </div>
                        <Form.Item
                            name="oltp_namespace"
                            label="k8s命名空间"
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                    { validator: k8sValidator }
                                ]
                            }
                        >
                            <Input disabled={isDisabled} />
                        </Form.Item>

                        <h4 style={{ marginBottom: "10px" }}>计算任务：</h4>
                        <div className='fromDiv formDivCenter'>
                            <MyFormItem label="cpu资源">
                                <Form.Item
                                    name="compute_cpu_limit"
                                    initialValue={100}
                                    noStyle
                                    rules={
                                        [
                                            { required: true, message: "此项为必填项" },
                                        ]
                                    }
                                >
                                    <InputNumber placeholder='核' precision={0} min={1} />
                                </Form.Item>
                            </MyFormItem>

                            <MyFormItem label="内存资源">
                                <Form.Item
                                    name="compute_memory_limit"
                                    initialValue={1000}
                                    noStyle
                                    rules={
                                        [
                                            { required: true, message: "此项为必填项" },
                                        ]
                                    }
                                >
                                    <InputNumber placeholder='G' precision={0} min={1} />
                                </Form.Item>
                            </MyFormItem>
                        </div>

                        <Form.Item
                            name="olap_namespace"
                            label="k8s命名空间"
                            rules={
                                [
                                    { required: true, message: "此项为必填项" },
                                    { validator: k8sValidator }
                                ]
                            }
                        >
                            <Input disabled={isDisabled} />
                        </Form.Item>

                        <Form.Item
                            name="operator_image_path"
                            label="Operator镜像地址"
							rules={
								[
									{ required: true, message: "此项为必填项" },
									{ pattern: /^[a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+(\:[a-z0-9\.]+)*$/, message: '请输入正确的镜像地址格式(ie: example.com/org_1/xx_img:1.0.0)!' }
								]
							}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="internal_algorithm_image_url"
                            label="算法镜像地址"
							rules={
								[
									{ required: true, message: "此项为必填项" },
									{ pattern: /^[a-zA-Z0-9\-\.]+\/[a-zA-Z0-9\-_]+\/[a-zA-Z0-9\-_]+(\:[a-z0-9\.]+)*$/, message: '请输入正确的镜像地址格式(ie: example.com/org_1/xx_img:1.0.0)!' }
								]
							}
                        >
                            <Input />
                        </Form.Item>


                        <h4 style={{ marginBottom: "10px" }}>存储服务：</h4>
                        <MyFormItem label="硬盘">
                            <Form.Item
                                name="storage_limit"
                                initialValue={1000}
                                noStyle
                                rules={
                                    [
                                        { required: true, message: "此项为必填项" },
                                    ]
                                }
                            >
                                <InputNumber style={{ width: 200 }} placeholder='G' precision={0} min={1} />
                            </Form.Item>
                        </MyFormItem>
                    </div>

                    <hr />

                    <Form.Item
                        name="graphspace_admin"
                        label="图空间管理员"
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="选择图空间管理员"
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
                        <Input.TextArea placeholder='图空间描述，可选'></Input.TextArea>
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
