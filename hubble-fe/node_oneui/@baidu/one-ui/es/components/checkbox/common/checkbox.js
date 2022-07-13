function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

var Checkbox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Checkbox, _PureComponent);

  function Checkbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "saveInput", function (node) {
      _this.input = node;
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleChange", function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;

      if (disabled) {
        return;
      }

      var checked = e.target.checked;

      if (!('checked' in _this.props)) {
        _this.setState({
          checked: checked
        });
      }

      if (onChange) {
        onChange({
          target: _extends({}, _this.props, {
            checked: checked
          }),
          stopPropagation: function stopPropagation() {
            e.stopPropagation();
          },
          preventDefault: function preventDefault() {
            e.preventDefault();
          },
          nativeEvent: e.nativeEvent
        });
      }
    });

    var _checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  var _proto = Checkbox.prototype;

  _proto.focus = function focus() {
    this.input.focus();
  };

  _proto.blur = function blur() {
    this.input.blur();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        style = _this$props2.style,
        type = _this$props2.type,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        onFocus = _this$props2.onFocus,
        onBlur = _this$props2.onBlur,
        inputOriginProps = _this$props2.inputOriginProps;
    var checked = this.state.checked;
    var classString = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    return React.createElement("span", {
      className: classString,
      style: style
    }, React.createElement("input", _extends({
      name: name,
      type: type,
      disabled: disabled,
      className: prefixCls + "-input",
      checked: !!checked,
      onClick: onClick,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: this.onHandleChange,
      ref: this.saveInput
    }, inputOriginProps)), React.createElement("span", {
      className: prefixCls + "-inner"
    }));
  };

  return Checkbox;
}(PureComponent);

_defineProperty(Checkbox, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  defaultChecked: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  inputOriginProps: PropTypes.object
});

_defineProperty(Checkbox, "defaultProps", {
  className: '',
  style: {},
  type: 'checkbox',
  defaultChecked: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
});

_defineProperty(Checkbox, "getDerivedStateFromProps", function (nextProps) {
  if ('checked' in nextProps) {
    return {
      checked: nextProps.checked
    };
  }

  return null;
});

polyfill(Checkbox);
export default Checkbox;