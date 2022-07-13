/**
 * @file 提示信息和错误信息的工具方法
 * 没有暴露出组件外去，因为外部不需要
 * @author shanqianmin
 * @date 2019/03/13
 */
import classNames from 'classnames';
import React from 'react';

export const getPopoverProps = (props, state) => {
    const {
        tipLocation,
        errorMessage,
        tipText,
        errorLocation,
        location
    } = props;
    const realTipLocation = tipLocation || location;
    const realErrorLocation = errorLocation || location;
    const isErrorLayer = realErrorLocation === 'layer';
    const isTipLayer = realTipLocation === 'layer';
    let content = '';
    let overlayClassName = '';
    if (isErrorLayer) {
        content = errorMessage;
        overlayClassName = getTipClassName(props, 'errorLocation');
        if (isTipLayer) {
            content = errorMessage || tipText;
        }
    } else if (isTipLayer) {
        content = tipText;
        overlayClassName = getTipClassName(props, 'tipLocation', false);
    }
    return {
        overlayClassName,
        content,
        visible: !!content && state.hasFocus,
        placement: 'bottomLeft'
    };
};

export const getTipClassName = (props, key = 'tipLocation', showErrorFlag = true) => {
    const {prefixCls, errorMessage, location, size} = props;
    const tipClass = `${prefixCls}-tip`;
    const realLocation = props[key] || location;
    return classNames(
        tipClass,
        `${tipClass}-${realLocation}`,
        `${tipClass}-${realLocation}-${size}`,
        {
            [`${tipClass}-error`]: showErrorFlag && errorMessage
        }
    );
};

export const tipsAndErrorRender = props => {
    const {
        tipLocation,
        errorMessage,
        tipText,
        errorLocation,
        location
    } = props;
    const realTipLocation = tipLocation || location;
    const isTipLayer = realTipLocation === 'layer';
    const realErrorLocation = errorLocation || location;
    const isErrorLayer = realErrorLocation === 'layer';
    const isSameLocation = realTipLocation === realErrorLocation;
    const renderDetail = errorMessage || tipText;
    const tipProps = {
        className: getTipClassName(props)
    };
    if (isSameLocation) {
        return !isTipLayer && isSameLocation && renderDetail ? <div {...tipProps}>{renderDetail}</div> : null;
    }
    const render = {
        [realTipLocation]: !isTipLayer && !isSameLocation && tipText
            ? <div className={getTipClassName(props, 'tipLocation', false)} key="text-area-tips">{tipText}</div>
            : null,
        [realErrorLocation]: !isErrorLayer && !isSameLocation && errorMessage
            ? <div className={getTipClassName(props, 'errorLocation')} key="text-area-errors">{errorMessage}</div>
            : null
    };
    return [
        render.right,
        render.bottom
    ];
};
