跨层级下拉选择

author: huangshiming


跨层级下拉选择
```js
handleMenuClick = e => {
  console.log(e);
}

initialState = {
  list: [{
      label: `单元1111`,
      value: 11,
      parent: ['计划1', '单元2'],
      children: [{
          label: '关键词2222',
          value: 112222,
      }, {
          label: '关键词22223',
          value: 1122223,
      }, {
          label: '关键词22224',
          value: 1122224,
      }]
  }, {
      label: `单元11112`,
      value: 22,
      parent: ['计划1', '单元2'],
      children: [],
      children: [{
          label: '关键词2222',
          value: 22234567,
      }, {
          label: '关键词22223',
          value: 22234568,
      }, {
          label: '关键词22224',
          value: 22234569,
      }]
  },{
      label: `单元11113`,
      value: 33,
      parent: ['计划1', '单元2']
  }],
  selectLevel: 'campaign',
  searchPlaceholder: '请输入计划或单元'
}
onSearchChange = value => {
  setState({
      list: [
            {
                label: `单元1111323444`,
                value: +`111111111111111113111`,
                parent: ['计划1', '单元2'],
                children: [
                    {
                        label: '关键词22224',
                        value: `keyword222234`
                    }
                ]
            },
            {
                label: `单元1111323ww`,
                value: +`111111111111w1113111`,
                parent: ['计划1', '单元2'],
                children: [
                    {
                        label: '关键词22224',
                        value: `keyword22w2234`
                    },
                    {
                        label: '关键词22225',
                        value: `keyword234`
                    },
                    {
                        label: '关键词22226',
                        value: `keywodd2w2234`
                    },
                    {
                        label: '关键词22227',
                        value: `keywordssw2234`
                    }
                ]
            }
        ]
  })
}
hanldLevelChange = value => {
    setState({
        selectLevel: value,
        list: [
            {
                label: `${value}111133d`,
                value: +`1111111111111dd`,
                parent: [`计划1`],
                children: [
                    {
                        label: `关键词22224${value}`,
                        value: `kss34`
                    },
                    {
                        label: `关键词22225${value}`,
                        value: `keyword2ssss34`
                    },
                    {
                        label: `关键词22226${value}`,
                        value: `keywdd2w2234`
                    },
                    {
                        label: `关键词222d26${value}`,
                        value: `keywordddssw2234`
                    }
                ]
            }
        ]
    })
}

onTitleClick = e => {
    const key = e.key; // 当前层级的value
    const list = [{
        label: `单元1111`,
        value: 11,
        parent: ['计划1', '单元2'],
        children: [{
            label: '关键词x2222',
            value: 112222,
        }, {
            label: '关键词x22223',
            value: 1122223,
        }, {
            label: '关键词x22224',
            value: 1122224,
        }]
    }, {
        label: `单元11112`,
        value: 22,
        parent: ['计划1', '单元2'],
        children: [{
            label: '关键词gg3222',
            value: 212222,
        }, {
            label: '关键词kk32223',
            value: 2122223,
        }, {
            label: '关键词ii32224',
            value: 3122224,
        }],
        emptyText: '数据加载中...'
    },{
        label: `单元11113`,
        value: 33,
        parent: ['计划1', '单元2']
    }];
    if (key === '22') {
        setTimeout(() => {
            setState({
                list
            })
        }, 1500);
    }
}

onSearchInputFocus = e => {
    setState({
        searchPlaceholder: '请输入计划'
    });
}
<CrossSelect
  options={state.list}
  handleMenuClick={this.handleMenuClick}
  onSearchChange={this.onSearchChange}
  hanldLevelChange={this.hanldLevelChange}
  onTitleClick={this.onTitleClick}
  searchPlaceholder={state.searchPlaceholder}
  onSearchInputFocus={this.onSearchInputFocus}
  notFound="没有找到需要的计划"
  textImpressionWay="all"
  style={{width: '200px'}}
  levelList={[{
      key: 1,
      value: 'campaign',
      label: '计划'
  }, {
      key: 2,
      value: 'adgroup',
      label: '单元'
  }]}
  selectValue={state.selectLevel}
  />
```