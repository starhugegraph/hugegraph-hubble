日历

选择单日-默认状态
```js
<div>
    <Calendar />
</div>
```

日历禁用
```js
<div>
    <Calendar disabled={true}/>
</div>
```

选择单日-带入日期
```js
initialState = {
    time: '2019/02/11',
};

onSelectDay = params => {
    const beginTime = params.beginTime;
    setState({
        time: beginTime
    })
}

<div>
    <Calendar
        defaultBeginDate={state.time}
        beginDate={state.time}
        onSelectDay={this.onSelectDay}
        validateMinDate="2018-2-10"
        validateMaxDate="2019-5-25"
    />
</div>
```

选择单日-不能选择未来
```js
<div>
    <Calendar
      defaultBeginDate="2018-09-08"
      canSelectFuture={false}
    />
</div>
```
选择单日-选择时间
```js
initialState = {
    time: '2018-02-11 11:11'
};

onConfirm = params => {
    const beginTime = params.beginTime;
    setState({
        time: beginTime
    })
}

<div>
    <Calendar
      beginDate={state.time}
      canSelectTime={true}
      onConfirm={this.onConfirm}
       timeRules={2}
    />
</div>
```

选择单日-无初始时间-选择时间
```js
<div>
    <Calendar canSelectTime={true}/>
</div>
```
选择单日-无初始时间-选择时间-时分
```js
<div>
    <Calendar canSelectTime={true} timeRules={2} />
</div>
```
选择单日-无初始时间-选择时间-时
```js
<div>
    <Calendar canSelectTime={true} timeRules={3} />
</div>
```

选择一段时间-默认状态
```js
onSelectDay = params => {
    const beginTime = params.beginTime;
    const endTime = params.endTime;
    setState({
        beginTime,
        endTime
    })
}
<div>
    <Calendar
    //   beginDate={this.beginTime}
    //   endDate={this.endTime}
        validateMinDate="2019-2-10"
        validateMaxDate="2019-4-25"
        canSelectFuture={false}
        selectMode="multiple"
        onSelectDay={this.onSelectDay}
    />
</div>
```


比较一段时间-不展示开关
```js
onConfirm = params => {
    const beginTime = params.beginTime;
    const endTime = params.endTime;
    setState({
        beginTime,
        endTime
    })
}
<div>
    <Calendar
      defaultBeginDate="2018-09-08"
      defaultEndDate="2018-09-12"
      beginDate={state.beginTime}
      endDate={state.endDate}
      selectMode="compare"
      showCompareSwitch={false}
/>
</div>
```

比较一段时间-展示开关
```js
onConfirm = params => {
    const beginTime = params.beginTime;
    const endTime = params.endTime;
    const compareBeginTime = params.compareBeginTime;
    const compareEndTime = params.compareEndTime;
    setState({
        beginTime,
        endTime,
        compareBeginTime,
        compareEndTime
    })
}
<div>
    <Calendar
        defaultBeginDate="2018-09-08"
        defaultEndDate="2018-09-12"
        defaultCompareBeginDate="2018-9-13"
        defaultCompareEndDate="2018-9-18"
        validateMinDate="2018-2-10"
        validateMaxDate="2019-4-31"
        beginDate={state.beginTime}
        endDate={state.endDate}
        compareBeginDate={state.compareBeginTime}
        compareEndDate={state.compareEndDate}
        selectMode="compare"
        canSelectFuture={false}
        openCompareSwitch={false}
        onConfirm={this.onConfirm}
        rangeValidator={params => {
            const {
                endTime,
                beginTime,
                compareBeginTime
            } = params;
            if (beginTime === compareBeginTime) {
                return '请选择不同的时间段';
            }
            let timeCrossDiff = new Date(endTime).getTime() - new Date(beginTime).getTime();
            timeCrossDiff = parseInt(timeCrossDiff / (1000 * 60 * 60 * 24), 10);
            return timeCrossDiff > 365 ? '时间跨度不能超一年' : '';
        }}
/>
</div>
```