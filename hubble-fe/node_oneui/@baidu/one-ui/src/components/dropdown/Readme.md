下拉选择

author: huangshiming


基础下拉菜单 - click - 搜索

```js
handleMenuClick = e => {
  console.log(e);
}

initialState = {
  list: [{
      label: `操作命令111111111`,
      value: 11111111111111111
  }]
}
onVisibleChange = visible => {
  console.log(visible);
}
onSearchChange = value => {
  const arr = [];
  for (let i = 1; i <= Math.ceil(Math.random() * 20); i++) {
    arr.push({
      label: `操作命令${i}`,
      value: i
    });
  }
  setState({
      list: arr
  })
}
<Dropdown.Button
  options={state.list}
  title="下拉菜单名称"
  width={150}
  handleMenuClick={this.handleMenuClick}
  onVisibleChange={this.onVisibleChange}
  trigger={['click']}
  showSearch={true}
  onSearchChange={this.onSearchChange}
  searchPlaceholder="请输入要搜索的计划"
  notFound="没有找到需要的计划"
  />
```

基础下拉菜单 - 使用封装的DropdownButton - hover

```js
handleMenuClick = e => {
  console.log(e);
}

initialState = {
  list: [
    {
      label: `操作命令1`,
      value: 1
    },{
      label: `操作命令2`,
      value: 2
    },{
      label: `操作命令3`,
      value: 3
    },{
      divider: true
    },{
      label: `操作命令4`,
      value: 4
    }
  ]
}

onVisibleChange = visible => {
  console.log(visible);
}
<Dropdown.Button
  options={state.list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  onVisibleChange={this.onVisibleChange}
  notFound="暂无计划"
  />
```

基础下拉菜单 - 不使用的DropdownButton - hover

```js
import Menu from '../menu';

<Dropdown
  title="下拉菜单名称"
  style={{width: 120}}
  trigger={['hover']}
  overlay={(
    <Menu>
      <Menu.Item key={111}>
        操作1
      </Menu.Item>
      <Menu.Item key={222}>
        操作2
      </Menu.Item>
      <Menu.Item key={333}>
        操作3
      </Menu.Item>
      <Menu.Item key={444}>
        操作4
      </Menu.Item>
    </Menu>
  )}>
    <a className="one-dropdown-link" href="#">
      Hover me
    </a>
</Dropdown>
```

基础下拉菜单 - 选项中存在禁用
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 5; i++) {
  list.push({
    label: `操作命令${i}`,
    value: i,
    disabled: (i % 2 === 0) ? true : false
  });
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['hover']}
  />
```

基础下拉菜单 - 点击
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 5; i++) {
  list.push({
    label: `操作命令${i}`,
    value: i
  });
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['click']}
  />
```

下拉菜单不可点击
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 5; i++) {
  list.push({
    label: `操作命令${i}`,
    value: i
  });
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  disabled={true}
  disabledReason="该计划暂不可用"
  />
```

下拉菜单-多层-展开层级较少
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 10; i++) {
  let params = {
    label: `操作命令${i}`,
    value: i
  };
  if (i === 3) {
    params.children = [
        {
          label: `操作命令${i}`,
          value: i+1
        },
        {
          label: `操作命令${i}`,
          value: i+2
        }
    ]
  }
  list.push(params);
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['click']}
  />
```


下拉菜单-多层-展开层级较多
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 10; i++) {
  let params = {
    label: `操作命令${i}`,
    value: i
  };
  if (i === 7) {
    params.children = [];
    for (let j = 1; j <= 100; j++) {
      params.children.push({
          label: `操作命令${i}`,
          value: j+1
        })
    }
  }
  list.push(params);
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['click']}
  />
```

下拉菜单-多层-存在禁用
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 5; i++) {
  let params = {
    label: `操作命令${i}`,
    value: i
  };
  if (i === 3) {
    params.children = [
        {
          label: `操作命令${i}`,
          value: i+1,
          disabled: true
        },
        {
          label: `操作命令${i}`,
          value: i+2
        }
    ]
  }
  list.push(params);
}
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['click']}
  />
```

下拉菜单-多层-展开层级较多-左侧展开（空间挤压）
```js
handleMenuClick = e => {
  console.log(e);
}
const list = [];
for (let i = 1; i <= 10; i++) {
  let params = {
    label: `操作命令${i}`,
    value: i
  };
  if (i === 7) {
    params.children = [];
    for (let j = 1; j <= 100; j++) {
      params.children.push({
          label: `操作命令${i}`,
          value: j+1
        })
    }
  }
  list.push(params);
}
<div style={{marginLeft: 1500}}>
<Dropdown.Button
  options={list}
  title="下拉菜单名称"
  style={{width: 120}}
  handleMenuClick={this.handleMenuClick}
  trigger={['click']}
  />
  </div>
```



