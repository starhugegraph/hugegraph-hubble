## Install
npm install @baidu/one-ui --registry=http://registry.npm.baidu-int.com

## Usage
```js
import {Button} from '@baidu/one-ui';
<Button>这是一个按钮</Button>
```

## use css or less
需要定制皮肤的话在顶层样式目录引用less
```less
@import "~@baidu/one-ui/src/index.less";

使用webpack的less loader的modifyVars进行自定义配置，详情见官网
```
不要定制皮肤的话，在顶层样式引用css
```css
@import "~@baidu/one-ui/lib/index.css";
```

## Links
- [Home page(2.0x)](http://one-ui.baidu-int.com:8081)
- [Home page(3.0x)](http://one-ui.baidu-int.com)
