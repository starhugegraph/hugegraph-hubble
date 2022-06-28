"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return _react["default"].createElement("div", {
      className: prefixCls + "-date-head"
    }, DAYS_PER_WEEK.map(function (day, index) {
      return _react["default"].createElement("span", {
        key: index,
        className: prefixCls + "-date-head-week"
      }, day);
    }));
  };

  return CalendarBodyHeader;
}(_react.PureComponent);

exports["default"] = CalendarBodyHeader;

_defineProperty(CalendarBodyHeader, "propTypes", {
  prefixCls: _propTypes["default"].string
});

module.exports = exports.default;