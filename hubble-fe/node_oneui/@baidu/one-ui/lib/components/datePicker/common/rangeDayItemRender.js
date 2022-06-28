"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RangeDayItemRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RangeDayItemRender, _PureComponent);

  function RangeDayItemRender() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "cache", {});

    _defineProperty(_assertThisInitialized(_this), "memoize", function (param) {
      if (!this.cache[param]) {
        var date = param.split('/');
        var result = (0, _datePickerTools.formatPerMonthInDay)({
          year: date[0],
          month: date[1]
        });
        this.cache[param] = result;
      }

      return this.cache[param];
    });

    _defineProperty(_assertThisInitialized(_this), "onClickDay", function (obj, e) {
      var disabled = obj.disabled,
          readOnly = obj.readOnly;
      var value = e.target.dataset.value;

      if (disabled) {
        return;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat;
      var formatDate = (0, _dayjs["default"])(new Date(value)).format(dateFormat);
      onChange(formatDate, readOnly);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (obj) {
      var value = obj.value,
          disabled = obj.disabled;

      if (disabled) {
        return;
      }

      _this.props.onMouseEnter(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (obj) {
      var value = obj.value,
          disabled = obj.disabled;

      if (disabled) {
        return;
      }

      _this.props.onMouseLeave(value);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMonthItem", function () {
      var _this$props2 = _this.props,
          showYear = _this$props2.showYear,
          showMonth = _this$props2.showMonth,
          prefixCls = _this$props2.prefixCls,
          beginDate = _this$props2.beginDate,
          validateMinDate = _this$props2.validateMinDate,
          validateMaxDate = _this$props2.validateMaxDate,
          endDate = _this$props2.endDate,
          hoverDate = _this$props2.hoverDate,
          validateDisabled = _this$props2.validateDisabled;

      var perMonthInDay = _this.memoize(showYear + "/" + showMonth);

      var elements = (0, _datePickerTools.formatWeek)(perMonthInDay);
      var itemDaysClx = prefixCls + "-body-month";
      var todayDetail = (0, _datePickerTools.getTodayDetail)();
      var todayTime = todayDetail.fullYear + "/" + todayDetail.fullMonth + "/" + todayDetail.fullDay;
      return _react["default"].createElement("div", {
        className: itemDaysClx
      }, elements.map(function (element, index) {
        return _react["default"].createElement("div", {
          key: "week-" + index,
          className: itemDaysClx + "-week"
        }, element.map(function (dayStr) {
          var _classNames;

          var value = dayStr.value;
          var dayTime = (0, _datePickerTools.getTimeTramp)(value);
          var disabled = false;

          if (dayTime > (0, _datePickerTools.getTimeTramp)(validateMaxDate) || dayTime < (0, _datePickerTools.getTimeTramp)(validateMinDate)) {
            disabled = true;
          } else if (validateDisabled && typeof validateDisabled === 'function') {
            disabled = validateDisabled({
              dayItem: value,
              timeStamp: (0, _datePickerTools.getTimeTramp)(value),
              getTimeStamp: _datePickerTools.getTimeTramp
            });
          }

          var readOnly = !dayStr.isCurrentMonth;
          var dayStrClassNames = (0, _classnames["default"])(itemDaysClx + "-item", (_classNames = {}, _classNames[itemDaysClx + "-item-read-only"] = readOnly, _classNames[itemDaysClx + "-item-today"] = dayTime === (0, _datePickerTools.getTimeTramp)(todayTime), _classNames[itemDaysClx + "-item-selected"] = (beginDate && dayTime === (0, _datePickerTools.getTimeTramp)(beginDate) || endDate && dayTime === (0, _datePickerTools.getTimeTramp)(endDate)) && !readOnly, _classNames[itemDaysClx + "-item-disabled"] = disabled, _classNames[itemDaysClx + "-item-range"] = dayTime < (0, _datePickerTools.getTimeTramp)(endDate) && dayTime > (0, _datePickerTools.getTimeTramp)(beginDate) && !readOnly && !disabled || hoverDate && dayTime <= (0, _datePickerTools.getTimeTramp)(hoverDate) && dayTime > (0, _datePickerTools.getTimeTramp)(beginDate) && !readOnly && !disabled || hoverDate && dayTime >= (0, _datePickerTools.getTimeTramp)(hoverDate) && dayTime < (0, _datePickerTools.getTimeTramp)(beginDate) && !readOnly && !disabled, _classNames[itemDaysClx + "-item-selected-prev"] = beginDate && dayTime === (0, _datePickerTools.getTimeTramp)(beginDate) && !readOnly, _classNames[itemDaysClx + "-item-selected-next"] = endDate && dayTime === (0, _datePickerTools.getTimeTramp)(endDate) && !readOnly, _classNames));
          return _react["default"].createElement("span", {
            key: value,
            "data-value": value,
            "data-disabled": dayStr === null,
            className: dayStrClassNames,
            onClick: (0, _partial["default"])(_this.onClickDay, {
              disabled: disabled,
              readOnly: readOnly
            }),
            onMouseEnter: (0, _partial["default"])(_this.onMouseEnter, {
              disabled: disabled,
              value: value
            }),
            onMouseLeave: (0, _partial["default"])(_this.onMouseLeave, {
              disabled: disabled,
              value: value
            })
          }, _react["default"].createElement("span", {
            "data-value": value,
            "data-disabled": dayStr === null
          }, dayStr ? dayStr.label : ''));
        }));
      }));
    });

    return _this;
  }

  var _proto = RangeDayItemRender.prototype;

  _proto.render = function render() {
    return this.renderMonthItem();
  };

  return RangeDayItemRender;
}(_react.PureComponent);

exports["default"] = RangeDayItemRender;

_defineProperty(RangeDayItemRender, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  showYear: _propTypes["default"].number,
  showMonth: _propTypes["default"].number,
  onChange: _propTypes["default"].func,
  dateFormat: _propTypes["default"].string.isRequired,
  validateMinDate: _propTypes["default"].string.isRequired,
  validateMaxDate: _propTypes["default"].string.isRequired,
  endDate: _propTypes["default"].string,
  beginDate: _propTypes["default"].string,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  hoverDate: _propTypes["default"].string.isRequired,
  validateDisabled: _propTypes["default"].func
});

_defineProperty(RangeDayItemRender, "defaultProps", {
  onChange: function onChange() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {}
});

module.exports = exports.default;