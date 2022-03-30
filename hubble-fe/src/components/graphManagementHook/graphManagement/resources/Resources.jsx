/*
 * @Author: your name
 * @Date: 2022-01-06 16:56:44
 * @LastEditTime: 2022-01-14 18:16:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/graphManagementHook/graphManagement/index.js
 */
import React, { useState, useContext, useEffect } from 'react';
import './Resources.less';
import {
    Input,
    Button,
    Table,
    Modal,
    Row,
    Col,
    Form,
    Select,
    Collapse,
    Switch,
    message,
} from 'antd';
import { AppStoreContext } from '../../../../stores';
import api from '../../../../api/api';

const container_style = { padding: '8px 0px', display: "flex" }
const span_style = { margin: '0 20px', display: "inline-block", width: "70px" }
const div_style = { width: "100px", display: "flex", justifyContent: "flex-start" }
export default function Resources() {

    let appStore = useContext(AppStoreContext);

    const { Search } = Input;
    const { Column } = Table;
    const { Option } = Select;
    const { Panel } = Collapse;

    useEffect(() => {
        appStore.tenant && getGraphsList();
    }, [appStore.tenant]);

    const tableKeyList = [
        {
            key: 'target_graph',
            title: '图'
        },
        {
            key: 'id',
            title: '资源id'
        },
        {
            key: 'target_name',
            title: '资源名称'
        },
        {
            key: 'target_create',
            title: '创建时间'
        },
        {
            key: 'target_update',
            title: '更新时间'
        },
        {
            key: 'target_creator',
            title: '创建人'
        },
    ];
    const defaultPageObj = {
        current: 1,
        total: 0,
        pageSize: 10
    };
    // pageObj表格页码数据
    let [pageObj, setPageObj] = useState(defaultPageObj);
    // 搜索框数据
    let [inpValue, setInpValue] = useState('');

    useEffect(() => {
        onSearch(inpValue, '', true);
    }, [pageObj.current, appStore.tenant]);

    // 表格数据
    let [tableData, setTableData] = useState([]);
    // 搜索数据
    // let [searchData, setSearchData] = useState('');
    // 创建图弹窗
    const [createKey, setCreateKey] = useState(false);
    // 创建图弹窗时的数据保存
    const [formData, setFormData] = useState({});
    // 创建图时确认弹窗
    const [createConfirmKey, setCreateConfirmKey] = useState(false);
    // 查看schema弹窗
    const [seeVisible, setSeeVisible] = useState(false);
    // 查看schema数据
    const [schemaData] = useState('');
    // 启用编辑模式
    const [eidtKey, setEidtKey] = useState(false);
    // 启用查看模式
    const [see, setSee] = useState(false);
    // 清空图确认弹窗
    const [deleteConfirmKey, setDeleteConfirmKey] = useState(false);
    // 清空图弹窗内图名数据
    const [deleteData, setDeleteData] = useState('');
    // 编辑时当前选中的id
    const [editId, setEditId] = useState('');
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
                    isChildren: true
                },
                {
                    title: '顶点类型',
                    checked: false,
                    isAdd: false,
                    key: 'VERTEX_LABEL',
                    type: 'type',
                    isChildren: true
                },
                {
                    title: '边类型',
                    checked: false,
                    isAdd: false,
                    key: 'EDGE_LABEL',
                    type: 'type',
                    isChildren: true
                },
                {
                    title: '索引类型',
                    checked: false,
                    isAdd: false,
                    key: 'INDEX_LABEL',
                    type: 'type',
                    isChildren: true
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

    // 资源三维数据
    const [collapseList, setCollapseList] = useState(collapseListDefault);
    // 当前点击添加的key名
    const [switchKey, setSwitchKey] = useState(null);

    const [addKey, setAddKey] = useState(false);
    const [addLabelKey, setAddLabelKey] = useState(false);
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
        'TASK'
    ];
    // 存放折叠面板所有的key名
    const [collapseKeyList, setCollapseKeyList] = useState(collapseKeyListDefault);
    // 存放临时存储的顶点children数据
    const [verte_children, setVerte_children] = useState([]);
    // 存放临时存储的边children数据
    const [edge_children, setEdge_children] = useState([]);
    // 当前列表
    let [graphsSelect, setGraphsSelect] = useState([]);
    // loading
    let [loading, setLoading] = useState(false);

    // 搜索
    const onSearch = (value, e, key) => {
        setLoading(true)
        const obj = {
            page_no: key ? pageObj.current : 1,
            page_size: pageObj.pageSize,
            query: value
        };
        if (!key && pageObj.current !== 1) {
            setPageObj(defaultPageObj);
            return;
        }
        api.getResourcesList(appStore.tenant, obj).then((res) => {
            setLoading(false)
            if (res.status === 200) {
                setPageObj({
                    current: res.data.current,
                    total: res.data.total,
                    pageSize: res.data.size
                });
                setTableData(res.data.records);
            }
        });
    };
    const [form] = Form.useForm();
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    // 打开查看schema弹窗
    const openSeeModal = (data) => {
        api.seeResources(appStore.tenant, data.id).then((res) => {
            if (res.status === 200) {
                setCollapseKeyList(collapseKeyListDefault);
                form.setFieldsValue({
                    target_name: res.data.target_name,
                    target_graph: res.data.target_graph
                });
                let arr = mapNewData(res.data.target_resources);
                setCollapseList(arr);
                setSee(true);
                setCreateKey(true);
            }
        });
    };
    // 编辑弹窗
    const openEditModal = (data) => {
        api.seeResources(appStore.tenant, data.id).then((res) => {
            if (res.status === 200) {
                setCollapseKeyList(collapseKeyListDefault);
                form.setFieldsValue({
                    target_name: res.data.target_name,
                    target_graph: res.data.target_graph
                });
                let arr = mapNewData(res.data.target_resources);
                setEditId(res.data.id);
                setCollapseList(arr);
                console.log(arr);
                setEidtKey(true);
                setCreateKey(true);
            }
        });
    };
    // 打开删除确认弹窗
    const openDeleteConfirm = (data) => {
        setDeleteData(data.id);
        setDeleteConfirmKey(true);
    };
    // 执行清空图操作
    const confirmDelete = () => {
        api.deleteResources(appStore.tenant, deleteData).then((res) => {
            if (res.status === 200) {
                setDeleteConfirmKey(false);
                message.success(res.message);
                onSearch('');
                setInpValue('');
                setPageObj(defaultPageObj);
            }
        });
    };
    // 渲染表格
    const renderTabel = (arr) => {
        if (!arr || !arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Column
                    title={item.title}
                    dataIndex={item.key}
                    key={item.key}
                />
            )
        });
    };
    // 打开创建图弹窗
    const openCreate = () => {
        setCollapseKeyList(collapseKeyListDefault);
        setCreateKey(true);
    };
    // 创建
    const onFinish = (values) => {
        setFormData(values);
        setCreateConfirmKey(true);
    };
    // 创建确认操作
    const confirmCreate = () => {
        let obj = {
            target_name: formData.target_name, // 资源名
            target_graph: formData.target_graph,
            target_creator: JSON.parse(localStorage.getItem("userInfo")).user_name,
        };
        // 选中所有资源
        if (formData.ALL) {
            obj.target_resources = [{ type: 'ALL' }];
        } else {
            let dataList = JSON.parse(JSON.stringify(collapseList));
            console.log(dataList);
            obj.target_resources = mapData(dataList);
        }
        console.log(obj.target_resources);
        if (!eidtKey) {
            api.createResources(appStore.tenant, obj).then((res) => {
                if (res.status === 200) {
                    message.success(res.message);
                    setCreateConfirmKey(false);
                    form.setFieldsValue({ target_name: '', target_graph: null, ALL: false });
                    setCollapseList(collapseListDefault);
                    setCollapseKeyList(collapseKeyListDefault);
                    setCreateKey(false);
                    setEidtKey(false);
                    onSearch('');
                    setInpValue('');
                    setPageObj(defaultPageObj);
                }
            });
            return;
        }
        api.editResources(appStore.tenant, editId, obj).then((res) => {
            if (res.status === 200) {
                message.success(res.message);
                setCreateConfirmKey(false);
                form.setFieldsValue({ target_name: '', target_graph: null, ALL: false });
                setCollapseList(collapseListDefault);
                setCollapseKeyList(collapseKeyListDefault);
                setCreateKey(false);
                setEidtKey(false);
                onSearch('');
                setInpValue('');
                setPageObj(defaultPageObj);
            }
        });
    };
    // 打开新增label弹窗
    const openAddDom = (key) => {
        setSwitchKey(key);
        setAddKey(true);
    };
    // 打开新增label弹窗
    const openAddPDom = (key) => {
        setSwitchKey(key);
        setAddLabelKey(true);
    };
    // 确认添加操作
    const addDom = (data) => {
        let key = switchKey.key;
        console.log(switchKey);
        data.only = (switchKey.only ? switchKey.only : switchKey.key) + (data.key ? data.key : data.label)
        let indexKey = collapseKeyList.indexOf(data.only);
        if (indexKey !== -1) {
            message.error('key命名重复!');
            return;
        }
        let arr = JSON.parse(JSON.stringify(collapseList));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].key === key) {
                arr[i].children = arr[i].children ? arr[i].children : [];
                arr[i].children.push({
                    title: data.label,
                    checked: false,
                    isAdd: true,
                    key: data.label,
                    type: 'label',
                    only: data.only
                });
                setCollapseKeyList([...collapseKeyList, data.only]);
                setCollapseList(arr);
                setAddLabelKey(false);
                form2.setFieldsValue({ label: '' });
                return;
            }
            if (arr[i].isAdd && arr[i].children) {
                for (let j = 0; j < arr[i].children.length; j++) {
                    if (arr[i].children[j].key === key) {
                        arr[i].children[j].children = arr[i].children[j].children ? arr[i].children[j].children : [];
                        arr[i].children[j].children.push({
                            title: data.key + '=' + data.value,
                            checked: false,
                            isAdd: false,
                            key: data.key,
                            type: 'properties',
                            only: data.only
                        })
                        setCollapseKeyList([...collapseKeyList, data.only]);
                        setCollapseList(arr);
                        setAddKey(false);
                        form1.setFieldsValue({ key: '', value: '' });
                        return;
                    }
                }
            }
        }
    };
    // properties删除操作（仅顶点和边下有properties）
    const deleteDom = (mykey) => {
        let indexKey = collapseKeyList.indexOf(mykey);
        if (indexKey === -1) {
            message.error('未找到该key!');
            return;
        }
        let arr = JSON.parse(JSON.stringify(collapseList));
        console.log(arr);
        if (arr[1].children && arr[1].children.length) {
            let mapList = arr[1].children;
            for (let i = 0; i < mapList.length; i++) {
                if (mapList[i].children && mapList[i].children.length > 0) {
                    for (let j = 0; j < mapList[i].children.length; j++) {
                        if (mapList[i].children[j].only ? mapList[i].children[j].only : mapList[i].children[j].key === mykey) {
                            mapList[i].children.splice(j, 1);
                            setCollapseList(arr);
                            return;
                        }
                    }
                }
            }
        }
        if (!arr[2].children || !arr[2].children.length) {
            return;
        }
        let mapList = arr[2].children;
        for (let i = 0; i < mapList.length; i++) {
            if (mapList[i].children && mapList[i].children.length > 0) {
                for (let j = 0; j < mapList[i].children.length; j++) {
                    if (mapList[i].children[j].only? mapList[i].children[j].only : mapList[i].children[j].key === mykey) {
                        mapList[i].children.splice(j, 1);
                        setCollapseList(arr);
                        return;
                    }
                }
            }
        }
    };
    // 选中时修改三维数组，修改checked值
    const setChecked = (key, value, allCheck, isChildren) => {
        let arr = JSON.parse(JSON.stringify(collapseList));
        console.log(key, value, arr);
        // 针对于元数组的选中处理
        if (key === 'SCHEMA' || (allCheck && value && !arr[0].checked && !isChildren)) {
            arr[0].children.forEach((item) => {
                item.checked = value;
            });
            arr[0].checked = value;
            setCollapseList(arr);
        }
        if (key === 'VERTEX') {
            if (value && arr[1].children && arr[1].children.length) {
                let newArr = JSON.parse(JSON.stringify(arr[1].children));
                arr[1].children = [];
                setVerte_children(newArr);
            } else if (!value && verte_children.length > 0) {
                arr[1].children = JSON.parse(JSON.stringify(verte_children));
                setVerte_children([]);
            }
            arr[1].checked = value;
            setCollapseList(arr);
            return;
        }
        if (key === 'EDGE') {
            if (value && arr[2].children && arr[2].children.length) {
                let newArr = JSON.parse(JSON.stringify(arr[2].children));
                arr[2].children = [];
                setEdge_children(newArr);
            } else if (!value && edge_children.length > 0) {
                arr[2].children = JSON.parse(JSON.stringify(edge_children));
                setEdge_children([]);
            }
            arr[2].checked = value;
            setCollapseList(arr);
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].key === key) {
                arr[i].checked = value;
                setCollapseList(arr);
                return;
            }
            if (arr[i].children && arr[i].children.length) {
                for (let j = 0; j < arr[i].children.length; j++) {
                    if (arr[i].children[j].key === key) {
                        arr[i].children[j].checked = value;
                        if (isChildren) {
                            const res = arr[0].children.every(item => item.checked)
                            arr[0].checked = res
                        }
                        setCollapseList(arr);
                        return;
                    }
                }
            }
        }
        return;
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
                        <div style={container_style}>
                            <span style={span_style}>{item.title}:</span>
                            <div style={div_style}>
                                <Button
                                    style={{ marginLeft: '20px' }}
                                    type="primary"
                                    size="small"
                                    shape="circle"
                                    disabled={see}
                                    danger
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        console.log(item, "xxx");
                                        deleteDom(item.only || item.key);
                                    }}
                                >
                                    -
                                </Button>
                            </div>
                        </div>
                    );
                }
                // 没有children且不可添加渲染
                if (!item.isAdd) {
                    return (
                        <div style={container_style}>
                            <span style={span_style}>{item.title}:</span>
                            <div style={div_style}>
                                <Switch
                                    checked={item.checked}
                                    disabled={see}
                                    onClick={(checked, e) => {
                                        e.stopPropagation();
                                        setChecked(item.key, checked, true, item.isChildren);
                                    }}
                                />
                            </div>
                        </div>
                    );
                }
                // 没有children且可添加渲染
                return (
                    <div style={container_style}>
                        <span style={span_style}>{item.title}:</span>
                        <div style={div_style}>
                            <Switch
                                checked={item.checked}
                                disabled={see}
                                onClick={(checked, e) => {
                                    e.stopPropagation();
                                    setChecked(item.key, checked, true, item.isChildren);
                                }}
                            />
                            <Button
                                style={{ marginLeft: '20px' }}
                                type="primary"
                                size="small"
                                shape="circle"
                                disabled={item.checked || see}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (item.type === 'type') {
                                        openAddPDom(item);
                                        return;
                                    }
                                    openAddDom(item);
                                }}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                );
            }
            // type中不可添加的渲染
            if (!item.isAdd) {
                return (
                    <Panel header={
                        <div style={container_style}>
                            <span style={{ marginRight: '20px' }}>{item.title}:</span>
                            <div style={div_style}>
                                <Switch
                                    checked={item.checked}
                                    disabled={see}
                                    onClick={(checked, e) => {
                                        e.stopPropagation();
                                        setChecked(item.key, checked, false, item.isChildren);
                                    }}
                                />
                            </div>
                        </div>
                    }
                        key={item.key}
                    >
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
                            disabled={see}
                            onClick={(checked, e) => {
                                e.stopPropagation();
                                setChecked(item.key, checked, false, item.isChildren);
                            }}
                        />
                        <Button
                            style={{ marginLeft: '20px' }}
                            type="primary"
                            size="small"
                            shape="circle"
                            disabled={item.checked||see}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (item.type === 'type') {
                                    openAddPDom(item);
                                    return;
                                }
                                openAddDom(item);
                            }}
                        >
                            +
                        </Button>
                    </div>
                } key={item.key}>
                    <Collapse>
                        {renderCollapse(item.children)}
                    </Collapse>
                </Panel>
            );
        });
    };
    // 选择器渲染函数
    const selectRender = (arr) => {
        if (!arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Option
                    key={item}
                    value={item}
                >
                    {item}
                </Option>
            );
        });
    };
    // 获取图列表
    const getGraphsList = () => {
        api.getGraphsName(appStore.tenant).then(res => {
            if (res.status === 200) {
                setGraphsSelect(res.data.graphs);
            }
        });
    };

    const pageChange = (pagination) => {
        let obj = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total
        };
        setPageObj(obj);
        // 需要后面补充参数值
        // onSearch('');
    };
    // 三维数据处理为一维
    const mapData = (arr) => {
        /*
        *   处理规则
        *   1. 判断元数据是否选中，选中则不遍历第一组数据里的children
        *       1.1 未选中则遍历第一组数据children，将被选中的值进行push，若4个都选中，则删除刚刚push的值，并push元数据
        *   2. 判断顶点是否选中，若选中则push，不遍历children
        *       2.1 未选中则查看是否有children，若有则进行遍历,若遍历的数据被选中则先push当前遍历数据，
        *       并再次查看当前数据是否有children，若有则再次遍历children，并将其中的所有数据以key名为
        *       properties存放进去（key value形式）
        *   3. 边同第二条
        *   4. 其他type值关心是否选中，选中则push，不做其他处理
        *   5. 返回处理好的结果
        */
        let list = [];
        // 元数据处理
        if (arr[0].checked) {
            list.push({
                type: 'SCHEMA'
            });
        } else {
            // 判断是否4个都选中了
            let childrenList = [];
            arr[0].children.forEach((item) => {
                if (item.checked) {
                    childrenList.push(item.key);
                }
            });
            if (childrenList.length === 4) {
                list.push({
                    type: 'SCHEMA'
                });
            } else if (childrenList.length) {
                childrenList.forEach((item) => {
                    list.push({
                        type: item
                    });
                });
            }
        }
        // 顶点处理
        if (arr[1].checked) {
            list.push({
                type: 'VERTEX'
            });
        } else if (arr[1].children && arr[1].children.length) {
            arr[1].children.forEach((item) => {
                if (item.checked) {
                    list.push(
                        {
                            type: 'VERTEX',
                            label: item.key
                        }
                    )
                    return;
                } else {
                    if (item.children && item.children.length) {
                        let obj = {
                            type: 'VERTEX',
                            label: item.key,
                            properties: {}
                        };
                        item.children.forEach((myItem) => {
                            obj.properties[myItem.key] = myItem.title.split('=')[1];
                        });
                        list.push(obj);
                    }
                }
            });
        }
        // 边处理
        if (arr[2].checked) {
            list.push({
                type: 'EDGE'
            });
        } else if (arr[2].children && arr[2].children.length) {
            arr[2].children.forEach((item) => {
                if (item.checked) {
                    list.push(
                        {
                            type: 'EDGE',
                            label: item.key
                        }
                    )
                } else {
                    if (item.children && item.children.length) {
                        let obj = {
                            type: 'EDGE',
                            label: item.key,
                            properties: {}
                        };
                        item.children.forEach((myItem) => {
                            obj.properties[myItem.key] = myItem.title.split('=')[1];
                        });
                        list.push(obj);
                    }
                }
            });
        }
        // 其他处理
        arr.forEach((item, index) => {
            if (index < 3) {
                return;
            }
            if (item.checked) {
                list.push({
                    type: item.key
                })
            }
        });
        return list;
    };
    // 一维数据处理为三维
    const mapNewData = (arr) => {
        if (!arr) {
            message.error("资源数据错误");
            return;
        }
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
        let list = JSON.parse(JSON.stringify(collapseListDefault));
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].type === 'ALL') {
                form.setFieldsValue({
                    ALL: true
                });
                return JSON.parse(JSON.stringify(collapseListDefault));
            }
            if (arr[i].type === 'SCHEMA') {
                list[0].checked = true;
                list[0].children.forEach((item) => {
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
                    checked: false,
                    isAdd: true,
                    key: arr[i].label,
                    type: 'label'
                });
                setCollapseKeyList([...collapseKeyListDefault, arr[i].label]);
                if (arr[i].properties) {
                    let myArr = myData.children;
                    myArr[myArr.length - 1].children = [];
                    let propArr=[]
                    for (let prop in arr[i].properties) {
                        myArr[myArr.length - 1].children.push({
                            title: prop + '=' + arr[i].properties[prop],
                            checked: true,
                            isAdd: false,
                            key: prop,
                            type: 'properties'
                        })
                        propArr.push(prop)
                    }
                    setCollapseKeyList([...collapseKeyListDefault, ...propArr]);
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
    const inputChange = (e) => {
        setInpValue(e.target.value);
    };
    return (
        <>
            <Modal
                title="查看schema"
                visible={seeVisible}
                onCancel={() => { setSeeVisible(false) }}
                footer={null}
            >
                <div style={{ minHeight: '200px' }}>
                    <Row>
                        <Col span={4}>schema: </Col>
                        <Col span={20}>{schemaData}</Col>
                    </Row>
                </div>
            </Modal>
            <Modal
                title="确认删除"
                visible={deleteConfirmKey}
                onCancel={() => { setDeleteConfirmKey(false) }}
                onOk={confirmDelete}
                okText="确认"
                cancelText="取消"
                style={{ "height": 200 }}
            >
                确定要删除{deleteData}吗？
            </Modal>
            <Modal
                title={eidtKey ? '确认编辑' : '确认创建'}
                visible={createConfirmKey}
                onCancel={() => { setCreateConfirmKey(false); }}
                onOk={confirmCreate}
                okText="确认"
                cancelText="取消"
                style={{ "height": 200 }}
            >
                确定要{eidtKey ? '修改' : '创建'}吗？
            </Modal>
            {/* 创建资源弹窗 */}
            <Modal
                title={see ? '查看' : (eidtKey ? '编辑' : '创建')}
                width={600}
                visible={createKey}
                onCancel={() => {
                    setCreateKey(false);
                    setEidtKey(false);
                    form.setFieldsValue({ target_name: '', target_graph: null, ALL: false });
                    setCollapseList(collapseListDefault);
                    setSee(false);
                    setCollapseKeyList(collapseKeyListDefault);
                }}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="资源名称"
                        name="target_name"
                        disabled={eidtKey}
                        rules={[
                            { required: true, message: '请输入资源名称!' },
                            { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '请输入正确的格式!' },
                            { max: 48, message: '最大长度为48个字符!' }
                        ]}
                    >
                        <Input disabled={see} placeholder="请输入资源名称" />
                    </Form.Item>
                    <Form.Item
                        label="图"
                        name="target_graph"
                        rules={[{ required: true, message: '请选择图!' }]}
                    >
                        <Select placeholder="请选择图" disabled={see}>
                            <Option
                                value={"*"}
                            >
                                所有
                            </Option>
                            {selectRender(graphsSelect)}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所有资源"
                        name="ALL"
                        valuePropName="checked"
                    >
                        <Switch disabled={see} />
                    </Form.Item>
                    <div className='myCollapse'>
                        <Collapse>
                            {renderCollapse(collapseList)}
                        </Collapse>
                    </div>
                    <Form.Item
                        style={see ? { display: 'none' } : {}}
                        wrapperCol={{ offset: 10, span: 12 }}
                    >
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <section className="graphData_wrapper">
                <div className="header_right">
                    <div className='header_right_div'>
                        <Search
                            placeholder="请输入资源名称"
                            value={inpValue}
                            onSearch={onSearch}
                            onChange={inputChange}
                            enterButton
                        />
                    </div>
                    <div className="header_right_btn">
                        <Button type="primary" onClick={openCreate}>创建资源</Button>
                    </div>
                </div>
                <div className="graphData_box">
                    <div className='mytable'>
                        <Table
                            dataSource={tableData}
                            pagination={{
                                current: pageObj.current,
                                total: pageObj.total
                            }}
                            onChange={pageChange}
                            rowKey="id"
                            loading={loading}
                        >
                            {renderTabel(tableKeyList)}
                            <Column
                                title='操作'
                                dataIndex='operation'
                                key='operation'
                                render={(text, record) => {
                                    return (
                                        <div className='table_btndiv'>
                                            <Button
                                                disabled={record.id === "DEFAULT_SPACE_TARGET"}
                                                onClick={() => { openSeeModal(record) }}
                                            >
                                                查看
                                            </Button>
                                            <Button
                                                disabled={record.id === "DEFAULT_SPACE_TARGET"}
                                                onClick={() => { openEditModal(record) }}
                                            >
                                                编辑
                                            </Button>
                                            <Button
                                                disabled={record.id === "DEFAULT_SPACE_TARGET"}
                                                onClick={() => { openDeleteConfirm(record) }}
                                            >
                                                删除
                                            </Button>
                                        </div>
                                    )
                                }}
                                fixed="right"
                                width={250}
                            />
                        </Table>
                    </div>
                </div>
            </section>
            {/* 添加label弹窗 */}
            <Modal
                title="添加"
                width={600}
                visible={addLabelKey}
                onCancel={() => {
                    setAddLabelKey(false);
                    form2.setFieldsValue({ label: '' });
                }}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={addDom}
                    autoComplete="off"
                    form={form2}
                >
                    <Form.Item
                        label="label"
                        name="label"
                        rules={[
                            { required: true, message: '请输入label!' }
                        ]}
                    >
                        <Input placeholder="请输入label" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            {/* 添加properties弹窗 */}
            <Modal
                title="添加"
                width={600}
                visible={addKey}
                onCancel={() => {
                    setAddKey(false);
                    form1.setFieldsValue({ key: '', value: '' });
                }}
                footer={null}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={addDom}
                    autoComplete="off"
                    form={form1}
                >
                    <Form.Item
                        label="key"
                        name="key"
                        rules={[
                            { required: true, message: '请输入key!' }
                        ]}
                    >
                        <Input placeholder="请输入key" />
                    </Form.Item>
                    <Form.Item
                        label="value"
                        name="value"
                        rules={[
                            { required: true, message: '请输入value!' }
                        ]}
                    >
                        <Input placeholder="请输入value" />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
