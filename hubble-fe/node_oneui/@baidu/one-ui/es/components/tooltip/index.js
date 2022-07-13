function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CommonTooltip from './common/tooltip';
import _getPlacements from './placements';

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
    return _getPlacements({
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

      var child = cloneElement(element, {
        style: buttonStyle,
        className: null
      });
      return React.createElement("span", {
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

    var child = this.getDisabledCompatibleChildren(React.isValidElement(children) ? children : React.createElement("span", null, children));
    var childProps = child.props;
    var childCls = classNames(childProps.className, (_classNames = {}, _classNames[openClassName || prefixCls + "-open"] = true, _classNames));
    var tooltipOverlayClass = classNames(overlayClassName, prefixCls + "-" + type);
    return React.createElement(CommonTooltip, _extends({
      ref: this.getTooltipRef
    }, this.props, {
      getTooltipContainer: getPopupContainer || getTooltipContainer,
      builtinPlacements: this.getPlacements(),
      overlay: overlay || title || '',
      visible: visible,
      onVisibleChange: this.onVisibleChange,
      onPopupAlign: this.onPopupAlign,
      overlayClassName: tooltipOverlayClass
    }), visible ? cloneElement(child, {
      className: childCls
    }) : child);
  };

  return Tooltip;
}(Component);

_defineProperty(Tooltip, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** overlay的类名 */
  overlayClassName: PropTypes.string,

  /** 自定义tip样式 */
  overlayStyle: PropTypes.object,

  /** tip的位置 */
  placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']),
  // builtinPlacements: PropTypes.object,

  /** 是否可视 */
  visible: PropTypes.bool,

  /** 弹窗可视变化时候触发的函数 */
  onVisibleChange: PropTypes.func,

  /** 鼠标进入触发函数延时 */
  mouseEnterDelay: PropTypes.number,

  /** 鼠标离开触发函数延时 */
  mouseLeaveDelay: PropTypes.number,
  transitionName: PropTypes.string,

  /** trigger */
  trigger: PropTypes.oneOf(['hover', 'focus', 'click']),

  /** 弹窗展开时候触发的类名 */
  openClassName: PropTypes.string,
  arrowPointAtCenter: PropTypes.bool,

  /** 被遮挡时是否自适应 */
  autoAdjustOverflow: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({
    adjustX: PropTypes.oneOf([0, 1]),
    adjustY: PropTypes.oneOf([0, 1])
  })]),

  /** 弹窗挂载函数 */
  getTooltipContainer: PropTypes.func,

  /** 弹窗挂载函数 */
  getPopupContainer: PropTypes.func,
  children: PropTypes.node,

  /** 标题 */
  title: PropTypes.node,

  /** 自定义内嵌, 与title作用，相同推荐使用title */
  overlay: PropTypes.node,

  /** tooltip 有两种类型，normal、reverse两种，noraml为白色背景色，reverse为黑色背景色 */
  type: PropTypes.oneOf(['light', 'dark'])
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

export { Tooltip as default };