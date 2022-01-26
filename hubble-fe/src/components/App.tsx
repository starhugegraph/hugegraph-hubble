/*
 * @Author: your name
 * @Date: 2021-12-28 10:53:00
 * @LastEditTime: 2022-01-06 10:28:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/App.tsx
 */
import React, { useState } from 'react';
import { AppBar } from './common';
import Login from './login'
import 'antd/dist/antd.css';
import GraphManagementSidebar from './graph-management/GraphManagementSidebar';
import Home from './home/Home';
import './operations-management/service-management/queryServiceList.less'

(Date.prototype as any).Format = function (fmt:string) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? ((o as any)[k]) : (("00" + (o as any)[k]).substr(("" + (o as any)[k]).length)));
    return fmt;
}
const App: React.FC = () => {
  const [isLogin, setLogin] = useState(localStorage.getItem('lg'))
  return (
    <div>
      {isLogin==="true" ?
        <>
          <AppBar setLogin={setLogin}/>
          <GraphManagementSidebar />
          <Home />
        </> :
        <Login setLogin={setLogin}></Login>
      }
    </div>
  );
};

export default App;
