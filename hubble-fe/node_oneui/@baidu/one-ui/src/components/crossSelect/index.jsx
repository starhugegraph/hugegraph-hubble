import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import Input from '../input';
import SearchText from '../select/searchText';
import Select from '../select';
import tools from '../../core';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Search = Input.Search;
const SingleSelect = Select.SingleSelect;

const {
    flattern
} = tools.common;

export default class CrossSelect extends Component {
    static propTypes = {
        /** 菜单选项内容 */
        options: PropTypes.array,
        /** 默认展示的value */
        value: PropTypes.string,
        /** 外部输入框默认展示的placeholder */
        titlePlaceHolder: PropTypes.string,
        /** 自定义类目前缀 */
        prefixCls: PropTypes.string,
        /** 弹层展示的位置 */
        placement: PropTypes.string,
        /** 下拉选择禁用 */
        disabled: PropTypes.bool,
        trigger: PropTypes.array,
        /** 弹层视图变化时触发 */
        onVisibleChange: PropTypes.func,
        /** 弹层是否可视 */
        visible: PropTypes.any,
        /** 弹层挂载的节点 */
        getPopupContainer: PropTypes.any,
        /** 点击item的时候触发回调 */
        handleMenuClick: PropTypes.func,
        /** 弹层的高度 */
        dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 搜索框的placeholder */
        searchPlaceholder: PropTypes.string,
        /** dropdownStyle */
        style: PropTypes.object,
        /** 禁用原因 */
        disabledReason: PropTypes.string,
        /** 鼠标滑入触发 */
        onMouseEnter: PropTypes.func,
        /** 鼠标滑出触发 */
        onMouseLeave: PropTypes.func,
        /** 传入菜单item的高度，便于计算subMenu的placement定位 */
        onMenuItemHeight: PropTypes.number,
        /** 点击搜索框触发 */
        onClickSearch: PropTypes.func,
        /** 输入框改变时候触发回调 */
        onSearchChange: PropTypes.func,
        /** 清空输入框时触发回调 */
        onClearSearch: PropTypes.func,
        /** 找不到时候触发 */
        notFound: PropTypes.string,
        /** 选择的层级信息 */
        levelList: PropTypes.array,
        /** 默认选中的层级 */
        selectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 选择层级时候的回调 */
        hanldLevelChange: PropTypes.func,
        /** 点击父层级，展开子层级的回调 */
        onTitleClick: PropTypes.func,
        /** 选中菜单收起后，展示的层级，默认是选中的label, 可设置全部层级，展现方式为 parent > current > children, 值为single单一层级，all全部层级 */
        textImpressionWay: PropTypes.string,
        /** 搜索框暴露focus函数  */
        onSearchInputFocus: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-cross-select',
        disabled: false,
        dropdownHeight: 'auto',
        searchPlaceholder: '',
        style: {},
        onMenuItemHeight: 28,
        trigger: ['click'],
        notFound: '暂无内容',
        value: '',
        titlePlaceHolder: '请选择...',
        textImpressionWay: 'single'
    };

    constructor(props) {
        super(props);
        this.state = {
            isExpend: false,
            showDisabledReason: false,
            options: props.options,
            searchValue: '',
            notFound: props.notFound,
            value: props.value,
            searchPlaceholder: props.searchPlaceholder,
            showSearch: false,
            selectValue: props.selectValue || (props.levelList && props.levelList[0] && props.levelList[0].value),
            levelList: props.levelList,
            selectedKeys: props.value ? [props.value] : []
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('options' in nextProps) {
            this.setState({options: nextProps.options});
        }
        if ('notFound' in nextProps) {
            this.setState({notFound: nextProps.notFound});
        }
        if ('searchPlaceholder' in nextProps) {
            this.setState({searchPlaceholder: nextProps.searchPlaceholder});
        }
        if ('selectValue' in nextProps) {
            this.setState({selectValue: nextProps.selectValue});
        }
        if ('levelList' in nextProps) {
            this.setState({levelList: nextProps.levelList});
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
        const onSearchChange = this.props.onSearchChange;
        this.setState({
            searchValue: value
        });
        if (onSearchChange) {
            onSearchChange(e);
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

    onInputFocus = e => {
        const showSearch = this.state.showSearch;
        const onSearchInputFocus = this.props.onSearchInputFocus;
        if (!showSearch) {
            this.setState({
                showSearch: true
            });
        }
        if (onSearchInputFocus) {
            onSearchInputFocus(e);
        }
    }

    onMouseEnter = () => {
        const showDisabledReason = this.state.showDisabledReason;
        const {disabled, disabledReason, onMouseEnter} = this.props;
        if (disabled && disabledReason && !showDisabledReason) {
            this.setState({
                showDisabledReason: !showDisabledReason
            });
        }
        if (onMouseEnter) {
            onMouseEnter();
        }
    }

    onMouseLeave = () => {
        const showDisabledReason = this.state.showDisabledReason;
        const {onMouseLeave} = this.props;
        if (showDisabledReason) {
            this.setState({
                showDisabledReason: !showDisabledReason
            });
        }
        if (onMouseLeave) {
            onMouseLeave();
        }
    }

    getButtonRef = ref => {
        this.buttonRef = ref;
    };

    getMenuItemRef = ref => {
        this.menuItemRef = ref;
    }

    getSubMenuItem = (option, optionLength, index) => {
        const {onMenuItemHeight, prefixCls, onTitleClick} = this.props;
        const {
            searchValue,
            showSearch
        } = this.state;
        const {parent, children, emptyText} = option;
        if (children) {
            // children为[]给默认话术
            const subMenuOptions = children.length ? this.renderSubMenuItem({
                searchValue,
                showSearch,
                children
            }) : this.renderEmptySubMenuItem({emptyText});
            const subMenuTitle = this.renderParentSubMenuTitle({
                option,
                showSearch,
                searchValue,
                parent,
                prefixCls
            });
            const subMenuProps = {
                key: option.value,
                title: subMenuTitle,
                disabled: option.disabled || false,
                onTitleClick
            };
            const placements = this.calculateSubMenuPlacements({children, index, optionLength, onMenuItemHeight});
            if (placements) {
                subMenuProps.placements = placements;
            }
            return (
                <SubMenu {...subMenuProps}>
                    {subMenuOptions}
                </SubMenu>
            );
        }
        return this.renderMenuItem({option, showSearch, searchValue, parent, prefixCls});
    }

    getOperateRef = ref => {
        this.operateRef = ref;
    }

    getDropdownOverlay = () => {
        const dropdownHeight = this.props.dropdownHeight;
        const {
            options,
            searchValue,
            notFound,
            searchPlaceholder,
            selectValue,
            levelList,
            showSearch,
            selectedKeys
        } = this.state;
        const optionsLength = options.length;
        const defaultDisabledStyle = {
            padding: 0,
            cursor: 'auto'
        };
        const searchMenuProps = {
            disabled: true,
            style: defaultDisabledStyle
        };
        const searchProps = {
            placeholder: searchPlaceholder,
            value: searchValue,
            isShowDropDown: false,
            onSearch: this.onSearch,
            onChange: this.onChangeSearch,
            onClearClick: this.onClearClick,
            onFocus: this.onInputFocus
        };
        if (this.buttonRef && this.buttonRef.offsetWidth) {
            searchProps.style = {};
            const buttonWidth = this.buttonRef.offsetWidth;
            searchProps.width = showSearch ? buttonWidth - 27 : buttonWidth;
        }

        const notFoundProps = {
            disabled: true
        };
        const selectProps = {
            style: {width: 64},
            options: levelList,
            onChange: this.hanldLevelChange,
            value: selectValue
        };
        const menu = (
            <Menu
                style={{height: dropdownHeight}}
                onClick={this.handleMenuClick}
                theme="light"
                triggerSubMenuAction="click"
                selectedKeys={selectedKeys}
            >
                <MenuItem {...searchMenuProps} ref={this.getOperateRef}>
                    {
                        showSearch ? <SingleSelect {...selectProps} /> : null
                    }
                    <Search {...searchProps} />
                </MenuItem>
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

    getPopupContainer = triggerNode => {
        return triggerNode.parentNode;
    }

    getLabel = value => {
        const options = flattern(this.state.options);
        const textImpressionWay = this.props.textImpressionWay;
        let currentOption = null;
        _.map(options, option => {
            if (value === option.value) {
                currentOption = option;
            }
        });
        if (!currentOption) {
            return null;
        }
        if (textImpressionWay === 'single') {
            return currentOption.label;
        }
        return currentOption.parent ? `${currentOption.parent.join(' > ')} > ${currentOption.label}` : currentOption.label;
    }

    handleMenuClick = e => {
        const handleMenuClick = this.props.handleMenuClick;
        const options = this.state.options;
        const newOptions = flattern(options);
        const index = _.findIndex(newOptions, option => {
            const newKey = `${option.value}`;
            return newKey === e.key;
        });
        const currentItem = newOptions[index];
        if (handleMenuClick) {
            handleMenuClick(e, currentItem);
        }
        const parentKey = currentItem.parentValue;
        const currentKey = [`${currentItem.value}`];
        const selectedKeys = parentKey ? parentKey.concat(currentKey) : currentKey;
        this.setState({
            isExpend: false,
            value: currentItem.value,
            selectedKeys
        });
    }

    hanldLevelChange = e => {
        const value = e.key;
        const hanldLevelChange = this.props.hanldLevelChange;
        if (hanldLevelChange) {
            hanldLevelChange(value);
        }
        if (!('selectValue' in this.props)) {
            this.setState({selectValue: value});
        }
    }

    dropdownVisibleChange = visible => {
        const onVisibleChange = this.props.onVisibleChange;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        this.setState({
            isExpend: visible,
            searchValue: '',
            showSearch: false
        });
    }

    calculateSubMenuPlacements = params => {
        const {children, index, onMenuItemHeight, optionLength} = params;
        let placements = null;
        // 判断子菜单是否长，如果子菜单比母菜单长则判定为超长
        if (children.length >= optionLength && index) {
            placements = {
                rightTop: {
                    points: ['tl', 'tr'],
                    overflow: {
                        adjustX: 1,
                        adjustY: 1
                    },
                    offset: [4, -((onMenuItemHeight * index) + 8)]
                }
            };
        }
        return placements;
    }

    renderSubMenuItem = params => {
        const {children, showSearch, searchValue} = params;
        const subMenu = children.map(item => {
            const menuItemProps = {
                key: item.value,
                disabled: item.disabled || false
            };
            return (
                <MenuItem {...menuItemProps}>
                    {
                        showSearch ? (
                            <SearchText
                                text={item.label}
                                showSearch
                                searchValue={searchValue}
                            />
                        ) : item.label
                    }
                </MenuItem>
            );
        });
        return subMenu;
    }

    renderEmptySubMenuItem = params => {
        const emptyText = params.emptyText || '暂无数据';
        const emptyProps = {
            key: 'null-0',
            disabled: true
        };
        return [(
            <MenuItem {...emptyProps}>
                {emptyText}
            </MenuItem>
        )];
    }

    renderParentText = params => {
        const parent = params.parent;
        const menuItemText = parent && parent.length ? parent.join('>') : '';
        return menuItemText;
    }

    renderParentSubMenuTitle = params => {
        const {option, showSearch, searchValue, parent, prefixCls} = params;
        const label = option.label;
        const parentText = this.renderParentText({parent});
        const labelTextRender = showSearch ? (
            <SearchText
                text={label}
                showSearch
                searchValue={searchValue}
            />
        ) : <span>{label}</span>;
        if (!parentText) {
            return labelTextRender;
        }
        const labelParentRender = showSearch ? (
            <SearchText
                text={`(${parentText})`}
                showSearch
                searchValue={searchValue}
                className={`${prefixCls}-item-parent`}
            />
        ) : (
            <span className={`${prefixCls}-item-parent`}>
(
                {parentText}
)
            </span>
        );
        return (
            <span>
                {labelTextRender}
                {labelParentRender}
            </span>
        );
    }

    renderMenuItem = params => {
        const {option, showSearch, searchValue, parent, prefixCls} = params;
        const menuItemProps = {
            key: option.value,
            ref: this.getMenuItemRef,
            disabled: option.disabled
        };
        const textRender = this.renderParentSubMenuTitle({option, showSearch, searchValue, parent, prefixCls});
        return (
            <MenuItem {...menuItemProps}>
                {textRender}
            </MenuItem>
        );
    }

    render() {
        const {
            // align,
            trigger,
            placement,
            disabled,
            disabledReason,
            visible,
            prefixCls,
            style,
            getPopupContainer,
            titlePlaceHolder
        } = this.props;
        const overlay = this.getDropdownOverlay();
        const dropdownProps = {
            // align,
            overlay,
            trigger: disabled ? [] : trigger,
            onVisibleChange: this.dropdownVisibleChange,
            placement,
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            getPopupContainer: getPopupContainer || this.getPopupContainer,
            className: `${prefixCls}-container`
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }
        const {isExpend, showDisabledReason, value} = this.state;
        const classes = classNames(prefixCls, {
            [`${prefixCls}-open`]: (isExpend || visible),
            [`${prefixCls}-disabled`]: disabled
        });
        const showText = this.getLabel(value) || titlePlaceHolder;
        const textCls = classNames(`${prefixCls}-text`, {
            [`${prefixCls}-text-empty`]: !value || (isExpend || visible)
        });
        return (
            <div
                className={`${prefixCls}-containers`}
                ref={this.getDropdownContainer}
            >
                <Dropdown {...dropdownProps}>
                    <span className={classes} style={style} ref={this.getButtonRef}>
                        <span className={textCls}>{showText}</span>
                        <Icon type="angle-down" />
                        {
                            (disabledReason && disabled && showDisabledReason) ? (
                                <span className={`${prefixCls}-disabled-reason`}>{disabledReason}</span>
                            ) : null
                        }
                    </span>
                </Dropdown>
            </div>
        );
    }
}
