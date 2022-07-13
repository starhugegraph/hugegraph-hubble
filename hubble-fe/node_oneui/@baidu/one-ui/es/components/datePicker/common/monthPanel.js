function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import partial from 'lodash/partial';
import { connect } from 'mini-store';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { getTimeTramp, monthDayRange } from '../../../core/datePickerTools';
var monthItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var MonthRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(MonthRender, _PureComponent);

  function MonthRender(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickMonth", function (_ref) {
      var month = _ref.month,
          disabled = _ref.disabled;

      if (disabled) {
        return;
      }

      var newState = {};
      var _this$props = _this.props,
          type = _this$props.type,
          isMonthRender = _this$props.isMonthRender,
          showYear = _this$props.showYear,
          dateFormat = _this$props.dateFormat;

      if (type === 'nextMultiple') {
        newState.endDateShowMonth = month;
        newState.endDatePanelType = 'date';
      } else {
        newState.showMonth = month;
        newState.panelType = isMonthRender ? 'month' : 'date';
      }

      _this.store.setState(newState);

      if (_this.props.onClickMonth) {
        var value = dayjs(showYear + "/" + month).format(dateFormat);

        _this.props.onClickMonth(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatItemClassName", function (showYear, showMonth, month) {
      var _classNames;

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          type = _this$props2.type,
          endDateShowYear = _this$props2.endDateShowYear,
          endDateShowMonth = _this$props2.endDateShowMonth;
      var _this$props3 = _this.props,
          validateMinDate = _this$props3.validateMinDate,
          validateMaxDate = _this$props3.validateMaxDate;
      var range = monthDayRange(showYear);

      if (type === 'prevMultiple') {
        var endDate = endDateShowYear + "/" + (endDateShowMonth - 1) + "/01";

        if (endDateShowMonth === 1) {
          endDate = endDateShowYear - 1 + "/12/01";
        }

        if (getTimeTramp(endDate) < getTimeTramp(validateMaxDate)) {
          validateMaxDate = endDate;
        }
      } else if (type === 'nextMultiple') {
        var beginDate = _this.props.showYear + "/" + (_this.props.showMonth + 1) + "/01";

        if (_this.props.showMonth === 12) {
          beginDate = _this.props.showYear + 1 + "/01/01";
        }

        if (getTimeTramp(beginDate) > getTimeTramp(validateMinDate)) {
          validateMinDate = beginDate;
        }
      }

      var monthClassName = prefixCls + "-month-container-item";
      var currentMonthLastDay = getTimeTramp(showYear + "/" + month + "/" + range[month - 1]);
      var currentMonthFirstDay = getTimeTramp(showYear + "/" + month + "/01");
      var disabled = currentMonthLastDay < getTimeTramp(validateMinDate) || currentMonthFirstDay > getTimeTramp(validateMaxDate);
      var monthClassNames = classNames(monthClassName, (_classNames = {}, _classNames[monthClassName + "-selected"] = month === showMonth, _classNames[monthClassName + "-disabled"] = disabled, _classNames[monthClassName + "-last-row"] = month > 9, _classNames));
      return {
        disabled: disabled,
        monthClassNames: monthClassNames
      };
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonth", function () {
      var monthContainers = [];
      var _this$props4 = _this.props,
          showMonth = _this$props4.showMonth,
          showYear = _this$props4.showYear,
          endDateShowYear = _this$props4.endDateShowYear,
          endDateShowMonth = _this$props4.endDateShowMonth,
          type = _this$props4.type;
      var currentMonth = type === 'nextMultiple' ? endDateShowMonth : showMonth;
      var currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;
      monthItems.forEach(function (month) {
        var _this$formatItemClass = _this.formatItemClassName(currentYear, currentMonth, month),
            monthClassNames = _this$formatItemClass.monthClassNames,
            disabled = _this$formatItemClass.disabled;

        monthContainers.push(React.createElement("span", {
          className: monthClassNames,
          key: month,
          onClick: partial(_this.onClickMonth, {
            month: month,
            disabled: disabled
          })
        }, month + "\u6708"));
      });
      return monthContainers;
    });

    _this.store = _this.props.store;
    return _this;
  }

  var _proto = MonthRender.prototype;

  _proto.render = function render() {
    var _this$props5 = this.props,
        prefixCls = _this$props5.prefixCls,
        panelType = _this$props5.panelType,
        endDatePanelType = _this$props5.endDatePanelType,
        type = _this$props5.type;
    var currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;

    if (currentPanelType !== 'month') {
      return null;
    }

    return React.createElement("div", {
      className: prefixCls + "-month-container"
    }, this.renderMonth());
  };

  return MonthRender;
}(PureComponent);

_defineProperty(MonthRender, "propTypes", {
  store: PropTypes.object.isRequired,
  prefixCls: PropTypes.string.isRequired,
  showMonth: PropTypes.number.isRequired,
  showYear: PropTypes.number.isRequired,
  panelType: PropTypes.string.isRequired,
  endDatePanelType: PropTypes.string,
  validateMinDate: PropTypes.string.isRequired,
  validateMaxDate: PropTypes.string.isRequired,
  endDateShowYear: PropTypes.number,
  endDateShowMonth: PropTypes.number,
  type: PropTypes.string,
  onClickMonth: PropTypes.func,
  isMonthRender: PropTypes.bool,
  dateFormat: PropTypes.string.isRequired
});

export default connect(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    endDatePanelType: state.endDatePanelType,
    panelType: state.panelType
  };
})(MonthRender);