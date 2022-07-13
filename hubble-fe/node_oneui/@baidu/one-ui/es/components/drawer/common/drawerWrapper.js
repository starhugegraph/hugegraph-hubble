function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Portal from 'rc-util/lib/PortalWrapper';
import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import Child from './drawerChild';

var DrawerWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DrawerWrapper, _React$Component);

  function DrawerWrapper(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onHandleClick", function (e) {
      var _this$props = _this.props,
          onHandleClick = _this$props.onHandleClick,
          $open = _this$props.open;

      if (onHandleClick) {
        onHandleClick(e);
      }

      if (typeof $open === 'undefined') {
        var open = _this.state.open;

        _this.setState({
          open: !open
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClose", function (e) {
      var _this$props2 = _this.props,
          onClose = _this$props2.onClose,
          open = _this$props2.open;

      if (onClose) {
        onClose(e);
      }

      if (typeof open === 'undefined') {
        _this.setState({
          open: false
        });
      }
    });

    var _open = typeof props.open !== 'undefined' ? props.open : !!props.defaultOpen;

    _this.state = {
      open: _open
    };
    return _this;
  }

  var _proto = DrawerWrapper.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        defaultOpen = _this$props3.defaultOpen,
        getContainer = _this$props3.getContainer,
        wrapperClassName = _this$props3.wrapperClassName,
        forceRender = _this$props3.forceRender,
        handler = _this$props3.handler,
        props = _objectWithoutPropertiesLoose(_this$props3, ["defaultOpen", "getContainer", "wrapperClassName", "forceRender", "handler"]);

    var open = this.state.open; // 渲染在当前 dom 里；

    if (!getContainer) {
      return React.createElement("div", {
        className: wrapperClassName,
        ref: function ref(c) {
          _this2.dom = c;
        }
      }, React.createElement(Child, _extends({}, props, {
        open: open,
        handler: handler,
        getContainer: function getContainer() {
          return _this2.dom;
        },
        onClose: this.onClose,
        onHandleClick: this.onHandleClick
      })));
    } // 如果有 handler 为内置强制渲染；


    var $forceRender = !!handler || forceRender;
    return React.createElement(Portal, {
      visible: open,
      forceRender: $forceRender,
      getContainer: getContainer,
      wrapperClassName: wrapperClassName
    }, function (_ref) {
      var visible = _ref.visible,
          afterClose = _ref.afterClose,
          rest = _objectWithoutPropertiesLoose(_ref, ["visible", "afterClose"]);

      return (// react 15，componentWillUnmount 时 Portal 返回 afterClose, visible.
        React.createElement(Child, _extends({}, props, rest, {
          open: visible !== undefined ? visible : open,
          afterVisibleChange: afterClose !== undefined ? afterClose : props.afterVisibleChange,
          handler: handler,
          onClose: _this2.onClose,
          onHandleClick: _this2.onHandleClick
        }))
      );
    });
  };

  return DrawerWrapper;
}(React.Component);

_defineProperty(DrawerWrapper, "propTypes", {
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
  wrapperClassName: PropTypes.string,
  forceRender: PropTypes.bool,
  getContainer: PropTypes.func,
  className: PropTypes.string
});

_defineProperty(DrawerWrapper, "defaultProps", {
  prefixCls: 'new-fc-one-drawer',
  placement: 'left',
  getContainer: function getContainer() {
    return document.body;
  },
  defaultOpen: false,
  level: 'all',
  duration: '.3s',
  ease: 'cubic-bezier(0.78, 0.14, 0.15, 0.86)',
  onChange: function onChange() {},
  afterVisibleChange: function afterVisibleChange() {},
  handler: React.createElement("div", {
    className: "drawer-handle"
  }, React.createElement("i", {
    className: "drawer-handle-icon"
  })),
  showMask: true,
  maskClosable: true,
  maskStyle: {},
  wrapperClassName: '',
  className: '',
  keyboard: true,
  forceRender: false
});

_defineProperty(DrawerWrapper, "getDerivedStateFromProps", function (props, _ref2) {
  var prevProps = _ref2.prevProps;
  var newState = {
    prevProps: props
  };

  if (typeof prevProps !== 'undefined' && props.open !== prevProps.open) {
    newState.open = props.open;
  }

  return newState;
});

export default polyfill(DrawerWrapper);