function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip';

var Popover =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Popover, _Component);

  function Popover() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "saveTooltip", function (node) {
      _this.tooltip = node;
    });

    return _this;
  }

  var _proto = Popover.prototype;

  _proto.getPopupDomNode = function getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  };

  _proto.getOverlay = function getOverlay() {
    var _this$props = this.props,
        title = _this$props.title,
        prefixCls = _this$props.prefixCls,
        content = _this$props.content;
    return React.createElement("div", null, title && React.createElement("div", {
      className: prefixCls + "-title"
    }, title), content && React.createElement("div", {
      className: prefixCls + "-inner-content"
    }, content));
  };

  _proto.render = function render() {
    var props = _extends({}, this.props);

    delete props.title;
    return React.createElement(Tooltip, _extends({}, props, {
      ref: this.saveTooltip,
      overlay: this.getOverlay()
    }));
  };

  return Popover;
}(Component);

_defineProperty(Popover, "propTypes", {
  /** popOver的标题 */
  title: PropTypes.node,

  /** popOver的内容 */
  content: PropTypes.node,

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 弹出位置 */
  placement: PropTypes.string,
  transitionName: PropTypes.string,

  /** 触发模式 */
  trigger: PropTypes.string,

  /** 鼠标滑入延时 */
  mouseEnterDelay: PropTypes.number,

  /** 鼠标滑出延时 */
  mouseLeaveDelay: PropTypes.number,

  /** 自定义内嵌样式 */
  overlayStyle: PropTypes.object,

  /** visible 是否可见 */
  visible: PropTypes.bool
});

_defineProperty(Popover, "defaultProps", {
  prefixCls: 'new-fc-one-popover',
  placement: 'bottom',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {}
});

export { Popover as default };