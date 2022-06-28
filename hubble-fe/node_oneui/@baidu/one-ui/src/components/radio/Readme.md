普通单选：

author: shanqianmin

默认状态、悬浮状态、点选状态


1、使用options - 简单模式：只有label和value，没有其他dom结构

```js
const options = [
  {label: '普通单选1', value: 1},
  {label: '普通单选2', value: 2},
  {label: '置灰单选3', value: 3, disabled: true}
];
initialState = {value: 1};
<Radio.Group value={state.value} options={options} onChange={e => setState({value: e.target.value})}>
</Radio.Group>
```

2、使用Radio - 复杂模式，可以自定义一些dom结构
```js
initialState = {value: 1};
<Radio.Group value={state.value} onChange={e => setState({value: e.target.value})}>
    <Radio value={1}>普通单选1<span style={{marginLeft: "5px"}}>我是特有的提示信息</span></Radio>
    <Radio value={2}>普通单选2</Radio>
</Radio.Group>
```

```js
<Radio disabled={true}>不可用状态</Radio>
```

```js
<Radio checked={true} disabled={true}>选中不可用状态</Radio>
```

加强单选不支持置灰态

正常尺寸
```js
initialState = {value: 3};
<Radio.Group value={state.value} onChange={e => {
    console.info(e.target.value);
    setState({value: e.target.value})
}
}>
    <Radio.Button value={3}>加强单选1</Radio.Button>
    <Radio.Button value={4}>加强单选2</Radio.Button>
</Radio.Group>
```

小尺寸
```js
initialState = {value: 5};
<Radio.Group value={state.value} onChange={e => setState({value: e.target.value})} size="small">
    <Radio.Button value={5}>加强单选1</Radio.Button>
    <Radio.Button value={6}>加强单选2</Radio.Button>
</Radio.Group>
```

大尺寸
```js
initialState = {value: 7};
<Radio.Group value={state.value} onChange={e => setState({value: e.target.value})} size="large">
    <Radio.Button value={7}>加强单选1</Radio.Button>
    <Radio.Button value={8}>加强单选2</Radio.Button>
</Radio.Group>
```

超多项单选
<head>
    <style>
        .over {
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            width:54px;
            display: inline-block;
            vertical-align: middle;
        }
        .group-line-height {
            line-height: 1.5;
        }
    </style>
</head>

```js
initialState = {value: 1};
<Radio.Group value={state.value} onChange={e => setState({value: e.target.value})} className="group-line-height">
    <Radio value={0}><span className="over" title="超长单选超长单选超长单选超长单选超长单选超长单选超长单选">超长单选超长单选超长单选超长单选超长单选超长单选超长单选</span></Radio>
    <Radio value={1}>普通单选1</Radio>
    <Radio value={2}>普通单选2</Radio>
    <Radio value={3}>普通单选3</Radio>
    <Radio value={4}>普通单选4</Radio>
    <Radio value={5}>普通单选5</Radio>
    <Radio value={6}>普通单选6</Radio>
    <Radio value={7}>普通单选7</Radio>
    <Radio value={8}>普通单选8</Radio>
    <Radio value={9}>普通单选9</Radio>
</Radio.Group>
```

垂直的单选
```js
initialState = {value: 1};
<Radio.Group value={state.value} onChange={e => setState({value: e.target.value})} direction="column">
    <Radio value={0}>普通单选0</Radio>
    <Radio value={1}>普通单选1</Radio>
    <Radio value={2}>普通单选2</Radio>
    <Radio value={3}>普通单选3</Radio>
    <Radio value={4}>普通单选4</Radio>
    <Radio value={5}>普通单选5</Radio>
    <Radio value={6}>普通单选6</Radio>
    <Radio value={7}>普通单选7</Radio>
    <Radio value={8}>普通单选8</Radio>
    <Radio value={9}>普通单选9</Radio>
</Radio.Group>
```
