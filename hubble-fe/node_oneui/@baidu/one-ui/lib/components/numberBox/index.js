"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _popover = _interopRequireDefault(require("../popover"));

var _numberboxTools = require("../../core/numberboxTools");

var _tipsAndErrorTools = require("../../core/tipsAndErrorTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      e.target.value = (0, _numberboxTools.numberFormater)(e.target.value, _this.props);

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
        var newValue = (0, _numberboxTools.rangeFormater)(oldValue, _this.props);

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

      var newValue = (0, _numberboxTools.changeNumber)(value, step, optValue);

      _this.disableArrow(+newValue);

      value = (0, _numberboxTools.numberFormater)(newValue, props, true);

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
    var value = (0, _numberboxTools.numberFormater)(this.state.value, props);
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
      className: (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-focus"] = hasFocus, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-readonly"] = readOnly, _classNames)),
      style: {
        width: width
      }
    };
    var wrapperClass = prefixCls + "-wrapper";
    var wrapperProps = {
      className: (0, _classnames["default"])(className, wrapperClass, prefixCls + "-" + size, (_classNames2 = {}, _classNames2[prefixCls + "-error"] = errorMessage || showErrorWithoutErrorMessage, _classNames2[wrapperClass + "-" + mode] = mode, _classNames2[wrapperClass + "-disabled"] = disabled, _classNames2[wrapperClass + "-readonly"] = readOnly, _classNames2[wrapperClass + "-focus"] = hasFocus, _classNames2))
    };
    var btnContainer = {
      className: (0, _classnames["default"])('btn-container', {
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
      className: (0, _classnames["default"])({
        'new-fc-one-icon-disabled': arrowDownDisable || inputDisabled || readOnly
      }),
      'data-ui-cmd': 'sub',
      onClick: this.onSpinButtonClick
    };

    var beforeAddonProps = _extends({}, beforeCommon, {
      className: (0, _classnames["default"])(addonClass, addonClass + "-before", beforeCommon.className)
    });

    var afterCommon = {
      className: (0, _classnames["default"])({
        'new-fc-one-icon-disabled': arrowUpDisable || inputDisabled || readOnly
      }),
      'data-ui-cmd': 'add',
      onClick: this.onSpinButtonClick
    };

    var afterAddonProps = _extends({}, afterCommon, {
      className: (0, _classnames["default"])(addonClass, addonClass + "-after", afterCommon.className)
    });

    return _react["default"].createElement("div", wrapperProps, _react["default"].createElement(_popover["default"], (0, _tipsAndErrorTools.getPopoverProps)(popParams, {
      hasFocus: hasFocus
    }), _react["default"].createElement("div", mainProps, _react["default"].createElement("div", beforeAddonProps, _react["default"].createElement("span", {
      "data-ui-cmd": "sub"
    }, _react["default"].createElement(_oneUiIcon.IconMinus, null))), _react["default"].createElement("div", containerProps, _react["default"].createElement("input", _extends({}, inputProp, {
      disabled: inputDisabled,
      readOnly: readOnly,
      ref: this.addRef
    })), _react["default"].createElement("div", btnContainer, _react["default"].createElement("div", afterCommon, _react["default"].createElement("span", {
      "data-ui-cmd": "add"
    }, _react["default"].createElement(_oneUiIcon.IconChevronUp, null))), _react["default"].createElement("div", beforeCommon, _react["default"].createElement("span", {
      "data-ui-cmd": "sub"
    }, _react["default"].createElement(_oneUiIcon.IconChevronDown, null))))), _react["default"].createElement("div", afterAddonProps, _react["default"].createElement("span", {
      "data-ui-cmd": "add"
    }, _react["default"].createElement(_oneUiIcon.IconPlus, null))))), tailLabel ? _react["default"].createElement("span", {
      className: tailLabelClass
    }, tailLabel) : null, showErrorMessage ? (0, _tipsAndErrorTools.tipsAndErrorRender)(popParams) : null);
  };

  return NumberBox;
}(_react.PureComponent);

_defineProperty(NumberBox, "propTypes", {
  /** 输入数字的类型，float或int */
  type: _propTypes["default"].string,

  /** 数字输入框中无内容时显示的提示文字 */
  placeholder: _propTypes["default"].string,

  /** 用户可自定义class前缀 */
  prefixCls: _propTypes["default"].string,

  /** 用户可自定义class */
  className: _propTypes["default"].string,

  /** 禁用状态 */
  disabled: _propTypes["default"].bool,

  /** 最大值 */
  max: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 最小值 */
  min: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 调节按钮点击时值跳动的步频 */
  step: _propTypes["default"].number,

  /** 保留的小数位数，只有当type为float时有效 */
  fixed: _propTypes["default"].number,

  /** 当前值，字符串类型 */
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 值变化回调 */
  onChange: _propTypes["default"].func,

  /** 聚焦回调 */
  onFocus: _propTypes["default"].func,

  /** 失焦回调 */
  onBlur: _propTypes["default"].func,

  /** 是否显示默认提示 */
  showTip: _propTypes["default"].bool,

  /** 默认提示话术 */
  tipText: _propTypes["default"].string,

  /** 报错信息 */
  errorMessage: _propTypes["default"].string,

  /** 提示位置和报错位置，默认统一 */
  location: _propTypes["default"].string,

  /** 提示位置，取值为right、bottom、layer，如未设置，取自location */
  tipLocation: _propTypes["default"].string,

  /** 报错位置，取值为right、bottom、layer，如未设置，取自location */
  errorLocation: _propTypes["default"].string,

  /** 一般为单位信息 */
  tailLabel: _propTypes["default"].string,

  /** 宽度 */
  width: _propTypes["default"].number,
  mode: _propTypes["default"].string,
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium']),
  readOnly: _propTypes["default"].bool,
  defaultValue: _propTypes["default"].string,

  /** 报错，但是没有错误提示，常用于有两个numberbox并列的时候第一个numberbox报错 */
  showErrorWithoutErrorMessage: _propTypes["default"].bool,

  /** showErrorMessage为false的时候可以业务可以自己定义errorMessage的位置 */
  showErrorMessage: _propTypes["default"].bool
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
  onChange: _lodash["default"].noop,
  onFocus: _lodash["default"].noop,
  onBlur: _lodash["default"].noop,
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

(0, _reactLifecyclesCompat.polyfill)(NumberBox);
var _default = NumberBox;
exports["default"] = _default;
module.exports = exports.default;