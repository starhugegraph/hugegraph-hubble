"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames3 = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _input = _interopRequireDefault(require("../input"));

var _regionBody = _interopRequireDefault(require("./common/regionBody"));

var _popLayer = _interopRequireDefault(require("../popLayer"));

var _core = _interopRequireDefault(require("../../core"));

var _button = _interopRequireDefault(require("../button"));

var _regionTools = require("../../core/regionTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Search = _input["default"].Search;

var optionsShape = _propTypes["default"].shape({
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  label: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  children: optionsShape
});

var getRegionNames = _core["default"].region.getRegionNames;

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
      return _react["default"].createElement("div", {
        className: prefixCls + "-search-box"
      }, _react["default"].createElement(Search, searchProps));
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
      var regionCls = (0, _classnames3["default"])(layerCls, selectClassName, (_classnames = {}, _classnames[layerCls + "-isFocused"] = isFocused, _classnames[layerCls + "-isSearching"] = !!searchValue, _classnames));

      var regionBodyProps = _extends({}, _this.props, {
        prefixCls: layerCls,
        searchValue: searchValue,
        isFocused: isFocused,
        onClickSearchItem: _this.onClickSearchItem,
        onChange: _this.onChangeCheckbox,
        onChangeCheckAll: _this.onChangeCheckAll,
        selectedValue: innerSelectValue,
        disabledValue: (0, _regionTools.getFirstLevelDisabledValues)(disabledValue, customRegion)
      });

      if (!visible) {
        return _react["default"].createElement("span", null);
      }

      return _react["default"].createElement("div", {
        className: regionCls
      }, _this.renderSearchBoxContainer(), _react["default"].createElement(_regionBody["default"], regionBodyProps), !searchValue ? _react["default"].createElement("div", {
        className: layerCls + "-button"
      }, errorMsg ? _react["default"].createElement("div", {
        className: layerCls + "-error-msg"
      }, errorMsg) : null, _react["default"].createElement(_button["default"], {
        type: "primary",
        onClick: _this.onConfirm,
        prefixCls: buttonPrefixCls
      }, "\u786E\u5B9A"), _react["default"].createElement(_button["default"], {
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
    var regionCls = (0, _classnames3["default"])(prefixCls, className, (_classnames2 = {}, _classnames2[prefixCls + "-has-value"] = selectedValue.length, _classnames2));
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

    var buttonContainer = _react["default"].createElement(_button["default"], _extends({
      icon: iconType,
      className: prefixCls + "-button",
      disabled: disabled,
      size: size,
      prefixCls: buttonPrefixCls
    }, buttonProps), this.renderLabel() || selectorName);

    if (disabled) {
      return buttonContainer;
    }

    return _react["default"].createElement("div", {
      className: regionCls
    }, _react["default"].createElement(_popLayer["default"], layerProps, buttonContainer));
  };

  return SelectRegion;
}(_react.PureComponent);

_defineProperty(SelectRegion, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

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
    directCityCode: _propTypes["default"].array,

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

  /**
   * selectedValue, 传入需要勾选的checkbox的地域key
   */
  selectedValue: _propTypes["default"].array,

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
   * 是否展示区县一级，默认是展示, 如果使用自定义region，该字段失效
   */
  showDistrict: _propTypes["default"].bool,

  /**
   * 弹层的className
   */
  selectClassName: _propTypes["default"].string,

  /**
   * 选择器名称
   */
  selectorName: _propTypes["default"].string,

  /**
   * 弹层是否可视化
   */
  visible: _propTypes["default"].bool,

  /**
   * visible change的时候触发
   */
  onVisibleChange: _propTypes["default"].func,

  /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
  getPopupContainer: _propTypes["default"].func,

  /** 点击确定的回调函数 */
  onConfirm: _propTypes["default"].func,

  /** 点击取消的回调函数 */
  onCancel: _propTypes["default"].func,

  /** 点击确定的时候的校验器，可进行错误校验 */
  validator: _propTypes["default"].func,
  searchInputDisabled: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  buttonProps: _propTypes["default"].object,
  checkboxPrefixCls: _propTypes["default"].string,
  searchPrefixCls: _propTypes["default"].string,
  buttonPrefixCls: _propTypes["default"].string,
  popLayerPrefixCls: _propTypes["default"].string
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

(0, _reactLifecyclesCompat.polyfill)(SelectRegion);
var _default = SelectRegion;
exports["default"] = _default;
module.exports = exports.default;