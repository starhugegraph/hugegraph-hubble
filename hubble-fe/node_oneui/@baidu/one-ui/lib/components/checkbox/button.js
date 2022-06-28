"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _checkbox = _interopRequireDefault(require("./checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CheckboxButton, _Component);

  function CheckboxButton() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = CheckboxButton.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(0, _shallowequal["default"])(this.props, nextProps) || !(0, _shallowequal["default"])(this.state, nextState) || !(0, _shallowequal["default"])(this.context.checkboxGroup, nextContext.checkboxGroup);
  };

  _proto.render = function render() {
    return _react["default"].createElement(_checkbox["default"], _extends({}, this.props, {
      mode: "strong"
    }));
  };

  return CheckboxButton;
}(_react.Component);

exports["default"] = CheckboxButton;

_defineProperty(CheckboxButton, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  defaultChecked: _propTypes["default"].bool,
  checked: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  disabled: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  value: _propTypes["default"].any,
  name: _propTypes["default"].string,
  children: _propTypes["default"].node
});

_defineProperty(CheckboxButton, "contextTypes", {
  checkboxGroup: _propTypes["default"].any
});

_defineProperty(CheckboxButton, "defaultProps", {
  prefixCls: 'new-fc-one-checkbox-button'
});

module.exports = exports.default;