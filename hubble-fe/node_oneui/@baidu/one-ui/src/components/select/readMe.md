下拉选择：

author: huangshiming

普通下拉单选

```js
initialState = {
    value: ''
};
handleChange = value => {
  setState({
      value
  })
}
const Option = Select.Option;
<Select
    value={state.value}
    onChange={this.handleChange}
    trigger="hover"
    selectorName="地域选择器"
    autoFocus={true}
>
    <Option value={0}>哈哈哈</Option>
    <Option value={1}>嘿嘿嘿</Option>
    <Option value={2} disabled>嚯嚯嚯</Option>
    <Option value={3}>啦啦啦</Option>
</Select>
```
单层单选 - hover出下拉框 - 小尺寸
```js
handleChange = value => {
  setState({
      value
  })
}
const Option = Select.Option;
<Select
    value={state.value}
    style={{ width: 120 }}
    onChange={this.handleChange}
    trigger="hover"
    size="small"
    selectorName="请选择"
>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Huangxiaomeng</Option>
</Select>
```

单层单选 - 点击出下拉框

```js
handleChange = e => {
  console.log(e);
}
const Option = Select.Option;
<Select
    defaultValue="lucy"
    style={{ width: 120 }}
    onChange={this.handleChange}
>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
</Select>
```

单层单选 - hover出下拉框 - 禁用

```js
handleChange = e => {
  console.log(e);
}
const Option = Select.Option;
<Select
    defaultValue="lucy"
    style={{ width: 120 }}
    onChange={this.handleChange}
    disabled={true}
    trigger="click"
    disabledReason='该计划不可设置'
>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
</Select>
```

单层单选 - 无默认选中值 - 支持传入选择器名称作为默认展示

```js
handleChange = e => {
  console.log(e);
}
const Option = Select.Option;
<Select
    style={{ width: 120 }}
    onChange={this.handleChange}
    trigger="hover"
    selectorName="地域选择器"
>
    <Option value="jack">Jack</Option>
    <Option value="lucy">Lucy</Option>
    <Option value="disabled" disabled>Disabled</Option>
</Select>
```

单层单选-支持远程搜索数据-情况1-再次选中上次飘黄的部分不飘黄，再次输入飘黄（带入上次输入结果）

```js
const Option = Select.Option;
const SearchText = Select.SearchText;
handleChange = value => {
    setState({
      value,
      searchValue: ''
    });
}
handleBlur = () => {
  setState({
        searchValue: ''
    })
}

handleFocus = () => {
  setState({
        searchValue: ''
    })
}

onSearch = string => {
    setState({
        searchValue: string
    });
    setTimeout(() => {
        dataSource = [];
        for (let i = 0; i < 3; i++) {
            dataSource.push({
                value: Math.random() + `${i}`,
                text: `计划${string}${i}鲜花`
            })
        }
        setState({
            data: dataSource
        })
    }, 300);
}

initialState = {
    value: undefined,
    searchValue: undefined,
    data: []
};
<Select
    value={state.value}
    placeholder="请选择计划"
    showArrow={true}
    style={{ width: 150 }}
    defaultActiveFirstOption={false}
    showSearch
    filterOption={false}
    onChange={this.handleChange}
    onSearch={this.onSearch}
    onBlur={this.handleBlur}
    onFocus={this.handleFocus}
    notFoundContent={'没有可选计划'}
>
    {
        state.data.map((item, index) => {
            return (
                <Option
                    key={item.value}
                    value={item.value}
                    title={item.text}
                >
                    <SearchText
                        text={item.text}
                        showSearch
                        searchValue={state.searchValue}
                    />
                </Option>
            )
        })
    }
</Select>
```

单层单选-支持远程搜索数据-情况2-再次选中上次搜索结果不带入下一次搜索 （mock数据模拟后端接口，隔一秒再选）

```js
const Option = Select.Option;
const SearchText = Select.SearchText;
handleChange = value => {
    setState({
      value,
      searchValue: ''
    });
    setTimeout(() => {
        setState({
            data: []
        });
    }, 1000);
}
handleBlur = () => {
  setState({
        searchValue: ''
    })
}

handleFocus = () => {
  setState({
        searchValue: ''
    })
}

onSearch = string => {
    setState({
        searchValue: string
    });
    setTimeout(() => {
        dataSource = [];
        for (let i = 0; i < 3; i++) {
            dataSource.push({
                value: Math.random() + `${i}`,
                text: `计划${string}${i}鲜花`
            })
        }
        setState({
            data: dataSource
        })
    }, 300);
}

initialState = {
    value: undefined,
    searchValue: undefined,
    data: []
};
<Select
    value={state.value}
    placeholder="请选择计划"
    showArrow={true}
    style={{ width: 150 }}
    defaultActiveFirstOption={false}
    showSearch
    filterOption={false}
    onChange={this.handleChange}
    onSearch={this.onSearch}
    onBlur={this.handleBlur}
    onFocus={this.handleFocus}
    notFoundContent={'没有可选计划'}
>
    {
        state.data.map((item, index) => {
            return (
                <Option
                    key={item.value}
                    value={item.value}
                    title={item.text}
                >
                    <SearchText
                        text={item.text}
                        showSearch
                        searchValue={state.searchValue}
                    />
                </Option>
            )
        })
    }
</Select>
```

单层单选-支持固定数据内部筛选-清除搜索后带入默认搜索结果

```js
const SearchText = Select.SearchText;
const Option = Select.Option;
handleChange = value => {
    setState({
        searchValue: ''
    })
}

handleBlur = () => {
  setState({
        searchValue: ''
    })
}

handleFocus = () => {
  console.log('focus');
}
onSearch = string => {
    setState({
        searchValue: string
    })
}
initialState = {
    searchValue: undefined,
};
 <Select
    showSearch
    style={{ width: 200 }}
    placeholder="搜索姓名"
    optionFilterProp="children"
    onChange={this.handleChange}
    onFocus={this.handleFocus}
    onBlur={this.handleBlur}
    onSearch={this.onSearch}
    filterOption={(input, option) => {
        return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }}
  >
    <Option value="jack">
        <SearchText
            text="Jack"
            showSearch
            searchValue={state.searchValue}
        />
    </Option>
    <Option value="lucy">
        <SearchText
            text="Lucy"
            showSearch
            searchValue={state.searchValue}
        />
    </Option>
    <Option value="tom">
        <SearchText
            text="Tom"
            showSearch
            searchValue={state.searchValue}
        />
    </Option>
  </Select>
```

多层级单选-普通级联器

```js
import Cascader from '../cascader';

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
}, {
  value: 'hunan',
  label: 'Hunan'
}, {
  value: 'shanghai',
  label: 'Shanghai',
  disabled: true
}];
handleChange = e => {
    console.log(e);
}
<Cascader
    options={options}
    onChange={this.handleChange}
    placeholder="Please select"
    style={{width: 300}}
/>
```

多层级单选-普通级联器-展示默认的已选

```js
import Cascader from '../cascader';

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
}, {
  value: 'hunan',
  label: 'Hunan'
}];
handleChange = e => {
    console.log(e);
}
<Cascader
    options={options}
    onChange={this.handleChange}
    placeholder="Please select"
    style={{width: 300}}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
/>
```

支持搜索级联器

```js
import Cascader from '../cascader';

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
    showSearch={{filter: (inputValue, path) => {
        const flag = path.some(option => {
            const label = (option.label).toLowerCase();
            return label.indexOf (inputValue.toLowerCase()) > -1
        });
        return flag;
    }, matchInputWidth: false}}
    style={{width: 300}}
/>
```

多层级单选-普通级联器-通过移入展开下级菜单，点击完成选择

```js
import Cascader from '../cascader';

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

function onChange(value) {
  console.log(value);
}

// Just show the latest item.
function displayRender(label) {
  return label[label.length - 1];
}
<Cascader
    options={options}
    expandTrigger="hover"
    displayRender={this.displayRender}
    onChange={this.onChange}
  />
```

小尺寸级联器

```js
import Cascader from '../cascader';

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

多层级单选-普通级联器-选择即改变

```js
import Cascader from '../cascader';

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

function onChange(value) {
  console.log(value);
}

<Cascader style={{width: 300}} options={options} onChange={onChange} changeOnSelect />
```

多层单选-动态加载数据

```js
import Cascader from '../cascader';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  isLeaf: false,
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  isLeaf: false,
}];
initialState = {
    options,
  };

  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      targetOption.children = [{
        label: `${targetOption.label} Dynamic 1`,
        value: 'dynamic1',
      }, {
        label: `${targetOption.label} Dynamic 2`,
        value: 'dynamic2',
      }];
      setState({
        options: [...state.options],
      });
    }, 1000);
  }
<Cascader
        options={state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        changeOnSelect
      />
```

单层多选多选 - 支持远程数据搜索

```js
const Option = Select.Option;
const CheckboxText = Select.CheckboxText;
const maxCount = 6;
const children = [];
for (var i = 10; i < 36; i++) {
    children.push({
        label: `鲜花${i.toString(36) + i}`,
        value: i
    });
}
initialState = {
    searchValue: '',
    source: [],
    children: []
};
handleChange = e => {
    const length = e.length;
    setState({
        source: [...e],
        searchValue: ''
    })
}
onSearch = val => {
    setState({
        searchValue: val
    })
    setTimeout(() => {
        const children = [];
        for (let i = 10; i < 36; i++) {
            children.push({
                    label: `${Math.round(Math.random() * 100)}鲜花${i.toString(36) + i}`,
                    value: `${Math.random()}`
            });
        }
        setState({
            children: [...children]
        })
    }, 1000);
}
<Select
    mode="multiple"
    placeholder="您可选择5个业务点"
    onChange={this.handleChange}
    width={400}
    maxTagCount={maxCount}
    notFoundContent="没有找到你的业务点？"
    defaultActiveFirstOption={false}
    showSearch
    onSearch={this.onSearch}
    filterOption={false}
>

        {
            state.children.map((item, index) => {
                return (
                    <Option key={item.value} label={item.label}>
                        <CheckboxText
                            label={item.label}
                            value={item.value}
                            searchValue={state.searchValue}
                            source={state.source}
                        />
                    </Option>
                )
            })
        }
</Select>
```

单层多选 - 内部筛选

```js
const Option = Select.Option;
const OptGroup = Select.OptGroup;
const CheckboxText = Select.CheckboxText;
const maxCount = 6;
const children = [];
const children2 = [];
for (var i = 10; i < 15; i++) {
    children.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}

for (var i = 109; i < 115; i++) {
    children2.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}
initialState = {
    searchValue: '',
    source: [],
    children: []
};
handleChange = e => {
    const length = e.length;
    setState({
        source: [...e],
        searchValue: ''
    })
}
onSearch = val => {
    setState({
        searchValue: val
    })
}
<Select
    mode="multiple"
    placeholder="您可选择5个业务点"
    onChange={this.handleChange}
    style={{ width: 300 }}
    maxTagCount={maxCount}
    notFoundContent="没有找到你的业务点？"
    defaultActiveFirstOption={false}
    showSearch
    onSearch={this.onSearch}
>
    <OptGroup key="website" label="已有业务点">
    {
        children.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
    <OptGroup key="website-2" label="未选中业务点">
    {
        children2.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
</Select>
```

单层多选 - 枚举回填

```js
const Option = Select.Option;
const CheckboxText = Select.CheckboxText;
const OptGroup = Select.OptGroup;
const maxCount = 6;
const children = [];
const children2 = [];
for (var i = 10; i < 15; i++) {
    children.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}

for (var i = 109; i < 115; i++) {
    children2.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}
initialState = {
    searchValue: '',
    source: [],
    children: []
};
handleChange = e => {
    const length = e.length;
    setState({
        source: [...e]
    })
}
onSearch = val => {
    setState({
        searchValue: val
    })
}
<Select
    mode="multiple"
    placeholder="您可选择5个业务点"
    onChange={this.handleChange}
    style={{ width: 300 }}
    maxTagCount={maxCount}
    notFoundContent="没有找到你的业务点？"
    defaultActiveFirstOption={false}
    showSearch
    onSearch={this.onSearch}
    titleCallback={{
        type: 'enum', // 三类回填 enum, list, count
        selectorName: '' // 选择已选计数需要填写
    }}
>
    <OptGroup key="website" label="已有业务点">
    {
        children.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
    <OptGroup key="website-2" label="未选中业务点">
    {
        children2.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
</Select>
```

单层多选 - 陈列计数

```js
const Option = Select.Option;
const CheckboxText = Select.CheckboxText;
const OptGroup = Select.OptGroup;
const maxCount = 6;
const children = [];
const children2 = [];
for (var i = 10; i < 15; i++) {
    children.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}

for (var i = 109; i < 115; i++) {
    children2.push({
        label: `鲜花${i.toString(36) + i}`,
        value: `鲜花${i.toString(36) + i}`
    });
}
initialState = {
    searchValue: '',
    source: [],
    children: []
};
handleChange = e => {
    const length = e.length;
    setState({
        source: [...e]
    })
}
onSearch = val => {
    setState({
        searchValue: val
    })
}
<Select
    mode="multiple"
    placeholder="您可选择5个业务点"
    onChange={this.handleChange}
    style={{ width: 300 }}
    maxTagCount={maxCount}
    notFoundContent="暂无数据"
    defaultActiveFirstOption={false}
    showSearch
    onSearch={this.onSearch}
    titleCallback={{
        type: 'count', // 三类回填 enum, list, count
        selectorName: '地域选择器' // 选择已选计数需要填写
    }}
>
    <OptGroup key="website" label="已有业务点">
    {
        children.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
    <OptGroup key="website-2" label="未选中业务点">
    {
        children2.map((item, index) => {
            return (
                  <Option key={item.value}>
                    <CheckboxText
                        label={item.label}
                        value={item.value}
                        searchValue={state.searchValue}
                        source={state.source}
                    />
                </Option>
            )
        })
    }
    </OptGroup>
</Select>
```

单层多选-支持自定义节点

```js
import Tooltip from '../tooltip';

const Option = Select.Option;
const maxCount = 6;
initialState = {
    searchValue: '',
    source: [],
    children: []
};
handleChange = e => {
    const length = e.length;
    setState({
        source: [...e]
    })
}
onSearch = val => {
    setState({
        searchValue: val
    })
}
<Select
    mode="multiple"
    placeholder="您可选择5个业务点"
    onChange={this.handleChange}
    style={{ width: 300 }}
    maxTagCount={maxCount}
    notFoundContent="没有找到你的业务点？"
    defaultActiveFirstOption={false}
    showSearch
    onSearch={this.onSearch}
    filterOption={false}
>
    <Option type="custom" key="custom-select">
        <Tooltip title={`将业务点"${state.searchValue}"反馈给开发团队`} placement="topLeft">
            <span style={{color: '#3998FC'}}>{`将业务点"${state.searchValue}"反馈给开发团队`} </span>
        </Tooltip>
    </Option>
</Select>
```

复合内容下拉选择 - 部分枚举

```js
import Checkbox from '../checkbox';

const CheckboxGroup = Checkbox.Group;
const SelectPopOver = Select.SelectPopOver;
allList = ['Apple', 'Pear', 'Orange'];
initialState = {indeterminate: true, checkAll: false, checkedList: ['Apple']};
<SelectPopOver overlay={(
    <div style={{height: 300, width: '100%'}}>
        <span>这是一个自定义操作区域（请传入需要操作的node结构）</span>
        <div>
        <Checkbox
        indeterminate={state.indeterminate}
        onChange={e => setState({
            indeterminate: false,
            checkAll: e.target.checked,
            checkedList: e.target.checked ? allList : [],
        })}
        checked={state.checkAll}
        >
        部分选中态
        </Checkbox>
        <CheckboxGroup options={allList} value={state.checkedList} onChange={checkedList => setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < allList.length),
            checkAll: checkedList.length === allList.length,
        })}></CheckboxGroup>
            </div>
        </div>
    )}
    value={state.checkedList}
    titleCallback={{
        type: 'enum',
        selectorName: '地域选择器'
    }}
/>
```

复合内容下拉选择 - 已选计数

```js
import Checkbox from '../checkbox';

const CheckboxGroup = Checkbox.Group;
const SelectPopOver = Select.SelectPopOver;
allList = ['Apple', 'Pear', 'Orange'];
initialState = {indeterminate: true, checkAll: false, checkedList: ['Apple']};
<SelectPopOver overlay={(
    <div style={{height: 300, width: '100%'}}>
        <span>这是一个自定义操作区域（请传入需要操作的node结构）</span>
        <div>
        <Checkbox
        indeterminate={state.indeterminate}
        onChange={e => setState({
            indeterminate: false,
            checkAll: e.target.checked,
            checkedList: e.target.checked ? allList : [],
        })}
        checked={state.checkAll}
        >
        部分选中态
        </Checkbox>
        <CheckboxGroup options={allList} value={state.checkedList} onChange={checkedList => setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < allList.length),
            checkAll: checkedList.length === allList.length,
        })}></CheckboxGroup>
            </div>
        </div>
    )}
    value={state.checkedList}
    titleCallback={{
        type: 'count',
        selectorName: '地域选择器'
    }}
/>
```

复合内容下拉选择 - 陈列

```js
import Checkbox from '../checkbox';

const CheckboxGroup = Checkbox.Group;
const SelectPopOver = Select.SelectPopOver;
allList = ['Apple', 'Pear', 'Orange', 'waterMellon', 'mangguo', 'baicai'];
initialState = {indeterminate: true, checkAll: false, checkedList: []};
<SelectPopOver overlay={(
    <div style={{height: 200, width: '100%'}}>
        <span>这是一个自定义操作区域（请传入需要操作的node结构）</span>
        <div>
        <Checkbox
        indeterminate={state.indeterminate}
        onChange={e => setState({
            indeterminate: false,
            checkAll: e.target.checked,
            checkedList: e.target.checked ? allList : [],
        })}
        checked={state.checkAll}
        >
        部分选中态
        </Checkbox>
        <CheckboxGroup options={allList} value={state.checkedList} onChange={checkedList => setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < allList.length),
            checkAll: checkedList.length === allList.length,
        })}></CheckboxGroup>
            </div>
        </div>
    )}
    value={state.checkedList}
    titleCallback={{
        type: 'list',
        selectorName: '地域选择器'
    }}
    maxTagCount={5}
/>
```
