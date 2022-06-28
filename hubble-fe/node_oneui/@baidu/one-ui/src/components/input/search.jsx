/**
 * @file 搜索框
 * @author xuwenjun
 * @date 2018/11/22
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import _ from 'lodash';
import Icon from '../icon';
import Layer from '../popLayer';
import Menu from '../menu';
import SearchText from '../select/searchText';
import Button from '../button';
import {getLengthInBytes} from '../../core/commonTools';
// import {defaultInputWidth} from '../../core/inputTools';

const MenuItem = Menu.Item;

function fixControlledValue(value) {
    if (value == null) {
        return '';
    }
    return value;
}

function isFunc(value) {
    return typeof value === 'function';
}

export default class Search extends PureComponent {
    static propTypes = {
        /** 元素的唯一id */
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        /** 搜索框大小，(xsmall/small/medium/large) */
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        /** 搜索框按钮宽度 */
        buttonWidth: PropTypes.number,
        /** 搜索框宽度 */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** 搜索框高度 */
        height: PropTypes.number,
        /** 搜索框是否可用 */
        disabled: PropTypes.bool,
        /** 搜索框值 */
        value: PropTypes.any,
        /** 搜索框默认值 */
        defaultValue: PropTypes.string,
        /** 搜索框自定义类名 */
        className: PropTypes.string,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 回车按键回调函数 */
        onPressEnter: PropTypes.func,
        /** 按键回调函数 */
        onKeyDown: PropTypes.func,
        /** 值改变时回调函数 */
        onChange: PropTypes.func,
        /** 点击搜索时回调函数 */
        onSearch: PropTypes.func,
        /** 点击清空按钮时回调函数 */
        onClearClick: PropTypes.func,
        /** 获得焦点时回调函数 */
        onFocus: PropTypes.func,
        /** 失去焦点时回调函数 */
        onBlur: PropTypes.func,
        /** 面板展开/收起时回调函数 */
        onVisibleChange: PropTypes.func,
        /** 值为空时占位字符串 */
        placeholder: PropTypes.string,
        /** 元素的类型 */
        type: PropTypes.string,
        /** 元素的名称 */
        name: PropTypes.string,
        /** 是否使用输入字段的自动完成功能 */
        autoComplete: PropTypes.string,
        /** 是否使用输入字段的自动完成功能 */
        spellCheck: PropTypes.bool,
        /** 在页面加载时是否获得焦点 */
        autoFocus: PropTypes.bool,
        /** 值为空，点击搜索时代入输入框的值 */
        defaultQuery: PropTypes.object,
        // 下拉框
        /** 下拉框中数据源，{key：value}数组 */
        options: PropTypes.array,
        /** 下拉框高度 */
        dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 是否展现下拉框 为true时，options或overlay不为空时，才出现下拉框 */
        isShowDropDown: PropTypes.bool,
        /** 是否展现搜索功能图标 */
        isShowSearchIcon: PropTypes.bool,
        dropdownMatchSelectWidth: PropTypes.bool,
        /** 下拉框中item点击回调函数 */
        handleMenuClick: PropTypes.func,
        /** 下拉框内容自定义render，需要返回dom结构 */
        overlay: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]),
        /** 搜索功能的按钮样式，(icon/button) */
        searchIconType: PropTypes.string,
        // showSearchIcon
        showSearchIcon: PropTypes.bool,
        // readOnly
        readOnly: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-input-search',
        type: 'text',
        disabled: false,
        defaultQuery: {},
        isShowSearchIcon: true,
        dropdownHeight: 'auto',
        options: [],
        searchIconType: 'icon',
        size: 'small',
        showSearchIcon: true
    };

    constructor(args) {
        super(...args);
        const {value, isShowDropDown, defaultValue} = args;
        this.state = {
            searchIconWidth: 0,
            hasFocus: false,
            value: value || defaultValue || '',
            visible: isShowDropDown || false
        };
    }

    componentDidMount() {
        const me = this;
        me.___searchIconTimer___ = setInterval(() => {
            const searchIconAnchor = me.searchIconAnchor;
            if (!searchIconAnchor) {
                me.setState({searchIconWidth: 0});
                return;
            }
            const searchIconWidth = searchIconAnchor.offsetWidth;
            if (searchIconWidth === me.state.searchIconWidth) {
                return;
            }
            me.setState({searchIconWidth});
        }, 100);
    }

    componentWillReceiveProps(nextProps) {
        const {value, isShowDropDown} = nextProps;
        if ('value' in nextProps && value !== this.props.value) {
            this.setState({value});
        }
        if ('isShowDropDown' in nextProps) {
            this.setState({visible: isShowDropDown});
        }
    }

    componentWillUnmount() {
        clearInterval(this.___searchIconTimer___);
    }

    onChange = e => {
        const value = e.target.value;
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(e);
        }
        if (!('value' in this.props)) {
            this.setState({value});
        }
    }

    onVisibleChange = visible => {
        if (!('isShowDropDown' in this.props)) {
            this.setState({visible});
        }
        const onVisibleChange = this.props.onVisibleChange;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
    }

    onFocus = e => {
        if (this.search) {
            this.search.focus();
        }
        this.onVisibleChange(true);
        this.setState({hasFocus: true});
        const onFocus = this.props.onFocus;
        if (isFunc(onFocus)) {
            onFocus(e);
        }
    }

    onBlur = e => {
        const me = this;
        setTimeout(() => {
            if (me.___stopBlur___) {
                me.___stopBlur___ = false;
                return;
            }
            me.setState({
                hasFocus: false
            });
            this.onVisibleChange(false);
            if (me.search) {
                me.search.blur();
            }
        }, 250);
        const onBlur = this.props.onBlur;
        if (isFunc(onBlur)) {
            onBlur(e);
        }
    }

    getInputClassName = () => {
        const {prefixCls, size, disabled, readOnly} = this.props;
        return classNames(prefixCls, `${prefixCls}-${size}`, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-readOnly`]: readOnly
        });
    }

    getSubMenuItem = option => {
        const menuItemProps = {
            key: option.value,
            ref: _.partial(this.addAnchor, 'getMenuItemRef')
        };
        if (option.disabled) {
            menuItemProps.disabled = true;
        }
        return (
            <MenuItem {...menuItemProps}>
                <SearchText
                    text={option.label}
                    showSearch
                    searchValue={this.state.value}
                />
            </MenuItem>
        );
    }

    handleMenuClick = e => {
        this.___stopBlur___ = false;
        this.onVisibleChange(false);
        const {handleMenuClick, options} = this.props;
        if (handleMenuClick) {
            handleMenuClick(e);
        }
        if (!('value' in this.props)) {
            const selectOption = options.filter(option => option.value === e.key) || [];
            this.setState({value: selectOption[0].label || e.key});
        }
    }

    handleKeyDown = e => {
        const {onPressEnter, onKeyDown, onSearch} = this.props;
        if (e.keyCode === 13) {
            const search = this.search;
            const e = {target: search};
            e.target.value = this.state.value;
            if (onPressEnter) {
                onPressEnter(e);
            } else {
                onSearch(e);
            }
            this.onVisibleChange(false);
            if (search) {
                search.blur();
            }
            this.setState({
                hasFocus: false
            });
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    }

    addAnchor = (key, el) => {
        this[key] = el;
    }

    handleClose = () => {
        const options = this.props.options;
        const search = this.search;
        this.___stopBlur___ = true;
        if (search) {
            search.focus();
        }
        this.setState({
            value: '',
            hasFocus: true
        });
        if (!_.isEmpty(options)) {
            this.onVisibleChange(true);
        }
        const e = {target: search};
        e.target.value = '';
        const onClearClick = this.props.onClearClick;
        if (isFunc(onClearClick)) {
            onClearClick(e);
        }
    }

    handleSearch = () => {
        const {disabled, defaultQuery, onSearch} = this.props;
        const {container, search} = this;
        if (disabled) {
            return;
        }
        let value = search.value;
        if (!value && defaultQuery && defaultQuery.value) {
            value = defaultQuery.value;
            this.___stopBlur___ = true;
            this.setState({
                value
            });
        }
        this.onVisibleChange(false);
        const e = {target: container};
        e.target.value = value;
        if (isFunc(onSearch)) {
            onSearch(e);
        }
    }

    renderIcon = () => {
        const {prefixCls, isShowSearchIcon, searchIconType, buttonWidth, height, disabled, size, readOnly} = this.props;
        const {value, hasFocus} = this.state;
        const len = getLengthInBytes(value);
        const closeProps = {
            type: 'fail',
            className: classNames({
                [`${prefixCls}-icon`]: true,
                [`${prefixCls}-icon-close`]: true,
                [`${prefixCls}-icon-close-show`]: len && hasFocus,
                [`${prefixCls}-icon-close-spacing`]: searchIconType === 'button'
            }),
            onClick: this.handleClose
        };
        const searchProps = {
            type: 'link',
            onClick: this.handleSearch,
            size,
            disabled,
            readOnly
        };
        const style = {};
        if (buttonWidth != null) {
            style.width = buttonWidth;
        }
        if (height != null) {
            style.height = height;
        }
        const buttonProps = {
            type: 'primary',
            className: `${prefixCls}-icon-search-btn`,
            disabled,
            onClick: this.handleSearch,
            style,
            size,
            readOnly
        };
        return (
            <div ref={_.partial(this.addAnchor, 'searchIconAnchor')} className={`${prefixCls}-icon-wrap`}>
                <Icon {...closeProps} />
                {
                    isShowSearchIcon && (
                        <span>
                            { searchIconType === 'icon' && <Button {...searchProps} icon="search" />}
                            { searchIconType === 'button' && <Button {...buttonProps}>搜索</Button>}
                        </span>
                    )
                }
            </div>
        );
    }

    renderInput = () => {
        const {defaultQuery, height} = this.props;
        const {value, searchIconWidth} = this.state;
        const otherProps = omit(this.props, [
            'prefixCls',
            'defaultQuery',
            'onPressEnter',
            'onSearch',
            'onClearClick',
            'handleMenuClick',
            'options',
            'isShowDropDown',
            'isShowSearchIcon',
            'dropdownHeight',
            'dropdownMatchSelectWidth',
            'overlay',
            'searchIconType',
            'buttonWidth',
            'onVisibleChange',
            'showSearchIcon'
        ]);

        if (value != null) {
            otherProps.value = fixControlledValue(value);
            delete otherProps.defaultValue;
        }
        const {prefix: prefixQuery, value: valueQuery} = defaultQuery;
        if (prefixQuery && valueQuery) {
            otherProps.placeholder = `${prefixQuery}: ${valueQuery}`;
        }
        otherProps.style = {
            // width: width || defaultInputWidth,
            paddingRight: searchIconWidth + 4
        };
        if (height != null) {
            otherProps.style.height = height;
        }
        otherProps.onFocus = this.onFocus;
        otherProps.onBlur = this.onBlur;
        otherProps.onChange = this.onChange;
        return (
            <input
                {...otherProps}
                className={classNames(this.getInputClassName())}
                onKeyDown={this.handleKeyDown}
                ref={_.partial(this.addAnchor, 'search')}
            />
        );
    }

    renderLayer = () => {
        const {
            options,
            dropdownHeight,
            prefixCls,
            size
        } = this.props;
        const optionsLength = options.length;
        const menu = (
            <Menu
                style={{height: dropdownHeight}}
                onClick={this.handleMenuClick}
                theme="light"
                selectable={false}
                className={`${prefixCls}-layer-menu`}
                size={size === 'xsmall' ? 'small' : size}
            >
                {
                    options.map((option, index) => {
                        return this.getSubMenuItem(option, optionsLength, index);
                    })
                }
            </Menu>
        );
        return menu;
    }

    render() {
        const {
            prefixCls, width, height, disabled, overlay, searchIconType, size,
            dropdownMatchSelectWidth, className, options, showSearchIcon
        } = this.props;
        const {visible} = this.state;
        const style = {};
        if (width != null) {
            style.width = width;
        }
        if (height != null) {
            style.height = height;
        }
        const containerProps = {
            ref: _.partial(this.addAnchor, 'container'),
            style,
            className: classNames(
                className,
                {
                    [`${prefixCls}-container`]: true,
                    [`${prefixCls}-container-disabled`]: disabled,
                    [`${prefixCls}-container-focused`]: this.state.hasFocus
                },
                `${prefixCls}-container-${searchIconType}`,
                `${prefixCls}-container-${size}`
            )
        };
        const detailProps = {
            className: `${prefixCls}-detail`,
            style
        };
        const overlayClassName = classNames(
            {
                [`${prefixCls}-layer`]: true,
                [`${className}-layer`]: className
            }
        );
        const layerProps = {
            visible: visible && (overlay ? true : !!options.length),
            overlayClassName,
            overlay: overlay != null ? overlay : this.renderLayer()
        };
        if ('dropdownMatchSelectWidth' in this.props) {
            layerProps.dropdownMatchSelectWidth = dropdownMatchSelectWidth;
        }
        return (
            <div {...containerProps}>
                <Layer {...layerProps}>
                    <div {...detailProps}>
                        {this.renderInput()}
                        {
                            showSearchIcon ? this.renderIcon() : null
                        }
                    </div>
                </Layer>
            </div>
        );
    }
}
