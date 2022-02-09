/*
 * @Author: your name
 * @Date: 2021-12-28 10:59:07
 * @LastEditTime: 2022-01-05 14:20:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/common/AppBar.tsx
 */
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { message, Popconfirm } from 'antd';
import api from '../../api/api'

import './AppBar.less';

const AppBar = ({ setLogin }) => {
  const [_, setLocation] = useLocation();
  const [loading, setLoading] = useState(false)
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")))
  const setRoute = useCallback(
    (route) => () => {
      setLocation(route);
    },
    [setLocation]
  );

  useEffect(() => {
    if (!(userInfo.user_name)) {
      setLogin(false)
      localStorage.setItem("lg", "false")
    }
  }, [])

  // 登出
  const outLog = () => {
    setLoading(true)
    api.outLogin().then(res => {
      if (res && res.status === 200) {
        message.warning("已退出")
        setLogin("false")
        localStorage.setItem("lg", "false")
        localStorage.removeItem("userInfo")
      }
      setLoading(false)
    })
  }

  return (
    <nav className="navigator">
      <div className="navigator-logo" onClick={setRoute('/')}></div>
      {/* < className="navigator-items">
        <div
          className="navigator-item active"
          onClick={setRoute('/graph-management')}
        >
          <span>图管理1</span>
        </div>
      </div> */}
      <div className="navigator-additions">
        <span
          className="navigator-additions-img"
        ></span>
        <Popconfirm
          title="确定要退出吗?"
          okText="确定"
          okType="danger"
          cancelText="取消"
          onConfirm={outLog}
          loading={loading}
        >
          <span style={{ color: "#69c0ff", cursor: "pointer" }}>{userInfo != null ? userInfo.user_name : null}</span>
        </Popconfirm>
      </div>
    </nav>
  );
}

export default AppBar;
