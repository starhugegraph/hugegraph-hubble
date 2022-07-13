function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 步骤条-step
 * @author huangshiming
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Tooltip from '../tooltip';
import Button from '../button';

var Step =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Step, _Component);

  function Step() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickStep", function () {
      var _this$props = _this.props,
          onClickStep = _this$props.onClickStep,
          stepNumber = _this$props.stepNumber;

      if (onClickStep) {
        onClickStep(stepNumber);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderIconNode", function () {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          stepNumber = _this$props2.stepNumber,
          status = _this$props2.status,
          icons = _this$props2.icons,
          icon = _this$props2.icon,
          _this$props2$iconClas = _this$props2.iconClassName,
          iconClassName = _this$props2$iconClas === void 0 ? '' : _this$props2$iconClas;
      var iconNode;
      var iconClx = classnames(prefixCls + "-icon", 'new-fc-one-icon', iconClassName, {
        'new-fc-one-icon-check': status === 'finish' && icons && !icons.finish,
        'new-fc-one-icon-close': status === 'error' && icons && !icons.error
      });

      if (icon && iconClassName) {
        iconNode = React.createElement("span", {
          className: iconClassName
        }, icon);
      } else if (icons && icons.finish && status === 'finish') {
        iconNode = React.createElement("span", {
          className: prefixCls + "-icon"
        }, icons.finish);
      } else if (icons && icons.error && status === 'error') {
        iconNode = React.createElement("span", {
          className: prefixCls + "-icon"
        }, icons.error);
      } else if (status === 'finish' || status === 'error') {
        iconNode = React.createElement("span", {
          className: iconClx
        });
      } else {
        iconNode = React.createElement("span", {
          className: prefixCls + "-icon"
        }, stepNumber);
      }

      return iconNode;
    });

    return _this;
  }

  var _proto = Step.prototype;

  _proto.render = function render() {
    var _classnames, _classnames2, _classnames3;

    var _this$props3 = this.props,
        className = _this$props3.className,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style,
        itemWidth = _this$props3.itemWidth,
        _this$props3$status = _this$props3.status,
        status = _this$props3$status === void 0 ? 'wait' : _this$props3$status,
        adjustMarginRight = _this$props3.adjustMarginRight,
        description = _this$props3.description,
        title = _this$props3.title,
        tailContent = _this$props3.tailContent,
        icon = _this$props3.icon,
        showTipWhenHover = _this$props3.showTipWhenHover,
        hoverTip = _this$props3.hoverTip,
        stepNumber = _this$props3.stepNumber,
        current = _this$props3.current;
    var classString = classnames(prefixCls + "-item", prefixCls + "-item-" + status, (_classnames = {}, _classnames[prefixCls + "-item-custom"] = icon, _classnames[prefixCls + "-item-is-current"] = +current === +stepNumber, _classnames), className);

    var stepItemStyle = _extends({}, style);

    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    if (adjustMarginRight) {
      stepItemStyle.marginRight = adjustMarginRight;
    }

    var stepText = '';

    if (status === 'finish') {
      stepText = '已完成';
    } else if (status === 'wait') {
      stepText = '未开始';
    } else if (status === 'process') {
      stepText = '进行中';
    } else if (status === 'error') {
      stepText = '错误';
    }

    var iconNode = this.renderIconNode();
    var iconHoverTip = hoverTip || "\u7B2C" + stepNumber + "\u6B65" + stepText;
    var iconRenderItem = showTipWhenHover ? React.createElement(Tooltip, {
      placement: "top",
      title: iconHoverTip,
      style: {
        marginBottom: '5px'
      }
    }, React.createElement(Button, {
      className: prefixCls + "-item-icon",
      icon: iconNode
    })) : React.createElement(Button, {
      className: prefixCls + "-item-icon",
      icon: iconNode
    });
    var contentClassNames = classnames(prefixCls + "-item-content", (_classnames2 = {}, _classnames2[prefixCls + "-item-title-only"] = !description, _classnames2));
    var titleTextClassNames = classnames(prefixCls + "-item-title-text", (_classnames3 = {}, _classnames3[prefixCls + "-item-title-text-only"] = !description, _classnames3));
    return React.createElement("div", {
      className: classString,
      style: stepItemStyle,
      onClick: this.onClickStep
    }, React.createElement("div", {
      className: prefixCls + "-item-tail"
    }, tailContent), iconRenderItem, React.createElement("div", {
      className: contentClassNames
    }, React.createElement("div", {
      className: prefixCls + "-item-title"
    }, React.createElement("span", {
      className: titleTextClassNames
    }, title)), description && React.createElement("div", {
      className: prefixCls + "-item-description"
    }, description)));
  };

  return Step;
}(Component);

_defineProperty(Step, "propTypes", {
  /** 自定义类名 */
  className: PropTypes.string,

  /** 自定义类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义样式 */
  style: PropTypes.object,

  /** 可自定义当前步骤节点的宽度 */
  itemWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** 当前步骤的状态 */
  status: PropTypes.string,

  /** 是否需要在当前步骤条展示hover状态 */
  showTipWhenHover: PropTypes.bool,

  /** 自定义步骤条item的右边margin */
  adjustMarginRight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /** 当前步骤条的步数 */
  stepNumber: PropTypes.string,

  /** 描述 */
  description: PropTypes.any,

  /** 标题 */
  title: PropTypes.any,

  /** 步骤条连接线 */
  tailContent: PropTypes.any,

  /** 步骤条的icon类型 */
  icons: PropTypes.shape({
    finish: PropTypes.node,
    error: PropTypes.node
  }),

  /** 自定义icon */
  icon: PropTypes.node,

  /** 自定义icon的icon className */
  iconClassName: PropTypes.string,

  /** 自定义hoverTip */
  hoverTip: PropTypes.string,

  /** 点击step的回调函数 */
  onClickStep: PropTypes.func,
  current: PropTypes.number
});

export { Step as default };