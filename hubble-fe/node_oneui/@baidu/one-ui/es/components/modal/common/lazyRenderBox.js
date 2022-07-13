function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var LazyRenderBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LazyRenderBox, _Component);

  function LazyRenderBox() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LazyRenderBox.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  };

  _proto.render = function render() {
    var className = this.props.className;

    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += " " + this.props.hiddenClassName;
    }

    var props = _extends({}, this.props);

    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return React.createElement("div", props);
  };

  return LazyRenderBox;
}(Component);

_defineProperty(LazyRenderBox, "propTypes", {
  className: PropTypes.string,
  visible: PropTypes.bool,
  hiddenClassName: PropTypes.string,
  role: PropTypes.string,
  style: PropTypes.object,
  onMouseDown: PropTypes.func
});

export { LazyRenderBox as default };