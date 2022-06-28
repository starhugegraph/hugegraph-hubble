"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../../icon"));

var _core = _interopRequireDefault(require("../../../core"));

var _button = _interopRequireDefault(require("../../button"));

var _tooltip = _interopRequireDefault(require("../../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _tools$calendar = _core["default"].calendar,
    getDetailDate = _tools$calendar.getDetailDate,
    getTodayStr = _tools$calendar.getTodayStr,
    formatTwoDateInOrder = _tools$calendar.formatTwoDateInOrder;

var CalendarHeader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CalendarHeader, _PureComponent);

  function CalendarHeader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangeTitle", function () {
      var _this$props = _this.props,
          mode = _this$props.mode,
          onChangeTitle = _this$props.onChangeTitle;
      var newMode = mode === 'date' ? 'month' : 'date';

      if (onChangeTitle) {
        onChangeTitle(newMode);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToNextMonth", function () {
      var _this$state = _this.state,
          currentYear = _this$state.currentYear,
          currentMonth = _this$state.currentMonth;
      var newCurrentMonth = currentMonth + 1;
      var newCurrentYear = currentYear;

      if (newCurrentMonth === 13) {
        newCurrentMonth = 1;
        newCurrentYear++;
      }

      var onChangePage = _this.props.onChangePage;

      if (onChangePage) {
        onChangePage({
          currentMonth: newCurrentMonth,
          currentYear: newCurrentYear
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onGoToPrevMonth", function () {
      var _this$state2 = _this.state,
          currentYear = _this$state2.currentYear,
          currentMonth = _this$state2.currentMonth;
      var newCurrentMonth = currentMonth - 1;
      var newCurrentYear = currentYear;

      if (newCurrentMonth === 0) {
        newCurrentMonth = 12;
        newCurrentYear--;
      }

      var onChangePage = _this.props.onChangePage;

      if (onChangePage) {
        onChangePage({
          currentMonth: newCurrentMonth,
          currentYear: newCurrentYear
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "canShowNextIcon", function () {
      var _this$state3 = _this.state,
          currentYear = _this$state3.currentYear,
          currentMonth = _this$state3.currentMonth;
      var _this$props2 = _this.props,
          canSelectFuture = _this$props2.canSelectFuture,
          validateMaxDate = _this$props2.validateMaxDate;
      var todayStr = getTodayStr();
      var validateDay = canSelectFuture ? validateMaxDate : formatTwoDateInOrder({
        minDate: todayStr,
        maxDate: validateMaxDate
      }).minDate;
      var validateMaxDateObj = getDetailDate(validateDay);
      var showNextIcon = !(validateMaxDateObj.fullYear === currentYear && currentMonth === validateMaxDateObj.fullMonth);
      return showNextIcon;
    });

    _this.state = {
      currentYear: props.currentYear,
      currentMonth: props.currentMonth,
      mode: props.mode
    };
    return _this;
  }

  var _proto = CalendarHeader.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('currentYear' in nextProps) {
      this.setState({
        currentYear: nextProps.currentYear
      });
    }

    if ('currentMonth' in nextProps) {
      this.setState({
        currentMonth: nextProps.currentMonth
      });
    }

    if ('mode' in nextProps) {
      this.setState({
        mode: nextProps.mode
      });
    }
  };

  _proto.render = function render() {
    var _classNames;

    var prefixCls = this.props.prefixCls;
    var _this$state4 = this.state,
        currentYear = _this$state4.currentYear,
        currentMonth = _this$state4.currentMonth,
        mode = _this$state4.mode;
    var validateMinDate = this.props.validateMinDate;
    var angleCls = (0, _classnames["default"])(prefixCls + "-angle", (_classNames = {}, _classNames[prefixCls + "-angle-open"] = mode === 'month', _classNames));
    var showNextIcon = this.canShowNextIcon();
    var showPrevIcon = true;
    var validateMinDateObj = getDetailDate(validateMinDate);

    if (validateMinDateObj.fullYear === currentYear && currentMonth === validateMinDateObj.fullMonth) {
      showPrevIcon = false;
    }

    return _react["default"].createElement("div", {
      className: "" + prefixCls
    }, _react["default"].createElement("span", {
      className: prefixCls + "-container",
      onClick: this.onChangeTitle
    }, _react["default"].createElement("span", {
      className: prefixCls + "-title"
    }, currentYear, "\u5E74", currentMonth, "\u6708"), _react["default"].createElement("span", {
      className: angleCls
    }, _react["default"].createElement(_icon["default"], {
      type: "angle-down"
    }))), _react["default"].createElement("span", {
      className: prefixCls + "-page"
    }, showPrevIcon ? _react["default"].createElement(_tooltip["default"], {
      placement: "top",
      title: "\u4E0A\u6708"
    }, _react["default"].createElement(_button["default"], {
      className: prefixCls + "-page-prev",
      onClick: this.onGoToPrevMonth
    }, _react["default"].createElement(_icon["default"], {
      type: "angle-left"
    }))) : null, showNextIcon ? _react["default"].createElement(_tooltip["default"], {
      placement: "top",
      title: "\u4E0B\u6708"
    }, _react["default"].createElement(_button["default"], {
      className: prefixCls + "-page-next",
      onClick: this.onGoToNextMonth
    }, _react["default"].createElement(_icon["default"], {
      type: "angle-right"
    }))) : null));
  };

  return CalendarHeader;
}(_react.PureComponent);

exports["default"] = CalendarHeader;

_defineProperty(CalendarHeader, "propTypes", {
  currentYear: _propTypes["default"].number,
  currentMonth: _propTypes["default"].number,
  onChangeTitle: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  mode: _propTypes["default"].string.isRequired,
  // 日期模式: date 月份模式 month
  onChangePage: _propTypes["default"].func,
  validateMinDate: _propTypes["default"].string,
  validateMaxDate: _propTypes["default"].string,
  canSelectFuture: _propTypes["default"].bool
});

_defineProperty(CalendarHeader, "defaultProps", {
  prefixCls: 'new-fc-one-calendar-header'
});

module.exports = exports.default;