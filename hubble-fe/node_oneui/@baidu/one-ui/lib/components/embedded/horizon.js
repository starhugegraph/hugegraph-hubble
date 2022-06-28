"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Horizon =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Horizon, _PureComponent);

  function Horizon(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        visible: false
      });

      _this.props.onClose();
    });

    _this.state = {
      visible: true
    };
    return _this;
  }

  var _proto = Horizon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        closable = _this$props.closable,
        children = _this$props.children;
    var visible = this.state.visible;

    if ('visible' in this.props) {
      visible = this.props.visible;
    }

    if (!visible) {
      return null;
    }

    return _react["default"].createElement("div", {
      className: prefixCls + " " + className
    }, closable ? _react["default"].createElement("span", {
      className: prefixCls + "-close",
      onClick: this.onClose
    }, _react["default"].createElement(_icon["default"], {
      type: "close"
    })) : null, _react["default"].createElement("div", {
      className: prefixCls + "-body"
    }, children));
  };

  return Horizon;
}(_react.PureComponent);

exports["default"] = Horizon;

_defineProperty(Horizon, "propTypes", {
  onClose: _propTypes["default"].func,
  closable: _propTypes["default"].bool,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  children: _propTypes["default"].node,
  visible: _propTypes["default"].bool
});

_defineProperty(Horizon, "defaultProps", {
  closable: true,
  prefixCls: 'new-fc-one-embedded-horizon',
  className: ''
});

module.exports = exports.default;