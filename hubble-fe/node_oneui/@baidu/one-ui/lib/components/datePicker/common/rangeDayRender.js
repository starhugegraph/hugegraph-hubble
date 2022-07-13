"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _miniStore = require("mini-store");

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _weekRender = _interopRequireDefault(require("./weekRender"));

var _rangeDayItemRender = _interopRequireDefault(require("./rangeDayItemRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
        prefixCls = _this$props.prefixCls,
        type = _this$props.type,
        endDatePanelType = _this$props.endDatePanelType,
        endDateShowYear = _this$props.endDateShowYear,
        endDateShowMonth = _this$props.endDateShowMonth,
        currentDate = _this$props.currentDate;
    var currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;

    if (currentPanelType === 'month') {
      return null;
    }

    var bodyContainerClassName = prefixCls + "-day-container";
    var otherProps = {
      beginDate: currentDate[0] || '',
      endDate: currentDate[1] || ''
    };

    if (type === 'nextMultiple') {
      otherProps = _extends({}, otherProps, {
        showYear: endDateShowYear,
        showMonth: endDateShowMonth
      });
    }

    return _react["default"].createElement("div", {
      className: bodyContainerClassName
    }, _react["default"].createElement(_weekRender["default"], this.props), _react["default"].createElement(_rangeDayItemRender["default"], _extends({}, this.props, otherProps)));
  };

  return DayItemRender;
}(_react.PureComponent);

_defineProperty(DayItemRender, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  panelType: _propTypes["default"].string.isRequired,
  currentDate: _propTypes["default"].array.isRequired,
  type: _propTypes["default"].string.isRequired,
  endDatePanelType: _propTypes["default"].string.isRequired,
  endDateShowMonth: _propTypes["default"].number.isRequired,
  endDateShowYear: _propTypes["default"].number.isRequired
});

(0, _reactLifecyclesCompat.polyfill)(DayItemRender);

var _default = (0, _miniStore.connect)(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    panelType: state.panelType,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    endDatePanelType: state.endDatePanelType
  };
})(DayItemRender);

exports["default"] = _default;
module.exports = exports.default;