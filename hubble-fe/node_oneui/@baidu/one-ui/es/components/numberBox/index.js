function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 数字输入框
 * @author Chen Xiao
 * @email companyforme@gmail.com
 * @author Shan Qianmin
 * @email shanqianmin@baidu.com
 * 悬浮态和点击态时会出现数字调节按钮
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { IconChevronDown, IconChevronUp, IconPlus, IconMinus } from '@baidu/one-ui-icon';
import Popover from '../popover';
import { changeNumber, numberFormater, rangeFormater } from '../../core/numberboxTools';
import { getPopoverProps, tipsAndErrorRender } from '../../core/tipsAndErrorTools';
/**
 * NumberBox component.
 */

var NumberBox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(NumberBox, _PureComponent);

  function NumberBox(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this; // const {value, errorMessage} = args;

    _defineProperty(_assertThisInitialized(_this), "state", {
      hasFocus: false,
      arrowUpDisable: false,
      arrowDownDisable: false
    });

    _defineProperty(_assertThisInitialized(_this), "onInputBoxChange", function (e) {
      if (_this.props.disabled) return;
      e.target.value = numberFormater(e.target.value, _this.props);

      _this.disableArrow(+e.target.value);

      if (!('value' in _this.props)) {
        _this.setState({
          value: e.target.value
        });
      }

      _this.props.onChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputBoxBlur", function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          onBlur = _this$props.onBlur;

      _this.setState({
        hasFocus: false
      });

      var oldValue = e.target.value;

      if (oldValue != null && oldValue !== '') {
        var newValue = rangeFormater(oldValue, _this.props);

        if (newValue !== oldValue) {
          e.target.value = newValue;

          if (!('value' in _this.props)) {
            _this.setState({
              value: e.target.value
            });
          }

          onChange(e);
        }
      }

      onBlur(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onSpinButtonClick", function (e) {
      var props = _this.props;
      var disabled = props.disabled,
          readOnly = props.readOnly,
          onChange = props.onChange,
          step = props.step,
          min = props.min;

      if (disabled || readOnly) {
        return;
      }

      var dataset = e && e.currentTarget && e.currentTarget.dataset;
      var optValue = dataset.uiCmd === 'add' ? 1 : -1;

      if (optValue === 1 && _this.state.arrowUpDisable || optValue === -1 && _this.state.arrowDownDisable) {
        return;
      }

      var target = _this.numberBoxRef;
      var value = target.value;

      if (isNaN(value) || value.length === 0) {
        value = "" + min || '0.0';
      }

      var newValue = changeNumber(value, step, optValue);

      _this.disableArrow(+newValue);

      value = numberFormater(newValue, props, true);

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      onChange({
        target: {
          value: value
        }
      });

      _this.numberBoxRef.focus();
    });

    _defineProperty(_assertThisInitialized(_this), "onInputBoxFocus", function () {
      _this.setState({
        hasFocus: true
      });

      _this.props.onFocus({
        target: _this.numberBoxRef
      });
    });

    _defineProperty(_assertThisInitialized(_this), "disableArrow", function (currentValue) {
      var _this$props2 = _this.props,
          min = _this$props2.min,
          max = _this$props2.max;

      if (!_this.state.arrowDownDisable && currentValue <= min && min != null) {
        _this.setState({
          arrowDownDisable: true
        });
      } else if (currentValue > min) {
        _this.setState({
          arrowDownDisable: false
        });
      }

      if (max != null && currentValue >= max && !_this.state.arrowUpDisable) {
        _this.setState({
          arrowUpDisable: true
        });
      } else if (currentValue < max) {
        _this.setState({
          arrowUpDisable: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addRef", function (node) {
      _this.numberBoxRef = node;
    });

    var _value = typeof args.value === 'undefined' ? args.defaultValue : args.value;

    _this.state = {
      hasFocus: false,
      arrowUpDisable: false,
      arrowDownDisable: false,
      value: _value
    };
    return _this;
  }

  NumberBox.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      };
    }

    return null;
  };

  var _proto = NumberBox.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var props = this.props;
    var className = props.className,
        placeholder = props.placeholder,
        min = props.min,
        max = props.max,
        prefixCls = props.prefixCls,
        disabled = props.disabled,
        errorMessage = props.errorMessage,
        showTip = props.showTip,
        tipText = props.tipText,
        tipLocation = props.tipLocation,
        tailLabel = props.tailLabel,
        width = props.width,
        errorLocation = props.errorLocation,
        location = props.location,
        mode = props.mode,
        size = props.size,
        readOnly = props.readOnly,
        showErrorWithoutErrorMessage = props.showErrorWithoutErrorMessage,
        showErrorMessage = props.showErrorMessage;
    var _this$state = this.state,
        hasFocus = _this$state.hasFocus,
        arrowUpDisable = _this$state.arrowUpDisable,
        arrowDownDisable = _this$state.arrowDownDisable;
    var value = numberFormater(this.state.value, props);
    var inputProp = {
      ref: 'inputbox',
      type: 'text',
      placeholder: placeholder || '',
      // 当place是false时，不应该显示false
      value: value,
      onFocus: this.onInputBoxFocus,
      onChange: this.onInputBoxChange,
      onBlur: this.onInputBoxBlur
    };
    var mainClass = prefixCls + "-main";
    var mainProps = {
      className: mainClass
    };
    var addonClass = mainClass + "-addon";
    var containerProps = {
      className: classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-focus"] = hasFocus, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readonly"] = readOnly, _classNames)),
      style: {
        width: width
      }
    };
    var wrapperClass = prefixCls + "-wrapper";
    var wrapperProps = {
      className: classNames(className, wrapperClass, prefixCls + "-" + size, (_classNames2 = {}, _classNames2[prefixCls + "-error"] = errorMessage || showErrorWithoutErrorMessage, _classNames2[wrapperClass + "-" + mode] = mode, _classNames2[wrapperClass + "-disabled"] = disabled, _classNames2[wrapperClass + "-readonly"] = readOnly, _classNames2[wrapperClass + "-focus"] = hasFocus, _classNames2))
    };
    var btnContainer = {
      className: classNames('btn-container', {
        'btn-container-focus': hasFocus
      })
    };
    var inputDisabled = disabled;
    var tailLabelClass = prefixCls + "-tail-label";
    var popParams = {
      tipLocation: tipLocation,
      errorMessage: errorMessage,
      tipText: showTip && (tipText || (min == null || max == null ? '' : "\u8303\u56F4\uFF1A" + min + "~" + max)),
      errorLocation: errorLocation,
      location: location,
      prefixCls: prefixCls,
      size: size
    };
    var beforeCommon = {
      className: classNames({
        'new-fc-one-icon-disabled': arrowDownDisable || inputDisabled || readOnly
      }),
      'data-ui-cmd': 'sub',
      onClick: this.onSpinButtonClick
    };

    var beforeAddonProps = _extends({}, beforeCommon, {
      className: classNames(addonClass, addonClass + "-before", beforeCommon.className)
    });

    var afterCommon = {
      className: classNames({
        'new-fc-one-icon-disabled': arrowUpDisable || inputDisabled || readOnly
      }),
      'data-ui-cmd': 'add',
      onClick: this.onSpinButtonClick
    };

    var afterAddonProps = _extends({}, afterCommon, {
      className: classNames(addonClass, addonClass + "-after", afterCommon.className)
    });

    return React.createElement("div", wrapperProps, React.createElement(Popover, getPopoverProps(popParams, {
      hasFocus: hasFocus
    }), React.createElement("div", mainProps, React.createElement("div", beforeAddonProps, React.createElement("span", {
      "data-ui-cmd": "sub"
    }, React.createElement(IconMinus, null))), React.createElement("div", containerProps, React.createElement("input", _extends({}, inputProp, {
      disabled: inputDisabled,
      readOnly: readOnly,
      ref: this.addRef
    })), React.createElement("div", btnContainer, React.createElement("div", afterCommon, React.createElement("span", {
      "data-ui-cmd": "add"
    }, React.createElement(IconChevronUp, null))), React.createElement("div", beforeCommon, React.createElement("span", {
      "data-ui-cmd": "sub"
    }, React.createElement(IconChevronDown, null))))), React.createElement("div", afterAddonProps, React.createElement("span", {
      "data-ui-cmd": "add"
    }, React.createElement(IconPlus, null))))), tailLabel ? React.createElement("span", {
      className: tailLabelClass
    }, tailLabel) : null, showErrorMessage ? tipsAndErrorRender(popParams) : null);
  };

  return NumberBox;
}(PureComponent);

_defineProperty(NumberBox, "propTypes", {
  /** 输入数字的类型，float或int */
  type: PropTypes.string,

  /** 数字输入框中无内容时显示的提示文字 */
  placeholder: PropTypes.string,

  /** 用户可自定义class前缀 */
  prefixCls: PropTypes.string,

  /** 用户可自定义class */
  className: PropTypes.string,

  /** 禁用状态 */
  disabled: PropTypes.bool,

  /** 最大值 */
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 最小值 */
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 调节按钮点击时值跳动的步频 */
  step: PropTypes.number,

  /** 保留的小数位数，只有当type为float时有效 */
  fixed: PropTypes.number,

  /** 当前值，字符串类型 */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 值变化回调 */
  onChange: PropTypes.func,

  /** 聚焦回调 */
  onFocus: PropTypes.func,

  /** 失焦回调 */
  onBlur: PropTypes.func,

  /** 是否显示默认提示 */
  showTip: PropTypes.bool,

  /** 默认提示话术 */
  tipText: PropTypes.string,

  /** 报错信息 */
  errorMessage: PropTypes.string,

  /** 提示位置和报错位置，默认统一 */
  location: PropTypes.string,

  /** 提示位置，取值为right、bottom、layer，如未设置，取自location */
  tipLocation: PropTypes.string,

  /** 报错位置，取值为right、bottom、layer，如未设置，取自location */
  errorLocation: PropTypes.string,

  /** 一般为单位信息 */
  tailLabel: PropTypes.string,

  /** 宽度 */
  width: PropTypes.number,
  mode: PropTypes.string,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium']),
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.string,

  /** 报错，但是没有错误提示，常用于有两个numberbox并列的时候第一个numberbox报错 */
  showErrorWithoutErrorMessage: PropTypes.bool,

  /** showErrorMessage为false的时候可以业务可以自己定义errorMessage的位置 */
  showErrorMessage: PropTypes.bool
});

_defineProperty(NumberBox, "defaultProps", {
  type: 'float',
  placeholder: '',
  prefixCls: 'new-fc-one-numberbox',
  disabled: false,
  max: null,
  min: null,
  step: 1.00,
  fixed: Number.POSITIVE_INFINITY,
  onChange: _.noop,
  onFocus: _.noop,
  onBlur: _.noop,
  showTip: true,
  errorMessage: '',
  location: 'right',
  tipLocation: null,
  errorLocation: null,
  tailLabel: null,
  width: null,
  mode: 'basic',
  size: 'small',
  showErrorWithoutErrorMessage: false,
  showErrorMessage: true
});

polyfill(NumberBox);
export default NumberBox;