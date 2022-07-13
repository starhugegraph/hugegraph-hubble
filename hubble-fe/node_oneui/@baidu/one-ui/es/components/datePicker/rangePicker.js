function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import { IconCalendar, IconTimesCircle } from '@baidu/one-ui-icon';
import classNames from 'classnames';
import { Provider, create } from 'mini-store';
import { transDateFormat, validateData, formatButtonText, formatInitialRangeDateInfo } from '../../core/datePickerTools';
import TitleHeader from './common/titleHeader';
import RangeRender from './common/rangeRender';
import Input from './common/input';
import Layer from '../popLayer';
import Button from '../button';
import ShortCut from './common/shortCut'; // import Message from '../message';

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

        var _formatInitialRangeDa = formatInitialRangeDateInfo(value, validateMaxDate),
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

      var _formatInitialRangeDa2 = formatInitialRangeDateInfo(value, validateMaxDate),
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
      var datePickerContainerClassName = classNames(prefixCls, prefixCls + "-multiple", prefixCls + "-panel-" + size);
      return React.createElement(Provider, {
        store: _this.store
      }, React.createElement("div", {
        className: datePickerContainerClassName
      }, shortcuts && shortcuts.length ? React.createElement(ShortCut, _extends({}, _this.props, {
        onChange: _this.onSelectDay
      })) : null, React.createElement("div", null, React.createElement(Input, _extends({}, _this.props, {
        visible: visible,
        onChange: _this.onSelectDay,
        multiple: true
      })), React.createElement(TitleHeader, _extends({}, _this.props, {
        multiple: true
      })), React.createElement(RangeRender, _extends({}, _this.props, {
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

      var _formatInitialRangeDa3 = formatInitialRangeDateInfo(formatValue, validateMaxDate),
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

    var _formatInitialRangeDa4 = formatInitialRangeDateInfo(_value, _validateMaxDate),
        _beginDateYear = _formatInitialRangeDa4.beginDateYear,
        _beginDateMonth = _formatInitialRangeDa4.beginDateMonth,
        _endDateYear = _formatInitialRangeDa4.endDateYear,
        _endDateMonth = _formatInitialRangeDa4.endDateMonth;

    _this.state = {
      currentValue: _value,
      visible: defaultVisible || _visible || false
    };
    _this.store = create({
      _value: _value,
      showYear: _beginDateYear,
      showMonth: _beginDateMonth,
      endDateShowYear: _endDateYear,
      endDateShowMonth: _endDateMonth,
      // 面板展示 date or month - 选择日期 or 月份
      panelType: 'date',
      endDatePanelType: 'date',
      validateMinDate: transDateFormat(props.validateMinDate) || validateData().validateMinDate,
      validateMaxDate: transDateFormat(props.validateMaxDate) || validateData().validateMaxDate
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

    var buttonText = formatButtonText({
      value: formatValue,
      dateFormat: dateFormat
    });
    var text = customButtonTitle || buttonText || '开始日期   ~  结束日期';
    var datePickerClassNames = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-empty"] = !buttonText, _classNames[prefixCls + "-disabled"] = disabled, _classNames[prefixCls + "-showDeleteIcon"] = showDeleteIcon, _classNames));
    var layerProps = {
      trigger: disabled ? '' : 'click',
      visible: visible,
      onVisibleChange: this.onLayerVisibleChange,
      overlay: this.renderMultipleDatePickerBody(),
      dropdownMatchSelectWidth: false,
      getPopupContainer: getPopupContainer,
      overlayClassName: classNames(prefixCls + "-overlay", (_classNames2 = {}, _classNames2[prefixCls + "-overlay-has-shortcuts"] = shortcuts && shortcuts.length, _classNames2)),
      popupPlacement: popupPlacement,
      prefixCls: layerPrefixCls
    };
    var textClassName = classNames(prefixCls + "-title-text", (_classNames3 = {}, _classNames3[prefixCls + "-title-text-empty"] = !formatValue || !formatValue.length, _classNames3));
    return React.createElement("div", {
      className: datePickerClassNames
    }, React.createElement(Layer, layerProps, React.createElement("div", {
      className: prefixCls + "-empty-target"
    })), React.createElement(Button, {
      className: prefixCls + "-title",
      disabled: disabled,
      size: size,
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

  return RangePicker;
}(PureComponent);

_defineProperty(RangePicker, "propTypes", {
  // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
  defaultValue: PropTypes.array,
  value: PropTypes.array,
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
  shortcuts: PropTypes.array,
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

polyfill(RangePicker);
export default RangePicker;