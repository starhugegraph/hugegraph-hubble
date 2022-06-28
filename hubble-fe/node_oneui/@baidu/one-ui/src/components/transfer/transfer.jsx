import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import warning from 'warning';
import {IconClose} from '@baidu/one-ui-icon';
import Tree from '../tree/index';
import Input from '../input';
import Checkbox from '../checkbox';
import Tooltip from '../tooltip';
import Button from '../button';
import Select from '../select';
import tools from '../../core';

const {
    formatTransferDisbaledKeys,
    getTransferData,
    formatParentDisabled,
    isDisabledKeysChange,
    isSelectedDisabled,
    isParentKeyDisabled,
    isAllDataMapEqual
} = tools.transfer;

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const Search = Input.Search;

export const CommonTitleRender = props => {
    const {title, treeName, selectedNum, maxSelectedNum, showSelectedNum, showCandidateNum, unSelectedNum} = props;
    let titleDetail = `${title}${treeName}`;
    let numberDom;
    if (selectedNum != null && showSelectedNum) {
        titleDetail = `${titleDetail}`;
        numberDom = `(${selectedNum}${maxSelectedNum ? `/${maxSelectedNum}` : ''})`;
    }
    if (unSelectedNum != null && showCandidateNum) {
        titleDetail = `${titleDetail}`;
        numberDom = `(${unSelectedNum})`;
    }
    return (
        <span className="title" title={title}>
            <span className="title-text">{titleDetail}</span>
            {
                numberDom ? <span className="title-number">{numberDom}</span> : null
            }
        </span>
    );
};
CommonTitleRender.propTypes = {
    title: PropTypes.string.isRequired,
    treeName: PropTypes.string.isRequired,
    selectedNum: PropTypes.number,
    maxSelectedNum: PropTypes.number,
    showSelectedNum: PropTypes.bool,
    showCandidateNum: PropTypes.bool,
    unSelectedNum: PropTypes.number
};
CommonTitleRender.defaultProps = {
    selectedNum: null,
    maxSelectedNum: null,
    showSelectedNum: false,
    showCandidateNum: false,
    unSelectedNum: null
};

export const CommonItemRender = props => {
    const {title, relationText, searchValue} = props;
    let textArray = [<span key="normal-0">{title}</span>];
    if (searchValue) {
        const pivolIndex = title.indexOf(searchValue);
        if (pivolIndex > -1) {
            textArray = _.flattenDeep(title.split(searchValue).map((node, index) => {
                return index === 0
                    ? [<span key={index}>{node}</span>]
                    : [
                        <span key={`${index}-highlight`} className="highlight">{searchValue}</span>,
                        <span key={index}>{node}</span>
                    ];
            }));
        }
    }
    return title
        ? (
            <span title={title} className="item-title">
                {textArray}
                <span className="relation-text">
                    {' '}
                    {relationText}
                </span>
            </span>
        )
        : null; // 有构造数据的 id 不存在
};
CommonItemRender.propTypes = {
    title: PropTypes.string,
    relationText: PropTypes.string,
    searchValue: PropTypes.string
};
CommonItemRender.defaultProps = {
    title: '',
    relationText: ''
};

export const CommonSearchRender = props => {
    const {
        levelOptions, handleLevelChange, searchBoxProps, prefixCls,
        isShowLevelSelect, levelKey, onSelectFocus, ...customSearchProps
    } = props;
    const selectProps = {};
    if (levelKey != null) {
        selectProps.value = levelKey;
    }
    const searchBarClassName = classNames(`${prefixCls}-search-box-bar`, {
        [`${prefixCls}-search-has-select`]: isShowLevelSelect
    });
    return (
        <div className={searchBarClassName}>
            {
                isShowLevelSelect
                    ? (
                        <Select
                            defaultValue={levelKey || (levelOptions[0] && levelOptions[0].value)}
                            style={{width: 64, borderRadius: 0}}
                            onChange={handleLevelChange}
                            onFocus={onSelectFocus}
                            {...selectProps}
                        >
                            {
                                levelOptions.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)
                            }
                        </Select>
                    )
                    : null
            }
            <Search {...{...searchBoxProps, ...customSearchProps}} />
        </div>
    );
};
CommonSearchRender.propTypes = {
    levelOptions: PropTypes.array,
    handleLevelChange: PropTypes.func,
    searchBoxProps: PropTypes.object,
    isShowLevelSelect: PropTypes.bool,
    levelKey: PropTypes.string,
    onSelectFocus: PropTypes.func,
    prefixCls: PropTypes.string
};
CommonSearchRender.defaultProps = {
    levelOptions: null,
    handleLevelChange: () => {},
    searchBoxProps: {},
    isShowLevelSelect: false,
    levelKey: null,
    onSelectFocus: () => {},
    prefixCls: 'new-fc-one-transfer'
};

export const CommonFooterRender = props => {
    const {candidateFooterProps, treeName, size} = props;
    return (
        <div className="select-footer">
            <Button type="link" size={size} {...candidateFooterProps}>
                + 新建
                {treeName}
            </Button>
        </div>
    );
};
CommonFooterRender.propTypes = {
    treeName: PropTypes.string,
    candidateFooterProps: PropTypes.object,
    size: PropTypes.oneOf(['small', 'medium'])
};
CommonFooterRender.defaultProps = {
    treeName: '',
    candidateFooterProps: {},
    size: 'small'
};

const getContainerClass = item => {
    const children = item.children;
    return classNames({
        'select-selected': 1,
        'select-selected-has-children': children && children.length
    });
};
export default class Transfer extends Component {
    static propTypes = {
        // dataSource: PropTypes.object, // 【必填项】 所有项平铺，每项包括(key, title, children)
        /** 左侧候选的树节点，注意多层树的话只包含顶层节点即可，筛选可根据修改此字段实现【必填项 受控】 */
        candidateList: PropTypes.array,

        /** 右侧已选中的树节点，注意这里只包含叶子节点即可【选填 受控】 */
        selectedList: PropTypes.array,
        /** 整个穿梭框的资源信息【必填 受控】
         * 示例：
         * {
         *   [key]: {
         *      key: 1,
         *      title: '计划1'
         *   },
         *   ...
         * }
         * */
        allDataMap: PropTypes.object,
        /** 右侧已选树的展开节点【选填 受控】 */
        expandedSelectedKeys: PropTypes.array,
        /** 子节点到父节点的映射关系，通常不用传，组件内部会计算【选填 受控】 */
        parentRelationMap: PropTypes.object,
        /** 父节点到子节点的映射关系，通常不用传，组件内部会计算【选填 受控】 */
        childrenRelationMap: PropTypes.object,

        /** 左侧候选树节点单个选择回调，回调参数(selectedList, allDataMap, expandedSelectedKeys)【选填】 */
        handleSelect: PropTypes.func,
        /** 全选回调，回调参数(selectedList, allDataMap, expandedSelectedKeys)【选填】 */
        handleSelectAll: PropTypes.func,
        /** 右侧已选树单个删除回调，回调参数(selectedList, allDataMap)【选填】 */
        handleDelete: PropTypes.func,
        /** 右侧已选树全部删除回调，回调参数(selectedList, allDataMap, expandedSelectedKeys) 【选填】 */
        handleDeleteAll: PropTypes.func,
        /** 右侧已选树展开/收起时触发，回调参数(expandedSelectedKeys) 【选填】 */
        handleSelectedExpand: PropTypes.func,
        /** 左侧候选树展开/收起时触发，回调参数(expandedKeys, {expanded: bool, node})【选填】 */
        handleCandidateExpand: PropTypes.func,

        /** 穿梭框名字【选填】 */
        treeName: PropTypes.string,
        placeholder: PropTypes.string,
        /** 自定义类名【选填】 */
        className: PropTypes.string,
        /** 自定义左侧树样式【选填】 */
        candidateTreeStyle: PropTypes.object,
        /** 自定义右侧树样式【选填】 */
        selectedTreeStyle: PropTypes.object,
        /** 是否展示可选项数目，默认为true【选填】 */
        showCandidateNum: PropTypes.bool,
        /** 是否显示已选数目，默认为true【选填】 */
        showSelectedNum: PropTypes.bool,
        /** 已选节点上限，不传则无上限【选填】 */
        maxSelectedNum: PropTypes.number,
        /** 自定义候选树头部标题render【选填】 */
        CandidateTitleRender: PropTypes.func,
        /** 自定义已选树头部标题render【选填】 */
        SelectedTitleRender: PropTypes.func,
        /** 自定义候选项格式，可实现多列选择器【选填】 */
        CandidateItem: PropTypes.func,
        /** 自定义候选项的props，在传CandidateItem时生效【选填】 */
        candidateItemProps: PropTypes.object,
        /** 自定义已选项格式，可实现多列选择器【选填】 */
        SelectedItem: PropTypes.func,
        /** 自定义已选项的props，在传SelectedItem时生效【选填】 */
        selectedItemProps: PropTypes.object,

        /** 自定义搜索筛选render【选填】 */
        SearchBoxRender: PropTypes.func,
        /** 自定义搜索筛选props【选填】 */
        searchRenderProps: PropTypes.object,
        /** 是否显示搜索框，默认为true【选填】 */
        showSearchBox: PropTypes.bool,
        /** 搜索框搜索回调【选填】 */
        handleSearch: PropTypes.func,
        /** 搜索框的值【选填】 */
        searchValue: PropTypes.string,
        /** 搜索框输入回调【选填】 */
        onSearchChange: PropTypes.func,
        /** 是否显示层级信息，默认为false【选填】 */
        isShowLevel: PropTypes.bool,
        /** 层级信息配置，isShowLevelSelect为true时生效【选填】 */
        levelOptions: PropTypes.array,
        /** 层级切换回调，参数同Select组件【选填】 */
        handleLevelChange: PropTypes.func,
        /** 是否启用层级选择筛选，默认为true【选填】 */
        isShowLevelSelect: PropTypes.bool,
        onSearchBoxFocus: PropTypes.func,
        onSearchBoxBlur: PropTypes.func,
        levelKey: PropTypes.string,

        /** 是否展示新建按钮【选填】 */
        showCandidateFooter: PropTypes.bool,
        /** 新建按钮自定义props【选填】 */
        candidateFooterProps: PropTypes.object,
        /** 自定义footer【选填】 */
        CandidateFooterRender: PropTypes.func,
        showSelectAll: PropTypes.bool,
        showDeleteAll: PropTypes.bool,
        readOnly: PropTypes.bool,
        prefixCls: PropTypes.string,
        /**
         * transfer的尺寸
         */
        size: PropTypes.oneOf(['small', 'medium']),
        treePrefixCls: PropTypes.string,
        buttonPrefixCls: PropTypes.string,
        checkboxPrefixCls: PropTypes.string,
        tooltipPrefixCls: PropTypes.string
    };

    static defaultProps = {
        // dataSource: {},
        selectedList: undefined,
        candidateList: [],
        allDataMap: undefined,
        parentRelationMap: undefined,
        childrenRelationMap: undefined,
        // searchValue: '',
        treeName: '',
        placeholder: '',
        className: '',
        candidateTreeStyle: {},
        selectedTreeStyle: {},
        maxSelectedNum: null,
        CandidateTitleRender: CommonTitleRender,
        showCandidateFooter: false,
        SelectedTitleRender: CommonTitleRender,
        CandidateItem: CommonItemRender,
        candidateItemProps: {},
        SelectedItem: CommonItemRender,
        selectedItemProps: {},
        showSelectedNum: true,
        showSearchBox: true,
        expandedSelectedKeys: undefined,
        candidateFooterProps: {},
        isShowLevel: false,
        showCandidateNum: true,
        SearchBoxRender: CommonSearchRender,
        CandidateFooterRender: CommonFooterRender,
        handleSelect: () => {},
        handleSelectAll: () => {},
        handleDelete: () => {},
        handleDeleteAll: () => {},
        handleSearch: () => {},
        onSearchChange: () => {},
        handleSelectedExpand: () => {},
        handleCandidateExpand: () => {},
        levelOptions: null,
        handleLevelChange: () => {},
        isShowLevelSelect: false,
        searchRenderProps: {},
        onSearchBoxFocus: () => {},
        onSearchBoxBlur: () => {},
        levelKey: null,
        showSelectAll: true,
        showDeleteAll: true,
        readOnly: false,
        prefixCls: 'new-fc-one-transfer',
        size: 'small',
        treePrefixCls: 'new-fc-one-tree',
        buttonPrefixCls: 'new-fc-one-btn',
        checkboxPrefixCls: 'new-fc-one-checkbox',
        tooltipPrefixCls: 'new-fc-one-tooltip'
    };

    constructor(args) {
        super(...args);
        const allDataMap = args.allDataMap || {};
        const disabledKeys = [];
        const transferData = _.reduce(allDataMap, (result, value, key) => {
            result.allDataMap[key] = {...value};
            if (value.disabled) {
                disabledKeys.push(value.key);
            }
            return result;
        }, {
            allDataMap: {}
        });
        this.state = {
            selectedList: args.selectedList || [],
            ...transferData,
            expandedSelectedKeys: [],
            isShowLevelSelect: false,
            hasEdit: false,
            hasSearch: false,
            expandedCandidateKeys: [],
            leftPanelWidth: 0,
            disabledKeys
        };
        this.allDataMapFactory = this.allDataMapFactory.bind(this);
    }

    componentWillMount() {
        const {
            selectedList = this.state.selectedList,
            allDataMap,
            candidateList
        } = this.props;
        const transferData = getTransferData(allDataMap);
        const {
            parentRelationMap = transferData.parentRelationMap,
            childrenRelationMap = transferData.childrenRelationMap
        } = this.props;
        const candidateTotalCount = transferData.candidateTotalCount;
        this.allDataMapFactory(
            selectedList, allDataMap, parentRelationMap,
            childrenRelationMap, candidateTotalCount
        );
        let disabledKeys = [
            ...formatTransferDisbaledKeys(candidateList, disabledKeys, allDataMap)
        ];
        disabledKeys = [
            ...formatParentDisabled(getTransferData(allDataMap), disabledKeys)
        ];
        this.setState({
            disabledKeys
        });
    }

    componentWillReceiveProps(nextProps) {
        const {
            selectedList = this.state.selectedList,
            allDataMap,
            candidateList
        } = nextProps;
        const transferData = getTransferData(allDataMap);
        const {
            parentRelationMap = transferData.parentRelationMap,
            childrenRelationMap = transferData.childrenRelationMap
        } = this.props;
        const candidateTotalCount = transferData.candidateTotalCount;
        this.allDataMapFactory(
            selectedList, allDataMap, parentRelationMap,
            childrenRelationMap, candidateTotalCount
        );
        if (isDisabledKeysChange(allDataMap, this.state.disabledKeys)
        || !isAllDataMapEqual(this.state.allDataMap, nextProps.allDataMap)) {
            let disabledKeys = [
                ...formatTransferDisbaledKeys(candidateList, disabledKeys, nextProps.allDataMap)
            ];
            disabledKeys = [
                ...formatParentDisabled(getTransferData(nextProps.allDataMap), disabledKeys)
            ];
            this.setState({
                disabledKeys
            });
        }
    }

    onSearchChange = e => {
        this.setState({
            hasEdit: true
        });
        this.props.onSearchChange(e);
    };

    onSelectFocus = () => {
        this.setState({
            isShowLevelSelect: 'focus'
        });
    };

    /**
     * 指定节点集合，取节点集合的父子映射关系
     * @param list
     * @param selectParentMap
     * @param parentRelationMap
     */
    getSelectParentMap = (list, selectParentMap, parentRelationMap) => {
        _.forEach(list, value => {
            const parentKey = parentRelationMap[value];
            if (parentKey) {
                if (selectParentMap[parentKey]) {
                    selectParentMap[parentKey].push(value);
                } else {
                    selectParentMap[parentKey] = [value];
                }
            }
        });
        return selectParentMap;
    };

    /**
     * 取节点的层级信息
     * @param text
     * @param id
     * @param parentRelationMap
     * @param allDataMap
     */
    getLevelText = (text, id, parentRelationMap, allDataMap) => {
        if (parentRelationMap[id] == null) {
            return text;
        }
        text.unshift(allDataMap[parentRelationMap[id]].title);
        return this.getLevelText(text, parentRelationMap[id], parentRelationMap, allDataMap);
    };

    /**
     * 根据selectedList形成带有选中状态的allDataMap
     * @param selectedList
     * @param allDataMap
     * @param parentRelationMap
     * @param childrenRelationMap
     * @param candidateTotalCount
     */
    allDataMapFactory = (
        selectedList, allDataMap, parentRelationMap,
        childrenRelationMap, candidateTotalCount
    ) => {
        const allDataMapWithSelected = JSON.parse(JSON.stringify(allDataMap));
        _.forEach(selectedList, key => {
            try {
                allDataMapWithSelected[key].isSelectorDisabled = true;
            } catch (e) {
                warning(false, `please check selectedId:${key} is in allDataMap`);
            }
            if (parentRelationMap[key]) {
                const parentKey = parentRelationMap[key];
                if (allDataMapWithSelected[parentKey] && allDataMapWithSelected[parentKey].isSelectorDisabled) {
                    return;
                }
                if ((childrenRelationMap[parentKey] || []).every(id => selectedList.indexOf(id) > -1)) {
                    (allDataMapWithSelected[parentKey] || {}).isSelectorDisabled = true;
                }
            }
        });
        _.forIn(allDataMapWithSelected, (value, key) => {
            if (value.isSelectorDisabled && parentRelationMap[key]) {
                const parentKey = parentRelationMap[key];
                if (allDataMapWithSelected[parentKey] && allDataMapWithSelected[parentKey].isSelectorDisabled) {
                    return;
                }
                if ((childrenRelationMap[parentKey] || []).every(id => allDataMapWithSelected[id].isSelectorDisabled)) {
                    (allDataMapWithSelected[parentKey] || {}).isSelectorDisabled = true;
                }
            }
        });
        this.setState({
            allDataMap: allDataMapWithSelected,
            parentRelationMap,
            childrenRelationMap,
            candidateTotalCount
        });
    };

    /**
     * 取指定id的根节点
     * @param id
     * @param parentRelationMap
     */
    findRootKey = (id, parentRelationMap) => {
        if (parentRelationMap[id] == null) {
            return id;
        }
        return this.findRootKey(parentRelationMap[id], parentRelationMap);
    };

    /**
     * 取指定id的叶子结点集合
     * @param id
     * @param childrenRelationMap
     */
    findLeafNode = (id, childrenRelationMap) => {
        const childrenArray = childrenRelationMap[id] || [];
        let resultArray = [];
        _.forEach(childrenArray, child => {
            const leafArray = childrenRelationMap[child] || [child];
            resultArray = _.concat(resultArray, leafArray);
        });
        return resultArray;
    };

    searchBoxFocus = e => {
        this.setState({
            isShowLevelSelect: true
        });
        this.props.onSearchBoxFocus(e);
    };

    searchBoxBlur = e => {
        const value = e.target.value;
        if (value.length <= 0 && this.state.hasEdit) {
            setTimeout(() => {
                if (this.state.isShowLevelSelect === 'focus') {
                    this.setState({
                        isShowLevelSelect: true,
                        hasEdit: false
                    });
                } else {
                    this.setState({
                        isShowLevelSelect: false,
                        hasEdit: false
                    });
                }
                this.props.onSearchBoxBlur(e, this.state.isShowLevelSelect);
            }, 20);
        }
    };

    handleSearch = e => {
        this.setState({
            hasSearch: true
        });
        this.props.handleSearch(e);
    };

    handleSelectedExpand = expandedKeys => {
        this.setState({
            expandedSelectedKeys: expandedKeys
        });
        this.props.handleSelectedExpand(expandedKeys);
    };

    handleCandidateExpand = (...args) => {
        this.setState({
            expandedCandidateKeys: args[0]
        });
        this.props.handleCandidateExpand(...args);
    };

    /**
     * 处理子孙节点状态，父添加时所有子孙都添加，父删除时所有子孙都删除
     * @param selectedState
     * @param state
     * @param flag
     */
    handleChildren = (selectedState, state, flag) => {
        const children = selectedState.children || [];
        const disabledKeys = this.state.disabledKeys;
        let childrenState = {};
        children.forEach(child => {
            if (
                disabledKeys.indexOf(child) === -1
            ) {
                childrenState[child] = {...state[child], isSelectorDisabled: flag};
                if (childrenState[child].children) {
                    childrenState = {
                        ...childrenState,
                        ...this.handleChildren(childrenState[child], state, flag)
                    };
                }
            }
        });
        return childrenState;
    };

    handleSelect = handleSelectParams => {
        if (this.props.readOnly) {
            return;
        }
        const {
            selectedId, childrenRelationMap = {}, selectedList,
            allDataMap, parentId, parentRelationMap, expandedSelectedKeys,
            shouldEmit = true
        } = handleSelectParams;
        let resultList = [...selectedList];
        const disabledKeys = this.state.disabledKeys;
        // selectedList中永远都只包含选中的叶子节点
        const childrenArray = this.findLeafNode(
            selectedId, childrenRelationMap
        ).filter(childKey => disabledKeys.indexOf(childKey) === -1);
        if (childrenArray.length) {
            resultList = [...resultList, ...childrenArray];
        } else {
            resultList = [...resultList, selectedId];
        }

        const selectedState = allDataMap[selectedId] || {};
        const parentState = allDataMap[parentId] || {};
        const allBrotherArray = parentState.children || [];
        const newAllDataMap = {
            ...allDataMap,
            [selectedId]: {...selectedState, isSelectorDisabled: true},
            ...this.handleChildren(selectedState, allDataMap, true)
        };
        // 单个添加，如果其兄弟节点都已添加，那么也要将父节点变为已选状态。
        if (parentId && (allBrotherArray.every(brother => (
            (brother === selectedId) || (allDataMap[brother].isSelectorDisabled === true)
        )))
        ) {
            newAllDataMap[parentId].isSelectorDisabled = true;
        }
        let newExpandedKeys = _.concat(expandedSelectedKeys, selectedId);
        if (childrenRelationMap[selectedId]) {
            newExpandedKeys = _.concat(newExpandedKeys, childrenRelationMap[selectedId]);
        }
        if (parentId) {
            newExpandedKeys.push(parentId);
            if (parentRelationMap[parentId]) {
                newExpandedKeys.push(parentRelationMap[parentId]);
            }
        }
        newExpandedKeys = newExpandedKeys.map(key => String(key));
        this.setState({
            selectedList: _.uniq(resultList),
            allDataMap: newAllDataMap,
            expandedSelectedKeys: _.uniq(newExpandedKeys)
        });
        const event = {
            target: {
                key: selectedId
            }
        };
        if (shouldEmit) {
            this.props.handleSelect(_.uniq(resultList), newAllDataMap, _.uniq(newExpandedKeys), event);
        }
    };

    handleSelectAll = selectAllParams => {
        if (this.props.readOnly) {
            return;
        }
        const {
            candidateList, childrenRelationMap, parentRelationMap = {},
            allDataMap, selectedLength, maxSelectedNum, candidateTreeUnSelectedCount
        } = selectAllParams;
        const disabledKeys = this.state.disabledKeys;
        if (maxSelectedNum && (candidateTreeUnSelectedCount > (maxSelectedNum - selectedLength))) {
            return;
        }
        const currentSelectedList = this.state.selectedList;
        let selectedList = [...currentSelectedList];
        let newAllDataMap = {...allDataMap};
        candidateList.forEach(selectedId => {
            if (disabledKeys.indexOf(selectedId) !== -1) {
                return;
            }
            let result = this.findLeafNode(
                selectedId, childrenRelationMap
            ).filter(childKey => {
                return (
                    disabledKeys.indexOf(childKey) === -1
                );
            });
            const parentId = parentRelationMap[selectedId];
            const idObj = newAllDataMap[selectedId] || {};
            if (!result || !result.length) {
                result = [selectedId];
            }
            selectedList = _.uniq([...selectedList, ...result]);
            newAllDataMap = {
                ...newAllDataMap,
                [selectedId]: {
                    ...idObj,
                    isSelectorDisabled: true
                },
                ...this.handleChildren(idObj, newAllDataMap, true)
            };
            if (parentId != null) {
                newAllDataMap[parentId] = {
                    ...newAllDataMap[parentId],
                    isSelectorDisabled: true
                };
            }
        });
        this.setState({
            selectedList,
            allDataMap: newAllDataMap,
            expandedSelectedKeys: Object.keys(allDataMap)
        });
        this.props.handleSelectAll(selectedList, newAllDataMap, Object.keys(allDataMap));
    };

    handleDelete = candidateParams => {
        const {
            selectedList, candidateId, childrenRelationMap,
            allDataMap, parentId, parentRelationMap, shouldEmit = true
        } = candidateParams;
        const disabledKeys = this.state.disabledKeys;
        if (!allDataMap[candidateId]) {
            return;
        }
        if (this.props.readOnly || disabledKeys.indexOf(candidateId) !== -1) {
            return;
        }
        // 待删除节点的所有子孙节点都会被从selectedList中移除
        const candidateArray = childrenRelationMap[candidateId] || [];
        let arr = _.clone(candidateArray);
        _.forEach(candidateArray, id => {
            if (childrenRelationMap[id]) {
                arr = _.concat(arr, childrenRelationMap[id]);
            }
        });
        arr = arr.filter(arrKey => disabledKeys.indexOf(arrKey) === -1);
        const toBeRemovedArray = candidateArray.length ? arr : [candidateId];
        _.remove(selectedList, id => toBeRemovedArray.indexOf(id) > -1);
        // 修改allDataMap中的选中状态
        const selectedState = allDataMap[candidateId] || {};
        const newAllDataMap = {
            ...allDataMap,
            [candidateId]: {...selectedState, isSelectorDisabled: false},
            ...this.handleChildren(selectedState, allDataMap, false)
        };
        // 如果待删除的节点，没有被选中的兄弟节点，那么也要将它父节点的选中态删除掉
        if (parentId) {
            newAllDataMap[parentId].isSelectorDisabled = false;
            if (parentRelationMap[parentId]) {
                newAllDataMap[parentRelationMap[parentId]].isSelectorDisabled = false;
            }
        }

        this.setState({
            selectedList,
            allDataMap: newAllDataMap
        });
        if (shouldEmit) {
            this.props.handleDelete([...selectedList], newAllDataMap, candidateId);
        }
    };

    handleDeleteAll = () => {
        if (this.props.readOnly) {
            return;
        }
        const {allDataMap, disabledKeys} = this.state;
        const {
            selectedList = this.state.selectedList,
            childrenRelationMap = this.state.childrenRelationMap
        } = this.props;
        let toBeRetainedList = [];
        _.forIn(allDataMap, value => {
            if (disabledKeys.indexOf(value.key) === -1) {
                value.isSelectorDisabled = false;
            } else {
                const childrenArray = this.findLeafNode(value.key, childrenRelationMap);
                if (childrenArray.length) {
                    toBeRetainedList = [...toBeRetainedList, ...childrenArray];
                } else {
                    toBeRetainedList = [...toBeRetainedList, value.key];
                }
            }
        });
        const newSelectedList = _.intersection(toBeRetainedList, selectedList);
        const expandedSelectedKeys = newSelectedList.length ? newSelectedList : [];
        this.setState({
            selectedList: newSelectedList,
            allDataMap,
            expandedSelectedKeys
        });
        this.props.handleDeleteAll(newSelectedList, allDataMap, expandedSelectedKeys);
    };

    makeTitle = (item, relationText) => {
        const hasSearch = this.state.hasSearch;
        const {
            CandidateItem,
            selectedList = this.state.selectedList,
            maxSelectedNum,
            parentRelationMap = this.state.parentRelationMap,
            childrenRelationMap = this.state.childrenRelationMap,
            expandedSelectedKeys = this.state.expandedSelectedKeys,
            candidateItemProps, tooltipPrefixCls,
            searchValue, size, prefixCls, checkboxPrefixCls
        } = this.props;
        const allDataMap = this.state.allDataMap;
        const disabledKeys = this.state.disabledKeys;
        const {key, isSelectorDisabled} = item;
        const selectorClassName = classNames({
            'select-operation': 1,
            'select-operation-disabled': isSelectorDisabled
        });
        const checkboxDisabled = disabledKeys.indexOf(key) !== -1;
        const commonParams = {
            allDataMap,
            parentId: parentRelationMap[key],
            childrenRelationMap,
            selectedList,
            maxSelectedNum,
            parentRelationMap,
            expandedSelectedKeys
        };
        const disabled = maxSelectedNum && (selectedList.length >= maxSelectedNum) && !isSelectorDisabled;
        let indeterminate = false;
        const leafs = this.findLeafNode(key, childrenRelationMap);
        if (leafs && leafs.length) {
            const base = !!allDataMap[leafs[0]].isSelectorDisabled;
            for (let index = 0; index < leafs.length; index++) {
                const id = leafs[index];
                if (!!allDataMap[id].isSelectorDisabled !== base) {
                    indeterminate = true;
                    break;
                }
            }
        }
        const checkboxEle = (
            <Checkbox
                className={selectorClassName}
                checked={isSelectorDisabled}
                indeterminate={indeterminate}
                size={size}
                disabled={checkboxDisabled != null ? checkboxDisabled : disabled}
                prefixCls={checkboxPrefixCls}
                onChange={e => {
                    if (e.target.checked) {
                        this.handleSelect({...commonParams, selectedId: key, shouldEmit: false});
                    } else {
                        this.handleDelete({...commonParams, candidateId: key, shouldEmit: false});
                    }
                }}
            />
        );

        const itemProps = {
            hasSearch,
            searchValue,
            relationText
        };
        const itemDisabled = checkboxDisabled != null ? checkboxDisabled : disabled;
        const itemClassName = classNames(getContainerClass(item), {
            [`${prefixCls}-item-disabled`]: itemDisabled
        });
        return (
            <div
                className={itemClassName}
                onClick={() => {
                    if (itemDisabled) {
                        return;
                    }
                    if (indeterminate || !isSelectorDisabled) {
                        this.handleSelect({...commonParams, selectedId: key});
                    } else {
                        this.handleDelete({...commonParams, candidateId: key});
                    }
                }}
            >
                <CandidateItem {...item} {...itemProps} {...candidateItemProps}/>
                {
                    disabled
                        ? (
                            <Tooltip
                                title="数量已达上限，请删除后添加"
                                placement="rightBottom"
                                mouseEnterDelay={0}
                                mouseLeaveDelay={0}
                                prefixCls={tooltipPrefixCls}
                            >
                                {checkboxEle}
                            </Tooltip>
                        )
                        : checkboxEle
                }
            </div>
        );
    };

    makeSelectedTitle = item => {
        const {
            selectedList = this.state.selectedList,
            parentRelationMap = this.state.parentRelationMap,
            childrenRelationMap = this.state.childrenRelationMap,
            SelectedItem,
            selectedItemProps,
            prefixCls
        } = this.props;
        const allDataMap = this.state.allDataMap;
        const candidateId = item.key;
        const candidateParams = {
            allDataMap,
            selectedList,
            candidateId,
            parentId: parentRelationMap[candidateId],
            childrenRelationMap,
            parentRelationMap
        };
        const disabledKeys = this.state.disabledKeys;
        const disabled = disabledKeys.indexOf(candidateId) !== -1;
        let disabledMap = isSelectedDisabled(
            parentRelationMap,
            selectedList,
            allDataMap
        );
        const disabledParentList = Object.keys(disabledMap).filter(key => disabledMap[key]);
        if (disabledParentList && disabledParentList.length) {
            disabledMap = {
                ...disabledMap,
                ...isParentKeyDisabled(
                    disabledParentList,
                    parentRelationMap,
                    childrenRelationMap,
                    disabledMap
                )
            };
        }
        const itemClassName = classNames(getContainerClass(item), {
            [`${prefixCls}-item-disabled`]: disabled || disabledMap[candidateId]
        });
        return (
            <div className={itemClassName} onClick={_.partial(this.handleDelete, candidateParams)}>
                <SelectedItem {...item} key={`dual-tree-select-selected-${candidateId}`} {...selectedItemProps} />
                <IconClose className="select-operation" />
            </div>
        );
    };

    /**
     * 渲染左侧候选项结构
     * @param {Array} candidateList 候选根节点集合
     * @param {Boolean} isShowLevel 左侧候选项是否展示出父层级信息
     */
    renderCandidateTreeNodes = (candidateList, isShowLevel = false) => {
        const {
            parentRelationMap = this.state.parentRelationMap
        } = this.props;
        const {allDataMap, expandedCandidateKeys} = this.state;
        return candidateList.map(key => {
            const item = allDataMap[key] || {};
            let relationText = '';
            if (isShowLevel) {
                const textArray = this.getLevelText([], key, parentRelationMap, allDataMap);
                relationText = textArray.length > 0 ? `(${textArray.join('>')})` : '';
            }
            const children = item.children;
            const disabledKeys = this.state.disabledKeys;
            const disabled = disabledKeys.indexOf(item.key) !== -1;
            if (children) {
                // 如果树没有展开，则无需计算子节点的展示逻辑，仅挂一个虚拟节点即可
                if (expandedCandidateKeys.indexOf(`${item.key}`) > -1) {
                    return (
                        <TreeNode
                            title={this.makeTitle(item, relationText)}
                            key={item.key}
                            selectable={false}
                            disabled={disabled}
                        >
                            {this.renderCandidateTreeNodes(children)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode
                        title={this.makeTitle(item, relationText)}
                        key={item.key}
                        selectable={false}
                        disabled={disabled}
                    >
                        {children.length ? <TreeNode/> : null}
                    </TreeNode>
                );
            }
            return (
                <TreeNode
                    {...item}
                    title={this.makeTitle(item, relationText)}
                    key={item.key}
                    selectable={false}
                    disabled={disabled}
                />
            );
        });
    };

    /**
     * 渲染右侧已选树
     * @param {Array} selectedRootKeys 已选叶子节点对应的根结点的集合
     * @param {Object} selectedPathMap 对于所有选中的叶子结点，其根结点到它们的路径
     * e.q 一个树的结构是1: {2: [3, 4]}, [3, 4]是已选中的叶子结点，
     * 参数为selectedRootKeys = [1], selectedPathMap = {1: [2], 2: [3, 4]}
     */
    renderSelectedTreeNodes = (selectedRootKeys, selectedPathMap) => {
        const {
            allDataMap
        } = this.state;
        const expandedSelectedKeys = this.props.expandedSelectedKeys || this.state.expandedSelectedKeys;
        return selectedRootKeys.map(key => {
            const item = allDataMap[key] || {};
            const children = selectedPathMap[key] || item.children;
            const itemKey = item.key;
            // 如果已选节点有孩子
            if (children) {
                // 如果树没有展开，则无需计算子节点的展示逻辑，仅挂一个虚拟节点即可
                if (expandedSelectedKeys.indexOf(`${item.key}`) > -1) {
                    return (
                        <TreeNode title={this.makeSelectedTitle(item, key)} key={itemKey} selectable={false}>
                            {this.renderSelectedTreeNodes(children, selectedPathMap)}
                        </TreeNode>
                    );
                }
                return (
                    <TreeNode title={this.makeSelectedTitle(item, key)} key={itemKey} selectable={false}>
                        {children.length ? <TreeNode/> : null}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} title={this.makeSelectedTitle(item, key)} key={itemKey} selectable={false}/>;
        });
    };

    /**
     * 渲染左侧候选树
     * todo 内容为空时的交互
     */
    renderCandidateTree = () => {
        const {
            candidateList,
            isShowLevel,
            treePrefixCls
        } = this.props;
        const {expandedCandidateKeys} = this.state;
        const candidateTreeProps = {
            onExpand: this.handleCandidateExpand,
            expandedKeys: expandedCandidateKeys,
            prefixCls: treePrefixCls
        };
        return (
            <Tree {...candidateTreeProps}>
                {this.renderCandidateTreeNodes(candidateList, isShowLevel)}
            </Tree>
        );
    };

    leftSelectPanel = ref => {
        this.transferLeftSelectPanel = ref;
    }

    render() {
        const candidateTotalCount = this.state.candidateTotalCount;
        const allDataMap = this.state.allDataMap;
        const {
            selectedList = this.state.selectedList,
            candidateList, // 左侧候选list，根据筛选层级不同内容不同
            parentRelationMap = this.state.parentRelationMap,
            childrenRelationMap = this.state.childrenRelationMap,
            searchValue,
            treeName,
            className,
            candidateTreeStyle,
            selectedTreeStyle,
            maxSelectedNum,
            showSelectedNum,
            CandidateTitleRender,
            showCandidateFooter,
            SelectedTitleRender,
            expandedSelectedKeys = this.state.expandedSelectedKeys,
            showSearchBox,
            candidateFooterProps,
            showCandidateNum,
            levelOptions,
            handleLevelChange,
            CandidateFooterRender,
            SearchBoxRender,
            placeholder,
            levelKey,
            showSelectAll,
            showDeleteAll,
            prefixCls,
            size,
            treePrefixCls,
            buttonPrefixCls,
            tooltipPrefixCls
        } = this.props;
        const selectedLength = selectedList.length;
        let candidateTreeUnSelectedCount = 0;
        if (showSelectAll && showCandidateNum) {
            let candidateLeafs = [];
            _.forEach(candidateList, id => {
                const leafs = this.findLeafNode(id, childrenRelationMap);
                const disabledKeys = this.state.disabledKeys;
                const disabled = disabledKeys.indexOf(id) !== -1;
                if (leafs.length > 0) {
                    candidateLeafs = [...candidateLeafs, ...leafs];
                    // candidateTreeUnSelectedCount += _.without(leafs, ...selectedList).length;
                } else if (!disabled) {
                    candidateLeafs.push(id);
                }
                // if (selectedList.indexOf(id) < 0) {
                //     candidateTreeUnSelectedCount += 1;
                // }
            });
            candidateTreeUnSelectedCount = _.without(candidateLeafs, ...selectedList).length;
        }
        const isShowLevelSelect = this.state.isShowLevelSelect && this.props.isShowLevelSelect;
        const searchBoxProps = {
            // value: searchValue,
            placeholder: placeholder || `输入${treeName}名称搜索`,
            onSearch: this.handleSearch,
            onChange: this.onSearchChange,
            onFocus: this.searchBoxFocus,
            onBlur: this.searchBoxBlur,
            onClearClick: this.onSearchChange,
            size
        };
        if ('searchValue' in this.props) {
            searchBoxProps.value = searchValue;
        }
        const searchRenderProps = {
            levelOptions,
            handleLevelChange,
            onSelectFocus: this.onSelectFocus,
            searchBoxProps,
            isShowLevelSelect,
            levelKey,
            ...this.props.searchRenderProps
        };
        const candidateTitleProps = {
            treeName,
            title: '可选',
            candidateTotalCount,
            showCandidateNum,
            unSelectedNum: candidateTreeUnSelectedCount
        };
        const selectedTitleProps = {
            treeName,
            title: '已选',
            selectedNum: selectedLength,
            maxSelectedNum,
            showSelectedNum
        };
        const candidateMainClass = classNames({
            'select-main': 1,
            'footer-and-search-select-main': showSearchBox && showCandidateFooter,
            'no-footer-and-search-select-main': showSearchBox && !showCandidateFooter,
            'no-footer-and-no-search-select-main': !showSearchBox && !showCandidateFooter,
            'footer-and-no-search-select-main': showCandidateFooter && !showSearchBox
        });
        const addOperationLinkClass = classNames({
            'operate-link': 1,
            'add-disable': (maxSelectedNum && (candidateTreeUnSelectedCount > (maxSelectedNum - selectedLength))) || !candidateList.length,
            'display-none': !showSelectAll
        });
        const deleteOperationLinkClass = classNames({
            'operate-link': 1,
            'delete-disable': selectedLength <= 0,
            'display-none': !showDeleteAll
        });
        // 计算已选叶子节点对应的根结点的集合
        const selectedRootKeys = _.uniq(selectedList.map(id => this.findRootKey(id, parentRelationMap)));
        // todo 优化
        // 目前只支持三级，所以执行了两次getSelectParentMap,先计算父级节点，再计算祖父级节点
        const selectMap = this.getSelectParentMap(selectedList, {}, parentRelationMap);
        const selectedPathMap = this.getSelectParentMap(Object.keys(selectMap), selectMap, parentRelationMap);

        const selectAllParams = {
            allDataMap,
            candidateList,
            childrenRelationMap,
            parentRelationMap,
            maxSelectedNum,
            selectedLength,
            candidateTreeUnSelectedCount
        };
        const selectedTreeProps = {
            className: 'select-main select-right',
            onExpand: this.handleSelectedExpand,
            expandedKeys: expandedSelectedKeys.map(key => String(key)),
            prefixCls: treePrefixCls
        };
        const transferClassName = classNames(`${prefixCls}`, `${prefixCls}-${size}`, `${className}`);
        return (
            <div className={transferClassName}>
                <div className="select" style={candidateTreeStyle} ref={this.leftSelectPanel}>
                    <div className="select-title">
                        <CandidateTitleRender {...candidateTitleProps}/>
                        {
                            maxSelectedNum && (candidateTreeUnSelectedCount > (maxSelectedNum - selectedLength))
                                ? (
                                    <Tooltip
                                        title={`可选${treeName}数量超过可添加数量的上限，无法执行全部添加`}
                                        placement="rightBottom"
                                        prefixCls={tooltipPrefixCls}
                                    >
                                        <a className={addOperationLinkClass}>
                                            全选
                                        </a>
                                    </Tooltip>
                                ) : (
                                    <Button
                                        type="link"
                                        size={size}
                                        className={addOperationLinkClass}
                                        disabled={maxSelectedNum && (candidateTreeUnSelectedCount > (maxSelectedNum - selectedLength))}
                                        onClick={_.partial(this.handleSelectAll, selectAllParams)}
                                        prefixCls={buttonPrefixCls}
                                    >
                                            全选
                                    </Button>
                                )
                        }
                    </div>
                    {
                        showSearchBox
                            ? <SearchBoxRender {...searchRenderProps}/>
                            : null
                    }
                    <div className={candidateMainClass}>
                        {this.renderCandidateTree()}
                        {
                            showCandidateFooter ? <CandidateFooterRender {...{treeName, candidateFooterProps}} size={size}/> : null
                        }
                    </div>
                </div>
                <div className="select" style={selectedTreeStyle}>
                    <div className="select-title">
                        <SelectedTitleRender {...selectedTitleProps} />
                        <Button
                            className={deleteOperationLinkClass}
                            onClick={this.handleDeleteAll}
                            type="link"
                            disabled={selectedLength <= 0}
                            size={size}
                            prefixCls={buttonPrefixCls}
                        >
                            清空
                        </Button>
                    </div>
                    <Tree {...selectedTreeProps}>
                        {this.renderSelectedTreeNodes(selectedRootKeys, selectedPathMap)}
                    </Tree>
                </div>
            </div>
        );
    }
}
