import React, { useEffect, useMemo, useState, useContext } from 'react'
import { Form, Button, Modal, Space, Select, message } from 'antd';
import api from '../../../api/api'
import { AppStoreContext } from '../../../stores';
const { Option } = Select;
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

const Index = ({ visible, setVisible, detailData, getUserData }) => {
    const [form] = Form.useForm();
    const [userList, setUserList] = useState(null)
    const [groupList, setGroupList] = useState(null)
    const [finishLoading, setFinishLoading] = useState(false)
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
    
    // 获取下拉数据
    useEffect(() => {
        getUserListData()
        getRoleList()
    }, [appStore.tenant])

    useEffect(() => {
        return ()=>{
            setUserList(null)
            setGroupList(null)
            setFinishLoading(false)
        }
    }, [])

    // 获取用户List
    const getUserListData = () => {
        api.getUserList().then(res => {
            if (res && res.status === 200) {
                setUserList(res.data.users)
            }
        })
    }
    // 获取角色list
    const getRoleList = () => {
        api.allRoleList(appStore.tenant).then(res => {
            if (res && res.status === 200) {
                setGroupList(res.data)
            }
        })
    }
    // 完成提交
    const onFinish = (values) => {
        setFinishLoading(true)
        let groups = values.groups.map(item => ({ group_id: item.split(" ")[0], group_name: item.split(" ")[1] }))
        api.postAuthUser(appStore.tenant, { ...values, groups }).then(res => {
            if (res && res.status === 200) {
                message.success(isDisabled ? "编辑成功":"新增成功")
                getUserData()
            }
            setFinishLoading(false)
            setVisible(false)
        })
    };
    // 取消
    const onReset = () => {
        setVisible(false)
    };
    // 验证
    const serviceValidator = (_, value) => {
        let res = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)
        if (!res) {
            return Promise.reject("格式错误,只包含中英文,下划线,不能以下划线结尾")
        } else {
            return Promise.resolve()
        }
    }

    return (
        <Modal
            title={isDisabled ? "编辑" : "新增"}
            closable={false}
            visible={visible}
            footer={null}
            forceRender
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="user_id"
                    label="用户"
                    rules={
                        [
                            { required: true, message: "此项为必填项" },
                            { max: 48, message: "字符长度最多48位" },
                            { validator: serviceValidator }
                        ]
                    }
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        disabled={isDisabled}
                        placeholder="请输入用户名"
                        optionFilterProp="children"
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {userList ? userList.map(item => (<Option key={item.id} value={item.id}>{item.user_name}</Option>)) : null}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="groups"
                    label="所属角色"
                    rules={
                        [
                            { required: true, message: "此项为必填项" },
                        ]
                    }
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="请选择所属角色"
                    >
                        {groupList ?
                            groupList.map(item =>
                                (<Option key={item.id} value={item.id + " " + item.group_name}>{item.group_name}</Option>)
                            )
                            : null}
                    </Select>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={finishLoading}>
                            {Object.keys(detailData).length === 0 ? "新增" : "保存"}
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