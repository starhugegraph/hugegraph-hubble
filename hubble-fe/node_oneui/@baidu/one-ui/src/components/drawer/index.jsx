import React, {Component} from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import classNames from 'classnames';
import {IconClose} from '@baidu/one-ui-icon';
import Button from '../button';
import RcDrawer from './common/drawerWrapper';

const DrawerContext = createReactContext(null);

export default class Drawer extends Component {
    static propTypes = {
        /** 是否允许关闭 */
        closable: PropTypes.bool,
        /** 关闭时候是否销毁 */
        destroyOnClose: PropTypes.bool,
        /** 挂载的dom */
        getContainer: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.func,
            PropTypes.bool
        ]),
        /** 外层遮罩是否可点击关闭 */
        maskClosable: PropTypes.bool,
        /** 是否有遮罩 */
        mask: PropTypes.bool,
        /** 遮罩的style */
        maskStyle: PropTypes.object,
        /** 自定义draw的style */
        style: PropTypes.object,
        /** draw的标题 */
        title: PropTypes.node,
        /** 是否可见 */
        visible: PropTypes.bool,
        /** draw的宽度 */
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** z-index层级 */
        zIndex: PropTypes.number,
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 弹出的位置 */
        placement: PropTypes.string,
        /** 关闭时触发 */
        onClose: PropTypes.func,
        /** 自定义类名 */
        className: PropTypes.string,
        /** drawer的children */
        children: PropTypes.node,
        /** drawer的高度 */
        height: PropTypes.number,
        /** 传入底部按钮 */
        footer: PropTypes.array,
        hideDefaultFooter: PropTypes.bool,
        /** 仅仅对默认footer生效 */
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        okProps: PropTypes.object,
        cancelProps: PropTypes.object,
        size: PropTypes.oneOf(['small', 'medium'])
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-drawer',
        width: 400,
        height: 256,
        closable: true,
        placement: 'right',
        maskClosable: true,
        mask: true,
        footer: null,
        hideDefaultFooter: true,
        onOk() {},
        onCancel() {},
        okText: '确定',
        cancelText: '取消',
        okProps: {},
        cancelProps: {},
        size: 'small'
    };

    constructor(props) {
        super(props);
        this.state = {
            push: false
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.visible !== this.props.visible && this.parentDrawer) {
            if (this.props.visible) {
                this.parentDrawer.push();
            } else {
                this.parentDrawer.pull();
            }
        }
    }

    onMaskClick = e => {
        if (!this.props.maskClosable) {
            return;
        }
        this.close(e);
    }

    getDestoryOnClose = () => (this.props.destroyOnClose && !this.props.visible);

    // get drawar push width or height
    getPushTransform = placement => {
        if (placement === 'left' || placement === 'right') {
            return `translateX(${placement === 'left' ? 180 : -180}px)`;
        }
        if (placement === 'top' || placement === 'bottom') {
            return `translateY(${placement === 'top' ? 180 : -180}px)`;
        }
    }

    getRcDrawerStyle = () => {
        const {zIndex, placement, maskStyle} = this.props;
        return this.state.push
            ? {
                ...maskStyle,
                zIndex,
                transform: this.getPushTransform(placement)
            }
            : {
                ...maskStyle,
                zIndex
            };
    }

    close = e => {
        if (this.props.visible !== undefined) {
            if (this.props.onClose) {
                this.props.onClose(e);
            }
        }
    }

    push = () => {
        this.setState({
            push: true
        });
    }

    pull = () => {
        this.setState({
            push: false
        });
    }

    // render drawer body dom
    renderBody = () => {
        const isDestroyOnClose = this.getDestoryOnClose();
        if (isDestroyOnClose) {
            return null;
        }
        const {prefixCls, title, closable, footer, placement, onOk, onCancel, okText, cancelText, okProps, cancelProps, hideDefaultFooter, size} = this.props;
        const containerStyle = (placement === 'left' || placement === 'right')
            ? {
                overflow: 'auto',
                height: '100%'
            } : {};
        if (isDestroyOnClose) {
            // Increase the opacity transition, delete children after closing.
            containerStyle.opacity = 0;
            containerStyle.transition = 'opacity .3s';
        }
        let header;
        if (title) {
            header = (
                <div className={`${prefixCls}-header`}>
                    <div className={`${prefixCls}-header-container`}>
                        <div className={`${prefixCls}-title`}>{title}</div>
                    </div>
                </div>
            );
        }
        // is have closer button
        let closer;
        if (closable) {
            closer = (
                <span className={`${prefixCls}-close`} onClick={this.close}>
                    <IconClose />
                </span>
            );
        }
        let drawerFooter = !hideDefaultFooter ? [
            <Button key="confirm" type="primary" size={size} onClick={onOk} {...okProps}>{okText}</Button>,
            <Button key="cancel" onClick={onCancel} size={size} {...cancelProps}>{cancelText}</Button>
        ] : null;
        if (footer && footer.length) {
            drawerFooter = footer;
        }
        let footerDom = null;
        if (drawerFooter) {
            footerDom = (
                <div className={`${prefixCls}-footer`}>
                    {drawerFooter}
                </div>
            );
        }
        const bodyClassName = classNames(`${prefixCls}-body`, {
            [`${prefixCls}-body-${placement}`]: true,
            [`${prefixCls}-body-has-footer`]: footer && footer.length
        });

        const drawerBodyClass = classNames(`${prefixCls}-wrapper-body`, `${prefixCls}-wrapper-body-${size}`);
        return (
            <div
                className={drawerBodyClass}
                style={containerStyle}
            >
                <div className={`${prefixCls}-wrapper-body-container`}>
                    {header}
                    {closer}
                    <div className={bodyClassName} style={this.props.style}>
                        {this.props.children}
                    </div>
                    {footerDom}
                </div>
            </div>
        );
    }

    // render Provider for Multi-level drawe
    renderProvider = value => {
        const {
            zIndex,
            style,
            placement,
            className,
            width,
            height,
            visible,
            mask,
            destroyOnClose,
            closable,
            title,
            cancelProps,
            okProps,
            okText,
            cancelText,
            onOk,
            onCancel,
            hideDefaultFooter,
            footer,
            ...rest
        } = this.props;
        const haveMask = mask ? '' : 'no-mask';
        this.parentDrawer = value;
        const offsetStyle = {};
        if (placement === 'left' || placement === 'right') {
            offsetStyle.width = width;
        } else {
            offsetStyle.height = height;
        }
        return (
            <DrawerContext.Provider value={this}>
                <RcDrawer
                    level={null}
                    handler={false}
                    {...rest}
                    {...offsetStyle}
                    open={visible}
                    onClose={this.onMaskClick}
                    showMask={mask}
                    placement={placement}
                    style={this.getRcDrawerStyle()}
                    className={classNames(className, haveMask)}
                >
                    {this.renderBody()}
                </RcDrawer>
            </DrawerContext.Provider>
        );
    }

    render() {
        return (
            <DrawerContext.Consumer>
                {this.renderProvider}
            </DrawerContext.Consumer>
        );
    }
}
