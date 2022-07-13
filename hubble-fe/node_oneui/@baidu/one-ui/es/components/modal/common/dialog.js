function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { Component } from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import contains from 'rc-util/lib/Dom/contains';
import PropTypes from 'prop-types';
import LazyRenderBox from './lazyRenderBox';
var uuid = 0;

var Dialog =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Dialog, _Component);

  function Dialog() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "titleId", null);

    _defineProperty(_assertThisInitialized(_this), "wrap", null);

    _defineProperty(_assertThisInitialized(_this), "timeoutId", null);

    _defineProperty(_assertThisInitialized(_this), "dialogMouseDown", null);

    _defineProperty(_assertThisInitialized(_this), "openTime", null);

    _defineProperty(_assertThisInitialized(_this), "lastOutSideFocusNode", null);

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var props = _this.props;

      if (props.visible) {
        if (!prevProps.visible) {
          _this.openTime = Date.now();

          _this.tryFocus(); // 从关闭到打开


          document.body.style.overflow = 'hidden';
        }
      } else if (prevProps.visible) {
        _this.inTransition = true;
        document.body.style.overflow = '';

        if (props.mask && _this.lastOutSideFocusNode) {
          try {
            _this.lastOutSideFocusNode.focus();
          } catch (e) {
            _this.lastOutSideFocusNode = null;
          }

          _this.lastOutSideFocusNode = null;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDialogMouseDown", function () {
      _this.dialogMouseDown = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onMaskMouseUp", function () {
      if (_this.dialogMouseDown) {
        _this.timeoutId = setTimeout(function () {
          _this.dialogMouseDown = false;
        }, 0);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMaskClick", function (e) {
      if (Date.now() - _this.openTime < 300) {
        return;
      }

      if (e.target === e.currentTarget && !_this.dialogMouseDown) {
        _this.close(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var props = _this.props;

      if (props.keyboard && e.keyCode === KeyCode.ESC) {
        e.stopPropagation();

        _this.close(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getZIndexStyle", function () {
      var style = {};
      var props = _this.props;

      if (props.zIndex !== undefined) {
        style.zIndex = props.zIndex;
      }

      return style;
    });

    _defineProperty(_assertThisInitialized(_this), "getWrapStyle", function () {
      return _extends({}, _this.getZIndexStyle(), _this.props.wrapStyle);
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (name) {
      return function (node) {
        _this[name] = node;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getMaskStyle", function () {
      return _extends({}, _this.getZIndexStyle(), _this.props.maskStyle);
    });

    _defineProperty(_assertThisInitialized(_this), "getMaskElement", function () {
      var props = _this.props;
      var maskElement = null;

      if (props.mask) {
        maskElement = React.createElement(LazyRenderBox, _extends({
          style: _this.getMaskStyle(),
          key: "mask",
          className: props.prefixCls + "-mask",
          hiddenClassName: props.prefixCls + "-mask-hidden",
          visible: props.visible
        }, props.maskProps));
      }

      return maskElement;
    });

    _defineProperty(_assertThisInitialized(_this), "getDialogElement", function () {
      var _this$props = _this.props,
          closable = _this$props.closable,
          prefixCls = _this$props.prefixCls,
          width = _this$props.width,
          height = _this$props.height,
          title = _this$props.title,
          closeIcon = _this$props.closeIcon,
          className = _this$props.className,
          visible = _this$props.visible,
          children = _this$props.children,
          bodyStyle = _this$props.bodyStyle,
          bodyProps = _this$props.bodyProps,
          destroyOnClose = _this$props.destroyOnClose;
      var dest = {};

      if (width !== undefined) {
        dest.width = width;
      }

      if (height !== undefined) {
        dest.height = height;
      }

      var footer;

      if (_this.props.footer) {
        footer = React.createElement("div", {
          className: prefixCls + "-footer",
          ref: _this.saveRef('footer')
        }, _this.props.footer);
      }

      var header;

      if (title) {
        header = React.createElement("div", {
          className: prefixCls + "-header",
          ref: _this.saveRef('header')
        }, React.createElement("div", {
          className: prefixCls + "-title",
          id: _this.titleId
        }, title));
      }

      var closer;

      if (closable) {
        closer = React.createElement("button", {
          type: "button",
          onClick: _this.close,
          "aria-label": "Close",
          className: prefixCls + "-close"
        }, closeIcon || React.createElement("span", {
          className: prefixCls + "-close-x"
        }));
      }

      var style = _extends({}, _this.props.style, dest);

      var sentinelStyle = {
        width: 0,
        height: 0,
        overflow: 'hidden'
      };
      var dialogElement = React.createElement(LazyRenderBox, {
        key: "dialog-element",
        role: "document",
        ref: _this.saveRef('dialog'),
        style: style,
        className: prefixCls + " " + (className || ''),
        visible: visible,
        onMouseDown: _this.onDialogMouseDown
      }, React.createElement("div", {
        tabIndex: 0,
        ref: _this.saveRef('sentinelStart'),
        style: sentinelStyle,
        "aria-hidden": "true"
      }), React.createElement("div", {
        className: prefixCls + "-content"
      }, closer, header, React.createElement("div", _extends({
        className: prefixCls + "-body",
        style: bodyStyle,
        ref: _this.saveRef('body')
      }, bodyProps), children), footer), React.createElement("div", {
        tabIndex: 0,
        ref: _this.saveRef('sentinelEnd'),
        style: sentinelStyle,
        "aria-hidden": "true"
      }));
      return visible || !destroyOnClose ? dialogElement : null;
    });

    _defineProperty(_assertThisInitialized(_this), "close", function (e) {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          afterClose = _this$props2.afterClose;

      if (onClose) {
        onClose(e);
      }

      if (_this.wrap) {
        _this.wrap.style.display = 'none';
      }

      if (afterClose) {
        setTimeout(function () {
          afterClose();
        }, 300);
      }
    });

    return _this;
  }

  var _proto = Dialog.prototype;

  _proto.componentWillMount = function componentWillMount() {
    this.titleId = "dialogTitle" + uuid++;
  };

  _proto.componentDidMount = function componentDidMount() {
    this.componentDidUpdate({});

    if (this.props.forceRender && this.wrap) {
      this.wrap.style.display = 'none';
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeoutId);
    document.body.style.overflow = '';
  };

  _proto.tryFocus = function tryFocus() {
    if (!contains(this.wrap, document.activeElement)) {
      this.lastOutSideFocusNode = document.activeElement;
      this.sentinelStart.focus();
    }
  };

  _proto.render = function render() {
    var props = this.props;
    var prefixCls = props.prefixCls,
        maskClosable = props.maskClosable;
    var style = this.getWrapStyle();

    if (props.visible) {
      style.display = 'block';
    } else {
      style.display = 'none';
    }

    return React.createElement("div", null, this.getMaskElement(), React.createElement("div", _extends({
      tabIndex: -1,
      onKeyDown: this.onKeyDown,
      className: prefixCls + "-wrap " + (props.wrapClassName || ''),
      ref: this.saveRef('wrap'),
      onClick: maskClosable ? this.onMaskClick : null,
      onMouseUp: maskClosable ? this.onMaskMouseUp : null,
      role: "dialog",
      "aria-labelledby": props.title ? this.titleId : null,
      style: style
    }, props.wrapProps), this.getDialogElement()));
  };

  return Dialog;
}(Component);

_defineProperty(Dialog, "propTypes", {
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
});

_defineProperty(Dialog, "defaultProps", {
  className: '',
  mask: true,
  visible: false,
  keyboard: true,
  closable: true,
  maskClosable: true,
  destroyOnClose: false
});

export { Dialog as default };