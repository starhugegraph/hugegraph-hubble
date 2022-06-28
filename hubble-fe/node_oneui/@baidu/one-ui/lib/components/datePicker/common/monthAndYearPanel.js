"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _miniStore = require("mini-store");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _yearPanel = _interopRequireDefault(require("./yearPanel"));

var _monthPanel = _interopRequireDefault(require("./monthPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PanelRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PanelRender, _PureComponent);

  function PanelRender() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = PanelRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        panelType = _this$props.panelType,
        endDatePanelType = _this$props.endDatePanelType,
        _this$props$multiple = _this$props.multiple,
        multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
        type = _this$props.type;

    if (!multiple && panelType === 'date') {
      return null;
    }

    if (multiple && type === 'prevMultiple' && panelType === 'date') {
      return null;
    }

    if (multiple && type === 'nextMultiple' && endDatePanelType === 'date') {
      return null;
    }

    return _react["default"].createElement("div", {
      className: prefixCls + "-panel-container"
    }, _react["default"].createElement(_yearPanel["default"], this.props), _react["default"].createElement(_monthPanel["default"], this.props));
  };

  return PanelRender;
}(_react.PureComponent);

_defineProperty(PanelRender, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  panelType: _propTypes["default"].string.isRequired,
  endDatePanelType: _propTypes["default"].string,
  multiple: _propTypes["default"].bool,
  type: _propTypes["default"].string
});

var _default = (0, _miniStore.connect)(function (state) {
  return {
    panelType: state.panelType,
    endDatePanelType: state.endDatePanelType
  };
})(PanelRender);

exports["default"] = _default;
module.exports = exports.default;