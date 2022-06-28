function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 单选组
 * @author shanqianmin
 * @date 2018/08/23
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Radio from './radio';
import { transSizeOfDefault } from '../../core/commonTools';
import { getCheckedValue, getRealValue } from '../../core/radioAndCheckboxTools';
var CheckboxValueType = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
var CheckboxOptionType = PropTypes.shape({
  label: PropTypes.string,
  value: CheckboxValueType,
  disabled: PropTypes.bool
});

var RadioGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RadioGroup, _PureComponent);

  function RadioGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onRadioChange", function (ev) {
      var lastValue = _this.state.value;
      var newValue = ev.target.value;

      if (newValue !== lastValue) {
        var _this$props = _this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;

        if (value == null) {
          _this.setState({
            value: newValue
          });
        }

        if (onChange) {
          onChange(ev);
        }
      }
    });

    _this.state = {
      value: getRealValue(props, true)
    };
    return _this;
  }

  var _proto = RadioGroup.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        name = _this$props2.name;
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: disabled,
        name: name
      }
    };
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        children = nextProps.children;
    var newValue = value == null ? getCheckedValue(children)[0] : value;

    if (newValue != null && this.state.value !== newValue) {
      this.setState({
        value: value
      });
    }
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        className = _this$props3.className,
        options = _this$props3.options,
        disabled = _this$props3.disabled,
        style = _this$props3.style,
        onMouseEnter = _this$props3.onMouseEnter,
        onMouseLeave = _this$props3.onMouseLeave,
        direction = _this$props3.direction,
        radioPrefixCls = _this$props3.radioPrefixCls;
    var children = this.props.children;
    var value = this.state.value;
    var size = transSizeOfDefault(this.props.size, 'small');
    var classString = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-" + direction] = direction, _classNames), className); // 如果存在 options, 优先使用

    if (options && options.length > 0) {
      children = options.map(function (option, index) {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          option = {
            label: option,
            value: option
          };
        }

        var _option = option,
            optionValue = _option.value,
            optionDisabled = _option.disabled,
            label = _option.label; // 此处类型自动推导为 { label: string, value: string }

        return React.createElement(Radio, {
          key: index,
          disabled: optionDisabled || disabled,
          value: optionValue,
          onChange: _this2.onRadioChange,
          checked: value === optionValue,
          size: size,
          prefixCls: radioPrefixCls
        }, label);
      });
    }

    return React.createElement("div", {
      className: classString,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, children);
  };

  return RadioGroup;
}(PureComponent);

_defineProperty(RadioGroup, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([CheckboxOptionType, PropTypes.string])),
  disabled: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['medium', 'small']),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  name: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.string,
  // 水平方向row还是垂直方向column
  radioPrefixCls: PropTypes.string
});

_defineProperty(RadioGroup, "childContextTypes", {
  radioGroup: PropTypes.any
});

_defineProperty(RadioGroup, "defaultProps", {
  disabled: false,
  prefixCls: 'new-fc-one-radio-group',
  className: '',
  direction: 'row',
  size: 'medium',
  radioPrefixCls: 'new-fc-one-radio'
});

export { RadioGroup as default };