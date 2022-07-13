多层级联选择

author: huangshiming

普通级联器
```js
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }, {
      value: 'zhonghuamenss',
      label: 'Zhong Hua Menss',
    }, {
      value: 'zhonghuamensssss',
      label: 'Zhong Hua Menss',
    }],
  }],
}];
handleChange = (value, selectedOptions) => {
    console.log(value);
}
<Cascader 
    options={options}
    onChange={this.handleChange}
    placeholder="Please select"
    showSearch={true}
    width={200}
/>
```
支持搜索级联器
```js
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }, {
      value: 'zhondddghuamen',
      label: 'Zhong Hua Men',
    }, {
      value: 'zhonghssssuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
handleChange = e => {
    console.log(e);
}

<Cascader 
    options={options}
    onChange={this.handleChange}
    placeholder="Please select"
    showSearch={{filter: (inputValue, path) => {
        // const flag = path.some(option => {
        //     const label = (option.label).toLowerCase();
        //     return label.indexOf (inputValue.toLowerCase()) > -1
        // });
        // return flag;
        return path.some(option => option.label.indexOf(inputValue) > -1);
    }, matchInputWidth: false}}
/>
```

小尺寸级联器
```js
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];
handleChange = e => {
    console.log(e);
}
<Cascader 
    options={options}
    onChange={this.handleChange}
    placeholder="Please select"
    size="small"
/>
```