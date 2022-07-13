基本tag
```js
function log(e) {
  alert('关闭一个标签');
}

function preventDefault(e) {
  e.preventDefault();
  alert('Clicked! But prevent default.');
}
<div>
    <Tag>Tag 1</Tag>
    <Tag>
      <a href="www.baidu.com">Link</a>
    </Tag>
    <Tag closable onClose={this.log}>
      Tag 2
    </Tag>
    <Tag closable onClose={this.preventDefault}>
      Prevent Default
    </Tag>
</div>
```

多种颜色的标签 presets 是目前支持的主色，custom是自定义颜色
```js
  <div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
      <Tag color="pink">pink</Tag>
      <Tag color="red">red</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="yellow">yellow</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="green">green</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="purple">purple</Tag>
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
  </div>
```