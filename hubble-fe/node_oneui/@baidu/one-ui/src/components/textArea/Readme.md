author: shanqianmin

非必填最小值是8，最大值是100，错误信息在右方
```js
<TextArea placeholder="1~100个字符" maxLen={100} minLen={8}/>
```

部分字符不计数
```js
<TextArea placeholder="1~100个字符" maxLen={100} minLen={8} filterArray={['{', '}']}/>
```

必填，最小值是8，最大值是100，错误信息在右方
```js
<TextArea placeholder="1~100个字符" maxLen={100} minLen={8} isRequired={true}/>
```

```js
<TextArea placeholder="没有最大字符的"/>
```
提示信息在右方
```js
<TextArea placeholder="1~100个字符" tipText="这是右侧的提示信息" />
```

提示信息在下方
```js
<TextArea placeholder="1~100个字符" tipText="这是下方的提示信息" tipLocation="bottom"/>
```

错误信息在下方
```js
<TextArea placeholder="1~100个字符" maxLen={2} errorLocation="bottom"/>
```

错误信息是浮层
```js
<TextArea placeholder="1~100个字符" maxLen={2} errorLocation="layer"/>
```

大字号
```js
<TextArea placeholder="1~100个字符" maxLen={100} minLen={8} size="large" tipText="我是大字号提示信息"/>
```