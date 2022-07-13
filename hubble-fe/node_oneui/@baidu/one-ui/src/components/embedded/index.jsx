import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconClose} from '@baidu/one-ui-icon';
import horizon from './horizon';
import Button from '../button';

export default class Embedded extends PureComponent {
    static horizon = horizon;

    static propTypes = {
        /** 面板关闭时触发 */
        onClose: PropTypes.func,
        /** 传入底部的button数组 */
        footer: PropTypes.array,
        /** 面板的标题 */
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        /** 面板是否可以关闭 */
        closable: PropTypes.bool,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 自定义类名 */
        className: PropTypes.string,
        children: PropTypes.node,
        /** 面板是否可见 */
        visible: PropTypes.bool,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okProps: PropTypes.object,
        cancelProps: PropTypes.object,
        okOrder: PropTypes.number,
        cancelOrder: PropTypes.number,
        /** 按钮的类型 */
        buttonSize: PropTypes.oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),
        size: PropTypes.oneOf(['small', 'medium']),
        okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        hideDefaultFooter: PropTypes.bool,
        position: PropTypes.oneOf(['left', 'center', 'right'])
    }

    static defaultProps = {
        footer: null,
        closable: true,
        prefixCls: 'new-fc-one-embedded',
        className: '',
        onOk() {},
        onCancel() {},
        okProps: {},
        cancelProps: {},
        okOrder: 1,
        cancelOrder: 2,
        size: 'medium',
        okText: '确定',
        cancelText: '取消',
        hideDefaultFooter: true,
        position: 'left'
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    onClose = () => {
        this.setState({
            visible: false
        });
        this.props.onClose();
    }

    renderFooter = () => {
        const {footer, onOk, onCancel, okProps, cancelProps, okOrder, cancelOrder, buttonSize, size, okText, cancelText, hideDefaultFooter} = this.props;
        if (footer) {
            return footer;
        }
        const okStyle = okProps.style ? {...okProps.style, order: okOrder} : {order: okOrder};
        const cancelStyle = cancelProps.style ? {...cancelProps.style, order: cancelOrder} : {order: cancelOrder};
        const defaultFooter = [
            <Button
                size={buttonSize || size}
                key="confirm"
                onClick={onOk}
                type="primary"
                {...okProps}
                style={okStyle}
            >
                {okText}
            </Button>,
            <Button
                size={buttonSize || size}
                onClick={onCancel}
                key="cancel"
                type="normal"
                {...cancelProps}
                style={cancelStyle}
            >
                {cancelText}
            </Button>
        ];
        return !hideDefaultFooter ? defaultFooter : null;
    }

    render() {
        const {title, prefixCls, className, closable, children, size, position} = this.props;
        let visible = this.state.visible;
        if ('visible' in this.props) {
            visible = this.props.visible;
        }
        if (!visible) {
            return null;
        }
        const footer = this.renderFooter();
        const embeddedClassNames = classNames(prefixCls, className, `${prefixCls}-${size}`);
        return (
            <div className={embeddedClassNames}>
                {
                    closable ? (
                        <span className={`${prefixCls}-close`} onClick={this.onClose}>
                            <IconClose />
                        </span>
                    ) : null
                }
                <div className={`${prefixCls}-header`}>
                    {title}
                </div>
                <div className={`${prefixCls}-body`}>
                    {children}
                </div>
                {
                    footer ? (
                        <div className={`${prefixCls}-footer ${prefixCls}-${position}`}>
                            {footer}
                        </div>
                    ) : null
                }
            </div>
        );
    }
}
