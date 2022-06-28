抽屉

```js
import Button from '../button';

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


```js
import Button from '../button';

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
        placement="top"
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
