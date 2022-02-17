/*
 * @Author: your name
 * @Date: 2022-01-05 14:38:56
 * @LastEditTime: 2022-01-14 18:50:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/home/home.js
 */
import React, { useState, useContext, useEffect, useMemo } from 'react';
import './Home.less';
import { Select, Menu, Layout } from 'antd';
import {
    AppStoreContext,
} from '../../stores';
import { Route, Router, useLocation, Redirect, Switch } from 'wouter';
import {
    DataAnalyze,
    MetadataConfigs,
    ImportTasks,
    ImportManager,
} from '../graph-management';
import GraphData from '../graphManagementHook/graphManagement/graphData/GraphData';
import GraphSchema from '../graphManagementHook/graphManagement/graphSchema/GraphSchema';
import Resources from '../graphManagementHook/graphManagement/resources/Resources';
import {
    QueryServiceList,
    StorageService,
    ComputingServices,
    LogManagement,
    AuditManagement,
    PdService
} from '../operations-management'
import { TenantManagement, UserManagement } from '../system-management'
import RoleManagement from '../role-management';
import PerUserManagement from '../user-management'
import HeaderC from './header/header';
import SiderC from './sider'
import Not404Find from '../404'
import api from '../../api/api';

import {
    TaskErrorLogs,
    JobErrorLogs
} from '../graph-management/data-import/import-tasks/error-logs';
import { AsyncTaskList } from '../graph-management';
import AsyncTaskResult from '../graph-management/async-tasks/AsyncTaskResult';
import { useLocationWithConfirmation } from '../../hooks';
import { compKeyObj } from '../../stores/utils'

const { Option } = Select;
const { Header, Sider, Content } = Layout;
const defaultMenuList = [
    {
        tab: 'dataAnalysis',
        data: [
            {
                key: '0',
                name: 'Gremlin分析'
            },
            {
                key: '1',
                name: '任务管理'
            },
        ]
    },
    {
        tab: 'dataMaintenance',
        data: [
            {
                key: '0',
                name: '原数据配置'
            },
            {
                key: '1',
                name: '数据导入'
            },
            {
                key: '2',
                name: '图管理'
            },
            {
                key: '3',
                name: 'schema模版管理'
            },
        ]
    },
    {
        tab: 'jurisdiction',
        data: [
            {
                key: '0',
                name: '角色管理'
            },
            {
                key: '1',
                name: '资源管理'
            },
            {
                key: '2',
                name: '用户管理'
            },
        ]
    },
    {
        tab: 'service',
        data: [
            {
                key: '0',
                name: '查询服务'
            },
            {
                key: '1',
                name: '储存服务'
            },
            {
                key: '2',
                name: '计算服务'
            },
            {
                key: '3',
                name: 'PD状态'
            },
        ]
    },
    {
        tab: 'graphspace',
        data: [
            {
                key: '0',
                name: '租户管理'
            }
        ]
    },
    {
        tab: 'userManagement',
        data: [
            {
                key: '0',
                name: '用户管理'
            }
        ]
    },
    {
        tab: 'logManagement',
        data: [
            {
                key: '0',
                name: '日志检索'
            }
        ]
    },
    {
        tab: 'auditManagement',
        data: [
            {
                key: '0',
                name: '审计'
            }
        ]
    },
    {
        tab: 'monitoringManagement',
        data: [
            {
                key: '0',
                name: '监控'
            }
        ]
    },
];
const Home = () => {
    console.log(1);
    let appStore = useContext(AppStoreContext);
    // 头部导航当前选中值
    let [current, setCurrent] = useState('0');
    // 头部导航菜单数据
    let [menuList, setMenuList] = useState([]);
    // 路由地址
    const [_, setLocation] = useLocation();
    // 图名选择框loading
    let [graphsLoading, setGraphsLoading] = useState(false);
    // 当前选中的图
    let [graphsActive, setGraphsActive] = useState('');
    // 当前图列表
    let [graphsSelect, setGraphsSelect] = useState([]);

    useEffect(() => {
        setGraphsActive(appStore.graphs === "null" ? "暂无" : appStore.graphs);
    }, [appStore.graphs]);

    // 获取图列表
    const getGraphsList = async () => {
        setGraphsLoading(true)
        if (appStore.tenant !== 'null') {
            const res = await api.getGraphsName(appStore.tenant)
            setGraphsLoading(false)
            if (res.status === 200
                && res.data.graphs
                && res.data.graphs.length) {
                appStore.setGraphs(res.data.graphs[0]);
                setGraphsSelect(res.data.graphs);
                return;
            }
            appStore.setGraphs("null");
            setGraphsSelect([]);
        }
    };

    // 租户选择器渲染函数
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
    
    // 切换图名
    const selectGraphsChange = (value) => {
        appStore.setGraphs(value);
        setGraphsActive(value);
    };
    /**
     * @description: 判断是否展示右侧选择图名的头部导航
     * @param {左侧一级导航} f_key
     * @param {左侧二级导航} c_key
     * @param {头部导航} header_key
     * @return {是否展示} bool
     */
    const show_right_header = useMemo(() => {
        if (_ === "/") {
            setCurrent("0")
            setMenuList(defaultMenuList[0].data)
        }
        if (_ === "/graph-management/0/data-analyze"
            || _ === "/graph-management/0/async-tasks"
            || _ === "/graph-management/0/metadata-configs"
            || _ === "/graph-management/0/data-import/import-manager"
            || _ === "/operations-management/1/computing"
            || _ === "/"
        ) return true
        return false
    }, [_])

    // keyObj
    const testKeyObj = useMemo(() => {
        let res = compKeyObj(_)
        setMenuList(defaultMenuList[+res.menuObj.c_key - 1].data)
        setCurrent(res.headerCurrentKey)
        return res.menuObj
    }, [_])

    return (
        <div className='wrapper'>
            <Layout>
                <Header>
                    <HeaderC
                        current={current}
                        menuList={menuList}
                        setCurrent={setCurrent}
                        appStore={appStore}
                        getGraphsList={getGraphsList}
                        testKeyObj={testKeyObj}
                    ></HeaderC>
                </Header>
                <Layout>
                    <Sider>
                        <div className="leftTab">
                            <SiderC
                                appStore={appStore}
                                setCurrent={setCurrent}
                                setMenuList={setMenuList}
                                defaultMenuList={defaultMenuList}
                                testKeyObj={testKeyObj}
                            ></SiderC>
                        </div>
                    </Sider>
                    <Content>
                        <div className="right_content">
                            <div
                                className={
                                    show_right_header ?
                                        'right_content_header' : 'right_content_header none'
                                }
                            >
                                <div className="right_content_header_select">
                                    <Select
                                        value={graphsActive}
                                        loading={graphsLoading}
                                        style={{ width: 120 }}
                                        bordered={false}
                                        onChange={selectGraphsChange}
                                    >
                                        {selectRender(graphsSelect)}
                                    </Select>
                                </div>
                            </div>
                            {appStore.tenant !== "null" ? <Router hook={useLocationWithConfirmation}>
                                <Switch>
                                    <Route
                                        path="/graph-management/:id/data-import/:jobId/task-error-log/:taskId"
                                        component={TaskErrorLogs}
                                    />
                                    <Route
                                        path="/graph-management/:id/data-import/job-error-log/:jobId"
                                        component={JobErrorLogs}
                                    />
                                    <Route
                                        path="/graph-management/:id/async-tasks/:taskId/result"
                                        component={AsyncTaskResult}
                                    />
                                    <Route
                                        path="/graph-management/:id/data-analyze"
                                        component={DataAnalyze}
                                    />
                                    <Route
                                        path="/graph-management/:id/metadata-configs"
                                        component={MetadataConfigs}
                                    />
                                    <Route
                                        path="/graph-management/:id/data-import/:jobId/import-tasks"
                                        component={ImportTasks}
                                    />
                                    <Route
                                        path="/graph-management/:id/data-import/import-manager/:rest*"
                                        component={ImportManager}
                                    />
                                    <Route
                                        path="/graph-management/:id/async-tasks"
                                        component={AsyncTaskList}
                                    />
                                    {/* <Route path="/graph-management" component={GraphManagement} /> */}
                                    <Route
                                        path="/graph-management/management"
                                        component={GraphData}
                                    />
                                    <Route
                                        path="/graph-management/schema"
                                        component={GraphSchema}
                                    />
                                    <Route
                                        path="/graph-management/resources"
                                        component={Resources}
                                    />
                                    <Route
                                        path="/graph-management/0/role"
                                        component={RoleManagement}
                                    />
                                    <Route
                                        path="/graph-management/user"
                                        component={PerUserManagement}
                                    />
                                    <Route
                                        path="/operations-management/1/service"
                                        component={QueryServiceList}
                                    />
                                    <Route
                                        path="/operations-management/1/storage"
                                        component={StorageService}
                                    />
                                    <Route
                                        path="/operations-management/1/computing"
                                        component={ComputingServices}
                                    />
                                    <Route
                                        path="/system-management/2/tenant"
                                        component={TenantManagement}
                                    />
                                    <Route
                                        path="/system-management/2/User"
                                        component={UserManagement}
                                    />
                                    <Route
                                        path="/operations-management/1/log"
                                        component={LogManagement}
                                    />
                                    <Route
                                        path="/operations-management/1/Audit"
                                        component={AuditManagement}
                                    />
                                    <Route
                                        path="/operations-management/1/pd"
                                        component={PdService}
                                    />
                                    <Route
                                        path="/"
                                        component={DataAnalyze}
                                    />
                                    <Route
                                        path="/404"
                                        component={Not404Find}
                                    />
                                    <Redirect from="*" to="/404" />
                                </Switch>
                            </Router> : null}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
export default Home