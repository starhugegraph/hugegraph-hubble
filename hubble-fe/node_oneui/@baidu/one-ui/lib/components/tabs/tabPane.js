"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TabPane =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TabPane, _PureComponent);

  function TabPane() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = TabPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        prefixCls = _this$props.prefixCls;
    return _react["default"].createElement("div", {
      className: prefixCls + "-tabpane"
    }, children);
  };

  return TabPane;
}(_react.PureComponent);

exports["default"] = TabPane;

_defineProperty(TabPane, "propTypes", {
  children: _propTypes["default"].node,
  prefixCls: _propTypes["default"].string
});

_defineProperty(TabPane, "defaultProps", {
  children: null,
  prefixCls: 'new-fc-one-tabs'
});

module.exports = exports.default;