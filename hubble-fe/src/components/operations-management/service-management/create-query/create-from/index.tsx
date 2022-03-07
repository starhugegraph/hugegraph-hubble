import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, message, Skeleton } from 'antd';
import api from '../../../../../api/api'
import { AppStoreContext } from '../../../../../stores'
import { MinusCircleOutlined, PlusOutlined, LinkOutlined } from '@ant-design/icons';
const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

let OptionArray: any[] = []
for (let i = 1; i <= 10; i++) {
    OptionArray.push(<Option value={i} key={i}>{i}</Option>)
}

const CreateFrom = ({ setVisible, detailData, getQuery }:
    {
        getQuery: Function, setVisible: Function,
        detailData: { graphspace: string, name: string }
    }) => {
    let appStore = useContext(AppStoreContext)//store仓库
    const [form] = Form.useForm();
    const [configsChangeArray, setChangeArray] = useState<string[]>([])
    const [optionArray, setOptionArray] = useState<string[]>([])
    const [isShowLoading, setLoading] = useState<boolean>(false)
    const [Loading, setLoad] = useState<boolean>(false)

    // 是否为编辑按钮跳转,是则禁用部分修改
    const isDisable = useMemo(() => {
        if (Object.keys(detailData).length !== 0) return true
        return false
    }, [detailData])

    // 获取需要编辑的数据并渲染
    useEffect(() => {
        if (isDisable) {
            setLoading(true)
            api.getQueryDetail(appStore.tenant, detailData.name).then((res: any) => {
                form.setFieldsValue(res.data)
                setLoading(false)
            })
            // setNodes((demoData.data.nodes as any))
        } else {
            form.resetFields()
        }
        setChangeArray([])
    }, [detailData])

    // 获取配置list
    useEffect(() => {
        api.configsList().then(res => {
            if (res.status === 200) {
                setOptionArray(res.data.options)
            }
        })
        return () => {
            setChangeArray([])
            setOptionArray([])
            setLoad(false)
        }
    }, [])

    // 完成按钮
    const onFinish = (values: any) => {
        setLoad(true)
        if (values.urls) {
            values.urls = Array.isArray(values.urls) ? values.urls : values.urls.split(',').filter((i: string) => i)
        }
        if (values.configs && values.configs.length) {
            let configs = {}
            const newArray = values.configs.map((item: { key: string, value: string }) => ({ [item.key]: item.value }));
            newArray.forEach((item: any) => {
                configs = { ...configs, ...item }
            });
            values.configs = configs;
        }
        if (isDisable) {
            api.changeQueryDetail(appStore.tenant, detailData.name, values).then((res: any) => {
                setLoad(false)
                if (res && res.status === 200) {
                    message.success("编辑成功")
                }
                getQuery()
                setVisible(false)
            })
        } else {
            api.addQueryData(appStore.tenant, values).then((res: any) => {
                setLoad(false)
                if (res && res.status === 200) {
                    message.success("添加成功")
                }
                getQuery()
                setVisible(false)
            })
        }
        setChangeArray([])
    };

    // 配置下拉框事件
    const configChange = (value: string, name: number) => {
        setChangeArray((arr) => {
            arr[name] = value;
            return arr;
        })
    }

    // 验证
    const serviceValidator = (rule: any, value: string) => {
        let res = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)
        if (!res) {
            return Promise.reject("格式错误,只可包含中英文,下划线,不能以下划线结尾")
        } else {
            return Promise.resolve()
        }
    }
    const urlValidator = (rule: any, value: string) => {
        let res = /^(((https?|ftp|news):\/\/|\w+(\.\w+)+)(:\w+)?).*/.test(value)
        if (res) {
            return Promise.resolve();
        }else if (value.length > 48) {
            return Promise.reject("最长48位")
        } else {
            return Promise.reject("域名格式错误");
        }
    }

    return (
        <Skeleton loading={isShowLoading} active>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                <Form.Item name="name" label="实例名称" rules={[
                    { required: true, message: "此项为必填项" },
                    { max: 48, message: "字符长度最多48位" },
                    { validator: serviceValidator }
                ]} >
                    <Input disabled={isDisable} placeholder='请填写实例名称' />
                </Form.Item>

                <Form.Item name="deployment_type" label="运行方式" rules={[{ required: true, message: "此项为必填项" }]}>
                    <Select
                        placeholder="请选择运行方式"
                        allowClear
                        disabled={isDisable}
                    >
                        <Option value="MANUAL">手动</Option>
                        <Option value="K8S">容器</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.deployment_type !== currentValues.deployment_type}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('deployment_type') === 'K8S' ? (
                            <>
                                <Form.Item
                                    name="count"
                                    label="实例MAX"
                                    rules={[{ required: true }]}
                                    initialValue={1}
                                >
                                    <Select
                                        placeholder="请选择实例个数"
                                        allowClear
                                    >
                                        {OptionArray}
                                    </Select>
                                </Form.Item>
                                <div className='formItemBox'>
                                    <Space>
                                        <Form.Item
                                            labelCol={{ span: 12 }}
                                            name="cpu_limit"
                                            label="cpu最大值："
                                            rules={[{ required: true, message: "必填" }]}
                                            initialValue={1}
                                        >
                                            <InputNumber min={1}></InputNumber>
                                        </Form.Item>

                                        <Form.Item
                                            labelCol={{ span: 12 }}
                                            name="memory_limit"
                                            label="内存最大值："
                                            rules={[{ required: true, message: "必填" }]}
                                            initialValue={4}
                                        >
                                            <InputNumber min={1} ></InputNumber>
                                        </Form.Item>
                                    </Space>
                                </div>
                                <Form.List name="configs">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }, index) => {
                                                return (
                                                    <Space key={key} style={{ width: "100%", display: 'flex', marginBottom: 10, justifyContent: "center" }} align="baseline">
                                                        <span>配置{(+index) + 1}:</span>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'key']}
                                                            noStyle
                                                        >
                                                            <Select style={{ minWidth: "150px" }} placeholder="请选择配置" onChange={(value) => configChange(value, name)}>
                                                                {
                                                                    optionArray.map(item => (
                                                                        <Option
                                                                            disabled={configsChangeArray.includes(item)}
                                                                            value={item}
                                                                            key={item}
                                                                        >
                                                                            {item}
                                                                        </Option>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                        <LinkOutlined />
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'value']}
                                                            noStyle
                                                            rules={[{ required: true, message: '请填写具体配置信息' }]}
                                                        >
                                                            <Input style={{ minWidth: "150px" }} placeholder='请输入配置信息' />
                                                        </Form.Item>
                                                        <MinusCircleOutlined onClick={() => {
                                                            setChangeArray(arr => {
                                                                arr.splice(name, 1)
                                                                return arr
                                                            })
                                                            remove(name)
                                                        }} />
                                                    </Space>
                                                )
                                            }
                                            )
                                            }
                                            <Form.Item style={{ display: "flex", justifyContent: "center" }}>
                                                <Button type="dashed" onClick={() => {
                                                    if (optionArray.length > fields.length) {
                                                        add()
                                                    } else {
                                                        message.error("配置条数已到达上限")
                                                    }
                                                }} block icon={<PlusOutlined />}>
                                                    添加配置
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </>
                        ) : null
                    }
                </Form.Item>

                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.deployment_type !== currentValues.deployment_type}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('deployment_type') === 'MANUAL' ? (
                            <>
                                <Form.Item
                                    name="urls"
                                    label="访问地址"
                                    initialValue={[]}
                                    rules={
                                        [
                                            { required: true, message: "不能为空" },
                                            { validator: urlValidator }
                                        ]
                                    }>
                                    <Input.TextArea placeholder='可填写多个,请使用英文逗号做分隔' />
                                </Form.Item>
                            </>
                        ) : null
                    }
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={Loading}>
                        提交
                    </Button>
                    &nbsp;
                    &nbsp;
                    <Button htmlType="button" onClick={() => setVisible(false)}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Skeleton>
    );
};
export default React.memo(CreateFrom)