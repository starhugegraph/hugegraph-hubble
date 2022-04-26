import React, { useEffect, useState } from 'react';
import api from '../../api/api.js';

function Index() {
  const [data, setData] = useState({ token: '' });
  useEffect(() => {
    api.getK8sToken().then((res) => {
      if (res.status === "200") {
        setData(res.data);
      }
    });
  }, []);
  return (
    <div className="query_list_container graphData_wrapper">
      <div className="topDiv"></div>
      <div style={{ fontSize: '22px' }}>K8s Token:</div>
      <div style={{ fontSize: '16px' }}>{data.token}</div>
    </div>
  );
}
export default React.memo(Index);
