消息

正常提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.info({
        content: 'This is a message of normal info',
        duration: 3
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

正常提示 - 2

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.info({
        content: '温馨提示',
        duration: 3
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

警告提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.warning({
        content: 'This is a message of warning info',
        duration: 3
    });
};
<Button onClick={this.info}>Display warning message</Button>
```

加载提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.loading({
        content: 'This is a message of loading info',
        duration: 3
    });
};
<Button onClick={this.info}>Display loading message</Button>
```

错误提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.error({
        content: 'This is a message of error info'
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

成功提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.success({
        content: 'This is a message of success info'
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

成功提示-带自定义操作

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.success({
        content: <span>This is a message of success info, <a href="https://www.baidu.com">去操作</a></span>
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

成功提示-带标题

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.success({
        title: '这是一个操作',
        content: '查看详情。'
    });
};
<Button onClick={this.info}>Display normal message</Button>
```

成功提示-带按钮

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.success({
        title: '这是一个操作',
        content: <span>查看详情。</span>,
        footer: <Button>去操作</Button>
    });
};
<Button onClick={this.info}>Display normal message</Button>
```
