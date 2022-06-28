import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import arrayTreeFilter from 'array-tree-filter';
import omit from 'omit.js';
import KeyCode from 'rc-util/lib/KeyCode';
import RcCascader from './common/cascader';
import Input from '../input';
import Icon from '../icon';

const optionsShape = PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: optionsShape
});

const FieldNamesType = PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.string
});

const ShowSearchType = PropTypes.shape({
    filter: PropTypes.func,
    matchInputWidth: PropTypes.bool,
    render: PropTypes.func,
    sort: PropTypes.func
});

function highlightKeyword(str, keyword, prefixCls) {
    return str.split(keyword)
        .map((node, index) => {
            return index === 0
                ? node
                : [
                    <span className={`${prefixCls}-menu-item-keyword`} key="seperator">{keyword}</span>,
                    node
                ];
        });
}

function defaultFilterOption(inputValue, path, names) {
    return path.some(option => option[names.label].indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
    return path.map((option, index) => {
        const label = option[names.label];
        const node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
        return index === 0 ? node : [' > ', node];
    });
}

function defaultSortFilteredOption(a, b, inputValue, names) {
    function callback(elem) {
        return elem[names.label].indexOf(inputValue) > -1;
    }

    return a.findIndex(callback) - b.findIndex(callback);
}

const getFieldNames = props => {
    const fieldNames = props.fieldNames;
    return fieldNames;
};

const getFilledFieldNames = props => {
    const fieldNames = getFieldNames(props) || {};
    const names = {
        children: fieldNames.children || 'children',
        label: fieldNames.label || 'label',
        value: fieldNames.value || 'value'
    };
    return names;
};

const defaultDisplayRender = label => label.join(' > ');

export default class Cascader extends PureComponent {

    static propTypes = {
        /** 可选项数据源 */
        options: PropTypes.arrayOf(optionsShape),
        /** 指定选中项 */
        value: PropTypes.array,
        /** 默认的选中项 */
        defaultValue: PropTypes.array,
        /** 选择完成后的回调 */
        onChange: PropTypes.func,
        /** 选择后展示的渲染函数 */
        displayRender: PropTypes.func,
        /** 自定义样式 */
        style: PropTypes.object,
        /** 自定义类名 */
        className: PropTypes.string,
        /** 自定义浮层类名 */
        popupClassName: PropTypes.string,
        /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
        popupPlacement: PropTypes.oneOf(['bottomLeft', 'bottomRight', 'topLeft', 'topRight']),
        /** 输入框占位文本 */
        placeholder: PropTypes.string,
        /** 输入框大小 */
        size: PropTypes.oneOf(['large', 'medium', 'small']),
        /** 禁用 */
        disabled: PropTypes.bool,
        /** 是否支持清除 */
        allowClear: PropTypes.bool,
        /** 是否展示 分为bool 和 object 两种
         * 为对象的时候
         * filter接收 inputValue path 两个参数，当 path 符合筛选条件时，应返回 true，反之则返回 false
         * limit搜索结果展示数量number
         * matchInputWidth搜索结果列表是否与输入框同宽
         * render 用于渲染 filter 后的选项
         * sort用于排序 filter 后的选项
         */
        showSearch: PropTypes.oneOfType([ShowSearchType, PropTypes.bool]),
        /** 搜索没有内容的时候 */
        notFoundContent: PropTypes.node,
        /** 用于动态加载选项，无法与 showSearch 一起使用 */
        loadData: PropTypes.func,
        /** 次级菜单的展开方式，可选 'click' 和 'hover */
        expandTrigger: PropTypes.oneOf(['click', 'hover']),
        /** 当此选项为true时，点选每级菜单选项值都会发生变化 */
        changeOnSelect: PropTypes.bool,
        /** 浮层可见变化时回调 */
        onPopupVisibleChange: PropTypes.func,
        /** 前缀类名 */
        prefixCls: PropTypes.string,
        /** 输入框的前缀类名 */
        inputPrefixCls: PropTypes.string,
        /** 弹层挂载的位置的方法 */
        getPopupContainer: PropTypes.func,
        /** 弹层是否可视 */
        popupVisible: PropTypes.bool,
        /** 自定义 options 中 label name children 的字段 */
        fieldNames: FieldNamesType,
        /** 自定义的选择框后缀图标 */
        suffixIcon: PropTypes.node,
        /** 展开面板的时候是否默认展示placeholder */
        showPlaceHolderWhenFocuse: PropTypes.bool,
        /** 级联器的width */
        width: PropTypes.number
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-cascader',
        inputPrefixCls: 'new-fc-one-input',
        placeholder: '请选择',
        popupPlacement: 'bottomLeft',
        options: [],
        disabled: false,
        allowClear: true,
        notFoundContent: '未找到合适的选项',
        style: {},
        showPlaceHolderWhenFocuse: false,
        width: 200
    };

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.defaultValue || [],
            inputValue: '',
            inputFocused: false,
            popupVisible: props.popupVisible,
            flattenOptions: props.showSearch ? this.flattenTree(props.options, props) : undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({value: nextProps.value || []});
        }
        if ('popupVisible' in nextProps) {
            this.setState({popupVisible: nextProps.popupVisible});
        }
        if (nextProps.showSearch && this.props.options !== nextProps.options) {
            this.setState({flattenOptions: this.flattenTree(nextProps.options, nextProps)});
        }
    }

    getCascaderContainerInput = ref => {
        this.cascaderInput = ref;
    };

    getLabel() {
        const {options, displayRender = defaultDisplayRender} = this.props;
        const names = getFilledFieldNames(this.props);
        const value = this.state.value;
        const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
        const selectedOptions = arrayTreeFilter(
            options,
            (o, level) => o[names.value] === unwrappedValue[level],
            {childrenKeyName: names.children}
        );
        const label = selectedOptions.map(o => o[names.label]);
        return displayRender(label, selectedOptions);
    }

    setValue = (value, selectedOptions = []) => {
        if (!('value' in this.props)) {
            this.setState({value});
        }
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(value, selectedOptions);
        }
    };

    handleChange = (value, selectedOptions) => {
        this.setState({inputValue: ''});
        if (selectedOptions[0].__IS_FILTERED_OPTION) {
            const unwrappedValue = value[0];
            const unwrappedSelectedOptions = selectedOptions[0].path;
            this.setValue(unwrappedValue, unwrappedSelectedOptions);
            return;
        }
        this.setValue(value, selectedOptions);
    };

    handlePopupVisibleChange = popupVisible => {
        if (!('popupVisible' in this.props)) {
            const updater = state => {
                return {
                    popupVisible,
                    inputFocused: popupVisible,
                    inputValue: popupVisible ? state.inputValue : ''
                };
            };
            this.setState(updater);
        }

        const onPopupVisibleChange = this.props.onPopupVisibleChange;
        if (onPopupVisibleChange) {
            onPopupVisibleChange(popupVisible);
        }
    };

    handleInputBlur = () => {
        this.setState({
            inputFocused: false
        });
    };

    handleInputClick = e => {
        const {inputFocused, popupVisible} = this.state;
        // Prevent `Trigger` behaviour.
        if (inputFocused || popupVisible) {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
        }
    };

    handleKeyDown = e => {
        if (e.keyCode === KeyCode.BACKSPACE) {
            e.stopPropagation();
        }
    };

    handleInputChange = e => {
        const inputValue = e.value;
        this.setState({inputValue});
    };

    clearSelection = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!this.state.inputValue) {
            this.setValue([]);
            this.handlePopupVisibleChange(false);
        } else {
            this.setState({inputValue: ''});
        }
    };

    flattenTree(options, props, ancestor = []) {
        const names = getFilledFieldNames(props);
        let flattenOptions = [];
        const childrenName = names.children;
        options.forEach(option => {
            const path = ancestor.concat(option);
            if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
                flattenOptions.push(path);
            }
            if (option[childrenName]) {
                flattenOptions = flattenOptions.concat(this.flattenTree(option[childrenName], props, path));
            }
        });
        return flattenOptions;
    }

    generateFilteredOptions(prefixCls) {
        const {showSearch, notFoundContent} = this.props;
        const names = getFilledFieldNames(this.props);
        const {
            filter = defaultFilterOption,
            render = defaultRenderFilteredOption,
            sort = defaultSortFilteredOption
        } = showSearch;
        const {flattenOptions, inputValue} = this.state;
        const filtered = flattenOptions.filter(path => filter(this.state.inputValue, path, names))
            .sort((a, b) => sort(a, b, inputValue, names));

        if (filtered.length > 0) {
            return filtered.map(path => {
                return {
                    __IS_FILTERED_OPTION: true,
                    path,
                    [names.label]: render(inputValue, path, prefixCls, names),
                    [names.value]: path.map(o => o[names.value]),
                    disabled: path.some(o => !!o.disabled)
                };
            });
        }
        return [{[names.label]: notFoundContent, [names.value]: 'NEW_FC_ONE_CASCADER_NOT_FOUND', disabled: true}];
    }

    focus() {
        this.input.focus();
    }

    blur() {
        this.input.blur();
    }

    saveInput = node => {
        this.input = node;
    }

    render() {
        const {props, state} = this;
        const {
            prefixCls, inputPrefixCls, children, placeholder, size, disabled, width,
            className, style, allowClear, showSearch = false, showPlaceHolderWhenFocuse, ...otherProps
        } = props;
        const {value, inputFocused} = state;
        const clearIcon = (allowClear && !disabled && value.length > 0) || state.inputValue
            ? (
                <Icon
                    type="close"
                    className={`${prefixCls}-picker-clear`}
                    onClick={this.clearSelection}
                />
            )
            : null;
        const arrowCls = classNames({
            [`${prefixCls}-picker-arrow`]: true,
            [`${prefixCls}-picker-arrow-expand`]: state.popupVisible
        });
        // Fix bug of https://github.com/facebook/react/pull/5004
        // and https://fb.me/react-unknown-prop
        const inputProps = omit(otherProps, [
            'onChange',
            'options',
            'popupPlacement',
            'transitionName',
            'displayRender',
            'onPopupVisibleChange',
            'changeOnSelect',
            'expandTrigger',
            'popupVisible',
            'getPopupContainer',
            'loadData',
            'popupClassName',
            'filterOption',
            'renderFilteredOption',
            'sortFilteredOption',
            'notFoundContent',
            'fieldNames',
            'defaultValue'
        ]);

        let options = props.options;
        if (state.inputValue) {
            options = this.generateFilteredOptions(prefixCls);
        }
        // Dropdown menu should keep previous status until it is fully closed.
        if (!state.popupVisible) {
            options = this.cachedOptions;
        } else {
            this.cachedOptions = options;
        }
        const dropdownMenuColumnStyle = {};
        const isNotFound = (options || []).length === 1 && options[0].value === 'NEW_FC_ONE_CASCADER_NOT_FOUND';
        if (isNotFound) {
            dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
        }

        // The default value of `matchInputWidth` is `true`
        let resultListMatchInputWidth = showSearch.matchInputWidth === false ? showSearch.matchInputWidth : true;
        if (isNotFound) {
            resultListMatchInputWidth = true;
        }
        const pickerCls = classNames(className, {
            [`${prefixCls}-picker`]: true,
            [`${prefixCls}-picker-with-value`]: state.inputValue,
            [`${prefixCls}-picker-disabled`]: disabled,
            [`${prefixCls}-picker-not-found`]: isNotFound,
            [`${prefixCls}-picker-show-search`]: !!showSearch,
            [`${prefixCls}-picker-focused`]: inputFocused,
            [`${prefixCls}-${size}`]: size
        });
        if (resultListMatchInputWidth && state.inputValue && this.cascaderInput) {
            dropdownMenuColumnStyle.minWidth = this.cascaderInput.inputRef.offsetWidth;
        }
        let currentlabel = showPlaceHolderWhenFocuse && inputFocused && !value.length ? placeholder : this.getLabel();
        if (!state.inputValue && inputFocused && !value.length) {
            currentlabel = '';
        }
        const spanStyle = {
            ...style,
            width: (width || style.width)
        };
        const input = children || (
            <span
                style={spanStyle}
                className={pickerCls}
            >
                <span className={`${prefixCls}-picker-label`}>
                    {currentlabel}
                </span>
                <Input
                    {...inputProps}
                    ref={this.getCascaderContainerInput}
                    prefixCls={inputPrefixCls}
                    placeholder={value && value.length > 0 ? undefined : placeholder}
                    className={`${prefixCls}-input`}
                    value={state.inputValue}
                    disabled={disabled}
                    readOnly={!showSearch}
                    autoComplete="off"
                    onClick={showSearch ? this.handleInputClick : undefined}
                    onBlur={showSearch ? this.handleInputBlur : undefined}
                    onKeyDown={this.handleKeyDown}
                    onChange={showSearch ? this.handleInputChange : undefined}
                    style={spanStyle}
                    width={width}
                    isRequired={false}
                    size={size}
                />
                {clearIcon}
                <Icon type="angle-down" className={arrowCls} />
            </span>
        );

        const expandIcon = (
            <Icon type="angle-right" />
        );
        return (
            <RcCascader
                {...props}
                options={options}
                value={value}
                popupVisible={state.popupVisible}
                onPopupVisibleChange={this.handlePopupVisibleChange}
                onChange={this.handleChange}
                dropdownMenuColumnStyle={dropdownMenuColumnStyle}
                expandIcon={expandIcon}
                loadingIcon={expandIcon}
                transitionName="slide-up"
            >
                {input}
            </RcCascader>
        );
    }
}
