function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import Cascader from '../cascader';
import { formatSingleOptions } from '../../core/regionTools';
import { formatOldKeyToNew, transNewKeyToOld, formatDisabledValueKeys } from './common/regionBody';

var SingleRegion =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SingleRegion, _PureComponent);

  function SingleRegion(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value, options) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          isNewRegionKeyMode = _this$props.isNewRegionKeyMode;

      if (onChange) {
        var selectedValue = value && value.map(function (item) {
          return +item;
        }) || [];
        onChange({
          options: options,
          selectedValue: formatOldKeyToNew(selectedValue, isNewRegionKeyMode)
        });
      }
    });

    var disabledValue = props.disabledValue,
        customRegion = props.customRegion,
        showDistrict = props.showDistrict,
        additionOption = props.additionOption,
        _isNewRegionKeyMode = props.isNewRegionKeyMode;
    var _selectedValue = props.selectedValue;
    var disabledValueKeys = formatDisabledValueKeys(disabledValue, _isNewRegionKeyMode);
    _selectedValue = _selectedValue && _selectedValue.map(function (value) {
      return "" + value;
    }) || null;
    _this.state = {
      options: formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption),
      selectedValue: transNewKeyToOld(_selectedValue, _isNewRegionKeyMode),
      prevProps: props
    };
    return _this;
  }

  var _proto = SingleRegion.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        searchBoxWidth = _this$props2.searchBoxWidth,
        searchBoxPlaceholder = _this$props2.searchBoxPlaceholder,
        getPopupContainer = _this$props2.getPopupContainer,
        popupClassName = _this$props2.popupClassName,
        allowClear = _this$props2.allowClear,
        changeOnSelect = _this$props2.changeOnSelect,
        size = _this$props2.size,
        cascaderPrefixCls = _this$props2.cascaderPrefixCls;
    var _this$state = this.state,
        options = _this$state.options,
        selectedValue = _this$state.selectedValue;
    var regionCls = classnames(prefixCls, className);
    var cascaderProps = {
      className: prefixCls + "-cascader",
      popupClassName: popupClassName,
      onChange: this.onChange,
      options: options,
      width: searchBoxWidth,
      placeholder: searchBoxPlaceholder,
      getPopupContainer: getPopupContainer,
      showSearch: true,
      allowClear: allowClear,
      changeOnSelect: changeOnSelect,
      size: size,
      prefixCls: cascaderPrefixCls
    };

    if (selectedValue) {
      cascaderProps.value = (selectedValue || []).map(function (item) {
        return "" + item;
      });
    }

    return React.createElement("div", {
      className: regionCls
    }, React.createElement(Cascader, cascaderProps));
  };

  return SingleRegion;
}(PureComponent);

_defineProperty(SingleRegion, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: PropTypes.arrayOf(PropTypes.number),

  /**
   * disabledValue, 传入禁止勾选的checkbox的地域，array格式，数组里面是disabledKey
   */
  disabledValue: PropTypes.arrayOf(PropTypes.number),

  /**
   * 自定义类名
   */
  className: PropTypes.string,

  /**
   * onChange, 点击复选框的时候的回调函数,
   * 传出 e,
   * e.options 当前选中的options,
   * e.selectedValue 为当前被选中的value集合
   */
  onChange: PropTypes.func,

  /**
   * searchBox的placeholder
   */
  searchBoxPlaceholder: PropTypes.string,

  /**
   * searchbox的width
   */
  searchBoxWidth: PropTypes.number,

  /**
   * 是否展示区县一级，默认是展示，如果使用自定义region，该字段失效
   */
  showDistrict: PropTypes.bool,

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
     * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
     * regionFiliationMap: {
     *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
     *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
     * }
     */
    regionFiliationMap: PropTypes.object,

    /**
     * 第一层级的key，比如国家， [中国, 海外]
     * topLevel: [998, 999]
     */
    topLevel: PropTypes.array
  }),

  /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
  getPopupContainer: PropTypes.func,

  /** 弹层的className */
  popupClassName: PropTypes.string,

  /** 除去港澳台的，如果需要可以通过下面字段传入 */
  additionOption: PropTypes.array,

  /** 是否需要input上有清空按钮 */
  allowClear: PropTypes.bool,

  /** 选择下一级的时候，是否实时带入选项 */
  changeOnSelect: PropTypes.bool,
  isNewRegionKeyMode: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  cascaderPrefixCls: PropTypes.string
});

_defineProperty(SingleRegion, "defaultProps", {
  className: '',
  searchBoxPlaceholder: '搜索地域',
  prefixCls: 'new-fc-one-single-region',
  searchBoxWidth: 200,
  showDistrict: true,
  popupClassName: '',
  additionOption: [],
  allowClear: true,
  changeOnSelect: false,
  size: 'small',
  cascaderPrefixCls: 'new-fc-one-cascader'
});

_defineProperty(SingleRegion, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {
    prevProps: nextProps
  };
  var prevProps = prevState.prevProps;
  var disabledValue = nextProps.disabledValue,
      customRegion = nextProps.customRegion,
      showDistrict = nextProps.showDistrict,
      additionOption = nextProps.additionOption,
      isNewRegionKeyMode = nextProps.isNewRegionKeyMode;

  if ('selectedValue' in nextProps && nextProps.selectedValue !== prevState.selectedValue) {
    newState.selectedValue = transNewKeyToOld(nextProps.selectedValue, isNewRegionKeyMode);
  }

  if ('disabledValue' in nextProps && disabledValue !== prevProps.disabledValue) {
    var disabledValueKeys = formatDisabledValueKeys(disabledValue, isNewRegionKeyMode);
    newState.options = formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption);
  }

  return newState;
});

polyfill(SingleRegion);
export default SingleRegion;