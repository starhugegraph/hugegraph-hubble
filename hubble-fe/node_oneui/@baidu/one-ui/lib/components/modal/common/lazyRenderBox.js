"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LazyRenderBox =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(LazyRenderBox, _Component);

  function LazyRenderBox() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = LazyRenderBox.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !!nextProps.hiddenClassName || !!nextProps.visible;
  };

  _proto.render = function render() {
    var className = this.props.className;

    if (!!this.props.hiddenClassName && !this.props.visible) {
      className += " " + this.props.hiddenClassName;
    }

    var props = _extends({}, this.props);

    delete props.hiddenClassName;
    delete props.visible;
    props.className = className;
    return _react["default"].createElement("div", props);
  };

  return LazyRenderBox;
}(_react.Component);

exports["default"] = LazyRenderBox;

_defineProperty(LazyRenderBox, "propTypes", {
  className: _propTypes["default"].string,
  visible: _propTypes["default"].bool,
  hiddenClassName: _propTypes["default"].string,
  role: _propTypes["default"].string,
  style: _propTypes["default"].object,
  onMouseDown: _propTypes["default"].func
});

module.exports = exports.default;