"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _rcTrigger = _interopRequireDefault(require("rc-trigger"));

var _moment = _interopRequireDefault(require("moment"));

var _classnames = _interopRequireDefault(require("classnames"));

var _pickTimeTools = require("../../core/pickTimeTools");

var _timeInput = _interopRequireDefault(require("./common/timeInput"));

var _timePickerPanel = _interopRequireDefault(require("./common/timePickerPanel"));

var _placements = _interopRequireDefault(require("./common/placements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimePicker =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(TimePicker, _Component);

  function TimePicker(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      dropdownWidth: null
    });

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      var width = _reactDom["default"].findDOMNode(_this.timePickerTargetRef).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ref) {
      _this.timePickerTargetRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "onPanelChange", function (value) {
      _this.setValue(value);
    });

    _defineProperty(_assertThisInitialized(_this), "onAmPmChange", function (ampm) {
      _this.props.onAmPmChange(ampm);
    });

    _defineProperty(_assertThisInitialized(_this), "onClear", function (event) {
      event.stopPropagation();

      _this.setValue(null);

      _this.setOpen(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (open) {
      _this.setOpen(open);
    });

    _defineProperty(_assertThisInitialized(_this), "onEsc", function () {
      _this.setOpen(false);
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (e.keyCode === 40) {
        _this.setOpen(true);
      }

      _this.props.onKeyDown(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      _this.props.onFocus();
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.props.onBlur();
    });

    _defineProperty(_assertThisInitialized(_this), "getPlaceHolder", function () {
      var _this$props = _this.props,
          placeholder = _this$props.placeholder,
          showHour = _this$props.showHour,
          showMinute = _this$props.showMinute,
          showSecond = _this$props.showSecond;

      if ('placeholder' in _this.props) {
        return placeholder;
      }

      return [showHour ? '小时' : '', showMinute ? '分钟' : '', showSecond ? '秒钟' : ''].filter(function (item) {
        return !!item;
      }).join(':');
    });

    _defineProperty(_assertThisInitialized(_this), "getFormat", function () {
      var _this$props2 = _this.props,
          format = _this$props2.format,
          showHour = _this$props2.showHour,
          showMinute = _this$props2.showMinute,
          showSecond = _this$props2.showSecond,
          use12Hours = _this$props2.use12Hours;

      if (format) {
        return format;
      }

      if (use12Hours) {
        var fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
          return !!item;
        }).join(':');
        return fmtString.concat(' a');
      }

      return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
        return !!item;
      }).join(':');
    });

    _defineProperty(_assertThisInitialized(_this), "setValue", function (value) {
      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var formatValue = value;

      if (value && typeof value === 'object' && value.format) {
        formatValue = value.format(_this.getFormat());
      }

      _this.props.onChange(formatValue);
    });

    _defineProperty(_assertThisInitialized(_this), "setOpen", function (open) {
      var _this$props3 = _this.props,
          onOpen = _this$props3.onOpen,
          onClose = _this$props3.onClose;
      var currentOpen = _this.state.open;

      if (currentOpen !== open) {
        if (!('open' in _this.props)) {
          _this.setState({
            open: open
          });
        }

        if (open) {
          onOpen({
            open: open
          });
        } else {
          onClose({
            open: open
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupClassName", function () {
      var _this$props4 = _this.props,
          showHour = _this$props4.showHour,
          showMinute = _this$props4.showMinute,
          showSecond = _this$props4.showSecond,
          use12Hours = _this$props4.use12Hours,
          prefixCls = _this$props4.prefixCls,
          popupClassName = _this$props4.popupClassName;
      var className = popupClassName; // Keep it for old compatibility

      if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
        className += " " + prefixCls + "-panel-narrow";
      }

      var selectColumnCount = 0;

      if (showHour) {
        selectColumnCount += 1;
      }

      if (showMinute) {
        selectColumnCount += 1;
      }

      if (showSecond) {
        selectColumnCount += 1;
      }

      if (use12Hours) {
        selectColumnCount += 1;
      }

      className += " " + prefixCls + "-panel-column-" + selectColumnCount;
      return className;
    });

    _defineProperty(_assertThisInitialized(_this), "getOptions", function () {
      var _this$props5 = _this.props,
          disabledMinutes = _this$props5.disabledMinutes,
          disabledSeconds = _this$props5.disabledSeconds,
          hideDisabledOptions = _this$props5.hideDisabledOptions,
          hourStep = _this$props5.hourStep,
          minuteStep = _this$props5.minuteStep,
          secondStep = _this$props5.secondStep;
      var value = _this.state.value;

      var disabledHourOptions = _this.disabledHours();

      var disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
      var disabledSecondOptions = disabledSeconds(value ? value.hour() : null, value ? value.minute() : null);
      var hourOptions = (0, _pickTimeTools.generateOptions)(24, disabledHourOptions, hideDisabledOptions, hourStep);
      var minuteOptions = (0, _pickTimeTools.generateOptions)(60, disabledMinuteOptions, hideDisabledOptions, minuteStep);
      var secondOptions = (0, _pickTimeTools.generateOptions)(60, disabledSecondOptions, hideDisabledOptions, secondStep);
      return {
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getPanelElement", function () {
      var _this$props6 = _this.props,
          prefixCls = _this$props6.prefixCls,
          disabledMinutes = _this$props6.disabledMinutes,
          disabledSeconds = _this$props6.disabledSeconds,
          hideDisabledOptions = _this$props6.hideDisabledOptions,
          showHour = _this$props6.showHour,
          showMinute = _this$props6.showMinute,
          showSecond = _this$props6.showSecond,
          defaultOpenValue = _this$props6.defaultOpenValue,
          use12Hours = _this$props6.use12Hours,
          size = _this$props6.size;
      var value = _this.state.value;

      var _this$getOptions = _this.getOptions(),
          hourOptions = _this$getOptions.hourOptions,
          minuteOptions = _this$getOptions.minuteOptions,
          secondOptions = _this$getOptions.secondOptions;

      return _react["default"].createElement(_timePickerPanel["default"], {
        prefixCls: prefixCls + "-panel",
        ref: function ref(_ref) {
          _this.panelInstance = _ref;
        },
        className: prefixCls + "-panel-" + size,
        value: value,
        onChange: _this.onPanelChange,
        onAmPmChange: _this.onAmPmChange,
        defaultOpenValue: defaultOpenValue,
        showHour: showHour,
        showMinute: showMinute,
        showSecond: showSecond,
        onEsc: _this.onEsc,
        format: _this.getFormat(),
        disabledHours: _this.disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        hideDisabledOptions: hideDisabledOptions,
        use12Hours: use12Hours,
        toNearestValidTime: _pickTimeTools.toNearestValidTime,
        hourOptions: hourOptions,
        minuteOptions: minuteOptions,
        secondOptions: secondOptions,
        isAM: _this.isAM()
      });
    });

    _defineProperty(_assertThisInitialized(_this), "disabledHours", function () {
      var _this$props7 = _this.props,
          use12Hours = _this$props7.use12Hours,
          disabledHours = _this$props7.disabledHours;
      var disabledOptions = disabledHours();

      if (use12Hours && Array.isArray(disabledOptions)) {
        if (_this.isAM()) {
          disabledOptions = disabledOptions.filter(function (h) {
            return h < 12;
          }).map(function (h) {
            return h === 0 ? 12 : h;
          });
        } else {
          disabledOptions = disabledOptions.map(function (h) {
            return h === 12 ? 12 : h - 12;
          });
        }
      }

      return disabledOptions;
    });

    var _open = props.open,
        _value = props.value;

    _this.momentValue = function (value) {
      return value ? (0, _moment["default"])(value, _this.getFormat(), true) : null;
    };

    _this.state = {
      open: _open,
      value: _this.momentValue(_value)
    };
    return _this;
  }

  var _proto = TimePicker.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        open = nextProps.open;

    if ('value' in nextProps) {
      this.setState({
        value: this.momentValue(value)
      });
    }

    if (open !== undefined) {
      this.setState({
        open: open
      });
    }
  };

  _proto.isAM = function isAM() {
    var defaultOpenValue = this.props.defaultOpenValue;
    var value = this.state.value;
    var realValue = value || defaultOpenValue;
    return realValue.hour() >= 0 && realValue.hour() < 12;
  };

  _proto.render = function render() {
    var _this$props8 = this.props,
        prefixCls = _this$props8.prefixCls,
        placement = _this$props8.placement,
        align = _this$props8.align,
        disabled = _this$props8.disabled,
        style = _this$props8.style,
        className = _this$props8.className,
        getPopupContainer = _this$props8.getPopupContainer,
        name = _this$props8.name,
        inputReadOnly = _this$props8.inputReadOnly,
        popupStyle = _this$props8.popupStyle,
        defaultOpenValue = _this$props8.defaultOpenValue,
        disabledMinutes = _this$props8.disabledMinutes,
        disabledSeconds = _this$props8.disabledSeconds,
        allowEmpty = _this$props8.allowEmpty,
        errorMessage = _this$props8.errorMessage,
        errorLocation = _this$props8.errorLocation,
        size = _this$props8.size,
        width = _this$props8.width;
    var _this$state = this.state,
        open = _this$state.open,
        value = _this$state.value;
    var popupClassName = this.getPopupClassName();

    var _this$getOptions2 = this.getOptions(),
        hourOptions = _this$getOptions2.hourOptions,
        minuteOptions = _this$getOptions2.minuteOptions,
        secondOptions = _this$getOptions2.secondOptions;

    var validDefaultOpenValue = (0, _pickTimeTools.toNearestValidTime)(defaultOpenValue, hourOptions, minuteOptions, secondOptions);
    var errorClass = prefixCls + "-error";
    var errorProps = {
      className: (0, _classnames["default"])(errorClass, errorClass + "-" + errorLocation)
    };
    var timePickerClassName = (0, _classnames["default"])(prefixCls, className, prefixCls + "-" + size);

    var timePickerStyle = _extends({}, popupStyle);

    var dropdownWidth = this.state.dropdownWidth;

    if (dropdownWidth) {
      timePickerStyle.width = dropdownWidth + "px";
    }

    var timePickerElement = _react["default"].createElement("span", {
      className: timePickerClassName
    }, _react["default"].createElement(_rcTrigger["default"], {
      prefixCls: prefixCls + "-panel",
      popupClassName: popupClassName,
      popupStyle: timePickerStyle,
      popup: this.getPanelElement(),
      popupAlign: align,
      builtinPlacements: _placements["default"],
      popupPlacement: placement,
      action: disabled ? [] : ['click'],
      destroyPopupOnHide: true,
      getPopupContainer: getPopupContainer,
      popupVisible: open,
      onPopupVisibleChange: this.onVisibleChange
    }, _react["default"].createElement("span", {
      className: prefixCls + "-input-container",
      ref: this.saveRef
    }, _react["default"].createElement(_timeInput["default"], {
      style: style,
      prefixCls: prefixCls,
      defaultOpenValue: validDefaultOpenValue,
      value: value,
      onEsc: this.onEsc,
      format: this.getFormat(),
      placeholder: this.getPlaceHolder(),
      hourOptions: hourOptions,
      minuteOptions: minuteOptions,
      secondOptions: secondOptions,
      disabledHours: this.disabledHours,
      disabledMinutes: disabledMinutes,
      disabledSeconds: disabledSeconds,
      onChange: this.onPanelChange,
      allowEmpty: allowEmpty,
      onKeyDown: this.onKeyDown,
      inputReadOnly: inputReadOnly,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      disabled: disabled,
      name: name,
      onClear: this.onClear,
      errorMessage: errorMessage,
      size: size,
      width: width
    }))), errorMessage ? _react["default"].createElement("div", errorProps, errorMessage) : null);

    return timePickerElement;
  };

  return TimePicker;
}(_react.Component);

exports["default"] = TimePicker;

_defineProperty(TimePicker, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 时间值 moment类型 */
  value: _propTypes["default"].string,

  /** 是否只读 */
  inputReadOnly: _propTypes["default"].bool,

  /** 是否不可用 */
  disabled: _propTypes["default"].bool,

  /** 是否允许值为null */
  allowEmpty: _propTypes["default"].bool,

  /** 面板展开时的默认值 */
  defaultOpenValue: _propTypes["default"].object,

  /** 面板展开/收起状态 */
  open: _propTypes["default"].bool,

  /** 面板对齐时的位置调整数据 */
  align: _propTypes["default"].object,

  /** 时间选择面板位置 如bottomLeft，bottomRight，topRight，topLeft */
  placement: _propTypes["default"].any,

  /** 定义面板的容器，默认为 body 上新建 div */
  getPopupContainer: _propTypes["default"].func,

  /** 面板类名 */
  popupClassName: _propTypes["default"].string,

  /** 面板样式对象 */
  popupStyle: _propTypes["default"].object,

  /** 输入框没有值的时候显示的内容 */
  placeholder: _propTypes["default"].string,

  /** 时间格式化，如HH:mm:ss */
  format: _propTypes["default"].string,

  /** 是否展现小时选择 */
  showHour: _propTypes["default"].bool,

  /** 是否展现分钟选择 */
  showMinute: _propTypes["default"].bool,

  /** 是否展现秒钟选择 */
  showSecond: _propTypes["default"].bool,

  /** 宽度 */
  width: _propTypes["default"].number,

  /** 行内样式 */
  style: _propTypes["default"].object,

  /** 最外层css类名 */
  className: _propTypes["default"].string,

  /** 不可选的小时数，返回array类型 */
  disabledHours: _propTypes["default"].func,

  /** 不可选的分钟数，返回array类型 */
  disabledMinutes: _propTypes["default"].func,

  /** 不可选的秒钟数，返回array类型 */
  disabledSeconds: _propTypes["default"].func,

  /** 是否隐藏不可选的项 */
  hideDisabledOptions: _propTypes["default"].bool,

  /** value更改回调函数 */
  onChange: _propTypes["default"].func,

  /** am、pm格式的value更改回调函数 */
  onAmPmChange: _propTypes["default"].func,

  /** 面板展开状态回调函数 */
  onOpen: _propTypes["default"].func,

  /** 面板收起状态回调函数 */
  onClose: _propTypes["default"].func,

  /** 输入框获得焦点回调函数 */
  onFocus: _propTypes["default"].func,

  /** 输入框失去焦点回调函数 */
  onBlur: _propTypes["default"].func,

  /** 按键事件回调函数 */
  onKeyDown: _propTypes["default"].func,

  /** 鼠标滑入事件回调函数 */
  onMouseEnter: _propTypes["default"].func,

  /** 鼠标滑出事件回调函数 */
  onMouseLeave: _propTypes["default"].func,

  /** 表单name值 */
  name: _propTypes["default"].string,

  /** 是否采用12小时制 format 默认为 h:mm:ss a */
  use12Hours: _propTypes["default"].bool,

  /** 小时选择列选项间隔 */
  hourStep: _propTypes["default"].number,

  /** 分钟选择列选项间隔 */
  minuteStep: _propTypes["default"].number,

  /** 秒钟选择列选项间隔 */
  secondStep: _propTypes["default"].number,

  /** 错误信息 */
  errorMessage: _propTypes["default"].string,

  /** 错误信息展现位置， bottom/right */
  errorLocation: _propTypes["default"].string,

  /** 尺寸 small/medium */
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(TimePicker, "defaultProps", {
  prefixCls: 'new-fc-one-time-picker',
  inputReadOnly: false,
  style: {},
  className: '',
  popupClassName: '',
  popupStyle: {},
  align: {},
  defaultOpenValue: (0, _moment["default"])(),
  format: 'HH:mm:ss',
  allowEmpty: true,
  showHour: true,
  showMinute: true,
  showSecond: true,
  disabledHours: _pickTimeTools.noop,
  disabledMinutes: _pickTimeTools.noop,
  disabledSeconds: _pickTimeTools.noop,
  hideDisabledOptions: false,
  placement: 'bottomLeft',
  onChange: _pickTimeTools.noop,
  onAmPmChange: _pickTimeTools.noop,
  onOpen: _pickTimeTools.noop,
  onClose: _pickTimeTools.noop,
  onFocus: _pickTimeTools.noop,
  onBlur: _pickTimeTools.noop,
  onMouseEnter: _pickTimeTools.noop,
  onMouseLeave: _pickTimeTools.noop,
  onKeyDown: _pickTimeTools.noop,
  use12Hours: false,
  errorMessage: '',
  errorLocation: 'bottom',
  size: 'small',
  width: 150
});

module.exports = exports.default;