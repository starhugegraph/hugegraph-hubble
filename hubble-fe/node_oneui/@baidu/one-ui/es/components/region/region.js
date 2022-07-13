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
import { getFirstLevelDisabledValues } from '../../core/regionTools';
var Search = Input.Search;

var Region =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Region, _PureComponent);

  function Region(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxBlur", function (e) {
      var onSearchBoxBlur = _this.props.onSearchBoxBlur;

      if (onSearchBoxBlur) {
        onSearchBoxBlur(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSearchBoxFocus", function (e) {
      var onSearchBoxFocus = _this.props.onSearchBoxFocus;

      if (onSearchBoxFocus) {
        onSearchBoxFocus(e);
      }
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
        searchValue: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getPrefixRenderRef", function (ref) {
      _this.prefixRenderRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getSuffixRenderRef", function (ref) {
      _this.suffixRenderRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSearchBoxContainer", function () {
      var _classnames;

      var searchValue = _this.state.searchValue;
      var _this$props = _this.props,
          searchBoxPlaceholder = _this$props.searchBoxPlaceholder,
          prefixCls = _this$props.prefixCls,
          onSearchBoxClick = _this$props.onSearchBoxClick,
          searchBoxWidth = _this$props.searchBoxWidth,
          searchInputDisabled = _this$props.searchInputDisabled,
          suffixSearchRender = _this$props.suffixSearchRender,
          prefixSearchRender = _this$props.prefixSearchRender,
          showSearchBox = _this$props.showSearchBox,
          searchPrefixCls = _this$props.searchPrefixCls;
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
      var searchCls = classnames(prefixCls + "-search-box", (_classnames = {}, _classnames[prefixCls + "-search-box-has-render"] = prefixSearchRender || suffixSearchRender, _classnames[prefixCls + "-search-box-has-prefix"] = prefixSearchRender, _classnames[prefixCls + "-search-box-has-suffix"] = suffixSearchRender, _classnames));
      return React.createElement("div", {
        className: searchCls
      }, prefixSearchRender ? React.createElement("span", {
        ref: _this.getPrefixRenderRef,
        className: prefixCls + "-prefix-render"
      }, prefixSearchRender) : null, showSearchBox ? React.createElement(Search, searchProps) : null, suffixSearchRender ? React.createElement("span", {
        ref: _this.getSuffixRenderRef,
        className: prefixCls + "-suffix-render"
      }, suffixSearchRender) : null);
    });

    _this.state = {
      searchValue: props.searchValue || '',
      regionWidth: props.searchBoxWidth
    };
    return _this;
  }

  var _proto = Region.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var regionWidth = this.props.searchBoxWidth + (this.prefixRenderRef && this.prefixRenderRef.offsetWidth || 0) + (this.suffixRenderRef && this.suffixRenderRef.offsetWidth || 0);
    this.setState({
      regionWidth: regionWidth
    });
  };

  _proto.render = function render() {
    var _classnames2;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        customRegion = _this$props2.customRegion,
        disabledValue = _this$props2.disabledValue,
        showSearchBox = _this$props2.showSearchBox,
        prefixSearchRender = _this$props2.prefixSearchRender,
        suffixSearchRender = _this$props2.suffixSearchRender;
    var _this$state = this.state,
        searchValue = _this$state.searchValue,
        regionWidth = _this$state.regionWidth;
    var regionCls = classnames(prefixCls, className, (_classnames2 = {}, _classnames2[prefixCls + "-isSearching"] = !!searchValue, _classnames2));

    var regionBodyProps = _extends({}, this.props, {
      searchBoxWidth: regionWidth,
      searchValue: searchValue,
      onClickSearchItem: this.onClickSearchItem,
      disabledValue: getFirstLevelDisabledValues(disabledValue, customRegion)
    });

    return React.createElement("div", {
      className: regionCls
    }, suffixSearchRender || prefixSearchRender || showSearchBox ? this.renderSearchBoxContainer() : null, React.createElement(RegionBody, regionBodyProps));
  };

  return Region;
}(PureComponent);

_defineProperty(Region, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: PropTypes.arrayOf(PropTypes.number),

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
     * 自定义的直辖市编码，即省、市为一个id，比如北京市，天津市，重庆市。。。，如果没有传[]
     * directCityCode: [1, 2, 3, 33]
     */
    directCityCode: PropTypes.arrayOf(PropTypes.number),

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
  searchInputDisabled: PropTypes.bool,
  // 搜索的前缀，可自定义reactNode
  prefixSearchRender: PropTypes.node,
  // 搜索的尾缀，可自定义 reactNode
  suffixSearchRender: PropTypes.node,
  // 是否展示输入框
  showSearchBox: PropTypes.bool,
  searchPrefixCls: PropTypes.string,
  checkboxPrefixCls: PropTypes.string
});

_defineProperty(Region, "defaultProps", {
  className: '',
  searchBoxPlaceholder: '搜索地域',
  prefixCls: 'new-fc-one-region',
  searchBoxWidth: 360,
  showDistrict: true,
  searchInputDisabled: false,
  showSearchBox: true,
  searchPrefixCls: 'new-fc-one-input-search',
  checkboxPrefixCls: 'new-fc-one-checkbox'
});

polyfill(Region);
export default Region;