author huangshiming

基本用法 简单的步骤条

```js
const Step = Steps.Step;
<Steps current={1}>
    <Step title="设置推广计划" description="描述文案" />
    <Step title="设置推广单元" description="描述文案二" />
    <Step title="提交和预览" description="描述文案三" />
</Steps>
```

```js
import Button from '../button';

const Step = Steps.Step;
initialState = {step: 0};
handleAdd = () => {
    let step = state.step;
    step ++;
    setState({
        step
    });
}
handleMinus = () => {
    let step = state.step;
    step --;
    setState({
        step
    });
}

onClickStep = step => {
    --step;
    setState({
        step
    });
}
<div>
    <Steps current={state.step} onClickStep={this.onClickStep}>
        <Step title="设置推广计划" description="描述文案" />
        <Step title="设置推广单元" description="描述文案二" />
        <Step title="提交和预览" description="描述文案三" />
    </Steps>
    <div style={{marginTop: 60}}>
        {
            state.step < 3 && (
                <div style={{marginRight: 20, display: 'inline-block'}}>
                    <Button onClick={this.handleAdd}>下一步</Button>
                </div>
            )
        }
        {
            state.step > 0 && (
                <Button onClick={this.handleMinus}>前一步</Button>
            )
        }
    </div>
</div>
```

```js
import Button from '../button';

initialState = {step: 0};
handleAdd = () => {
    let step = state.step;
    step ++;
    setState({
        step
    });
}
handleMinus = () => {
    let step = state.step;
    step --;
    setState({
        step
    });
}
const Step = Steps.Step;
<div>
    <Steps current={state.step} labelPlacement="vertical">
        <Step title="设置推广计划" description="描述文案" />
        <Step title="设置推广单元" description="设置推广单元" />
        <Step title="提交和预览" description="描述文案三" />
    </Steps>
    <div style={{marginTop: 60}}>
        {
            state.step < 3 && (
                <div style={{marginRight: 20, display: 'inline-block'}}>
                    <Button onClick={this.handleAdd}>下一步</Button>
                </div>
            )
        }
        {
            state.step > 0 && (
                <Button onClick={this.handleMinus}>前一步</Button>
            )
        }
    </div>
</div>
```

迷你版

```js
const Step = Steps.Step;
<Steps current={1} size="small">
    <Step title="设置推广计划" description="描述文案" />
    <Step title="设置推广单元" description="设置推广单元" />
    <Step title="提交和预览" description="描述文案三" />
</Steps>
```

垂直步骤条

```js
const Step = Steps.Step;
<Steps direction="vertical" current={1}>
    <Step title="设置推广计划" description="描述文案" />
    <Step title="设置推广单元" description="设置推广单元" />
    <Step title="提交和预览" description="描述文案三" />
</Steps>
```

垂直步骤条 小尺寸

```js
const Step = Steps.Step;
<Steps direction="vertical" size="small" current={1}>
    <Step title="设置推广计划" description="描述文案" />
    <Step title="设置推广单元" description="描述文案" />
    <Step title="提交和预览" description="描述文案三" />
</Steps>
```

status定义当前出错的状态

```js
const Step = Steps.Step;

<Steps current={1} status="error">
    <Step title="设置推广计划" description="描述文案" />
    <Step title="设置推广单元" description="描述文案" />
    <Step title="提交和预览" description="描述文案" />
</Steps>
```
