import React, { useState, useEffect } from 'react'
import { Descriptions, Modal, Skeleton, Tag } from 'antd';
import api from '../../../../api/api'

function Index({ visibleDetail, setVisibleDetail, detailData, tenant }) {
    const [getDetailData, setGetDetailData] = useState(null)

    useEffect(() => {
        if (detailData.name) {
            api.getQueryDetail(tenant, detailData.name).then(res => {
                if (res && res.status === 200) {
                    setGetDetailData(res.data)
                }
            })
        }
        return () => {
            setGetDetailData(null)
        }
    }, [detailData])

    return (
        <Modal
            title="查询服务详情"
            visible={visibleDetail}
            footer={null}
            onCancel={() => setVisibleDetail(false)}
        >
            <Skeleton loading={!getDetailData} active>
                {getDetailData ? <Descriptions column={1}>
                    <Descriptions.Item label="实例名称">{getDetailData.name}</Descriptions.Item>
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
                    <Descriptions.Item
                        label="配置信息"
                        contentStyle={{ display: 'flex', flexDirection: "column" }}
                    >
                        {
                            Object.keys(getDetailData.configs).map(item => (
                                <div
                                    style={{ margin: "3px 0px", fontSize: "14px" }}
                                    key={item}
                                >
                                    <Tag
                                        style={{ float: "left", fontSize: "14px" }}
                                        color="orange"
                                    >
                                        {item}
                                    </Tag>
                                    :&nbsp;{getDetailData.configs[item]
                                    }
                                </div>
                            ))
                        }
                    </Descriptions.Item>
                </Descriptions> : null}
            </Skeleton>
        </Modal>
    )
}
export default React.memo(Index)