"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _tabsTools = require("../../../core/tabsTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScrollContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ScrollContainer, _PureComponent);

  function ScrollContainer() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ScrollContainer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        content = _this$props.content,
        prefixCls = _this$props.prefixCls,
        title = _this$props.title,
        activeKey = _this$props.activeKey;
    var activeIndex = (0, _tabsTools.getActiveIndex)(title, activeKey);
    var style = activeIndex ? {
      marginLeft: "-" + activeIndex * 100 + "%"
    } : {};
    return _react["default"].createElement("div", {
      className: prefixCls + "-content",
      style: style
    }, content);
  };

  return ScrollContainer;
}(_react.PureComponent);

exports["default"] = ScrollContainer;

_defineProperty(ScrollContainer, "propTypes", {
  content: _propTypes["default"].node.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].node.isRequired,
  activeKey: _propTypes["default"].string.isRequired
});

module.exports = exports.default;