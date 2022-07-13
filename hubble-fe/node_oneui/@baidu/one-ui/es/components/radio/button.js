function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'shallowequal';
import Radio from './radio';

var RadioButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(RadioButton, _Component);

  function RadioButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = RadioButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  };

  _proto.render = function render() {
    return React.createElement(Radio, this.props);
  };

  return RadioButton;
}(Component);

_defineProperty(RadioButton, "propTypes", {
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

_defineProperty(RadioButton, "contextTypes", {
  radioGroup: PropTypes.any
});

_defineProperty(RadioButton, "defaultProps", {
  prefixCls: 'new-fc-one-radio-button'
});

export { RadioButton as default };