"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultHeight = 32;

var Alert =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Alert, _PureComponent);

  function Alert(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.setDomClassByHeight();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.setDomClassByHeight();
    });

    _defineProperty(_assertThisInitialized(_this), "setDomClassByHeight", function () {
      var alertContentRef = _this.alertContentRef;
      var alertRef = _this.alertRef;

      if (!alertContentRef || !alertRef) {
        return null;
      }

      var height = alertContentRef.offsetHeight;
      var multipleClassName = _this.props.prefixCls + "-multiple";
      var singleClassName = _this.props.prefixCls + "-single";
      var dom = (0, _componentClasses["default"])(alertRef);

      if (height > defaultHeight) {
        dom.remove(singleClassName);
        dom.add(multipleClassName);
      } else if (dom.has(multipleClassName)) {
        dom.remove(multipleClassName);
        dom.add(singleClassName);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleClose", function (e) {
      e.preventDefault();

      if (!('visble' in _this.props)) {
        _this.setState({
          visible: false
        });
      }

      var onClose = _this.props.onClose;

      if (onClose) {
        onClose(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (type) {
      return function (ref) {
        _this[type] = ref;
      };
    });

    _this.state = {
      visible: props.visible || true
    };
    return _this;
  }

  var _proto = Alert.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        style = _this$props.style,
        showIcon = _this$props.showIcon,
        icon = _this$props.icon,
        type = _this$props.type,
        content = _this$props.content,
        closable = _this$props.closable,
        title = _this$props.title,
        size = _this$props.size;
    var visible = this.state.visible;

    if (!visible) {
      return null;
    }

    var iconNode = null;

    if (!icon) {
      switch (type) {
        case 'success':
          iconNode = _react["default"].createElement(_oneUiIcon.IconCheckCircle, null);
          break;

        case 'info':
          iconNode = _react["default"].createElement(_oneUiIcon.IconInfoCircle, null);
          break;

        case 'error':
          iconNode = _react["default"].createElement(_oneUiIcon.IconTimesCircle, null);
          break;

        case 'warning':
          iconNode = _react["default"].createElement(_oneUiIcon.IconExclamationCircle, null);
          break;

        default:
          iconNode = null;
      }
    } else if (typeof icon === 'string') {
      iconNode = _react["default"].createElement(_icon["default"], {
        type: icon
      });
    } else if (_react["default"].isValidElement(icon)) {
      iconNode = icon;
    }

    var alertCls = (0, _classnames["default"])(prefixCls, prefixCls + "-" + type, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-no-title"] = !title, _classNames[prefixCls + "-with-title"] = !!title, _classNames[prefixCls + "-show-icon"] = showIcon, _classNames[prefixCls + "-has-close-icon"] = closable, _classNames), className);
    var closeIcon = closable ? _react["default"].createElement("span", {
      onClick: this.onHandleClose,
      className: prefixCls + "-close-icon"
    }, _react["default"].createElement(_oneUiIcon.IconClose, null)) : null;
    return _react["default"].createElement("div", {
      className: alertCls,
      style: style,
      ref: this.saveRef('alertRef')
    }, showIcon ? _react["default"].createElement("span", {
      className: prefixCls + "-icon"
    }, iconNode) : null, _react["default"].createElement("div", null, title ? _react["default"].createElement("div", {
      className: prefixCls + "-title"
    }, title) : null, _react["default"].createElement("div", {
      className: prefixCls + "-content",
      ref: this.saveRef('alertContentRef')
    }, content)), closeIcon);
  };

  return Alert;
}(_react.PureComponent);

_defineProperty(Alert, "propTypes", {
  type: _propTypes["default"].oneOf(['success', 'info', 'warning', 'error']),
  title: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  content: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),
  closable: _propTypes["default"].bool,
  onClose: _propTypes["default"].func,
  visible: _propTypes["default"].bool,
  showIcon: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Alert, "defaultProps", {
  onClose: function onClose() {},
  prefixCls: 'new-fc-one-alert',
  className: '',
  style: {},
  type: 'info',
  size: 'medium'
});

_defineProperty(Alert, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('visible' in nextProps && nextProps.visible !== prevState.visible) {
    return {
      visible: nextProps.visible
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Alert);
var _default = Alert;
exports["default"] = _default;
module.exports = exports.default;