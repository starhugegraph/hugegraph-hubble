function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from '../../core/textAreaTools';
import { handleErrorMessage, fixControlledValue, commonRemoveProps } from '../../core/inputTools';
import { noop, locationRemoveProps, handleCountTips, CHINA_COUNT_MODE, getRealLength, transSizeOfDefault } from '../../core/commonTools';
import Popover from '../popover';
import { getPopoverProps, tipsAndErrorRender } from '../../core/tipsAndErrorTools';

function onNextFrame(cb) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }

  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

var TextArea =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TextArea, _PureComponent);

  function TextArea(args) {
    var _this;

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputCompositionStart", function () {
      _this.___imeStart___ = true;
    });

    _defineProperty(_assertThisInitialized(_this), "onInputCompositionEnd", function (e) {
      _this.___imeStart___ = false;

      _this.onChange(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      _this.resizeTextarea();

      if (_this.___imeStart___) {
        _this.setState({
          value: e.target.value
        });

        return;
      }

      _this.handleError(e, 'onChange', false);
    });

    _defineProperty(_assertThisInitialized(_this), "resizeTextarea", function () {
      var _this$props = _this.props,
          minRows = _this$props.minRows,
          maxRows = _this$props.maxRows;

      _this.setState({
        textareaStyles: calculateNodeHeight(_this.textAreaRef, false, minRows, maxRows)
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleError", function (e, funcName, isHandleMin) {
      if (isHandleMin === void 0) {
        isHandleMin = true;
      }

      var props = _this.props;
      var value = e.target.value;
      var errorMessage = handleErrorMessage(_extends({}, props, {
        value: value
      }), isHandleMin, true);
      var result = {
        value: value,
        errorMessage: errorMessage,
        event: e
      };
      var newState = {
        errorMessage: errorMessage
      };

      if (!('value' in _this.props)) {
        // this.setState(result);
        newState.value = value;
      }

      _this.setState(newState);

      var func = props[funcName];

      if (func) {
        func(result, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "blur", function (e) {
      _this.handleError(e, 'onBlur', true);

      _this.setState({
        hasFocus: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "focus", function () {
      _this.setState({
        hasFocus: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "saveTextAreaRef", function (textArea) {
      _this.textAreaRef = textArea;
    });

    var _value = typeof args.value === 'undefined' ? args.defaultValue : args.value;

    _this.state = {
      hasFocus: false,
      textareaStyles: null,
      value: _value,
      errorMessage: '' // errorMessage || ''

    };
    return _this;
  }

  var _proto = TextArea.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.resizeTextarea();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;

    if (this.props.value !== value) {
      if (this.nextFrameActionId) {
        clearNextFrameAction(this.nextFrameActionId);
      }

      this.nextFrameActionId = onNextFrame(this.resizeTextarea);
    }

    if ('value' in nextProps && nextProps.value !== this.props.value) {
      this.setState({
        value: value
      });
    }
  };

  _proto.render = function render() {
    var _classNames, _classNames2, _classNames3;

    var props = this.props;
    var propsErrorMessage = props.errorMessage;
    var otherProps = omit(props, ['prefixCls', 'maxRows', 'minRows', 'filterArray', 'defaultValue', 'showErrorWithoutErrorMessage', 'showErrorMessage', 'originTextAreaProps'].concat(commonRemoveProps, locationRemoveProps));
    var width = props.width,
        prefixCls = props.prefixCls,
        maxLen = props.maxLen,
        className = props.className,
        disabled = props.disabled,
        readOnly = props.readOnly,
        showErrorMessage = props.showErrorMessage,
        showErrorWithoutErrorMessage = props.showErrorWithoutErrorMessage;
    var _this$state = this.state,
        textareaStyles = _this$state.textareaStyles,
        hasFocus = _this$state.hasFocus,
        value = _this$state.value,
        stateErrorMessage = _this$state.errorMessage;
    var errorMessage = propsErrorMessage == null ? stateErrorMessage : propsErrorMessage;

    var defalutProps = _extends({
      value: fixControlledValue(value),
      style: _extends({
        width: width
      }, textareaStyles),
      className: classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readOnly, _classNames)),
      ref: this.saveTextAreaRef,
      onFocus: this.focus,
      onBlur: this.blur,
      onChange: this.onChange,
      onCompositionStart: this.onInputCompositionStart,
      onCompositionEnd: this.onInputCompositionEnd
    }, props.originTextAreaProps);

    var containerProps = {
      className: classNames(prefixCls + "-container", (_classNames2 = {}, _classNames2[prefixCls + "-error"] = errorMessage || showErrorWithoutErrorMessage, _classNames2))
    };

    var popParams = _extends({}, props, {
      errorMessage: errorMessage
    });

    var wrapperClass = prefixCls + "-wrapper";
    var size = transSizeOfDefault(this.props.size, 'small');
    var wrapperProps = {
      className: classNames(wrapperClass, (_classNames3 = {}, _classNames3[wrapperClass + "-" + size] = size, _classNames3))
    };
    return React.createElement("div", wrapperProps, React.createElement("div", containerProps, React.createElement(Popover, getPopoverProps(popParams, {
      hasFocus: hasFocus
    }), React.createElement("textarea", _extends({}, _extends({}, otherProps, defalutProps), {
      "data-type": "textarea"
    }))), hasFocus && maxLen ? React.createElement("span", {
      className: prefixCls + "-count-tips"
    }, handleCountTips(getRealLength(props, value), maxLen)) : null), showErrorMessage ? tipsAndErrorRender(popParams) : null);
  };

  return TextArea;
}(PureComponent);

_defineProperty(TextArea, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.any,
  width: PropTypes.number,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  minLen: PropTypes.number,
  maxLen: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  requiredErrorMessage: PropTypes.string,
  maxLenErrorMessage: PropTypes.string,
  minLenErrorMessage: PropTypes.string,
  location: PropTypes.string,
  tipLocation: PropTypes.string,
  errorLocation: PropTypes.string,
  tipText: PropTypes.string,
  filterArray: PropTypes.array,
  // 计数时不算得字符
  countMode: PropTypes.string,
  // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
  getLength: PropTypes.func,
  // 自定义计数方式
  defaultValue: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  showErrorWithoutErrorMessage: PropTypes.bool,
  originTextAreaProps: PropTypes.object
});

_defineProperty(TextArea, "defaultProps", {
  prefixCls: 'new-fc-one-textarea',
  width: 300,
  maxRows: 8,
  minRows: 3,
  maxLen: null,
  errorMessage: null,
  location: 'right',
  tipLocation: null,
  errorLocation: null,
  tipText: null,
  onChange: noop,
  onBlur: noop,
  size: 'small',
  isRequired: false,
  filterArray: [],
  countMode: CHINA_COUNT_MODE,
  getLength: null,
  disabled: false,
  readOnly: false,
  showErrorMessage: true,
  showErrorWithoutErrorMessage: false,
  originTextAreaProps: {}
});

export { TextArea as default };