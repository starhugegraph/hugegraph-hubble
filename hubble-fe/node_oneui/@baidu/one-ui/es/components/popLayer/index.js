function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon';
import Button from '../button';
import PopSelectTrigger from '../select/common/popSelectTrigger';

var PopLayer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PopLayer, _PureComponent);

  function PopLayer(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      if ('visible' in nextProps) {
        _this.setState({
          visible: nextProps.visible
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }

      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderHeader", function () {
      var _classNames;

      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          disabled = _this$props.disabled,
          header = _this$props.header,
          size = _this$props.size;
      var visible = _this.state.visible;

      if (children) {
        return children;
      }

      var headerClassName = prefixCls + "-header";
      var classes = classNames(headerClassName, (_classNames = {}, _classNames[headerClassName + "-open"] = visible, _classNames[headerClassName + "-disabled"] = disabled, _classNames));
      return React.createElement("span", {
        className: classes
      }, React.createElement(Button, {
        icon: React.createElement(Icon, {
          type: "angle-down"
        }),
        size: size,
        disabled: disabled
      }, header));
    });

    _this.state = {
      visible: props.visible
    };
    return _this;
  }

  var _proto = PopLayer.prototype;

  _proto.render = function render() {
    var popLayerProps = _extends({}, this.props, {
      visible: this.state.visible,
      onVisibleChange: this.onVisibleChange
    });

    var children = this.renderHeader();
    return React.createElement(PopSelectTrigger, popLayerProps, children);
  };

  return PopLayer;
}(PureComponent);

_defineProperty(PopLayer, "propTypes", {
  /**
   * 类名前缀
   */
  prefixCls: PropTypes.string,

  /**
   * 触发方式，hover\click  默认hover
   */
  trigger: PropTypes.string,

  /**
   * popLayer的children
   */
  children: PropTypes.node,

  /**
   * 是否禁用，默认false
   */
  disabled: PropTypes.bool,

  /**
   * 默认是否可视
   */
  visible: PropTypes.bool,

  /**
   * 使用标准触发的按钮的文案
   */
  header: PropTypes.string,

  /**
   * visibleChange的时候触发的函数
   */
  onVisibleChange: PropTypes.func,

  /**
   * 禁止使用的原因
   */
  disabledReason: PropTypes.string,

  /**
   * 是否展示禁止理由
   */
  showDisabledReason: PropTypes.bool,

  /**
   * 使用让popLayer与按钮同宽
   */
  dropdownMatchSelectWidth: PropTypes.bool,

  /**
   * popLayer 挂载的函数
   */
  getPopupContainer: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
});

_defineProperty(PopLayer, "defaultProps", {
  prefixCls: 'new-fc-one-popLayer',
  trigger: 'hover',
  disabled: false,
  header: '',
  onVisibleChange: function onVisibleChange() {},
  disabledReason: '',
  showDisabledReason: false,
  dropdownMatchSelectWidth: true,
  size: 'medium'
});

export { PopLayer as default };