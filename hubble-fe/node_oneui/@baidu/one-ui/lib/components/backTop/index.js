"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultVisibilityHeight = 400;

var BackTop =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(BackTop, _PureComponent);

  function BackTop(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultTarget", function () {
      return window;
    });

    _defineProperty(_assertThisInitialized(_this), "getScroll", function (target) {
      // 获取滚动高度
      if (typeof window === 'undefined') {
        return 0;
      }

      var prop = 'pageYOffset';
      var method = 'scrollTop';
      var isWindow = target === window;
      var ret = isWindow ? target[prop] : target[method];

      if (isWindow && typeof ret !== 'number') {
        ret = document.documentElement[method];
      }

      return ret;
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      var _this$props = _this.props,
          visibilityHeight = _this$props.visibilityHeight,
          _this$props$target = _this$props.target,
          target = _this$props$target === void 0 ? _this.getDefaultTarget : _this$props$target;

      var scrollTop = _this.getScroll(target());

      var visible = scrollTop > visibilityHeight;

      _this.onVisibleChange(visible);
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToTop", function () {
      var getTarget = _this.props.target || _this.getDefaultTarget;
      var targetNode = getTarget();

      if (targetNode === window) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      } else {
        targetNode.scrollTop = 0;
      }

      _this.props.onClick();
    });

    _this.state = {
      visible: false
    };
    return _this;
  }

  var _proto = BackTop.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var getTarget = this.props.target || this.getDefaultTarget;
    var target = getTarget();

    if (target) {
      this.scrollEvent = target.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.scrollEvent) {
      // 初始化清除上一次监听的滚动元素
      this.scrollEvent.remove();
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        target = _this$props2.target;
    var classes = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-default"] = !target, _classNames));
    return this.state.visible ? _react["default"].createElement(_button["default"], {
      className: classes,
      onClick: this.scrollToTop,
      type: "translucent",
      size: "xsmall"
    }, _react["default"].createElement(_icon["default"], {
      type: "arrow-to-top",
      className: prefixCls + "-icon"
    })) : null;
  };

  return BackTop;
}(_react.PureComponent);

exports["default"] = BackTop;

_defineProperty(BackTop, "propTypes", {
  /** 用户点击之后回调函数 */
  onClick: _propTypes["default"].func,

  /** 用户监听其滚动的元素 */
  target: _propTypes["default"].func,

  /** 滚动高度到达此致显示BackTop按钮 */
  visibilityHeight: _propTypes["default"].number,

  /** 用户可自定义class前缀 */
  prefixCls: _propTypes["default"].string,

  /** 用户可自定义class */
  className: _propTypes["default"].string
});

_defineProperty(BackTop, "defaultProps", {
  onClick: _lodash["default"].noop,
  visibilityHeight: defaultVisibilityHeight,
  prefixCls: 'new-fc-one-back-top',
  className: ''
});

_defineProperty(BackTop, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('visible' in nextProps && nextProps.visible !== prevState.visible) {
    return {
      visible: nextProps.visible
    };
  }

  return null;
});

module.exports = exports.default;