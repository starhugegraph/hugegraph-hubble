穿梭框：

author: zhangbo

基本交互
```js
const allDataMap = {
   1: {
       key: 1,
       title: '计划1',
       disabled: true
   },
   2: {
       key: 2,
       title: '计划2'
   },
   3: {
       key: 3,
       title: '计划3'
   },
   4: {
       key: 4,
       title: '计划4'
   },
   5: {
       key: 5,
       title: '计划5'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   7: {
       key: 7,
       title: '计划7'
   },
   8: {
       key: 8,
       title: '计划8'
   },
   9: {
       key: 9,
       title: '计划9'
   },
   10: {
       key: 10,
       title: '计划10'
   }
};
initialState = {
    allDataMap,
    selectedList: [],
    expandedSelectedKeys: [],
    searchValue: ''
};
const props = {
    treeName: '计划',
    maxSelectedNum: 10,
    candidateList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allDataMap: allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    showCandidateFooter: true,
    isShowLevelSelect: false,
    searchValue: state.searchValue,
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    searchRenderProps: {
        isShowDropDown: false
    },
    candidateTreeStyle: {
        width: 200
    },
    selectedTreeStyle: {
        width: 200
    }
};
<Transfer {...props}/>
```

已选数量到达上限
```js
const allDataMap = {
   1: {
       key: 1,
       title: '计划1'
   },
   2: {
       key: 2,
       title: '计划2',
       disabled: true
   },
   3: {
       key: 3,
       title: '计划3'
   },
   4: {
       key: 4,
       title: '计划4'
   },
   5: {
       key: 5,
       title: '计划5'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   7: {
       key: 7,
       title: '计划7'
   },
   8: {
       key: 8,
       title: '计划8'
   },
   9: {
       key: 9,
       title: '计划9'
   },
   10: {
       key: 10,
       title: '计划10'
   },
   11: {
       key: 11,
       title: '计划11'
   }
};
initialState = {
    allDataMap,
    selectedList: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    expandedSelectedKeys: [],
    searchValue: ''
};
const props = {
    treeName: '计划',
    maxSelectedNum: 10,
    candidateList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    allDataMap: state.allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    showCandidateFooter: true,
    isShowLevelSelect: false,
    searchValue: state.searchValue,
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    candidateTreeStyle: {
        width: 200
    },
    selectedTreeStyle: {
        width: 200
    }
};
<Transfer {...props}/>
```

批量操作
```js
const allDataMap = {
   1: {
       key: 1,
       title: '计划1'
   },
   2: {
       key: 2,
       title: '计划2'
   },
   3: {
       key: 3,
       title: '计划3'
   },
   4: {
       key: 4,
       title: '计划4'
   },
   5: {
       key: 5,
       title: '计划5'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   7: {
       key: 7,
       title: '计划7'
   },
   8: {
       key: 8,
       title: '计划8'
   },
   9: {
       key: 9,
       title: '计划9'
   },
   10: {
       key: 10,
       title: '计划10'
   },
   11: {
       key: 11,
       title: '计划11'
   }
};
initialState = {
    allDataMap,
    selectedList: [],
    expandedSelectedKeys: [2, 4],
    searchValue: ''
};
const props = {
    treeName: '计划',
    maxSelectedNum: 10,
    candidateList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    allDataMap: state.allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    showCandidateFooter: true,
    isShowLevelSelect: false,
    searchValue: state.searchValue,
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    candidateTreeStyle: {
        width: 200
    },
    selectedTreeStyle: {
        width: 200
    }
};
<Transfer {...props}/>
```

多列选择器（具体每行格式均可自定义，此处只作示意）
```js
const allDataMap = {
   1: {
       key: 1,
       title: '计划1'
   },
   2: {
       key: 2,
       title: '计划2'
   },
   3: {
       key: 3,
       title: '计划3'
   },
   4: {
       key: 4,
       title: '计划4'
   },
   5: {
       key: 5,
       title: '计划5'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   6: {
       key: 6,
       title: '计划6'
   },
   7: {
       key: 7,
       title: '计划7'
   },
   8: {
       key: 8,
       title: '计划8'
   },
   9: {
       key: 9,
       title: '计划9'
   },
   10: {
       key: 10,
       title: '计划10'
   }
};
const CandidateItem = props => {
    const {title} = props;
    return (
        <span>
            <span style={{display: 'inline-block', width: 100}}>{title}</span>
            <span style={{display: 'inline-block', width: 80}}>{Math.floor((Math.random()*1000)+1)}</span>
            <span style={{display: 'inline-block', width: 80}}>北京</span>
        </span>
    );
};
const CandidateTitleRender = props => {
    const {title, treeName, selectedNum, maxSelectedNum, showSelectedNum, unSelectedNum, showCandidateNum} = props;
    let titleDetail = `${title}${treeName}`;
    if (selectedNum != null && showSelectedNum) {
        titleDetail = `${titleDetail}(${selectedNum}/${maxSelectedNum})`;
    }
    if (unSelectedNum != null && showCandidateNum) {
        titleDetail = `${titleDetail}(${unSelectedNum})`;
    }
    return (
        <span>
            <span style={{display: 'inline-block', width: 100}}>{titleDetail}</span>
            <span style={{display: 'inline-block', width: 80}}>消费</span>
            <span style={{display: 'inline-block', width: 80}}>地域</span>
        </span>
    );
};
initialState = {
    allDataMap,
    selectedList: [],
    expandedSelectedKeys: [],
    searchValue: ''
};
const props = {
    treeName: '计划',
    maxSelectedNum: 10,
    candidateList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    allDataMap: state.allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    CandidateItem,
    CandidateTitleRender,
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    showCandidateFooter: true,
    isShowLevelSelect: false,
    searchValue: state.searchValue,
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    candidateTreeStyle: {
        width: 350
    },
    selectedTreeStyle: {
        width: 250
    }
};
<Transfer {...props}/>
```

多层级选择器
```js
const dataSource = {
   1: {
       key: 1,
       title: '计划1',
       children: [4]
   },
   2: {
       key: 2,
       title: '计划2',
       children: [5, 6]
   },
   3: {
       key: 3,
       title: '计划3',
       children: [7, 8, 9]
   },
   4: {
       key: 4,
       title: '单元1',
       children: [10]
   },
   5: {
       key: 5,
       title: '单元2',
       children: [11, 12]
   },
   6: {
       key: 6,
       title: '单元3',
       children: [13, 14]
   },
   7: {
       key: 7,
       title: '单元4',
       children: [15, 16]
   },
   8: {
       key: 8,
       title: '单元5',
       children: [17, 18, 19]
   },
   9: {
       key: 9,
       title: '单元6',
       children: [20, 21, 22]
   },
   10: {
       key: 10,
       title: '关键词1'
   },
   11: {
       key: 11,
       title: '关键词2'
   },
   12: {
       key: 12,
       title: '关键词3'
   },
   13: {
       key: 13,
       title: '关键词4'
   },
   14: {
       key: 14,
       title: '关键词5'
   },
   15: {
       key: 15,
       title: '关键词6'
   },
   16: {
       key: 16,
       title: '关键词7'
   },
   17: {
       key: 17,
       title: '关键词8'
   },
   18: {
       key: 18,
       title: '关键词9'
   },
   19: {
       key: 19,
       title: '关键词10'
   },
   20: {
       key: 20,
       title: '关键词11'
   },
   21: {
       key: 21,
       title: '关键词12'
   },
   22: {
       key: 22,
       title: '关键词13'
   }
};
initialState = {
    dataSource,
    allDataMap: dataSource,
    selectedList: [],
    expandedSelectedKeys: [],
    searchValue: ''
};
const props = {
    showCandidateTotalCount: false,
    dataSource: initialState.dataSource,
    treeName: '关键词',
    maxSelectedNum: 10,
    candidateList: [1, 2, 3],
    allDataMap: state.allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    showCandidateFooter: true,
    searchValue: state.searchValue,
    handleLevelChange: e => {
        console.log(e);
    },
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    isShowLevelSelect: false,
    candidateTreeStyle: {
        width: 250
    },
    selectedTreeStyle: {
        width: 250
    }
};
<Transfer {...props}/>
```

多层级选择器-指定层级搜索（筛选逻辑在业务中，此处只作示意）
```js
const dataSource = {
   1: {
       key: 1,
       title: '计划1',
       children: [4]
   },
   2: {
       key: 2,
       title: '计划2',
       children: [5, 6]
   },
   3: {
       key: 3,
       title: '计划3',
       children: [7, 8, 9]
   },
   4: {
       key: 4,
       title: '单元1',
       children: [10]
   },
   5: {
       key: 5,
       title: '单元2',
       children: [11, 12]
   },
   6: {
       key: 6,
       title: '单元3',
       children: [13, 14]
   },
   7: {
       key: 7,
       title: '单元4',
       children: [15, 16]
   },
   8: {
       key: 8,
       title: '单元5',
       children: [17, 18, 19]
   },
   9: {
       key: 9,
       title: '单元6',
       children: [20, 21, 22]
   },
   10: {
       key: 10,
       title: '关键词1'
   },
   11: {
       key: 11,
       title: '关键词2'
   },
   12: {
       key: 12,
       title: '关键词3'
   },
   13: {
       key: 13,
       title: '关键词4'
   },
   14: {
       key: 14,
       title: '关键词5'
   },
   15: {
       key: 15,
       title: '关键词6'
   },
   16: {
       key: 16,
       title: '关键词7'
   },
   17: {
       key: 17,
       title: '关键词8'
   },
   18: {
       key: 18,
       title: '关键词9'
   },
   19: {
       key: 19,
       title: '关键词10'
   },
   20: {
       key: 20,
       title: '关键词11'
   },
   21: {
       key: 21,
       title: '关键词12'
   },
   22: {
       key: 22,
       title: '关键词13'
   }
};
initialState = {
    dataSource,
    allDataMap: dataSource,
    selectedList: [],
    expandedSelectedKeys: [],
    searchValue: '',
    candidateList: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    level: 'campaign',
    placeholder: ''
};
const props = {
    showCandidateTotalCount: false,
    placeholder: state.placeholder,
    dataSource: initialState.dataSource,
    treeName: '关键词',
    maxSelectedNum: 10,
    candidateList: state.candidateList,
    allDataMap: state.allDataMap,
    expandedSelectedKeys: state.expandedSelectedKeys,
    selectedList: state.selectedList,
    onSearchBoxFocus: () => {
        setState({
            placeholder: 'aaa'
        })
    },
    handleSelect: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleDelete: (selectedList, allDataMap) => {setState({
        allDataMap,
        selectedList
    })},
    handleDeleteAll: (selectedList, allDataMap, expandedSelectedKeys) => {setState({
        allDataMap,
        selectedList,
        expandedSelectedKeys
    })},
    handleSelectedExpand: expandedSelectedKeys => {setState({
        expandedSelectedKeys
    })},
    isShowLevel: true,
    showCandidateFooter: false,
    searchValue: state.searchValue,
    handleLevelChange: value => {
        setState({
            level: value
        })
    },
    onSearchChange: e => {
        setState({
            searchValue: e.target.value
        })
    },
    handleSearch: e => {
        if (state.level === 'adgroup') {
            setState({
                candidateList: [4, 5, 6, 7, 8, 9]
            })
        }
        if (state.level === 'campaign') {
            setState({
                candidateList: [1, 2, 3]
            })
        }
        if (state.level === 'keyword') {
            setState({
                candidateList: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
            })
        }
    },
    levelOptions: [
        {
            value: 'campaign',
            label: '计划'
        },
        {
            value: 'adgroup',
            label: '单元'
        },
        {
            value: 'keyword',
            label: '关键词'
        }
    ],
    isShowLevelSelect: true,
    className: 'hehehehe',
    candidateTreeStyle: {
        width: 250
    },
    selectedTreeStyle: {
        width: 250
    }
};
<Transfer {...props}/>
```


