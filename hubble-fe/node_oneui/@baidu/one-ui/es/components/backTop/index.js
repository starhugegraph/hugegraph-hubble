function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * backTop
 * @author liuyahui01
 * @date 2019/08/09
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
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
    var classes = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-default"] = !target, _classNames));
    return this.state.visible ? React.createElement(Button, {
      className: classes,
      onClick: this.scrollToTop,
      type: "translucent",
      size: "xsmall"
    }, React.createElement(Icon, {
      type: "arrow-to-top",
      className: prefixCls + "-icon"
    })) : null;
  };

  return BackTop;
}(PureComponent);

_defineProperty(BackTop, "propTypes", {
  /** 用户点击之后回调函数 */
  onClick: PropTypes.func,

  /** 用户监听其滚动的元素 */
  target: PropTypes.func,

  /** 滚动高度到达此致显示BackTop按钮 */
  visibilityHeight: PropTypes.number,

  /** 用户可自定义class前缀 */
  prefixCls: PropTypes.string,

  /** 用户可自定义class */
  className: PropTypes.string
});

_defineProperty(BackTop, "defaultProps", {
  onClick: _.noop,
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

export { BackTop as default };