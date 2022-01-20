/*
 * @Author: your name
 * @Date: 2022-01-13 23:22:23
 * @LastEditTime: 2022-01-14 11:10:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/graph-management/data-analyze/DataAnalyze.tsx
 */
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRoute, useLocation } from 'wouter';
import { Modal, Button } from '@baidu/one-ui';

import DataAnalyzeContent from './DataAnalyzeContent';
import DataAnalyzeInfoDrawer from './DataAnalyzeInfoDrawer';
import DynamicAddNode from './DynamicAddNode';
import DynamicAddEdge from './DynamicAddEdge';
import {
  AppStoreContext,
  GraphManagementStoreContext,
  DataAnalyzeStoreContext
} from '../../../stores';
import './DataAnalyze.less';

const DataAnalyze: React.FC = observer(() => {
  
  const graphManagementStore = useContext(GraphManagementStoreContext);
  const appStore = useContext(AppStoreContext);
  const dataAnalyzeStore = useContext(DataAnalyzeStoreContext);
  const [match, params] = useRoute('/graph-management/:id/data-analyze');
  const [_, setLocation] = useLocation();

/* 
  const [tenant] = useState(appStore.tenant)
  const [graphs] = useState(appStore.graphs)
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    if (tenant !== appStore.tenant || graphs !== appStore.graphs) {
      setRefresh(true)
    }
  }, [appStore.tenant, appStore.graphs]) */


  useEffect(() => {
    appStore.setMenuObj({
      c_key: "1",
      f_key: "sub1"
    })
    appStore.setCurrentKey("0")
  }, [])
  useEffect(() => {

    window.scrollTo(0, 0);

    // if (graphManagementStore.requestStatus.fetchIdList !== 'success') {
    //   graphManagementStore.fetchIdList();
    // }

    return () => {
      dataAnalyzeStore.dispose();
    };
  }, [dataAnalyzeStore, graphManagementStore]);

  // Caution: Preitter will automatically add 'params' behind 'match' in array,
  // which is not equal each time
  /* eslint-disable */
  useEffect(() => {
    if (match && params !== null) {
      appStore.setCurrentId(Number(params.id));
      dataAnalyzeStore.setCurrentId(Number(params.id));
      dataAnalyzeStore.fetchValueTypes();
      dataAnalyzeStore.fetchVertexTypes();
      dataAnalyzeStore.fetchAllPropertyIndexes('vertex');
      dataAnalyzeStore.fetchEdgeTypes();
      dataAnalyzeStore.fetchAllNodeStyle();
      dataAnalyzeStore.fetchAllEdgeStyle();
    }
  }, [dataAnalyzeStore, match, params?.id,appStore.tenant,appStore.graphs]);

  return (
    <section className="data-analyze">
      <DataAnalyzeContent />
      <DataAnalyzeInfoDrawer />
      <DynamicAddNode />
      <DynamicAddEdge />
      <Modal
        title="无法访问"
        footer={[
          <Button
            size="medium"
            type="primary"
            style={{ width: 88 }}
            onClick={() => {
              setLocation('/');
            }}
          >
            返回首页
          </Button>
        ]}
        visible={graphManagementStore.graphData.some(
          ({ id, enabled }) => dataAnalyzeStore.currentId === id && !enabled
        )}
        destroyOnClose
        needCloseIcon={false}
      >
        <div style={{ color: '#333' }}>
          {dataAnalyzeStore.errorInfo.fetchExecutionLogs.message}
        </div>
      </Modal>
    </section>
  );
});

export default DataAnalyze;
