"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Input =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Input, _PureComponent);

  function Input(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChangeInput", function (type, e) {
      var value = e.target.value;
      var _this$props = _this.props,
          dateFormat = _this$props.dateFormat,
          onChange = _this$props.onChange,
          multiple = _this$props.multiple,
          validateMaxDate = _this$props.validateMaxDate,
          validateMinDate = _this$props.validateMinDate,
          inputType = _this$props.inputType,
          validateDisabled = _this$props.validateDisabled;
      var _this$state = _this.state,
          endDate = _this$state.endDate,
          beginDate = _this$state.beginDate;
      var reg = /^[\d/.///-]*$/;

      if (!reg.test(value)) {
        return;
      }

      var newState = {};

      if (type === 'beginDate') {
        newState = {
          beginDate: value
        };
      } else if (type === 'endDate') {
        newState = {
          endDate: value
        };
      }

      _this.setState(newState);

      if (validateDisabled && typeof validateDisabled === 'function') {
        if (validateDisabled({
          dayItem: value,
          timeStamp: (0, _datePickerTools.getTimeTramp)(value),
          getTimeStamp: _datePickerTools.getTimeTramp
        })) {
          return;
        }
      }

      if (newState.endDate) {
        var endDateTimeTramp = (0, _datePickerTools.getTimeTramp)(newState.endDate);

        if (endDateTimeTramp < (0, _datePickerTools.getTimeTramp)(validateMinDate) || endDateTimeTramp > (0, _datePickerTools.getTimeTramp)(validateMaxDate)) {
          return;
        }
      }

      if (newState.beginDate) {
        var beginDateTimeTramp = (0, _datePickerTools.getTimeTramp)(newState.beginDate);

        if (beginDateTimeTramp < (0, _datePickerTools.getTimeTramp)(validateMinDate) || beginDateTimeTramp > (0, _datePickerTools.getTimeTramp)(validateMaxDate)) {
          return;
        }
      }

      value = value.replace(/\./g, '/');
      var timeArray = value.split('/');

      if (timeArray.length === 1) {
        timeArray = value.split('-');
      }

      if ((0, _datePickerTools.getTimeStamp)(value) && inputType !== 'month' && timeArray.length === 3 && ("" + timeArray[1]).length === 2 && ("" + timeArray[2]).length === 2 && (0, _datePickerTools.monthDayRange)(timeArray[0])[timeArray[1] - 1] && +timeArray[2] <= (0, _datePickerTools.monthDayRange)(timeArray[0])[timeArray[1] - 1]) {
        // 合法时间戳的话，并且日期为标准的XXXX/XX/XX格式，则实时修改
        var formatDate = (0, _dayjs["default"])(new Date(value)).format(dateFormat);

        if (!multiple && (0, _datePickerTools.getTimeTramp)(value) <= (0, _datePickerTools.getTimeTramp)(validateMaxDate) && (0, _datePickerTools.getTimeTramp)(value) >= (0, _datePickerTools.getTimeTramp)(validateMinDate)) {
          onChange(formatDate, false);
        } else if (type === 'beginDate' && (0, _datePickerTools.getTimeTramp)(value) < (0, _datePickerTools.getTimeTramp)(endDate) && (0, _datePickerTools.getTimeTramp)(value) >= (0, _datePickerTools.getTimeTramp)(validateMinDate)) {
          var endDateFormat = endDate ? (0, _dayjs["default"])(new Date(endDate)).format(dateFormat) : '';
          onChange([formatDate, endDateFormat], false);
        } else if (type === 'endDate' && (0, _datePickerTools.getTimeTramp)(value) > (0, _datePickerTools.getTimeTramp)(beginDate) && (0, _datePickerTools.getTimeTramp)(value) <= (0, _datePickerTools.getTimeTramp)(validateMaxDate)) {
          var beginDateFormat = beginDate ? (0, _dayjs["default"])(new Date(beginDate)).format(dateFormat) : '';
          onChange([beginDateFormat, formatDate], false);
        }
      }

      if (inputType === 'month' && timeArray.length === 2 && ("" + timeArray[1]).length === 2 && +timeArray[1] < 13 && (0, _datePickerTools.getTimeTramp)(value) <= (0, _datePickerTools.getTimeTramp)(validateMaxDate) && (0, _datePickerTools.getTimeTramp)(value) >= (0, _datePickerTools.getTimeTramp)(validateMinDate)) {
        var _formatDate = (0, _dayjs["default"])(new Date(value)).format(dateFormat);

        onChange(_formatDate, false);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderInput", function () {
      var inputProps = {
        value: _this.state.beginDate,
        onChange: (0, _partial["default"])(_this.onChangeInput, 'beginDate'),
        placeholder: '请输入日期'
      };
      return _react["default"].createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, _react["default"].createElement("input", inputProps));
    });

    _defineProperty(_assertThisInitialized(_this), "renderMultipleInput", function () {
      var prefixCls = _this.props.prefixCls;
      var _this$state2 = _this.state,
          beginDate = _this$state2.beginDate,
          endDate = _this$state2.endDate;
      var beginInputProps = {
        value: beginDate || '',
        onChange: (0, _partial["default"])(_this.onChangeInput, 'beginDate'),
        placeholder: '请输入日期'
      };
      var endInputProps = {
        value: endDate || '',
        onChange: (0, _partial["default"])(_this.onChangeInput, 'endDate'),
        placeholder: '请输入日期'
      };
      var containerClassNames = prefixCls + "-input-multiple";
      return _react["default"].createElement("div", {
        className: containerClassNames
      }, _react["default"].createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, _react["default"].createElement("input", beginInputProps)), _react["default"].createElement("span", null, " ~ "), _react["default"].createElement("div", {
        className: _this.props.prefixCls + "-input-container"
      }, _react["default"].createElement("input", endInputProps)));
    });

    var _value = props.value,
        _dateFormat = props.dateFormat;

    var _formatMultipleDate = (0, _datePickerTools.formatMultipleDate)(_value, _dateFormat),
        _beginDate = _formatMultipleDate.beginDate,
        _endDate = _formatMultipleDate.endDate;

    _this.state = {
      beginDate: _beginDate,
      endDate: _endDate,
      prevProps: _this.props
    };
    return _this;
  }

  var _proto = Input.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        multiple = _this$props2.multiple;
    var inputClassNames = prefixCls + "-input";
    return _react["default"].createElement("div", {
      className: inputClassNames
    }, multiple ? this.renderMultipleInput() : this.renderInput());
  };

  return Input;
}(_react.PureComponent);

_defineProperty(Input, "propTypes", {
  value: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].string]).isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  dateFormat: _propTypes["default"].string.isRequired,
  visible: _propTypes["default"].bool.isRequired,
  onChange: _propTypes["default"].func,
  multiple: _propTypes["default"].bool,
  validateMinDate: _propTypes["default"].string,
  validateMaxDate: _propTypes["default"].string,
  inputType: _propTypes["default"].string,
  validateDisabled: _propTypes["default"].func
});

_defineProperty(Input, "defaultProps", {
  onChange: function onChange() {},
  multiple: false
});

_defineProperty(Input, "getDerivedStateFromProps", function (nextProps, prevState) {
  var prevProps = prevState.prevProps;

  if ('value' in nextProps && nextProps.value !== prevProps.value || nextProps.visible !== prevProps.visible) {
    var value = nextProps.value,
        dateFormat = nextProps.dateFormat;

    var _formatMultipleDate2 = (0, _datePickerTools.formatMultipleDate)(value, dateFormat),
        beginDate = _formatMultipleDate2.beginDate,
        endDate = _formatMultipleDate2.endDate;

    return {
      beginDate: beginDate,
      endDate: endDate,
      prevProps: nextProps
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Input);

var _default = (0, _miniStore.connect)(function (state) {
  return {
    value: state._value,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate
  };
})(Input);

exports["default"] = _default;
module.exports = exports.default;