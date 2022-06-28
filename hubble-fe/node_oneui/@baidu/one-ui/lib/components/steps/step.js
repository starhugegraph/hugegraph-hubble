"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames4 = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Step =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Step, _Component);

  function Step() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickStep", function () {
      var _this$props = _this.props,
          onClickStep = _this$props.onClickStep,
          stepNumber = _this$props.stepNumber;

      if (onClickStep) {
        onClickStep(stepNumber);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderIconNode", function () {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          stepNumber = _this$props2.stepNumber,
          status = _this$props2.status,
          icons = _this$props2.icons,
          icon = _this$props2.icon,
          _this$props2$iconClas = _this$props2.iconClassName,
          iconClassName = _this$props2$iconClas === void 0 ? '' : _this$props2$iconClas;
      var iconNode;
      var iconClx = (0, _classnames4["default"])(prefixCls + "-icon", 'new-fc-one-icon', iconClassName, {
        'new-fc-one-icon-check': status === 'finish' && icons && !icons.finish,
        'new-fc-one-icon-close': status === 'error' && icons && !icons.error
      });

      if (icon && iconClassName) {
        iconNode = _react["default"].createElement("span", {
          className: iconClassName
        }, icon);
      } else if (icons && icons.finish && status === 'finish') {
        iconNode = _react["default"].createElement("span", {
          className: prefixCls + "-icon"
        }, icons.finish);
      } else if (icons && icons.error && status === 'error') {
        iconNode = _react["default"].createElement("span", {
          className: prefixCls + "-icon"
        }, icons.error);
      } else if (status === 'finish' || status === 'error') {
        iconNode = _react["default"].createElement("span", {
          className: iconClx
        });
      } else {
        iconNode = _react["default"].createElement("span", {
          className: prefixCls + "-icon"
        }, stepNumber);
      }

      return iconNode;
    });

    return _this;
  }

  var _proto = Step.prototype;

  _proto.render = function render() {
    var _classnames, _classnames2, _classnames3;

    var _this$props3 = this.props,
        className = _this$props3.className,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style,
        itemWidth = _this$props3.itemWidth,
        _this$props3$status = _this$props3.status,
        status = _this$props3$status === void 0 ? 'wait' : _this$props3$status,
        adjustMarginRight = _this$props3.adjustMarginRight,
        description = _this$props3.description,
        title = _this$props3.title,
        tailContent = _this$props3.tailContent,
        icon = _this$props3.icon,
        showTipWhenHover = _this$props3.showTipWhenHover,
        hoverTip = _this$props3.hoverTip,
        stepNumber = _this$props3.stepNumber,
        current = _this$props3.current;
    var classString = (0, _classnames4["default"])(prefixCls + "-item", prefixCls + "-item-" + status, (_classnames = {}, _classnames[prefixCls + "-item-custom"] = icon, _classnames[prefixCls + "-item-is-current"] = +current === +stepNumber, _classnames), className);

    var stepItemStyle = _extends({}, style);

    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    var stepText = '';

    if (status === 'finish') {
      stepText = '已完成';
    } else if (status === 'wait') {
      stepText = '未开始';
    } else if (status === 'process') {
      stepText = '进行中';
    } else if (status === 'error') {
      stepText = '错误';
    }

    var iconNode = this.renderIconNode();
    var iconHoverTip = hoverTip || "\u7B2C" + stepNumber + "\u6B65" + stepText;
    var iconRenderItem = showTipWhenHover ? _react["default"].createElement(_tooltip["default"], {
      placement: "top",
      title: iconHoverTip,
      style: {
        marginBottom: '5px'
      }
    }, _react["default"].createElement(_button["default"], {
      className: prefixCls + "-item-icon",
      icon: iconNode
    })) : _react["default"].createElement(_button["default"], {
      className: prefixCls + "-item-icon",
      icon: iconNode
    });
    var contentClassNames = (0, _classnames4["default"])(prefixCls + "-item-content", (_classnames2 = {}, _classnames2[prefixCls + "-item-title-only"] = !description, _classnames2));
    var titleTextClassNames = (0, _classnames4["default"])(prefixCls + "-item-title-text", (_classnames3 = {}, _classnames3[prefixCls + "-item-title-text-only"] = !description, _classnames3));
    return _react["default"].createElement("div", {
      className: classString,
      style: stepItemStyle,
      onClick: this.onClickStep
    }, _react["default"].createElement("div", {
      className: prefixCls + "-item-tail"
    }, tailContent), iconRenderItem, _react["default"].createElement("div", {
      className: contentClassNames
    }, _react["default"].createElement("div", {
      className: prefixCls + "-item-title"
    }, _react["default"].createElement("span", {
      className: titleTextClassNames
    }, title)), description && _react["default"].createElement("div", {
      className: prefixCls + "-item-description"
    }, description)));
  };

  return Step;
}(_react.Component);

exports["default"] = Step;

_defineProperty(Step, "propTypes", {
  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** 自定义类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义样式 */
  style: _propTypes["default"].object,

  /** 可自定义当前步骤节点的宽度 */
  itemWidth: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /** 当前步骤的状态 */
  status: _propTypes["default"].string,

  /** 是否需要在当前步骤条展示hover状态 */
  showTipWhenHover: _propTypes["default"].bool,

  /** 自定义步骤条item的右边margin */
  adjustMarginRight: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),

  /** 当前步骤条的步数 */
  stepNumber: _propTypes["default"].string,

  /** 描述 */
  description: _propTypes["default"].any,

  /** 标题 */
  title: _propTypes["default"].any,

  /** 步骤条连接线 */
  tailContent: _propTypes["default"].any,

  /** 步骤条的icon类型 */
  icons: _propTypes["default"].shape({
    finish: _propTypes["default"].node,
    error: _propTypes["default"].node
  }),

  /** 自定义icon */
  icon: _propTypes["default"].node,

  /** 自定义icon的icon className */
  iconClassName: _propTypes["default"].string,

  /** 自定义hoverTip */
  hoverTip: _propTypes["default"].string,

  /** 点击step的回调函数 */
  onClickStep: _propTypes["default"].func,
  current: _propTypes["default"].number
});

module.exports = exports.default;