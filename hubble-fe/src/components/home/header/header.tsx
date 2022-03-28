import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter';
import { Select, Menu } from 'antd';
import api from '../../../api/api';

interface _Props {
    current: string,
    menuList: _Menu[],
    setCurrent: Function,
    appStore: any,
    getGraphsList: () => void,
    testKeyObj: { c_key: string, f_key: string }
}
interface _Menu {
    key: string,
    name: string,
}

function Header(
    {
        current,
        menuList,
        setCurrent,
        appStore,
        getGraphsList,
        testKeyObj
    }: _Props
) {
    // 当前选中的租户
    let [userActive, setUserActive] = useState('');
    // 当前租户列表
    let [userListSelect, setUserListSelect] = useState([]);
    // 路由地址
    const [_, setLocation] = useLocation();

    useEffect(() => {
        getTenantList()
    }, []);

    // 切换租户时触发
    const selectChange = (value: string) => {
        localStorage.setItem("tenant", value)
        appStore.setTenant(value);
        setUserActive(value);
        getGraphsList();
    };

    // 获取租户列表
    const getTenantList = () => {
        api.getGraphspacesList().then(res => {
            if (res.status === 200
                && res.data.graphspaces
                && res.data.graphspaces.length
            ) {
                const tenant = localStorage.getItem("tenant");
                if (tenant && res.data.graphspaces.some((i: string) => i === tenant)) {
                    appStore.setTenant(tenant);
                    setUserActive(tenant)
                } else {
                    let defaultGraphspaces = res.data.graphspaces[0]
                    appStore.setTenant(defaultGraphspaces);
                    setUserActive(defaultGraphspaces)
                }
                appStore.setGraphspaces(res.data.graphspaces)
                setUserListSelect(res.data.graphspaces);
            } else {
                setUserActive("获取失败")
            }
            getGraphsList()
        });
    };
    // 租户选择器渲染函数
    const selectRender = (arr: string[]) => {
        if (!arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Select.Option
                    key={item}
                    value={item}
                >
                    {item}
                </Select.Option>
            );
        });
    };
    // 头部导航菜单栏渲染函数
    const menuRender = (arr: _Menu[]) => {
        if (!arr.length) {
            return [];
        }
        return arr.map((item) => {
            return (
                <Menu.Item key={item.key}>
                    {item.name}
                </Menu.Item>
            );
        });
    };
    // 头部导航点击事件
    const handleClick = (e: any) => {
        setCurrent(e.key);
        if (testKeyObj.c_key === '1') {
            if (e.key === '0') {
                setLocation(`/graph-management/0/data-analyze`);
            } else if (e.key === '1') {
                setLocation(`/graph-management/0/async-tasks`);
            }
        } else if (testKeyObj.c_key === '2') {
            if (e.key === '0') {
                setLocation(`/graph-management/0/metadata-configs`);
            } else if (e.key === '1') {
                setLocation(`/graph-management/0/data-import/import-manager`);
            } else if (e.key === '2') {
                setLocation(`/graph-management/management`);
            } else if (e.key === '3') {
                setLocation(`/graph-management/schema`);
            }
        } else if (testKeyObj.c_key === '3') {
            if (e.key === '1') {
                setLocation(`/graph-management/resources`);
            } else if (e.key === "0") {
                setLocation(`/graph-management/0/role`)
            } else if (e.key === "2") {
                setLocation(`/graph-management/user`)
            }
        } else if (testKeyObj.c_key === "4") {
            if (e.key === "0") {
                setLocation(`/operations-management/1/service`)
            } else if (e.key === "1") {
                setLocation(`/operations-management/1/storage`)
            } else if (e.key === "2") {
                setLocation(`/operations-management/1/computing`)
            } else if (e.key === "3") {
                setLocation(`/operations-management/1/pd`)
            }
        } else if (testKeyObj.c_key === '5') {
            if (e.key === "0") {
                setLocation(`/system-management/2/tenant`)
            }
        }
    };
    return (
        <div className="header">
            <div className="header_user">
                <Select
                    value={userActive ? userActive : "加载中......"}
                    loading={userActive ? false : true}
                    style={{ width: 120 }}
                    bordered={false}
                    onChange={selectChange}
                >
                    {selectRender(userListSelect)}
                </Select>
            </div>
            <div className="header_menu">
                <Menu
                    onClick={handleClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    style={{ backgroundColor: "transparent" }}
                >
                    {menuRender(menuList)}
                </Menu>
            </div>
        </div>
    )
}
export default React.memo(Header)