"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _tooltip = _interopRequireDefault(require("./common/tooltip"));

var _placements = _interopRequireDefault(require("./placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var splitObject = function splitObject(obj, keys) {
  var picked = {};

  var omited = _extends({}, obj);

  keys.forEach(function (key) {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omited[key];
    }
  });
  return {
    picked: picked,
    omited: omited
  };
};

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tooltip, _Component);

  function Tooltip(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: _this.isNoTitle() ? false : visible
        });
      }

      if (onVisibleChange && !_this.isNoTitle()) {
        onVisibleChange(visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPopupAlign", function (domNode, align) {
      var placements = _this.getPlacements(); // 当前返回的位置


      var placement = Object.keys(placements).filter(function (key) {
        return placements[key].points[0] === align.points[0] && placements[key].points[1] === align.points[1];
      })[0];

      if (!placement) {
        return;
      } // 根据当前坐标设置动画点


      var rect = domNode.getBoundingClientRect();
      var transformOrigin = {
        top: '50%',
        left: '50%'
      };

      if (placement.indexOf('top') >= 0 || placement.indexOf('Bottom') >= 0) {
        transformOrigin.top = rect.height - align.offset[1] + "px";
      } else if (placement.indexOf('Top') >= 0 || placement.indexOf('bottom') >= 0) {
        transformOrigin.top = -align.offset[1] + "px";
      }

      if (placement.indexOf('left') >= 0 || placement.indexOf('Right') >= 0) {
        transformOrigin.left = rect.width - align.offset[0] + "px";
      } else if (placement.indexOf('right') >= 0 || placement.indexOf('Left') >= 0) {
        transformOrigin.left = -align.offset[0] + "px";
      }

      if (placement.indexOf('top') >= 0) {
        domNode.style.top = domNode.style.top.split('px') && +domNode.style.top.split('px')[0] + 4 + "px" || domNode.style.top;
      } else if (placement.indexOf('bottom') >= 0) {
        domNode.style.top = domNode.style.top.split('px') && +domNode.style.top.split('px')[0] - 4 + "px" || domNode.style.top;
      } else if (placement.indexOf('right') >= 0) {
        domNode.style.left = domNode.style.left.split('px') && +domNode.style.left.split('px')[0] - 4 + "px" || domNode.style.left;
      } else if (placement.indexOf('left') >= 0) {
        domNode.style.left = domNode.style.left.split('px') && +domNode.style.left.split('px')[0] + 4 + "px" || domNode.style.left;
      }

      domNode.style.transformOrigin = transformOrigin.left + " " + transformOrigin.top;
    });

    _defineProperty(_assertThisInitialized(_this), "getTooltipRef", function (ref) {
      _this.tooltipRef = ref;
    });

    _this.state = {
      visible: !!props.visible
    };
    return _this;
  }

  var _proto = Tooltip.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible
      });
    }
  };

  _proto.getPlacements = function getPlacements() {
    var _this$props = this.props,
        arrowPointAtCenter = _this$props.arrowPointAtCenter,
        autoAdjustOverflow = _this$props.autoAdjustOverflow;
    return (0, _placements["default"])({
      arrowPointAtCenter: arrowPointAtCenter,
      verticalArrowShift: 8,
      autoAdjustOverflow: autoAdjustOverflow
    });
  } // Fix Tooltip won't hide at disabled button
  ;

  _proto.getDisabledCompatibleChildren = function getDisabledCompatibleChildren(element) {
    if ((element.type === 'button' || element.type.name === 'Button' || element.type.displayName === 'Button') && element.props.disabled && this.isHoverTrigger()) {
      // Pick some layout related style properties up to span
      var _splitObject = splitObject(element.props.style, ['position', 'left', 'right', 'top', 'bottom', 'float', 'display', 'zIndex']),
          picked = _splitObject.picked,
          omited = _splitObject.omited;

      var spanStyle = _extends({
        display: 'inline-block'
      }, picked, {
        cursor: 'not-allowed'
      });

      var buttonStyle = _extends({}, omited, {
        pointerEvents: 'none'
      });

      var child = (0, _react.cloneElement)(element, {
        style: buttonStyle,
        className: null
      });
      return _react["default"].createElement("span", {
        style: spanStyle,
        className: element.props.className
      }, child);
    }

    return element;
  };

  _proto.isHoverTrigger = function isHoverTrigger() {
    var trigger = this.props.trigger;

    if (!trigger || trigger === 'hover') {
      return true;
    }

    if (Array.isArray(trigger)) {
      return trigger.indexOf('hover') >= 0;
    }

    return false;
  };

  _proto.isNoTitle = function isNoTitle() {
    var _this$props2 = this.props,
        title = _this$props2.title,
        overlay = _this$props2.overlay;
    return !title && !overlay; // overlay for old version compatibility
  };

  _proto.render = function render() {
    var _classNames;

    var props = this.props,
        state = this.state;
    var prefixCls = props.prefixCls,
        title = props.title,
        overlay = props.overlay,
        openClassName = props.openClassName,
        getPopupContainer = props.getPopupContainer,
        getTooltipContainer = props.getTooltipContainer,
        overlayClassName = props.overlayClassName,
        type = props.type;
    var children = props.children;
    var visible = state.visible; // Hide tooltip when there is no title

    if (!('visible' in props) && this.isNoTitle()) {
      visible = false;
    }

    var child = this.getDisabledCompatibleChildren(_react["default"].isValidElement(children) ? children : _react["default"].createElement("span", null, children));
    var childProps = child.props;
    var childCls = (0, _classnames["default"])(childProps.className, (_classNames = {}, _classNames[openClassName || prefixCls + "-open"] = true, _classNames));
    var tooltipOverlayClass = (0, _classnames["default"])(overlayClassName, prefixCls + "-" + type);
    return _react["default"].createElement(_tooltip["default"], _extends({
      ref: this.getTooltipRef
    }, this.props, {
      getTooltipContainer: getPopupContainer || getTooltipContainer,
      builtinPlacements: this.getPlacements(),
      overlay: overlay || title || '',
      visible: visible,
      onVisibleChange: this.onVisibleChange,
      onPopupAlign: this.onPopupAlign,
      overlayClassName: tooltipOverlayClass
    }), visible ? (0, _react.cloneElement)(child, {
      className: childCls
    }) : child);
  };

  return Tooltip;
}(_react.Component);

exports["default"] = Tooltip;

_defineProperty(Tooltip, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** overlay的类名 */
  overlayClassName: _propTypes["default"].string,

  /** 自定义tip样式 */
  overlayStyle: _propTypes["default"].object,

  /** tip的位置 */
  placement: _propTypes["default"].oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']),
  // builtinPlacements: PropTypes.object,

  /** 是否可视 */
  visible: _propTypes["default"].bool,

  /** 弹窗可视变化时候触发的函数 */
  onVisibleChange: _propTypes["default"].func,

  /** 鼠标进入触发函数延时 */
  mouseEnterDelay: _propTypes["default"].number,

  /** 鼠标离开触发函数延时 */
  mouseLeaveDelay: _propTypes["default"].number,
  transitionName: _propTypes["default"].string,

  /** trigger */
  trigger: _propTypes["default"].oneOf(['hover', 'focus', 'click']),

  /** 弹窗展开时候触发的类名 */
  openClassName: _propTypes["default"].string,
  arrowPointAtCenter: _propTypes["default"].bool,

  /** 被遮挡时是否自适应 */
  autoAdjustOverflow: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].shape({
    adjustX: _propTypes["default"].oneOf([0, 1]),
    adjustY: _propTypes["default"].oneOf([0, 1])
  })]),

  /** 弹窗挂载函数 */
  getTooltipContainer: _propTypes["default"].func,

  /** 弹窗挂载函数 */
  getPopupContainer: _propTypes["default"].func,
  children: _propTypes["default"].node,

  /** 标题 */
  title: _propTypes["default"].node,

  /** 自定义内嵌, 与title作用，相同推荐使用title */
  overlay: _propTypes["default"].node,

  /** tooltip 有两种类型，normal、reverse两种，noraml为白色背景色，reverse为黑色背景色 */
  type: _propTypes["default"].oneOf(['light', 'dark'])
});

_defineProperty(Tooltip, "defaultProps", {
  prefixCls: 'new-fc-one-tooltip',
  placement: 'top',
  transitionName: 'zoom-big-fast',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
  type: 'light'
});

module.exports = exports.default;