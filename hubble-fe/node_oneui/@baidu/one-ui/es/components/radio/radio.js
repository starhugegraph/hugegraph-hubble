function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 单选
 * @author shanqianmin
 * @date 2018/08/23
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { transSizeOfDefault } from '../../core/commonTools';
import CommonCheckbox from '../checkbox/common/checkbox';

var Radio =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Radio, _Component);

  function Radio() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.radioGroup, nextContext.radioGroup);
  };

  _proto.render = function render() {
    var _classNames;

    var props = this.props,
        context = this.context;

    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        style = props.style,
        direction = props.direction,
        size = props.size,
        restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "className", "children", "style", "direction", "size"]);

    var radioGroup = context.radioGroup;

    var radioProps = _extends({}, restProps);

    if (radioGroup) {
      var value = radioGroup.value,
          _disabled = radioGroup.disabled;
      radioProps.name = radioGroup.name;
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = value != null ? props.value === value : props.checked;
      radioProps.disabled = props.disabled || _disabled;
    }

    var checked = radioProps.checked,
        disabled = radioProps.disabled;
    var newSize = size || 'medium';
    newSize = transSizeOfDefault(newSize, 'medium');
    var wrapperClassString = classNames(className, prefixCls + "-wrapper-" + newSize, (_classNames = {}, _classNames[prefixCls + "-wrapper"] = true, _classNames[prefixCls + "-wrapper-checked"] = checked, _classNames[prefixCls + "-wrapper-disabled"] = disabled, _classNames[prefixCls + "-wrapper-checked-disabled"] = checked && disabled, _classNames[prefixCls + "-wrapper-" + direction] = direction, _classNames));
    return React.createElement("label", {
      className: wrapperClassString,
      style: style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave
    }, React.createElement(CommonCheckbox, _extends({}, radioProps, {
      prefixCls: prefixCls
    })), children != null ? React.createElement("span", null, children) : null);
  };

  return Radio;
}(Component);

_defineProperty(Radio, "propTypes", {
  type: PropTypes.string,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  value: PropTypes.any,
  name: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.string,
  // 水平方向row还是垂直方向column,
  size: PropTypes.oneOf(['small', 'medium'])
});

_defineProperty(Radio, "contextTypes", {
  radioGroup: PropTypes.any
});

_defineProperty(Radio, "defaultProps", {
  prefixCls: 'new-fc-one-radio',
  type: 'radio',
  direction: 'row'
});

export { Radio as default };