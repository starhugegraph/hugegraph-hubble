function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { polyfill } from 'react-lifecycles-compat';
import tools from '../../core';
import Layer from '../popLayer';
import Button from '../button';
import Icon from '../icon';
import DateInput from './common/dateInput';
import CalendarHeader from './common/calendarHeader';
import CalendarBody from './common/calendarBody';
import CalendarTime from './common/calendarTime';
import CalendarSwitch from './common/calendarSwitch';
var _tools$calendar = tools.calendar,
    getDateCompareObj = _tools$calendar.getDateCompareObj,
    formatSelectTime = _tools$calendar.formatSelectTime,
    getDetailDate = _tools$calendar.getDetailDate,
    validateData = _tools$calendar.validateData,
    getTimeBySwitchStr = _tools$calendar.getTimeBySwitchStr,
    formatHours = _tools$calendar.formatHours,
    validateTime = _tools$calendar.validateTime,
    formatTimeByRule = _tools$calendar.formatTimeByRule,
    formatTwoDateInOrder = _tools$calendar.formatTwoDateInOrder,
    getTimeStamp = _tools$calendar.getTimeStamp,
    transDateFormat = _tools$calendar.transDateFormat,
    transObjDateFormat = _tools$calendar.transObjDateFormat;
var addZero = tools.pickTime.addZero;

var formatInitCompareSwitch = function formatInitCompareSwitch(props) {
  if (props.selectMode !== 'compare') {
    return false;
  }

  return props.openCompareSwitch && props.showCompareSwitch;
};

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangeTitle", function (mode) {
      _this.setState({
        mode: mode
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangePage", function (params) {
      var currentMonth = params.currentMonth,
          currentYear = params.currentYear;

      _this.setState({
        selectTime: {
          year: currentYear,
          month: currentMonth
        }
      });

      _this.scrollToPosition({
        currentYear: currentYear,
        currentMonth: currentMonth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLayerVisibleChange", function (visible) {
      var _this$props = _this.props,
          onVisibleChange = _this$props.onVisibleChange,
          selectMode = _this$props.selectMode,
          showCompareSwitch = _this$props.showCompareSwitch,
          canSelectTime = _this$props.canSelectTime,
          timeRules = _this$props.timeRules,
          beginDate = _this$props.beginDate,
          endDate = _this$props.endDate,
          compareBeginDate = _this$props.compareBeginDate,
          compareEndDate = _this$props.compareEndDate;
      var _this$state = _this.state,
          beginTime = _this$state.beginTime,
          endTime = _this$state.endTime,
          compareBeginTime = _this$state.compareBeginTime,
          compareEndTime = _this$state.compareEndTime,
          compareSwitch = _this$state.compareSwitch;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      if (visible) {
        // 新打开弹层的时候，都要初始化一下一些值
        var formatBeginTime = transDateFormat(beginDate || beginTime);
        var initBeginTime = formatBeginTime || '';
        var initbeginDate = initBeginTime && initBeginTime.split(' ')[0] || '';
        var selectTime = formatSelectTime({
          beginTime: initbeginDate,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime,
          selectMode: selectMode,
          compareSwitch: compareSwitch
        });
        var timeObj = canSelectTime ? formatHours({
          time: initBeginTime,
          timeRules: timeRules
        }) : {};

        _this.setState({
          selectTime: selectTime,
          _beginTime: initbeginDate,
          _endTime: transDateFormat(endDate || endTime),
          _compareBeginTime: transDateFormat(compareBeginDate || compareBeginTime),
          _compareEndTime: transDateFormat(compareEndDate || compareEndTime),
          mode: 'date',
          compareSwitch: showCompareSwitch && compareSwitch,
          _compareSwitch: showCompareSwitch && compareSwitch,
          errorMsg: '',
          timeObj: timeObj
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onFinishInput", function (obj) {
      var value = obj.value,
          type = obj.type;
      var _this$props2 = _this.props,
          canSelectTime = _this$props2.canSelectTime,
          selectMode = _this$props2.selectMode;
      var _this$state2 = _this.state,
          _beginTime = _this$state2._beginTime,
          _endTime = _this$state2._endTime,
          _compareEndTime = _this$state2._compareEndTime,
          _compareBeginTime = _this$state2._compareBeginTime,
          _compareSwitch = _this$state2._compareSwitch;
      var newState = {
        errorMsg: ''
      };
      var scrollDate = '';

      if (selectMode === 'single') {
        scrollDate = value;

        if (canSelectTime) {
          newState._beginTime = _beginTime && _beginTime.split(' ')[1] ? value + " " + _beginTime.split(' ')[1] : value;
        } else {
          newState.beginTime = value;

          _this.onSelectDayValide({
            beginTime: value,
            endTime: ''
          });

          if (!('visible' in _this.props)) {
            newState.visible = false;
          }
        }
      } else if (selectMode === 'multiple') {
        if (type === 'beginTime') {
          newState._beginTime = value;

          if (_endTime && getTimeStamp(value) > getTimeStamp(_endTime)) {
            // 输入的起始日期大于结束日期的话，结束日期变为起始日期
            newState._endTime = value;
          }

          scrollDate = value;
        } else if (type === 'endTime') {
          // 先要比较一下，起始时间是否大于开始时间
          var _formatTwoDateInOrder = formatTwoDateInOrder({
            minDate: _beginTime,
            maxDate: value
          }),
              minDate = _formatTwoDateInOrder.minDate,
              maxDate = _formatTwoDateInOrder.maxDate;

          newState.beginTime = minDate;
          newState.endTime = maxDate;
          newState._endTime = maxDate;
          scrollDate = maxDate;

          _this.onSelectDayValide({
            beginTime: minDate,
            endTime: maxDate
          });

          if (!('visible' in _this.props)) {
            newState.visible = false;
          }
        }
      } else if (selectMode === 'compare') {
        if (type === 'compareBeginTime') {
          newState._compareBeginTime = value;

          if (getTimeStamp(value) > getTimeStamp(_compareEndTime)) {
            // 输入的起始日期大于结束日期的话，结束日期变为起始日期
            newState._compareEndTime = value;
          }

          scrollDate = value;
        } else if (type === 'beginTime') {
          newState._beginTime = value;

          if (getTimeStamp(value) > getTimeStamp(_endTime)) {
            // 输入的起始日期大于结束日期的话，结束日期变为起始日期
            newState._endTime = value;
          }

          scrollDate = value;
        } else if (type === 'compareEndTime') {
          // 先要比较一下，起始时间是否大于开始时间
          var _formatTwoDateInOrder2 = formatTwoDateInOrder({
            minDate: _compareBeginTime,
            maxDate: value
          }),
              _minDate = _formatTwoDateInOrder2.minDate,
              _maxDate = _formatTwoDateInOrder2.maxDate;

          newState._compareBeginTime = _minDate;
          newState._compareEndTime = _maxDate;
          scrollDate = _compareSwitch ? formatTwoDateInOrder({
            minDate: _endTime,
            maxDate: _maxDate
          }).maxDate : _maxDate;
        } else if (type === 'endTime') {
          // 先要比较一下，起始时间是否大于开始时间，如果用户输入的起始日期大于结束日期，位置对调
          var _formatTwoDateInOrder3 = formatTwoDateInOrder({
            minDate: _beginTime,
            maxDate: value
          }),
              _minDate2 = _formatTwoDateInOrder3.minDate,
              _maxDate2 = _formatTwoDateInOrder3.maxDate;

          newState._beginTime = _minDate2;
          newState._endTime = _maxDate2;
          scrollDate = _compareSwitch ? formatTwoDateInOrder({
            minDate: _compareEndTime,
            maxDate: _maxDate2
          }).maxDate : _maxDate2;
        }
      } // 搜索结束后，如月份面板滚动联动


      var _getDetailDate = getDetailDate(scrollDate),
          fullYear = _getDetailDate.fullYear,
          fullMonth = _getDetailDate.fullMonth;

      newState.selectTime = {
        year: fullYear,
        month: fullMonth
      };

      _this.initMonthDate(fullYear + "/" + fullMonth + "/1");

      setTimeout(function () {
        _this.scrollToPosition({
          currentYear: fullYear,
          currentMonth: fullMonth
        });
      }, 250);

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectMonth", function (params) {
      var year = params.year,
          month = params.month;

      _this.setState({
        mode: 'date',
        selectTime: {
          year: year,
          month: month
        }
      });

      _this.initMonthDate(year + "/" + month + "/1");

      setTimeout(function () {
        _this.scrollToPosition({
          currentYear: year,
          currentMonth: month
        });
      }, 250);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectDayValide", function (_ref) {
      var beginTime = _ref.beginTime,
          endTime = _ref.endTime;
      var _this$props3 = _this.props,
          rangeValidator = _this$props3.rangeValidator,
          onSelectDay = _this$props3.onSelectDay,
          onChange = _this$props3.onChange;
      var date = transObjDateFormat({
        beginTime: beginTime,
        endTime: endTime
      });

      if (rangeValidator) {
        var validateStr = rangeValidator({
          beginTime: beginTime,
          endTime: endTime
        });

        if (validateStr) {
          _this.setState({
            errorMsg: validateStr
          });

          return;
        }

        onSelectDay(date);
        onChange(date);
      }

      onSelectDay(date);
      onChange(date);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectDay", function (params) {
      var _this$props4 = _this.props,
          canSelectTime = _this$props4.canSelectTime,
          selectMode = _this$props4.selectMode;
      var beginTime = params.beginTime,
          endTime = params.endTime,
          compareBeginTime = params.compareBeginTime,
          compareEndTime = params.compareEndTime,
          step = params.step;
      var isFirstStep = step === 0;
      var isLastStep = step === 1; // const _compareSwitch = this.state._compareSwitch;

      if (selectMode === 'single' && !canSelectTime || selectMode === 'multiple' && isFirstStep) {
        _this.onSelectDayValide(params);
      }

      var newState = {
        errorMsg: ''
      };
      newState._beginTime = beginTime;
      newState._endTime = endTime;
      newState._compareBeginTime = compareBeginTime;
      newState._compareEndTime = compareEndTime;

      if (selectMode === 'single' && !canSelectTime) {
        newState.beginTime = beginTime;

        if (!('visible' in _this.props)) {
          newState.visible = false;
        }
      } else if (selectMode === 'multiple') {
        if (isLastStep) {
          newState._beginTime = beginTime;
          newState._endTime = '';
        } else if (isFirstStep) {
          newState.beginTime = beginTime;
          newState.endTime = endTime;

          if (!('visible' in _this.props)) {
            newState.visible = false;
          }
        }
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectTime", function (timeObj) {
      _this.setState({
        errorMsg: '',
        timeObj: timeObj
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onScrollChange", function (_ref2) {
      var year = _ref2.year,
          month = _ref2.month;
      var selectTime = _this.state.selectTime;

      if (year !== selectTime.year || month !== selectTime.month) {
        _this.setState({
          selectTime: {
            year: year,
            month: month
          }
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      var _this$state3 = _this.state,
          _beginTime = _this$state3._beginTime,
          _endTime = _this$state3._endTime,
          _compareBeginTime = _this$state3._compareBeginTime,
          _compareEndTime = _this$state3._compareEndTime,
          _compareSwitch = _this$state3._compareSwitch,
          timeObj = _this$state3.timeObj;
      var _this$props5 = _this.props,
          selectMode = _this$props5.selectMode,
          canSelectTime = _this$props5.canSelectTime,
          timeRules = _this$props5.timeRules,
          rangeValidator = _this$props5.rangeValidator,
          onChange = _this$props5.onChange,
          onConfirm = _this$props5.onConfirm;
      var beginTime = canSelectTime ? _beginTime && _beginTime.split(' ')[0] : _beginTime;
      var beginTimeValid = dayjs(dayjs(addZero(beginTime, '/')).format('YYYY/MM/DD')).isValid();
      var endTimeValid = dayjs(dayjs(addZero(_endTime, '/')).format('YYYY/MM/DD')).isValid();
      var compareBeginTimeValid = dayjs(dayjs(addZero(_compareBeginTime, '/')).format('YYYY/MM/DD')).isValid();
      var compareEndTimeValid = dayjs(dayjs(addZero(_compareEndTime, '/')).format('YYYY/MM/DD')).isValid();

      if (selectMode === 'single' && (!beginTimeValid || canSelectTime && !validateTime(timeObj.hour + ":" + timeObj.minute + ":" + timeObj.second))) {
        _this.setState({
          errorMsg: '请输入正确日期'
        });

        return;
      }

      if (selectMode === 'multiple' && (!beginTimeValid || !endTimeValid)) {
        _this.setState({
          errorMsg: '请输入一段比较日期'
        });

        return;
      }

      if (selectMode === 'compare') {
        if (_compareSwitch && (!beginTimeValid || !endTimeValid || !compareBeginTimeValid || !compareEndTimeValid)) {
          _this.setState({
            errorMsg: '请输入两段比较日期'
          });

          return;
        }

        if (!_compareSwitch && (!beginTimeValid || !endTimeValid)) {
          _this.setState({
            errorMsg: '请输入一段比较日期'
          });

          return;
        }
      } // 校验外部规则


      if (rangeValidator) {
        var validateDateStr = rangeValidator(transObjDateFormat({
          compareSwitch: _compareSwitch,
          beginTime: _beginTime,
          endTime: _endTime,
          compareBeginTime: _compareBeginTime,
          compareEndTime: _compareEndTime,
          canSelectTime: canSelectTime
        }));

        if (validateDateStr) {
          _this.setState({
            errorMsg: validateDateStr
          });

          return;
        }
      }

      var currentTime = formatTimeByRule(timeObj, timeRules);
      var newState = {
        beginTime: canSelectTime ? _beginTime.split(' ')[0] + " " + currentTime : _beginTime,
        endTime: _endTime,
        compareBeginTime: _compareBeginTime,
        compareEndTime: _compareEndTime,
        compareSwitch: _compareSwitch,
        mode: 'date'
      };

      if (!('visible' in _this.props)) {
        newState.visible = false;
      }

      _this.setState(newState);

      var date = transObjDateFormat(_extends({}, newState, {
        canSelectTime: canSelectTime
      }));

      if (onConfirm) {
        onConfirm(date);
      }

      onChange(date);
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      var _this$state4 = _this.state,
          beginTime = _this$state4.beginTime,
          endTime = _this$state4.endTime,
          compareBeginTime = _this$state4.compareBeginTime,
          compareEndTime = _this$state4.compareEndTime;
      var newState = {
        _beginTime: beginTime,
        _endTime: endTime,
        _compareBeginTime: compareBeginTime,
        _compareEndTime: compareEndTime,
        mode: 'date',
        errorMsg: ''
      };

      if (!('visible' in _this.props)) {
        newState.visible = false;
      }

      _this.setState(newState);

      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeSwitch", function (checked) {
      var onChooseSwitch = _this.props.onChooseSwitch; // 每次开关变化的时候，都应该要清掉比较时间

      _this.setState({
        _compareSwitch: checked,
        _compareBeginTime: '',
        _compareEndTime: ''
      });

      if (onChooseSwitch) {
        onChooseSwitch(checked);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChooseSwitchItem", function (value) {
      var canSelectFuture = _this.props.canSelectFuture;
      var _this$state5 = _this.state,
          _compareSwitch = _this$state5._compareSwitch,
          validateMaxDate = _this$state5.validateMaxDate,
          validateMinDate = _this$state5.validateMinDate;

      var _getTimeBySwitchStr = getTimeBySwitchStr({
        value: value,
        canSelectFuture: canSelectFuture,
        validateMaxDate: validateMaxDate,
        validateMinDate: validateMinDate
      }),
          beginTime = _getTimeBySwitchStr.beginTime,
          endTime = _getTimeBySwitchStr.endTime,
          compareBeginTime = _getTimeBySwitchStr.compareBeginTime,
          compareEndTime = _getTimeBySwitchStr.compareEndTime; // 关闭弹窗，映射外部变化


      var newState = {
        beginTime: beginTime,
        endTime: endTime,
        compareBeginTime: compareBeginTime,
        compareEndTime: compareEndTime,
        _beginTime: beginTime,
        _endTime: endTime,
        _compareBeginTime: compareBeginTime,
        _compareEndTime: compareEndTime,
        compareIndex: value,
        compareSwitch: _compareSwitch
      };
      var onChooseDateItem = _this.props.onChooseDateItem;

      if (onChooseDateItem) {
        onChooseDateItem(transObjDateFormat({
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime,
          compareSwitch: _compareSwitch,
          compareIndex: value
        }));
      }

      if (!('visible' in _this.props)) {
        newState.visible = false;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "getCalendarBodayRef", function (ref) {
      _this.calendarBodyRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToPosition", function (_ref3) {
      var currentMonth = _ref3.currentMonth,
          currentYear = _ref3.currentYear;
      var scrollFunc = _this.calendarBodyRef && _this.calendarBodyRef.bodyRef && _this.calendarBodyRef.bodyRef.scrollToPosition;

      if (typeof scrollFunc === 'function') {
        scrollFunc({
          beginTime: currentYear + "/" + currentMonth + "/1",
          list: _this.calendarBodyRef.bodyRef.state.list
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initMonthDate", function (currentDate) {
      var initDateMonthDays = _this.calendarBodyRef && _this.calendarBodyRef.bodyRef && _this.calendarBodyRef.bodyRef.initDateMonthDays;

      if (typeof initDateMonthDays === 'function') {
        initDateMonthDays(currentDate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectTimeMode", function (e) {
      var mode = e.target.dataset.mode === 'time' ? 'date' : 'time';

      _this.setState({
        mode: mode
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateInput", function () {
      // 输入的日期不能小于开始时间的十年之前，不能大于当前时间的十年之后
      var _this$state6 = _this.state,
          beginTime = _this$state6.beginTime,
          validateMaxDate = _this$state6.validateMaxDate,
          validateMinDate = _this$state6.validateMinDate,
          _beginTime = _this$state6._beginTime,
          _endTime = _this$state6._endTime;
      var _this$props6 = _this.props,
          canSelectTime = _this$props6.canSelectTime,
          selectMode = _this$props6.selectMode,
          prefixCls = _this$props6.prefixCls,
          canSelectFuture = _this$props6.canSelectFuture;
      var inputProps = {
        date: canSelectTime || selectMode === 'multiple' ? _beginTime : beginTime,
        onFinishInput: _this.onFinishInput,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        dateType: 'beginTime',
        canSelectFuture: canSelectFuture
      };
      var inputEndDateProps = {
        date: _endTime,
        onFinishInput: _this.onFinishInput,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        dateType: 'endTime',
        canSelectFuture: canSelectFuture
      };
      return selectMode === 'multiple' ? React.createElement("div", null, React.createElement(DateInput, inputProps), React.createElement("span", {
        className: prefixCls + "-seperate"
      }, "-"), React.createElement(DateInput, inputEndDateProps)) : React.createElement(DateInput, inputProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCompareDateInput", function () {
      var _this$props7 = _this.props,
          prefixCls = _this$props7.prefixCls,
          canSelectFuture = _this$props7.canSelectFuture;
      var _this$state7 = _this.state,
          _beginTime = _this$state7._beginTime,
          _endTime = _this$state7._endTime,
          _compareBeginTime = _this$state7._compareBeginTime,
          _compareEndTime = _this$state7._compareEndTime,
          _compareSwitch = _this$state7._compareSwitch,
          validateMinDate = _this$state7.validateMinDate,
          validateMaxDate = _this$state7.validateMaxDate;
      var inputProps = {
        onFinishInput: _this.onFinishInput,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        canSelectFuture: canSelectFuture
      };
      var elm = React.createElement("div", null, React.createElement("div", {
        className: prefixCls + "-line"
      }, React.createElement(DateInput, _extends({}, inputProps, {
        date: _beginTime,
        dateType: "beginTime"
      })), React.createElement("span", {
        className: prefixCls + "-seperate"
      }, "-"), React.createElement(DateInput, _extends({}, inputProps, {
        date: _endTime,
        dateType: "endTime"
      }))), _compareSwitch ? React.createElement("div", {
        className: prefixCls + "-line-text"
      }, "\u6BD4\u8F83") : null, _compareSwitch ? React.createElement("div", {
        className: prefixCls + "-line"
      }, React.createElement(DateInput, _extends({}, inputProps, {
        date: _compareBeginTime,
        dateType: "compareBeginTime",
        isCompare: true
      })), React.createElement("span", {
        className: prefixCls + "-seperate"
      }, "-"), React.createElement(DateInput, _extends({}, inputProps, {
        date: _compareEndTime,
        dateType: "compareEndTime",
        isCompare: true
      }))) : null);
      return elm;
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateHeader", function () {
      var canSelectFuture = _this.props.canSelectFuture;
      var _this$state8 = _this.state,
          mode = _this$state8.mode,
          selectTime = _this$state8.selectTime,
          validateMinDate = _this$state8.validateMinDate,
          validateMaxDate = _this$state8.validateMaxDate;
      var year = selectTime.year,
          month = selectTime.month;
      var calendarHeaderProps = {
        currentYear: year,
        currentMonth: month,
        onChangeTitle: _this.onChangeTitle,
        mode: mode,
        onChangePage: _this.onChangePage,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        canSelectFuture: canSelectFuture
      };
      return React.createElement(CalendarHeader, calendarHeaderProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateBody", function () {
      var _this$state9 = _this.state,
          mode = _this$state9.mode,
          selectTime = _this$state9.selectTime,
          validateMinDate = _this$state9.validateMinDate,
          validateMaxDate = _this$state9.validateMaxDate,
          beginTime = _this$state9.beginTime,
          visible = _this$state9.visible,
          _beginTime = _this$state9._beginTime,
          _endTime = _this$state9._endTime,
          _compareBeginTime = _this$state9._compareBeginTime,
          _compareEndTime = _this$state9._compareEndTime,
          _compareSwitch = _this$state9._compareSwitch;
      var _this$props8 = _this.props,
          prefixCls = _this$props8.prefixCls,
          selectMode = _this$props8.selectMode,
          canSelectFuture = _this$props8.canSelectFuture,
          canSelectTime = _this$props8.canSelectTime;
      var isCompareMode = selectMode === 'compare';
      var isSingleMode = selectMode === 'single';
      var bodyProps = {
        mode: mode,
        selectYear: selectTime.year,
        selectMonth: selectTime.month,
        prefixCls: prefixCls,
        onSelectMonth: _this.onSelectMonth,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        beginTime: !canSelectTime && isSingleMode ? beginTime : _beginTime,
        endTime: !isSingleMode && _endTime || '',
        compareBeginTime: isCompareMode && _compareSwitch && _compareBeginTime || '',
        compareEndTime: isCompareMode && _compareSwitch && _compareEndTime || '',
        onChange: _this.onSelectDay,
        visible: visible,
        ref: _this.getCalendarBodayRef,
        onScrollChange: _this.onScrollChange,
        selectMode: selectMode,
        canSelectFuture: canSelectFuture,
        compareSwitch: _compareSwitch
      };
      return React.createElement(CalendarBody, bodyProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderFooter", function () {
      var _this$props9 = _this.props,
          prefixCls = _this$props9.prefixCls,
          canSelectTime = _this$props9.canSelectTime,
          selectMode = _this$props9.selectMode;
      var _this$state10 = _this.state,
          mode = _this$state10.mode,
          errorMsg = _this$state10.errorMsg;
      var showFooter = canSelectTime && selectMode === 'single' || selectMode === 'compare';

      if (!showFooter) {
        if (!errorMsg) {
          return null;
        }

        return React.createElement("div", {
          className: prefixCls + "-footer"
        }, React.createElement("div", {
          className: prefixCls + "-error"
        }, errorMsg));
      }

      return React.createElement("div", {
        className: prefixCls + "-footer"
      }, errorMsg ? React.createElement("div", {
        className: prefixCls + "-error"
      }, errorMsg) : null, React.createElement(Button, {
        type: "primary",
        onClick: _this.onConfirm
      }, "\u786E\u5B9A"), React.createElement(Button, {
        type: "normal",
        onClick: _this.onCancel
      }, "\u53D6\u6D88"), canSelectTime && selectMode === 'single' ? React.createElement("span", {
        "data-mode": mode,
        className: prefixCls + "-footer-mode",
        onClick: _this.selectTimeMode
      }, mode === 'time' ? '日期选择' : '时间选择') : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderTime", function () {
      var _this$state11 = _this.state,
          timeObj = _this$state11.timeObj,
          mode = _this$state11.mode;
      var _this$props10 = _this.props,
          prefixCls = _this$props10.prefixCls,
          timeRules = _this$props10.timeRules;
      var calendarProps = {
        timeObj: timeObj,
        mode: mode,
        prefixCls: prefixCls,
        onSelectTime: _this.onSelectTime,
        timeRules: timeRules
      };
      return React.createElement(CalendarTime, calendarProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSingleDatePickerLayer", function () {
      var _classNames;

      var _this$props11 = _this.props,
          prefixCls = _this$props11.prefixCls,
          canSelectTime = _this$props11.canSelectTime;
      var mode = _this.state.mode;
      var pickClassName = classNames(prefixCls + "-single", prefixCls + "-single-" + mode, (_classNames = {}, _classNames[prefixCls + "-single-has-comfirm"] = canSelectTime, _classNames));
      return React.createElement("div", {
        className: prefixCls + "-layer"
      }, React.createElement("div", {
        className: pickClassName
      }, mode !== 'time' ? React.createElement("div", null, _this.renderDateInput(), _this.renderDateHeader(), _this.renderDateBody()) : _this.renderTime(), _this.renderFooter()));
    });

    _defineProperty(_assertThisInitialized(_this), "renderCompareSwitch", function () {
      var _this$props12 = _this.props,
          dateList = _this$props12.dateList,
          overRollDateList = _this$props12.overRollDateList,
          sameOverRollDateList = _this$props12.sameOverRollDateList,
          showCompareSwitch = _this$props12.showCompareSwitch;
      var _compareSwitch = _this.state._compareSwitch;
      var switchProps = {
        compareSwitch: _compareSwitch,
        dateList: dateList,
        overRollDateList: overRollDateList,
        sameOverRollDateList: sameOverRollDateList,
        onChooseSwitchItem: _this.onChooseSwitchItem,
        onChangeSwitch: _this.onChangeSwitch,
        showCompareSwitch: showCompareSwitch
      };
      return React.createElement(CalendarSwitch, switchProps);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCompareDatePickerLayer", function () {
      var prefixCls = _this.props.prefixCls;
      return React.createElement("div", {
        className: prefixCls + "-layer"
      }, React.createElement("div", {
        className: prefixCls + "-box"
      }, _this.renderCompareSwitch(), React.createElement("div", {
        className: prefixCls + "-main"
      }, _this.renderCompareDateInput(), _this.renderDateHeader(), _this.renderDateBody())), _this.renderFooter());
    });

    var isMultipleMode = props.selectMode === 'multiple';

    var _isCompareMode = props.selectMode === 'compare';

    var _canSelectTime = props.canSelectTime;
    var _timeRules = props.timeRules; // const compareSwitch = props.openCompareSwitch && props.showCompareSwitch;

    var _compareSwitch2 = formatInitCompareSwitch(props);

    var initialBeginTime = props.defaultBeginDate || props.beginDate;

    var _beginTime2 = initialBeginTime ? transDateFormat(initialBeginTime) : '';

    var initialEndTime = props.defaultEndDate || props.endDate;

    var _endTime2 = transDateFormat(initialEndTime);

    var initialCompareBeginTime = props.defaultCompareBeginDate || props.compareBeginDate;

    var _compareBeginTime2 = transDateFormat(initialCompareBeginTime);

    var initialCompareEndTime = props.defaultCompareEndDate || props.compareEndDate;

    var _compareEndTime2 = transDateFormat(initialCompareEndTime);

    _this.state = {
      beginTime: _beginTime2,
      endTime: (isMultipleMode || _isCompareMode) && _endTime2 || '',
      compareBeginTime: _isCompareMode && _compareBeginTime2 || '',
      compareEndTime: _isCompareMode && _compareEndTime2 || '',
      visible: props.visible,
      // 三种类型 month 展示月份面板 date 展现日期面板 time 展现选时间面板
      mode: 'date',
      selectTime: formatSelectTime({
        beginTime: _beginTime2,
        endTime: _endTime2,
        compareBeginTime: _compareSwitch2 && _compareBeginTime2,
        compareEndTime: _compareSwitch2 && _compareEndTime2,
        selectMode: props.selectMode,
        compareSwitch: _compareSwitch2
      }),
      validateMinDate: transDateFormat(props.validateMinDate) || validateData().validateMinDate,
      validateMaxDate: transDateFormat(props.validateMaxDate) || validateData().validateMaxDate,
      // 内置state, 非单选模式或者单选带时间模式时候可以用
      _beginTime: _beginTime2,
      _endTime: (isMultipleMode || _isCompareMode) && _endTime2,
      _compareBeginTime: _isCompareMode && _compareBeginTime2,
      _compareEndTime: _isCompareMode && _compareEndTime2,
      // 控制外部按钮比较信息展示
      compareSwitch: _compareSwitch2,
      // 内部比较信息
      _compareSwitch: _compareSwitch2,
      // 报错信息
      errorMsg: '',
      timeObj: _canSelectTime ? formatHours({
        time: _beginTime2,
        timeRules: _timeRules
      }) : {}
    };
    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
      this.setState({
        visible: nextProps.visible
      });
    }

    if ('openCompareSwitch' in nextProps && nextProps.openCompareSwitch !== this.props.openCompareSwitch) {
      this.setState({
        compareSwitch: nextProps.openCompareSwitch,
        _compareSwitch: nextProps.openCompareSwitch
      });
    }

    var _this$props13 = this.props,
        selectMode = _this$props13.selectMode,
        timeRules = _this$props13.timeRules,
        canSelectTime = _this$props13.canSelectTime;
    var _this$state12 = this.state,
        beginTime = _this$state12.beginTime,
        endTime = _this$state12.endTime,
        compareBeginTime = _this$state12.compareBeginTime,
        compareEndTime = _this$state12.compareEndTime,
        compareSwitch = _this$state12.compareSwitch;

    if ('beginDate' in nextProps && nextProps.beginDate !== this.props.beginDate) {
      var formatBeginTime = transDateFormat(nextProps.beginDate);
      var newState = {
        beginTime: formatBeginTime,
        _beginTime: formatBeginTime,
        selectTime: formatSelectTime({
          beginTime: formatBeginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime,
          selectMode: selectMode,
          compareSwitch: compareSwitch
        })
      };

      if (canSelectTime) {
        newState.timeObj = formatHours({
          time: formatBeginTime,
          timeRules: timeRules
        });
      }

      this.setState(newState);
    }

    if ('endDate' in nextProps && nextProps.endDate !== this.props.endDate) {
      var formatEndTime = transDateFormat(nextProps.endDate);
      this.setState({
        endTime: formatEndTime,
        _endTime: formatEndTime,
        selectTime: formatSelectTime({
          beginTime: beginTime,
          endTime: formatEndTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime,
          selectMode: selectMode,
          compareSwitch: compareSwitch
        })
      });
    }

    if ('compareBeginDate' in nextProps && nextProps.compareBeginDate !== this.props.compareBeginDate) {
      var formatCompareBeginTime = transDateFormat(nextProps.compareBeginDate);
      this.setState({
        compareBeginTime: formatCompareBeginTime,
        _compareBeginTime: formatCompareBeginTime,
        selectTime: formatSelectTime({
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: formatCompareBeginTime,
          compareEndTime: compareEndTime,
          selectMode: selectMode,
          compareSwitch: compareSwitch
        })
      });
    }

    if ('compareEndDate' in nextProps && nextProps.compareEndDate !== this.props.compareEndDate) {
      var formatCompareEndTime = transDateFormat(nextProps.compareEndDate);
      this.setState({
        compareEndTime: formatCompareEndTime,
        _compareEndTime: formatCompareEndTime,
        selectTime: formatSelectTime({
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: formatCompareEndTime,
          selectMode: selectMode,
          compareSwitch: compareSwitch
        })
      });
    }

    if ('validateMinDate' in nextProps && nextProps.validateMinDate !== this.props.validateMinDate) {
      this.setState({
        validateMinDate: transDateFormat(nextProps.validateMinDate)
      });
    }

    if ('validateMaxDate' in nextProps && nextProps.validateMaxDate !== this.props.validateMaxDate) {
      this.setState({
        validateMaxDate: transDateFormat(nextProps.validateMaxDate)
      });
    }
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props14 = this.props,
        prefixCls = _this$props14.prefixCls,
        canSelectTime = _this$props14.canSelectTime,
        selectMode = _this$props14.selectMode,
        timeRules = _this$props14.timeRules,
        showCompareSwitch = _this$props14.showCompareSwitch,
        className = _this$props14.className,
        getPopupContainer = _this$props14.getPopupContainer,
        disabled = _this$props14.disabled,
        size = _this$props14.size;
    var _this$state13 = this.state,
        beginTime = _this$state13.beginTime,
        endTime = _this$state13.endTime,
        compareBeginTime = _this$state13.compareBeginTime,
        compareEndTime = _this$state13.compareEndTime,
        compareSwitch = _this$state13.compareSwitch;
    var buttonText = getDateCompareObj({
      beginTime: beginTime,
      canSelectTime: canSelectTime,
      endTime: endTime,
      compareBeginTime: compareBeginTime,
      compareEndTime: compareEndTime,
      selectMode: selectMode,
      timeRules: timeRules,
      compareSwitch: showCompareSwitch && compareSwitch
    });
    var visible = this.state.visible;

    if ('visible' in this.props) {
      visible = this.props.visible;
    }

    var text = buttonText || '请选择日期';
    var calendarCls = classNames(prefixCls, className, (_classNames2 = {}, _classNames2[prefixCls + "-empty"] = !buttonText, _classNames2[prefixCls + "-disabled"] = disabled, _classNames2));
    var overlay = React.createElement("span", null);

    if (visible) {
      overlay = selectMode === 'compare' ? this.renderCompareDatePickerLayer : this.renderSingleDatePickerLayer;
    }

    var layerProps = {
      trigger: disabled ? '' : 'click',
      visible: visible,
      onVisibleChange: this.onLayerVisibleChange,
      overlay: overlay,
      dropdownMatchSelectWidth: false,
      getPopupContainer: getPopupContainer
    };
    return React.createElement("div", {
      className: calendarCls
    }, React.createElement(Layer, layerProps, React.createElement(Button, {
      className: prefixCls + "-title",
      disabled: disabled,
      size: size
    }, React.createElement("span", null, text), React.createElement(Icon, {
      type: "calendar"
    }))));
  };

  return Calendar;
}(Component);

_defineProperty(Calendar, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 默认开始时间， canSelectTime为true的时候，可以传入时分秒作为初始值, 时间格式为YYYY/HH/mm */
  defaultBeginDate: PropTypes.string,

  /** 默认结束时间，selectMode 为multiple的时候，可以选择一段时间，该字段为一段时间的结束时间, 时间格式为YYYY/HH/mm */
  defaultEndDate: PropTypes.string,

  /** 默认对比开始时间 selectMode 为compare时候，可选, 时间格式为YYYY/HH/mm */
  defaultCompareBeginDate: PropTypes.string,

  /** 默认结束对比时间 selectMode 为compare时候，可选, 时间格式为YYYY/HH/mm */
  defaultCompareEndDate: PropTypes.string,

  /** 开始时间，canSelectTime为true的时候，可以传入时分秒作为初始值, 时间格式为YYYY/HH/mm */
  beginDate: PropTypes.string,

  /** 结束时间 时间格式为YYYY/HH/mm */
  endDate: PropTypes.string,

  /** 对比开始时间 */
  compareBeginDate: PropTypes.string,

  /** 对比结束时间 */
  compareEndDate: PropTypes.string,

  /** 弹窗是否可视 */
  visible: PropTypes.bool,

  /** 弹窗关闭/打开时的函数，传出visible */
  onVisibleChange: PropTypes.func,

  /** 选中日期的时候的回调函数, 如果有确定按钮的话，改方法失效 */
  onSelectDay: PropTypes.func,

  /** select mode (single, multiple, compare) 单选，跨选, 比较模式，默认单选 */
  selectMode: PropTypes.string,

  /** 是否能选择未来, 默认能选择未来 */
  canSelectFuture: PropTypes.bool,

  /** 是否可以选择时间，只在selectMode为single下可设置为true */
  canSelectTime: PropTypes.bool,

  /** onConfirm 确定按钮的回调函数，只有有确定按钮的时候才有作用 */
  onConfirm: PropTypes.func,

  /** onCancel  取消按钮的回调函数，只有有取消按钮的时候才有作用 */
  onCancel: PropTypes.func,

  /** showCompareSwitch 是否展示比较开关, 默认展示 */
  showCompareSwitch: PropTypes.bool,

  /** openCompareSwitch 是否展开比较开关，默认展示 */
  openCompareSwitch: PropTypes.bool,

  /** 快捷选择日期 配置项
   * 注释：['今日'，'昨日'，'最近7天'，'最近14天‘，'最近30天'，'上周'，'本月'，'上个月']
   * 类型：['today', 'yesterday', 'lastSevenDays', 'lastFourteenDays', 'lastThirtyDays', 'lastWeek', 'currentMonth', 'lastMonth']
   * */
  dateList: PropTypes.array,

  /**
   * 快捷选择 环比 对比日期 配置项
   * 注释：['今天/昨天'，'本周/上周'，'本月/上月']
   * 类型：['compareYesterday', 'compareLastWeek', 'compareLastMonth']
   */
  overRollDateList: PropTypes.array,

  /**
   * 快捷选择 同比 对比日期 配置项
   * 注释：['上一年今日'，'上一年本周'，'上一年本月']
   * 类型：['compareYesterday', 'compareLastWeek', 'compareLastMonth']
   */
  sameOverRollDateList: PropTypes.array,

  /** selectMode 为compare时候，选择左侧快捷操作时的回调函数 */
  onChooseDateItem: PropTypes.func,

  /** time展示规则, 当 canSelectTime 为true的时候起作用，目前只支持三种展示方案，时分秒、时分、时，赋值，1-时分秒，2-时分，3-时 */
  timeRules: PropTypes.number,

  /** 自定义类名 */
  className: PropTypes.string,

  /** 支持传入默认开始时间 */
  validateMinDate: PropTypes.string,

  /** 支持传入默认结束时间 */
  validateMaxDate: PropTypes.string,

  /** 可支持自定义校验, onSelectDay 和 onConfirm的时候会进行校验 */
  rangeValidator: PropTypes.func,

  /** onChooseSwitch 点击开关以后的回调 */
  onChooseSwitch: PropTypes.func,

  /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
  getPopupContainer: PropTypes.func,

  /** disabled 日历是否处于禁用 */
  disabled: PropTypes.bool,

  /** 按钮的尺寸 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /** 兼容onSelectDay 和 onConfirm 在表单中的使用 */
  onChange: PropTypes.func
});

_defineProperty(Calendar, "defaultProps", {
  prefixCls: 'new-fc-one-calendar',
  selectMode: 'single',
  canSelectFuture: true,
  canSelectTime: false,
  showCompareSwitch: true,
  openCompareSwitch: true,
  timeRules: 1,
  onSelectDay: function onSelectDay() {},
  onVisibleChange: function onVisibleChange() {},
  onConfirm: function onConfirm() {},
  onCancel: function onCancel() {},
  onChooseDateItem: function onChooseDateItem() {},
  className: '',
  disabled: false,
  size: 'small',
  onChange: function onChange() {}
});

polyfill(Calendar);
export default Calendar;