/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {Component} from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import PropTypes from 'prop-types';
import LazyRenderBox from './lazyRenderBox';

let uuid = 0;

export default class Dialog extends Component {
    static propTypes = {
        className: PropTypes.string,
        keyboard: PropTypes.bool,
        style: PropTypes.object,
        mask: PropTypes.bool,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        onClose: PropTypes.func,
        closable: PropTypes.bool,
        maskClosable: PropTypes.bool,
        visible: PropTypes.bool,
        destroyOnClose: PropTypes.bool,
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        wrapStyle: PropTypes.object,
        bodyStyle: PropTypes.object,
        maskStyle: PropTypes.object,
        prefixCls: PropTypes.string,
        wrapClassName: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        zIndex: PropTypes.number,
        bodyProps: PropTypes.object,
        maskProps: PropTypes.object,
        wrapProps: PropTypes.object,
        getContainer: PropTypes.func,
        closeIcon: PropTypes.node,
        forceRender: PropTypes.bool,
        afterClose: PropTypes.func
    }

    static defaultProps = {
        className: '',
        mask: true,
        visible: false,
        keyboard: true,
        closable: true,
        maskClosable: true,
        destroyOnClose: false
    }

    titleId = null;

    wrap = null;

    timeoutId = null;

    dialogMouseDown = null;

    openTime = null;

    lastOutSideFocusNode = null;

    componentWillMount() {
        this.titleId = `dialogTitle${uuid++}`;
    }

    componentDidMount() {
        this.componentDidUpdate({});
        if (this.props.forceRender && this.wrap) {
            this.wrap.style.display = 'none';
        }
    }

    componentDidUpdate = prevProps => {
        const props = this.props;
        if (props.visible) {
            if (!prevProps.visible) {
                this.openTime = Date.now();
                this.tryFocus();
                // 从关闭到打开
                document.body.style.overflow = 'hidden';
            }
        } else if (prevProps.visible) {
            this.inTransition = true;
            document.body.style.overflow = '';
            if (props.mask && this.lastOutSideFocusNode) {
                try {
                    this.lastOutSideFocusNode.focus();
                } catch (e) {
                    this.lastOutSideFocusNode = null;
                }
                this.lastOutSideFocusNode = null;
            }
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutId);
        document.body.style.overflow = '';
    }

    tryFocus() {
        if (!contains(this.wrap, document.activeElement)) {
            this.lastOutSideFocusNode = document.activeElement;
            this.sentinelStart.focus();
        }
    }

    onDialogMouseDown = () => {
        this.dialogMouseDown = true;
    }

    onMaskMouseUp = () => {
        if (this.dialogMouseDown) {
            this.timeoutId = setTimeout(() => {
                this.dialogMouseDown = false;
            }, 0);
        }
    }

    onMaskClick = e => {
        if (Date.now() - this.openTime < 300) {
            return;
        }
        if (e.target === e.currentTarget && !this.dialogMouseDown) {
            this.close(e);
        }
    }

    onKeyDown = e => {
        const props = this.props;
        if (props.keyboard && e.keyCode === KeyCode.ESC) {
            e.stopPropagation();
            this.close(e);
        }
    }

    getZIndexStyle = () => {
        const style = {};
        const props = this.props;
        if (props.zIndex !== undefined) {
            style.zIndex = props.zIndex;
        }
        return style;
    }

    getWrapStyle = () => {
        return {
            ...this.getZIndexStyle(),
            ...this.props.wrapStyle
        };
    }

    saveRef = name => node => {
        this[name] = node;
    }

    getMaskStyle = () => {
        return {
            ...this.getZIndexStyle(),
            ...this.props.maskStyle
        };
    }

    getMaskElement = () => {
        const props = this.props;
        let maskElement = null;
        if (props.mask) {
            maskElement = (
                <LazyRenderBox
                    style={this.getMaskStyle()}
                    key="mask"
                    className={`${props.prefixCls}-mask`}
                    hiddenClassName={`${props.prefixCls}-mask-hidden`}
                    visible={props.visible}
                    {...props.maskProps}
                />
            );
        }
        return maskElement;
    }

    getDialogElement = () => {
        const {
            closable, prefixCls, width, height,
            title, closeIcon, className, visible,
            children, bodyStyle, bodyProps, destroyOnClose
        } = this.props;
        const dest = {};
        if (width !== undefined) {
            dest.width = width;
        }
        if (height !== undefined) {
            dest.height = height;
        }
        let footer;
        if (this.props.footer) {
            footer = (
                <div className={`${prefixCls}-footer`} ref={this.saveRef('footer')}>
                    {this.props.footer}
                </div>
            );
        }
        let header;
        if (title) {
            header = (
                <div className={`${prefixCls}-header`} ref={this.saveRef('header')}>
                    <div className={`${prefixCls}-title`} id={this.titleId}>
                        {title}
                    </div>
                </div>
            );
        }

        let closer;
        if (closable) {
            closer = (
                <button
                    type="button"
                    onClick={this.close}
                    aria-label="Close"
                    className={`${prefixCls}-close`}
                >
                    {closeIcon || <span className={`${prefixCls}-close-x`} />}
                </button>
            );
        }
        const style = {
            ...this.props.style,
            ...dest
        };
        const sentinelStyle = {width: 0, height: 0, overflow: 'hidden'};
        const dialogElement = (
            <LazyRenderBox
                key="dialog-element"
                role="document"
                ref={this.saveRef('dialog')}
                style={style}
                className={`${prefixCls} ${className || ''}`}
                visible={visible}
                onMouseDown={this.onDialogMouseDown}
            >
                <div tabIndex={0} ref={this.saveRef('sentinelStart')} style={sentinelStyle} aria-hidden="true" />
                <div className={`${prefixCls}-content`}>
                    {closer}
                    {header}
                    <div
                        className={`${prefixCls}-body`}
                        style={bodyStyle}
                        ref={this.saveRef('body')}
                        {...bodyProps}
                    >
                        {children}
                    </div>
                    {footer}
                </div>
                <div tabIndex={0} ref={this.saveRef('sentinelEnd')} style={sentinelStyle} aria-hidden="true" />
            </LazyRenderBox>
        );
        return (visible || !destroyOnClose) ? dialogElement : null;
    }

    close = e => {
        const {onClose, afterClose} = this.props;
        if (onClose) {
            onClose(e);
        }
        if (this.wrap) {
            this.wrap.style.display = 'none';
        }
        if (afterClose) {
            setTimeout(() => {
                afterClose();
            }, 300);
        }
    }

    render() {
        const props = this.props;
        const {prefixCls, maskClosable} = props;
        const style = this.getWrapStyle();
        if (props.visible) {
            style.display = 'block';
        } else {
            style.display = 'none';
        }
        return (
            <div>
                {this.getMaskElement()}
                <div
                    tabIndex={-1}
                    onKeyDown={this.onKeyDown}
                    className={`${prefixCls}-wrap ${props.wrapClassName || ''}`}
                    ref={this.saveRef('wrap')}
                    onClick={maskClosable ? this.onMaskClick : null}
                    onMouseUp={maskClosable ? this.onMaskMouseUp : null}
                    role="dialog"
                    aria-labelledby={props.title ? this.titleId : null}
                    style={style}
                    {...props.wrapProps}
                >
                    {this.getDialogElement()}
                </div>
            </div>
        );
    }
}
