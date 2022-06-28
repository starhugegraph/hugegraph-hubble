计数输入框

author: shanqianmin xuwenjun

默认状态、悬浮状态、输入状态、失焦状态

搜索框无下拉框

```js
import Search from './search';

initialState = {value: 'ssss'};
onClearClick = e => {
   const value = e.target.value;
   console.log(value);
   setState({
       value
   });
}
onChange = e => {
    const value = e.target.value;
    console.log(value);
    setState({
        value
    });
}
<Search placeholder="1~30个字符"
 value={state.value}
 isShowDropDown={true}
 isShowSearchIcon={true}
 disabled={false}
 onSearch={e => {console.log(e);console.log('test')}}
 onChange={onChange}
 onClearClick={onClearClick}
 ></Search>
```

搜索框搜索按钮,可定制搜索框的宽度，高度及搜索按钮的宽度

```js
import Search from './search';

initialState = {value: 'ssss'};
onClearClick = e => {
   const value = e.target.value;
   console.log(value);
   setState({
       value
   });
}
onChange = e => {
    const value = e.target.value;
    console.log(value);
    setState({
        value
    });
}
<Search placeholder="1~30个字符"
 value={state.value}
 isShowDropDown={false}
 disabled={false}
 onSearch={e => {console.log(e);console.log('test')}}
 onChange={onChange}
 onClearClick={onClearClick}
 searchIconType='button'
 width={200}
 height={50}
 buttonWidth={60}
 ></Search>
```

搜索框无下拉框，置灰态

```js
import Search from './search';

initialState = {value: 'ssss'};
onChange = e => {
    const value = e.target.value;
    console.log(value);
    setState({
        value
    });
}
<Search placeholder="1~30个字符"
 value={state.value}
 isShowDropDown={false}
 disabled={true}
 onSearch={e => {console.log(e);console.log('test')}}
 onChange={onChange}
 ></Search>
```

搜索框无下拉框,为空时，点搜索填充

```js
import Search from './search';

initialState = {value: ''};
onChange = e => {
    const value = e.target.value;
    console.log(value);
    setState({
        value
    });
}
<Search placeholder="1~30个字符"
 value={state.value}
 isShowDropDown={false}
 disabled={false}
 defaultQuery={{prefix:'哈哈哈哈',value:'现化'}}
 onSearch={e => {console.log(e);console.log('test')}}
 onChange={onChange}
 ></Search>
```

搜索框

```js
import Search from './search';

const list = [];
for (let i = 1; i <= 5; i++) {
  list.push({
    label: `操作命令${i}`,
    value: `操作命令${i}`,
    disabled: (i % 2 === 0) ? true : false
  });
}

initialState = {value: 'ssss', list};
handleMenuClick = e => {
    setState({
        value: e.key
    });
  console.log(e);
}
onChange = e => {
    const value = e.target.value;
    console.log(value);
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            list.push({
                value: `计划${value}${i}鲜花`,
                label: `计划${value}${i}鲜花`
            })
        }
        setState({
            value,
            list: list
        })
    }, 100);
}
<Search placeholder="1~30个字符"
 value={state.value}
 handleMenuClick={handleMenuClick}
 options={state.list}
 disabled={false}
 defaultQuery={{prefix:'哈哈哈哈',value:'现化'}}
 onSearch={e => {console.log(e);console.log(e.target.value)}}
 onChange={onChange}
 ></Search>
```

错误信息在右侧
```js
<Input placeholder="1~30个字符" maxLen={10} errorLocation="right"></Input>
```

错误信息在下方
```js
<Input placeholder="1~30个字符" maxLen={10} errorLocation="bottom"></Input>
```

错误信息是浮层
```js
<Input placeholder="1~30个字符" maxLen={10} errorLocation="layer"></Input>
```

自定义错误信息、没有最大值
```js
<Input placeholder="1~30个字符" errorMessage="这里是自定义错误信息" value="我是错误的value值"></Input>
```

置灰态

```js
<Input value="这是置灰态" disabled/>
```

只读态

```js
<Input value="这是只读态" readonly/>
```

自定义宽度

```js
<Input value="自定义input宽度" width={800} className="test"/>
```

如果错误信息为空，就一直不显示错误信息
```js
initialState = {value: '这不是错误'};
onChange = e => {
    setState({
        value: e.value
    });
}
<Input value={state.value} onChange={onChange} maxLen={2} errorMessage="" />
```
