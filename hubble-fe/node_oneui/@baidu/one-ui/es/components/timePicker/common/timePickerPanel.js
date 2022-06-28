function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { formatOption, noop } from '../../../core/pickTimeTools';
import TimeSelecter from './timeSelecter';

var TimePickerPanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TimePickerPanel, _Component);

  function TimePickerPanel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onItemChange", function (type, itemValue) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          use12Hours = _this$props.use12Hours,
          isAM = _this$props.isAM,
          onAmPmChange = _this$props.onAmPmChange;

      var value = _this.getDefaultOpenValue().clone();

      if (type === 'hour') {
        if (use12Hours) {
          if (isAM) {
            value.hour(+itemValue % 12);
          } else {
            value.hour(+itemValue % 12 + 12);
          }
        } else {
          value.hour(+itemValue);
        }
      } else if (type === 'minute') {
        value.minute(+itemValue);
      } else if (type === 'ampm') {
        var ampm = itemValue.toUpperCase();

        if (use12Hours) {
          if (ampm === 'PM' && value.hour() < 12) {
            value.hour(value.hour() % 12 + 12);
          }

          if (ampm === 'AM') {
            if (value.hour() >= 12) {
              value.hour(value.hour() - 12);
            }
          }
        }

        onAmPmChange(ampm);
      } else {
        value.second(+itemValue);
      }

      onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onEnterSelectPanel", function (range) {
      _this.props.onCurrentSelectPanelChange(range);
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultOpenValue", function () {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          toNearestValidTime = _this$props2.toNearestValidTime,
          defaultOpenValue = _this$props2.defaultOpenValue,
          hourOptions = _this$props2.hourOptions,
          minuteOptions = _this$props2.minuteOptions,
          secondOptions = _this$props2.secondOptions;
      return value || toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions);
    });

    return _this;
  }

  var _proto = TimePickerPanel.prototype;

  _proto.getHourSelect = function getHourSelect(hour) {
    var _this2 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        hourOptions = _this$props3.hourOptions,
        disabledHours = _this$props3.disabledHours,
        showHour = _this$props3.showHour,
        use12Hours = _this$props3.use12Hours;

    if (!showHour) {
      return null;
    }

    var disabledOptions = disabledHours();
    var hourOptionsAdj;
    var hourAdj;

    if (use12Hours) {
      hourOptionsAdj = [12].concat(hourOptions.filter(function (h) {
        return h < 12 && h > 0;
      }));
      hourAdj = hour % 12 || 12;
    } else {
      hourOptionsAdj = hourOptions;
      hourAdj = hour;
    }

    return React.createElement(TimeSelecter, {
      prefixCls: prefixCls,
      options: hourOptionsAdj.map(function (option) {
        return formatOption(option, disabledOptions);
      }),
      selectedIndex: hourOptionsAdj.indexOf(hourAdj),
      type: "hour",
      onSelect: this.onItemChange,
      onMouseEnter: function onMouseEnter() {
        return _this2.onEnterSelectPanel('hour');
      }
    });
  };

  _proto.getMinuteSelect = function getMinuteSelect(minute) {
    var _this3 = this;

    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        minuteOptions = _this$props4.minuteOptions,
        disabledMinutes = _this$props4.disabledMinutes,
        showMinute = _this$props4.showMinute;

    if (!showMinute) {
      return null;
    }

    var value = this.getDefaultOpenValue();
    var disabledOptions = disabledMinutes(value.hour());
    return React.createElement(TimeSelecter, {
      prefixCls: prefixCls,
      options: minuteOptions.map(function (option) {
        return formatOption(option, disabledOptions);
      }),
      selectedIndex: minuteOptions.indexOf(minute),
      type: "minute",
      onSelect: this.onItemChange,
      onMouseEnter: function onMouseEnter() {
        return _this3.onEnterSelectPanel('minute');
      }
    });
  };

  _proto.getSecondSelect = function getSecondSelect(second) {
    var _this4 = this;

    var _this$props5 = this.props,
        prefixCls = _this$props5.prefixCls,
        secondOptions = _this$props5.secondOptions,
        disabledSeconds = _this$props5.disabledSeconds,
        showSecond = _this$props5.showSecond;

    if (!showSecond) {
      return null;
    }

    var value = this.getDefaultOpenValue();
    var disabledOptions = disabledSeconds(value.hour(), value.minute());
    return React.createElement(TimeSelecter, {
      prefixCls: prefixCls,
      options: secondOptions.map(function (option) {
        return formatOption(option, disabledOptions);
      }),
      selectedIndex: secondOptions.indexOf(second),
      type: "second",
      onSelect: this.onItemChange,
      onMouseEnter: function onMouseEnter() {
        return _this4.onEnterSelectPanel('second');
      }
    });
  };

  _proto.getAMPMSelect = function getAMPMSelect() {
    var _this5 = this;

    var _this$props6 = this.props,
        prefixCls = _this$props6.prefixCls,
        use12Hours = _this$props6.use12Hours,
        format = _this$props6.format,
        isAM = _this$props6.isAM;

    if (!use12Hours) {
      return null;
    }

    var AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
    .map(function (c) {
      return format.match(/\sA/) ? c.toUpperCase() : c;
    }).map(function (c) {
      return {
        value: c
      };
    });
    var selected = isAM ? 0 : 1;
    return React.createElement(TimeSelecter, {
      prefixCls: prefixCls,
      options: AMPMOptions,
      selectedIndex: selected,
      type: "ampm",
      onSelect: this.onItemChange,
      onMouseEnter: function onMouseEnter() {
        return _this5.onEnterSelectPanel('ampm');
      }
    });
  };

  _proto.close = function close() {
    this.props.onEsc();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props7 = this.props,
        prefixCls = _this$props7.prefixCls,
        className = _this$props7.className;
    var value = this.getDefaultOpenValue();
    return React.createElement("div", {
      className: classNames(className, (_classNames = {}, _classNames[prefixCls + "-inner"] = true, _classNames))
    }, React.createElement("div", {
      className: prefixCls + "-combobox"
    }, this.getHourSelect(value.hour()), this.getMinuteSelect(value.minute()), this.getSecondSelect(value.second()), this.getAMPMSelect(value.hour())));
  };

  return TimePickerPanel;
}(Component);

_defineProperty(TimePickerPanel, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  defaultOpenValue: PropTypes.object,
  value: PropTypes.object,
  format: PropTypes.string,
  disabledHours: PropTypes.func,
  disabledMinutes: PropTypes.func,
  disabledSeconds: PropTypes.func,
  onChange: PropTypes.func,
  onAmPmChange: PropTypes.func,
  showHour: PropTypes.bool,
  showMinute: PropTypes.bool,
  showSecond: PropTypes.bool,
  use12Hours: PropTypes.bool,
  toNearestValidTime: PropTypes.func,
  onCurrentSelectPanelChange: PropTypes.func,
  onEsc: PropTypes.func,
  hourOptions: PropTypes.array,
  minuteOptions: PropTypes.array,
  secondOptions: PropTypes.array,
  isAM: PropTypes.bool
});

_defineProperty(TimePickerPanel, "defaultProps", {
  prefixCls: 'rc-time-picker-panel',
  onChange: noop,
  disabledHours: noop,
  disabledMinutes: noop,
  disabledSeconds: noop,
  defaultOpenValue: moment(),
  use12Hours: false,
  onEsc: noop,
  toNearestValidTime: noop,
  onCurrentSelectPanelChange: noop,
  className: ''
});

export { TimePickerPanel as default };