"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcMenu = require("rc-menu");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(MenuItem, _PureComponent);

  function MenuItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = MenuItem.prototype;

  _proto.render = function render() {
    var inlineCollapsed = this.context.inlineCollapsed;
    var props = this.props;
    var children = props.children;

    var ItemProps = _extends({}, props);

    ItemProps.children = _react["default"].createElement("span", {
      className: props.rootPrefixCls + "-item-span"
    }, children);
    return _react["default"].createElement(_tooltip["default"], {
      title: inlineCollapsed && props.level === 1 ? props.children : '',
      placement: "right",
      overlayClassName: props.rootPrefixCls + "-inline-collapsed-tooltip"
    }, _react["default"].createElement(_rcMenu.Item, ItemProps));
  };

  return MenuItem;
}(_react.PureComponent);

exports["default"] = MenuItem;

_defineProperty(MenuItem, "isMenuItem", true);

_defineProperty(MenuItem, "contextTypes", {
  inlineCollapsed: _propTypes["default"].bool
});

module.exports = exports.default;