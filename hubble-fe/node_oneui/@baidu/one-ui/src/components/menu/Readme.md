导航

author: huangshiming

一级导航
```js
handleClick = e => {
  setState({
      current: e.key
  })
}
initialState = {current: "1"};
<Menu
        onClick={this.handleClick}
        selectedKeys={[state.current]}
        mode="horizontal"
        menuLevel="1"
      >
        <Menu.Item key="1">
          项目一
        </Menu.Item>
        <Menu.Item key="2">
          项目二
        </Menu.Item>
        <Menu.Item key="3">
          项目三
        </Menu.Item>
        <Menu.Item key="4">
          项目四
        </Menu.Item>
        <Menu.Item key="5">
          项目五
        </Menu.Item>
        <Menu.Item key="6" disabled>
          项目六
        </Menu.Item>
      </Menu>
```

二级导航
```js
handleClick = e => {
  setState({
      current: e.key
  })
}
initialState = {current: "1"};
<Menu
        onClick={this.handleClick}
        selectedKeys={[state.current]}
        mode="horizontal"
        menuLevel="2"
      >
        <Menu.Item key="1">
          项目一
        </Menu.Item>
        <Menu.Item key="2">
          项目二
        </Menu.Item>
        <Menu.Item key="3">
          项目三
        </Menu.Item>
        <Menu.Item key="4">
          项目四
        </Menu.Item>
        <Menu.Item key="5">
          项目五
        </Menu.Item>
        <Menu.Item key="6" disabled>
          项目六
        </Menu.Item>
      </Menu>
```

三级导航
```js
handleClick = e => {
  setState({
      current: e.key
  })
}
initialState = {current: "1"};
<Menu
        onClick={this.handleClick}
        selectedKeys={[state.current]}
        mode="horizontal"
        menuLevel={3}
      >
        <Menu.Item key="1">
          项目一
        </Menu.Item>
        <Menu.Item key="2">
          项目二
        </Menu.Item>
        <Menu.Item key="3">
          项目三
        </Menu.Item>
        <Menu.Item key="4">
          项目四
        </Menu.Item>
        <Menu.Item key="5">
          项目五
        </Menu.Item>
        <Menu.Item key="6" disabled>
          项目六
        </Menu.Item>
      </Menu>
```

四级导航

```js
handleClick = e => {
  setState({
      current: e.key
  })
}
initialState = {current: "1"};
<Menu
        onClick={this.handleClick}
        selectedKeys={[state.current]}
        mode="horizontal"
        menuLevel={4}
      >
        <Menu.Item key="1">
          <span style={{marginLeft: 6}}>项目一</span>
        </Menu.Item>
        <Menu.Item key="2">
          <span style={{marginLeft: 6}}>项目二</span>
        </Menu.Item>
        <Menu.Item key="3" disabled>
          <span style={{marginLeft: 6}}>项目三</span>
        </Menu.Item>
        <Menu.Item key="4">
          <span style={{marginLeft: 6}}>项目四</span>
        </Menu.Item>
        <Menu.Item key="5">
          <span style={{marginLeft: 6}}>项目五</span>
        </Menu.Item>
        <Menu.Item key="6">
          <span style={{marginLeft: 6}}>项目六</span>
        </Menu.Item>
      </Menu>
```

```js
import Icon from '../icon';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

handleClick = e => {
  console.log(e);
}
<div>
    <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        arrowPosition="left"
      >
        <SubMenu key="sub1" title={<span><Icon type="calendar" /><span>Navigation One</span></span>}>
          <SubMenu key="sub666" title="Submenu">
            <Menu.Item key="1">
                Option 1
              </Menu.Item>
              <Menu.Item key="2">
                Option 2
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2333" title="Submenu">
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
            </SubMenu>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="calendar" /><span>Navigation Two</span></span>}>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7"><span>Option 7</span></Menu.Item>
            <Menu.Item key="8"><span>Option 8</span></Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
```

```js
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

handleClick = e => {
  console.log(e);
}
<div>
    <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['sub1', 'sub666', '1']}
        defaultOpenKeys={['sub1', 'sub666', '1','3', '4']}
        mode="inline"
        style={{ width: 256 }}
        inlineIndent={15}
      >
        <SubMenu key="sub1" title={<span><span>一级菜单01</span></span>}>
          <SubMenu inlineIndent={15} key="sub666" title="二级菜单01">
            <Menu.Item key="1">
                <span>三级菜单01</span>
              </Menu.Item>
              <Menu.Item key="2"><span>三级菜单02</span></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2333" title="二级菜单02">
            <Menu.Item  key="3"><span>三级菜单03</span></Menu.Item>
            <Menu.Item key="4"><span>三级菜单04</span></Menu.Item>
            </SubMenu>
            <Menu.Item  key="5"><span>三级菜单05</span></Menu.Item>
        </SubMenu>
        <SubMenu  key="sub2" title={<span><span>一级菜单02</span></span>}>
          <SubMenu  key="sub3" title="二级菜单03">
            <Menu.Item  key="7"><span>三级菜单07</span></Menu.Item>
            <Menu.Item  key="8"><span>三级菜单08</span></Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
```


```js
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

handleClick = e => {
  console.log(e);
}
<div>
    <Menu
        onClick={this.handleClick}
        style={{width: 150}}
        mode="vertical"
      >
        <SubMenu key="sub1" title={<span><span>一级菜单01</span></span>}>
          <SubMenu inlineIndent={15} key="sub666" title="二级菜单01">
            <Menu.Item key="1">
                <span>三级菜单01</span>
              </Menu.Item>
              <Menu.Item key="2"><span>三级菜单02</span></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2333" title="二级菜单02">
            <Menu.Item  key="3"><span>三级菜单03</span></Menu.Item>
            <Menu.Item key="4"><span>三级菜单04</span></Menu.Item>
            </SubMenu>
            <Menu.Item  key="5"><span>三级菜单05</span></Menu.Item>
        </SubMenu>
        <SubMenu  key="sub2" title={<span><span>一级菜单02</span></span>}>
          <SubMenu  key="sub3" title="二级菜单03">
            <Menu.Item  key="7"><span>三级菜单07</span></Menu.Item>
            <Menu.Item  key="8"><span>三级菜单08</span></Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </div>
```

普通Menu
```js
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

handleClick = e => {
  console.log(e);
}
<div>
    <Menu
        onClick={this.handleClick}
        mode="vertical"
        style={{display: 'inline-block'}}
      >
        <Menu.Item  key="1" disabled={true}><span>三级菜单01</span></Menu.Item>
        <Menu.Item key="2"><span>三级菜单02</span></Menu.Item>
        <Menu.Item  key="3"><span>三级菜单03</span></Menu.Item>
        <Menu.Item key="4"><span>三级菜单04</span></Menu.Item>
      </Menu>
    </div>
```
