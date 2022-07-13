"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _loading = _interopRequireDefault(require("../../loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var noop = function noop() {};

var UploaderAnchor =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(UploaderAnchor, _PureComponent);

  function UploaderAnchor() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = UploaderAnchor.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        onClick = _this$props.onClick,
        loading = _this$props.loading,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled;
    var buttonClassName = (0, _classnames["default"])(prefixCls + "-anchor-image-button", (_classNames = {}, _classNames[prefixCls + "-anchor-image-button-loading"] = loading, _classNames[prefixCls + "-anchor-image-button-disabled"] = disabled, _classNames));
    var buttonProps = {
      className: buttonClassName,
      onClick: disabled || loading ? noop : onClick
    };
    return _react["default"].createElement("div", buttonProps, loading ? _react["default"].createElement(_loading["default"], {
      type: "strong"
    }) : _react["default"].createElement(_oneUiIcon.IconImageAdd, null));
  };

  return UploaderAnchor;
}(_react.PureComponent);

exports["default"] = UploaderAnchor;

_defineProperty(UploaderAnchor, "propTypes", {
  onClick: _propTypes["default"].func,
  loading: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  disabled: _propTypes["default"].bool
});

module.exports = exports.default;