"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _input = _interopRequireDefault(require("../input"));

var _regionBody = _interopRequireDefault(require("./common/regionBody"));

var _regionTools = require("../../core/regionTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Search = _input["default"].Search;

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
      var searchCls = (0, _classnames3["default"])(prefixCls + "-search-box", (_classnames = {}, _classnames[prefixCls + "-search-box-has-render"] = prefixSearchRender || suffixSearchRender, _classnames[prefixCls + "-search-box-has-prefix"] = prefixSearchRender, _classnames[prefixCls + "-search-box-has-suffix"] = suffixSearchRender, _classnames));
      return _react["default"].createElement("div", {
        className: searchCls
      }, prefixSearchRender ? _react["default"].createElement("span", {
        ref: _this.getPrefixRenderRef,
        className: prefixCls + "-prefix-render"
      }, prefixSearchRender) : null, showSearchBox ? _react["default"].createElement(Search, searchProps) : null, suffixSearchRender ? _react["default"].createElement("span", {
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
    var regionCls = (0, _classnames3["default"])(prefixCls, className, (_classnames2 = {}, _classnames2[prefixCls + "-isSearching"] = !!searchValue, _classnames2));

    var regionBodyProps = _extends({}, this.props, {
      searchBoxWidth: regionWidth,
      searchValue: searchValue,
      onClickSearchItem: this.onClickSearchItem,
      disabledValue: (0, _regionTools.getFirstLevelDisabledValues)(disabledValue, customRegion)
    });

    return _react["default"].createElement("div", {
      className: regionCls
    }, suffixSearchRender || prefixSearchRender || showSearchBox ? this.renderSearchBoxContainer() : null, _react["default"].createElement(_regionBody["default"], regionBodyProps));
  };

  return Region;
}(_react.PureComponent);

_defineProperty(Region, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: _propTypes["default"].arrayOf(_propTypes["default"].number),

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
  disabledValue: _propTypes["default"].object,

  /**
   * 自定义类名
   */
  className: _propTypes["default"].string,

  /**
   * onChange, 点击复选框的时候的回调函数,
   * 传出 e,
   * e.target.value为当前点击的value,
   * e.target.checked当前点击状态，
   * e.selectedValue 为当前被选中的value集合
   */
  onChange: _propTypes["default"].func,

  /**
   * onSearchBoxFocus, 搜索框focus触发的函数
   */
  onSearchBoxFocus: _propTypes["default"].func,

  /**
   * onSearchBoxBlur, 搜索框失焦触发的函数
   */
  onSearchBoxBlur: _propTypes["default"].func,

  /**
   * onSearchBoxChange, 搜索框onChange触发
   */
  onSearchBoxChange: _propTypes["default"].func,

  /**
   * onSearchBoxClick, 点击搜索按钮
   */
  onSearchBoxClick: _propTypes["default"].func,

  /**
   * searchBox的placeholder
   */
  searchBoxPlaceholder: _propTypes["default"].string,

  /**
   * 清除搜索框的回调函数
   */
  onSearchBoxClear: _propTypes["default"].func,

  /**
   * 搜索的value
   */
  searchValue: _propTypes["default"].string,

  /**
   * searchbox的width
   */
  searchBoxWidth: _propTypes["default"].number,

  /**
   * 是否展示区县一级，默认是展示，如果使用自定义region，该字段失效
   */
  showDistrict: _propTypes["default"].bool,

  /**
   * 用于自定义地域
   */
  customRegion: _propTypes["default"].shape({
    /**
     * 地域的名称，key => value对应
     * regionNames: {
     *    1: '北京市',
     *    2: '上海市'
     * }
     */
    regionNames: _propTypes["default"].object,

    /**
     * 自定义的直辖市编码，即省、市为一个id，比如北京市，天津市，重庆市。。。，如果没有传[]
     * directCityCode: [1, 2, 3, 33]
     */
    directCityCode: _propTypes["default"].arrayOf(_propTypes["default"].number),

    /**
     * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
     * regionFiliationMap: {
     *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
     *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
     * }
     */
    regionFiliationMap: _propTypes["default"].object,

    /**
     * 祖先关系， key为子级地域的key, value为对应的父级的key
     * ancestorsRegionMap: {
     *    1: 998,
     *    2: 998
     * }
     */
    ancestorsRegionMap: _propTypes["default"].object,

    /**
     * 第一层级的key，比如国家， [中国, 海外]
     * topLevel: [998, 999]
     */
    topLevel: _propTypes["default"].array
  }),
  searchInputDisabled: _propTypes["default"].bool,
  // 搜索的前缀，可自定义reactNode
  prefixSearchRender: _propTypes["default"].node,
  // 搜索的尾缀，可自定义 reactNode
  suffixSearchRender: _propTypes["default"].node,
  // 是否展示输入框
  showSearchBox: _propTypes["default"].bool,
  searchPrefixCls: _propTypes["default"].string,
  checkboxPrefixCls: _propTypes["default"].string
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

(0, _reactLifecyclesCompat.polyfill)(Region);
var _default = Region;
exports["default"] = _default;
module.exports = exports.default;