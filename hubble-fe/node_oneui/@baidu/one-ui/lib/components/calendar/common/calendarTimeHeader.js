"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

var _core = _interopRequireDefault(require("../../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _tools$calendar = _core["default"].calendar,
    formatHoursByString = _tools$calendar.formatHoursByString,
    allHours = _tools$calendar.allHours,
    allMinutesAndSeconds = _tools$calendar.allMinutesAndSeconds,
    formatHours = _tools$calendar.formatHours,
    rulesMapFormat = _tools$calendar.rulesMapFormat,
    rulesMap = _tools$calendar.rulesMap,
    formatTimeByRule = _tools$calendar.formatTimeByRule;
var addZero = _core["default"].pickTime.addZero;

var CalendarTimeHeader =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarTimeHeader, _Component);

  function CalendarTimeHeader(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      var keyCode = e.keyCode;
      var value = e.target.value;
      var defaultValue = _this.state.defaultValue;
      var _this$props = _this.props,
          updateInputValue = _this$props.updateInputValue,
          timeRules = _this$props.timeRules;

      if (keyCode === 13) {
        var time = addZero(value);
        var parsed = (0, _moment["default"])(time, rulesMapFormat[timeRules], true);

        if (!parsed.isValid()) {
          time = defaultValue;
        }

        _this.setState({
          value: time,
          defaultValue: time
        });

        var timeObj = formatHoursByString(time);
        updateInputValue(timeObj);

        _this.inputElement.blur();

        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getInputElement", function (ref) {
      _this.inputElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "inputOnBlur", function (e) {
      var value = e.target.value;
      var _this$props2 = _this.props,
          updateInputValue = _this$props2.updateInputValue,
          timeRules = _this$props2.timeRules;
      var defaultValue = _this.state.defaultValue;
      var time = addZero(value);
      var parsed = (0, _moment["default"])(time, rulesMapFormat[timeRules], true);

      if (!parsed.isValid()) {
        time = defaultValue;
      }

      _this.setState({
        value: time,
        defaultValue: time
      });

      var timeObj = formatHoursByString(time);
      updateInputValue(timeObj);
    });

    _defineProperty(_assertThisInitialized(_this), "changeInput", function (e) {
      var value = e.target.value;
      var timeRules = _this.props.timeRules;
      value = value.replace(/：/g, ':');
      var values = value.split(':');

      if (values[0] && values[0].length > 2 || values[1] && values[1].length > 2 || values[2] && values[2].length > 2) {
        return;
      }

      if (values[0] && allHours.indexOf(addZero(values[0])) < 0) {
        _this.setState({
          isValid: false
        });

        return;
      }

      if ((values[1] && allMinutesAndSeconds.indexOf(addZero(values[1]))) < 0 || values[2] && allMinutesAndSeconds.indexOf(addZero(values[2])) < 0) {
        _this.setState({
          isValid: false
        });

        return;
      }

      if (rulesMap.HOUR_AND_MINUTE === timeRules && values.length > 2) {
        return;
      }

      if (rulesMap.ONLY_HOUR === timeRules && values.length > 1) {
        return;
      }

      _this.setState({
        value: value
      });
    });

    var _timeObj = props.timeObj;
    var _timeRules = props.timeRules;

    var _time = JSON.stringify(props.timeObj) !== '{}' ? formatHours({
      time: _timeObj.hour + ":" + _timeObj.minute + ":" + _timeObj.second
    }) : null;

    var _value = _time ? formatTimeByRule(_time, _timeRules) : '';

    _this.state = {
      defaultValue: _value,
      value: _value,
      isValid: true
    };
    return _this;
  }

  var _proto = CalendarTimeHeader.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('timeObj' in nextProps) {
      var timeObj = nextProps.timeObj;
      var time = JSON.stringify(timeObj) !== '{}' ? formatHours({
        time: timeObj.hour + ":" + timeObj.minute + ":" + timeObj.second
      }) : null;
      var value = time ? formatTimeByRule(time, nextProps.timeRules) : '';
      this.setState({
        value: value,
        defaultValue: value
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var prefixCls = this.props.prefixCls;
    var _this$state = this.state,
        value = _this$state.value,
        isValid = _this$state.isValid;
    var inputClx = (0, _classnames["default"])(prefixCls + "-time-header", (_classNames = {}, _classNames[prefixCls + "-time-header-error"] = !isValid, _classNames));
    return _react["default"].createElement("div", {
      className: inputClx
    }, _react["default"].createElement("input", {
      ref: this.getInputElement,
      type: "text",
      className: inputClx + "-input",
      value: value,
      placeholder: value || '请选择时间',
      onChange: this.changeInput,
      max: "4",
      "data-type": "year",
      onBlur: this.inputOnBlur,
      onKeyDown: this.onKeyDown
    }));
  };

  return CalendarTimeHeader;
}(_react.Component);

exports["default"] = CalendarTimeHeader;

_defineProperty(CalendarTimeHeader, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  timeObj: _propTypes["default"].shape({
    hour: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    minute: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    second: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number])
  }).isRequired,
  updateInputValue: _propTypes["default"].func.isRequired,
  timeRules: _propTypes["default"].number.isRequired
});

module.exports = exports.default;