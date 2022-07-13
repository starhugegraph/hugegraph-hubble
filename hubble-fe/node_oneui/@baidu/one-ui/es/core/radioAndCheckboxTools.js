/**
 * @file 单选和复选公共方法
 * @author shanqianmin
 * @date 2019/06/14
 */
import React from 'react';
export var getCheckedValue = function getCheckedValue(children) {
  var result = [];
  React.Children.forEach(children, function (radio) {
    if (radio === void 0) {
      radio = {};
    }

    var _ref = radio.props || {},
        checked = _ref.checked,
        value = _ref.value;

    if (checked) {
      result.push(value);
    }
  });
  return result;
};
export var getRealValue = function getRealValue(props, showFirst) {
  var value = props.value,
      children = props.children,
      defaultValue = props.defaultValue;
  var stateValue = null;

  if (value != null) {
    stateValue = value;
  } else if (defaultValue != null) {
    stateValue = defaultValue;
  } else {
    var childrenValue = getCheckedValue(children);

    if (showFirst) {
      stateValue = childrenValue[0];
    } else {
      stateValue = childrenValue;
    }
  }

  return stateValue;
};