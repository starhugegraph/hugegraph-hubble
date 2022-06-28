"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _miniStore = require("mini-store");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var monthItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var MonthRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(MonthRender, _PureComponent);

  function MonthRender(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickMonth", function (_ref) {
      var month = _ref.month,
          disabled = _ref.disabled;

      if (disabled) {
        return;
      }

      var newState = {};
      var _this$props = _this.props,
          type = _this$props.type,
          isMonthRender = _this$props.isMonthRender,
          showYear = _this$props.showYear,
          dateFormat = _this$props.dateFormat;

      if (type === 'nextMultiple') {
        newState.endDateShowMonth = month;
        newState.endDatePanelType = 'date';
      } else {
        newState.showMonth = month;
        newState.panelType = isMonthRender ? 'month' : 'date';
      }

      _this.store.setState(newState);

      if (_this.props.onClickMonth) {
        var value = (0, _dayjs["default"])(showYear + "/" + month).format(dateFormat);

        _this.props.onClickMonth(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatItemClassName", function (showYear, showMonth, month) {
      var _classNames;

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          type = _this$props2.type,
          endDateShowYear = _this$props2.endDateShowYear,
          endDateShowMonth = _this$props2.endDateShowMonth;
      var _this$props3 = _this.props,
          validateMinDate = _this$props3.validateMinDate,
          validateMaxDate = _this$props3.validateMaxDate;
      var range = (0, _datePickerTools.monthDayRange)(showYear);

      if (type === 'prevMultiple') {
        var endDate = endDateShowYear + "/" + (endDateShowMonth - 1) + "/01";

        if (endDateShowMonth === 1) {
          endDate = endDateShowYear - 1 + "/12/01";
        }

        if ((0, _datePickerTools.getTimeTramp)(endDate) < (0, _datePickerTools.getTimeTramp)(validateMaxDate)) {
          validateMaxDate = endDate;
        }
      } else if (type === 'nextMultiple') {
        var beginDate = _this.props.showYear + "/" + (_this.props.showMonth + 1) + "/01";

        if (_this.props.showMonth === 12) {
          beginDate = _this.props.showYear + 1 + "/01/01";
        }

        if ((0, _datePickerTools.getTimeTramp)(beginDate) > (0, _datePickerTools.getTimeTramp)(validateMinDate)) {
          validateMinDate = beginDate;
        }
      }

      var monthClassName = prefixCls + "-month-container-item";
      var currentMonthLastDay = (0, _datePickerTools.getTimeTramp)(showYear + "/" + month + "/" + range[month - 1]);
      var currentMonthFirstDay = (0, _datePickerTools.getTimeTramp)(showYear + "/" + month + "/01");
      var disabled = currentMonthLastDay < (0, _datePickerTools.getTimeTramp)(validateMinDate) || currentMonthFirstDay > (0, _datePickerTools.getTimeTramp)(validateMaxDate);
      var monthClassNames = (0, _classnames["default"])(monthClassName, (_classNames = {}, _classNames[monthClassName + "-selected"] = month === showMonth, _classNames[monthClassName + "-disabled"] = disabled, _classNames[monthClassName + "-last-row"] = month > 9, _classNames));
      return {
        disabled: disabled,
        monthClassNames: monthClassNames
      };
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonth", function () {
      var monthContainers = [];
      var _this$props4 = _this.props,
          showMonth = _this$props4.showMonth,
          showYear = _this$props4.showYear,
          endDateShowYear = _this$props4.endDateShowYear,
          endDateShowMonth = _this$props4.endDateShowMonth,
          type = _this$props4.type;
      var currentMonth = type === 'nextMultiple' ? endDateShowMonth : showMonth;
      var currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;
      monthItems.forEach(function (month) {
        var _this$formatItemClass = _this.formatItemClassName(currentYear, currentMonth, month),
            monthClassNames = _this$formatItemClass.monthClassNames,
            disabled = _this$formatItemClass.disabled;

        monthContainers.push(_react["default"].createElement("span", {
          className: monthClassNames,
          key: month,
          onClick: (0, _partial["default"])(_this.onClickMonth, {
            month: month,
            disabled: disabled
          })
        }, month + "\u6708"));
      });
      return monthContainers;
    });

    _this.store = _this.props.store;
    return _this;
  }

  var _proto = MonthRender.prototype;

  _proto.render = function render() {
    var _this$props5 = this.props,
        prefixCls = _this$props5.prefixCls,
        panelType = _this$props5.panelType,
        endDatePanelType = _this$props5.endDatePanelType,
        type = _this$props5.type;
    var currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;

    if (currentPanelType !== 'month') {
      return null;
    }

    return _react["default"].createElement("div", {
      className: prefixCls + "-month-container"
    }, this.renderMonth());
  };

  return MonthRender;
}(_react.PureComponent);

_defineProperty(MonthRender, "propTypes", {
  store: _propTypes["default"].object.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  showMonth: _propTypes["default"].number.isRequired,
  showYear: _propTypes["default"].number.isRequired,
  panelType: _propTypes["default"].string.isRequired,
  endDatePanelType: _propTypes["default"].string,
  validateMinDate: _propTypes["default"].string.isRequired,
  validateMaxDate: _propTypes["default"].string.isRequired,
  endDateShowYear: _propTypes["default"].number,
  endDateShowMonth: _propTypes["default"].number,
  type: _propTypes["default"].string,
  onClickMonth: _propTypes["default"].func,
  isMonthRender: _propTypes["default"].bool,
  dateFormat: _propTypes["default"].string.isRequired
});

var _default = (0, _miniStore.connect)(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    endDatePanelType: state.endDatePanelType,
    panelType: state.panelType
  };
})(MonthRender);

exports["default"] = _default;
module.exports = exports.default;