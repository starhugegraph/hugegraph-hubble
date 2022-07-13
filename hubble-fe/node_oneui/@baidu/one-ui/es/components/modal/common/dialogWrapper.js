function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import Portal from 'rc-util/lib/PortalWrapper';
import PropTypes from 'prop-types';
import Dialog from './dialog';

var DialogWrap =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DialogWrap, _Component);

  function DialogWrap() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DialogWrap.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var visible = _ref.visible,
        forceRender = _ref.forceRender;
    return !!(this.props.visible || visible) || this.props.forceRender || forceRender;
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        visible = _this$props.visible,
        getContainer = _this$props.getContainer,
        forceRender = _this$props.forceRender; // 渲染在当前 dom 里；

    if (getContainer === false) {
      return React.createElement(Dialog, _extends({}, this.props, {
        getOpenCount: function getOpenCount() {
          return 2;
        } // 不对 body 做任何操作。。

      }));
    }

    return React.createElement(Portal, {
      visible: visible,
      forceRender: forceRender,
      getContainer: getContainer
    }, function (childProps) {
      return React.createElement(Dialog, _extends({}, _this.props, childProps));
    });
  };

  return DialogWrap;
}(Component);

_defineProperty(DialogWrap, "defaultProps", {
  visible: false,
  forceRender: false
});

_defineProperty(DialogWrap, "propTypes", {
  visible: PropTypes.bool,
  forceRender: PropTypes.bool,
  getContainer: PropTypes.func
});

export default DialogWrap;