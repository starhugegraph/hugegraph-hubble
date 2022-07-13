author: chenxiao09

按钮样式：

```js
<Button type="base-b1" style={{marginRight: '10px', marginBottom: '10px'}}>
  加强按钮B1
</Button>

<Button type="base-b2" style={{marginRight: '10px', marginBottom: '10px'}}>
  重要按钮B2
</Button>

<Button type="base-b3" style={{marginRight: '10px', marginBottom: '10px'}}>
  普通按钮B3
</Button>

<Button type="base-b4" style={{marginRight: '10px', marginBottom: '10px'}}>
  文字按钮蓝色B4
</Button>

<Button type="base-b5" style={{marginRight: '10px', marginBottom: '10px'}}>
  普通按钮B5
</Button>

<Button type="base-b6" style={{marginRight: '10px', marginBottom: '10px'}}>
  重要按钮B6
</Button>

<Button type="base-b7" style={{marginRight: '10px', marginBottom: '10px'}}>
  文字按钮黑色B7
</Button>

<Button type="base-b8" style={{marginRight: '10px', marginBottom: '10px'}}>
  浮层半透明按钮B8
</Button>


<Button type="base-b2" disabled style={{marginRight: '10px', marginBottom: '10px'}}>
  重要按钮B2
</Button>

<Button type="base-b2" loading style={{marginRight: '10px', marginBottom: '10px'}}>
  重要按钮B2
</Button>
```

按钮尺寸：
```js
<Button size="small" type="base-b2" style={{marginRight: '10px'}}>
  小尺寸
</Button>
<Button size="default" type="base-b2" style={{marginRight: '10px'}}>
  常规尺寸
</Button>
<Button size="large" type="base-b2" style={{marginRight: '10px'}}>
  大尺寸
</Button>
```

按钮禁用状态：
```js
<Button size="small" disabled style={{marginRight: '10px'}}>
  按钮禁用
</Button>
<Button type="base-b7" disabled>
  文字按钮禁用
</Button>
```

按钮只读状态：
```js
<Button type="base-b3" readonly>
  文字按钮只读
</Button>
```

新版DLS-按钮
```js
<div>
<Button type="normal">
    默认类型按钮
</Button>
<div style={{marginTop: '20px'}}>
<Button type="strong">
    加强按钮
</Button>
</div>
</div>
```