import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import {polyfill} from 'react-lifecycles-compat';
import {IconFilter} from '@baidu/one-ui-icon';
import closest from 'dom-closest';
import classNames from 'classnames';
import Dropdown from '../../dropdown';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import Button from '../../button';
import Menu from '../../menu';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export const FilterDropdownMenuWrapper = props => {
    return (
        <div className={props.className} onClick={props.onClick}>
            {props.children}
        </div>
    );
};

FilterDropdownMenuWrapper.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node
};

class FilterMenu extends PureComponent {
    static propTypes = {
        locale: PropTypes.any,
        selectedKeys: PropTypes.arrayOf(PropTypes.string),
        column: PropTypes.shape({
            filterMultiple: PropTypes.bool,
            filterDropdown: PropTypes.node,
            filters: PropTypes.arrayOf(PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.string,
                children: PropTypes.any
            })),
            filterDropdownVisible: PropTypes.bool,
            onFilterDropdownVisibleChange: PropTypes.func,
            fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
            filterIcon: PropTypes.node,
            filterWithoutConfirm: PropTypes.bool
        }),
        /* eslint-disable react/no-unused-prop-types */
        handleFilter: PropTypes.func,
        confirmFilter: PropTypes.func,
        prefixCls: PropTypes.string,
        dropdownPrefixCls: PropTypes.string,
        getPopupContainer: PropTypes.func
    };

    static defaultProps = {
        handleFilter() {},
        column: {}
    };

    constructor(props) {
        super(props);
        const visible = ('filterDropdownVisible' in props.column)
            ? props.column.filterDropdownVisible : false;
        this.state = {
            selectedKeys: props.selectedKeys,
            keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
            visible,
            prevProps: props
        };
    }

    componentDidMount = () => {
        const {column} = this.props;
        this.setNeverShown(column);
    }

    componentDidUpdate = () => {
        const {column} = this.props;
        this.setNeverShown(column);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const {column} = nextProps;
        const newState = {
            prevProps: nextProps
        };
        const prevProps = prevState.prevProps;
        if ('selectedKeys' in nextProps && !shallowequal(prevProps.selectedKeys, nextProps.selectedKeys)) {
            newState.selectedKeys = nextProps.selectedKeys;
        }
        if ('filterDropdownVisible' in column) {
            newState.visible = column.filterDropdownVisible;
        }
        return newState;
    }

    onVisibleChange = visible => {
        this.setVisible(visible);
        if (!visible) {
            this.confirmFilter();
        }
    }

    setNeverShown = column => {
        const rootNode = ReactDOM.findDOMNode(this);
        const filterBelongToScrollBody = !!closest(rootNode, '.new-fc-one-table-scroll');
        if (filterBelongToScrollBody) {
            this.neverShown = !!column.fixed;
        }
    }

    setSelectedKeys = ({selectedKeys}) => {
        const column = this.props.column;
        this.setState({selectedKeys});
        if (column.filterWithoutConfirm) {
            this.props.confirmFilter(this.props.column, selectedKeys);
        }
    }

    setVisible(visible) {
        const {column} = this.props;
        if (!('filterDropdownVisible' in column)) {
            this.setState({visible});
        }
        if (column.onFilterDropdownVisibleChange) {
            column.onFilterDropdownVisibleChange(visible);
        }
    }

    handleConfirm = () => {
        this.setVisible(false);
        this.confirmFilter();
    }

    handleCancel = () => {
        this.setVisible(false);
    }

    confirmFilter() {
        if (this.state.selectedKeys !== this.props.selectedKeys) {
            this.props.confirmFilter(this.props.column, this.state.selectedKeys);
        }
    }

    hasSubMenu() {
        const {column: {filters = []}} = this.props;
        return filters.some(item => !!(item.children && item.children.length > 0));
    }

    handleMenuItemClick = info => {
        if (info.keyPath.length <= 1) {
            return;
        }
        const updater = state => {
            const keyPathOfSelectedItem = {...state.keyPathOfSelectedItem};
            if (state.selectedKeys.indexOf(info.key) >= 0) {
                // deselect SubMenu child
                delete keyPathOfSelectedItem[info.key];
            } else {
                // select SubMenu child
                keyPathOfSelectedItem[info.key] = info.keyPath;
            }
            return {keyPathOfSelectedItem};
        };
        this.setState(updater);
    }

    renderMenus(items) {
        return items.map(item => {
            if (item.children && item.children.length > 0) {
                const {keyPathOfSelectedItem} = this.state;
                const containSelected = Object.keys(keyPathOfSelectedItem).some(
                    key => keyPathOfSelectedItem[key].indexOf(item.value) >= 0,
                );
                const subMenuCls = containSelected ? `${this.props.dropdownPrefixCls}-submenu-contain-selected` : '';
                return (
                    <SubMenu title={item.text} className={subMenuCls} key={item.value.toString()}>
                        {this.renderMenus(item.children)}
                    </SubMenu>
                );
            }
            return this.renderMenuItem(item);
        });
    }

    renderFilterIcon = () => {
        const {column, locale, prefixCls} = this.props;
        const filterIcon = column.filterIcon;
        const dropdownSelectedClass = this.props.selectedKeys.length > 0 ? `${prefixCls}-selected` : '';
        return filterIcon ? React.cloneElement(filterIcon, {
            title: locale.filterTitle,
            className: classNames(filterIcon.className, {
                [`${prefixCls}-icon`]: true
            })
        }) : <IconFilter title={locale.filterTitle} className={dropdownSelectedClass} />;
    }

    renderMenuItem(item) {
        const {column} = this.props;
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const input = multiple ? (
            <Checkbox checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
        ) : (
            <Radio checked={this.state.selectedKeys.indexOf(item.value.toString()) >= 0} />
        );
        return (
            <MenuItem key={item.value}>
                {input}
                <span>{item.text}</span>
            </MenuItem>
        );
    }

    render() {
        const {column, locale, prefixCls, dropdownPrefixCls, getPopupContainer} = this.props;
        // default multiple selection in filter dropdown
        const multiple = ('filterMultiple' in column) ? column.filterMultiple : true;
        const filterWithoutConfirm = ('filterWithoutConfirm' in column) ? column.filterWithoutConfirm : false;
        const dropdownMenuClass = classNames({
            [`${dropdownPrefixCls}-menu-without-submenu`]: !this.hasSubMenu()
        });
        const menus = column.filterDropdown ? (
            <FilterDropdownMenuWrapper>
                {column.filterDropdown}
            </FilterDropdownMenuWrapper>
        ) : (
            <FilterDropdownMenuWrapper className={`${prefixCls}-dropdown`}>
                <Menu
                    multiple={multiple}
                    onClick={this.handleMenuItemClick}
                    prefixCls={`${dropdownPrefixCls}-menu`}
                    className={dropdownMenuClass}
                    onSelect={this.setSelectedKeys}
                    onDeselect={this.setSelectedKeys}
                    selectedKeys={this.state.selectedKeys}
                >
                    {this.renderMenus(column.filters)}
                </Menu>
                {
                    !filterWithoutConfirm ? (
                        <div className={`${prefixCls}-dropdown-btns`}>
                            <Button
                                className={`${prefixCls}-dropdown-link ${prefixCls}-dropdown-link-confirm`}
                                onClick={this.handleConfirm}
                                type="primary"
                            >
                                {locale.filterConfirm}
                            </Button>
                            <Button
                                className={`${prefixCls}-dropdown-link ${prefixCls}-dropdown-link-cancel`}
                                onClick={this.handleCancel}
                                type="normal"
                            >
                                {locale.filterCancel}
                            </Button>
                        </div>
                    ) : null
                }
            </FilterDropdownMenuWrapper>
        );
        return (
            <Dropdown
                trigger={['click']}
                overlay={menus}
                visible={this.neverShown ? false : this.state.visible}
                onVisibleChange={this.onVisibleChange}
                getPopupContainer={getPopupContainer}
                overlayClassName={`${prefixCls}-dropdown`}
            >
                {this.renderFilterIcon()}
            </Dropdown>
        );
    }
}

polyfill(FilterMenu);

export default FilterMenu;
