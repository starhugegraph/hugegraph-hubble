/**
 * @file 提示信息和错误信息的工具方法
 * 没有暴露出组件外去，因为外部不需要
 * @author shanqianmin
 * @date 2019/03/13
 */
import classNames from 'classnames';
import React from 'react';
export var getPopoverProps = function getPopoverProps(props, state) {
  var tipLocation = props.tipLocation,
      errorMessage = props.errorMessage,
      tipText = props.tipText,
      errorLocation = props.errorLocation,
      location = props.location;
  var realTipLocation = tipLocation || location;
  var realErrorLocation = errorLocation || location;
  var isErrorLayer = realErrorLocation === 'layer';
  var isTipLayer = realTipLocation === 'layer';
  var content = '';
  var overlayClassName = '';

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
    overlayClassName: overlayClassName,
    content: content,
    visible: !!content && state.hasFocus,
    placement: 'bottomLeft'
  };
};
export var getTipClassName = function getTipClassName(props, key, showErrorFlag) {
  var _classNames;

  if (key === void 0) {
    key = 'tipLocation';
  }

  if (showErrorFlag === void 0) {
    showErrorFlag = true;
  }

  var prefixCls = props.prefixCls,
      errorMessage = props.errorMessage,
      location = props.location,
      size = props.size;
  var tipClass = prefixCls + "-tip";
  var realLocation = props[key] || location;
  return classNames(tipClass, tipClass + "-" + realLocation, tipClass + "-" + realLocation + "-" + size, (_classNames = {}, _classNames[tipClass + "-error"] = showErrorFlag && errorMessage, _classNames));
};
export var tipsAndErrorRender = function tipsAndErrorRender(props) {
  var _render;

  var tipLocation = props.tipLocation,
      errorMessage = props.errorMessage,
      tipText = props.tipText,
      errorLocation = props.errorLocation,
      location = props.location;
  var realTipLocation = tipLocation || location;
  var isTipLayer = realTipLocation === 'layer';
  var realErrorLocation = errorLocation || location;
  var isErrorLayer = realErrorLocation === 'layer';
  var isSameLocation = realTipLocation === realErrorLocation;
  var renderDetail = errorMessage || tipText;
  var tipProps = {
    className: getTipClassName(props)
  };

  if (isSameLocation) {
    return !isTipLayer && isSameLocation && renderDetail ? React.createElement("div", tipProps, renderDetail) : null;
  }

  var render = (_render = {}, _render[realTipLocation] = !isTipLayer && !isSameLocation && tipText ? React.createElement("div", {
    className: getTipClassName(props, 'tipLocation', false),
    key: "text-area-tips"
  }, tipText) : null, _render[realErrorLocation] = !isErrorLayer && !isSameLocation && errorMessage ? React.createElement("div", {
    className: getTipClassName(props, 'errorLocation'),
    key: "text-area-errors"
  }, errorMessage) : null, _render);
  return [render.right, render.bottom];
};