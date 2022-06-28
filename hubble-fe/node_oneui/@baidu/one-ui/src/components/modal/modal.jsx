import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import {polyfill} from 'react-lifecycles-compat';
import {transSizeOfDefault} from '../../core/commonTools';
import Button from '../button';
import Dialog from './common/dialogWrapper';

let mousePosition;
let mousePositionEventBinded;

const widthSizeMap = {
    small: 400,
    medium: 600,
    large: 800
};

class Modal extends PureComponent {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 弹窗是否可见 */
        visible: PropTypes.bool,
        /** confirm点击的时候是否需要loading */
        confirmLoading: PropTypes.bool,
        /** 弹窗标题 */
        title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        /** 弹窗点击按钮 */
        onOk: PropTypes.func,
        /** 弹窗点击取消 */
        onCancel: PropTypes.func,
        /** 弹窗关闭后触发 */
        afterClose: PropTypes.func,
        // width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        /** footer为一个数组，数组里面是button */
        footer: PropTypes.array,
        /** 确定按钮的文案 */
        okText: PropTypes.string,
        /** 确定按钮的type */
        okType: PropTypes.string,
        /** 取消的文案 */
        cancelText: PropTypes.string,
        /** 遮罩是否可以点击被关闭 */
        maskClosable: PropTypes.bool,
        /** 自定义style */
        style: PropTypes.object,
        /** 弹窗的类名自定义 */
        wrapClassName: PropTypes.string,
        className: PropTypes.string,
        /** 弹窗挂载的位置 */
        getContainer: PropTypes.func,
        /** 弹窗的z-index */
        zIndex: PropTypes.number,
        /** 弹窗的尺寸 */
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        /** 按钮的类型 */
        buttonSize: PropTypes.oneOf(['small', 'medium', 'large', 'xsmall', 'xlarge']),
        /** 弹窗是否居中显示 */
        centered: PropTypes.bool,
        /** 关闭以后弹窗是否销毁 */
        destroyOnClose: PropTypes.bool,
        /** 是否支持键盘esc关闭 */
        keyboard: PropTypes.bool,
        /** 是否展示遮罩 */
        mask: PropTypes.bool,
        /** 遮罩样式 */
        maskStyle: PropTypes.object,
        /** 按钮的位置 */
        buttonPosition: PropTypes.oneOf(['left', 'center', 'right']),
        /** 是否需要close的Icon */
        needCloseIcon: PropTypes.bool,
        okProps: PropTypes.object,
        cancelProps: PropTypes.object,
        /** 确定 取消 按钮的order */
        okOrder: PropTypes.number,
        cancelOrder: PropTypes.number,
        /** 弹窗宽度 */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fullScreen: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-modal',
        size: 'medium',
        confirmLoading: false,
        visible: false,
        okType: 'primary',
        centered: true,
        destroyOnClose: false,
        mask: true,
        maskClosable: false,
        buttonPosition: 'left',
        footer: undefined,
        needCloseIcon: true,
        okProps: {},
        cancelProps: {},
        width: 'medium',
        fullScreen: false
    }

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('visible' in nextProps
        && nextProps.visible !== prevState.visible) {
            return {
                visible: nextProps.visible
            };
        }
        return null;
    }

    componentDidMount = () => {
        if (mousePositionEventBinded) {
            return;
        }
        // 只有点击事件支持从鼠标位置动画展开
        addEventListener(document.documentElement, 'click', e => {
            mousePosition = {
                x: e.pageX,
                y: e.pageY
            };
            setTimeout(() => {mousePosition = null;}, 100);
        });
        mousePositionEventBinded = true;
    }

    getWidthBySize = () => {
        const width = this.props.width;
        if (widthSizeMap[width]) {
            return widthSizeMap[width];
        }
        return width;
    }

    handleCancel = e => {
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel(e);
        }
        this.setState({
            visible: false
        });
    }

    handleOk = e => {
        const onOk = this.props.onOk;
        if (onOk) {
            onOk(e);
        }
    }

    renderFooter = () => {
        const {
            okText,
            okType,
            cancelText,
            confirmLoading,
            okProps,
            cancelProps,
            okOrder,
            cancelOrder,
            size,
            buttonPosition
        } = this.props;
        let buttonSize = this.props.buttonSize;
        buttonSize = buttonSize ? transSizeOfDefault(buttonSize, 'medium') : size;
        const okStyle = okOrder ? {...(okProps.style || {}), order: okOrder} : {...(okProps.style || {})};
        const cancelStyle = cancelOrder ? {...(cancelProps.style || {}), order: cancelOrder} : {...(cancelProps.style || {})};
        const confirmButton = (
            <Button
                key="confirm"
                type={okType}
                size={buttonSize}
                loading={confirmLoading}
                onClick={this.handleOk}
                {...okProps}
                style={okStyle}
            >
                {okText || '确定'}
            </Button>
        );
        const cancelButton = (
            <Button
                key="cancel"
                size={buttonSize}
                type="normal"
                onClick={this.handleCancel}
                {...cancelProps}
                style={cancelStyle}
            >
                {cancelText || '取消'}
            </Button>
        );
        const defaultFooter = buttonPosition === 'right' ? [
            cancelButton, confirmButton
        ] : [
            confirmButton, cancelButton
        ];
        return defaultFooter;
    }

    render() {
        const {
            footer,
            wrapClassName,
            centered,
            className,
            prefixCls,
            buttonPosition,
            destroyOnClose,
            needCloseIcon,
            size,
            fullScreen,
            okOrder,
            cancelOrder,
            ...restProps
        } = this.props;
        const visible = this.state.visible;
        const defaultFooter = this.renderFooter();
        const modalSize = transSizeOfDefault(this.props.size, 'medium');
        if (!visible && destroyOnClose) {
            // 关闭的时候销毁节点
            return null;
        }
        const wrapClass = classNames(
            `${prefixCls}-${buttonPosition}`,
            `${prefixCls}-${modalSize}`,
            {
                [`${prefixCls}-centered`]: !!centered,
                [`${prefixCls}-hide-close`]: !needCloseIcon,
                [`${prefixCls}-full-screen`]: fullScreen,
                [`${prefixCls}-order-reverse`]: okOrder && cancelOrder && cancelOrder < okOrder,
                [`${prefixCls}-order-normal`]: okOrder && cancelOrder && cancelOrder > okOrder
            },
            wrapClassName,
            className
        );
        return (
            <Dialog
                {...restProps}
                prefixCls={prefixCls}
                wrapClassName={wrapClass}
                width={this.getWidthBySize()}
                footer={footer === undefined ? defaultFooter : footer}
                visible={visible}
                mousePosition={mousePosition}
                onClose={this.handleCancel}
            />
        );
    }
}

polyfill(Modal);
export default Modal;
