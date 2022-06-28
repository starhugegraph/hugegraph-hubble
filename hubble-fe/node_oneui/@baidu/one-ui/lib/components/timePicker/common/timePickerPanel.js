"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

var _pickTimeTools = require("../../../core/pickTimeTools");

var _timeSelecter = _interopRequireDefault(require("./timeSelecter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    return _react["default"].createElement(_timeSelecter["default"], {
      prefixCls: prefixCls,
      options: hourOptionsAdj.map(function (option) {
        return (0, _pickTimeTools.formatOption)(option, disabledOptions);
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
    return _react["default"].createElement(_timeSelecter["default"], {
      prefixCls: prefixCls,
      options: minuteOptions.map(function (option) {
        return (0, _pickTimeTools.formatOption)(option, disabledOptions);
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
    return _react["default"].createElement(_timeSelecter["default"], {
      prefixCls: prefixCls,
      options: secondOptions.map(function (option) {
        return (0, _pickTimeTools.formatOption)(option, disabledOptions);
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
    return _react["default"].createElement(_timeSelecter["default"], {
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
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefixCls + "-inner"] = true, _classNames))
    }, _react["default"].createElement("div", {
      className: prefixCls + "-combobox"
    }, this.getHourSelect(value.hour()), this.getMinuteSelect(value.minute()), this.getSecondSelect(value.second()), this.getAMPMSelect(value.hour())));
  };

  return TimePickerPanel;
}(_react.Component);

exports["default"] = TimePickerPanel;

_defineProperty(TimePickerPanel, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  defaultOpenValue: _propTypes["default"].object,
  value: _propTypes["default"].object,
  format: _propTypes["default"].string,
  disabledHours: _propTypes["default"].func,
  disabledMinutes: _propTypes["default"].func,
  disabledSeconds: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onAmPmChange: _propTypes["default"].func,
  showHour: _propTypes["default"].bool,
  showMinute: _propTypes["default"].bool,
  showSecond: _propTypes["default"].bool,
  use12Hours: _propTypes["default"].bool,
  toNearestValidTime: _propTypes["default"].func,
  onCurrentSelectPanelChange: _propTypes["default"].func,
  onEsc: _propTypes["default"].func,
  hourOptions: _propTypes["default"].array,
  minuteOptions: _propTypes["default"].array,
  secondOptions: _propTypes["default"].array,
  isAM: _propTypes["default"].bool
});

_defineProperty(TimePickerPanel, "defaultProps", {
  prefixCls: 'rc-time-picker-panel',
  onChange: _pickTimeTools.noop,
  disabledHours: _pickTimeTools.noop,
  disabledMinutes: _pickTimeTools.noop,
  disabledSeconds: _pickTimeTools.noop,
  defaultOpenValue: (0, _moment["default"])(),
  use12Hours: false,
  onEsc: _pickTimeTools.noop,
  toNearestValidTime: _pickTimeTools.noop,
  onCurrentSelectPanelChange: _pickTimeTools.noop,
  className: ''
});

module.exports = exports.default;