function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { fomatStr, addZero } from '../../../core/pickTimeTools';
import Input from '../../input';
import Icon from '../../icon';

var TimeInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TimeInput, _PureComponent);

  function TimeInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onEsc", function () {
      _this.props.onEsc();

      _this.refInput.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (event) {
      var str = event.value;
      var preFn = event.preFn;
      str = fomatStr(str);

      _this.setState({
        str: str
      });

      var _this$props = _this.props,
          format = _this$props.format,
          hourOptions = _this$props.hourOptions,
          minuteOptions = _this$props.minuteOptions,
          secondOptions = _this$props.secondOptions,
          disabledHours = _this$props.disabledHours,
          disabledMinutes = _this$props.disabledMinutes,
          disabledSeconds = _this$props.disabledSeconds,
          onChange = _this$props.onChange,
          allowEmpty = _this$props.allowEmpty;

      if (str) {
        var originalValue = _this.props.value;

        var value = _this.getProtoValue().clone();

        var parsed = moment(str, format, true);
        var newState = {
          invalid: true
        };
        var originalStr = originalValue && originalValue.format(_this.props.format) || '';

        if (!parsed.isValid()) {
          if (preFn === 'onBlur') {
            newState = {
              str: originalStr,
              invalid: false
            };
          }

          _this.setState(newState);

          return;
        }

        value.hour(parsed.hour()).minute(parsed.minute()).second(parsed.second()); // if time value not allowed, response warning.

        if (hourOptions.indexOf(value.hour()) < 0 || minuteOptions.indexOf(value.minute()) < 0 || secondOptions.indexOf(value.second()) < 0) {
          if (preFn === 'onBlur') {
            newState = {
              str: originalStr,
              invalid: false
            };
          }

          _this.setState(newState);

          return;
        } // if time value is disabled, response warning.


        var disabledHourOptions = disabledHours();
        var disabledMinuteOptions = disabledMinutes(value.hour());
        var disabledSecondOptions = disabledSeconds(value.hour(), value.minute());

        if (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0) {
          if (preFn === 'onBlur') {
            newState = {
              str: originalStr,
              invalid: false
            };
          }

          _this.setState(newState);

          return;
        }

        if (originalValue) {
          var changedValue = originalValue.clone();
          changedValue.hour(value.hour());
          changedValue.minute(value.minute());
          changedValue.second(value.second());
          onChange(changedValue);
        } else if (originalValue !== value) {
          onChange(value);
        }
      } else if (allowEmpty) {
        onChange(null);
      } else {
        _this.setState({
          invalid: true
        });

        return;
      }

      _this.setState({
        invalid: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 27) {
        _this.onEsc();
      } else if (e.keyCode === 13) {
        _this.onBlur();
      }

      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.setState({
        isFocus: true
      });

      _this.props.onFocus();
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      setTimeout(function () {
        if (_this.___stopBlur___) {
          _this.___stopBlur___ = false;
          return;
        }

        var _this$state = _this.state,
            str = _this$state.str,
            invalid = _this$state.invalid;

        if (str && invalid) {
          // 为了小于10的数补上0
          _this.onInputChange({
            value: addZero(str),
            preFn: 'onBlur'
          });
        }

        _this.setState({
          isFocus: false
        });
      }, 200);

      _this.props.onBlur();
    });

    _defineProperty(_assertThisInitialized(_this), "onClear", function (e) {
      _this.___stopBlur___ = true;

      _this.props.onClear(e);
    });

    _defineProperty(_assertThisInitialized(_this), "getProtoValue", function () {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          defaultOpenValue = _this$props2.defaultOpenValue;
      return value || defaultOpenValue;
    });

    _defineProperty(_assertThisInitialized(_this), "renderClearButton", function () {
      var _this$state2 = _this.state,
          str = _this$state2.str,
          isFocus = _this$state2.isFocus;
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          allowEmpty = _this$props3.allowEmpty;

      if (!allowEmpty) {
        return null;
      }

      return isFocus && str ? React.createElement(Icon, {
        onClick: _this.onClear,
        className: prefixCls + "-icon-close",
        type: "fail"
      }) : React.createElement(Icon, {
        className: prefixCls + "-icon-clock",
        type: "time"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var _this$props4 = _this.props,
          prefixCls = _this$props4.prefixCls,
          placeholder = _this$props4.placeholder,
          inputReadOnly = _this$props4.inputReadOnly,
          disabled = _this$props4.disabled,
          style = _this$props4.style,
          size = _this$props4.size,
          width = _this$props4.width;
      var _this$state3 = _this.state,
          invalid = _this$state3.invalid,
          str = _this$state3.str;
      var invalidClass = invalid ? prefixCls + "-input-invalid" : '';
      return React.createElement(Input, {
        style: style,
        className: prefixCls + "-input  " + invalidClass,
        ref: function ref(_ref) {
          _this.refInput = _ref;
        },
        onKeyDown: _this.onKeyDown,
        value: str,
        placeholder: placeholder,
        onChange: _this.onInputChange,
        readOnly: !!inputReadOnly,
        isRequired: false,
        onFocus: _this.onFocus,
        onBlur: _this.onBlur,
        disabled: disabled,
        name: name,
        size: size,
        width: width
      });
    });

    var _value = props.value,
        _format = props.format;
    _this.state = {
      str: _value && _value.format(_format) || '',
      invalid: false,
      isFocus: false
    };
    return _this;
  }

  var _proto = TimeInput.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        format = nextProps.format;
    var originValue = this.props.value;
    var currentStr = originValue && originValue.format(format) || '';
    var nextStr = value && value.format(format) || '';

    if (nextStr !== currentStr) {
      this.setState({
        str: nextStr,
        invalid: false
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props5 = this.props,
        prefixCls = _this$props5.prefixCls,
        errorMessage = _this$props5.errorMessage;
    var wrapClass = classNames(prefixCls + "-input-wrap", (_classNames = {}, _classNames[prefixCls + "-input-wrap-error"] = errorMessage, _classNames));
    return React.createElement("div", {
      className: wrapClass
    }, this.renderInput(), this.renderClearButton());
  };

  return TimeInput;
}(PureComponent);

_defineProperty(TimeInput, "propTypes", {
  format: PropTypes.string,
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  defaultOpenValue: PropTypes.object,
  inputReadOnly: PropTypes.bool,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  allowEmpty: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  onEsc: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  size: PropTypes.string,
  width: PropTypes.number
});

_defineProperty(TimeInput, "defaultProps", {
  inputReadOnly: false,
  style: {}
});

export { TimeInput as default };