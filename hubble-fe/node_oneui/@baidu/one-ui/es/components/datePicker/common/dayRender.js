function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import dayjs from 'dayjs';
import { formatPerMonthInDay, getTimeTramp, getTodayDetail, formatWeek } from '../../../core/datePickerTools';

var DayItemRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DayItemRender, _PureComponent);

  function DayItemRender() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    _defineProperty(_assertThisInitialized(_this), "memoize", function (param) {
      if (!this.cache[param]) {
        var date = param.split('/');
        var result = formatPerMonthInDay({
          year: date[0],
          month: date[1]
        });
        this.cache[param] = result;
      }

      return this.cache[param];
    });

    _defineProperty(_assertThisInitialized(_this), "onClickDay", function (disabled, e) {
      var value = e.target.dataset.value;

      if (disabled) {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat;
      var formatDate = dayjs(new Date(value)).format(dateFormat);
      onChange(formatDate);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthItem", function () {
      var _this$props2 = _this.props,
          showYear = _this$props2.showYear,
          showMonth = _this$props2.showMonth,
          prefixCls = _this$props2.prefixCls,
          currentDate = _this$props2.currentDate,
          validateMinDate = _this$props2.validateMinDate,
          validateMaxDate = _this$props2.validateMaxDate,
          validateDisabled = _this$props2.validateDisabled;

      var perMonthInDay = _this.memoize(showYear + "/" + showMonth);

      var elements = formatWeek(perMonthInDay);
      var itemDaysClx = prefixCls + "-body-month";
      var todayDetail = getTodayDetail();
      var todayTime = todayDetail.fullYear + "/" + todayDetail.fullMonth + "/" + todayDetail.fullDay;
      return React.createElement("div", {
        className: itemDaysClx
      }, elements.map(function (element, index) {
        return React.createElement("div", {
          key: "week-" + index,
          className: itemDaysClx + "-week"
        }, element.map(function (dayStr) {
          var _classNames;

          var value = dayStr.value;
          var dayTime = getTimeTramp(value);
          var disabled = false;

          if (dayTime > getTimeTramp(validateMaxDate) || dayTime < getTimeTramp(validateMinDate)) {
            disabled = true;
          } else if (validateDisabled && typeof validateDisabled === 'function') {
            disabled = validateDisabled({
              dayItem: value,
              timeStamp: getTimeTramp(value),
              getTimeStamp: getTimeTramp
            });
          }

          var readOnly = !dayStr.isCurrentMonth;
          var dayStrClassNames = classNames(itemDaysClx + "-item", (_classNames = {}, _classNames[itemDaysClx + "-item-read-only"] = readOnly, _classNames[itemDaysClx + "-item-today"] = dayTime === getTimeTramp(todayTime), _classNames[itemDaysClx + "-item-selected"] = dayTime === getTimeTramp(currentDate) && !readOnly, _classNames[itemDaysClx + "-item-disabled"] = disabled, _classNames));
          return React.createElement("span", {
            key: value,
            "data-value": value,
            "data-disabled": dayStr === null,
            className: dayStrClassNames,
            onClick: partial(_this.onClickDay, disabled)
          }, React.createElement("span", {
            "data-value": value,
            "data-disabled": dayStr === null
          }, dayStr ? dayStr.label : ''));
        }));
      }));
    });

    return _this;
  }

  var _proto = DayItemRender.prototype;

  _proto.render = function render() {
    return this.renderMonthItem();
  };

  return DayItemRender;
}(PureComponent);

_defineProperty(DayItemRender, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  showYear: PropTypes.number,
  showMonth: PropTypes.number,
  onChange: PropTypes.func,
  dateFormat: PropTypes.string.isRequired,
  currentDate: PropTypes.string.isRequired,
  validateMinDate: PropTypes.string.isRequired,
  validateMaxDate: PropTypes.string.isRequired,
  validateDisabled: PropTypes.func
});

_defineProperty(DayItemRender, "defaultProps", {
  onChange: function onChange() {}
});

export { DayItemRender as default };