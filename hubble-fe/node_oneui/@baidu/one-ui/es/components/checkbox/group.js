function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from './checkbox';
import { getRealValue } from '../../core/radioAndCheckboxTools';
import { transSizeOfDefault } from '../../core/commonTools';
var CheckboxValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
var CheckboxOptionType = PropTypes.shape({
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: CheckboxValueType,
  disabled: PropTypes.bool
});

var CheckboxGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleOption", function (option) {
      var stateValue = _this.state.value || [];
      var optionValue = option.value;
      var optionIndex = stateValue.indexOf(optionValue);
      var value = [].concat(stateValue);

      if (optionIndex === -1) {
        value.push(optionValue);
      } else {
        value.splice(optionIndex, 1);
      }

      var _this$props = _this.props,
          propsValue = _this$props.value,
          onChange = _this$props.onChange;

      if (propsValue == null) {
        _this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    });

    _this.state = {
      value: getRealValue(props)
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size
      }
    };
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;

    if (value != null) {
      this.setState({
        value: value
      });
    }
  };

  _proto.getOptions = function getOptions() {
    return this.props.options.map(function (option) {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        };
      }

      return option;
    });
  };

  _proto.render = function render() {
    var _this2 = this,
        _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        options = _this$props2.options,
        disabled = _this$props2.disabled,
        direction = _this$props2.direction,
        size = _this$props2.size,
        checkboxPrefixCls = _this$props2.checkboxPrefixCls;
    var children = this.props.children;

    if (options && options.length > 0) {
      children = this.getOptions().map(function (option) {
        var value = option.value,
            label = option.label,
            optionDisable = option.disabled;
        var stateValue = _this2.state.value || [];
        return React.createElement(Checkbox, {
          key: value,
          disabled: optionDisable != null ? optionDisable : disabled,
          value: value,
          checked: stateValue.indexOf(value) !== -1,
          onChange: function onChange() {
            return _this2.toggleOption(option);
          },
          className: prefixCls + "-item",
          prefixCls: checkboxPrefixCls
        }, label);
      });
    }

    var newSize = transSizeOfDefault(size, 'medium');
    var classString = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + newSize] = newSize, _classNames[prefixCls + "-" + direction] = direction, _classNames));
    return React.createElement("div", {
      className: classString
    }, children);
  };

  return CheckboxGroup;
}(PureComponent);

_defineProperty(CheckboxGroup, "propTypes", {
  value: PropTypes.arrayOf(CheckboxValueType),
  onChange: PropTypes.func,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([CheckboxOptionType, PropTypes.string])),
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,
  children: PropTypes.node,
  direction: PropTypes.string,
  // 水平方向row还是垂直方向column
  checkboxPrefixCls: PropTypes.string
});

_defineProperty(CheckboxGroup, "childContextTypes", {
  checkboxGroup: PropTypes.any
});

_defineProperty(CheckboxGroup, "defaultProps", {
  options: [],
  prefixCls: 'new-fc-one-checkbox-group',
  direction: 'row',
  size: 'medium',
  checkboxPrefixCls: 'new-fc-one-checkbox'
});

export { CheckboxGroup as default };