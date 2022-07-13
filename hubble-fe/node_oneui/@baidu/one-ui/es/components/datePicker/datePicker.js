function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import { Provider, create } from 'mini-store';
import { IconCalendar, IconTimesCircle } from '@baidu/one-ui-icon';
import { getDetailDate, getTodayDetail, transDateFormat, validateData, formatButtonText } from '../../core/datePickerTools';
import TitleHeader from './common/titleHeader';
import DayItemRender from './common/dayItemRender';
import MonthAndYearPanel from './common/monthAndYearPanel';
import Input from './common/input';
import Layer from '../popLayer';
import Button from '../button'; // import Message from '../message';

var DatePicker =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DatePicker, _PureComponent);

  function DatePicker(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var newState = {};

      if ('value' in _this.props) {
        var _value = _this.props.value || '';

        var todayDetail = getTodayDetail();
        var currentDetail = getDetailDate(_value); // 控制一些组件内部属性

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

    _defineProperty(_assertThisInitialized(_this), "onSelectDay", function (value, colsePanel) {
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

      var todayDetail = getTodayDetail();
      var currentDetail = getDetailDate(value);

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
      var datePickerPanelClassName = classNames(prefixCls, prefixCls + "-panel-" + size);
      return React.createElement(Provider, {
        store: _this.store
      }, React.createElement("div", {
        className: datePickerPanelClassName
      }, React.createElement(Input, _extends({}, _this.props, {
        visible: visible,
        onChange: _this.onSelectDay
      })), React.createElement(TitleHeader, _this.props), React.createElement(DayItemRender, _extends({}, _this.props, {
        onChange: _this.onSelectDay
      })), React.createElement(MonthAndYearPanel, _this.props)));
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

      var todayDetail = getTodayDetail();
      var currentDetail = getDetailDate(formatValue); // 每次打开的时候，重置一下面板的type，并且保证当前value与state的value保持一致

      _this.store.setState({
        panelType: 'date',
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

    var _todayDetail = getTodayDetail();

    var _currentDetail = getDetailDate(_value2);

    _this.state = {
      currentValue: _value2,
      visible: defaultVisible || _visible || false,
      errorMessage: ''
    };
    _this.store = create({
      _value: _value2,
      showYear: _value2 ? _currentDetail.fullYear : _todayDetail.fullYear,
      showMonth: _value2 ? _currentDetail.fullMonth : _todayDetail.fullMonth,
      // 面板展示 date or month - 选择日期 or 月份
      panelType: 'date',
      validateMinDate: transDateFormat(props.validateMinDate) || validateData().validateMinDate,
      validateMaxDate: transDateFormat(props.validateMaxDate) || validateData().validateMaxDate
    });
    return _this;
  }

  var _proto = DatePicker.prototype;

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
        buttonPrefixCls = _this$props4.buttonPrefixCls,
        layerPrefixCls = _this$props4.layerPrefixCls;
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

    var buttonText = formatButtonText({
      value: formatValue,
      dateFormat: dateFormat
    });
    var text = customButtonTitle || buttonText || '请选择日期';
    var datePickerClassNames = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-empty"] = !buttonText, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-showDeleteIcon"] = showDeleteIcon, _classNames));
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
    var textClassName = classNames(prefixCls + "-title-text", (_classNames2 = {}, _classNames2[prefixCls + "-title-text-empty"] = !formatValue, _classNames2));
    return React.createElement("div", {
      className: datePickerClassNames
    }, React.createElement(Layer, layerProps, React.createElement("div", {
      className: prefixCls + "-empty-target"
    })), React.createElement(Button, {
      className: prefixCls + "-title",
      disabled: disabled,
      size: size // icon="calendar"
      ,
      onClick: this.onOpenDatePicker,
      prefixCls: buttonPrefixCls
    }, React.createElement("span", {
      className: textClassName
    }, text), React.createElement(IconCalendar, null), React.createElement(IconTimesCircle, {
      onClick: this.onDetete
    })), errorMessage ? React.createElement("span", {
      className: prefixCls + "-error-message"
    }, errorMessage) : null);
  };

  return DatePicker;
}(PureComponent);

_defineProperty(DatePicker, "propTypes", {
  // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  dateFormat: PropTypes.string,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  defaultVisible: PropTypes.bool,
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onChange: PropTypes.func,

  /** 支持传入默认开始时间 */
  validateMinDate: PropTypes.string,

  /** 支持传入默认结束时间 */
  validateMaxDate: PropTypes.string,
  onClickButton: PropTypes.func,
  popupPlacement: PropTypes.string,
  // 校验器，如果校验的话抛错，则不触发onChange
  validator: PropTypes.func,
  customButtonTitle: PropTypes.node,
  onDelete: PropTypes.func,
  showDeleteIcon: PropTypes.bool,
  layerPrefixCls: PropTypes.string,
  buttonPrefixCls: PropTypes.string,
  validateDisabled: PropTypes.func
});

_defineProperty(DatePicker, "defaultProps", {
  dateFormat: 'YYYY/MM/DD',
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
  onDelete: function onDelete() {},
  showDeleteIcon: false,
  layerPrefixCls: 'new-fc-one-popLayer',
  buttonPrefixCls: 'new-fc-one-btn'
});

_defineProperty(DatePicker, "getDerivedStateFromProps", function (nextProps) {
  var newState = {};

  if ('value' in nextProps) {
    newState.currentValue = nextProps.value;
  }

  if ('visible' in nextProps) {
    newState.visible = nextProps.visible;
  }

  return newState;
});

polyfill(DatePicker);
export default DatePicker;