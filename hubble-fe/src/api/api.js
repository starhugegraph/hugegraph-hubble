/*
 * @Author: your name
 * @Date: 2022-01-08 16:50:39
 * @LastEditTime: 2022-01-14 11:04:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/api/api.js
 */

import myaxios from './index';
import axios from 'axios'
import { message } from 'antd';
// 获取用户信息
const getUser = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post('/auth/login', data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 登出
const outLogin = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get('/auth/logout').then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取图列表
const getGraphs = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 查看图的schema
const getSeeSchema = (graphspace, graph, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/schema/groovy`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 导出图的schema
const exportSchema = (graphspace, graph) => {
    window.open(`${myaxios.baseURL}/graphspaces/${graphspace}/graphs/${graph}/schema/groovy/export`);
};

// 创建图
const createGraph = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.postForm(`/graphspaces/${graphspace}/graphs`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 获取图名列表
const getGraphsName = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 清空图
const deleteSchema = (graphspace, graph, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/truncate`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 清空图
const deleteGraphs = (graphspace, graph) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`graphspaces/${graphspace}/graphs/${graph}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// schema列表
const getSchemaList = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 查看schema模板
const seeSchema = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 获取schema名列表
const getSchemaNameList = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/schematemplates/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 创建Schema
const createSchema = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/schematemplates`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 编辑Schema
const editSchema = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/schematemplates/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 删除Schema
const mydeleteSchema = (graphspace, name) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/schematemplates/${name}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 资源列表
const getResourcesList = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/targets`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 创建资源
const createResources = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/targets`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 查看资源
const seeResources = (graphspace, id) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/targets/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 编辑资源
const editResources = (graphspace, id, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/auth/targets/${id}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

// 删除资源
const deleteResources = (graphspace, id) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/auth/targets/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取查询服务列表
const getQueryList = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/services/oltp`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除查询服务
const deleteQuery = (graphspace, name) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/services/oltp/${name}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 添加查询服务
const addQueryData = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/services/oltp`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取查询服务详情
const getQueryDetail = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/services/oltp/${data}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 编辑查询服务
const changeQueryDetail = (graphspace, name, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/services/oltp/${name}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取租户table数据
const getGraphspaces = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取租户list
const getGraphspacesList = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 添加租户
const addGraphspacesList = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 修改租户
const putGraphspaces = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除租户
const deleteGraphspaces = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${data}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取用户list
const getUserList = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/auth/users/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取用户table
const getUserTable = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/auth/users`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 新增用户
const addUser = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/auth/users`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 编辑用户
const putUser = (id, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/auth/users/${id}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除用户
const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/auth/users/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取角色table
const getRole = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/groups`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 新增角色
const addRole = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/groups`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 编辑角色
const putRole = (graphspace, id, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/auth/groups/${id}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除角色
const deleteRole = (graphspace, id, data) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/auth/groups/${id}`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 查看关联资源
const lookAssResources = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/accesses`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 新增关联资源
const assResources = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/accesses`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 编辑关联资源
const putAssResources = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.put(`/graphspaces/${graphspace}/auth/accesses`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除关联资源
const deleteAssResources = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/auth/accesses`, { params: { group_id: data.group_id, target_id: data.target_id } })
            .then(res => {
                resolve(res);
            }, error => {
                reject(error);
            });
    });
};
// 批量删除关联用户
const deleteAssUserArray = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/belongs/delids`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 单独删除关联用户
const deleteAssUser = (graphspace, id) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/auth/belongs/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 查看关联用户
const lookAssUsers = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/belongs`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 关联用户
const AssUsers = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/belongs/ids`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 所有角色query
const allRoleList = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/groups/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取权限管理下的用户table
const getAuthUser = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/users`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 添加权限管理下的用户
const postAuthUser = (graphspace, data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/graphspaces/${graphspace}/auth/users`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除权限管理下的用户
const deleteAuthUser = (graphspace, id) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/auth/users/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 查看详情
const getTargetDetailData = (graphspace, id) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/targets/${id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取资源list
const getTargetsList = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/auth/targets/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取资源详情
const getDetailTenant = (name) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${name}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 用户管理员权限
const getSiderAuthUser = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/auth/status`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 获取日志列表
const getLogTableData = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/logs/query`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 审计服务list
const getAuditServicesList = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/audits/services/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 服务list
const getLogsServicesList = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`logs/services/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 日志级别list
const getLogsLevelList = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/logs/levels/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 主机list
const getHostList = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/logs/hosts/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 储存服务
const getStorageTableData = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/services/storage`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 储存服务详情
const getStorageDetailData = (node_id) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/services/storage/nodes/${node_id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 计算服务
const getComputeTableData = (graphspace, graph, data) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/jobs/computerdis`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 计算服务详情
const getComputeDetail = (graphspace, graph, task_id) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/jobs/computerdis/${task_id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 停止计算服务
const stopComputeDetail = (graphspace, graph, task_id) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/graphspaces/${graphspace}/graphs/${graph}/jobs/computerdis/${task_id}/cancel`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 删除计算服务
const deleteCompute = (graphspace, graph, task_id) => {
    return new Promise((resolve, reject) => {
        myaxios.delete(`/graphspaces/${graphspace}/graphs/${graph}/jobs/computerdis/${task_id}`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 审计
const getAuditTableData = (data) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/audits/query`, data).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 审计操作类型list
const getOperationList = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/audits/operations/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 监控
const gotoMonitoring = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/monitor`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// PD状态数据
const getPdTableData = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/pds/status`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 导出日志
const outTheData = (url, data) => {
    message.warning("正在下载中,请稍等......")
    axios.post(myaxios.baseURL + url, data, {
        // responseType: 'arraybuffer',
        "Content-Type": "application/json"
    }).then(response => {
        /*  const fileType = [
             'application/vnd.ms-excel;charset=utf-8', // xls
             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' // xlsx
         ] */
        const blob = new Blob([response.data])
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob);
        const contentDisposition = response.headers['content-disposition']
        const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*')
        const result = patt.exec(contentDisposition)
        if (!result) result = ['out','out'];
        const filename = decodeURI(escape(result[1])) // 处理文件名,解决中文乱码问题
        downloadElement.style.display = 'none'
        downloadElement.href = href
        downloadElement.download = filename // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        message.success("下载成功")
        window.URL.revokeObjectURL(href) // 释放掉blob对象
    }).catch(err => {
        message.error("下载失败,请重试" + "错误信息：" + err)
    })
};
// 服务配置list
const configsList = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`graphspaces/${graphspace}/services/oltp/options/list`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 服务启动
const queryStart = (graphspace, service) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`graphspaces/${graphspace}/services/oltp/${service}/start`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 服务启动
const queryEnd = (graphspace, service) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`graphspaces/${graphspace}/services/oltp/${service}/stop`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 储存服务集群状态
const StorageCluster = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/services/storage/status`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 储存服务数据分裂
const StorageClusterSplit = () => {
    return new Promise((resolve, reject) => {
        myaxios.get(`/services/storage/split`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 上线
const StorageLine = (node) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/services/storage/nodes/startup`, node).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
// 下线
const StorageOutline = (node) => {
    return new Promise((resolve, reject) => {
        myaxios.post(`/services/storage/nodes/shutdown`, node).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};
//图空间鉴权
const graphspaceAuth = (graphspace) => {
    return new Promise((resolve, reject) => {
        myaxios.get(`graphspaces/${graphspace}/auth`).then(res => {
            resolve(res);
        }, error => {
            reject(error);
        });
    });
};

export default {
    graphspaceAuth,
    queryEnd,
    queryStart,
    StorageClusterSplit,
    StorageOutline,
    StorageLine,
    StorageCluster,
    configsList,
    deleteGraphs,
    deleteCompute,
    stopComputeDetail,
    getLogsServicesList,
    getLogsLevelList,
    getComputeDetail,
    outTheData,
    getStorageDetailData,
    getPdTableData,
    gotoMonitoring,
    getOperationList,
    getAuditTableData,
    getComputeTableData,
    getStorageTableData,
    getHostList,
    getAuditServicesList,
    getLogTableData,
    getSiderAuthUser,
    getDetailTenant,
    outLogin,
    deleteRole,
    deleteAssUserArray,
    deleteAssUser,
    putAssResources,
    assResources,
    getTargetsList,
    getTargetDetailData,
    deleteAuthUser,
    postAuthUser,
    getAuthUser,
    allRoleList,
    AssUsers,
    lookAssUsers,
    deleteAssResources,
    lookAssResources,
    putRole,
    addRole,
    getRole,
    getUserTable,
    addUser,
    putUser,
    deleteUser,
    getUserList,
    getUser,
    getGraphs,
    getSeeSchema,
    createGraph,
    exportSchema,
    deleteSchema,
    getGraphsName,
    getResourcesList,
    createResources,
    seeResources,
    editResources,
    deleteResources,
    getSchemaList,
    seeSchema,
    createSchema,
    editSchema,
    getSchemaNameList,
    mydeleteSchema,
    getQueryList,
    deleteQuery,
    addQueryData,
    getQueryDetail,
    changeQueryDetail,
    getGraphspaces,
    getGraphspacesList,
    addGraphspacesList,
    putGraphspaces,
    deleteGraphspaces
};