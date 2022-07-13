"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LineNode =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(LineNode, _PureComponent);

  function LineNode() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = LineNode.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        size = _this$props.size,
        activeKey = _this$props.activeKey,
        currentKey = _this$props.currentKey,
        tab = _this$props.tab,
        Icon = _this$props.Icon,
        closable = _this$props.closable,
        disabled = _this$props.disabled,
        onClick = _this$props.onClick,
        onDelete = _this$props.onDelete;
    var tabClassName = (0, _classnames["default"])(prefixCls + "-title", (_classNames = {}, _classNames[prefixCls + "-title-is-active"] = activeKey && activeKey === currentKey, _classNames[prefixCls + "-title-disabled"] = disabled, _classNames[prefixCls + "-title-has-icon"] = Icon, _classNames[prefixCls + "-title-closable"] = closable, _classNames), [prefixCls + "-title-" + size]);
    return _react["default"].createElement("span", {
      className: tabClassName,
      onClick: onClick
    }, Icon || null, _react["default"].createElement("span", {
      className: prefixCls + "-title-inline-text"
    }, tab), closable ? _react["default"].createElement(_oneUiIcon.IconClose, {
      onClick: onDelete
    }) : null);
  };

  return LineNode;
}(_react.PureComponent);

exports["default"] = LineNode;

_defineProperty(LineNode, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  size: _propTypes["default"].oneOf(['small', 'medium']).isRequired,
  activeKey: _propTypes["default"].string,
  currentKey: _propTypes["default"].string,
  tab: _propTypes["default"].node.isRequired,
  Icon: _propTypes["default"].node,
  closable: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  onClick: _propTypes["default"].func.isRequired,
  onDelete: _propTypes["default"].func.isRequired
});

_defineProperty(LineNode, "defaultProps", {
  Icon: null,
  closable: false,
  disabled: false
});

module.exports = exports.default;