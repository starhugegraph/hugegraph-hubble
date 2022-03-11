import React, { ReactElement } from 'react'
import CreateFrom from './create-from'
import { Modal } from 'antd'
function Index({ visible, setVisible, detailData,getQuery}: { visible: boolean, setVisible: Function, detailData: any,getQuery:Function}): ReactElement {
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
export default React.memo(Index)