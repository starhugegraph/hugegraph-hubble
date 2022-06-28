function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import Calendar from './calendar';

var FormCalendar =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FormCalendar, _PureComponent);

  function FormCalendar(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "formatDateObj", function (value) {
      var date;

      try {
        date = JSON.parse(value);
      } catch (e) {
        date = {};
      }

      return date;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (obj) {
      _this.props.onChange(JSON.stringify(obj));
    });

    _this.state = {
      value: props.value
    };
    return _this;
  }

  var _proto = FormCalendar.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        value = _this$props.value,
        defaultValue = _this$props.defaultValue;
    var defaultDate = this.formatDateObj(defaultValue);
    var date = this.formatDateObj(value);
    var newProps = {
      beginDate: date.beginTime || date.beginDate || '',
      endDate: date.endTime || date.endDate || '',
      compareBeginDate: date.compareBeginTime || date.compareBeginDate || '',
      compareEndDate: date.compareEndTime || date.compareEndDate || '',
      defaultBeginDate: defaultDate.defaultBeginTime || defaultDate.defaultBeginDate || '',
      defaultEndDate: defaultDate.defaultEndTime || defaultDate.defaultEndDate || '',
      defaultCompareBeginDate: defaultDate.defaultCompareBeginTime || defaultDate.defaultCompareBeginDate || '',
      defaultCompareEndDate: defaultDate.defaultCompareEndTime || defaultDate.defaultCompareEndDate || ''
    };
    return React.createElement(Calendar, _extends({}, this.props, newProps, {
      onChange: this.onChange
    }));
  };

  return FormCalendar;
}(PureComponent);

_defineProperty(FormCalendar, "propTypes", {
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
});

_defineProperty(FormCalendar, "defaultProps", {
  defaultValue: '',
  value: '',
  onChange: function onChange() {}
});

_defineProperty(FormCalendar, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('value' in nextProps && nextProps.value !== prevState.value) {
    return {
      value: nextProps.value
    };
  }

  return null;
});

polyfill(FormCalendar);
export default FormCalendar;