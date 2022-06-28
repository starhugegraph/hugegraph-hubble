对话框

模态对话框-中型-默认确认取消按钮

```js
import Button from '../button';

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
<Button onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    destroyOnClose={true}
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
<Button onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    size="large"
    footer={[
        <Button size="large" onClick={this.handleOk}>
            确定
        </Button>,
        <Button size="large" onClick={this.handleOk}>
            确定并添加单元
        </Button>,
        <Button size="large" onClick={this.handleCancel}>
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
<Button onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    size="small"
    footer={[
        <Button onClick={this.handleOk}>
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

模态对话框-小型-自定义按钮 - 关闭销毁节点

```js
import Button from '../button';

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
<Button onClick={this.showModal}>
    Open Modal
</Button>
<Modal
    title="Basic Modal"
    visible={state.visible}
    onOk={this.handleOk}
    onCancel={this.handleCancel}
    size="small"
    destroyOnClose={true}
    footer={[
        <Button onClick={this.handleOk}>
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

模态对话框-封装confirm提示-(okProps, cancelProps可自定义按钮属性)

```js
import Button from '../button';

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
        okProps: {
            type: 'base-b5'
        },
        cancelProps: {
            disabled: true
        }
    });
}

<div>
<Button onClick={this.showModal}>
    Open Modal
</Button>
</div>
```

模态对话框-封装confirm提示-lodaing

```js
import Button from '../button';

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
<Button onClick={this.showModal}>
    Open Modal
</Button>
</div>
```

模态对话框-alert

```js
import Button from '../button';

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
<Button onClick={this.showModal}>
    Open Modal
</Button>
</div>
```
