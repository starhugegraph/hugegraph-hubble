function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import dayjs from 'dayjs';
import { formatPerMonthInDay, getTimeTramp, getTodayDetail, formatWeek } from '../../../core/datePickerTools';

var RangeDayItemRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RangeDayItemRender, _PureComponent);

  function RangeDayItemRender() {
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

    _defineProperty(_assertThisInitialized(_this), "onClickDay", function (obj, e) {
      var disabled = obj.disabled,
          readOnly = obj.readOnly;
      var value = e.target.dataset.value;

      if (disabled) {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat;
      var formatDate = dayjs(new Date(value)).format(dateFormat);
      onChange(formatDate, readOnly);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (obj) {
      var value = obj.value,
          disabled = obj.disabled;

      if (disabled) {
        return;
      }

      _this.props.onMouseEnter(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (obj) {
      var value = obj.value,
          disabled = obj.disabled;

      if (disabled) {
        return;
      }

      _this.props.onMouseLeave(value);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthItem", function () {
      var _this$props2 = _this.props,
          showYear = _this$props2.showYear,
          showMonth = _this$props2.showMonth,
          prefixCls = _this$props2.prefixCls,
          beginDate = _this$props2.beginDate,
          validateMinDate = _this$props2.validateMinDate,
          validateMaxDate = _this$props2.validateMaxDate,
          endDate = _this$props2.endDate,
          hoverDate = _this$props2.hoverDate,
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
          var dayStrClassNames = classNames(itemDaysClx + "-item", (_classNames = {}, _classNames[itemDaysClx + "-item-read-only"] = readOnly, _classNames[itemDaysClx + "-item-today"] = dayTime === getTimeTramp(todayTime), _classNames[itemDaysClx + "-item-selected"] = (beginDate && dayTime === getTimeTramp(beginDate) || endDate && dayTime === getTimeTramp(endDate)) && !readOnly, _classNames[itemDaysClx + "-item-disabled"] = disabled, _classNames[itemDaysClx + "-item-range"] = dayTime < getTimeTramp(endDate) && dayTime > getTimeTramp(beginDate) && !readOnly && !disabled || hoverDate && dayTime <= getTimeTramp(hoverDate) && dayTime > getTimeTramp(beginDate) && !readOnly && !disabled || hoverDate && dayTime >= getTimeTramp(hoverDate) && dayTime < getTimeTramp(beginDate) && !readOnly && !disabled, _classNames[itemDaysClx + "-item-selected-prev"] = beginDate && dayTime === getTimeTramp(beginDate) && !readOnly, _classNames[itemDaysClx + "-item-selected-next"] = endDate && dayTime === getTimeTramp(endDate) && !readOnly, _classNames));
          return React.createElement("span", {
            key: value,
            "data-value": value,
            "data-disabled": dayStr === null,
            className: dayStrClassNames,
            onClick: partial(_this.onClickDay, {
              disabled: disabled,
              readOnly: readOnly
            }),
            onMouseEnter: partial(_this.onMouseEnter, {
              disabled: disabled,
              value: value
            }),
            onMouseLeave: partial(_this.onMouseLeave, {
              disabled: disabled,
              value: value
            })
          }, React.createElement("span", {
            "data-value": value,
            "data-disabled": dayStr === null
          }, dayStr ? dayStr.label : ''));
        }));
      }));
    });

    return _this;
  }

  var _proto = RangeDayItemRender.prototype;

  _proto.render = function render() {
    return this.renderMonthItem();
  };

  return RangeDayItemRender;
}(PureComponent);

_defineProperty(RangeDayItemRender, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  showYear: PropTypes.number,
  showMonth: PropTypes.number,
  onChange: PropTypes.func,
  dateFormat: PropTypes.string.isRequired,
  validateMinDate: PropTypes.string.isRequired,
  validateMaxDate: PropTypes.string.isRequired,
  endDate: PropTypes.string,
  beginDate: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  hoverDate: PropTypes.string.isRequired,
  validateDisabled: PropTypes.func
});

_defineProperty(RangeDayItemRender, "defaultProps", {
  onChange: function onChange() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {}
});

export { RangeDayItemRender as default };