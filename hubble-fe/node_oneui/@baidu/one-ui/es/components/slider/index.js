function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip from '../tooltip';
var markType = PropTypes.objectOf(PropTypes.oneOfType([PropTypes.shape({
  style: PropTypes.object,
  label: PropTypes.node
}), PropTypes.node]));

var Slider =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Slider, _PureComponent);

  function Slider(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleTooltipVisible", function (index, visible) {
      _this.setState(function (_ref) {
        var _extends2;

        var visibles = _ref.visibles;
        return {
          visibles: _extends({}, visibles, (_extends2 = {}, _extends2[index] = visible, _extends2))
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTooltipRef", function (ref) {
      _this.tooltipRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (props) {
      _this.props.onChange(props);

      if (_this.tooltipRef && _this.tooltipRef.tooltipRef && _this.tooltipRef.tooltipRef.trigger && _this.tooltipRef.tooltipRef.trigger.forcePopupAlign && typeof _this.tooltipRef.tooltipRef.trigger.forcePopupAlign === 'function') {
        _this.tooltipRef.tooltipRef.trigger.forcePopupAlign();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveSlider", function (node) {
      _this.rcSlider = node;
    });

    _this.state = {
      visibles: {}
    };
    return _this;
  }

  var _proto = Slider.prototype;

  _proto.handleWithTooltip = function handleWithTooltip(tooltipPrefixCls, _ref2) {
    var _this2 = this;

    var value = _ref2.value,
        dragging = _ref2.dragging,
        index = _ref2.index,
        restProps = _objectWithoutPropertiesLoose(_ref2, ["value", "dragging", "index"]);

    var _this$props = this.props,
        tipFormatter = _this$props.tipFormatter,
        tooltipVisible = _this$props.tooltipVisible,
        tooltipPlacement = _this$props.tooltipPlacement,
        getTooltipPopupContainer = _this$props.getTooltipPopupContainer;
    var visibles = this.state.visibles;
    var isTipFormatter = tipFormatter ? visibles[index] || dragging : false;
    var visible = tooltipVisible || tooltipVisible === undefined && isTipFormatter;
    return React.createElement(Tooltip, {
      prefixCls: tooltipPrefixCls,
      title: tipFormatter ? tipFormatter(value) : '',
      visible: visible,
      placement: tooltipPlacement || 'top',
      transitionName: "zoom-down",
      key: index,
      getPopupContainer: getTooltipPopupContainer,
      type: "dark",
      ref: this.getTooltipRef
    }, React.createElement(RcHandle, _extends({}, restProps, {
      value: value,
      onMouseEnter: function onMouseEnter() {
        return _this2.toggleTooltipVisible(index, true);
      },
      onMouseLeave: function onMouseLeave() {
        return _this2.toggleTooltipVisible(index, false);
      },
      onChange: this.onChange
    })));
  };

  _proto.focus = function focus() {
    this.rcSlider.focus();
  };

  _proto.blur = function blur() {
    this.rcSlider.blur();
  };

  _proto.render = function render() {
    var _classNames,
        _this3 = this;

    var _this$props2 = this.props,
        customizePrefixCls = _this$props2.prefixCls,
        size = _this$props2.size,
        customizeTooltipPrefixCls = _this$props2.tooltipPrefixCls,
        range = _this$props2.range,
        readOnly = _this$props2.readOnly,
        disabled = _this$props2.disabled,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["prefixCls", "size", "tooltipPrefixCls", "range", "readOnly", "disabled"]);

    var className = classNames(customizePrefixCls + "-" + size, (_classNames = {}, _classNames[customizePrefixCls + "-readOnly"] = readOnly, _classNames));

    if (range) {
      return React.createElement(RcRange, _extends({}, restProps, {
        ref: this.saveSlider,
        handle: function handle(info) {
          return _this3.handleWithTooltip(customizeTooltipPrefixCls, info);
        },
        prefixCls: customizePrefixCls,
        className: className,
        tooltipPrefixCls: customizeTooltipPrefixCls,
        disabled: disabled || readOnly,
        onChange: this.onChange
      }));
    }

    return React.createElement(RcSlider, _extends({}, restProps, {
      ref: this.saveSlider,
      handle: function handle(info) {
        return _this3.handleWithTooltip(customizeTooltipPrefixCls, info);
      },
      prefixCls: customizePrefixCls,
      className: className,
      tooltipPrefixCls: customizeTooltipPrefixCls,
      disabled: disabled || readOnly,
      onChange: this.onChange
    }));
  };

  return Slider;
}(PureComponent);

_defineProperty(Slider, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 提示类名前缀 */
  tooltipPrefixCls: PropTypes.string,

  /** 双滑块模式 */
  range: PropTypes.bool,

  /** 最大值 */
  max: PropTypes.number,

  /** 最小值 */
  min: PropTypes.number,

  /** 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。 */
  step: PropTypes.number,

  /** 刻度标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 */
  marks: markType,

  /** 是否只能拖拽到刻度上 */
  dots: PropTypes.bool,

  /** 设置当前取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),

  /** 设置初始取值。当 range 为 false 时，使用 number，否则用 [number, number] */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),

  /** marks 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 */
  included: PropTypes.bool,

  /** 值为 true 时，滑块为禁用状态 */
  disabled: PropTypes.bool,

  /** 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 */
  onChange: PropTypes.func,

  /** 与 onmouseup 触发时机一致，把当前值作为参数传入。 */
  onAfterChange: PropTypes.func,

  /** Slider 会把当前值传给 tipFormatter，并在 Tooltip 中显示 tipFormatter 的返回值，若为 null，则隐藏 Tooltip。 */
  tipFormatter: PropTypes.func,

  /** 值为true时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时。 */
  tooltipVisible: PropTypes.bool,

  /** 设置 Tooltip 展示位置 */
  tooltipPlacement: PropTypes.string,

  /** Tooltip 渲染父节点，默认渲染到 body 上。 */
  getTooltipPopupContainer: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium']),
  readOnly: PropTypes.bool
});

_defineProperty(Slider, "defaultProps", {
  prefixCls: 'new-fc-one-slider',
  tooltipPrefixCls: 'new-fc-one-tooltip',
  defaultValue: 0,
  disabled: false,
  readOnly: false,
  dots: false,
  included: true,
  max: 100,
  min: 0,
  range: false,
  step: 1,
  onChange: _.noop,
  onAfterChange: _.noop,
  tipFormatter: function tipFormatter(value) {
    return value.toString();
  },
  tooltipPlacement: 'top',
  getTooltipPopupContainer: function getTooltipPopupContainer() {
    return document.body;
  },
  size: 'medium'
});

export { Slider as default };