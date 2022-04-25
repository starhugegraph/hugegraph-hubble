export const userAuthArray = [
    {
        name: "ADMIN",
        authArray: [
            {
                key: "sub1",
                name: "数据管理",
                children: [{
                    key: "1",
                    name: "数据分析"
                },
                {
                    key: "2",
                    name: "数据维护"
                },
                {
                    key: "3",
                    name: "权限管理"
                },
                ]
            },
            {
                key: "sub2",
                name: "运维管理",
                children: [{
                    key: "4",
                    name: "服务"
                },
                {
                    key: "7",
                    name: "日志"
                },
                {
                    key: "8",
                    name: "审计"
                },
                {
                    key: "9",
                    name: "监控"
                }
                ]
            },
            {
                key: "sub3",
                name: "系统管理",
                children: [{
                    key: "5",
                    name: "图空间管理"
                },
                {
                    key: "6",
                    name: "用户管理"
                },
                ]
            },
            {
                key: "10",
                name: "K8S Token",
            },
        ]
    },
    {
        name: "SPACEADMIN",
        authArray: [{
            key: "sub1",
            name: "数据管理",
            children: [{
                key: "1",
                name: "数据分析"
            },
            {
                key: "2",
                name: "数据维护"
            },
            {
                key: "3",
                name: "权限管理"
            },
            ]
        },
        {
            key: "sub2",
            name: "运维管理",
            children: [{
                key: "4",
                name: "服务"
            },
            {
                key: "7",
                name: "日志"
            },
            {
                key: "8",
                name: "审计"
            },
            {
                key: "9",
                name: "监控"
            }
            ]
        },
        ]
    },
    {
        name: "USER",
        authArray: [{
            key: "sub1",
            name: "数据管理",
            children: [{
                key: "1",
                name: "数据分析"
            },
            {
                key: "2",
                name: "数据维护"
            },
            ]
        },]
    },
]
export const defaultMenuList = [
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
                name: '元数据配置'
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
                name: '用户角色管理'
            },
        ]
    },
    {
        tab: 'service',
        data: [
            {
                key: '0',
                name: '图服务'
            },
            {
                key: '1',
                name: '储存服务'
            },
            {
                key: '2',
                name: '计算任务'
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
                name: '图空间管理'
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
        data: null
    },
    {
        data: [
            {
                key: '0',
                name: 'Token详情'
            }
        ]
    }
];
