import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import {
    IconCheckCircle,
    IconExclamationCircle,
    IconInfoCircle,
    IconTimesCircle
} from '@baidu/one-ui-icon';
import Modal from './modal';
import ActionButton from './actionButton';

export default function confirm(config) {
    const {
        prefixCls = 'new-fc-one-modal-confirm',
        buttonPosition = 'left',
        okCancel = true,
        content,
        okType,
        onOk,
        okProps = {},
        cancelProps = {},
        onCancel,
        size = 'small',
        okText,
        cancelType,
        cancelText,
        type,
        className = '',
        title = '提示',
        buttonSize = 'small',
        width = 'small',
        okOrder,
        cancelOrder,
        icon,
        iconType,
        modalProps = {}
    } = config;
    let {
        maskClosable
    } = config;
    const div = document.createElement('div');
    document.body.appendChild(div);
    // 默认为 false，保持旧版默认行为
    maskClosable = maskClosable === undefined ? false : maskClosable;

    const close = (...args) => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
        const triggerCancel = args
            && args.length
            && args.some(param => param && param.triggerCancel);
        if (onCancel && triggerCancel) {
            onCancel(...args);
        }
    };

    const body = (
        <div className={`${prefixCls}-body`}>
            <div className={`${prefixCls}-content`}>{content}</div>
        </div>
    );

    let footer = null;
    const okButtonProps = {
        type: okType,
        actionFn: onOk,
        closeModal: close,
        autoFocus: true,
        otherProps: okProps,
        order: okOrder,
        size: buttonSize
    };
    if (okCancel) {
        footer = [
            <ActionButton key="confirm" {...okButtonProps}>
                {okText}
            </ActionButton>,
            <ActionButton
                key="cancel"
                type={cancelType}
                actionFn={onCancel}
                closeModal={close}
                otherProps={cancelProps}
                order={cancelOrder || null}
                size={buttonSize}
            >
                {cancelText}
            </ActionButton>
        ];
        if (buttonPosition === 'right') {
            footer = [footer[1], footer[0]];
        }
    } else {
        footer = [
            <ActionButton key="confirm" {...okButtonProps}>
                {okText}
            </ActionButton>
        ];
    }
    const classString = classNames(prefixCls, {
        [`${prefixCls}-${type}`]: true,
        [`${prefixCls}-order-reverse`]: cancelOrder && okOrder && cancelOrder < okOrder
    }, className);

    let $title = title;
    let $icon = null;
    if (icon) {
        $icon = icon;
    } else if (iconType) {
        switch (iconType) {
            case 'success':
                $icon = <IconCheckCircle />;
                break;
            case 'warning':
                $icon = <IconExclamationCircle />;
                break;
            case 'info':
                $icon = <IconInfoCircle />;
                break;
            case 'fail':
                $icon = <IconTimesCircle />;
                break;
            default:
                break;
        }
    }

    if ($icon) {
        $title = (
            <div className={classNames(`${prefixCls}-title-icon`)}>
                <span className={classNames(`${prefixCls}-title-icon-container`, {
                    [`${prefixCls}-title-icon-${iconType}`]: !!iconType,
                    [`${prefixCls}-title-icon-custom`]: !!icon
                })}
                >
                    {$icon}
                </span>
                {$title}
            </div>
        );
    }

    ReactDOM.render(
        <Modal
            {...config}
            {...modalProps}
            className={classString}
            onCancel={close}
            visible
            title={$title}
            transitionName="zoom"
            maskTransitionName="fade"
            maskClosable={maskClosable}
            size={size}
            footer={footer}
            width={width}
            buttonPosition={buttonPosition}
        >
            <div>
                {body}
            </div>
        </Modal>,
        div);
    return {
        destroy: close
    };
}
