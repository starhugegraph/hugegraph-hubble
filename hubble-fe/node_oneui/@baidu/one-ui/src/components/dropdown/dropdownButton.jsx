import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {IconChevronDown} from '@baidu/one-ui-icon';
import Dropdown from './dropdown';
import Menu from '../menu';
import Input from '../input';
import SearchText from '../select/searchText';
import Button from '../button';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const ItemGroup = Menu.ItemGroup;
const Search = Input.Search;
const Divider = Menu.Divider;

const itemHeightBySize = {
    xsmall: 24,
    small: 28,
    medium: 32,
    large: 36
};

export default class DropdownButton extends Component {
    static propTypes = {
        /** option, {value,label} */
        options: PropTypes.array.isRequired,
        /** 标题名 */
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 弹窗位置 */
        placement: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 触发方式 */
        trigger: PropTypes.array,
        /** 弹层视图变化时触发 */
        onVisibleChange: PropTypes.func,
        /** 弹层是否可视 */
        visible: PropTypes.any,
        /** 弹层挂载的位置 */
        getPopupContainer: PropTypes.any,
        /** 点击item触发 */
        handleMenuClick: PropTypes.func,
        /** 设置dropdown的高度 */
        dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 搜索时候的Placeholder */
        searchPlaceholder: PropTypes.string,
        /** 是否可搜索 */
        showSearch: PropTypes.bool,
        /** 输入框宽度 */
        searchWidth: PropTypes.number,
        /** 自定义style */
        style: PropTypes.object,
        /** 鼠标移入触发 */
        onMouseEnter: PropTypes.func,
        /** 鼠标移出 */
        onMouseLeave: PropTypes.func,
        /** 可定义单个item的高度 */
        onMenuItemHeight: PropTypes.number, // 传入菜单item的高度，便于计算subMenu的placement定位,
        /** 点击搜索 */
        onClickSearch: PropTypes.func,
        /** 搜索时触发 */
        onSearchChange: PropTypes.func,
        /** 清空搜索时触发 */
        onClearSearch: PropTypes.func,
        /** 搜不到的展示话术 */
        notFound: PropTypes.string,
        /** 自定义className */
        className: PropTypes.string,
        /** 自定义下拉根元素的样式 */
        overlayStyle: PropTypes.object,
        /** 自定义下拉根元素的类名 */
        overlayClassName: PropTypes.string,
        /** 自定义宽度 */
        width: PropTypes.number,
        onHandleMenuClick: PropTypes.func,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        type: PropTypes.oneOf(['normal', 'primary']),
        onClickButton: PropTypes.func,
        buttonProps: PropTypes.object,
        /** 带主命令按钮 - 分成两种样式 */
        primaryType: PropTypes.oneOf(['primary', 'normal']),
        textLink: PropTypes.bool,
        searchControlled: PropTypes.bool,
        dropdownMatchSelectWidth: PropTypes.bool,
        searchPrefixCls: PropTypes.string
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-dropdown',
        disabled: false,
        dropdownHeight: 'auto',
        showSearch: false,
        style: {},
        trigger: ['hover'],
        notFound: '暂无内容',
        className: '',
        searchPlaceholder: '请输入需要搜索的内容',
        size: 'small',
        type: 'normal',
        onClickButton() {},
        buttonProps: {},
        primaryType: 'normal',
        textLink: false,
        searchControlled: false,
        dropdownMatchSelectWidth: false,
        overlayStyle: {},
        searchPrefixCls: 'new-fc-one-input-search'
    };

    constructor(props) {
        super(props);
        this.state = {
            isExpand: false,
            options: props.options || [],
            searchValue: '',
            notFound: props.notFound,
            dropdownWidth: null
        };
    }

    componentDidMount() {
        this.setDropdownWidth();
    }

    componentDidUpdate() {
        this.setDropdownWidth();
    }

    componentWillReceiveProps(nextProps) {
        if ('options' in nextProps) {
            this.setState({options: nextProps.options});
        }
        if ('notFound' in nextProps) {
            this.setState({notFound: nextProps.notFound});
        }
    }

    onSearch = () => {
        const onClickSearch = this.props.onClickSearch;
        const searchValue = this.state.searchValue;
        if (onClickSearch) {
            onClickSearch(searchValue);
        }
    }

    onChangeSearch = e => {
        const value = e.target.value;
        const {onSearchChange, searchControlled, options} = this.props;
        this.setState({
            searchValue: value
        });
        if (onSearchChange) {
            onSearchChange(value);
        }
        if (!searchControlled) {
            // 不受控的话 内部进行搜索
            const newOptions = options.filter(option => option.label && option.label.indexOf(value) > -1);
            this.setState({
                options: newOptions
            });
        }
    }

    onClearClick = () => {
        const onClearSearch = this.props.onClearSearch;
        const value = '';
        if (onClearSearch) {
            onClearSearch(value);
        }
        this.setState({
            searchValue: value
        });
    }

    getButtonRef = ref => {
        this.buttonRef = ref;
    };

    getMenuItemRef = ref => {
        this.menuItemRef = ref;
    }

    getSubMenuItem = (option, optionLength, index) => {
        const {onMenuItemHeight, showSearch, size, prefixCls} = this.props;
        const {
            searchValue
        } = this.state;
        if (option.children && option.children.length) {
            const childrenLength = option.children.length;
            const subMenu = option.children.map((item, index) => {
                const menuItemProps = {
                    key: item.value
                };
                if (item.disabled) {
                    menuItemProps.disabled = true;
                }
                if (item.divider) {
                    return <Divider key={`${index}-divider`} />;
                }
                const onClick = item.onClick || _.noop;
                if (showSearch) {
                    return (
                        <MenuItem {...menuItemProps}>
                            <span onClick={onClick}>
                                <SearchText
                                    text={option.label}
                                    showSearch
                                    searchValue={searchValue}
                                />
                            </span>
                        </MenuItem>
                    );
                }
                return (
                    <MenuItem {...menuItemProps}>
                        <span onClick={onClick}>{item.label}</span>
                    </MenuItem>
                );
            });
            const subMenuProps = {
                key: option.value,
                title: option.label,
                popupClassName: `${prefixCls}-menu-submenu-${size}`
            };
            if (option.disabled) {
                subMenuProps.disabled = true;
            }
            // 判断子菜单是否长，如果子菜单比母菜单长则判定为超长
            if (childrenLength >= optionLength && index) {
                const itemHeight = onMenuItemHeight || itemHeightBySize[size];
                subMenuProps.placements = {
                    rightTop: {
                        points: ['tl', 'tr'],
                        overflow: {
                            adjustX: 1,
                            adjustY: 1
                        },
                        offset: [4, -((itemHeight * index))]
                    }
                };
            }
            if (showSearch) {
                return (
                    <SubMenu {...subMenuProps}>
                        <SearchText
                            text={option.label}
                            showSearch
                            searchValue={searchValue}
                        />
                    </SubMenu>
                );
            }
            return (
                <SubMenu {...subMenuProps}>
                    {subMenu}
                </SubMenu>
            );
        }
        if (option.groupChildren && option.groupChildren.length) {
            // 分组
            const children = option.groupChildren.map(child => {
                const menuItemProps = {
                    key: child.value
                };
                if (child.disabled) {
                    menuItemProps.disabled = true;
                }
                if (child.divider) {
                    return <Divider key={`${index}-divider`} />;
                }
                const onClick = child.onClick || _.noop;
                if (showSearch) {
                    return (
                        <MenuItem {...menuItemProps}>
                            <span onClick={onClick}>
                                <SearchText
                                    text={child.label}
                                    showSearch
                                    searchValue={searchValue}
                                />
                            </span>
                        </MenuItem>
                    );
                }
                return (
                    <MenuItem {...menuItemProps}>
                        <span onClick={onClick}>{option.label}</span>
                    </MenuItem>
                );
            });
            return (
                <ItemGroup key={option.value} title={option.label}>
                    {children}
                </ItemGroup>
            );
        }
        const menuItemProps = {
            key: option.value,
            ref: this.getMenuItemRef
        };
        if (option.disabled) {
            menuItemProps.disabled = true;
        }
        if (option.divider) {
            return <Divider key={`${index}-divider`} />;
        }
        const onClick = option.onClick || _.noop;
        if (showSearch) {
            return (
                <MenuItem {...menuItemProps}>
                    <span onClick={onClick}>
                        <SearchText
                            text={option.label}
                            showSearch
                            searchValue={searchValue}
                        />
                    </span>
                </MenuItem>
            );
        }
        return (
            <MenuItem {...menuItemProps}>
                <span onClick={onClick}>{option.label}</span>
            </MenuItem>
        );
    }

    menuRef = ref => {
        this.dropdownMenuRef = ref;
    }

    getDropdownOverlay = () => {
        const {
            dropdownHeight, showSearch, searchPlaceholder,
            searchWidth, prefixCls, size, searchPrefixCls
        } = this.props;
        const {options, searchValue, notFound} = this.state;
        const optionsLength = options.length;
        const searchMenuProps = {
            disabled: true,
            style: {
                padding: 0,
                cursor: 'auto'
            }
        };
        const searchProps = {
            placeholder: searchPlaceholder,
            value: searchValue,
            isShowDropDown: false,
            onSearch: this.onSearch,
            onChange: this.onChangeSearch,
            onClearClick: this.onClearClick,
            size,
            prefixCls: searchPrefixCls
        };
        if (searchWidth) {
            searchProps.width = searchWidth;
        } else {
            searchProps.width = '100%';
        }

        const notFoundProps = {
            disabled: true,
            className: `${prefixCls}-menu-item-not-found`
        };
        const menu = (
            <Menu
                style={{height: dropdownHeight}}
                onClick={this.handleMenuClick}
                className={`${prefixCls}-menu-${size}`}
                ref={this.menuRef}
            >
                {
                    showSearch ? (
                        <MenuItem {...searchMenuProps}>
                            <Search {...searchProps} />
                        </MenuItem>
                    ) : null
                }
                {
                    options.map((option, index) => {
                        return this.getSubMenuItem(option, optionsLength, index);
                    })
                }
                {
                    !options.length && notFound ? (
                        <MenuItem {...notFoundProps}>
                            {notFound}
                        </MenuItem>
                    ) : null
                }
            </Menu>
        );
        return menu;
    };

    getDropdownContainer = ref => {
        this.dropdown = ref;
    };

    handleMenuClick = e => {
        const {handleMenuClick, onHandleMenuClick} = this.props;
        if (onHandleMenuClick) {
            onHandleMenuClick(e);
        } else if (handleMenuClick) {
            handleMenuClick(e);
        }
        this.setState({
            isExpand: false
        });
    }

    dropdownVisibleChange = visible => {
        const {onVisibleChange, options} = this.props;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        this.setState({
            isExpand: visible,
            searchValue: '',
            options
        });
    }

    setDropdownWidth = () => {
        const width = ReactDOM.findDOMNode(this.buttonRef).offsetWidth;
        if (width !== this.state.dropdownWidth) {
            this.setState({dropdownWidth: width});
        }
    }

    render() {
        const {
            trigger,
            placement,
            disabled,
            visible,
            title,
            style,
            getPopupContainer,
            className,
            overlayStyle,
            overlayClassName,
            width,
            onMouseEnter,
            onMouseLeave,
            size,
            type,
            onClickButton,
            buttonProps,
            primaryType,
            textLink,
            dropdownMatchSelectWidth
        } = this.props;
        const overlay = this.getDropdownOverlay();
        const dropdownProps = {
            overlay,
            trigger: disabled ? [] : trigger,
            onVisibleChange: this.dropdownVisibleChange,
            onMouseEnter,
            onMouseLeave,
            getPopupContainer,
            overlayStyle,
            overlayClassName,
            size
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }
        if ('placement' in this.props) {
            dropdownProps.placement = placement;
        }
        const prefixCls = `${this.props.prefixCls}-button`;
        const isExpand = this.state.isExpand;
        const dropdownButtonClassName = classNames(
            prefixCls,
            `${prefixCls}-${size}`,
            `${prefixCls}-${type}`,
            {
                [`${prefixCls}-open`]: (isExpand || visible),
                [`${prefixCls}-textLink`]: textLink
            }
        );
        const buttonStyle = {...style};
        if (width) {
            buttonStyle.width = `${width}px`;
        }
        const dropdownButtonContainerClassName = classNames(
            `${prefixCls}-containers`,
            className
        );
        const otherProps = {};
        if (textLink) {
            otherProps.type = 'link';
        }
        const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
        if (this.state.dropdownWidth) {
            overlayStyle[widthProp] = `${this.state.dropdownWidth}px`;
        }
        return (
            <span
                className={dropdownButtonContainerClassName}
                ref={this.getDropdownContainer}
            >
                {
                    type === 'normal' ? (
                        <Dropdown {...dropdownProps}>
                            <span ref={this.getButtonRef}>
                                <Button
                                    className={dropdownButtonClassName}
                                    style={buttonStyle}
                                    disabled={disabled}
                                    size={size}
                                    {...buttonProps}
                                    {...otherProps}
                                >
                                    {title}
                                    <IconChevronDown />
                                </Button>
                            </span>
                        </Dropdown>
                    ) : (
                        <span ref={this.getButtonRef} className={`${prefixCls}-primary-container`}>
                            <Button disabled={disabled} onClick={onClickButton} type={primaryType} size={size}>{title}</Button>
                            <Dropdown placement="bottomRight" {...dropdownProps}>
                                <span className={`${prefixCls}-primary-container-item`}>
                                    <Button
                                        className={dropdownButtonClassName}
                                        style={buttonStyle}
                                        size={size}
                                        disabled={disabled}
                                        type={primaryType}
                                        icon={<IconChevronDown />}
                                        {...buttonProps}
                                    />
                                </span>
                            </Dropdown>
                        </span>
                    )
                }
            </span>
        );
    }
}
