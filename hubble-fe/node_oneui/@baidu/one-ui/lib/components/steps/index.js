"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _icon = _interopRequireDefault(require("../icon"));

var _step = _interopRequireDefault(require("./step"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Steps =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Steps, _Component);

  function Steps() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Steps.prototype;

  _proto.render = function render() {
    var _classnames;

    var icons = {
      finish: _react["default"].createElement(_icon["default"], {
        type: "check"
      }),
      error: _react["default"].createElement(_icon["default"], {
        type: "close"
      })
    };

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        _this$props$style = _this$props.style,
        style = _this$props$style === void 0 ? {} : _this$props$style,
        className = _this$props.className,
        children = _this$props.children,
        direction = _this$props.direction,
        labelPlacement = _this$props.labelPlacement,
        showTipWhenHover = _this$props.showTipWhenHover,
        status = _this$props.status,
        size = _this$props.size,
        current = _this$props.current,
        initialStep = _this$props.initialStep,
        onClickStep = _this$props.onClickStep,
        restProps = _objectWithoutPropertiesLoose(_this$props, ["prefixCls", "style", "className", "children", "direction", "labelPlacement", "showTipWhenHover", "status", "size", "current", "initialStep", "onClickStep"]);

    var filteredChildren = _react["default"].Children.toArray(children).filter(function (child) {
      return !!child;
    });

    var stepClxs = (0, _classnames2["default"])(prefixCls, prefixCls + "-" + direction, className, (_classnames = {}, _classnames[prefixCls + "-" + size] = size, _classnames[prefixCls + "-label-" + labelPlacement] = direction === 'horizontal', _classnames));
    return _react["default"].createElement("div", _extends({
      className: stepClxs,
      style: style
    }, restProps), _react.Children.map(filteredChildren, function (child, index) {
      if (!child) {
        return null;
      }

      var currentStepNumber = initialStep + index;

      var childProps = _extends({
        stepNumber: "" + (currentStepNumber + 1),
        prefixCls: prefixCls,
        icons: icons,
        showTipWhenHover: showTipWhenHover,
        onClickStep: onClickStep,
        current: current
      }, child.props);

      if (status === 'error' && index === current - 1) {
        childProps.className = prefixCls + "-next-error";
      }

      if (!child.props.status) {
        if (currentStepNumber === current) {
          // 如果传入的Step没有status的话
          childProps.status = status;
        } else if (currentStepNumber < current) {
          childProps.status = 'finish';
        } else {
          childProps.status = 'wait';
        }
      }

      return (0, _react.cloneElement)(child, childProps);
    }));
  };

  return Steps;
}(_react.Component);

exports["default"] = Steps;

_defineProperty(Steps, "Step", _step["default"]);

_defineProperty(Steps, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 当前步骤 */
  current: _propTypes["default"].number,

  /** 步骤条的方向 */
  direction: _propTypes["default"].string,

  /** 描述文案放置的位置 */
  labelPlacement: _propTypes["default"].string,

  /** 是否需要展示hover状态 */
  showTipWhenHover: _propTypes["default"].bool,

  /** size 步骤条的尺寸 */
  size: _propTypes["default"].oneOf(['small', 'medium']),

  /** 当前步骤的状态， wait, process,finish, error */
  status: _propTypes["default"].string,

  /** initialStep 初始化的步骤条 */
  initialStep: _propTypes["default"].number,

  /** 自定义className */
  className: _propTypes["default"].string,

  /** 自定义style */
  style: _propTypes["default"].object,

  /** children */
  children: _propTypes["default"].node,

  /** onClickStep 暴露点击step的函数 */
  onClickStep: _propTypes["default"].func
});

_defineProperty(Steps, "defaultProps", {
  prefixCls: 'new-fc-one-steps',
  current: 0,
  direction: 'horizontal',
  labelPlacement: 'horizontal',
  initialStep: 0,
  status: 'process',
  size: 'medium',
  className: '',
  style: {},
  showTipWhenHover: true
});

module.exports = exports.default;