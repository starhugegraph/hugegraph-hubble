import React, { useEffect, useState, useContext } from 'react'
import { Select, Modal, Collapse, Checkbox, Form, Button, Space, message, Switch } from 'antd'
import api from '../../../../api/api'
import { AppStoreContext } from '../../../../stores';
const { Panel } = Collapse;
const { Option } = Select

const options = [
    { label: '读', value: 'READ' },
    { label: '写', value: 'WRITE' },
    { label: '删除', value: 'DELETE' },
    { label: '执行', value: 'EXECUTE' },
];
export default function Index(props) {
    const { visible, setVisible, detailData, targetDetail, setVisibleFather } = props
    const [targetList, setTargetList] = useState([])//资源名称下拉菜单数据
    const [permission, setPermission] = useState([])//permission选择框
    const [selectId, setSelectId] = useState("")//资源Id
    const [form] = Form.useForm();//表单
    const appStore = useContext(AppStoreContext)
    // 三维数组配置结构
    const collapseListDefault = [
        {
            title: '元数据',
            checked: false,
            isAdd: false,
            key: 'SCHEMA',
            children: [
                {
                    title: '属性类型',
                    checked: false,
                    isAdd: false,
                    key: 'PROPERTY_KEY',
                    type: 'type',
                },
                {
                    title: '顶点类型',
                    checked: false,
                    isAdd: false,
                    key: 'VERTEX_LABEL',
                    type: 'type',
                },
                {
                    title: '边类型',
                    checked: false,
                    isAdd: false,
                    key: 'EDGE_LABEL',
                    type: 'type',
                },
                {
                    title: '索引类型',
                    checked: false,
                    isAdd: false,
                    key: 'INDEX_LABEL',
                    type: 'type',
                }
            ],
            type: 'type',
        },
        {
            title: '顶点',
            checked: false,
            isAdd: true,
            key: 'VERTEX',
            type: 'type',
        },
        {
            title: '边',
            checked: false,
            isAdd: true,
            key: 'EDGE',
            type: 'type',
        },
        {
            title: '变量',
            checked: false,
            isAdd: false,
            key: 'VAR',
            type: 'type',
        },
        {
            title: 'GREMLIN',
            checked: false,
            isAdd: false,
            key: 'GREMLIN',
            type: 'type',
        },
        {
            title: '任务',
            checked: false,
            isAdd: false,
            key: 'TASK',
            type: 'type',
        },
    ];
    // 存放折叠面板所有的key名
    let collapseKeyListDefault = [
        'SCHEMA',
        'PROPERTY_KEY',
        'VERTEX_LABEL',
        'EDGE_LABEL',
        'INDEX_LABEL',
        'VERTEX',
        'EDGE',
        'VAR',
        'GREMLIN',
        'TASK',
    ];
    // 资源三维数据
    const [collapseList, setCollapseList] = useState(collapseListDefault);
    const [allKey, setallKey] = useState(false);
    // 存放折叠面板所有的key名
    const [_, setCollapseKeyList] = useState(collapseKeyListDefault);

    useEffect(() => {
        visible && getTargetListFn();
    }, [appStore.tenant, visible])

    useEffect(() => {
        return () => {
            setTargetList([])
            setPermission([])
            setCollapseList([])
            setSelectId("")
            setallKey(false)
            setCollapseKeyList([])
        }
    }, [])

    // 回显
    useEffect(() => {
        if (targetDetail.target_id) {
            form.setFieldsValue({ target_id: targetDetail.target_id })
            setPermission(targetDetail.permissions ? targetDetail.permissions : [])
            getTargetDetail(targetDetail.target_id)
        } else {
            setPermission(["READ", "WRITE", "DELETE", "EXECUTE"])
            form.resetFields()
        }
    }, [targetDetail])
    // 获取资源信息
    useEffect(() => {
        setallKey(false);
        selectId && getTargetDetail();
    }, [selectId])
    // 发送资源信息请求
    const getTargetDetail = (id) => {
        api.getTargetDetailData(appStore.tenant, id ? id : selectId).then(res => {
            if (res.status === 200) {
                setCollapseKeyList(collapseKeyListDefault);
                let arr = mapNewData(res.data.target_resources);
                setCollapseList(arr);
            }
        })
    }
    // 获取下拉框数据
    const getTargetListFn = () => {
        api.getTargetsList(appStore.tenant).then(res => {
            if (res && res.status === 200) {
                setTargetList(res.data)
            }
        })
    }
    // 提交
    const onFinish = (values) => {
        if (values.target_id) {
            if (targetDetail.target_id) {
                api.putAssResources(
                    appStore.tenant,
                    {
                        target_id: values.target_id,
                        permissions: permission,
                        group_id: detailData.group_id
                    }
                ).then(res => {
                    if (res && res.status === 200) {
                        message.success("编辑关联成功")
                    }
                    setVisibelFalse()
                })
            } else {
                api.assResources(
                    appStore.tenant,
                    { target_id: values.target_id, permissions: permission, group_id: detailData.group_id }
                ).then(res => {
                    if (res && res.status === 200) {
                        message.success("新增关联成功")
                    }
                    setVisibelFalse()
                })
            }
        } else {
            message.warning("确定已选择资源了吗？")
        }
    };
    const setVisibelFalse = () => {
        setVisible(false)
        setVisibleFather(false)
        form.resetFields()
    }
    // Modal关闭
    const handleCancel = () => {
        setVisible(false);
        form.resetFields()
    };
    // 渲染折叠面板（三维数组）
    const renderCollapse = (arr) => {
        if (!arr || !arr.length) {
            return [];
        }
        return arr.map((item) => {
            if (!item.children || !item.children.length) {
                // properties级别渲染
                if (item.type === 'properties') {
                    return (
                        <div key={item.title} style={{ padding: '8px 0px' }}>
                            <span style={{ margin: '0 20px' }}>{item.title}</span>
                        </div>
                    );
                }
                // 没有children且不可添加渲染
                if (!item.isAdd) {
                    return (
                        <div key={item.title} style={{ padding: '8px 0px' }}>
                            <span style={{ margin: '0 20px' }}>{item.title}:</span>
                            <Switch
                                checked={item.checked}
                                disabled={true}
                            />
                        </div>
                    );
                }
                // 没有children且可添加渲染
                return (
                    <div key={item.title} style={{ padding: '8px 0px' }}>
                        <span style={{ margin: '0 20px' }}>{item.title}:</span>
                        <Switch
                            checked={item.checked}
                            disabled={true}
                        />
                    </div>
                );
            }
            // type中不可添加的渲染
            if (!item.isAdd) {
                return (
                    <Panel header={
                        <div>
                            <span style={{ marginRight: '20px' }}>{item.title}:</span>
                            <Switch
                                checked={item.checked}
                                disabled={true}
                            />
                        </div>
                    } key={item.key}>
                        <Collapse>
                            {renderCollapse(item.children)}
                        </Collapse>
                    </Panel>
                );
            }
            // type中可添加的渲染
            return (
                <Panel header={
                    <div>
                        <span style={{ marginRight: '20px' }}>{item.title}:</span>
                        <Switch
                            checked={item.checked}
                            disabled={true}
                        />
                    </div>
                } key={item.key}>
                    <Collapse>
                        {renderCollapse(item.children)}
                    </Collapse>
                </Panel>
            );
        });
    };
    // 一维数据处理为三维
    const mapNewData = (arr) => {
        /*
        *   处理规则
        *   前置条件，克隆一份初始三维数据
        *   0. 判断type为ALL，如果为ALL，直接赋值进form表单中，然后跳出不执行接下来的操作
        *   前置条件（遍历数据，对每一个key进行判断）
        *   1. 判断是否为元数据，是则遍历初始三维数据的第一组数据里的children全部变为true，且元数据本身
        *   也为true
        *   2. 判断是否为顶点，再判断label是不是‘*’，若是则不遍历children，只改变checked值
        *       2.1 若label有值先在顶点children里push一个对象（label），并查看是否有properties。
        *       如果有则遍历properties并（key value）push进label的children中
        *   3. 边同第2条
        *   4. 其他type值所存在则直接改变checked
        *   5. 返回处理好的结果
        */
        if (!arr) {
            message.error("资源数据错误");
            return;
        }
        let list = JSON.parse(JSON.stringify(collapseListDefault));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === 'ALL') {
                setallKey(true);
                return JSON.parse(JSON.stringify([]));
            }
            if (arr[i].type === 'SCHEMA') {
                list[0].checked = true;
                list[0].children.map((item) => {
                    item.checked = true;
                });
                continue;
            }
            if (
                arr[i].type === 'PROPERTY_KEY' ||
                arr[i].type === 'VERTEX_LABEL' ||
                arr[i].type === 'EDGE_LABEL' ||
                arr[i].type === 'INDEX_LABEL'
            ) {
                list[0].children.map((item) => {
                    if (item.key === arr[i].type) {
                        item.checked = true;
                    }
                });
                continue;
            }
            if (arr[i].type === 'VERTEX' || arr[i].type === 'EDGE') {
                let myData = arr[i].type === 'VERTEX' ? list[1] : list[2];
                if (arr[i].label === '*') {
                    myData.checked = true;
                    continue;
                }
                myData.children = myData.children ? myData.children : [];
                myData.children.push({
                    title: arr[i].label,
                    checked: true,
                    isAdd: true,
                    key: arr[i].label,
                    type: 'label'
                });
                setCollapseKeyList([...collapseKeyListDefault, arr[i].label]);
                if (arr[i].properties) {
                    let myArr = myData.children;
                    myArr[myArr.length - 1].children = [];
                    for (let prop in arr[i].properties) {
                        myArr[myArr.length - 1].children.push({
                            title: prop + '=' + arr[i].properties[prop],
                            checked: true,
                            isAdd: false,
                            key: prop,
                            type: 'properties'
                        })
                        setCollapseKeyList([...collapseKeyListDefault, prop]);
                    }
                }
                continue;
            }
            if (arr[i].type === 'VAR') {
                list[3].checked = true;
                continue;
            }
            if (arr[i].type === 'GREMLIN') {
                list[4].checked = true;
                continue;
            }
            if (arr[i].type === 'TASK') {
                list[5].checked = true;
            }
        }
        return list;
    };
    return (
        <Modal
            visible={visible}
            forceRender
            onCancel={handleCancel}
            width={"700px"}
            footer={null}
        >
            <h4>角色名称：{detailData.group_name}</h4>
            <Form
                name="basic"
                wrapperCol={{
                    span: 16,
                }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item value={selectId} name="target_id" style={{ marginTop: "10px", width: "300px" }} label="资源名称">
                    <Select placeholder="请选择资源名称" onChange={(id) => setSelectId(id)}>
                        {targetList ? targetList.map(item => (<Option key={item.id} value={item.id}>{item.target_name}</Option>)) : null}
                    </Select>
                </Form.Item>
                <div style={{ marginBottom: '20px' }}>
                    所有资源：
                    <Switch
                        checked={allKey}
                        disabled={true}
                    />
                </div>

                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: '40px' }}>
                        <Collapse>
                            {renderCollapse(collapseList)}
                        </Collapse>
                    </div>
                    <Checkbox.Group
                        options={options}
                        onChange={(value) => setPermission(value)}
                        defaultChecked={true}
                        value={permission}
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
                    >
                    </Checkbox.Group>
                </div>
                <div style={{ width: "100%", margin: "10px 0px", display: "flex", justifyContent: "center" }}>
                    <Space>
                        <Button type="primary" htmlType="submit">提交</Button>
                        <Button onClick={() => setVisible(false)}>取消</Button>
                    </Space>
                </div>
            </Form>
        </Modal>
    )
}
