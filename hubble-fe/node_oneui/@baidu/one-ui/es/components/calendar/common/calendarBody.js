function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CalendarBodyHeader from './calendarBodyHeader';
import CalendarBodyData from './calendarBodyData';
import CalendarBodyMonth from './calendarBodyMonth';

var CalendarBody =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CalendarBody, _PureComponent);

  function CalendarBody(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getContainerRef", function (ref) {
      _this.containerRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyRef", function (ref) {
      _this.bodyRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "renderDateMode", function () {
      var _classNames;

      var props = _this.props;
      var prefixCls = props.prefixCls;
      var mode = _this.state.mode;
      var dateCls = classNames(prefixCls + "-date", (_classNames = {}, _classNames[prefixCls + "-date-hidden"] = mode === 'month', _classNames));
      return React.createElement("div", {
        className: dateCls,
        ref: _this.getContainerRef
      }, React.createElement(CalendarBodyHeader, {
        prefixCls: prefixCls
      }), React.createElement(CalendarBodyData, _extends({}, props, {
        ref: _this.getBodyRef
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthMode", function () {
      var _classNames2;

      var props = _this.props;
      var prefixCls = props.prefixCls;
      var mode = _this.state.mode;
      var dateCls = classNames(prefixCls + "-date", (_classNames2 = {}, _classNames2[prefixCls + "-date-hidden"] = mode !== 'month', _classNames2));
      return React.createElement("div", {
        className: dateCls,
        ref: _this.getContainerRef
      }, React.createElement(CalendarBodyMonth, _extends({}, props, {
        mode: mode
      })));
    });

    _this.state = {
      mode: _props.mode
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
  };

  _proto.render = function render() {
    return React.createElement("div", null, this.renderMonthMode(), this.renderDateMode());
  };

  return CalendarBody;
}(PureComponent);

_defineProperty(CalendarBody, "propTypes", {
  mode: PropTypes.string
});

_defineProperty(CalendarBody, "defaultProps", {
  mode: 'date'
});

export { CalendarBody as default };