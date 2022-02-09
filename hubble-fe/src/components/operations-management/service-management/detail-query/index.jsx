import React, { useState, useEffect, useContext } from 'react'
import { Descriptions, Modal } from 'antd';
import api from '../../../../api/api'
/* let demoData =
{
    "status": 200,
    data: {
        "service": "xxx1",
        "graphspace": "namespace1",
        "run_type": "容器",
        "ready": "1/3",
        "status": "running",
        "create_time": "2020/9/13",
        "url": "www.123123.com",
        node_max: "3",
        cpu_max: "4",
        memory_max: "5",
        nodes: ["111.222.333", "222.333.444", "333.444.555"]
    },
    "message": "msg",
    "cause": ""
} */
function Index(props) {
    const { visibleDetail, setVisibleDetail, detailData, tenant } = props
    const [getDetailData, setGetDetailData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(detailData.name){
            api.getQueryDetail(tenant, detailData.name).then(res => {
                if(res&&res.status===200){
                    setGetDetailData(res.data)
                }
            })
        }
    }, [detailData])
    return (
        <Modal
            title="详情查询"
            visible={visibleDetail}
            footer={null}
            onCancel={() => setVisibleDetail(false)}
        >
            {getDetailData ? <Descriptions column={2}>
                <Descriptions.Item label="实例名称">{getDetailData.name}</Descriptions.Item>
                <Descriptions.Item label="租户">{getDetailData.graphspace}</Descriptions.Item>
                <Descriptions.Item label="创建时间">{getDetailData.create_time}</Descriptions.Item>
                <Descriptions.Item label="运行方式">{getDetailData.deployment_type === 'MANUAL' ? '手动' : '容器'}</Descriptions.Item>
                <Descriptions.Item label="访问地址"
                    contentStyle={{ display: 'flex', flexDirection: "column" }}
                >
                    {getDetailData.urls.map(item => (<p key={item}>{item}</p>))}
                </Descriptions.Item>
                {
                    getDetailData.deployment_type === "K8S" ?
                        <>
                            <Descriptions.Item label="实例最大个数">{getDetailData.count}</Descriptions.Item>
                            <Descriptions.Item label="CPU最大值">{getDetailData.cpu_limit}</Descriptions.Item>
                            <Descriptions.Item label="内存最大值">{getDetailData.memory_limit}</Descriptions.Item>
                        </>
                        : null
                }
                <Descriptions.Item label="实例IP" contentStyle={{ display: 'flex', flexDirection: "column" }}>
                    {
                        getDetailData.nodes ? getDetailData.nodes.map(item => (<p key={item}>{item}</p>)) : null
                    }
                </Descriptions.Item>
            </Descriptions> : null}
        </Modal>
    )
}
export default React.memo(Index)