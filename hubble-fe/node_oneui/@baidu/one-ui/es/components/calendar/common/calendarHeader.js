function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../icon';
import tools from '../../../core';
import Button from '../../button';
import Tooltip from '../../tooltip';
var _tools$calendar = tools.calendar,
    getDetailDate = _tools$calendar.getDetailDate,
    getTodayStr = _tools$calendar.getTodayStr,
    formatTwoDateInOrder = _tools$calendar.formatTwoDateInOrder;

var CalendarHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CalendarHeader, _PureComponent);

  function CalendarHeader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangeTitle", function () {
      var _this$props = _this.props,
          mode = _this$props.mode,
          onChangeTitle = _this$props.onChangeTitle;
      var newMode = mode === 'date' ? 'month' : 'date';

      if (onChangeTitle) {
        onChangeTitle(newMode);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToNextMonth", function () {
      var _this$state = _this.state,
          currentYear = _this$state.currentYear,
          currentMonth = _this$state.currentMonth;
      var newCurrentMonth = currentMonth + 1;
      var newCurrentYear = currentYear;

      if (newCurrentMonth === 13) {
        newCurrentMonth = 1;
        newCurrentYear++;
      }

      var onChangePage = _this.props.onChangePage;

      if (onChangePage) {
        onChangePage({
          currentMonth: newCurrentMonth,
          currentYear: newCurrentYear
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToPrevMonth", function () {
      var _this$state2 = _this.state,
          currentYear = _this$state2.currentYear,
          currentMonth = _this$state2.currentMonth;
      var newCurrentMonth = currentMonth - 1;
      var newCurrentYear = currentYear;

      if (newCurrentMonth === 0) {
        newCurrentMonth = 12;
        newCurrentYear--;
      }

      var onChangePage = _this.props.onChangePage;

      if (onChangePage) {
        onChangePage({
          currentMonth: newCurrentMonth,
          currentYear: newCurrentYear
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "canShowNextIcon", function () {
      var _this$state3 = _this.state,
          currentYear = _this$state3.currentYear,
          currentMonth = _this$state3.currentMonth;
      var _this$props2 = _this.props,
          canSelectFuture = _this$props2.canSelectFuture,
          validateMaxDate = _this$props2.validateMaxDate;
      var todayStr = getTodayStr();
      var validateDay = canSelectFuture ? validateMaxDate : formatTwoDateInOrder({
        minDate: todayStr,
        maxDate: validateMaxDate
      }).minDate;
      var validateMaxDateObj = getDetailDate(validateDay);
      var showNextIcon = !(validateMaxDateObj.fullYear === currentYear && currentMonth === validateMaxDateObj.fullMonth);
      return showNextIcon;
    });

    _this.state = {
      currentYear: props.currentYear,
      currentMonth: props.currentMonth,
      mode: props.mode
    };
    return _this;
  }

  var _proto = CalendarHeader.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('currentYear' in nextProps) {
      this.setState({
        currentYear: nextProps.currentYear
      });
    }

    if ('currentMonth' in nextProps) {
      this.setState({
        currentMonth: nextProps.currentMonth
      });
    }

    if ('mode' in nextProps) {
      this.setState({
        mode: nextProps.mode
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var prefixCls = this.props.prefixCls;
    var _this$state4 = this.state,
        currentYear = _this$state4.currentYear,
        currentMonth = _this$state4.currentMonth,
        mode = _this$state4.mode;
    var validateMinDate = this.props.validateMinDate;
    var angleCls = classNames(prefixCls + "-angle", (_classNames = {}, _classNames[prefixCls + "-angle-open"] = mode === 'month', _classNames));
    var showNextIcon = this.canShowNextIcon();
    var showPrevIcon = true;
    var validateMinDateObj = getDetailDate(validateMinDate);

    if (validateMinDateObj.fullYear === currentYear && currentMonth === validateMinDateObj.fullMonth) {
      showPrevIcon = false;
    }

    return React.createElement("div", {
      className: "" + prefixCls
    }, React.createElement("span", {
      className: prefixCls + "-container",
      onClick: this.onChangeTitle
    }, React.createElement("span", {
      className: prefixCls + "-title"
    }, currentYear, "\u5E74", currentMonth, "\u6708"), React.createElement("span", {
      className: angleCls
    }, React.createElement(Icon, {
      type: "angle-down"
    }))), React.createElement("span", {
      className: prefixCls + "-page"
    }, showPrevIcon ? React.createElement(Tooltip, {
      placement: "top",
      title: "\u4E0A\u6708"
    }, React.createElement(Button, {
      className: prefixCls + "-page-prev",
      onClick: this.onGoToPrevMonth
    }, React.createElement(Icon, {
      type: "angle-left"
    }))) : null, showNextIcon ? React.createElement(Tooltip, {
      placement: "top",
      title: "\u4E0B\u6708"
    }, React.createElement(Button, {
      className: prefixCls + "-page-next",
      onClick: this.onGoToNextMonth
    }, React.createElement(Icon, {
      type: "angle-right"
    }))) : null));
  };

  return CalendarHeader;
}(PureComponent);

_defineProperty(CalendarHeader, "propTypes", {
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number,
  onChangeTitle: PropTypes.func,
  prefixCls: PropTypes.string,
  mode: PropTypes.string.isRequired,
  // 日期模式: date 月份模式 month
  onChangePage: PropTypes.func,
  validateMinDate: PropTypes.string,
  validateMaxDate: PropTypes.string,
  canSelectFuture: PropTypes.bool
});

_defineProperty(CalendarHeader, "defaultProps", {
  prefixCls: 'new-fc-one-calendar-header'
});

export { CalendarHeader as default };