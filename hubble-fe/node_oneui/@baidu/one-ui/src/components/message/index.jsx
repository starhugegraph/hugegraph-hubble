import React from 'react';
import Notification from 'rc-notification';
import MessageContainer from './common/message';

/* eslint-disable no-unused-vars */
let defaultDuration = 3;
let defaultTop = '30%';
let messageInstance;
let key = 1;
let prefixCls = 'new-fc-one-message';
let getContainer;
let messageSize = 'small';

const getMessageInstance = callback => {
    if (messageInstance) {
        callback(messageInstance);
        return;
    }
    Notification.newInstance({
        prefixCls,
        transitionName: 'move-up',
        style: {top: defaultTop}, // 覆盖原来的样式
        getContainer
    }, instance => {
        if (messageInstance) {
            callback(messageInstance);
            return;
        }
        messageInstance = instance;
        callback(instance);
    });
};

const notice = props => {
    const duration = props.duration !== undefined ? props.duration : defaultDuration;
    const target = key++;
    const closePromise = new Promise(resolve => {
        const callback = () => {
            if (typeof props.onClose === 'function') {
                props.onClose();
            }
            return resolve(true);
        };
        getMessageInstance(instance => {
            const {title, content, type, showCloseIcon = true} = props;
            const size = props.size || messageSize;
            const messageProps = {
                prefixCls,
                type,
                title,
                size,
                instance,
                target,
                content,
                showCloseIcon
            };
            instance.notice({
                key: target,
                duration,
                style: props.style ? props.style : {},
                content: (
                    <MessageContainer {...messageProps} />
                ),
                onClose: callback
            });
        });
    });
    const result = () => {
        if (messageInstance) {
            messageInstance.removeNotice(target);
        }
    };
    result.then = (filled, rejected) => closePromise.then(filled, rejected);
    result.promise = closePromise;
    return result;
};

export default {
    info(props) {
        return notice({
            type: 'info',
            ...props
        });
    },
    success(props) {
        return notice({
            type: 'success',
            ...props
        });
    },
    error(props) {
        return notice({
            type: 'error',
            ...props
        });
    },
    warning(props) {
        return notice({
            type: 'warning',
            ...props
        });
    },
    loading(props) {
        return notice({
            type: 'loading',
            ...props
        });
    },
    config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top;
            messageInstance = null; // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls;
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer;
        }
        if (options.size !== undefined) {
            messageSize = options.size;
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
};
