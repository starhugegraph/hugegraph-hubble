function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import classnames from 'classnames';
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import KeyCode from 'rc-util/lib/KeyCode';
import switchScrollingEffect from 'rc-util/lib/switchScrollingEffect';
import React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import { addEventListener, dataToArray, getTouchParentScroll, isNumeric, removeEventListener, transformArguments, transitionEnd, transitionStr, windowIsUndefined } from '../../../core/drawerTools';
var currentDrawer = {};

var DrawerChild =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DrawerChild, _React$Component);

  function DrawerChild(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "domFocus", function () {
      if (_this.dom) {
        _this.dom.focus();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "removeStartHandler", function (e) {
      if (e.touches.length > 1) {
        return;
      }

      _this.startPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "removeMoveHandler", function (e) {
      if (e.changedTouches.length > 1) {
        return;
      }

      var currentTarget = e.currentTarget;
      var differX = e.changedTouches[0].clientX - _this.startPos.x;
      var differY = e.changedTouches[0].clientY - _this.startPos.y;

      if (currentTarget === _this.maskDom || currentTarget === _this.handlerDom || currentTarget === _this.contentDom && getTouchParentScroll(currentTarget, e.target, differX, differY)) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "transitionEnd", function (e) {
      var dom = e.target;
      removeEventListener(dom, transitionEnd, _this.transitionEnd);
      dom.style.transition = '';
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === KeyCode.ESC) {
        var onClose = _this.props.onClose;
        e.stopPropagation();

        if (onClose) {
          onClose(e);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onWrapperTransitionEnd", function (e) {
      var _this$props = _this.props,
          open = _this$props.open,
          afterVisibleChange = _this$props.afterVisibleChange;

      if (e.target === _this.contentWrapper && e.propertyName.match(/transform$/)) {
        _this.dom.style.transition = '';

        if (!open && _this.getCurrentDrawerSome()) {
          document.body.style.overflowX = '';

          if (_this.maskDom) {
            _this.maskDom.style.left = '';
            _this.maskDom.style.width = '';
          }
        }

        if (afterVisibleChange) {
          afterVisibleChange(!!open);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "openLevelTransition", function () {
      var _this$props2 = _this.props,
          open = _this$props2.open,
          width = _this$props2.width,
          height = _this$props2.height;

      var _this$getHorizontalBo = _this.getHorizontalBoolAndPlacementName(),
          isHorizontal = _this$getHorizontalBo.isHorizontal,
          placementName = _this$getHorizontalBo.placementName;

      var contentValue = _this.contentDom ? _this.contentDom.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] : 0;
      var value = (isHorizontal ? width : height) || contentValue;

      _this.setLevelAndScrolling(open, placementName, value);
    });

    _defineProperty(_assertThisInitialized(_this), "setLevelTransform", function (open, placementName, value, right) {
      var _this$props3 = _this.props,
          placement = _this$props3.placement,
          levelMove = _this$props3.levelMove,
          duration = _this$props3.duration,
          ease = _this$props3.ease,
          showMask = _this$props3.showMask; // router 切换时可能会导至页面失去滚动条，所以需要时时获取。

      _this.levelDom.forEach(function (dom) {
        dom.style.transition = "transform " + duration + " " + ease;
        addEventListener(dom, transitionEnd, _this.transitionEnd);
        var levelValue = open ? value : 0;

        if (levelMove) {
          var $levelMove = transformArguments(levelMove, {
            target: dom,
            open: open
          });
          levelValue = open ? $levelMove[0] : $levelMove[1] || 0;
        }

        var $value = typeof levelValue === 'number' ? levelValue + "px" : levelValue;
        var placementPos = placement === 'left' || placement === 'top' ? $value : "-" + $value;
        placementPos = showMask && placement === 'right' && right ? "calc(" + placementPos + " + " + right + "px)" : placementPos;
        dom.style.transform = levelValue ? placementName + "(" + placementPos + ")" : '';
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setLevelAndScrolling", function (open, placementName, value) {
      var onChange = _this.props.onChange;

      if (!windowIsUndefined) {
        var right = document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) && window.innerWidth > document.body.offsetWidth ? getScrollBarSize(true) : 0;

        _this.setLevelTransform(open, placementName, value, right);

        _this.toggleScrollingToDrawerAndBody(right);
      }

      if (onChange) {
        onChange(open);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "toggleScrollingToDrawerAndBody", function (right) {
      var _this$props4 = _this.props,
          getOpenCount = _this$props4.getOpenCount,
          getContainer = _this$props4.getContainer,
          showMask = _this$props4.showMask,
          open = _this$props4.open;
      var container = getContainer && getContainer();
      var openCount = getOpenCount && getOpenCount(); // 处理 body 滚动

      if (container && container.parentNode === document.body && showMask) {
        var eventArray = ['touchstart'];
        var domArray = [document.body, _this.maskDom, _this.handlerDom, _this.contentDom];

        if (open && document.body.style.overflow !== 'hidden') {
          if (right) {
            _this.addScrollingEffect(right);
          }

          if (openCount === 1) {
            document.body.style.overflow = 'hidden';
          }

          document.body.style.touchAction = 'none'; // 手机禁滚

          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            addEventListener(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        } else if (_this.getCurrentDrawerSome()) {
          // 没有弹框的状态下清除 overflow;
          if (!openCount) {
            document.body.style.overflow = '';
          }

          document.body.style.touchAction = '';

          if (right) {
            _this.remScrollingEffect(right);
          } // 恢复事件


          domArray.forEach(function (item, i) {
            if (!item) {
              return;
            }

            removeEventListener(item, eventArray[i] || 'touchmove', i ? _this.removeMoveHandler : _this.removeStartHandler, _this.passive);
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addScrollingEffect", function (right) {
      var _this$props5 = _this.props,
          placement = _this$props5.placement,
          duration = _this$props5.duration,
          ease = _this$props5.ease,
          getOpenCount = _this$props5.getOpenCount;
      var openCount = getOpenCount && getOpenCount();

      if (openCount === 1) {
        switchScrollingEffect();
      }

      var widthTransition = "width " + duration + " " + ease;
      var transformTransition = "transform " + duration + " " + ease;
      _this.dom.style.transition = 'none';

      switch (placement) {
        case 'right':
          _this.dom.style.transform = "translateX(-" + right + "px)";
          break;

        case 'top':
        case 'bottom':
          _this.dom.style.width = "calc(100% - " + right + "px)";
          _this.dom.style.transform = 'translateZ(0)';
          break;

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = transformTransition + "," + widthTransition;
          _this.dom.style.width = '';
          _this.dom.style.transform = '';
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "remScrollingEffect", function (right) {
      var _this$props6 = _this.props,
          placement = _this$props6.placement,
          duration = _this$props6.duration,
          ease = _this$props6.ease,
          getOpenCount = _this$props6.getOpenCount;
      var openCount = getOpenCount && getOpenCount();

      if (!openCount) {
        switchScrollingEffect(true);
      }

      if (transitionStr) {
        document.body.style.overflowX = 'hidden';
      }

      _this.dom.style.transition = 'none';
      var heightTransition;
      var widthTransition = "width " + duration + " " + ease;
      var transformTransition = "transform " + duration + " " + ease;

      switch (placement) {
        case 'left':
          {
            _this.dom.style.width = '100%';
            widthTransition = "width 0s " + ease + " " + duration;
            break;
          }

        case 'right':
          {
            _this.dom.style.transform = "translateX(" + right + "px)";
            _this.dom.style.width = '100%';
            widthTransition = "width 0s " + ease + " " + duration;

            if (_this.maskDom) {
              _this.maskDom.style.left = "-" + right + "px";
              _this.maskDom.style.width = "calc(100% + " + right + "px)";
            }

            break;
          }

        case 'top':
        case 'bottom':
          {
            _this.dom.style.width = "calc(100% + " + right + "px)";
            _this.dom.style.height = '100%';
            _this.dom.style.transform = 'translateZ(0)';
            heightTransition = "height 0s " + ease + " " + duration;
            break;
          }

        default:
          break;
      }

      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(function () {
        if (_this.dom) {
          _this.dom.style.transition = transformTransition + "," + (heightTransition ? heightTransition + "," : '') + widthTransition;
          _this.dom.style.transform = '';
          _this.dom.style.width = '';
          _this.dom.style.height = '';
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentDrawerSome", function () {
      return !Object.keys(currentDrawer).some(function (key) {
        return currentDrawer[key];
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getLevelDom", function (_ref) {
      var level = _ref.level,
          getContainer = _ref.getContainer;

      if (windowIsUndefined) {
        return;
      }

      var container = getContainer && getContainer();
      var parent = container ? container.parentNode : null;
      _this.levelDom = [];

      if (level === 'all') {
        var children = parent ? Array.prototype.slice.call(parent.children) : [];
        children.forEach(function (child) {
          if (child.nodeName !== 'SCRIPT' && child.nodeName !== 'STYLE' && child.nodeName !== 'LINK' && child !== container) {
            _this.levelDom.push(child);
          }
        });
      } else if (level) {
        dataToArray(level).forEach(function (key) {
          document.querySelectorAll(key).forEach(function (item) {
            _this.levelDom.push(item);
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getHorizontalBoolAndPlacementName", function () {
      var placement = _this.props.placement;
      var isHorizontal = placement === 'left' || placement === 'right';
      var placementName = "translate" + (isHorizontal ? 'X' : 'Y');
      return {
        isHorizontal: isHorizontal,
        placementName: placementName
      };
    });

    _this.state = {
      _self: _assertThisInitialized(_this)
    };
    return _this;
  }

  var _proto = DrawerChild.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (!windowIsUndefined) {
      var passiveSupported = false;
      window.addEventListener('test', function () {}, Object.defineProperty({}, 'passive', {
        get: function get() {
          passiveSupported = true;
          return null;
        }
      }));
      this.passive = passiveSupported ? {
        passive: false
      } : false;
    }

    var open = this.props.open;
    this.drawerId = "drawer_id_" + Number((Date.now() + Math.random()).toString().replace('.', Math.round(Math.random() * 9).toString())).toString(16);
    this.getLevelDom(this.props);

    if (open) {
      currentDrawer[this.drawerId] = open; // 默认打开状态时推出 level;

      this.openLevelTransition();
      this.forceUpdate(function () {
        _this2.domFocus();
      });
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var open = this.props.open;

    if (open !== prevProps.open) {
      if (open) {
        this.domFocus();
      }

      currentDrawer[this.drawerId] = !!open;
      this.openLevelTransition();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    var _this$props7 = this.props,
        getOpenCount = _this$props7.getOpenCount,
        open = _this$props7.open;
    delete currentDrawer[this.drawerId];

    if (open) {
      this.setLevelTransform(false);
      document.body.style.touchAction = '';
    }

    if (typeof getOpenCount === 'function' && !getOpenCount()) {
      document.body.style.overflow = '';
    }
  };

  _proto.render = function render() {
    var _classnames,
        _this3 = this;

    var _this$props8 = this.props,
        className = _this$props8.className,
        children = _this$props8.children,
        style = _this$props8.style,
        width = _this$props8.width,
        height = _this$props8.height,
        defaultOpen = _this$props8.defaultOpen,
        $open = _this$props8.open,
        prefixCls = _this$props8.prefixCls,
        placement = _this$props8.placement,
        level = _this$props8.level,
        levelMove = _this$props8.levelMove,
        ease = _this$props8.ease,
        duration = _this$props8.duration,
        getContainer = _this$props8.getContainer,
        handler = _this$props8.handler,
        onChange = _this$props8.onChange,
        afterVisibleChange = _this$props8.afterVisibleChange,
        showMask = _this$props8.showMask,
        maskClosable = _this$props8.maskClosable,
        maskStyle = _this$props8.maskStyle,
        drawerStyle = _this$props8.drawerStyle,
        onClose = _this$props8.onClose,
        onHandleClick = _this$props8.onHandleClick,
        keyboard = _this$props8.keyboard,
        getOpenCount = _this$props8.getOpenCount,
        props = _objectWithoutPropertiesLoose(_this$props8, ["className", "children", "style", "width", "height", "defaultOpen", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "handler", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "drawerStyle", "onClose", "onHandleClick", "keyboard", "getOpenCount"]); // 首次渲染都将是关闭状态。


    var open = this.dom ? $open : false;
    var wrapperClassName = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-" + placement] = true, _classnames[prefixCls + "-open"] = open, _classnames[className || ''] = !!className, _classnames['no-mask'] = !showMask, _classnames));
    var placementName = this.getHorizontalBoolAndPlacementName().placementName; // 百分比与像素动画不同步，第一次打用后全用像素动画。
    // const defaultValue = !this.contentDom || !level ? '100%' : `${value}px`;

    var placementPos = placement === 'left' || placement === 'top' ? '-100%' : '100%';
    var transform = open ? '' : placementName + "(" + placementPos + ")";
    var handlerChildren = handler && React.cloneElement(handler, {
      onClick: function onClick(e) {
        if (handler.props.onClick) {
          handler.props.onClick();
        }

        if (onHandleClick) {
          onHandleClick(e);
        }
      },
      ref: function ref(c) {
        _this3.handlerDom = c;
      }
    });
    return React.createElement("div", _extends({}, omit(props, ['switchScrollingEffect']), {
      tabIndex: -1,
      className: wrapperClassName,
      style: style,
      ref: function ref(c) {
        _this3.dom = c;
      },
      onKeyDown: open && keyboard ? this.onKeyDown : undefined,
      onTransitionEnd: this.onWrapperTransitionEnd
    }), showMask && React.createElement("div", {
      className: prefixCls + "-mask",
      onClick: maskClosable ? onClose : undefined,
      style: maskStyle,
      ref: function ref(c) {
        _this3.maskDom = c;
      }
    }), React.createElement("div", {
      className: prefixCls + "-content-wrapper",
      style: _extends({
        transform: transform,
        msTransform: transform,
        width: isNumeric(width) ? width + "px" : width,
        height: isNumeric(height) ? height + "px" : height
      }, drawerStyle),
      ref: function ref(c) {
        _this3.contentWrapper = c;
      }
    }, React.createElement("div", {
      className: prefixCls + "-content",
      ref: function ref(c) {
        _this3.contentDom = c;
      },
      onTouchStart: open && showMask ? this.removeStartHandler : undefined // 跑用例用
      ,
      onTouchMove: open && showMask ? this.removeMoveHandler : undefined // 跑用例用

    }, children), handlerChildren));
  };

  return DrawerChild;
}(React.Component);

_defineProperty(DrawerChild, "propTypes", {
  prefixCls: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  open: PropTypes.bool,
  defaultOpen: PropTypes.bool,
  handler: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  placement: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  level: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  duration: PropTypes.string,
  ease: PropTypes.string,
  showMask: PropTypes.bool,
  maskClosable: PropTypes.bool,
  maskStyle: PropTypes.object,
  drawerStyle: PropTypes.object,
  onChange: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  onHandleClick: PropTypes.func,
  onClose: PropTypes.func,
  keyboard: PropTypes.bool,
  getContainer: PropTypes.func,
  getOpenCount: PropTypes.func,
  levelMove: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object
});

_defineProperty(DrawerChild, "getDerivedStateFromProps", function (props, _ref2) {
  var prevProps = _ref2.prevProps,
      _self = _ref2._self;
  var nextState = {
    prevProps: props
  };

  if (prevProps !== undefined) {
    var placement = props.placement,
        level = props.level;

    if (placement !== prevProps.placement) {
      // test 的 bug, 有动画过场，删除 dom
      _self.contentDom = null;
    }

    if (level !== prevProps.level) {
      _self.getLevelDom(props);
    }
  }

  return nextState;
});

export default polyfill(DrawerChild);