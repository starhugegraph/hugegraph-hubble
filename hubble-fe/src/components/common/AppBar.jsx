/*
 * @Author: your name
 * @Date: 2021-12-28 10:59:07
 * @LastEditTime: 2022-01-05 14:20:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/components/common/AppBar.jsx
 */
import React, { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { message,  Tooltip,Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import storageFn from '../../utils/storage'
import api from '../../api/api'
import './AppBar.less';

const { confirm } = Modal;
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
    if (!(userInfo)) {
      message.warning("请先登录")
      setLogin(false)
      localStorage.setItem("lg", "false")
    }
  }, [])

  // 登出
  const outLog = () => {
    setLoading(true)
    api.outLogin().then(res => {
      setLoading(false)
      if (res && res.status === 200) {
        message.warning("已退出")
        localStorage.setItem("lg", "false")
        storageFn.removeStorage(["tenant", "userInfo"])
        setLogin("false")
      }
    })
  }

  const confirmModal = () => confirm({
    title: '你想要退出吗?',
    icon: <ExclamationCircleOutlined />,
    content: '确认退出后会自动跳转登陆界面',
    onOk() {
      outLog()
    }
  });

  return (
    <nav className="navigator">
      <div className="navigator-logo" onClick={setRoute('/')}></div>
      <div className="navigator-additions">
        <span
          className="navigator-additions-img"
        ></span>
          <Tooltip title="点击可注销登录">
            <span onClick={confirmModal}>{userInfo != null ? userInfo.user_name : null}</span>
          </Tooltip>
      </div>
    </nav>
  );
}

export default AppBar;
