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
import './App.less'


const App: React.FC = () => {
  const [isLogin, setLogin] = useState(localStorage.getItem('lg'))
  return (
    <div>
      {isLogin === "true" ?
        <>
          <AppBar setLogin={setLogin} />
          <GraphManagementSidebar />
          <Home />
        </> :
        <Login setLogin={setLogin}></Login>
      }
    </div>
  );
};

export default App;
