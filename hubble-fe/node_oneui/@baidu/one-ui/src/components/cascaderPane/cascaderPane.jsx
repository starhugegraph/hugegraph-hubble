import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import classNames from 'classnames';
import partial from 'lodash/partial';
import uniq from 'lodash/uniq';
import classes from 'component-classes';
import {polyfill} from 'react-lifecycles-compat';
import arrayTreeFilter from 'array-tree-filter';
import {IconChevronRight, IconLoading} from '@baidu/one-ui-icon';
import {
    transOptionsToObject,
    formatCheckedKeys,
    formatIndeterminateKeys,
    formatDeleteCheckedKeys,
    formatAllCheckedKeys,
    flattenTree,
    filterSearchValue,
    flattenMultipleTree
} from '../../core/cascaderPaneTools';
import Checkbox from '../checkbox';
import CascaderInput from './input';

class CascaderPane extends PureComponent {
    static propTypes = {
        /** 当前展开的key */
        value: PropTypes.array,
        /** 默认选中的key */
        defaultValue: PropTypes.array,
        /** options */
        options: PropTypes.array,
        /** 样式前缀 */
        prefixCls: PropTypes.string,
        /** 展开的trigger */
        expandTrigger: PropTypes.string,
        /** 点击item触发的回调 */
        onSelect: PropTypes.func,
        /** 面板是否可见，常用做下拉面板里面 */
        visible: PropTypes.bool,
        /** 级联面板自定义样式 */
        cascaderPaneStyle: PropTypes.object,
        /** 指定的fieldName的对象 */
        fieldNames: PropTypes.object,
        /** 展开的icon */
        expandIcon: PropTypes.node,
        /** 正在加载的icon */
        loadingIcon: PropTypes.node,
        /** 自定义className */
        className: PropTypes.string,
        /** 多选选中的keys */
        checkedKeys: PropTypes.array,
        /** 默认多选选中的keys */
        defaultCheckedKeys: PropTypes.array,
        /** 是否多选 */
        showCheckbox: PropTypes.bool,
        checkboxPrefixCls: PropTypes.string,
        onCheckboxChange: PropTypes.func,
        // 是否展示搜索
        showSearch: PropTypes.bool,
        // 自定义搜索的props
        searchProps: PropTypes.object,
        // 级联器宽度
        paneWidth: PropTypes.number,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        // 是否默认筛选
        useDefaultFilter: PropTypes.bool,
        onInputChange: PropTypes.func,
        defaultSearchValue: PropTypes.string,
        searchValue: PropTypes.string,
        emptyNode: PropTypes.node,
        CustomItemRender: PropTypes.node,
        onClickSearchItem: PropTypes.func
    }

    static defaultProps = {
        options: [],
        prefixCls: 'new-fc-one-cascader-pane',
        expandTrigger: 'click',
        onSelect() {},
        visible: true,
        fieldNames: {
            label: 'label',
            value: 'value',
            children: 'children',
            icon: 'icon'
        },
        expandIcon: <IconChevronRight />,
        loadingIcon: <IconLoading />,
        showCheckbox: false,
        checkboxPrefixCls: 'new-fc-one-checkbox',
        onCheckboxChange() {},
        showSearch: false,
        paneWidth: 360,
        size: 'small',
        useDefaultFilter: true,
        onInputChange() {},
        emptyNode: '暂无结果',
        onClickSearchItem() {}
    }

    constructor(props) {
        super(props);
        this.menuItems = {};
        this.state = {
            value: props.value || props.defaultValue || [],
            // checkedKeys: props.checkedKeys || props.defaultCheckedKeys || [],
            optionsObject: {},
            interCheckedKeys: props.checkedKeys || props.defaultCheckedKeys || [],
            interIndeterminateKeys: [],
            inputValue: props.defaultSearchValue || props.searchValue || '',
            flattenTrees: [],
            searchOptions: []
        };
    }

    componentDidMount() {
        this.scrollActiveItemToView();
        this.formatOptionsObject();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.visible && this.props.visible) {
            this.scrollActiveItemToView();
        }
        if ((prevProps.options !== this.props.options)
        || (this.props.checkedKeys
            && this.props.checkedKeys !== prevProps.checkedKeys)) {
            this.formatOptionsObject(this.props.checkedKeys);
        }
    }

    static getDerivedStateFromProps(nextProps) {
        const newState = {};
        if ('value' in nextProps) {
            newState.value = nextProps.value;
        }
        return newState;
    }

    formatOptionsObject = newCheckedKeys => {
        const {options, showCheckbox, showSearch} = this.props;
        const newState = {};
        if (showCheckbox) {
            const optionsObject = transOptionsToObject(options, 'value');
            const checkedKeys = newCheckedKeys || this.state.interCheckedKeys;
            let interCheckedKeys = formatCheckedKeys(optionsObject, checkedKeys);
            checkedKeys.forEach(key => {
                interCheckedKeys = interCheckedKeys.concat(formatAllCheckedKeys(optionsObject, key, interCheckedKeys));
            });
            const interIndeterminateKeys = formatIndeterminateKeys(optionsObject, interCheckedKeys);
            newState.optionsObject = optionsObject;
            newState.interCheckedKeys = interCheckedKeys;
            newState.interIndeterminateKeys = interIndeterminateKeys;
        }
        if (showSearch) {
            const optionsObject = transOptionsToObject(options, 'value');
            const flattenTrees = flattenTree(options);
            newState.flattenTrees = [
                ...(showCheckbox ? [...flattenMultipleTree(optionsObject, options)] : []),
                ...flattenTrees
            ];
        }
        this.setState(newState);
    }

    getOption(option, menuIndex) {
        const {
            prefixCls, expandTrigger, expandIcon,
            loadingIcon, showCheckbox, checkboxPrefixCls,
            size
        } = this.props;
        const onSelect = partial(this.onHandleSelect, option, menuIndex);
        let expandProps = {
            onClick: onSelect
        };
        let menuItemCls = `${prefixCls}-menu-item`;
        let expandIconNode = null;
        const hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;
        if (hasChildren || option.isLeaf === false) {
            menuItemCls += ` ${prefixCls}-menu-item-expand`;
            if (!option.loading) {
                expandIconNode = <span className={`${prefixCls}-menu-item-expand-icon`}>{expandIcon}</span>;
            }
        }
        if (expandTrigger === 'hover' && hasChildren) {
            expandProps = {
                onMouseEnter: partial(this.onMouseEnterItem, option, menuIndex),
                onMouseLeave: this.onMouseLeaveItem,
                onClick: onSelect
            };
        }
        if (this.isActiveOption(option, menuIndex)) {
            menuItemCls += ` ${prefixCls}-menu-item-active`;
            expandProps.ref = this.saveMenuItem(menuIndex);
        }
        if (option.disabled) {
            menuItemCls += ` ${prefixCls}-menu-item-disabled`;
        }
        let loadingIconNode = null;
        if (option.loading) {
            menuItemCls += ` ${prefixCls}-menu-item-loading`;
            loadingIconNode = loadingIcon || null;
        }
        let title = '';
        if (option.title) {
            title = option.title;
        } else if (typeof option[this.getFieldName('label')] === 'string') {
            title = option[this.getFieldName('label')];
        }

        let label = option[this.getFieldName('label')];
        if (showCheckbox) {
            label = [
                <Checkbox
                    {...this.getOptionCheckboxProps(option)}
                    prefixCls={checkboxPrefixCls}
                    onChange={partial(this.onCheckboxChange, option)}
                    key="checkbox"
                    size={size}
                />,
                <span
                    className={`${prefixCls}-menu-item-label-text`}
                    key="label"
                >
                    {label}
                </span>
            ];
        }
        return (
            <li
                key={option[this.getFieldName('value')]}
                className={menuItemCls}
                title={title}
                {...expandProps}
            >
                {label}
                {
                    option[this.getFieldName('icon')] ? (
                        <span style={{marginLeft: 15}}>
                            {option[this.getFieldName('icon')]}
                        </span>
                    ) : null
                }
                {expandIconNode}
                {loadingIconNode}
            </li>
        );
    }

    getFieldName(name) {
        const fieldNames = this.props.fieldNames;
        // 防止只设置单个属性的名字
        return fieldNames[name];
    }

    scrollActiveItemToView() {
        // scroll into view
        const optionsLength = this.getShowOptions().length;
        for (let i = 0; i < optionsLength; i++) {
            const itemComponent = this.menuItems[i];
            if (itemComponent) {
                const target = findDOMNode(itemComponent);
                target.parentNode.scrollTop = target.offsetTop;
            }
        }
    }

    getShowOptions() {
        const options = this.props.options;
        const result = this.getActiveOptions()
            .map(activeOption => activeOption[this.getFieldName('children')])
            .filter(activeOption => !!activeOption);
        result.unshift(options);
        return result;
    }

    getActiveOptions(values) {
        const activeValue = values || this.state.value;
        const options = this.props.options;
        return arrayTreeFilter(
            options,
            (o, level) => o[this.getFieldName('value')] === activeValue[level],
            {childrenKeyName: this.getFieldName('children')}
        );
    }

    isActiveOption(option, menuIndex) {
        const {value = []} = this.state;
        return value[menuIndex] === option[this.getFieldName('value')];
    }

    saveMenuItem = index => node => {
        this.menuItems[index] = node;
    };

    getOptionCheckboxProps(option) {
        const {interCheckedKeys = [], interIndeterminateKeys = []} = this.state;
        const value = option[this.getFieldName('value')];
        if (interIndeterminateKeys.indexOf(value) > -1) {
            // 半选
            return {
                indeterminate: true,
                checked: false
            };
        }
        if (interCheckedKeys.indexOf(value) > -1) {
            return {
                indeterminate: false,
                checked: true
            };
        }
        return {
            indeterminate: false,
            checked: false
        };
    }

    onMouseEnterItem(optionTarget, menuIndex) {
        this.delayTimer = setTimeout(() => {
            this.onHandleSelect(optionTarget, menuIndex);
            this.delayTimer = null;
        }, 150);
    }

    onMouseLeaveItem() {
        if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
        }
    }

    onHandleSelect = (targetOption, menuIndex, e) => {
        const target = classes(e.target);
        if (target.has(this.props.checkboxPrefixCls)
        || target.has(`${this.props.checkboxPrefixCls}-input`)) {
            return;
        }
        const onSelect = this.props.onSelect;
        let activeValue = this.state.value;
        activeValue = activeValue.slice(0, menuIndex + 1);
        activeValue[menuIndex] = targetOption[this.getFieldName('value')];
        if (!('value' in this.props)) {
            this.setState({
                value: activeValue
            });
        }
        onSelect(targetOption, menuIndex, activeValue);
    }

    onCheckboxChange = (targetOption, e) => {
        const value = targetOption[this.getFieldName('value')];
        const onCheckboxChange = this.props.onCheckboxChange;
        const {optionsObject, interCheckedKeys} = this.state;
        let newCheckedKeys;
        let newIndeterminateKeys;
        const checked = e.target.checked;
        if (checked) {
            // 选中
            newCheckedKeys = [
                ...interCheckedKeys,
                ...formatCheckedKeys(optionsObject, [value]),
                ...formatAllCheckedKeys(optionsObject, value, interCheckedKeys)
            ];
            newIndeterminateKeys = formatIndeterminateKeys(optionsObject, [...uniq(newCheckedKeys)]);
        } else {
            // 未选中
            newCheckedKeys = formatDeleteCheckedKeys(optionsObject, value, [...interCheckedKeys]);
            newIndeterminateKeys = formatIndeterminateKeys(optionsObject, [...newCheckedKeys]);
        }
        const checkedKeys = uniq(newCheckedKeys);
        if (!('checkedKeys' in this.props)) {
            this.setState({
                interCheckedKeys: checkedKeys,
                interIndeterminateKeys: uniq(newIndeterminateKeys)
            });
        }
        onCheckboxChange(checkedKeys);
    }

    onInputChange = e => {
        this.props.onInputChange(e);
        const inputValue = e.value;
        const useDefaultFilter = this.props.useDefaultFilter;
        const flattenTrees = this.state.flattenTrees;
        let newSearchOptions = [];
        if (!('searchValue' in this.props)) {
            this.setState({
                inputValue
            });
        }
        if (useDefaultFilter) {
            if (inputValue) {
                newSearchOptions = filterSearchValue(flattenTrees, inputValue);
            }
            this.setState({
                searchOptions: uniq(newSearchOptions)
            });
        }
    }

    onClickSearchItem = searchOption => {
        this.props.onClickSearchItem(searchOption);
        const showCheckbox = this.props.showCheckbox;
        const newValue = searchOption.map(option => option.value);
        const newState = {};
        if (!('value' in this.props)) {
            newState.value = newValue;
        }
        // 对于单选，选中的展开
        if (showCheckbox) {
            if (!('checkedKeys' in this.props)) {
                const newCheckedKeys = [newValue[newValue.length - 1]];
                newState.interCheckedKeys = newCheckedKeys;
                this.formatOptionsObject(newCheckedKeys);
            }
        }
        newState.inputValue = '';
        newState.searchOptions = [];
        this.setState(newState);
    }

    render() {
        const {
            prefixCls, cascaderPaneStyle, className,
            paneWidth, showSearch, searchProps,
            defaultSearchValue, useDefaultFilter, emptyNode, CustomItemRender
        } = this.props;
        const {inputValue, searchOptions} = this.state;
        const paneClassName = classNames(
            className,
            `${prefixCls}`,
            {
                [`${prefixCls}-show-search`]: showSearch
            }
        );
        const style = {};
        if (paneWidth && showSearch) {
            style.width = typeof paneWidth === 'number' ? `${paneWidth}px` : paneWidth;
        }
        const cascaderInputProps = {
            width: paneWidth,
            onInputChange: this.onInputChange
        };
        cascaderInputProps.value = inputValue;
        if (defaultSearchValue) {
            cascaderInputProps.defaultValue = defaultSearchValue;
        }
        if (searchProps) {
            cascaderInputProps.searchProps = searchProps;
        }
        return (
            <div className={paneClassName}>
                {
                    showSearch ? (
                        <div>
                            <CascaderInput {...cascaderInputProps} />
                        </div>
                    ) : null
                }
                {
                    ((!inputValue && useDefaultFilter) || !useDefaultFilter) ? (
                        <div className={`${prefixCls}-menus`} style={style}>
                            <div className={`${prefixCls}-menus-container`}>
                                {this.getShowOptions().map((options, menuIndex) => (
                                    <ul className={`${prefixCls}-menu`} key={menuIndex} style={cascaderPaneStyle}>
                                        {(menuIndex === 0 && CustomItemRender)
                                            ? <li className={`${prefixCls}-menu-item`}>{CustomItemRender}</li>
                                            : null}
                                        {options.map(option => this.getOption(option, menuIndex))}
                                    </ul>
                                ))}
                            </div>
                        </div>
                    ) : null
                }
                {
                    (inputValue && useDefaultFilter) ? (
                        <div className={classNames(
                            `${prefixCls}-menus`,
                            `${prefixCls}-menus-search-box`
                        )}
                        >
                            <div className={`${prefixCls}-menus-search-box-container`}>
                                {
                                    searchOptions.map((searchOption, index) => {
                                        const newSearchOption = searchOption.map(option => option.label);
                                        return (
                                            <div
                                                className={`${prefixCls}-menu-item`}
                                                key={index}
                                                onClick={partial(this.onClickSearchItem, searchOption)}
                                            >
                                                {newSearchOption.join('>')}
                                            </div>
                                        );
                                    })
                                }
                                {
                                    !(searchOptions && searchOptions.length) ? (
                                        <div className={`${prefixCls}-empty`}>
                                            {emptyNode}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}


polyfill(CascaderPane);

export default CascaderPane;
