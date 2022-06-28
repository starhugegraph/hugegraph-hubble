数字输入框：

author:chenxiao、shanqianmin

默认状态、悬浮状态、输入状态

```js
initialState = {value: '1.2222'};
<NumberBox
    value={state.value}
    width={90}
    tailLabel='元'
    onChange={e => setState({value: e.target.value})}
    {...{max: 9.99, min: 0.01, step: 0.01, placeholder: "各异"}}
/>
```

置灰态
```js
<NumberBox {...{disabled: true, value: '8.88'}} />
```

提示信息在右侧
```js
initialState = {value: '1'};
<NumberBox
    value={state.value}
    onChange={e => setState({value: e.target.value})}
    {...{max: 10, min: 0, tipLocation: "right", fixed: 2}}
/>
```
提示信息在下方
```js
initialState = {value: '1'};
<NumberBox
    value={state.value}
    onChange={e => setState({value: e.target.value})}
    {...{max: 10, min: 0, tipLocation: "bottom"}}
/>
```

提示信息是浮层
```js
initialState = {value: '1'};
<NumberBox
    value={state.value}
    onChange={e => setState({value: e.target.value})}
    {...{max: 10, min: 0, tipLocation: "layer"}}
/>
```

错误信息在右侧、下方、浮层
```js

<br />
<NumberBox
    value="666"
    {...{errorMessage: '我是下方错误信息', tipLocation: "right", errorLocation: 'bottom', tipText: '我是右侧提示信息'}}
/>
<br />
<NumberBox
    value="666"
    {...{errorMessage: '我是右侧错误信息', tipLocation: "bottom", errorLocation: 'right', tipText: '我是提示信息'}}
/>
<br />
<NumberBox
    value="666"
    {...{errorMessage: '我是浮层错误信息', location: "layer", tipText: '我是提示信息', tipLocation: "bottom"}}
/>
<br />
<NumberBox
    value="666"
    {...{errorMessage: '我是浮层错误信息', location: "layer"}}
/>
```
