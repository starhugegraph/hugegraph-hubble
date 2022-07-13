function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Input from '../input';
import RegionBody from './common/regionBody';
import Layer from '../popLayer'; // import Icon from '../icon';

import tools from '../../core';
import Button from '../button';
import { getFirstLevelDisabledValues } from '../../core/regionTools';
var Search = Input.Search;
var optionsShape = PropTypes.shape({
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  children: optionsShape
});
var getRegionNames = tools.region.getRegionNames;

var SelectRegion =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SelectRegion, _PureComponent);

  function SelectRegion(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps, prevState) {
      var visible = _this.state.visible;
      var newState = {};

      if (visible !== prevState.visible) {
        if ('selectedValue' in _this.props) {
          var selectedValue = _this.props.selectedValue;
          newState.selectedValue = selectedValue;
          newState.innerSelectValue = selectedValue;
          newState.errorMsg = '';

          _this.setState(newState);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxBlur", function (e) {
      var onSearchBoxBlur = _this.props.onSearchBoxBlur;

      if (onSearchBoxBlur) {
        onSearchBoxBlur(e);
      }

      _this.setState({
        isFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxFocus", function (e) {
      var onSearchBoxFocus = _this.props.onSearchBoxFocus;

      if (onSearchBoxFocus) {
        onSearchBoxFocus(e);
      }

      _this.setState({
        isFocused: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxChange", function (e) {
      var onSearchBoxChange = _this.props.onSearchBoxChange;

      if (onSearchBoxChange) {
        onSearchBoxChange(e);
      }

      var searchValue = e.target.value;

      _this.setState({
        searchValue: searchValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxClear", function (e) {
      var onSearchBoxClear = _this.props.onSearchBoxClear;

      if (onSearchBoxClear) {
        onSearchBoxClear(e);
      }

      _this.setState({
        searchValue: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSearchItem", function () {
      _this.setState({
        searchValue: '',
        errorMsg: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeCheckbox", function (params) {
      var selectedValue = params.selectedValue;

      _this.setState({
        errorMsg: '',
        innerSelectValue: selectedValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeCheckAll", function (params) {
      var selectedValue = params.selectedValue;

      _this.setState({
        errorMsg: '',
        innerSelectValue: selectedValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onLayerVisibleChange", function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }

      if ('visible' in _this.props) {
        return;
      }

      _this.setState({
        visible: visible
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirm", function () {
      var _this$props = _this.props,
          onConfirm = _this$props.onConfirm,
          validator = _this$props.validator;
      var innerSelectValue = _this.state.innerSelectValue;

      if (validator) {
        var error = validator(innerSelectValue);

        if (error) {
          _this.setState({
            errorMsg: error
          });

          return;
        }
      }

      if (onConfirm) {
        onConfirm({
          selectedValue: innerSelectValue
        });
      }

      var newState = {};

      if (!('selectedValue' in _this.props)) {
        newState.selectedValue = innerSelectValue;
      }

      if (!('visible' in _this.props)) {
        newState.visible = false;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
      var onCancel = _this.props.onCancel;

      if (onCancel) {
        onCancel();
      }

      var newState = {};

      if (!('visible' in _this.props)) {
        newState.visible = false;
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchBoxContainer", function () {
      var searchValue = _this.state.searchValue;
      var _this$props2 = _this.props,
          searchBoxPlaceholder = _this$props2.searchBoxPlaceholder,
          prefixCls = _this$props2.prefixCls,
          onSearchBoxClick = _this$props2.onSearchBoxClick,
          searchBoxWidth = _this$props2.searchBoxWidth,
          searchInputDisabled = _this$props2.searchInputDisabled,
          searchPrefixCls = _this$props2.searchPrefixCls;
      var searchProps = {
        placeholder: searchBoxPlaceholder,
        value: searchValue,
        isShowSearchIcon: true,
        onBlur: _this.onSearchBoxBlur,
        onFocus: _this.onSearchBoxFocus,
        onChange: _this.onSearchBoxChange,
        onSearch: onSearchBoxClick,
        onClearClick: _this.onSearchBoxClear,
        width: searchBoxWidth,
        disabled: searchInputDisabled,
        prefixCls: searchPrefixCls
      };
      return React.createElement("div", {
        className: prefixCls + "-search-box"
      }, React.createElement(Search, searchProps));
    });

    _defineProperty(_assertThisInitialized(_this), "renderLayer", function () {
      var _classnames;

      var _this$props3 = _this.props,
          prefixCls = _this$props3.prefixCls,
          selectClassName = _this$props3.selectClassName,
          customRegion = _this$props3.customRegion,
          disabledValue = _this$props3.disabledValue,
          buttonPrefixCls = _this$props3.buttonPrefixCls;
      var _this$state = _this.state,
          isFocused = _this$state.isFocused,
          searchValue = _this$state.searchValue,
          visible = _this$state.visible,
          innerSelectValue = _this$state.innerSelectValue,
          errorMsg = _this$state.errorMsg;
      var layerCls = prefixCls + "-layer";
      var regionCls = classnames(layerCls, selectClassName, (_classnames = {}, _classnames[layerCls + "-isFocused"] = isFocused, _classnames[layerCls + "-isSearching"] = !!searchValue, _classnames));

      var regionBodyProps = _extends({}, _this.props, {
        prefixCls: layerCls,
        searchValue: searchValue,
        isFocused: isFocused,
        onClickSearchItem: _this.onClickSearchItem,
        onChange: _this.onChangeCheckbox,
        onChangeCheckAll: _this.onChangeCheckAll,
        selectedValue: innerSelectValue,
        disabledValue: getFirstLevelDisabledValues(disabledValue, customRegion)
      });

      if (!visible) {
        return React.createElement("span", null);
      }

      return React.createElement("div", {
        className: regionCls
      }, _this.renderSearchBoxContainer(), React.createElement(RegionBody, regionBodyProps), !searchValue ? React.createElement("div", {
        className: layerCls + "-button"
      }, errorMsg ? React.createElement("div", {
        className: layerCls + "-error-msg"
      }, errorMsg) : null, React.createElement(Button, {
        type: "primary",
        onClick: _this.onConfirm,
        prefixCls: buttonPrefixCls
      }, "\u786E\u5B9A"), React.createElement(Button, {
        type: "normal",
        onClick: _this.onCancel,
        prefixCls: buttonPrefixCls
      }, "\u53D6\u6D88")) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderLabel", function () {
      var customRegion = _this.props.customRegion;
      var selectedValue = [].concat(_this.state.selectedValue);
      var selectedValueLength = selectedValue.length;
      var labelValue = selectedValue.splice(0, 2);
      var regionNames = getRegionNames(customRegion);

      if (!selectedValueLength) {
        return null;
      }

      var str = '';
      labelValue.forEach(function (value, index) {
        str += "" + regionNames[value];

        if (index !== labelValue.length - 1) {
          str += '、';
        }
      });

      if (selectedValueLength <= 2) {
        return str;
      }

      return str + "\u7B49" + selectedValueLength + "\u4E2A";
    });

    _this.state = {
      isFocused: false,
      searchValue: props.searchValue || '',
      selectedValue: props.selectedValue || [],
      visible: props.visible || false,
      innerSelectValue: props.selectedValue || [],
      errorMsg: ''
    };
    return _this;
  }

  var _proto = SelectRegion.prototype;

  _proto.render = function render() {
    var _classnames2;

    var _this$props4 = this.props,
        prefixCls = _this$props4.prefixCls,
        className = _this$props4.className,
        getPopupContainer = _this$props4.getPopupContainer,
        selectorName = _this$props4.selectorName,
        disabled = _this$props4.disabled,
        size = _this$props4.size,
        buttonProps = _this$props4.buttonProps,
        buttonPrefixCls = _this$props4.buttonPrefixCls,
        popLayerPrefixCls = _this$props4.popLayerPrefixCls;
    var _this$state2 = this.state,
        selectedValue = _this$state2.selectedValue,
        visible = _this$state2.visible;
    var regionCls = classnames(prefixCls, className, (_classnames2 = {}, _classnames2[prefixCls + "-has-value"] = selectedValue.length, _classnames2));
    var layerProps = {
      trigger: 'click',
      visible: visible,
      onVisibleChange: this.onLayerVisibleChange,
      overlay: this.renderLayer,
      dropdownMatchSelectWidth: false,
      getPopupContainer: getPopupContainer,
      prefixCls: popLayerPrefixCls
    };
    var iconType = visible ? 'angle-up' : 'angle-down';
    var buttonContainer = React.createElement(Button, _extends({
      icon: iconType,
      className: prefixCls + "-button",
      disabled: disabled,
      size: size,
      prefixCls: buttonPrefixCls
    }, buttonProps), this.renderLabel() || selectorName);

    if (disabled) {
      return buttonContainer;
    }

    return React.createElement("div", {
      className: regionCls
    }, React.createElement(Layer, layerProps, buttonContainer));
  };

  return SelectRegion;
}(PureComponent);

_defineProperty(SelectRegion, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /**
   * 用于自定义地域
   */
  customRegion: PropTypes.shape({
    /**
     * 地域的名称，key => value对应
     * regionNames: {
     *    1: '北京市',
     *    2: '上海市'
     * }
     */
    regionNames: PropTypes.object,

    /**
     * 自定义的直辖市编码，即省、市为一个id，比如北京市，天津市，重庆市。。。，如果没有传[]
     * directCityCode: [1, 2, 3, 33]
     */
    directCityCode: PropTypes.array,

    /**
     * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
     * regionFiliationMap: {
     *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
     *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
     * }
     */
    regionFiliationMap: PropTypes.object,

    /**
     * 祖先关系， key为子级地域的key, value为对应的父级的key
     * ancestorsRegionMap: {
     *    1: 998,
     *    2: 998
     * }
     */
    ancestorsRegionMap: PropTypes.object,

    /**
     * 第一层级的key，比如国家， [中国, 海外]
     * topLevel: [998, 999]
     */
    topLevel: PropTypes.array
  }),

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: PropTypes.array,

  /**
   * disabledValue, 传入禁止勾选的checkbox的地域，格式可为object
   * {
   *      key: disabledReason
   * }
   * 比如：
   * {
   *      12: '该地域不可选'
   * }
   * 为object禁止理由也可以为空
   */
  disabledValue: PropTypes.object,

  /**
   * 自定义类名
   */
  className: PropTypes.string,

  /**
   * onChange, 点击复选框的时候的回调函数,
   * 传出 e,
   * e.target.value为当前点击的value,
   * e.target.checked当前点击状态，
   * e.selectedValue 为当前被选中的value集合
   */
  onChange: PropTypes.func,

  /**
   * onSearchBoxFocus, 搜索框focus触发的函数
   */
  onSearchBoxFocus: PropTypes.func,

  /**
   * onSearchBoxBlur, 搜索框失焦触发的函数
   */
  onSearchBoxBlur: PropTypes.func,

  /**
   * onSearchBoxChange, 搜索框onChange触发
   */
  onSearchBoxChange: PropTypes.func,

  /**
   * onSearchBoxClick, 点击搜索按钮
   */
  onSearchBoxClick: PropTypes.func,

  /**
   * searchBox的placeholder
   */
  searchBoxPlaceholder: PropTypes.string,

  /**
   * 清除搜索框的回调函数
   */
  onSearchBoxClear: PropTypes.func,

  /**
   * 搜索的value
   */
  searchValue: PropTypes.string,

  /**
   * searchbox的width
   */
  searchBoxWidth: PropTypes.number,

  /**
   * 是否展示区县一级，默认是展示, 如果使用自定义region，该字段失效
   */
  showDistrict: PropTypes.bool,

  /**
   * 弹层的className
   */
  selectClassName: PropTypes.string,

  /**
   * 选择器名称
   */
  selectorName: PropTypes.string,

  /**
   * 弹层是否可视化
   */
  visible: PropTypes.bool,

  /**
   * visible change的时候触发
   */
  onVisibleChange: PropTypes.func,

  /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
  getPopupContainer: PropTypes.func,

  /** 点击确定的回调函数 */
  onConfirm: PropTypes.func,

  /** 点击取消的回调函数 */
  onCancel: PropTypes.func,

  /** 点击确定的时候的校验器，可进行错误校验 */
  validator: PropTypes.func,
  searchInputDisabled: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  buttonProps: PropTypes.object,
  checkboxPrefixCls: PropTypes.string,
  searchPrefixCls: PropTypes.string,
  buttonPrefixCls: PropTypes.string,
  popLayerPrefixCls: PropTypes.string
});

_defineProperty(SelectRegion, "defaultProps", {
  className: '',
  searchBoxPlaceholder: '搜索地域',
  prefixCls: 'new-fc-one-select-region',
  searchBoxWidth: 360,
  showDistrict: true,
  selectorName: '请选择地域',
  searchInputDisabled: false,
  disabled: false,
  size: 'small',
  buttonProps: {},
  checkboxPrefixCls: 'new-fc-one-checkbox',
  searchPrefixCls: 'new-fc-one-input-search',
  buttonPrefixCls: 'new-fc-one-btn',
  popLayerPrefixCls: 'new-fc-one-popLayer'
});

_defineProperty(SelectRegion, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('selectedValue' in nextProps && nextProps.selectedValue !== prevState.selectedValue) {
    return {
      selectedValue: nextProps.selectedValue,
      innerSelectValue: nextProps.innerSelectValue
    };
  }

  return null;
});

polyfill(SelectRegion);
export default SelectRegion;