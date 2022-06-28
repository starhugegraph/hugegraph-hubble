function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createReactContext from 'create-react-context';
import classNames from 'classnames';
import { IconClose } from '@baidu/one-ui-icon';
import Button from '../button';
import RcDrawer from './common/drawerWrapper';
var DrawerContext = createReactContext(null);

var Drawer =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Drawer, _Component);

  function Drawer(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      if (prevProps.visible !== _this.props.visible && _this.parentDrawer) {
        if (_this.props.visible) {
          _this.parentDrawer.push();
        } else {
          _this.parentDrawer.pull();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMaskClick", function (e) {
      if (!_this.props.maskClosable) {
        return;
      }

      _this.close(e);
    });

    _defineProperty(_assertThisInitialized(_this), "getDestoryOnClose", function () {
      return _this.props.destroyOnClose && !_this.props.visible;
    });

    _defineProperty(_assertThisInitialized(_this), "getPushTransform", function (placement) {
      if (placement === 'left' || placement === 'right') {
        return "translateX(" + (placement === 'left' ? 180 : -180) + "px)";
      }

      if (placement === 'top' || placement === 'bottom') {
        return "translateY(" + (placement === 'top' ? 180 : -180) + "px)";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getRcDrawerStyle", function () {
      var _this$props = _this.props,
          zIndex = _this$props.zIndex,
          placement = _this$props.placement,
          maskStyle = _this$props.maskStyle;
      return _this.state.push ? _extends({}, maskStyle, {
        zIndex: zIndex,
        transform: _this.getPushTransform(placement)
      }) : _extends({}, maskStyle, {
        zIndex: zIndex
      });
    });

    _defineProperty(_assertThisInitialized(_this), "close", function (e) {
      if (_this.props.visible !== undefined) {
        if (_this.props.onClose) {
          _this.props.onClose(e);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "push", function () {
      _this.setState({
        push: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pull", function () {
      _this.setState({
        push: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderBody", function () {
      var _classNames;

      var isDestroyOnClose = _this.getDestoryOnClose();

      if (isDestroyOnClose) {
        return null;
      }

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          title = _this$props2.title,
          closable = _this$props2.closable,
          footer = _this$props2.footer,
          placement = _this$props2.placement,
          onOk = _this$props2.onOk,
          onCancel = _this$props2.onCancel,
          okText = _this$props2.okText,
          cancelText = _this$props2.cancelText,
          okProps = _this$props2.okProps,
          cancelProps = _this$props2.cancelProps,
          hideDefaultFooter = _this$props2.hideDefaultFooter,
          size = _this$props2.size;
      var containerStyle = placement === 'left' || placement === 'right' ? {
        overflow: 'auto',
        height: '100%'
      } : {};

      if (isDestroyOnClose) {
        // Increase the opacity transition, delete children after closing.
        containerStyle.opacity = 0;
        containerStyle.transition = 'opacity .3s';
      }

      var header;

      if (title) {
        header = React.createElement("div", {
          className: prefixCls + "-header"
        }, React.createElement("div", {
          className: prefixCls + "-header-container"
        }, React.createElement("div", {
          className: prefixCls + "-title"
        }, title)));
      } // is have closer button


      var closer;

      if (closable) {
        closer = React.createElement("span", {
          className: prefixCls + "-close",
          onClick: _this.close
        }, React.createElement(IconClose, null));
      }

      var drawerFooter = !hideDefaultFooter ? [React.createElement(Button, _extends({
        key: "confirm",
        type: "primary",
        size: size,
        onClick: onOk
      }, okProps), okText), React.createElement(Button, _extends({
        key: "cancel",
        onClick: onCancel,
        size: size
      }, cancelProps), cancelText)] : null;

      if (footer && footer.length) {
        drawerFooter = footer;
      }

      var footerDom = null;

      if (drawerFooter) {
        footerDom = React.createElement("div", {
          className: prefixCls + "-footer"
        }, drawerFooter);
      }

      var bodyClassName = classNames(prefixCls + "-body", (_classNames = {}, _classNames[prefixCls + "-body-" + placement] = true, _classNames[prefixCls + "-body-has-footer"] = footer && footer.length, _classNames));
      var drawerBodyClass = classNames(prefixCls + "-wrapper-body", prefixCls + "-wrapper-body-" + size);
      return React.createElement("div", {
        className: drawerBodyClass,
        style: containerStyle
      }, React.createElement("div", {
        className: prefixCls + "-wrapper-body-container"
      }, header, closer, React.createElement("div", {
        className: bodyClassName,
        style: _this.props.style
      }, _this.props.children), footerDom));
    });

    _defineProperty(_assertThisInitialized(_this), "renderProvider", function (value) {
      var _this$props3 = _this.props,
          zIndex = _this$props3.zIndex,
          style = _this$props3.style,
          placement = _this$props3.placement,
          className = _this$props3.className,
          width = _this$props3.width,
          height = _this$props3.height,
          visible = _this$props3.visible,
          mask = _this$props3.mask,
          destroyOnClose = _this$props3.destroyOnClose,
          closable = _this$props3.closable,
          title = _this$props3.title,
          cancelProps = _this$props3.cancelProps,
          okProps = _this$props3.okProps,
          okText = _this$props3.okText,
          cancelText = _this$props3.cancelText,
          onOk = _this$props3.onOk,
          onCancel = _this$props3.onCancel,
          hideDefaultFooter = _this$props3.hideDefaultFooter,
          footer = _this$props3.footer,
          rest = _objectWithoutPropertiesLoose(_this$props3, ["zIndex", "style", "placement", "className", "width", "height", "visible", "mask", "destroyOnClose", "closable", "title", "cancelProps", "okProps", "okText", "cancelText", "onOk", "onCancel", "hideDefaultFooter", "footer"]);

      var haveMask = mask ? '' : 'no-mask';
      _this.parentDrawer = value;
      var offsetStyle = {};

      if (placement === 'left' || placement === 'right') {
        offsetStyle.width = width;
      } else {
        offsetStyle.height = height;
      }

      return React.createElement(DrawerContext.Provider, {
        value: _assertThisInitialized(_this)
      }, React.createElement(RcDrawer, _extends({
        level: null,
        handler: false
      }, rest, offsetStyle, {
        open: visible,
        onClose: _this.onMaskClick,
        showMask: mask,
        placement: placement,
        style: _this.getRcDrawerStyle(),
        className: classNames(className, haveMask)
      }), _this.renderBody()));
    });

    _this.state = {
      push: false
    };
    return _this;
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    return React.createElement(DrawerContext.Consumer, null, this.renderProvider);
  };

  return Drawer;
}(Component);

_defineProperty(Drawer, "propTypes", {
  /** 是否允许关闭 */
  closable: PropTypes.bool,

  /** 关闭时候是否销毁 */
  destroyOnClose: PropTypes.bool,

  /** 挂载的dom */
  getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.func, PropTypes.bool]),

  /** 外层遮罩是否可点击关闭 */
  maskClosable: PropTypes.bool,

  /** 是否有遮罩 */
  mask: PropTypes.bool,

  /** 遮罩的style */
  maskStyle: PropTypes.object,

  /** 自定义draw的style */
  style: PropTypes.object,

  /** draw的标题 */
  title: PropTypes.node,

  /** 是否可见 */
  visible: PropTypes.bool,

  /** draw的宽度 */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** z-index层级 */
  zIndex: PropTypes.number,

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 弹出的位置 */
  placement: PropTypes.string,

  /** 关闭时触发 */
  onClose: PropTypes.func,

  /** 自定义类名 */
  className: PropTypes.string,

  /** drawer的children */
  children: PropTypes.node,

  /** drawer的高度 */
  height: PropTypes.number,

  /** 传入底部按钮 */
  footer: PropTypes.array,
  hideDefaultFooter: PropTypes.bool,

  /** 仅仅对默认footer生效 */
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  okText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  cancelText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  okProps: PropTypes.object,
  cancelProps: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium'])
});

_defineProperty(Drawer, "defaultProps", {
  prefixCls: 'new-fc-one-drawer',
  width: 400,
  height: 256,
  closable: true,
  placement: 'right',
  maskClosable: true,
  mask: true,
  footer: null,
  hideDefaultFooter: true,
  onOk: function onOk() {},
  onCancel: function onCancel() {},
  okText: '确定',
  cancelText: '取消',
  okProps: {},
  cancelProps: {},
  size: 'small'
});

export { Drawer as default };