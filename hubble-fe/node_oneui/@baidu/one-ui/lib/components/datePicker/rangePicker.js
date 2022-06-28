"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _classnames = _interopRequireDefault(require("classnames"));

var _miniStore = require("mini-store");

var _datePickerTools = require("../../core/datePickerTools");

var _titleHeader = _interopRequireDefault(require("./common/titleHeader"));

var _rangeRender = _interopRequireDefault(require("./common/rangeRender"));

var _input = _interopRequireDefault(require("./common/input"));

var _popLayer = _interopRequireDefault(require("../popLayer"));

var _button = _interopRequireDefault(require("../button"));

var _shortCut = _interopRequireDefault(require("./common/shortCut"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import Message from '../message';
var RangePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RangePicker, _PureComponent);

  function RangePicker(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var newState = {};

      if ('value' in _this.props) {
        var _this$props = _this.props,
            value = _this$props.value,
            validateMaxDate = _this$props.validateMaxDate;

        var _formatInitialRangeDa = (0, _datePickerTools.formatInitialRangeDateInfo)(value, validateMaxDate),
            beginDateYear = _formatInitialRangeDa.beginDateYear,
            beginDateMonth = _formatInitialRangeDa.beginDateMonth,
            endDateYear = _formatInitialRangeDa.endDateYear,
            endDateMonth = _formatInitialRangeDa.endDateMonth; // 控制一些组件内部属性


        newState = _extends({}, newState, {
          _value: value || [],
          showYear: beginDateYear,
          showMonth: beginDateMonth,
          endDateShowYear: endDateYear,
          endDateShowMonth: endDateMonth
        });
      }

      if ('validateMinDate' in _this.props && _this.props.validateMinDate !== prevProps.validateMinDate) {
        newState = _extends({}, newState, {
          validateMinDate: _this.props.validateMinDate
        });
      }

      if ('validateMaxDate' in _this.props && _this.props.validateMaxDate !== prevProps.validateMaxDate) {
        newState = _extends({}, newState, {
          validateMaxDate: _this.props.validateMaxDate
        });
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectDay", function (value, colsePanel) {
      if (colsePanel === void 0) {
        colsePanel = true;
      }

      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          validateMaxDate = _this$props2.validateMaxDate,
          validator = _this$props2.validator;
      var newState = {};

      if (!('value' in _this.props)) {
        // 非受控
        newState.currentValue = value;
      }

      var _formatInitialRangeDa2 = (0, _datePickerTools.formatInitialRangeDateInfo)(value, validateMaxDate),
          beginDateYear = _formatInitialRangeDa2.beginDateYear,
          beginDateMonth = _formatInitialRangeDa2.beginDateMonth,
          endDateYear = _formatInitialRangeDa2.endDateYear,
          endDateMonth = _formatInitialRangeDa2.endDateMonth;

      _this.store.setState({
        _value: value,
        showYear: beginDateYear,
        showMonth: beginDateMonth,
        endDateShowYear: endDateYear,
        endDateShowMonth: endDateMonth
      });

      if (!('visible' in _this.props) && colsePanel) {
        // 非受控
        newState.visible = false;
      }

      var validatorError = '';
      validatorError = validator && typeof validator === 'function' ? validator(value) : '';

      if (!validatorError) {
        onChange(value);
        newState.errorMessage = '';
      } else {
        newState.errorMessage = validatorError;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMultipleDatePickerBody", function () {
      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          shortcuts = _this$props3.shortcuts,
          size = _this$props3.size;
      var visible = _this.state.visible;
      var datePickerContainerClassName = (0, _classnames["default"])(prefixCls, prefixCls + "-multiple", prefixCls + "-panel-" + size);
      return _react["default"].createElement(_miniStore.Provider, {
        store: _this.store
      }, _react["default"].createElement("div", {
        className: datePickerContainerClassName
      }, shortcuts && shortcuts.length ? _react["default"].createElement(_shortCut["default"], _extends({}, _this.props, {
        onChange: _this.onSelectDay
      })) : null, _react["default"].createElement("div", null, _react["default"].createElement(_input["default"], _extends({}, _this.props, {
        visible: visible,
        onChange: _this.onSelectDay,
        multiple: true
      })), _react["default"].createElement(_titleHeader["default"], _extends({}, _this.props, {
        multiple: true
      })), _react["default"].createElement(_rangeRender["default"], _extends({}, _this.props, {
        multiple: true,
        onChange: _this.onSelectDay,
        visible: visible
      })))));
    });

    _defineProperty(_assertThisInitialized(_this), "onLayerVisibleChange", function (visible) {
      _this.props.onVisibleChange(visible);

      if (!('visible' in _this.props)) {
        _this.setState({
          visible: visible
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onOpenDatePicker", function (e) {
      if (!('visible' in _this.props)) {
        _this.setState({
          visible: true
        });
      }

      var _this$props4 = _this.props,
          onVisibleChange = _this$props4.onVisibleChange,
          onClickButton = _this$props4.onClickButton,
          validateMaxDate = _this$props4.validateMaxDate;
      var formatValue;

      if ('value' in _this.props) {
        formatValue = _this.props.value;
      } else {
        formatValue = _this.state.currentValue;
      }

      var _formatInitialRangeDa3 = (0, _datePickerTools.formatInitialRangeDateInfo)(formatValue, validateMaxDate),
          beginDateYear = _formatInitialRangeDa3.beginDateYear,
          beginDateMonth = _formatInitialRangeDa3.beginDateMonth,
          endDateYear = _formatInitialRangeDa3.endDateYear,
          endDateMonth = _formatInitialRangeDa3.endDateMonth; // 每次打开的时候，重置一下面板的type，并且保证当前value与state的value保持一致


      _this.store.setState({
        panelType: 'date',
        endDatePanelType: 'date',
        _value: formatValue,
        showYear: beginDateYear,
        showMonth: beginDateMonth,
        endDateShowYear: endDateYear,
        endDateShowMonth: endDateMonth
      });

      onVisibleChange(true);
      onClickButton(e);
    });

    _defineProperty(_assertThisInitialized(_this), "onDetete", function (e) {
      e.stopPropagation();
      e.preventDefault();

      _this.props.onDelete();

      if (!('value' in _this.props)) {
        _this.setState({
          currentValue: []
        });

        _this.store.setState({
          _value: []
        });
      }
    });

    var defaultValue = props.defaultValue,
        _value2 = props.value,
        _visible = props.visible,
        defaultVisible = props.defaultVisible,
        _validateMaxDate = props.validateMaxDate;

    var _value = defaultValue || _value2 || [];

    var _formatInitialRangeDa4 = (0, _datePickerTools.formatInitialRangeDateInfo)(_value, _validateMaxDate),
        _beginDateYear = _formatInitialRangeDa4.beginDateYear,
        _beginDateMonth = _formatInitialRangeDa4.beginDateMonth,
        _endDateYear = _formatInitialRangeDa4.endDateYear,
        _endDateMonth = _formatInitialRangeDa4.endDateMonth;

    _this.state = {
      currentValue: _value,
      visible: defaultVisible || _visible || false
    };
    _this.store = (0, _miniStore.create)({
      _value: _value,
      showYear: _beginDateYear,
      showMonth: _beginDateMonth,
      endDateShowYear: _endDateYear,
      endDateShowMonth: _endDateMonth,
      // 面板展示 date or month - 选择日期 or 月份
      panelType: 'date',
      endDatePanelType: 'date',
      validateMinDate: (0, _datePickerTools.transDateFormat)(props.validateMinDate) || (0, _datePickerTools.validateData)().validateMinDate,
      validateMaxDate: (0, _datePickerTools.transDateFormat)(props.validateMaxDate) || (0, _datePickerTools.validateData)().validateMaxDate
    });
    return _this;
  }

  var _proto = RangePicker.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2, _classNames3;

    var _this$props5 = this.props,
        prefixCls = _this$props5.prefixCls,
        className = _this$props5.className,
        disabled = _this$props5.disabled,
        getPopupContainer = _this$props5.getPopupContainer,
        dateFormat = _this$props5.dateFormat,
        shortcuts = _this$props5.shortcuts,
        popupPlacement = _this$props5.popupPlacement,
        size = _this$props5.size,
        customButtonTitle = _this$props5.customButtonTitle,
        showDeleteIcon = _this$props5.showDeleteIcon,
        layerPrefixCls = _this$props5.layerPrefixCls,
        buttonPrefixCls = _this$props5.buttonPrefixCls;
    var _this$state = this.state,
        currentValue = _this$state.currentValue,
        visible = _this$state.visible,
        errorMessage = _this$state.errorMessage;
    var formatValue;

    if ('value' in this.props) {
      formatValue = this.props.value;
    } else {
      formatValue = currentValue;
    }

    var buttonText = (0, _datePickerTools.formatButtonText)({
      value: formatValue,
      dateFormat: dateFormat
    });
    var text = customButtonTitle || buttonText || '开始日期   ~  结束日期';
    var datePickerClassNames = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-empty"] = !buttonText, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-showDeleteIcon"] = showDeleteIcon, _classNames));
    var layerProps = {
      trigger: disabled ? '' : 'click',
      visible: visible,
      onVisibleChange: this.onLayerVisibleChange,
      overlay: this.renderMultipleDatePickerBody(),
      dropdownMatchSelectWidth: false,
      getPopupContainer: getPopupContainer,
      overlayClassName: (0, _classnames["default"])(prefixCls + "-overlay", (_classNames2 = {}, _classNames2[prefixCls + "-overlay-has-shortcuts"] = shortcuts && shortcuts.length, _classNames2)),
      popupPlacement: popupPlacement,
      prefixCls: layerPrefixCls
    };
    var textClassName = (0, _classnames["default"])(prefixCls + "-title-text", (_classNames3 = {}, _classNames3[prefixCls + "-title-text-empty"] = !formatValue || !formatValue.length, _classNames3));
    return _react["default"].createElement("div", {
      className: datePickerClassNames
    }, _react["default"].createElement(_popLayer["default"], layerProps, _react["default"].createElement("div", {
      className: prefixCls + "-empty-target"
    })), _react["default"].createElement(_button["default"], {
      className: prefixCls + "-title",
      disabled: disabled,
      size: size,
      onClick: this.onOpenDatePicker,
      prefixCls: buttonPrefixCls
    }, _react["default"].createElement("span", {
      className: textClassName
    }, text), _react["default"].createElement(_oneUiIcon.IconCalendar, null), _react["default"].createElement(_oneUiIcon.IconTimesCircle, {
      onClick: this.onDetete
    })), errorMessage ? _react["default"].createElement("span", {
      className: prefixCls + "-error-message"
    }, errorMessage) : null);
  };

  return RangePicker;
}(_react.PureComponent);

_defineProperty(RangePicker, "propTypes", {
  // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
  defaultValue: _propTypes["default"].array,
  value: _propTypes["default"].array,
  dateFormat: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  getPopupContainer: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  defaultVisible: _propTypes["default"].bool,
  visible: _propTypes["default"].bool,
  onVisibleChange: _propTypes["default"].func,
  onChange: _propTypes["default"].func,

  /** 支持传入默认开始时间 */
  validateMinDate: _propTypes["default"].string,

  /** 支持传入默认结束时间 */
  validateMaxDate: _propTypes["default"].string,
  onClickButton: _propTypes["default"].func,
  shortcuts: _propTypes["default"].array,
  popupPlacement: _propTypes["default"].string,
  // 校验器，如果校验的话抛错，则不触发onChange
  validator: _propTypes["default"].func,
  customButtonTitle: _propTypes["default"].node,
  onDelete: _propTypes["default"].func,
  showDeleteIcon: _propTypes["default"].bool,
  layerPrefixCls: _propTypes["default"].string,
  buttonPrefixCls: _propTypes["default"].string,
  validateDisabled: _propTypes["default"].func
});

_defineProperty(RangePicker, "defaultProps", {
  dateFormat: 'YYYY/MM/DD',
  prefixCls: 'new-fc-one-date-picker',
  className: '',
  disabled: false,
  size: 'small',
  onVisibleChange: function onVisibleChange() {},
  onChange: function onChange() {},
  onClickButton: function onClickButton() {},
  shortcuts: null,
  getPopupContainer: function getPopupContainer() {
    return document.body;
  },
  showDeleteIcon: false,
  onDelete: function onDelete() {},
  layerPrefixCls: 'new-fc-one-popLayer',
  buttonPrefixCls: 'new-fc-one-btn'
});

_defineProperty(RangePicker, "getDerivedStateFromProps", function (nextProps) {
  var newState = {};

  if ('value' in nextProps) {
    newState.currentValue = nextProps.value;
  }

  if ('visible' in nextProps) {
    newState.visible = nextProps.visible;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(RangePicker);
var _default = RangePicker;
exports["default"] = _default;
module.exports = exports.default;