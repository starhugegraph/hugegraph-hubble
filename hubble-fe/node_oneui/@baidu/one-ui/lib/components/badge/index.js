"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Badge =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Badge, _PureComponent);

  function Badge(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _classNames, _classNames2, _classNames3;

      var _this$props = _this.props,
          showZero = _this$props.showZero,
          prefixCls = _this$props.prefixCls,
          overflowCount = _this$props.overflowCount,
          className = _this$props.className,
          style = _this$props.style,
          children = _this$props.children,
          isDot = _this$props.isDot,
          type = _this$props.type,
          text = _this$props.text,
          offset = _this$props.offset,
          color = _this$props.color,
          textContent = _this$props.textContent,
          restProps = _objectWithoutPropertiesLoose(_this$props, ["showZero", "prefixCls", "overflowCount", "className", "style", "children", "isDot", "type", "text", "offset", "color", "textContent"]);

      var _this$state = _this.state,
          visible = _this$state.visible,
          count = _this$state.count;
      var displayCount = +count > +overflowCount ? overflowCount + "+" : count;
      var isZero = displayCount === 0;
      var isDotMode = isDot && !isZero || type; // 小圆点状态下，不展示数字

      if (isDotMode) {
        displayCount = '';
      }

      var isEmpty = (displayCount === null || displayCount === undefined || displayCount === '') && !textContent;
      var hidden = (isEmpty || isZero && !showZero) && !isDotMode || !visible;
      var typeCls = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-type-dot"] = !!type, _classNames[prefixCls + "-type-" + type] = !!type, _classNames));
      var numberBoxCls = (0, _classnames["default"])((_classNames2 = {}, _classNames2[prefixCls + "-dot"] = isDotMode, _classNames2[prefixCls + "-count"] = !isDotMode, _classNames2[prefixCls + "-type-" + type] = !!type, _classNames2[prefixCls + "-hidden"] = hidden, _classNames2));
      var badgeCls = (0, _classnames["default"])(className, prefixCls, (_classNames3 = {}, _classNames3[prefixCls + "-type"] = !!type, _classNames3[prefixCls + "-not-a-wrapper"] = !children, _classNames3));
      var styleWithOffset = offset ? _extends({
        right: -offset[0],
        marginTop: offset[1]
      }, style) : style;

      if (color) {
        styleWithOffset = _extends({}, styleWithOffset, {
          backgroundColor: color
        });
      }

      var divProps = (0, _omit["default"])(restProps, ['visible']);

      if (!children && type) {
        return _react["default"].createElement("span", _extends({}, divProps, {
          className: badgeCls,
          style: styleWithOffset
        }), _react["default"].createElement("span", {
          className: typeCls
        }), _react["default"].createElement("span", {
          className: prefixCls + "-type-text"
        }, text));
      }

      var showContent = displayCount; // 如果有文字形式，数字形式默认失效

      if (textContent) {
        showContent = textContent;
      }

      return _react["default"].createElement("span", _extends({}, divProps, {
        className: badgeCls
      }), children, _react["default"].createElement("span", {
        className: numberBoxCls,
        style: styleWithOffset
      }, showContent));
    });

    _this.state = {
      count: props.count,
      visible: props.visible,
      prevProps: props
    };
    return _this;
  }

  return Badge;
}(_react.PureComponent);

_defineProperty(Badge, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: _propTypes["default"].string,

  /**
   * 自定义类名
   */
  className: _propTypes["default"].string,

  /**
   * count 展示的数字
   */
  count: _propTypes["default"].number,

  /**
   * 自定义圆点的颜色
   */
  color: _propTypes["default"].string,

  /**
   * 不展示数字，只展示小圆点
   */
  isDot: _propTypes["default"].bool,

  /**
   * 设置状态点的位置偏移，结构为 [number, number]
   */
  offset: _propTypes["default"].array,

  /**
   * 设置封顶的数字，比如overflowCount为99，当count > 99的时候，显示 99+
   */
  overflowCount: _propTypes["default"].number,

  /**
   * 当count为0的时候，是否还要展示badge
   */
  showZero: _propTypes["default"].bool,

  /**
   * 小圆点的状态值，enum {success, warning, error, process, default}
   */
  type: _propTypes["default"].string,

  /**
   * 设置了type情况下，小圆点旁边展示的文字
   */
  text: _propTypes["default"].string,

  /**
   * 自定义样式
   */
  style: _propTypes["default"].object,
  children: _propTypes["default"].node,

  /**
   * 是否展示badge
   */
  visible: _propTypes["default"].bool,

  /**
   * 自定义内容
   */
  textContent: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
});

_defineProperty(Badge, "defaultProps", {
  prefixCls: 'new-fc-one-badge',
  count: null,
  showZero: false,
  isDot: false,
  overflowCount: 99,
  visible: true,
  textContent: ''
});

_defineProperty(Badge, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {
    prevProps: nextProps
  };
  var prevProps = prevState.prevProps;

  if ('visible' in nextProps && nextProps.visible !== prevProps.visible) {
    newState.visible = nextProps.visible;
  }

  if ('count' in nextProps && nextProps.count !== prevProps.count) {
    newState.count = nextProps.count;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(Badge);
var _default = Badge;
exports["default"] = _default;
module.exports = exports.default;