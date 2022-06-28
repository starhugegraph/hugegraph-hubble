下拉弹层

```js
initialState = {
  list: [{
      label: `操作命令111111111`,
      value: 11111111111111111
  }]
}
onVisibleChange = visible => {
  const arr = [];
  for (let i = 1; i <= Math.ceil(Math.random() * 20); i++) {
    arr.push({
      label: `操作的点点滴滴多多多的点点滴滴多多多多多多多多多多多多多多多命令${i}`,
      value: i
    });
  }
  if (!visible) {
    setState({
      list: arr
    })
  }
}
<PopLayer
    onVisibleChange={this.onVisibleChange}
    trigger="click"
    dropdownMatchSelectWidth={false}
    overlay={(
        <div>
            {
                state.list.map(item => {
                    return (
                        <div key={item.value}>{item.label}</div>
                    );
                })
            }
        </div>
    )}
    header="这是一个下拉弹层"
/>
```


```js
import Button from '../button';

initialState = {
  list: [{
      label: `操作命令111111111`,
      value: 11111111111111111
  }]
}
onVisibleChange = visible => {
  const arr = [];
  for (let i = 1; i <= Math.ceil(Math.random() * 20); i++) {
    arr.push({
      label: `操作命令${i}`,
      value: i
    });
  }
  if (!visible) {
    setState({
      list: arr
    })
  }
}
<PopLayer
    onVisibleChange={this.onVisibleChange}
    overlay={(
        <div style={{width: 100}}>
            {
                state.list.map(item => {
                    return (
                        <div key={item.value}>{item.label}</div>
                    );
                })
            }
        </div>
    )}
>
    <Button>这是一个案例</Button>
</PopLayer>
```
