"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _oneUiIcon = require("@baidu/one-ui-icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Line =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Line, _PureComponent);

  function Line() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderOperation", function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          showRetry = _this$props.showRetry,
          showCancel = _this$props.showCancel,
          onRetry = _this$props.onRetry,
          onCancel = _this$props.onCancel;

      if (!showRetry && !showCancel) {
        return null;
      }

      var cancelProps = {
        type: 'close',
        title: '取消',
        onClick: onCancel
      };
      var retryProps = {
        type: 'refresh',
        title: '刷新',
        onClick: onRetry
      };
      return _react["default"].createElement("span", {
        className: prefixCls + "-operation"
      }, showRetry ? _react["default"].createElement(_oneUiIcon.IconRefresh, retryProps) : null, showCancel ? _react["default"].createElement(_oneUiIcon.IconClose, cancelProps) : null);
    });

    return _this;
  }

  var _proto = Line.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        percent = _this$props2.percent,
        strokeWidth = _this$props2.strokeWidth,
        strokeColor = _this$props2.strokeColor,
        trailColor = _this$props2.trailColor,
        strokeLinecap = _this$props2.strokeLinecap,
        width = _this$props2.width,
        children = _this$props2.children;
    var borderRadius = strokeLinecap === 'square' ? 0 : null;
    var outerStyle = {
      width: width
    };
    var percentStyle = {
      width: percent + "%",
      height: strokeWidth,
      borderRadius: borderRadius,
      background: strokeColor
    };
    var trailStyle = {
      borderRadius: borderRadius,
      backgroundColor: trailColor
    };
    return _react["default"].createElement("div", null, _react["default"].createElement("div", {
      className: prefixCls + "-outer",
      style: outerStyle
    }, _react["default"].createElement("div", {
      className: prefixCls + "-inner",
      style: trailStyle
    }, _react["default"].createElement("div", {
      className: prefixCls + "-bg",
      style: percentStyle
    }))), children, this.renderOperation());
  };

  return Line;
}(_react.PureComponent);

exports["default"] = Line;

_defineProperty(Line, "propTypes", {
  prefixCls: _propTypes["default"].string,
  percent: _propTypes["default"].number,
  strokeLinecap: _propTypes["default"].string,
  strokeColor: _propTypes["default"].string,
  trailColor: _propTypes["default"].string,
  strokeWidth: _propTypes["default"].number,
  width: _propTypes["default"].number,
  showRetry: _propTypes["default"].bool,
  showCancel: _propTypes["default"].bool,
  onRetry: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  children: _propTypes["default"].node
});

_defineProperty(Line, "defaultProps", {
  prefixCls: 'new-fc-one-progress',
  percent: 0,
  strokeLinecap: 'round',
  strokeColor: '',
  trailColor: '',
  showRetry: false,
  showCancel: false
});

module.exports = exports.default;