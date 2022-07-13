"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _cascader = _interopRequireDefault(require("../cascader"));

var _regionTools = require("../../core/regionTools");

var _regionBody = require("./common/regionBody");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
          selectedValue: (0, _regionBody.formatOldKeyToNew)(selectedValue, isNewRegionKeyMode)
        });
      }
    });

    var disabledValue = props.disabledValue,
        customRegion = props.customRegion,
        showDistrict = props.showDistrict,
        additionOption = props.additionOption,
        _isNewRegionKeyMode = props.isNewRegionKeyMode;
    var _selectedValue = props.selectedValue;
    var disabledValueKeys = (0, _regionBody.formatDisabledValueKeys)(disabledValue, _isNewRegionKeyMode);
    _selectedValue = _selectedValue && _selectedValue.map(function (value) {
      return "" + value;
    }) || null;
    _this.state = {
      options: (0, _regionTools.formatSingleOptions)(customRegion, disabledValueKeys, showDistrict, additionOption),
      selectedValue: (0, _regionBody.transNewKeyToOld)(_selectedValue, _isNewRegionKeyMode),
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
    var regionCls = (0, _classnames["default"])(prefixCls, className);
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

    return _react["default"].createElement("div", {
      className: regionCls
    }, _react["default"].createElement(_cascader["default"], cascaderProps));
  };

  return SingleRegion;
}(_react.PureComponent);

_defineProperty(SingleRegion, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: _propTypes["default"].arrayOf(_propTypes["default"].number),

  /**
   * disabledValue, 传入禁止勾选的checkbox的地域，array格式，数组里面是disabledKey
   */
  disabledValue: _propTypes["default"].arrayOf(_propTypes["default"].number),

  /**
   * 自定义类名
   */
  className: _propTypes["default"].string,

  /**
   * onChange, 点击复选框的时候的回调函数,
   * 传出 e,
   * e.options 当前选中的options,
   * e.selectedValue 为当前被选中的value集合
   */
  onChange: _propTypes["default"].func,

  /**
   * searchBox的placeholder
   */
  searchBoxPlaceholder: _propTypes["default"].string,

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
     * 父子级关系, key为父级别地域key, 子级为该父级别对应的子级的ids
     * regionFiliationMap: {
     *    1: [378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395],
     *    2: [396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 413, 414]
     * }
     */
    regionFiliationMap: _propTypes["default"].object,

    /**
     * 第一层级的key，比如国家， [中国, 海外]
     * topLevel: [998, 999]
     */
    topLevel: _propTypes["default"].array
  }),

  /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
  getPopupContainer: _propTypes["default"].func,

  /** 弹层的className */
  popupClassName: _propTypes["default"].string,

  /** 除去港澳台的，如果需要可以通过下面字段传入 */
  additionOption: _propTypes["default"].array,

  /** 是否需要input上有清空按钮 */
  allowClear: _propTypes["default"].bool,

  /** 选择下一级的时候，是否实时带入选项 */
  changeOnSelect: _propTypes["default"].bool,
  isNewRegionKeyMode: _propTypes["default"].bool,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  cascaderPrefixCls: _propTypes["default"].string
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
    newState.selectedValue = (0, _regionBody.transNewKeyToOld)(nextProps.selectedValue, isNewRegionKeyMode);
  }

  if ('disabledValue' in nextProps && disabledValue !== prevProps.disabledValue) {
    var disabledValueKeys = (0, _regionBody.formatDisabledValueKeys)(disabledValue, isNewRegionKeyMode);
    newState.options = (0, _regionTools.formatSingleOptions)(customRegion, disabledValueKeys, showDistrict, additionOption);
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(SingleRegion);
var _default = SingleRegion;
exports["default"] = _default;
module.exports = exports.default;