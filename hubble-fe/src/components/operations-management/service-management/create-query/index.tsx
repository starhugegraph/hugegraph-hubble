import React, { ReactElement } from 'react'
import CreateFrom from './create-from'
import { Modal } from 'antd'
export default function Index(props: { visible: boolean, setVisible: Function, detailData: any,getQuery:Function}): ReactElement {
    const { visible, setVisible, detailData,getQuery} = props
    return (
        <Modal
            title={Object.keys(detailData).length===0?"创建查询":"编辑查询"}
            closable={false}
            visible={visible}
            footer={null}
        >
            <CreateFrom detailData={detailData} setVisible={setVisible} getQuery={getQuery}></CreateFrom>
        </Modal>
    )
}
