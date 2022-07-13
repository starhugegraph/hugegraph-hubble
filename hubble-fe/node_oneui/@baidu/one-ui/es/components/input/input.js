function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file 单行文本计数输入框
 * @author shanqianmin
 * @date 2018/09/05
 */
import React, { PureComponent, cloneElement } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import _ from 'lodash';
import { handleCountTips, CHINA_COUNT_MODE, getRealLength, handleEventParams, transSizeOfDefault } from '../../core/commonTools';
import { handleErrorMessage, isMaxLenError, isMinLenError, fixControlledValue, commonRemoveProps, defaultInputWidth } from '../../core/inputTools';

var Input =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Input, _PureComponent);

  function Input(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this; // const {value, errorMessage} = args;

    _defineProperty(_assertThisInitialized(_this), "onInputCompositionStart", function () {
      _this.___imeStart___ = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onInputCompositionEnd", function (e) {
      _this.___imeStart___ = false;

      _this.onChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var value = e.target.value;
      var props = _this.props;

      if (_this.___imeStart___) {
        _this.setState({
          // value,
          cacheValue: value
        });

        return;
      }

      var errorMessage = handleErrorMessage(_extends({}, props, {
        value: value
      }), true, true);
      var result = {
        value: value,
        errorMessage: errorMessage,
        event: e
      };
      var newState = {
        errorMessage: errorMessage,
        cacheValue: value
      };

      if (!('value' in _this.props)) {
        // this.setState(result);
        newState.value = value;
      }

      _this.setState(newState);

      _this.setLabelWidth();

      var onChange = props.onChange;

      if (onChange) {
        onChange(result);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 13) {
        var onPressEnter = _this.props.onPressEnter;

        if (onPressEnter) {
          onPressEnter({
            value: e.target.value,
            errorMessage: _this.state.errorMessage
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setLabelWidth", function (showLabel) {
      if (showLabel === void 0) {
        showLabel = true;
      }

      var me = _assertThisInitialized(_this);

      var inputCountAnchor = me.inputCountAnchor;

      if (!inputCountAnchor) {
        me.setState({
          countLabelWidth: 0
        });
        return;
      }

      var countLabelWidth = showLabel ? inputCountAnchor.offsetWidth : 0;

      if (countLabelWidth === me.state.countLabelWidth) {
        return;
      }

      me.setState({
        countLabelWidth: countLabelWidth
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function (e) {
      _this.___countLabelTimer___ = setTimeout(_this.setLabelWidth, 0); // display为none时无法获取宽度

      _this.setState({
        hasFocus: true
      });

      var onFocus = _this.props.onFocus;

      if (onFocus) {
        onFocus(handleEventParams(e, _assertThisInitialized(_this)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function (e) {
      _this.setLabelWidth(false);

      _this.setState({
        hasFocus: false
      });

      var onBlur = _this.props.onBlur;

      if (onBlur) {
        onBlur(handleEventParams(e, _assertThisInitialized(_this)));
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addAnchor", function (key, el) {
      _this[key] = el;
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (name) {
      return function (node) {
        _this[name] = node;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "isAddonInput", function () {
      var _this$props = _this.props,
          addonBefore = _this$props.addonBefore,
          addonAfter = _this$props.addonAfter;
      return addonBefore || addonAfter;
    });

    var _value = typeof args.value === 'undefined' ? args.defaultValue : args.value;

    _this.state = {
      hasFocus: false,
      countLabelWidth: 0,
      value: _value,
      errorMessage: '',
      // errorMessage || ''
      prevValue: _value,
      cacheValue: _value
    };
    return _this;
  }

  var _proto = Input.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setLabelWidth();
    var _this$props2 = this.props,
        width = _this$props2.width,
        _this$props2$style = _this$props2.style,
        style = _this$props2$style === void 0 ? {} : _this$props2$style;
    var inputDetailRef = this.inputDetailRef;

    if (this.isAddonInput()) {
      // 组合的话要宽度要重新计算
      var inputWidth = width || style.width || defaultInputWidth;
      var addonBeforeRefWidth = this.addonBeforeRef && this.addonBeforeRef.offsetWidth || 0;
      var addonAfterRefWidth = this.addonAfterRef && this.addonAfterRef.offsetWidth || 0;
      inputDetailRef.style.width = inputWidth + addonBeforeRefWidth + addonAfterRefWidth + "px";
    } else if (style.width === '100%' || width === '100%') {
      // 父级别input也应该100%来自定义
      inputDetailRef.style.width = '100%';
      this.inputContainerRef.style.width = '100%';
    }
  };

  Input.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var newState = {
      value: prevState.value,
      prevValue: nextProps.value
    }; // state变化的时候不触发，只有props变化的时候触发，处理中文输入的时候onChange不触发时候改变了state的问题

    if ('value' in nextProps && nextProps.value !== prevState.prevValue) {
      newState.value = nextProps.value;
      newState.cacheValue = nextProps.value;
      var errorMessage = handleErrorMessage(_extends({}, nextProps, {
        value: nextProps.value
      }), true, true);
      newState.errorMessage = errorMessage;
    }

    return newState;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.___countLabelTimer___);
  };

  _proto.getInputClassName = function getInputClassName() {
    var _classNames;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        disabled = _this$props3.disabled,
        readOnly = _this$props3.readOnly,
        size = _this$props3.size;
    return classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readOnly, _classNames));
  };

  _proto.renderLabeledIcon = function renderLabeledIcon(children) {
    var _classNames2;

    var _this$props4 = this.props,
        prefix = _this$props4.prefix,
        suffix = _this$props4.suffix,
        prefixCls = _this$props4.prefixCls,
        className = _this$props4.className,
        style = _this$props4.style;

    if (!(prefix != null || suffix != null)) {
      return children;
    } // 以下暂时未用到


    var prefixItem = prefix ? React.createElement("span", {
      className: prefixCls + "-prefix"
    }, prefix) : null;
    var suffixItem = suffix ? React.createElement("span", {
      className: prefixCls + "-suffix"
    }, suffix) : null;
    var wrapperClassName = classNames(className, prefixCls + "-affix-wrapper", (_classNames2 = {}, _classNames2[prefixCls + "-affix-wrapper-has-prefix"] = !!prefix, _classNames2[prefixCls + "-affix-wrapper-has-suffix"] = !!suffix, _classNames2));
    return React.createElement("span", {
      className: wrapperClassName,
      style: style
    }, prefixItem, cloneElement(children, {
      style: null,
      className: this.getInputClassName()
    }), suffixItem);
  };

  _proto.renderInput = function renderInput() {
    var stateValue = this.state.value;
    var cacheValue = this.state.cacheValue;
    var props = this.props;
    var otherProps = omit(props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'defaultValue', 'originInputProps'].concat(commonRemoveProps, ['filterArray', 'isErrorHTML', 'showErrorMessage', 'inputRef']));
    otherProps.value = this.___imeStart___ ? fixControlledValue(cacheValue) : fixControlledValue(stateValue);
    otherProps.style = {
      paddingRight: this.state.countLabelWidth || null
    };
    otherProps.onFocus = this.focus;
    otherProps.onBlur = this.blur;
    otherProps.onCompositionStart = this.onInputCompositionStart;
    otherProps.onCompositionEnd = this.onInputCompositionEnd;
    otherProps.onChange = this.onChange;
    otherProps.onKeyDown = this.onKeyDown;
    otherProps.ref = props.inputRef || _.partial(this.addAnchor, 'inputRef');
    return this.renderLabeledIcon(React.createElement("input", _extends({}, otherProps, props.originInputProps, {
      "data-type": "input",
      className: classNames(this.getInputClassName())
    })));
  };

  _proto.renderLabeledInput = function renderLabeledInput(children) {
    var _classNames3;

    var _this$props5 = this.props,
        addonBefore = _this$props5.addonBefore,
        addonAfter = _this$props5.addonAfter,
        prefixCls = _this$props5.prefixCls,
        style = _this$props5.style;

    if (!addonBefore && !addonAfter) {
      return children;
    }

    var wrapperClassName = prefixCls + "-group";
    var addonClassName = wrapperClassName + "-addon";
    var addonBeforeItem = addonBefore ? React.createElement("span", {
      className: classNames(addonClassName, addonClassName + "-before"),
      ref: this.saveRef('addonBeforeRef')
    }, addonBefore) : null;
    var addonAfterItem = addonAfter ? React.createElement("span", {
      className: classNames(addonClassName, addonClassName + "-after"),
      ref: this.saveRef('addonAfterRef')
    }, addonAfter) : null;
    var className = classNames(prefixCls + "-wrapper", (_classNames3 = {}, _classNames3[wrapperClassName] = addonBeforeItem || addonAfterItem, _classNames3));

    if (addonBeforeItem || addonAfterItem) {
      return React.createElement("span", {
        className: prefixCls + "-group-wrapper",
        style: style
      }, React.createElement("span", {
        className: className
      }, addonBeforeItem, cloneElement(children, {
        style: null
      }), addonAfterItem));
    }

    return React.createElement("span", {
      className: className
    }, addonBeforeItem, children, addonAfterItem);
  };

  _proto.render = function render() {
    var _classNames4, _classNames5;

    var props = this.props;
    var prefixCls = props.prefixCls,
        maxLen = props.maxLen,
        errorLocation = props.errorLocation,
        _props$style = props.style,
        style = _props$style === void 0 ? {} : _props$style,
        isErrorHTML = props.isErrorHTML,
        className = props.className,
        showError = props.showErrorMessage,
        propsErrorMessage = props.errorMessage,
        width = props.width;
    var _this$state = this.state,
        value = _this$state.value,
        hasFocus = _this$state.hasFocus,
        stateErrorMessage = _this$state.errorMessage;
    var size = transSizeOfDefault(props.size, 'small');
    var errorMessage = propsErrorMessage == null ? stateErrorMessage : propsErrorMessage;
    var countClass = prefixCls + "-count";
    var countProps = {
      ref: _.partial(this.addAnchor, 'inputCountAnchor'),
      className: classNames(countClass, (_classNames4 = {}, _classNames4[countClass + "-visible"] = hasFocus, _classNames4[countClass + "-error"] = isMaxLenError(_extends({}, props, {
        value: value
      })) || isMinLenError(_extends({}, props, {
        value: value
      })), _classNames4))
    };
    var containerClass = prefixCls + "-all-container";
    var containerProps = {
      className: classNames(className, containerClass, containerClass + "-" + size, (_classNames5 = {}, _classNames5[containerClass + "-error"] = errorMessage, _classNames5[containerClass + "-has-focused"] = hasFocus, _classNames5)),
      ref: this.saveRef('inputContainerRef')
    };
    var detailProps = {
      className: prefixCls + "-detail",
      style: _extends({}, style),
      ref: this.saveRef('inputDetailRef')
    };

    if (!this.isAddonInput()) {
      detailProps.style.width = width || style.width || defaultInputWidth;
    }

    var errorClass = prefixCls + "-error";
    var errorProps = {
      className: classNames(errorClass, errorClass + "-" + errorLocation)
    };
    var showErrorMessage = errorLocation === 'layer' ? hasFocus && errorMessage : errorMessage;
    var errorRender = isErrorHTML ? React.createElement("div", _extends({}, errorProps, {
      /* eslint-disable react/no-danger */
      dangerouslySetInnerHTML: {
        __html: errorMessage
      }
    })) : React.createElement("div", errorProps, errorMessage);
    return React.createElement("div", containerProps, React.createElement("div", detailProps, this.renderLabeledInput(this.renderInput()), maxLen != null ? React.createElement("span", countProps, handleCountTips(getRealLength(props, value), maxLen)) : null), showError && showErrorMessage ? errorRender : null);
  };

  return Input;
}(PureComponent);

_defineProperty(Input, "propTypes", {
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
  isRequired: PropTypes.bool,
  requiredErrorMessage: PropTypes.string,
  maxLenErrorMessage: PropTypes.string,
  minLenErrorMessage: PropTypes.string,
  width: PropTypes.number,
  // 设置宽度
  style: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  // 只读状态，暂未暴露，为了联动
  value: PropTypes.any,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onPressEnter: PropTypes.func,
  addonBefore: PropTypes.node,
  addonAfter: PropTypes.node,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  placeholder: PropTypes.string,
  maxLen: PropTypes.number,
  minLen: PropTypes.number,
  countMode: PropTypes.string,
  // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
  getLength: PropTypes.func,
  // 自定义计数方式
  errorMessage: PropTypes.string,
  // 如果外部存在errorMessage，则以外部为准，不参考内部errorMessage
  showErrorMessage: PropTypes.bool,
  // 如果为false，当errorMessage存在时，仅有外框标红，但不显示错误信息
  errorLocation: PropTypes.string,
  // right、layer、bottom
  filterArray: PropTypes.array,
  // 计数的时候某些数据不计数
  isErrorHTML: PropTypes.bool,
  // 错误信息是不是html
  inputRef: PropTypes.func,
  defaultValue: PropTypes.string,
  originInputProps: PropTypes.object
});

_defineProperty(Input, "defaultProps", {
  prefixCls: 'new-fc-one-input',
  disabled: false,
  readOnly: false,
  maxLen: null,
  minLen: null,
  errorMessage: null,
  showErrorMessage: true,
  errorLocation: 'right',
  isRequired: false,
  requiredErrorMessage: '',
  maxLenErrorMessage: '',
  minLenErrorMessage: '',
  width: null,
  style: {},
  filterArray: [],
  isErrorHTML: false,
  className: '',
  countMode: CHINA_COUNT_MODE,
  getLength: null,
  size: 'small',
  originInputProps: {}
});

polyfill(Input);
export default Input;