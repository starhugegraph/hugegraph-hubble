import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;
export default class SingleSelect extends PureComponent {
    static propTypes = {
        /** options */
        options: PropTypes.array,
        /** 传入的value */
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 弹出的位置 */
        placement: PropTypes.string,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** 触发的trigger, 可选hover,click */
        trigger: PropTypes.string,
        /** 视图改变时候触发 */
        onVisibleChange: PropTypes.func,
        /** 是否可见 */
        visible: PropTypes.any,
        /** 弹窗挂载的位置 */
        getPopupContainer: PropTypes.any,
        /** 选择的时候触发 */
        onChange: PropTypes.func,
        /** 自定义类名 */
        style: PropTypes.object,
        /** 可定义dropdown的高度 */
        dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** placeholder名称 */
        selectorName: PropTypes.string
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-single-select',
        disabled: false,
        dropdownHeight: 'auto',
        style: {},
        trigger: 'hover',
        selectorName: '请选择...'
    };

    constructor(props) {
        super(props);

        this.state = {
            isExpend: false,
            value: props.value || ''
        };
    }

    onChange = e => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange(e);
        }
        this.setState({
            isExpend: false,
            value: e.key
        });
    }

    getSubMenuItem = (option, index) => {
        const {disabled, value, label} = option;
        const menuItem = {
            key: value,
            disabled: disabled || false
        };
        if (option.divider) {
            return <Divider key={`${index}-divider`} />;
        }
        if (option.children && option.children.length) {
            return (
                <SubMenu {...menuItem} title={label}>
                    {
                        option.children.map(child => {
                            return this.getSubMenuItem(child);
                        })
                    }
                </SubMenu>
            );
        }
        return (
            <MenuItem {...menuItem}>
                {label}
            </MenuItem>
        );
    }

    getDropdownOverlay = () => {
        const {
            options,
            dropdownHeight
        } = this.props;
        let value = this.state.value;
        if ('value' in this.props) {
            value = this.props.value;
        }
        const menu = (
            <Menu
                selectable
                selectedKeys={[`${value}`]}
                style={{height: dropdownHeight}}
                onClick={this.onChange}
                mode="vertical"
            >
                {
                    options.map((option, index) => {
                        return this.getSubMenuItem(option, index);
                    })
                }
            </Menu>
        );
        return menu;
    };

    renderValueByOptions = (options, value, label = '') => {
        _.map(options, option => {
            if ((typeof value === 'number' || typeof option.value === 'number')
            && +option.value === +value) {
                label = option.label;
            } else if (option.value === value) {
                label = option.label;
            } else if (option.children) {
                label = this.renderValueByOptions(option.children, value, label);
            }
        });
        return label;
    }

    getSelectedLabel = () => {
        let value = this.state.value;
        if ('value' in this.props) {
            value = this.props.value;
        }
        const {options, selectorName} = this.props;
        const label = this.renderValueByOptions(options, value);
        return label || selectorName;
    }

    dropdownVisibleChange = visible => {
        const onVisibleChange = this.props.onVisibleChange;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        this.setState({
            isExpend: visible
        });
    }

    render() {
        const {
            trigger,
            placement,
            getPopupContainer,
            disabled,
            visible,
            prefixCls,
            style
        } = this.props;
        const overlay = this.getDropdownOverlay();
        const dropdownProps = {
            overlay,
            trigger: disabled ? [] : [trigger],
            onVisibleChange: this.dropdownVisibleChange,
            placement,
            getPopupContainer
        };
        if ('visible' in this.props) {
            dropdownProps.visible = visible;
        }
        const isExpend = this.state.isExpend;
        const classes = classNames(prefixCls, {
            [`${prefixCls}-open`]: (isExpend || visible),
            [`${prefixCls}-disabled`]: disabled
        });
        return (
            <Dropdown {...dropdownProps}>
                <span className={classes} style={style}>
                    <span className={`${prefixCls}-text`}>{this.getSelectedLabel()}</span>
                    <Icon type="angle-down" />
                </span>
            </Dropdown>
        );
    }
}
