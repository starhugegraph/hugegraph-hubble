function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CalendarTimeHeader from './calendarTimeHeader';
import CalendarTimeBody from './calendarTimeBody';

var CalendarBody =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarBody, _Component);

  function CalendarBody(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getContainerRef", function (ref) {
      _this.containerRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getTimeBodyRef", function (ref) {
      _this.timeBodyRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "updateInputValue", function (_ref) {
      var _ref$hour = _ref.hour,
          hour = _ref$hour === void 0 ? '00' : _ref$hour,
          _ref$minute = _ref.minute,
          minute = _ref$minute === void 0 ? '00' : _ref$minute,
          _ref$second = _ref.second,
          second = _ref$second === void 0 ? '00' : _ref$second;
      var timeObj = {
        hour: hour,
        minute: minute,
        second: second
      };

      _this.setState({
        timeObj: timeObj
      });

      var scrollFunc = _this.timeBodyRef && _this.timeBodyRef.scrollToPosition;

      if (scrollFunc) {
        scrollFunc(_extends({}, timeObj));
      }

      var onSelectTime = _this.props.onSelectTime;
      onSelectTime(timeObj);
    });

    _this.state = {
      mode: props.mode,
      timeObj: props.timeObj
    };
    return _this;
  }

  var _proto = CalendarBody.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('mode' in nextProps) {
      this.setState({
        mode: nextProps.mode
      });
    }

    if ('timeObj' in nextProps) {
      this.setState({
        timeObj: nextProps.timeObj
      });
    }
  };

  _proto.render = function render() {
    var _this$state = this.state,
        mode = _this$state.mode,
        timeObj = _this$state.timeObj;
    var prefixCls = this.props.prefixCls;

    if (mode !== 'time') {
      return null;
    }

    var props = _extends({}, this.props, {
      timeObj: timeObj,
      updateInputValue: this.updateInputValue
    });

    return React.createElement("div", {
      className: prefixCls + "-time",
      ref: this.getContainerRef
    }, React.createElement(CalendarTimeHeader, props), React.createElement(CalendarTimeBody, _extends({}, props, {
      ref: this.getTimeBodyRef
    })));
  };

  return CalendarBody;
}(Component);

_defineProperty(CalendarBody, "propTypes", {
  mode: PropTypes.string.isRequired,
  prefixCls: PropTypes.string.isRequired,
  timeObj: PropTypes.object.isRequired,
  onSelectTime: PropTypes.func.isRequired,
  timeRules: PropTypes.number.isRequired
});

export { CalendarBody as default };