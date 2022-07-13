"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _weekRender = _interopRequireDefault(require("./weekRender"));

var _dayRender = _interopRequireDefault(require("./dayRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DayItemRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DayItemRender, _PureComponent);

  function DayItemRender() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = DayItemRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        panelType = _this$props.panelType,
        prefixCls = _this$props.prefixCls;

    if (panelType === 'month') {
      return null;
    }

    var bodyContainerClassName = prefixCls + "-day-container";
    return _react["default"].createElement("div", {
      className: bodyContainerClassName
    }, _react["default"].createElement(_weekRender["default"], this.props), _react["default"].createElement(_dayRender["default"], this.props));
  };

  return DayItemRender;
}(_react.PureComponent);

_defineProperty(DayItemRender, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  panelType: _propTypes["default"].string.isRequired
});

var _default = (0, _miniStore.connect)(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    panelType: state.panelType,
    currentDate: state._value,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate
  };
})(DayItemRender);

exports["default"] = _default;
module.exports = exports.default;