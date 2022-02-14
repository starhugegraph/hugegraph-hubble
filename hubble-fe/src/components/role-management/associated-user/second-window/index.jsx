import React, { useEffect, useState, useContext } from 'react'
import { Select, Modal, message, } from 'antd'
import api from '../../../../api/api'
import { AppStoreContext } from '../../../../stores'

const { Option } = Select
/* const demoData =
{
    status: 200,
    data: {
        users: [
            {
                id: "1", //id
                user_name: "张三", //
            },
            {
                id: "2", //id
                user_name: "李四", //
            },
            {
                id: "3", //id
                user_name: "王武", //
            },
            {
                id: "4", //id
                user_name: "无泪", //
            },
            {
                id: "5", //id
                user_name: "泥煤", //
            },
        ]
    },
    "message": "msg",
    "cause": ""
} */
export default function Index(props) {
    const { visible, setVisible, detailData, getAssUserData } = props
    const [userList, setUserList] = useState([])//用户下拉菜单数据
    const [userId, setUserId] = useState([])//用户多选下拉值
    const appStore = useContext(AppStoreContext)
    // 调用下拉框获取数据方法
    useEffect(() => {
        getUser()
    }, [])

    // 获取用户数据
    const getUser = () => {
        api.getUserList().then(res => {
            if (res && res.status === 200) {
                setUserList(res.data.users)
            }
        })
    }
    // 多选下拉框值
    const selectHandle = (value) => {
        setUserId(value)
    }
    // 确认新增
    const handleOk = () => {
        if (userId.length !== 0) {
            api.AssUsers(appStore.tenant, { user_ids: userId, group_id: detailData.group_id }).then(res => {
                if (res && res.status === 200) {
                    message.success("新增成功")
                    getAssUserData()
                    setVisible(false)
                }
            })
        } else {
            message.error("新增失败")
        }
        // setVisible(false)
    };

    const handleCancel = () => {
        setVisible(false);
    };
    return (
        <Modal
            visible={visible}
            closable={false}
            forceRender
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            width={"700px"}
            title="增加"
            cancelText="取消"
            okText="确认新增"
        >
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                用户：<Select
                    style={{ width: "300px" }}
                    onChange={selectHandle}
                    allowClear
                    mode="multiple"
                    placeholder="请添加用户"
                >
                    {userList.map(item => (
                        <Option key={item.id} value={item.id}>{item.user_name}</Option>
                    ))}
                </Select>
            </div>
        </Modal>
    )
}
