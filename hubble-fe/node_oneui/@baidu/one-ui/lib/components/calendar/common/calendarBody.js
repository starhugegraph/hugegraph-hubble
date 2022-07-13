"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _calendarBodyHeader = _interopRequireDefault(require("./calendarBodyHeader"));

var _calendarBodyData = _interopRequireDefault(require("./calendarBodyData"));

var _calendarBodyMonth = _interopRequireDefault(require("./calendarBodyMonth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var dateCls = (0, _classnames["default"])(prefixCls + "-date", (_classNames = {}, _classNames[prefixCls + "-date-hidden"] = mode === 'month', _classNames));
      return _react["default"].createElement("div", {
        className: dateCls,
        ref: _this.getContainerRef
      }, _react["default"].createElement(_calendarBodyHeader["default"], {
        prefixCls: prefixCls
      }), _react["default"].createElement(_calendarBodyData["default"], _extends({}, props, {
        ref: _this.getBodyRef
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthMode", function () {
      var _classNames2;

      var props = _this.props;
      var prefixCls = props.prefixCls;
      var mode = _this.state.mode;
      var dateCls = (0, _classnames["default"])(prefixCls + "-date", (_classNames2 = {}, _classNames2[prefixCls + "-date-hidden"] = mode !== 'month', _classNames2));
      return _react["default"].createElement("div", {
        className: dateCls,
        ref: _this.getContainerRef
      }, _react["default"].createElement(_calendarBodyMonth["default"], _extends({}, props, {
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
    return _react["default"].createElement("div", null, this.renderMonthMode(), this.renderDateMode());
  };

  return CalendarBody;
}(_react.PureComponent);

exports["default"] = CalendarBody;

_defineProperty(CalendarBody, "propTypes", {
  mode: _propTypes["default"].string
});

_defineProperty(CalendarBody, "defaultProps", {
  mode: 'date'
});

module.exports = exports.default;