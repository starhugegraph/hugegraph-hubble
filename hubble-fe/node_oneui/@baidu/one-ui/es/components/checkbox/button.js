function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import Checkbox from './checkbox';

var CheckboxButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckboxButton, _Component);

  function CheckboxButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CheckboxButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  _proto.render = function render() {
    return React.createElement(Checkbox, _extends({}, this.props, {
      mode: "strong"
    }));
  };

  return CheckboxButton;
}(Component);

_defineProperty(CheckboxButton, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
  children: PropTypes.node
});

_defineProperty(CheckboxButton, "contextTypes", {
  checkboxGroup: PropTypes.any
});

_defineProperty(CheckboxButton, "defaultProps", {
  prefixCls: 'new-fc-one-checkbox-button'
});

export { CheckboxButton as default };