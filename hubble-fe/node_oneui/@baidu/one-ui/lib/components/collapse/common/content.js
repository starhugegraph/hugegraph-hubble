"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Content =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Content, _Component);

  function Content() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Content.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal["default"])(this.props, nextProps);
  };

  _proto.render = function render() {
    var _classnames;

    // 判断isItemActive再与避免不用的重复渲染
    var _this$props = this.props,
        renderDomWhenHide = _this$props.renderDomWhenHide,
        isActive = _this$props.isActive,
        prefixCls = _this$props.prefixCls,
        children = _this$props.children,
        destroyNotActivePanel = _this$props.destroyNotActivePanel;
    this.isItemActive = renderDomWhenHide || this.isItemActive || isActive;

    if (!this.isItemActive) {
      return null;
    }

    var contentCls = (0, _classnames2["default"])(prefixCls + "-item-content", (_classnames = {}, _classnames[prefixCls + "-item-content-active"] = isActive, _classnames[prefixCls + "-item-content-not-active"] = !isActive, _classnames));
    var child = !renderDomWhenHide && !isActive && destroyNotActivePanel ? null : _react["default"].createElement("div", {
      className: prefixCls + "-content-box"
    }, children);
    return _react["default"].createElement("div", {
      className: contentCls
    }, child);
  };

  return Content;
}(_react.Component);

exports["default"] = Content;

_defineProperty(Content, "propTypes", {
  prefixCls: _propTypes["default"].string,
  isActive: _propTypes["default"].bool,
  children: _propTypes["default"].any,
  destroyNotActivePanel: _propTypes["default"].bool,
  renderDomWhenHide: _propTypes["default"].bool
});

module.exports = exports.default;