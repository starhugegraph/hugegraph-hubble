function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
var DAYS_PER_WEEK = ['一', '二', '三', '四', '五', '六', '日'];

var CalendarBodyHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CalendarBodyHeader, _PureComponent);

  function CalendarBodyHeader() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = CalendarBodyHeader.prototype;

  _proto.render = function render() {
    var prefixCls = this.props.prefixCls;
    return React.createElement("div", {
      className: prefixCls + "-date-head"
    }, DAYS_PER_WEEK.map(function (day, index) {
      return React.createElement("span", {
        key: index,
        className: prefixCls + "-date-head-week"
      }, day);
    }));
  };

  return CalendarBodyHeader;
}(PureComponent);

_defineProperty(CalendarBodyHeader, "propTypes", {
  prefixCls: PropTypes.string
});

export { CalendarBodyHeader as default };