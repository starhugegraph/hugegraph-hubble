布局

```js
import Button from '../button';

onClose = () => {
    console.log('关闭')
};

 <div>
    <Layout
        title="Basic layout"
        onClose={this.onClose}
        footer={[
            (<Button key={1} type="base-b1" onClick={this.showDrawer}>
                自定义操作1
            </Button>),
            (<Button key={2} type="base-b1" onClick={this.showDrawer}>
                自定义操作2
            </Button>),
            (<Button key={3} type="base-b1" onClick={this.showDrawer}>
                自定义操作3
            </Button>)
        ]}
    >
        <div style={{height: 150, textAglin: 'center'}}>some contents</div>
    </Layout>
</div>
```

横条布局


```js
onClose = () => {
    console.log('关闭')
};

 <div>
    <Layout.horizon
        onClose={this.onClose}
    >
        <div>some contents</div>
    </Layout.horizon>
</div>
```

抽屉

```js
import Button from '../button';
import Drawer from '../drawer';

initialState = {
    visible: false,
};
showDrawer = () => {
    setState({
      visible: true,
    });
  };

  onClose = () => {
    setState({
      visible: false,
    });
  };

 <div>
    <Button type="base-b1" onClick={this.showDrawer}>
        Open
    </Button>
    <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={this.onClose}
        visible={state.visible}
        footer={[
            (<Button key={1} type="base-b1" onClick={this.showDrawer}>
                自定义操作1
            </Button>),
            (<Button key={2} type="base-b1" onClick={this.showDrawer}>
                自定义操作2
            </Button>),
            (<Button key={3} type="base-b1" onClick={this.showDrawer}>
                自定义操作3
            </Button>)
        ]}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
</div>
```

抽屉-自定义打开方向

```js
import Radio from '../radio';
import Drawer from '../drawer';
import Button from '../button';

const RadioGroup = Radio.Group;

initialState = {
    visible: false,
    placement: 'left'
};
showDrawer = () => {
    setState({
      visible: true,
    });
  };

  onClose = () => {
    setState({
      visible: false,
    });
  };

  onChange = (e) => {
    setState({
      placement: e.target.value,
    });
  }
<div>
    <RadioGroup
        style={{ marginRight: 8 }}
        defaultValue={state.placement}
        onChange={this.onChange}
        value={state.placement}
    >
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
    </RadioGroup>
    <Button type="primary" onClick={this.showDrawer}>
        Open
    </Button>
    <Drawer
        title="Basic Drawer"
        placement={state.placement}
        onClose={this.onClose}
        visible={state.visible}
        destroyOnClose={true}
        footer={[
            (<Button key={1} type="base-b1" onClick={this.showDrawer}>
                自定义操作1
            </Button>),
            (<Button key={2} type="base-b1" onClick={this.showDrawer}>
                自定义操作2
            </Button>),
            (<Button key={3} type="base-b1" onClick={this.showDrawer}>
                自定义操作3
            </Button>)
        ]}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Drawer>
</div>
```
消息

正常提示

```js
import Button from '../button';
import Modal from '../modal';

info = () => {
    const message = Modal.message;
    message.info({
        content: 'This is a message of normal info'
    });
};
<Button onClick={this.info}>Display normal message</Button>
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

弹窗

模态对话框-中型-默认确认取消按钮

```js
import Button from '../button';
import Modal from '../modal';

initialState = {
    visible: false,
};
showModal = () => {
    setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
>
    <div style={{background: '#eee', height: 200}}>
        自定义区域
    </div>
</Modal>
</div>
```

模态对话框-大型-自定义按钮

```js
import Button from '../button';
import Modal from '../modal';

initialState = {
    visible: false,
};
showModal = () => {
    setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    size="large"
    footer={[
        <Button size="large" type="base-b2" onClick={this.handleOk}>
            确定
        </Button>,
        <Button size="large" type="base-b2" onClick={this.handleOk}>
            确定并添加单元
        </Button>,
        <Button size="large" type="base-b3" onClick={this.handleCancel}>
            取消
        </Button>
    ]}
>
    <div style={{background: '#eee', height: 350}}>
        自定义区域
    </div>
</Modal>
</div>
```

模态对话框-小型-自定义按钮

```js
import Button from '../button';
import Modal from '../modal';

initialState = {
    visible: false,
};
showModal = () => {
    setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    setState({
      visible: false,
    });
  }

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    size="small"
    footer={[
        <Button size="large" type="base-b2" onClick={this.handleOk}>
            知道了
        </Button>
    ]}
>
    <div style={{background: '#eee', height: 100}}>
        自定义区域
    </div>
</Modal>
</div>
```

模态对话框-封装confirm提示

```js
import Button from '../button';
import Modal from '../modal';

showModal = () => {
    Modal.confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
        onOk() {
            console.log('OK');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
</div>
```

模态对话框-封装confirm提示-lodaing

```js
import Button from '../button';
import Modal from '../modal';

showModal = () => {
    Modal.confirm({
        title: 'Do you Want to delete these items?',
        content: 'Some descriptions',
        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
</div>
```

模态对话框-alert

```js
import Button from '../button';
import Modal from '../modal';

showModal = () => {
    Modal.alert({
        title: 'This is a notification message',
        content: (
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        ),
        onOk() {},
  });
}

<div>
<Button type="base-b2" onClick={this.showModal}>
    Open Modal
</Button>
</div>
```

气泡弹窗

```js
import Button from '../button';
import Popover from '../popover';

<Popover content={(
      <div>
        <p>Content</p>
        <p>Content</p>
  </div>
)} title="Title">
    <Button>这是一个按钮</Button>
</Popover>
```

```js
import Button from '../button';
import Popover from '../popover';

const buttonWidth = 70;
const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
<div>
<div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
      <Popover placement="topLeft" title={text} content={content}>
        <Button>TL</Button>
      </Popover>
      <Popover placement="top" title={text} content={content} trigger="click">
        <Button>Top</Button>
      </Popover>
      <Popover placement="topRight" title={text} content={content}>
        <Button>TR</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Popover placement="leftTop" title={text} content={content}>
        <Button>LT</Button>
      </Popover>
      <Popover placement="left" title={text} content={content} trigger="click">
        <Button>Left</Button>
      </Popover>
      <Popover placement="leftBottom" title={text} content={content}>
        <Button>LB</Button>
      </Popover>
    </div>
    <div style={{ width: buttonWidth, marginLeft: (buttonWidth * 4) + 24 }}>
      <Popover placement="rightTop" title={text} content={content}>
        <Button>RT</Button>
      </Popover>
      <Popover placement="right" title={text} content={content}>
        <Button>Right</Button>
      </Popover>
      <Popover placement="rightBottom" title={text} content={content}>
        <Button>RB</Button>
      </Popover>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
      <Popover placement="bottomLeft" title={text} content={content}>
        <Button>BL</Button>
      </Popover>
      <Popover placement="bottom" title={text} content={content}>
        <Button>Bottom</Button>
      </Popover>
      <Popover placement="bottomRight" title={text} content={content}>
        <Button>BR</Button>
      </Popover>
    </div>
</div>
```
