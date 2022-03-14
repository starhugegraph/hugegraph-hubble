import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter';
import api from '../../../api/api'
import { Menu } from 'antd'
import { SnippetsOutlined } from '@ant-design/icons';
import { userAuthArray } from '../../../configs/userAuth';

interface _Props {
  setCurrent: Function,
  setMenuList: (params: any[]) => void,
  defaultMenuList: any[],
  testKeyObj: { c_key: string, f_key: string }
}
function SiderC({
  setCurrent,
  setMenuList,
  defaultMenuList,
  testKeyObj
}: _Props) {
  // 路由地址
  const [_, setLocation] = useLocation();
  // 左侧菜单状态
  let [userMenu, setUserMenu] = useState([]);
  // 左侧菜单
  useEffect(() => {
    api.getSiderAuthUser().then(res => {
      if (res.status === 200) {
        let target = userAuthArray.find(item => item.name === res.data.level)
        if (target) setUserMenu(target.authArray as any)
      }
    })
  }, []);
  // 左侧菜单栏点击事件
  const menuLeftClick = (e: any) => {
    setCurrent('0');
    (e.key !== '9') && setMenuList(defaultMenuList[e.key - 1].data);
    if (e.key === '1') {
      setLocation(`/graph-management/0/data-analyze`);
    } else if (e.key === '2') {
      setLocation(`/graph-management/0/metadata-configs`);
    } else if (e.key === '3') {
      setLocation(`/graph-management/0/role`)
    } else if (e.key === '4') {
      setLocation(`/operations-management/1/service`)
    } else if (e.key === '5') {
      setLocation(`/system-management/2/tenant`)
    } else if (e.key === '6') {
      setLocation(`/system-management/2/User`)
    } else if (e.key === '7') {
      setLocation(`/operations-management/1/log`)
    } else if (e.key === '8') {
      setLocation(`/operations-management/1/Audit`)
    } else if (e.key === '9') {
      api.gotoMonitoring().then(res => {
        if (res.status === 200) {
          window.open(res.data.url)
        }
      })
    }
  };
  // 左侧菜单根据用户权限渲染
  const leftMenuAuth = (arr: any[]) => {
    return arr.map(item => {
      if (!item.children) {
        return (<Menu.Item key={item.key}>{item.name}</Menu.Item>)
      } else {
        return (<Menu.SubMenu key={item.key} icon={<SnippetsOutlined />} title={item.name}>
          {leftMenuAuth(item.children)}
        </Menu.SubMenu>)
      }
    })
  }

  return (
    <div className="leftTab">
      <Menu
        onClick={menuLeftClick}
        style={{ width: 256 }}
        selectedKeys={[testKeyObj.c_key]}
        defaultOpenKeys={[testKeyObj.f_key]}
        mode="inline"
      >
        {leftMenuAuth(userMenu)}
      </Menu>
    </div>
  )
}
export default React.memo(SiderC)