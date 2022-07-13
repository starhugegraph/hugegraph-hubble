author: shanqianmin

普通多选：

默认状态、悬浮状态、点选状态
```js
<Checkbox>普通多选</Checkbox>
```
1、使用options - 简单模式：只有label和value，没有其他dom结构

```js
allList = ['Apple', 'Pear', 'Orange'];
initialState = {indeterminate: true, checkAll: false, checkedList: ['Apple']};
<div>
    <Checkbox
    indeterminate={state.indeterminate}
    onChange={e => setState({
        indeterminate: false,
        checkAll: e.target.checked,
        checkedList: e.target.checked ? allList : [],
    })}
    checked={state.checkAll}
    >
    部分选中态
    </Checkbox>
    <br />
    <br />
    <Checkbox.Group options={allList} value={state.checkedList} onChange={checkedList => setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < allList.length),
        checkAll: checkedList.length === allList.length,
    })}></Checkbox.Group>
</div>
```

2、使用Checkbox - 复杂模式，可以自定义一些dom结构
```js
allList = ['Apple', 'Pear'];
initialState = {indeterminate: true, checkAll: false, checkedList: ['Apple']};
<div>
    <Checkbox
    indeterminate={state.indeterminate}
    onChange={e => setState({
        indeterminate: false,
        checkAll: e.target.checked,
        checkedList: e.target.checked ? allList : [],
    })}
    checked={state.checkAll}
    >
    部分选中态
    </Checkbox>
    <br />
    <br />
    <Checkbox.Group value={state.checkedList} onChange={checkedList => setState({
        checkedList,
        indeterminate: !!checkedList.length && (checkedList.length < allList.length),
        checkAll: checkedList.length === allList.length,
    })}>
        <Checkbox value="Apple">Apple<span style={{marginLeft: "5px"}}>我是特有的提示信息</span></Checkbox>
        <Checkbox value="Pear">Pear</Checkbox>
    </Checkbox.Group>
</div>
```

```js
<Checkbox disabled={true}>不可用状态</Checkbox>
```

```js
<Checkbox checked={true} disabled={true}>选中不可用状态</Checkbox>
```

```js
<Checkbox disabled={true} indeterminate={true}>部分选中不可用状态</Checkbox>
```

超多项多选
<head>
    <style>
        .over {
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            width:48px;
            display: inline-block;
            vertical-align: middle;
        }
    </style>
</head>

```js
<Checkbox><span className="over" title="超长多选超长多选超长多选超长多选超长多选超长多选超长多选">超长多选超长多选超长多选超长多选超长多选超长多选超长多选</span></Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
<Checkbox>普通多选</Checkbox>
```

垂直的多选使用options
```js
allList = ['Apple', 'Pear', 'Orange'];
initialState = {checkedList: ['Apple']};
<Checkbox.Group direction="column" options={allList} value={state.checkedList} onChange={checkedList => setState({
    checkedList
})}></Checkbox.Group>
```

垂直的多选，单纯使用checkbox
```js
<Checkbox direction="column">普通多选</Checkbox>
<Checkbox direction="column">普通多选</Checkbox>
<Checkbox direction="column">普通多选</Checkbox>
```