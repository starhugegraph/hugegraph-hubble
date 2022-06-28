function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import tools from '../../../core';
var _tools$calendar = tools.calendar,
    formatHoursByString = _tools$calendar.formatHoursByString,
    allHours = _tools$calendar.allHours,
    allMinutesAndSeconds = _tools$calendar.allMinutesAndSeconds,
    formatHours = _tools$calendar.formatHours,
    rulesMapFormat = _tools$calendar.rulesMapFormat,
    rulesMap = _tools$calendar.rulesMap,
    formatTimeByRule = _tools$calendar.formatTimeByRule;
var addZero = tools.pickTime.addZero;

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
        var parsed = moment(time, rulesMapFormat[timeRules], true);

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
      var parsed = moment(time, rulesMapFormat[timeRules], true);

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
    var inputClx = classNames(prefixCls + "-time-header", (_classNames = {}, _classNames[prefixCls + "-time-header-error"] = !isValid, _classNames));
    return React.createElement("div", {
      className: inputClx
    }, React.createElement("input", {
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
}(Component);

_defineProperty(CalendarTimeHeader, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  timeObj: PropTypes.shape({
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    second: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  updateInputValue: PropTypes.func.isRequired,
  timeRules: PropTypes.number.isRequired
});

export { CalendarTimeHeader as default };