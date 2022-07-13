时间选择器

author: xuwenjun

默认状态、悬浮状态、输入状态、失焦状态（时分）

```js
initialState = {value: ''};
onChange = value => {
    setState({
        value: value
    });
    console.log(value);
}
showSecond = false;
str = showSecond ? 'HH:mm:ss' : 'HH:mm';
disabledHours = () => [11,12,13];
disabledMinutes= () => [4,5,6];
disabledSeconds= () => [7,8,9];

<TimePicker
    style={{ width: 100 }}
    value={state.value}
    onChange={onChange}
    showHour={true}
    showMinute={true}
    showSecond={showSecond}
    use12Hours={false}
    hourStep={1}
    minuteStep={1}
    secondStep={1}
    inputReadOnly={false}
    disabled={false}
    allowEmpty={true}
    placeholder='小时：分钟'
    format={str}
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    disabledSeconds={disabledSeconds}
    hideDisabledOptions={false}
/>
```

默认状态、悬浮状态、输入状态、失焦状态(时分秒)

```js
onChange = value => {
    console.log(value);
}
showSecond = true;
str = showSecond ? 'HH:mm:ss' : 'HH:mm';
disabledHours = () => [11,12,13];
disabledMinutes= () => [4,5,6];
disabledSeconds= () => [7,8,9];

<TimePicker
    style={{ width: 100 }}
    onChange={onChange}
    showHour={true}
    showMinute={true}
    showSecond={showSecond}
    use12Hours={false}
    hourStep={1}
    minuteStep={1}
    secondStep={1}
    inputReadOnly={false}
    disabled={false}
    allowEmpty={true}
    placeholder='小时：分钟'
    format={str}
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    disabledSeconds={disabledSeconds}
    hideDisabledOptions={false}
/>
```

置灰状态

```js
onChange = value => {
    console.log(value);
}
showSecond = false;
str = showSecond ? 'HH:mm:ss' : 'HH:mm';
disabledHours = () => [11,12,13];
disabledMinutes= () => [4,5,6];
disabledSeconds= () => [7,8,9];

<TimePicker
    style={{ width: 100 }}
    onChange={onChange}
    showHour={true}
    showMinute={true}
    showSecond={showSecond}
    use12Hours={false}
    hourStep={1}
    minuteStep={1}
    secondStep={1}
    inputReadOnly={false}
    disabled={true}
    allowEmpty={true}
    placeholder='小时：分钟'
    format={str}
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    disabledSeconds={disabledSeconds}
    hideDisabledOptions={false}
/>
```

报错

```js
onChange = value => {
    console.log(value);
}
showSecond = false;
str = showSecond ? 'HH:mm:ss' : 'HH:mm';
disabledHours = () => [11,12,13];
disabledMinutes= () => [4,5,6];
disabledSeconds= () => [7,8,9];

<TimePicker
    style={{ width: 100 }}
    onChange={onChange}
    showHour={true}
    showMinute={true}
    showSecond={showSecond}
    use12Hours={false}
    hourStep={1}
    minuteStep={1}
    secondStep={1}
    inputReadOnly={false}
    disabled={false}
    allowEmpty={true}
    placeholder='小时：分钟'
    format={str}
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    disabledSeconds={disabledSeconds}
    hideDisabledOptions={false}
    errorMessage="ssssss"
    errorLocation=""
/>
```