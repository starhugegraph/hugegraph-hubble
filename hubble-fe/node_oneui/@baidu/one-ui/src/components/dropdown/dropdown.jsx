import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import CommonDropdown from './common/dropdown';
import Icon from '../icon';

export default class Dropdown extends PureComponent {
    static propTypes = {
        /** 触发方式 */
        trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'contextMenu'])),
        /** 内部渲染的dom */
        overlay: PropTypes.node,
        /** 弹窗visible改变时触发 */
        onVisibleChange: PropTypes.func,
        /** 是否可见 */
        visible: PropTypes.bool,
        /** 是否禁用 */
        disabled: PropTypes.bool,
        /** dom挂载的位置 */
        getPopupContainer: PropTypes.func,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        transitionName: PropTypes.string,
        /** 弹层位置 */
        placement: PropTypes.oneOf(['topLeft', 'topCenter', 'topRight', 'bottomLeft', 'bottomCenter', 'bottomRight']),
        children: PropTypes.object,
        /** 鼠标滑过延时 */
        mouseEnterDelay: PropTypes.number,
        /** 鼠标离开延时 */
        mouseLeaveDelay: PropTypes.number,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        overlayClassName: PropTypes.string,
        overlayStyle: PropTypes.object
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-dropdown',
        mouseEnterDelay: 0.15,
        mouseLeaveDelay: 0.1,
        placement: 'bottomLeft',
        className: '',
        overlayClassName: '',
        size: 'small',
        overlayStyle: {}
    };

    componentDidMount() {
        const {overlay} = this.props;
        if (overlay) {
            const overlayProps = overlay.props;
            warning(
                !overlayProps.mode || overlayProps.mode === 'vertical',
                `mode="${overlayProps.mode}" is not supported for Dropdown's Menu.`,
            );
        }
    }

    getTransitionName() {
        const {placement = '', transitionName} = this.props;
        if (transitionName !== undefined) {
            return transitionName;
        }
        if (placement.indexOf('top') >= 0) {
            return 'slide-down';
        }
        return 'slide-up';
    }

    render() {
        const {
            children,
            prefixCls,
            overlay,
            trigger,
            disabled,
            className,
            size
        } = this.props;
        const child = React.Children.only(children);
        const overlayElement = React.Children.only(overlay);
        const dropdownTrigger = React.cloneElement(child, {
            className: classNames(child.props.className, `${prefixCls}-trigger`),
            disabled
        });
        // menu cannot be selectable in dropdown defaultly
        // menu should be focusable in dropdown defaultly
        const {
            selectable = false,
            focusable = true
        } = overlay.props;
        const expandIcon = (
            <span className={`${prefixCls}-menu-submenu-arrow`}>
                <Icon type="angle-right" className={`${prefixCls}-menu-submenu-arrow-icon`} />
            </span>
        );
        const fixedModeOverlay = typeof overlay.type === 'string'
            ? overlayElement : React.cloneElement(overlayElement, {
                mode: 'vertical',
                selectable,
                focusable,
                expandIcon,
                className: `${prefixCls}-menu-${size}`
            });
        const triggerActions = disabled ? [] : trigger;
        let alignPoint;
        if (triggerActions && triggerActions.indexOf('contextMenu') !== -1) {
            alignPoint = true;
        }
        const overlayClassName = classNames(className, this.props.overlayClassName);
        return (
            <CommonDropdown
                alignPoint={alignPoint}
                {...this.props}
                transitionName={this.getTransitionName()}
                trigger={triggerActions}
                overlay={fixedModeOverlay}
                overlayClassName={overlayClassName}
            >
                {dropdownTrigger}
            </CommonDropdown>
        );
    }
}
