飘角组件 - 普通
```js
import Button from '../button';
import Badge from './index';

<div style={{display: 'flex', alignItems: 'center'}}>
    <div style={{marginRight: '10px'}}>
        <Badge count={8}>
            <div style={{width: 42, height: 42, backgroundColor: '#eee'}}></div>
        </Badge>
    </div>
    <div>
        <Badge count={8}>
            <Button>默认按钮</Button>
        </Badge>
    </div>
</div>
```

飘角 - 不同位数的数值达到上限，可自定义最大值。
```js
import Button from '../button';
import Badge from './index';
 <div style={{display: 'flex', alignItems: 'center'}}>
    <div style={{marginRight: '40px'}}>
        <Badge count={100}>
            <div style={{width: 42, height: 42, backgroundColor: '#eee'}}></div>
        </Badge>
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge count={1000} overflowCount={999}>
            <div style={{width: 42, height: 42, backgroundColor: '#eee'}}></div>
        </Badge>
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge count={100}>
            <Button>默认按钮</Button>
        </Badge>
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge count={1000} overflowCount={999}>
            <Button>默认按钮</Button>
        </Badge>
    </div>
</div>
```

```js
import Button from '../button';
import Badge from './index';
import Icon from '../icon';

<div style={{display: 'flex', alignItems: "center"}}>
    <div style={{marginRight: '40px'}}>
        <Badge isDot={true}>
            <Icon type="calendar" size={27} style={{color: "#666"}}/>
        </Badge>
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge isDot={true}>
            <div style={{width: 50, height: 50, backgroundColor: '#eee'}}></div>
        </Badge>
    </div>
</div>
```

飘角 - 不同颜色表示不同状态
```js
import Button from '../button';
import Badge from './index';
<div>
    <div style={{marginRight: '40px'}}>
        <Badge type="error" text="失败" style={{marginRight: 100}} />
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge type="success" text="成功" style={{marginRight: 100}} />
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge type="default" text="置灰" style={{marginRight: 100}} />
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge type="processing" text="运行中" style={{marginRight: 88}} />
    </div>
    <div style={{marginRight: '40px'}}>
        <Badge type="warning" text="警告" />
    </div>
</div>
```

飘角 - 动态
```js
import Button from '../button';
import Badge from './index';
import Icon from '../icon';
import Switch from '../switch';

initialState = {
    visible: true
};

onChange = checked => {
    setState({
        visible: !!checked
    })
}

<div>
    <div>
        <Switch onChange={this.onChange} checked={state.visible}/>
    </div>
    <div style={{display: "flex", alignItems: "center", marginTop: 24}}>
        <div style={{marginRight: '40px'}}>
            <Badge count={40} visible={state.visible}>
                <Button>默认按钮</Button>
            </Badge>
        </div>
    </div>
</div>
```

飘角 - 自定义颜色 - Presets 为原色 custom可以自定义
```js
import Badge from './index';
import Button from '../button';
const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple'
];
<div>
    <h4 style={{ marginBottom: 16 }}>Presets:</h4>
    <div>
        {colors.map(color => (
        <div key={color}>
            <span style={{marginRight: '30px'}}>
                <Badge isDot={true} color={color} text={color} />
            </span>
            <span style={{marginBottom: '10px', display: 'inline-block'}}>
                <Badge count={100} color={color} text={color}>
                    <Button>默认按钮</Button>
                </Badge>
            </span>
        </div>
        ))}
    </div>
    <h4 style={{ margin: '16px 0' }}>Custom:</h4>
    <div>
        <Badge isDot={true} color="#f50" text="#f50" />
        <br />
        <Badge isDot={true} color="#2db7f5" text="#2db7f5" />
        <br />
        <Badge isDot={true} color="#87d068" text="#87d068" />
        <br />
        <Badge isDot={true} color="#108ee9" text="#108ee9" />
    </div>
</div>
```