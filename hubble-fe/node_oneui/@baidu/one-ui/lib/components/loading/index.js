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

var Loading =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Loading, _PureComponent);

  function Loading() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Loading.prototype;

  _proto.isNestedPattern = function isNestedPattern() {
    return !!(this.props && this.props.children);
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        size = _this$props.size,
        loading = _this$props.loading,
        style = _this$props.style,
        tip = _this$props.tip,
        type = _this$props.type,
        children = _this$props.children,
        textDirection = _this$props.textDirection,
        CustomIconNode = _this$props.CustomIconNode;
    var classes = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-visible"] = loading, _classNames[prefixCls + "-show-text"] = !!tip, _classNames[prefixCls + "-type-" + type] = type, _classNames), prefixCls + "-" + textDirection, className);

    var loadingElement = _react["default"].createElement("div", {
      className: classes,
      style: style
    }, _react["default"].createElement("div", {
      className: prefixCls + "-icon-element"
    }, CustomIconNode || _react["default"].createElement(_oneUiIcon.IconLoading, {
      className: prefixCls + "-loading-icon"
    }), tip ? _react["default"].createElement("span", {
      className: prefixCls + "-text"
    }, tip) : null));

    if (this.isNestedPattern()) {
      var _classNames2;

      var containerClassName = (0, _classnames["default"])(prefixCls + "-container", (_classNames2 = {}, _classNames2[prefixCls + "-blur"] = loading, _classNames2));
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(prefixCls + "-nested-loading")
      }, loading && _react["default"].createElement("div", null, loadingElement), _react["default"].createElement("div", {
        className: containerClassName
      }, children));
    }

    return loadingElement;
  };

  return Loading;
}(_react.PureComponent);

exports["default"] = Loading;

_defineProperty(Loading, "propTypes", {
  /** 是否为loading状态 */
  loading: _propTypes["default"].bool,

  /** 设置loading图标大小，可选值为 small large 或者不设 */
  size: _propTypes["default"].oneOf(['large', 'medium', 'small']),

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** loading时的文案 */
  tip: _propTypes["default"].string,
  children: _propTypes["default"].node,
  style: _propTypes["default"].object,
  type: _propTypes["default"].string,

  /** loading文案的方向 */
  textDirection: _propTypes["default"].oneOf(['horizontal', 'vertical']),

  /** 自定义icon Node */
  CustomIconNode: _propTypes["default"].node
});

_defineProperty(Loading, "defaultProps", {
  loading: true,
  prefixCls: 'new-fc-one-loading',
  className: '',
  size: 'medium',
  style: {},
  tip: '',
  type: 'normal',
  textDirection: 'horizontal',
  CustomIconNode: null
});

module.exports = exports.default;