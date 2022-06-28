function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import partial from 'lodash/partial';
import { IconAngleDoubleLeft, IconAngleDoubleRight, IconAngleLeft, IconAngleRight } from '@baidu/one-ui-icon';
import Icon from '../../icon';
import { getDetailDate, monthDayRange, getTimeTramp } from '../../../core/datePickerTools';

var TitleHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TitleHeader, _PureComponent);

  function TitleHeader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onGoToPrevYear", function (type) {
      var _this$props = _this.props,
          showYear = _this$props.showYear,
          endDateShowYear = _this$props.endDateShowYear;
      var currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
      var prevYear = currentYear - 1;
      var newState = {};

      if (type === 'multipleNext') {
        newState.endDateShowYear = prevYear;
      } else {
        newState.showYear = prevYear;
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToPrevMonth", function (type) {
      var _this$props2 = _this.props,
          showMonth = _this$props2.showMonth,
          endDateShowMonth = _this$props2.endDateShowMonth,
          showYear = _this$props2.showYear,
          endDateShowYear = _this$props2.endDateShowYear;
      var currentMonth = type === 'multipleNext' ? endDateShowMonth : showMonth;
      var currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
      var prevMonth = currentMonth - 1;

      if (currentMonth === 1) {
        prevMonth = 12;
        currentYear--;
      }

      var newState = {};

      if (type === 'multipleNext') {
        newState.endDateShowMonth = prevMonth;
        newState.endDateShowYear = currentYear;
      } else {
        newState.showMonth = prevMonth;
        newState.showYear = currentYear;
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToNextYear", function (type) {
      var _this$props3 = _this.props,
          showYear = _this$props3.showYear,
          endDateShowYear = _this$props3.endDateShowYear;
      var currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
      var nextYear = currentYear + 1;
      var newState = {};

      if (type === 'multipleNext') {
        newState.endDateShowYear = nextYear;
      } else {
        newState.showYear = nextYear;
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToNextMonth", function (type) {
      var _this$props4 = _this.props,
          showMonth = _this$props4.showMonth,
          endDateShowMonth = _this$props4.endDateShowMonth,
          showYear = _this$props4.showYear,
          endDateShowYear = _this$props4.endDateShowYear;
      var currentMonth = type === 'multipleNext' ? endDateShowMonth : showMonth;
      var currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
      var nextMonth = currentMonth + 1;

      if (currentMonth === 12) {
        nextMonth = 1;
        currentYear++;
      }

      var newState = {};

      if (type === 'multipleNext') {
        newState.endDateShowMonth = nextMonth;
        newState.endDateShowYear = currentYear;
      } else {
        newState.showMonth = nextMonth;
        newState.showYear = currentYear;
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "togglePanel", function (type) {
      var newState = {};

      if (type === 'multipleNext') {
        newState.endDatePanelType = _this.props.endDatePanelType === 'date' ? 'month' : 'date';
      } else if (!_this.props.isMonthRender) {
        newState.panelType = _this.props.panelType === 'date' ? 'month' : 'date';
      } else {
        newState.panelType = _this.props.panelType === 'month' ? 'year' : 'month';
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "showChangeYearIcon", function (type) {
      var _this$props5 = _this.props,
          validateMinDate = _this$props5.validateMinDate,
          validateMaxDate = _this$props5.validateMaxDate,
          showYear = _this$props5.showYear,
          endDateShowYear = _this$props5.endDateShowYear;
      var minYear = getDetailDate(validateMinDate).fullYear;
      var maxYear = getDetailDate(validateMaxDate).fullYear;
      var showPrevYearIcon;
      var showNextYearIcon;

      if (type === 'single') {
        showPrevYearIcon = minYear < showYear;
        showNextYearIcon = maxYear > showYear;
      } else if (type === 'multiplePrev') {
        // 多选中的第一个面板
        showNextYearIcon = showYear < endDateShowYear;
        showPrevYearIcon = minYear < showYear;
      } else if (type === 'multipleNext') {
        // 多选中的第二个面板
        showNextYearIcon = maxYear > endDateShowYear;
        showPrevYearIcon = endDateShowYear > showYear;
      }

      return {
        showPrevYearIcon: showPrevYearIcon,
        showNextYearIcon: showNextYearIcon
      };
    });

    _defineProperty(_assertThisInitialized(_this), "showChangeMonthIcon", function (type) {
      var _this$props6 = _this.props,
          validateMinDate = _this$props6.validateMinDate,
          validateMaxDate = _this$props6.validateMaxDate,
          showYear = _this$props6.showYear,
          showMonth = _this$props6.showMonth,
          endDateShowYear = _this$props6.endDateShowYear,
          endDateShowMonth = _this$props6.endDateShowMonth;
      var minDate = getDetailDate(validateMinDate);
      var maxDate = getDetailDate(validateMaxDate);
      var firstDayInCurrentMonth = showYear + "/" + showMonth + "/01";
      var lastDayInCurrentMonth = showYear + "/" + showMonth + "/" + monthDayRange(showYear)[showMonth - 1];

      if (type === 'multipleNext') {
        firstDayInCurrentMonth = endDateShowYear + "/" + endDateShowMonth + "/01";
        lastDayInCurrentMonth = endDateShowYear + "/" + endDateShowMonth + "/" + monthDayRange(endDateShowYear)[endDateShowMonth - 1];
      }

      var minDateStamp = getTimeTramp(minDate.fullYear + "/" + minDate.fullMonth + "/01");
      var maxDateStamp = getTimeTramp(maxDate.fullYear + "/" + maxDate.fullMonth + "/" + monthDayRange(maxDate.fullYear)[maxDate.fullMonth - 1]);
      var showPrevMonthIcon;
      var showNextMonthIcon;

      if (type === 'single') {
        showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > minDateStamp;
        showNextMonthIcon = getTimeTramp(lastDayInCurrentMonth) < maxDateStamp;
      } else if (type === 'multiplePrev') {
        // 多选面板中的第一个面板
        showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > minDateStamp;
        var endDate = endDateShowYear + "/" + (endDateShowMonth - 1) + "/01";

        if (endDateShowMonth === 1) {
          endDate = endDateShowYear - 1 + "/12/01";
        }

        showNextMonthIcon = getTimeTramp(firstDayInCurrentMonth) < getTimeTramp(endDate);
      } else if (type === 'multipleNext') {
        // 多选面板的第二个面板
        var firstDate = showYear + "/" + (showMonth + 1) + "/01";

        if (showMonth === 12) {
          firstDate = endDateShowYear + 1 + "/01/01";
        }

        showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > getTimeTramp(firstDate);
        showNextMonthIcon = getTimeTramp(lastDayInCurrentMonth) < maxDateStamp;
      }

      return {
        showPrevMonthIcon: showPrevMonthIcon,
        showNextMonthIcon: showNextMonthIcon
      };
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (type) {
      if (type === void 0) {
        type = 'single';
      }

      var _this$props7 = _this.props,
          prefixCls = _this$props7.prefixCls,
          showYear = _this$props7.showYear,
          showMonth = _this$props7.showMonth,
          endDateShowYear = _this$props7.endDateShowYear,
          endDateShowMonth = _this$props7.endDateShowMonth,
          endDatePanelType = _this$props7.endDatePanelType,
          panelType = _this$props7.panelType,
          isMonthRender = _this$props7.isMonthRender;
      var currentPanelType = panelType;
      var currentShowYear = showYear;
      var currentShowMonth = showMonth;

      if (type === 'multipleNext') {
        currentPanelType = endDatePanelType;
        currentShowYear = endDateShowYear;
        currentShowMonth = endDateShowMonth;
      }

      var classNames = prefixCls + "-title-header";
      var iconType = currentPanelType === 'date' ? React.createElement(Icon, {
        type: "angle-down"
      }) : React.createElement(Icon, {
        type: "angle-up"
      });

      if (isMonthRender) {
        iconType = currentPanelType === 'month' ? React.createElement(Icon, {
          type: "angle-down"
        }) : React.createElement(Icon, {
          type: "angle-up"
        });
      }

      var showYearIcon = _this.showChangeYearIcon(type);

      var showMonthIcon = _this.showChangeMonthIcon(type);

      return React.createElement("div", {
        className: classNames
      }, showYearIcon.showPrevYearIcon ? React.createElement("span", {
        className: classNames + "-link-year " + classNames + "-link-year-prev",
        onClick: partial(_this.onGoToPrevYear, type)
      }, React.createElement(IconAngleDoubleLeft, null)) : null, showMonthIcon.showPrevMonthIcon && !isMonthRender ? React.createElement("span", {
        className: classNames + "-link-month " + classNames + "-link-month-prev",
        onClick: partial(_this.onGoToPrevMonth, type)
      }, React.createElement(IconAngleLeft, null)) : null, React.createElement("span", {
        className: classNames + "-content",
        onClick: partial(_this.togglePanel, type)
      }, React.createElement("span", null, currentShowYear + "\u5E74", !isMonthRender ? currentShowMonth + "\u6708" : null), iconType), showYearIcon.showNextYearIcon ? React.createElement("span", {
        className: classNames + "-link-month " + classNames + "-link-month-next",
        onClick: partial(_this.onGoToNextYear, type)
      }, React.createElement(IconAngleDoubleRight, null)) : null, showMonthIcon.showNextMonthIcon && !isMonthRender ? React.createElement("span", {
        className: classNames + "-link-year " + classNames + "-link-year-next",
        onClick: partial(_this.onGoToNextMonth, type)
      }, React.createElement(IconAngleRight, null)) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMultipleHeader", function () {
      var prefixCls = _this.props.prefixCls;
      return React.createElement("div", {
        className: prefixCls + "-multiple-header"
      }, React.createElement("span", null, _this.renderItem('multiplePrev')), React.createElement("span", null, _this.renderItem('multipleNext')));
    });

    _this.store = _this.props.store;
    return _this;
  }

  var _proto = TitleHeader.prototype;

  _proto.render = function render() {
    var multiple = this.props.multiple;
    return multiple ? this.renderMultipleHeader() : this.renderItem();
  };

  return TitleHeader;
}(PureComponent);

_defineProperty(TitleHeader, "propTypes", {
  store: PropTypes.object.isRequired,
  prefixCls: PropTypes.string.isRequired,
  showYear: PropTypes.number,
  showMonth: PropTypes.number,
  panelType: PropTypes.string.isRequired,
  validateMinDate: PropTypes.string.isRequired,
  validateMaxDate: PropTypes.string.isRequired,
  endDateShowYear: PropTypes.number,
  endDateShowMonth: PropTypes.number,
  endDatePanelType: PropTypes.string,
  multiple: PropTypes.bool,
  isMonthRender: PropTypes.bool
});

_defineProperty(TitleHeader, "defaultProps", {
  multiple: false
});

export default connect(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    panelType: state.panelType,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    endDatePanelType: state.endDatePanelType
  };
})(TitleHeader);