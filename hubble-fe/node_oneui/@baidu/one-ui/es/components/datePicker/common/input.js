function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';
import dayjs from 'dayjs';
import partial from 'lodash/partial';
import { formatMultipleDate, getTimeStamp, getTimeTramp, monthDayRange } from '../../../core/datePickerTools';

var Input =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Input, _PureComponent);

  function Input(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangeInput", function (type, e) {
      var value = e.target.value;
      var _this$props = _this.props,
          dateFormat = _this$props.dateFormat,
          onChange = _this$props.onChange,
          multiple = _this$props.multiple,
          validateMaxDate = _this$props.validateMaxDate,
          validateMinDate = _this$props.validateMinDate,
          inputType = _this$props.inputType,
          validateDisabled = _this$props.validateDisabled;
      var _this$state = _this.state,
          endDate = _this$state.endDate,
          beginDate = _this$state.beginDate;
      var reg = /^[\d/.///-]*$/;

      if (!reg.test(value)) {
        return;
      }

      var newState = {};

      if (type === 'beginDate') {
        newState = {
          beginDate: value
        };
      } else if (type === 'endDate') {
        newState = {
          endDate: value
        };
      }

      _this.setState(newState);

      if (validateDisabled && typeof validateDisabled === 'function') {
        if (validateDisabled({
          dayItem: value,
          timeStamp: getTimeTramp(value),
          getTimeStamp: getTimeTramp
        })) {
          return;
        }
      }

      if (newState.endDate) {
        var endDateTimeTramp = getTimeTramp(newState.endDate);

        if (endDateTimeTramp < getTimeTramp(validateMinDate) || endDateTimeTramp > getTimeTramp(validateMaxDate)) {
          return;
        }
      }

      if (newState.beginDate) {
        var beginDateTimeTramp = getTimeTramp(newState.beginDate);

        if (beginDateTimeTramp < getTimeTramp(validateMinDate) || beginDateTimeTramp > getTimeTramp(validateMaxDate)) {
          return;
        }
      }

      value = value.replace(/\./g, '/');
      var timeArray = value.split('/');

      if (timeArray.length === 1) {
        timeArray = value.split('-');
      }

      if (getTimeStamp(value) && inputType !== 'month' && timeArray.length === 3 && ("" + timeArray[1]).length === 2 && ("" + timeArray[2]).length === 2 && monthDayRange(timeArray[0])[timeArray[1] - 1] && +timeArray[2] <= monthDayRange(timeArray[0])[timeArray[1] - 1]) {
        // 合法时间戳的话，并且日期为标准的XXXX/XX/XX格式，则实时修改
        var formatDate = dayjs(new Date(value)).format(dateFormat);

        if (!multiple && getTimeTramp(value) <= getTimeTramp(validateMaxDate) && getTimeTramp(value) >= getTimeTramp(validateMinDate)) {
          onChange(formatDate, false);
        } else if (type === 'beginDate' && getTimeTramp(value) < getTimeTramp(endDate) && getTimeTramp(value) >= getTimeTramp(validateMinDate)) {
          var endDateFormat = endDate ? dayjs(new Date(endDate)).format(dateFormat) : '';
          onChange([formatDate, endDateFormat], false);
        } else if (type === 'endDate' && getTimeTramp(value) > getTimeTramp(beginDate) && getTimeTramp(value) <= getTimeTramp(validateMaxDate)) {
          var beginDateFormat = beginDate ? dayjs(new Date(beginDate)).format(dateFormat) : '';
          onChange([beginDateFormat, formatDate], false);
        }
      }

      if (inputType === 'month' && timeArray.length === 2 && ("" + timeArray[1]).length === 2 && +timeArray[1] < 13 && getTimeTramp(value) <= getTimeTramp(validateMaxDate) && getTimeTramp(value) >= getTimeTramp(validateMinDate)) {
        var _formatDate = dayjs(new Date(value)).format(dateFormat);

        onChange(_formatDate, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var inputProps = {
        value: _this.state.beginDate,
        onChange: partial(_this.onChangeInput, 'beginDate'),
        placeholder: '请输入日期'
      };
      return React.createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, React.createElement("input", inputProps));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMultipleInput", function () {
      var prefixCls = _this.props.prefixCls;
      var _this$state2 = _this.state,
          beginDate = _this$state2.beginDate,
          endDate = _this$state2.endDate;
      var beginInputProps = {
        value: beginDate || '',
        onChange: partial(_this.onChangeInput, 'beginDate'),
        placeholder: '请输入日期'
      };
      var endInputProps = {
        value: endDate || '',
        onChange: partial(_this.onChangeInput, 'endDate'),
        placeholder: '请输入日期'
      };
      var containerClassNames = prefixCls + "-input-multiple";
      return React.createElement("div", {
        className: containerClassNames
      }, React.createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, React.createElement("input", beginInputProps)), React.createElement("span", null, " ~ "), React.createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, React.createElement("input", endInputProps)));
    });

    var _value = props.value,
        _dateFormat = props.dateFormat;

    var _formatMultipleDate = formatMultipleDate(_value, _dateFormat),
        _beginDate = _formatMultipleDate.beginDate,
        _endDate = _formatMultipleDate.endDate;

    _this.state = {
      beginDate: _beginDate,
      endDate: _endDate,
      prevProps: _this.props
    };
    return _this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        multiple = _this$props2.multiple;
    var inputClassNames = prefixCls + "-input";
    return React.createElement("div", {
      className: inputClassNames
    }, multiple ? this.renderMultipleInput() : this.renderInput());
  };

  return Input;
}(PureComponent);

_defineProperty(Input, "propTypes", {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  prefixCls: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  validateMinDate: PropTypes.string,
  validateMaxDate: PropTypes.string,
  inputType: PropTypes.string,
  validateDisabled: PropTypes.func
});

_defineProperty(Input, "defaultProps", {
  onChange: function onChange() {},
  multiple: false
});

_defineProperty(Input, "getDerivedStateFromProps", function (nextProps, prevState) {
  var prevProps = prevState.prevProps;

  if ('value' in nextProps && nextProps.value !== prevProps.value || nextProps.visible !== prevProps.visible) {
    var value = nextProps.value,
        dateFormat = nextProps.dateFormat;

    var _formatMultipleDate2 = formatMultipleDate(value, dateFormat),
        beginDate = _formatMultipleDate2.beginDate,
        endDate = _formatMultipleDate2.endDate;

    return {
      beginDate: beginDate,
      endDate: endDate,
      prevProps: nextProps
    };
  }

  return null;
});

polyfill(Input);
export default connect(function (state) {
  return {
    value: state._value,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate
  };
})(Input);