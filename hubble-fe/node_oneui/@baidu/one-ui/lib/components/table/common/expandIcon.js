"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ExpandIcon =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ExpandIcon, _Component);

  function ExpandIcon() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ExpandIcon.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal["default"])(nextProps, this.props);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        expandable = _this$props.expandable,
        prefixCls = _this$props.prefixCls,
        expanded = _this$props.expanded,
        onExpand = _this$props.onExpand,
        needIndentSpaced = _this$props.needIndentSpaced,
        record = _this$props.record;

    if (expandable) {
      var expandClassName = expanded ? 'expanded' : 'collapsed';
      var expandIcon = expanded ? _react["default"].createElement(_oneUiIcon.IconChevronUp, null) : _react["default"].createElement(_oneUiIcon.IconChevronDown, null);
      return _react["default"].createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-" + expandClassName,
        onClick: function onClick(e) {
          return onExpand(record, e);
        }
      }, expandIcon);
    }

    if (needIndentSpaced) {
      return _react["default"].createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-spaced"
      });
    }

    return null;
  };

  return ExpandIcon;
}(_react.Component);

exports["default"] = ExpandIcon;

_defineProperty(ExpandIcon, "propTypes", {
  record: _propTypes["default"].object,
  prefixCls: _propTypes["default"].string,
  expandable: _propTypes["default"].any,
  expanded: _propTypes["default"].bool,
  needIndentSpaced: _propTypes["default"].bool,
  onExpand: _propTypes["default"].func
});

module.exports = exports.default;