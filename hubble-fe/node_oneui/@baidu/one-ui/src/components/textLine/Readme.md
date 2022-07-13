author: shanqianmin

有title、最大行数、单行最大字符数

```js
<TextLine title="关键词" maxLine={10} maxLen={5} />
```
没有maxLen和title的情况

```js
<TextLine />
```

设置宽高
```js
<TextLine width={900} height={900}/>
```

自定义表头
```js
const textLineProps = {
    TitleRender: () => <span>这是一个自定义表头</span>
};
<TextLine {...textLineProps} />
```

最少5行
```js
const textLineProps = {
    minLine: 5,
    maxLine: 10,
    title: '关键词'
};
<TextLine {...textLineProps} />
```
