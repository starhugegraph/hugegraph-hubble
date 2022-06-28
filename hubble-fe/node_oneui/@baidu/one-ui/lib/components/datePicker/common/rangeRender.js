"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _monthAndYearPanel = _interopRequireDefault(require("./monthAndYearPanel"));

var _rangeDayRender = _interopRequireDefault(require("./rangeDayRender"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RangeRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RangeRender, _PureComponent);

  function RangeRender(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onPickerDay", function (type, value, readOnly) {
      if (readOnly === void 0) {
        readOnly = false;
      }

      var _this$state = _this.state,
          step = _this$state.step,
          beginDate = _this$state.beginDate;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat,
          showYear = _this$props.showYear,
          showMonth = _this$props.showMonth,
          endDateShowYear = _this$props.endDateShowYear,
          endDateShowMonth = _this$props.endDateShowMonth;

      if (step === 0) {
        // 表示开始选择
        _this.setState({
          step: 1,
          endDate: '',
          beginDate: value
        }); // 如果点击了readOnly部分的话，修改当前面板展示的年月


        if (readOnly) {
          var _getDetailDate = (0, _datePickerTools.getDetailDate)(value),
              fullYear = _getDetailDate.fullYear,
              fullMonth = _getDetailDate.fullMonth;

          var newState = {};
          var currentFirstDate = (0, _datePickerTools.getTimeTramp)(fullYear + "/" + fullMonth + "/01");

          if (type === 'prevMultiple' && currentFirstDate !== (0, _datePickerTools.getTimeTramp)(endDateShowYear + "/" + endDateShowMonth + "/01")) {
            newState = {
              showYear: fullYear,
              showMonth: fullMonth
            };
          } else if (type === 'nextMultiple' && currentFirstDate !== (0, _datePickerTools.getTimeTramp)(showYear + "/" + showMonth + "/01")) {
            newState = {
              endDateShowYear: fullYear,
              endDateShowMonth: fullMonth
            };
          }

          _this.store.setState(newState);
        }
      } else if (step === 1) {
        var currentBeginDate = beginDate;
        var currentEndDate = value;

        if ((0, _datePickerTools.getTimeTramp)(currentBeginDate) > (0, _datePickerTools.getTimeTramp)(currentEndDate)) {
          currentBeginDate = value;
          currentEndDate = beginDate;
        }

        _this.setState({
          step: 0,
          endDate: currentEndDate,
          beginDate: currentBeginDate,
          hoverDate: ''
        });

        onChange([(0, _dayjs["default"])(new Date(currentBeginDate)).format(dateFormat), (0, _dayjs["default"])(new Date(currentEndDate)).format(dateFormat)]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (value) {
      var step = _this.state.step;

      if (step === 1) {
        _this.setState({
          hoverDate: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      _this.setState({
        hoverDate: ''
      });
    });

    var currentDate = props.currentDate;
    _this.store = _this.props.store;
    _this.state = {
      beginDate: currentDate[0] || '',
      endDate: currentDate[1] || '',
      prevProps: props,
      step: 0,
      hoverDate: ''
    };
    return _this;
  }

  RangeRender.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var prevProps = prevState.prevProps;
    var newState = {};

    if ('currentDate' in nextProps && nextProps.currentDate !== prevProps.currentDate || prevProps.visible !== nextProps.visible) {
      newState = _extends({}, newState, {
        beginDate: nextProps.currentDate[0] || '',
        endDate: nextProps.currentDate[1] || '',
        prevProps: nextProps,
        step: 0
      });
    }

    return newState;
  };

  var _proto = RangeRender.prototype;

  _proto.render = function render() {
    var containerClassName = this.props.prefixCls + "-range";
    var _this$state2 = this.state,
        beginDate = _this$state2.beginDate,
        endDate = _this$state2.endDate,
        hoverDate = _this$state2.hoverDate;
    var currentDate = [beginDate, endDate];
    return _react["default"].createElement("div", {
      className: containerClassName
    }, _react["default"].createElement("div", {
      className: containerClassName + "-item"
    }, _react["default"].createElement(_monthAndYearPanel["default"], _extends({}, this.props, {
      type: "prevMultiple"
    })), _react["default"].createElement(_rangeDayRender["default"], _extends({}, this.props, {
      type: "prevMultiple",
      currentDate: currentDate,
      onChange: (0, _partial["default"])(this.onPickerDay, 'prevMultiple'),
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      hoverDate: hoverDate
    }))), _react["default"].createElement("div", {
      className: containerClassName + "-item"
    }, _react["default"].createElement(_monthAndYearPanel["default"], _extends({}, this.props, {
      type: "nextMultiple"
    })), _react["default"].createElement(_rangeDayRender["default"], _extends({}, this.props, {
      type: "nextMultiple",
      currentDate: currentDate,
      onChange: (0, _partial["default"])(this.onPickerDay, 'nextMultiple'),
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      hoverDate: hoverDate
    }))));
  };

  return RangeRender;
}(_react.PureComponent);

_defineProperty(RangeRender, "propTypes", {
  store: _propTypes["default"].object.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  currentDate: _propTypes["default"].array.isRequired,
  onChange: _propTypes["default"].func,
  dateFormat: _propTypes["default"].string.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  endDateShowYear: _propTypes["default"].number.isRequired,
  endDateShowMonth: _propTypes["default"].number.isRequired,
  showYear: _propTypes["default"].number.isRequired,
  showMonth: _propTypes["default"].number.isRequired
});

_defineProperty(RangeRender, "defaultProps", {
  onChange: function onChange() {}
});

var _default = (0, _miniStore.connect)(function (state) {
  return {
    currentDate: state._value,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    showYear: state.showYear,
    showMonth: state.showMonth
  };
})(RangeRender);

exports["default"] = _default;
module.exports = exports.default;