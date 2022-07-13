"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BreadcrumbItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BreadcrumbItem, _PureComponent);

  function BreadcrumbItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbItem.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        separator = _this$props.separator,
        children = _this$props.children,
        onClick = _this$props.onClick,
        disabled = _this$props.disabled,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "separator", "children", "onClick", "disabled"]);

    var link;
    var linkClassName = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-link-disabled"] = disabled, _classNames[prefixCls + "-link"] = !disabled, _classNames));

    var linkProps = _extends({
      className: linkClassName
    }, restProps);

    if ('href' in this.props) {
      if (disabled) {
        /* eslint-disable no-script-url */
        linkProps.href = 'javascript:void(0)';
      }

      link = _react["default"].createElement("a", linkProps, children);
    } else {
      link = _react["default"].createElement("span", linkProps, children);
    }

    if (children) {
      return _react["default"].createElement("span", {
        onClick: onClick
      }, link, _react["default"].createElement("span", {
        className: prefixCls + "-separator"
      }, separator));
    }

    return null;
  };

  return BreadcrumbItem;
}(_react.PureComponent);

exports["default"] = BreadcrumbItem;

_defineProperty(BreadcrumbItem, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: _propTypes["default"].string,

  /**
   * 分隔符
   */
  separator: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),

  /**
   * 跳转链接, 作用于a标签上
   */
  href: _propTypes["default"].string,

  /**
   * breadcrumb的children
   */
  children: _propTypes["default"].node,

  /**
   * 点击crumbItem的回调函数
   */
  onClick: _propTypes["default"].func,
  disabled: _propTypes["default"].bool
});

_defineProperty(BreadcrumbItem, "defaultProps", {
  prefixCls: 'new-fc-one-breadcrumb',
  separator: _react["default"].createElement(_oneUiIcon.IconAngleRight, null),
  onClick: function onClick() {},
  disabled: false
});

module.exports = exports.default;