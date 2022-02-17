import React, { useMemo, useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Select, InputNumber, Space, message } from 'antd';
import api from '../../../../../api/api'
import { AppStoreContext } from '../../../../../stores'
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
const CreateFrom = (props: { getQuery: Function, setVisible: Function, detailData: { graphspace: string, name: string } }) => {
    const { setVisible, detailData, getQuery } = props
    const [form] = Form.useForm();
    const [nodes, setNodes] = useState([])//实例ip
    const [selectData, setSelectData] = useState([])//租户下拉框数据
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
            getGraphspacesSelectData()
            setNodes([])
            form.resetFields()
        }
    }, [detailData])

    // 获取租户list下拉框数据
    const getGraphspacesSelectData = () => {
        api.getGraphspacesList().then(res => {
            setSelectData(res.data.graphspaces)
        })
    }
    // 完成按钮
    const onFinish = (values: any) => {
        values.create_time = new Date().toLocaleDateString()
        if (isDisable) {
            api.changeQueryDetail(appStore.tenant, detailData.name, values).then((res: any) => {
                if (res && res.status === 200) {
                    message.success("编辑成功")
                    setVisible(false)
                    getQuery()
                }
            })
        } else {
            api.addQueryData(appStore.tenant, values).then((res: any) => {
                console.log(res);
                if (res && res.status === 200) {
                    message.success("添加成功")
                    setVisible(false)
                    getQuery()
                }
            })
        }
    };
    // 取消按钮
    const onReset = () => {
        setVisible(false)
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
        let res = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/i.test(value)
        if (res || value === "" || isDisable) {
            return Promise.resolve();
        } else if (form.getFieldValue('deployment_type') === 'MANUAL' && value === "") {
            return Promise.reject("手动模式下url不能为空")
        } else if (value.length > 48) {
            return Promise.reject("最长48位")
        } else {
            return Promise.reject("域名格式错误");
        }
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

            <Form.Item name="name" label="实例名称" rules={[{ required: true, message: "此项为必填项" }, { max: 48, message: "字符长度最多48位" }, { validator: serviceValidator }]} >
                <Input disabled={isDisable} placeholder='请填写实例名称' />
            </Form.Item>

            <Form.Item name="graphspace" initialValue={""} label="租户" rules={[{ required: !isDisable, message: "此项为必填项" }]}>
                <Select
                    disabled={isDisable}
                    placeholder="请选择租户"
                    allowClear
                >
                    {selectData.map(item => (<Option value={item} key={item}>{item}</Option>))}
                </Select>
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
                            <Form.Item name="count" label="实例MAX" rules={[{ required: true }]}>
                                <Select
                                    placeholder="请选择实例个数"
                                    allowClear
                                >
                                    {OptionArray}
                                </Select>
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: "center", alignContent: "center" }}>
                                <Space>
                                    <Form.Item labelCol={{ span: 12 }} name="cpu_limit" label="cpu最大值：" rules={[{ required: true, message: "必填" }]}>
                                        <InputNumber min={1} value={1}></InputNumber>
                                    </Form.Item>

                                    <Form.Item labelCol={{ span: 12 }} name="memory_limit" label="内存最大值：" rules={[{ required: true, message: "必填" }]}>
                                        <InputNumber min={1} value={1}></InputNumber>
                                    </Form.Item>
                                </Space>
                            </div>
                        </>
                    ) : null
                }
            </Form.Item>

            <Form.Item name="urls" label="访问地址" initialValue={[]} rules={[{ validator: urlValidator }]}>
                <Input />
            </Form.Item>

            {nodes.length !== 0 ? <Form.Item label="实例IP">
                {
                    nodes.map(item => (<p key={item}>{item}</p>))
                }
            </Form.Item> : null}

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                &nbsp;
                &nbsp;
                <Button htmlType="button" onClick={onReset}>
                    取消
                </Button>
            </Form.Item>
        </Form>
    );
};
export default React.memo(CreateFrom)