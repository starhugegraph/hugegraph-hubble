普通地域  支持国家省市区四级联动

```js
<Region  />
```

普通地域  支持国家省市区四级联动 存在禁用

```js
<Region
    disabledValue={{
        5: '该地域不可用'
    }}
/>
```

普通地域 自定义传入 选中的value, disabled的value

```js
initialState = {
    selectedValue: [1,2],
    disbaledValue: {
        5: '该地域不可用'
    }
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue,
        disbaledValue: {
            3: '该地域不可用',
            7: '该地域不可用'
        }
    });
}
<Region
    selectedValue={state.selectedValue}
    disabledValue={state.disbaledValue}
    onChange={this.onChange}
/>
```

普通地域 只能选国家、省、市，不能选择区

```js
initialState = {
    selectedValue: [5],
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<Region
    showDistrict={false}
    selectedValue={state.selectedValue}
    disabledValue={{
        5: '该地域不可用',
        8: '',
        48: '该地域不可用'
    }}
    onChange={this.onChange}
/>
```

普通地域 支持自定义地域

```js
initialState = {
    selectedValue: [1],
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<Region
    selectedValue={state.selectedValue}
    onChange={this.onChange}
    customRegion={{
        regionNames: {
            1: '湖南省',
            378: "长沙市",
            379: "株洲市",
            380: "常德市",
            381: "张家界市",
            382: "吉首市",
            993: '中部地区'
        },
        directCityCode: [],
        regionFiliationMap: {
            1: [378, 379, 380, 381, 382],
            993: [1]
        },
        ancestorsRegionMap: {
            1: 993,
            378: 1,
            379: 1,
            380: 1,
            381: 1,
            382: 1
        },
        topLevel: [993]
    }}
/>
```


普通下拉选择地域 支持国家省市区四级联动

```js
import Region from './index';

<Region.SelectRegion  />
```

普通下拉选择地域 自定义传入 选中的value, disabled的value

```js
import Region from './index';

initialState = {
    selectedValue: [1, 2],
};
onConfirm = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<Region.SelectRegion
    selectedValue={state.selectedValue}
    disabledValue={{
        5: '该地域不可用',
        8: '',
        48: '该地域不可用'
    }}
    onConfirm={this.onConfirm}
/>
```

普通下拉选择地域 只能选国家、省、市，不能选择区

```js
import Region from './index';

initialState = {
    selectedValue: [1],
};
onConfirm = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<Region.SelectRegion
    showDistrict={false}
    selectedValue={state.selectedValue}
    disabledValue={{
        8: '',
        48: '该地域不可用'
    }}
    onConfirm={this.onConfirm}
/>
```

普通下拉选择地域 校验错误

```js
import Region from './index';

initialState = {
    selectedValue: [1],
};
onConfirm = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
validator = selectedValue => {
    if (!selectedValue.length) {
        return '请选择地域';
    }
    return null;
}
<Region.SelectRegion
    showDistrict={false}
    selectedValue={state.selectedValue}
    disabledValue={{
        8: '',
        48: '该地域不可用'
    }}
    onConfirm={this.onConfirm}
    validator={validator}
/>
```

普通下拉地域 支持自定义地域

```js
import Region from './index';

initialState = {
    selectedValue: [1],
};
onConfirm = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<Region.SelectRegion
    selectedValue={state.selectedValue}
    onConfirm={this.onConfirm}
    customRegion={{
        regionNames: {
            1: '湖南省',
            378: "长沙市",
            379: "株洲市",
            380: "常德市",
            381: "张家界市",
            382: "吉首市",
            993: '中部地区'
        },
        directCityCode: [],
        regionFiliationMap: {
            1: [378, 379, 380, 381, 382],
            993: [1]
        },
        ancestorsRegionMap: {
            1: 993,
            378: 1,
            379: 1,
            380: 1,
            381: 1,
            382: 1
        },
        topLevel: [993]
    }}
/>
```

普通地域 单选地域

```js
import Region from './index';

<div>
    <Region.SingleRegion />
</div>
```

普通地域 单选地域 传入selectedValue和disbaledValue

```js
import Region from './index';

initialState = {
    selectedValue: [1,2],
    disbaledValue: [5]
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<div>
    <Region.SingleRegion
        selectedValue={state.selectedValue}
        disabledValue={state.disbaledValue}
        onChange={this.onChange}
    />
</div>
```

普通地域 单选地域 传入selectedValue和disbaledValue， 不展示区

```js
import Region from './index';

initialState = {
    selectedValue: [1,2],
    disbaledValue: [5]
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<div>
    <Region.SingleRegion
        selectedValue={state.selectedValue}
        disabledValue={state.disbaledValue}
        onChange={this.onChange}
        showDistrict={false}
    />
</div>
```


普通地域 单选地域 传入selectedValue和disbaledValue， 不展示区 - 展示特定区域（台湾）

```js
import Region from './index';

initialState = {
    selectedValue: [1,2],
    disbaledValue: [5]
};
onChange = params => {
    const selectedValue = params.selectedValue;
    setState({
        selectedValue
    });
}
<div>
    <Region.SingleRegion
        selectedValue={state.selectedValue}
        disabledValue={state.disbaledValue}
        onChange={this.onChange}
        showDistrict={false}
        additionOption={[35]}
    />
</div>
```
