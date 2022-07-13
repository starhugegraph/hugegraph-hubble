"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _PortalWrapper = _interopRequireDefault(require("rc-util/lib/PortalWrapper"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dialog = _interopRequireDefault(require("./dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DialogWrap =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DialogWrap, _Component);

  function DialogWrap() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = DialogWrap.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(_ref) {
    var visible = _ref.visible,
        forceRender = _ref.forceRender;
    return !!(this.props.visible || visible) || this.props.forceRender || forceRender;
  };

  _proto.render = function render() {
    var _this = this;

    var _this$props = this.props,
        visible = _this$props.visible,
        getContainer = _this$props.getContainer,
        forceRender = _this$props.forceRender; // 渲染在当前 dom 里；

    if (getContainer === false) {
      return _react["default"].createElement(_dialog["default"], _extends({}, this.props, {
        getOpenCount: function getOpenCount() {
          return 2;
        } // 不对 body 做任何操作。。

      }));
    }

    return _react["default"].createElement(_PortalWrapper["default"], {
      visible: visible,
      forceRender: forceRender,
      getContainer: getContainer
    }, function (childProps) {
      return _react["default"].createElement(_dialog["default"], _extends({}, _this.props, childProps));
    });
  };

  return DialogWrap;
}(_react.Component);

_defineProperty(DialogWrap, "defaultProps", {
  visible: false,
  forceRender: false
});

_defineProperty(DialogWrap, "propTypes", {
  visible: _propTypes["default"].bool,
  forceRender: _propTypes["default"].bool,
  getContainer: _propTypes["default"].func
});

var _default = DialogWrap;
exports["default"] = _default;
module.exports = exports.default;