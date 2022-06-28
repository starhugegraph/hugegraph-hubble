"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _calendarTimeHeader = _interopRequireDefault(require("./calendarTimeHeader"));

var _calendarTimeBody = _interopRequireDefault(require("./calendarTimeBody"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    return _react["default"].createElement("div", {
      className: prefixCls + "-time",
      ref: this.getContainerRef
    }, _react["default"].createElement(_calendarTimeHeader["default"], props), _react["default"].createElement(_calendarTimeBody["default"], _extends({}, props, {
      ref: this.getTimeBodyRef
    })));
  };

  return CalendarBody;
}(_react.Component);

exports["default"] = CalendarBody;

_defineProperty(CalendarBody, "propTypes", {
  mode: _propTypes["default"].string.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  timeObj: _propTypes["default"].object.isRequired,
  onSelectTime: _propTypes["default"].func.isRequired,
  timeRules: _propTypes["default"].number.isRequired
});

module.exports = exports.default;