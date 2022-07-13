"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcMenu = require("rc-menu");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var sizeArray = ['xsmall', 'small', 'medium', 'large', 'xlarge'];

var SubMenu =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SubMenu, _PureComponent);

  function SubMenu() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = SubMenu.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        placements = _this$props.placements,
        mode = _this$props.mode,
        rootPrefixCls = _this$props.rootPrefixCls,
        size = _this$props.size,
        popupClassName = _this$props.popupClassName,
        icon = _this$props.icon,
        title = _this$props.title;
    var alreadyHasSizeClassName = false;
    sizeArray.forEach(function (string) {
      if (popupClassName.indexOf(rootPrefixCls + "-submenu-" + string) > -1) {
        alreadyHasSizeClassName = true;
        return false;
      }
    });
    var newTitleNode = [title];

    var hasIcon = icon && _react["default"].isValidElement(icon);

    if (hasIcon) {
      newTitleNode.unshift(_react["default"].createElement("span", {
        className: rootPrefixCls + "-submenu-custom-icon"
      }, icon));
    }

    var props = _extends({}, this.props, {
      inlineIndent: 16,
      builtinPlacements: placements,
      expandIcon: mode !== 'vertical' ? _react["default"].createElement(_icon["default"], {
        type: "angle-down"
      }) : _react["default"].createElement(_icon["default"], {
        type: "angle-right"
      }),
      popupClassName: (0, _classnames["default"])(popupClassName, (_classNames = {}, _classNames[rootPrefixCls + "-submenu-" + size] = !!rootPrefixCls && !alreadyHasSizeClassName, _classNames)),
      className: (0, _classnames["default"])((_classNames2 = {}, _classNames2[rootPrefixCls + "-submenu-has-icon"] = mode === 'inline' && hasIcon, _classNames2)),
      title: newTitleNode
    });

    delete props.placements;
    delete props.icon;
    return _react["default"].createElement(_rcMenu.SubMenu, props);
  };

  return SubMenu;
}(_react.PureComponent);

exports["default"] = SubMenu;

_defineProperty(SubMenu, "propTypes", {
  rootPrefixCls: _propTypes["default"].string,
  placements: _propTypes["default"].object,
  theme: _propTypes["default"].string,
  mode: _propTypes["default"].string,
  popupClassName: _propTypes["default"].string,
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  icon: _propTypes["default"].node,
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string])
});

_defineProperty(SubMenu, "defaultProps", {
  placements: {},
  theme: 'light',
  popupClassName: '',
  size: 'medium'
});

_defineProperty(SubMenu, "isSubMenu", true);

module.exports = exports.default;