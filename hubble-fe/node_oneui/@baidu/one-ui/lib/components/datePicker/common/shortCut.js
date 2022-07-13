"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _dayjs = _interopRequireDefault(require("dayjs"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ShortCut =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ShortCut, _PureComponent);

  function ShortCut() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickShortCut", function (index) {
      var _this$props = _this.props,
          shortcuts = _this$props.shortcuts,
          dateFormat = _this$props.dateFormat,
          onChange = _this$props.onChange;
      var shortcut = shortcuts[index];

      var _getShortCutDate = (0, _datePickerTools.getShortCutDate)(shortcut, dateFormat),
          beginDate = _getShortCutDate.beginDate,
          endDate = _getShortCutDate.endDate;

      var currentBeginDate = beginDate;
      var currentEndDate = endDate;

      if ((0, _datePickerTools.getTimeTramp)(currentBeginDate) > (0, _datePickerTools.getTimeTramp)(currentEndDate)) {
        currentBeginDate = endDate;
        currentEndDate = beginDate;
      }

      onChange([(0, _dayjs["default"])(new Date(currentBeginDate)).format(dateFormat), (0, _dayjs["default"])(new Date(currentEndDate)).format(dateFormat)]);
    });

    return _this;
  }

  var _proto = ShortCut.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        shortcuts = _this$props2.shortcuts;
    return _react["default"].createElement("div", {
      className: prefixCls + "-short-cut"
    }, shortcuts.map(function (shortcut, index) {
      return _react["default"].createElement("div", {
        className: prefixCls + "-short-cut-item",
        onClick: (0, _partial["default"])(_this2.onClickShortCut, index),
        key: index
      }, shortcut.label);
    }));
  };

  return ShortCut;
}(_react.PureComponent);

exports["default"] = ShortCut;

_defineProperty(ShortCut, "propTypes", {
  shortcuts: _propTypes["default"].array,
  prefixCls: _propTypes["default"].string.isRequired,
  dateFormat: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func
});

_defineProperty(ShortCut, "defaultProps", {
  onChange: function onChange() {}
});

module.exports = exports.default;