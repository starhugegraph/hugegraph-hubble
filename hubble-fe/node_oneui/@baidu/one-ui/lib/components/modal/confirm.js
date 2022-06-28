"use strict";

exports.__esModule = true;
exports["default"] = confirm;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _modal = _interopRequireDefault(require("./modal"));

var _actionButton = _interopRequireDefault(require("./actionButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function confirm(config) {
  var _classNames;

  var _config$prefixCls = config.prefixCls,
      prefixCls = _config$prefixCls === void 0 ? 'new-fc-one-modal-confirm' : _config$prefixCls,
      _config$buttonPositio = config.buttonPosition,
      buttonPosition = _config$buttonPositio === void 0 ? 'left' : _config$buttonPositio,
      _config$okCancel = config.okCancel,
      okCancel = _config$okCancel === void 0 ? true : _config$okCancel,
      content = config.content,
      okType = config.okType,
      onOk = config.onOk,
      _config$okProps = config.okProps,
      okProps = _config$okProps === void 0 ? {} : _config$okProps,
      _config$cancelProps = config.cancelProps,
      cancelProps = _config$cancelProps === void 0 ? {} : _config$cancelProps,
      onCancel = config.onCancel,
      _config$size = config.size,
      size = _config$size === void 0 ? 'small' : _config$size,
      okText = config.okText,
      cancelType = config.cancelType,
      cancelText = config.cancelText,
      type = config.type,
      _config$className = config.className,
      className = _config$className === void 0 ? '' : _config$className,
      _config$title = config.title,
      title = _config$title === void 0 ? '提示' : _config$title,
      _config$buttonSize = config.buttonSize,
      buttonSize = _config$buttonSize === void 0 ? 'small' : _config$buttonSize,
      _config$width = config.width,
      width = _config$width === void 0 ? 'small' : _config$width,
      okOrder = config.okOrder,
      cancelOrder = config.cancelOrder,
      icon = config.icon,
      iconType = config.iconType,
      _config$modalProps = config.modalProps,
      modalProps = _config$modalProps === void 0 ? {} : _config$modalProps;
  var maskClosable = config.maskClosable;
  var div = document.createElement('div');
  document.body.appendChild(div); // 默认为 false，保持旧版默认行为

  maskClosable = maskClosable === undefined ? false : maskClosable;

  var close = function close() {
    var unmountResult = _reactDom["default"].unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var triggerCancel = args && args.length && args.some(function (param) {
      return param && param.triggerCancel;
    });

    if (onCancel && triggerCancel) {
      onCancel.apply(void 0, args);
    }
  };

  var body = _react["default"].createElement("div", {
    className: prefixCls + "-body"
  }, _react["default"].createElement("div", {
    className: prefixCls + "-content"
  }, content));

  var footer = null;
  var okButtonProps = {
    type: okType,
    actionFn: onOk,
    closeModal: close,
    autoFocus: true,
    otherProps: okProps,
    order: okOrder,
    size: buttonSize
  };

  if (okCancel) {
    footer = [_react["default"].createElement(_actionButton["default"], _extends({
      key: "confirm"
    }, okButtonProps), okText), _react["default"].createElement(_actionButton["default"], {
      key: "cancel",
      type: cancelType,
      actionFn: onCancel,
      closeModal: close,
      otherProps: cancelProps,
      order: cancelOrder || null,
      size: buttonSize
    }, cancelText)];

    if (buttonPosition === 'right') {
      footer = [footer[1], footer[0]];
    }
  } else {
    footer = [_react["default"].createElement(_actionButton["default"], _extends({
      key: "confirm"
    }, okButtonProps), okText)];
  }

  var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + type] = true, _classNames[prefixCls + "-order-reverse"] = cancelOrder && okOrder && cancelOrder < okOrder, _classNames), className);
  var $title = title;
  var $icon = null;

  if (icon) {
    $icon = icon;
  } else if (iconType) {
    switch (iconType) {
      case 'success':
        $icon = _react["default"].createElement(_oneUiIcon.IconCheckCircle, null);
        break;

      case 'warning':
        $icon = _react["default"].createElement(_oneUiIcon.IconExclamationCircle, null);
        break;

      case 'info':
        $icon = _react["default"].createElement(_oneUiIcon.IconInfoCircle, null);
        break;

      case 'fail':
        $icon = _react["default"].createElement(_oneUiIcon.IconTimesCircle, null);
        break;

      default:
        break;
    }
  }

  if ($icon) {
    var _classNames2;

    $title = _react["default"].createElement("div", {
      className: (0, _classnames["default"])(prefixCls + "-title-icon")
    }, _react["default"].createElement("span", {
      className: (0, _classnames["default"])(prefixCls + "-title-icon-container", (_classNames2 = {}, _classNames2[prefixCls + "-title-icon-" + iconType] = !!iconType, _classNames2[prefixCls + "-title-icon-custom"] = !!icon, _classNames2))
    }, $icon), $title);
  }

  _reactDom["default"].render(_react["default"].createElement(_modal["default"], _extends({}, config, modalProps, {
    className: classString,
    onCancel: close,
    visible: true,
    title: $title,
    transitionName: "zoom",
    maskTransitionName: "fade",
    maskClosable: maskClosable,
    size: size,
    footer: footer,
    width: width,
    buttonPosition: buttonPosition
  }), _react["default"].createElement("div", null, body)), div);

  return {
    destroy: close
  };
}

module.exports = exports.default;