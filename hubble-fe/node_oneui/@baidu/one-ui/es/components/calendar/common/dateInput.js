function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tools from '../../../core';
var _tools$calendar = tools.calendar,
    getDetailDate = _tools$calendar.getDetailDate,
    monthDayRange = _tools$calendar.monthDayRange,
    getTimeStamp = _tools$calendar.getTimeStamp,
    validateDateBeyondToday = _tools$calendar.validateDateBeyondToday;
var strIsNumber = tools.common.strIsNumber;

var DateInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DateInput, _PureComponent);

  function DateInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 13) {
        _this.inputOnBlur();

        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getYearInputElement", function (ref) {
      _this.yearInputElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getMonthInputElement", function (ref) {
      _this.monthInputElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getDayInputElement", function (ref) {
      _this.dayInputElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "changeYear", function (e) {
      var value = e.target.value ? +e.target.value : '';

      var updater = function updater(state) {
        var year = strIsNumber(value) || value === '' ? value : state.year;

        if (("" + value).length > 4) {
          return null;
        }

        return {
          year: year
        };
      };

      _this.setState(updater);
    });

    _defineProperty(_assertThisInitialized(_this), "changeMonth", function (e) {
      var value = e.target.value ? +e.target.value : '';

      var updater = function updater(state) {
        var month = strIsNumber(value) || value === '' ? value : state.month;

        if (value && (+value > 12 || +value < 1)) {
          return null;
        }

        if (("" + month).length > 2) {
          return null;
        }

        return {
          month: month
        };
      };

      _this.setState(updater);
    });

    _defineProperty(_assertThisInitialized(_this), "changeDay", function (e) {
      var value = e.target.value ? +e.target.value : '';

      var updater = function updater(state) {
        var year = state.year,
            month = state.month;
        var day = strIsNumber(value) || value === '' ? value : state.day;

        if (("" + value).length > 2) {
          return null;
        } // 输入日校验


        var daysInMonth = monthDayRange(year);

        if (+day > daysInMonth[month - 1]) {
          return null;
        }

        return {
          day: day
        };
      };

      _this.setState(updater);
    });

    _defineProperty(_assertThisInitialized(_this), "inputOnBlur", function () {
      var _this$props = _this.props,
          onFinishInput = _this$props.onFinishInput,
          dateType = _this$props.dateType,
          canSelectFuture = _this$props.canSelectFuture;
      var _this$state = _this.state,
          validateMaxDate = _this$state.validateMaxDate,
          validateMinDate = _this$state.validateMinDate,
          year = _this$state.year,
          month = _this$state.month,
          day = _this$state.day,
          date = _this$state.date;

      if (year && month && day) {
        var currentDate = year + "/" + month + "/" + day;
        var currentTimeStamp = getTimeStamp(currentDate);

        if (validateMinDate && getTimeStamp(validateMinDate) && currentTimeStamp < getTimeStamp(validateMinDate) || validateMaxDate && getTimeStamp(validateMaxDate) && currentTimeStamp > getTimeStamp(validateMaxDate) || validateDateBeyondToday(currentDate) && !canSelectFuture) {
          _this.setState({
            year: getDetailDate(date) && getDetailDate(date).fullYear || '',
            month: getDetailDate(date) && getDetailDate(date).fullMonth || '',
            day: getDetailDate(date) && getDetailDate(date).fullDay || ''
          });

          return;
        }

        _this.setState({
          year: year,
          month: month,
          day: day
        });

        if (onFinishInput) {
          onFinishInput({
            value: year + "/" + month + "/" + day,
            type: dateType
          });
        }
      }
    });

    var _date = props.date;
    _this.state = {
      date: props.date && props.date.split(' ')[0] || '',
      year: getDetailDate(_date) && getDetailDate(_date).fullYear || '',
      month: getDetailDate(_date) && getDetailDate(_date).fullMonth || '',
      day: getDetailDate(_date) && getDetailDate(_date).fullDay || '',
      validateMaxDate: props.validateMaxDate,
      validateMinDate: props.validateMinDate
    };
    return _this;
  }

  var _proto = DateInput.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('date' in nextProps) {
      var newDate = nextProps.date;
      var newState = {
        date: newDate.split(' ')[0],
        year: getDetailDate(newDate) && getDetailDate(newDate).fullYear || '',
        month: getDetailDate(newDate) && getDetailDate(newDate).fullMonth || '',
        day: getDetailDate(newDate) && getDetailDate(newDate).fullDay || ''
      };
      this.setState(newState);
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        isCompare = _this$props2.isCompare;
    var _this$state2 = this.state,
        year = _this$state2.year,
        month = _this$state2.month,
        day = _this$state2.day;
    var inputCls = classNames(prefixCls + "-container", (_classNames = {}, _classNames[prefixCls + "-compare"] = isCompare, _classNames));
    return React.createElement("span", {
      className: "" + prefixCls
    }, React.createElement("input", {
      ref: this.getYearInputElement,
      type: "text",
      className: inputCls + " " + prefixCls + "-large",
      value: year,
      placeholder: "\u5E74",
      onChange: this.changeYear,
      max: "4",
      "data-type": "year",
      onBlur: this.inputOnBlur,
      onKeyDown: this.onKeyDown
    }), React.createElement("span", {
      className: prefixCls + "-seperate"
    }, "/"), React.createElement("input", {
      ref: this.getMonthInputElement,
      type: "text",
      className: inputCls,
      value: month,
      placeholder: "\u6708",
      onChange: this.changeMonth,
      max: "2",
      "data-type": "month",
      onBlur: this.inputOnBlur,
      onKeyDown: this.onKeyDown
    }), React.createElement("span", {
      className: prefixCls + "-seperate"
    }, "/"), React.createElement("input", {
      ref: this.getDayInputElement,
      type: "text",
      className: inputCls,
      value: day,
      placeholder: "\u65E5",
      onChange: this.changeDay,
      max: "2",
      "data-type": "day",
      onBlur: this.inputOnBlur,
      onKeyDown: this.onKeyDown
    }));
  };

  return DateInput;
}(PureComponent);

_defineProperty(DateInput, "propTypes", {
  /** 当前的日期，标准日期格式 */
  date: PropTypes.string,

  /** 当前的前缀 */
  prefixCls: PropTypes.string,

  /** 输完日，后进行校验 */
  onFinishInput: PropTypes.func,

  /** 日期校验， 最大日期 */
  validateMaxDate: PropTypes.string,

  /** 日期校验，最小日期 */
  validateMinDate: PropTypes.string,

  /** 输入框类型 透传 */
  dateType: PropTypes.string,

  /** 是否是比较日期的输入框 */
  isCompare: PropTypes.bool,

  /** 是否能选择未来，如果不能选择未来，需要单独校验 */
  canSelectFuture: PropTypes.bool
});

_defineProperty(DateInput, "defaultProps", {
  prefixCls: 'new-fc-one-calendar-input',
  isCompare: false,
  validateMinDate: null,
  validateMaxDate: null,
  dateType: 'beginTime',
  canSelectFuture: true
});

export { DateInput as default };