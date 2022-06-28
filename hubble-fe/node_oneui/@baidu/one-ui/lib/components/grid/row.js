"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Row =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Row, _PureComponent);

  function Row() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Row.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        type = _this$props.type,
        justify = _this$props.justify,
        align = _this$props.align,
        className = _this$props.className,
        gutter = _this$props.gutter,
        style = _this$props.style,
        children = _this$props.children,
        _this$props$prefixCls = _this$props.prefixCls,
        prefixCls = _this$props$prefixCls === void 0 ? 'new-fc-one-row' : _this$props$prefixCls,
        others = _objectWithoutPropertiesLoose(_this$props, ["type", "justify", "align", "className", "gutter", "style", "children", "prefixCls"]);

    var classes = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls] = !type, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-" + type + "-" + justify] = type && justify, _classNames[prefixCls + "-" + type + "-" + align] = type && align, _classNames), className);
    var rowStyle = gutter > 0 ? _extends({
      marginLeft: gutter / -2,
      marginRight: gutter / -2
    }, style) : style;

    var cols = _react.Children.map(children, function (col) {
      if (!col) {
        return null;
      }

      if (col.props && gutter > 0) {
        return (0, _react.cloneElement)(col, {
          style: _extends({
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2
          }, col.props.style)
        });
      }

      return col;
    });

    return _react["default"].createElement("div", _extends({}, others, {
      className: classes,
      style: rowStyle
    }), cols);
  };

  return Row;
}(_react.PureComponent);

exports["default"] = Row;

_defineProperty(Row, "propTypes", {
  /** 布局模式， 可选flex */
  type: _propTypes["default"].string,

  /** flex布局模式下，垂直对齐的方式 */
  align: _propTypes["default"].string,

  /** flex布局模式下，水平对齐的方式 */
  justify: _propTypes["default"].string,

  /** 自定义row的类名 */
  className: _propTypes["default"].string,

  /** row的children */
  children: _propTypes["default"].node,

  /** 栅格间隔，类型是数字 */
  gutter: _propTypes["default"].number,

  /** row的样式前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义row的样式 */
  style: _propTypes["default"].object
});

_defineProperty(Row, "defaultProps", {
  gutter: 0
});

module.exports = exports.default;