function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { transSizeOfDefault } from '../../core/commonTools';
import CommoneCheckbox from './common/checkbox';

var Checkbox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Checkbox, _Component);

  function Checkbox() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Checkbox.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var props = this.props,
        context = this.context;

    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        indeterminate = props.indeterminate,
        style = props.style,
        onMouseEnter = props.onMouseEnter,
        onMouseLeave = props.onMouseLeave,
        direction = props.direction,
        size = props.size,
        mode = props.mode,
        restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "className", "children", "indeterminate", "style", "onMouseEnter", "onMouseLeave", "direction", "size", "mode"]);

    var checkboxGroup = context.checkboxGroup;

    var checkboxProps = _extends({}, restProps);

    var realSize = size;

    if (checkboxGroup) {
      var value = props.value,
          _disabled = props.disabled,
          _checked = props.checked;
      var toggleOption = checkboxGroup.toggleOption,
          checkboxValue = checkboxGroup.value,
          checkboxDisabled = checkboxGroup.disabled,
          groupSize = checkboxGroup.size;
      realSize = realSize || groupSize;

      checkboxProps.onChange = function () {
        return toggleOption({
          label: children,
          value: value
        });
      };

      checkboxProps.checked = checkboxValue != null ? checkboxValue.indexOf(value) !== -1 : _checked;
      checkboxProps.disabled = _disabled || checkboxDisabled;
    }

    realSize = transSizeOfDefault(realSize, 'medium');
    var wrapperClass = prefixCls + "-wrapper";
    var checked = checkboxProps.checked,
        disabled = checkboxProps.disabled;
    var classString = classNames((_classNames = {}, _classNames["" + wrapperClass] = true, _classNames[wrapperClass + "-checked"] = checked, _classNames[wrapperClass + "-disabled"] = disabled, _classNames[wrapperClass + "-checked-disabled"] = checked && disabled, _classNames[wrapperClass + "-" + direction] = direction, _classNames[wrapperClass + "-" + realSize] = realSize, _classNames), className);
    var checkboxClass = classNames((_classNames2 = {}, _classNames2[prefixCls + "-indeterminate"] = indeterminate, _classNames2));
    var itemProps = {
      className: classNames(prefixCls + "-item")
    };
    var otherProps = {};

    if (mode === 'strong') {
      otherProps.tabIndex = disabled ? -1 : 0;
    }

    return React.createElement("label", _extends({
      className: classString,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, otherProps), React.createElement(CommoneCheckbox, _extends({}, checkboxProps, {
      prefixCls: prefixCls,
      className: checkboxClass
    })), children != null ? React.createElement("span", itemProps, children) : null, mode === 'strong' && React.createElement("i", {
      className: wrapperClass + "-strong-icon"
    }));
  };

  return Checkbox;
}(Component);

_defineProperty(Checkbox, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,
  size: PropTypes.oneOf(['medium', 'small']),
  // size不能有默认值，否则就没办法确认这个size是来自checkbox还是来自group

  /** 自定义类名 */
  className: PropTypes.string,

  /** 自定义选中或者不选中 */
  checked: PropTypes.bool,

  /** 自定义style */
  style: PropTypes.object,

  /** 失效状态 */
  disabled: PropTypes.bool,

  /** 变化时候的回调 */
  onChange: PropTypes.func,

  /** 鼠标移入触发 */
  onMouseEnter: PropTypes.func,

  /** 鼠标移出触发 */
  onMouseLeave: PropTypes.func,

  /** optionGroup下指定选中的选项 */
  value: PropTypes.any,

  /** children Node */
  children: PropTypes.node,

  /** 设置 indeterminate 状态，只负责样式控制 */
  indeterminate: PropTypes.bool,
  direction: PropTypes.string,
  // 水平方向row还是垂直方向column

  /** checkbox 的mode, 内部使用，basic为普通多选，strong为加强多选 */
  mode: PropTypes.oneOf(['basic', 'strong'])
});

_defineProperty(Checkbox, "contextTypes", {
  checkboxGroup: PropTypes.any
});

_defineProperty(Checkbox, "defaultProps", {
  prefixCls: 'new-fc-one-checkbox',
  indeterminate: false,
  direction: 'row',
  mode: 'basic'
});

export { Checkbox as default };