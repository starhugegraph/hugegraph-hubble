import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, message } from 'antd';
import api from '../../../../../api/api'
import { AppStoreContext } from '../../../../../stores'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};
const CreateFrom = (props: { getQuery: Function, setVisible: Function, detailData: { graphspace: string, name: string } }) => {
    const { setVisible, detailData, getQuery } = props
    const [form] = Form.useForm();
    let appStore = useContext(AppStoreContext)//store仓库
    // 是否为编辑按钮跳转,是则禁用部分修改
    const isDisable = useMemo(() => {
        if (Object.keys(detailData).length !== 0) return true
        return false
    }, [detailData])

    // 获取需要编辑的数据并渲染
    useEffect(() => {
        if (isDisable) {
            api.getQueryDetail(appStore.tenant, detailData.name).then((res: any) => {
                form.setFieldsValue(res.data)
            })
            // setNodes((demoData.data.nodes as any))
        } else {
            form.resetFields()
        }
    }, [detailData])

    // 完成按钮
    const onFinish = (values: any) => {
        if (values.urls) {
            values.urls = Array.isArray(values.urls) ? values.urls : values.urls.split(',').filter((i: string) => i)
        }
        console.log(values);
        return;
        if (isDisable) {
            api.changeQueryDetail(appStore.tenant, detailData.name, values).then((res: any) => {
                if (res && res.status === 200) {
                    message.success("编辑成功")
                }
                getQuery()
                setVisible(false)
            })
        } else {
            api.addQueryData(appStore.tenant, values).then((res: any) => {
                if (res && res.status === 200) {
                    message.success("添加成功")
                }
                getQuery()
                setVisible(false)
            })
        }
    };
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
        if (res || (form.getFieldValue('deployment_type') === 'K8S' && !value.length)) {
            return Promise.resolve();
        } else if (form.getFieldValue('deployment_type') === 'MANUAL' && !value.length) {
            return Promise.reject("手动模式下url不能为空")
        } else if (value.length > 48) {
            return Promise.reject("最长48位")
        } else {
            return Promise.reject("域名格式错误");
        }
    }

    return (
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

                            <span style={{width:"50px",float:"left"}}>配置:</span>
                            <div className='groupBox'>
                                <Input.Group compact>
                                    <Select defaultValue={"Zhengjiang"}>
                                        <Option value="Zhejiang">Zhejiang</Option>
                                        <Option value="Jiangsu">Jiangsu</Option>
                                    </Select>
                                    <Input style={{ width: '50%' }} />
                                </Input.Group>
                            </div>
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
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                &nbsp;
                &nbsp;
                <Button htmlType="button" onClick={() => setVisible(false)}>
                    取消
                </Button>
            </Form.Item>
        </Form>
    );
};
export default React.memo(CreateFrom)