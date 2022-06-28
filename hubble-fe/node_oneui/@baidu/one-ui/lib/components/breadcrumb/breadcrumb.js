"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Breadcrumb =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Breadcrumb, _PureComponent);

  function Breadcrumb() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Breadcrumb.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        separator = _this$props.separator,
        prefixCls = _this$props.prefixCls,
        style = _this$props.style,
        className = _this$props.className,
        children = _this$props.children,
        size = _this$props.size,
        type = _this$props.type;

    var crumbs = _react["default"].Children.map(children, function (element, index) {
      if (!element) {
        return element;
      }

      return (0, _react.cloneElement)(element, {
        separator: separator,
        key: index
      });
    });

    var breadcrumbCls = (0, _classnames["default"])(prefixCls, prefixCls + "-" + size, className, prefixCls + "-" + type);
    return _react["default"].createElement("div", {
      className: breadcrumbCls,
      style: style
    }, crumbs);
  };

  return Breadcrumb;
}(_react.PureComponent);

exports["default"] = Breadcrumb;

_defineProperty(Breadcrumb, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: _propTypes["default"].string,

  /**
   * 分割符
   */
  separator: _propTypes["default"].node,

  /**
   * 自定义样式className
   */
  className: _propTypes["default"].string,

  /**
   * 自定义样式
   */
  style: _propTypes["default"].object,

  /**
   * children
   */
  children: _propTypes["default"].node,
  size: _propTypes["default"].oneOf(['medium', 'small']),
  type: _propTypes["default"].oneOf(['normal', 'strong'])
});

_defineProperty(Breadcrumb, "defaultProps", {
  prefixCls: 'new-fc-one-breadcrumb',
  separator: _react["default"].createElement(_oneUiIcon.IconAngleRight, null),
  size: 'medium',
  type: 'normal'
});

module.exports = exports.default;