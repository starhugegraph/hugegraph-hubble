function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 步骤条
 * @author huangshiming
 */
import React, { cloneElement, Children, Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../icon';
import Step from './step';

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
      finish: React.createElement(Icon, {
        type: "check"
      }),
      error: React.createElement(Icon, {
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

    var filteredChildren = React.Children.toArray(children).filter(function (child) {
      return !!child;
    });
    var stepClxs = classnames(prefixCls, prefixCls + "-" + direction, className, (_classnames = {}, _classnames[prefixCls + "-" + size] = size, _classnames[prefixCls + "-label-" + labelPlacement] = direction === 'horizontal', _classnames));
    return React.createElement("div", _extends({
      className: stepClxs,
      style: style
    }, restProps), Children.map(filteredChildren, function (child, index) {
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

      return cloneElement(child, childProps);
    }));
  };

  return Steps;
}(Component);

_defineProperty(Steps, "Step", Step);

_defineProperty(Steps, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 当前步骤 */
  current: PropTypes.number,

  /** 步骤条的方向 */
  direction: PropTypes.string,

  /** 描述文案放置的位置 */
  labelPlacement: PropTypes.string,

  /** 是否需要展示hover状态 */
  showTipWhenHover: PropTypes.bool,

  /** size 步骤条的尺寸 */
  size: PropTypes.oneOf(['small', 'medium']),

  /** 当前步骤的状态， wait, process,finish, error */
  status: PropTypes.string,

  /** initialStep 初始化的步骤条 */
  initialStep: PropTypes.number,

  /** 自定义className */
  className: PropTypes.string,

  /** 自定义style */
  style: PropTypes.object,

  /** children */
  children: PropTypes.node,

  /** onClickStep 暴露点击step的函数 */
  onClickStep: PropTypes.func
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

export { Steps as default };