"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _icon = _interopRequireDefault(require("../../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minHeightMap = {
  small: 32,
  medium: 36
};
var IconInfo = {
  info: _react["default"].createElement(_icon["default"], {
    type: "info"
  }),
  warning: _react["default"].createElement(_icon["default"], {
    type: "warning"
  }),
  success: _react["default"].createElement(_icon["default"], {
    type: "success"
  }),
  error: _react["default"].createElement(_icon["default"], {
    type: "fail"
  }),
  loading: _react["default"].createElement(_icon["default"], {
    type: "loading"
  })
};

var Message =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Message, _PureComponent);

  function Message() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$props = _this.props,
          size = _this$props.size,
          prefixCls = _this$props.prefixCls;
      var height = _this.messageRef.offsetHeight;
      var minHeight = minHeightMap[size];

      if (height > minHeight) {
        var dom = (0, _componentClasses["default"])(_this.messageRef);
        dom.add(prefixCls + "-multiple-line");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ref) {
      _this.messageRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _classNames;

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          type = _this$props2.type,
          title = _this$props2.title,
          size = _this$props2.size,
          instance = _this$props2.instance,
          target = _this$props2.target,
          content = _this$props2.content,
          showCloseIcon = _this$props2.showCloseIcon;
      var wrapClass = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-header"] = !!title, _classNames[prefixCls + "-widthout-header"] = !title, _classNames), prefixCls + "-custom-content", prefixCls + "-" + size);

      var removeNotice = function removeNotice() {
        if (instance) {
          instance.removeNotice(target);
        }
      };

      var iconNode = IconInfo[type];
      return _react["default"].createElement("div", {
        className: wrapClass,
        ref: _this.saveRef
      }, showCloseIcon && _react["default"].createElement("span", {
        className: prefixCls + "-close-icon"
      }, _react["default"].createElement(_icon["default"], {
        type: "close",
        onClick: removeNotice
      })), iconNode, _react["default"].createElement("div", {
        className: prefixCls + "-container"
      }, title ? _react["default"].createElement("div", {
        className: prefixCls + "-container-header"
      }, title) : null, content ? _react["default"].createElement("div", {
        className: prefixCls + "-container-content"
      }, content) : null));
    });

    return _this;
  }

  return Message;
}(_react.PureComponent);

exports["default"] = Message;

_defineProperty(Message, "propTypes", {
  prefixCls: _propTypes["default"].string,
  type: _propTypes["default"].string,
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  size: _propTypes["default"].string,
  instance: _propTypes["default"].object,
  target: _propTypes["default"].number,
  content: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  showCloseIcon: _propTypes["default"].bool
});

module.exports = exports.default;