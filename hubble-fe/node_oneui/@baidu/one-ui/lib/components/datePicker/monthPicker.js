"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _classnames = _interopRequireDefault(require("classnames"));

var _miniStore = require("mini-store");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _datePickerTools = require("../../core/datePickerTools");

var _titleHeader = _interopRequireDefault(require("./common/titleHeader"));

var _yearPanel = _interopRequireDefault(require("./common/yearPanel"));

var _monthPanel = _interopRequireDefault(require("./common/monthPanel"));

var _input = _interopRequireDefault(require("./common/input"));

var _popLayer = _interopRequireDefault(require("../popLayer"));

var _button = _interopRequireDefault(require("../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MonthPicker =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(MonthPicker, _PureComponent);

  function MonthPicker(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var newState = {};

      if ('value' in _this.props) {
        var _value = _this.props.value || '';

        var todayDetail = (0, _datePickerTools.getTodayDetail)();
        var currentDetail = (0, _datePickerTools.getDetailDate)(_value); // 控制一些组件内部属性

        newState = _extends({}, newState, {
          _value: _value,
          showYear: _value ? currentDetail.fullYear : todayDetail.fullYear,
          showMonth: _value ? currentDetail.fullMonth : todayDetail.fullMonth
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

    _defineProperty(_assertThisInitialized(_this), "onSelectMonth", function (value, colsePanel) {
      if (colsePanel === void 0) {
        colsePanel = true;
      }

      var _this$props = _this.props,
          onChange = _this$props.onChange,
          validator = _this$props.validator;
      var newState = {};

      if (!('value' in _this.props)) {
        // 非受控
        newState.currentValue = value;
      }

      var todayDetail = (0, _datePickerTools.getTodayDetail)();
      var currentDetail = (0, _datePickerTools.getDetailDate)(value);

      _this.store.setState({
        _value: value,
        showYear: value ? currentDetail.fullYear : todayDetail.fullYear,
        showMonth: value ? currentDetail.fullMonth : todayDetail.fullMonth
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

    _defineProperty(_assertThisInitialized(_this), "renderDatePickerBody", function () {
      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          size = _this$props2.size;
      var visible = _this.state.visible;
      var datePickerPanelClassName = (0, _classnames["default"])(prefixCls, prefixCls + "-panel-" + size);
      return _react["default"].createElement(_miniStore.Provider, {
        store: _this.store
      }, _react["default"].createElement("div", {
        className: datePickerPanelClassName
      }, _react["default"].createElement(_input["default"], _extends({}, _this.props, {
        visible: visible,
        onChange: _this.onSelectMonth,
        inputType: "month"
      })), _react["default"].createElement(_titleHeader["default"], _extends({}, _this.props, {
        isMonthRender: true
      })), _react["default"].createElement(_monthPanel["default"], _extends({}, _this.props, {
        isMonthRender: true,
        onClickMonth: _this.onSelectMonth
      })), _react["default"].createElement(_yearPanel["default"], _extends({}, _this.props, {
        isMonthRender: true
      }))));
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

      var _this$props3 = _this.props,
          onVisibleChange = _this$props3.onVisibleChange,
          onClickButton = _this$props3.onClickButton;
      var formatValue;

      if ('value' in _this.props) {
        formatValue = _this.props.value;
      } else {
        formatValue = _this.state.currentValue;
      }

      var todayDetail = (0, _datePickerTools.getTodayDetail)();
      var currentDetail = (0, _datePickerTools.getDetailDate)(formatValue); // 每次打开的时候，重置一下面板的type，并且保证当前value与state的value保持一致

      _this.store.setState({
        panelType: 'month',
        _value: formatValue,
        showYear: formatValue ? currentDetail.fullYear : todayDetail.fullYear,
        showMonth: formatValue ? currentDetail.fullMonth : todayDetail.fullMonth
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
          currentValue: ''
        });

        _this.store.setState({
          _value: ''
        });
      }
    });

    var defaultValue = props.defaultValue,
        _value3 = props.value,
        _visible = props.visible,
        defaultVisible = props.defaultVisible;

    var _value2 = defaultValue || _value3 || '';

    var _todayDetail = (0, _datePickerTools.getTodayDetail)();

    var _currentDetail = (0, _datePickerTools.getDetailDate)(_value2);

    _this.state = {
      currentValue: _value2,
      visible: defaultVisible || _visible || false,
      errorMessage: ''
    };
    _this.store = (0, _miniStore.create)({
      _value: _value2,
      showYear: _value2 ? _currentDetail.fullYear : _todayDetail.fullYear,
      showMonth: _value2 ? _currentDetail.fullMonth : _todayDetail.fullMonth,
      // 面板展示 month or year - 选择年份 or 月份
      panelType: 'month',
      validateMinDate: (0, _datePickerTools.transDateFormat)(props.validateMinDate) || (0, _datePickerTools.validateData)().validateMinDate,
      validateMaxDate: (0, _datePickerTools.transDateFormat)(props.validateMaxDate) || (0, _datePickerTools.validateData)().validateMaxDate
    });
    return _this;
  }

  var _proto = MonthPicker.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        className = _this$props4.className,
        disabled = _this$props4.disabled,
        getPopupContainer = _this$props4.getPopupContainer,
        dateFormat = _this$props4.dateFormat,
        popupPlacement = _this$props4.popupPlacement,
        size = _this$props4.size,
        customButtonTitle = _this$props4.customButtonTitle,
        showDeleteIcon = _this$props4.showDeleteIcon,
        layerPrefixCls = _this$props4.layerPrefixCls,
        buttonPrefixCls = _this$props4.buttonPrefixCls;
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
    var text = customButtonTitle || buttonText || '请选择日期';
    var datePickerClassNames = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-empty"] = !buttonText, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-showDeleteIcon"] = showDeleteIcon, _classNames));
    var layerProps = {
      trigger: disabled ? '' : 'click',
      visible: visible,
      onVisibleChange: this.onLayerVisibleChange,
      overlay: this.renderDatePickerBody(),
      dropdownMatchSelectWidth: false,
      getPopupContainer: getPopupContainer,
      popupPlacement: popupPlacement,
      prefixCls: layerPrefixCls
    };
    var textClassName = (0, _classnames["default"])(prefixCls + "-title-text", (_classNames2 = {}, _classNames2[prefixCls + "-title-text-empty"] = !formatValue, _classNames2));
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

  return MonthPicker;
}(_react.PureComponent);

_defineProperty(MonthPicker, "propTypes", {
  // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
  defaultValue: _propTypes["default"].string,
  value: _propTypes["default"].string,
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
  popupPlacement: _propTypes["default"].string,
  // 校验器，如果校验的话抛错，则不触发onChange
  validator: _propTypes["default"].func,
  customButtonTitle: _propTypes["default"].node,
  onDelete: _propTypes["default"].func,
  showDeleteIcon: _propTypes["default"].bool,
  layerPrefixCls: _propTypes["default"].string,
  buttonPrefixCls: _propTypes["default"].string
});

_defineProperty(MonthPicker, "defaultProps", {
  dateFormat: 'YYYY/MM',
  prefixCls: 'new-fc-one-date-picker',
  className: '',
  disabled: false,
  size: 'small',
  onVisibleChange: function onVisibleChange() {},
  onChange: function onChange() {},
  onClickButton: function onClickButton() {},
  getPopupContainer: function getPopupContainer() {
    return document.body;
  },
  showDeleteIcon: false,
  onDelete: function onDelete() {},
  layerPrefixCls: 'new-fc-one-popLayer',
  buttonPrefixCls: 'new-fc-one-btn'
});

_defineProperty(MonthPicker, "getDerivedStateFromProps", function (nextProps) {
  var newState = {};

  if ('value' in nextProps) {
    newState.currentValue = nextProps.value;
  }

  if ('visible' in nextProps) {
    newState.visible = nextProps.visible;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(MonthPicker);
var _default = MonthPicker;
exports["default"] = _default;
module.exports = exports.default;