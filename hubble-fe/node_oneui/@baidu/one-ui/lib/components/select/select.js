"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _oneSelect = _interopRequireDefault(require("./common/oneSelect"));

var _commonTools = require("../../core/commonTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isMultipleMode = function isMultipleMode(props) {
  return props.mode === 'multiple';
};

var isTagsMode = function isTagsMode(props) {
  return props.mode === 'tags';
};

var Select =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Select, _PureComponent);

  function Select(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value, options) {
      var props = _this.props;
      var mode = props.mode,
          maxTagCount = props.maxTagCount;

      if (props.onChange) {
        props.onChange(value, options);
      }

      if (!('errorMessage' in _this.props)) {
        var isMultiple = mode === 'multiple';
        var valueLength = value && value.length;

        if (isMultiple) {
          var errorMessage = valueLength > maxTagCount ? "\u5DF2\u8D85\u8FC7\u6700\u5927\u53EF\u9009\u6570\u91CF" + (valueLength - maxTagCount) + "\u4E2A" : '';

          _this.setState({
            errorMessage: errorMessage
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveSelect", function (node) {
      _this.rcSelect = node;
    });

    _this.state = {
      errorMessage: _props.errorMessage && isMultipleMode(_props) || ''
    };
    return _this;
  }

  var _proto = Select.prototype;

  _proto.focus = function focus() {
    this.rcSelect.focus();
  };

  _proto.blur = function blur() {
    this.rcSelect.blur();
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var props = this.props;

    var prefixCls = props.prefixCls,
        _props$className = props.className,
        className = _props$className === void 0 ? '' : _props$className,
        mode = props.mode,
        rootClassName = props.rootClassName,
        onChange = props.onChange,
        width = props.width,
        style = props.style,
        multipleRenderTargetMode = props.multipleRenderTargetMode,
        dropdownClassName = props.dropdownClassName,
        customRenderTarget = props.customRenderTarget,
        visible = props.visible,
        defaultVisible = props.defaultVisible,
        suffixIcon = props.suffixIcon,
        checkboxPrefixCls = props.checkboxPrefixCls,
        restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "className", "mode", "rootClassName", "onChange", "width", "style", "multipleRenderTargetMode", "dropdownClassName", "customRenderTarget", "visible", "defaultVisible", "suffixIcon", "checkboxPrefixCls"]);

    var notFoundContent = props.notFoundContent,
        optionLabelProp = props.optionLabelProp;
    var errorMessage = this.state.errorMessage;
    var size = this.props.size;
    size = (0, _commonTools.transSizeOfDefault)(size, 'small');
    var selectCls = (0, _classnames["default"])(prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-error-line"] = errorMessage, _classNames));
    var isMultiple = isMultipleMode(props);
    var isTags = isTagsMode(props);
    var isCombobox = mode === 'combobox';

    if (isCombobox) {
      notFoundContent = null; // children 带 dom 结构时，无法填入输入框

      optionLabelProp = 'value';
    }

    var modeConfig = {
      multiple: isMultiple,
      combobox: isCombobox,
      tags: isTags
    };

    var selectStyle = _extends({}, style);

    if (width) {
      selectStyle.width = width + "px";
    }

    var dropdownCls = (0, _classnames["default"])(dropdownClassName, prefixCls + "-dropdown-" + size);

    if (!isMultiple && !isTags) {
      selectCls = (0, _classnames["default"])(selectCls, className);
      return _react["default"].createElement(_oneSelect["default"], _extends({}, restProps, modeConfig, {
        prefixCls: prefixCls,
        className: selectCls,
        optionLabelProp: optionLabelProp,
        notFoundContent: notFoundContent,
        inputIcon: _react["default"].createElement(_oneUiIcon.IconChevronDown, null),
        clearIcon: _react["default"].createElement(_oneUiIcon.IconTimesCircle, null),
        removeIcon: _react["default"].createElement(_oneUiIcon.IconClose, null),
        onChange: onChange,
        style: selectStyle,
        customRenderTarget: customRenderTarget,
        dropdownClassName: dropdownCls,
        defaultOpen: defaultVisible,
        suffixIcon: suffixIcon,
        checkboxPrefixCls: checkboxPrefixCls
      }));
    }

    var selectRootCls = (0, _classnames["default"])(prefixCls + "-container", className, (_classNames2 = {}, _classNames2[prefixCls + "-multiple"] = isMultiple, _classNames2));
    return _react["default"].createElement("div", {
      className: selectRootCls
    }, _react["default"].createElement(_oneSelect["default"], _extends({}, restProps, modeConfig, {
      prefixCls: prefixCls,
      className: selectCls,
      optionLabelProp: optionLabelProp,
      notFoundContent: notFoundContent,
      inputIcon: _react["default"].createElement(_oneUiIcon.IconChevronDown, null),
      clearIcon: _react["default"].createElement(_oneUiIcon.IconTimesCircle, null),
      removeIcon: _react["default"].createElement(_oneUiIcon.IconClose, null),
      onChange: this.onChange,
      style: selectStyle,
      dropdownClassName: dropdownCls,
      size: size,
      defaultOpen: defaultVisible,
      suffixIcon: suffixIcon,
      titleCallback: {
        type: multipleRenderTargetMode,
        selectorName: this.props.selectorName,
        customRenderTarget: multipleRenderTargetMode === 'custom' ? customRenderTarget : null
      },
      checkboxPrefixCls: checkboxPrefixCls
    })), errorMessage ? _react["default"].createElement("div", {
      className: prefixCls + "-selection-text-error"
    }, errorMessage) : null);
  };

  return Select;
}(_react.PureComponent);

_defineProperty(Select, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** 下拉选择尺寸 */
  size: _propTypes["default"].oneOf(['xsmall', 'small', 'medium', 'large']),

  /** 搜索时候无内容展现 */
  notFoundContent: _propTypes["default"].node,
  transitionName: _propTypes["default"].string,
  choiceTransitionName: _propTypes["default"].string,

  /** 是否可搜索 */
  showSearch: _propTypes["default"].bool,

  /** 是否允许清空 */
  allowClear: _propTypes["default"].bool,

  /** 是否禁用 */
  disabled: _propTypes["default"].bool,

  /** 搜索时的placeholder */
  placeholder: _propTypes["default"].string,

  /** 下拉选择自定义类名 */
  dropdownClassName: _propTypes["default"].string,

  /** 搜索时触发 */
  onSearch: _propTypes["default"].func,

  /** 搜索时是否支持筛选 */
  filterOption: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].func]),

  /** 下拉选择的value */
  value: _propTypes["default"].any,

  /** 下拉选择默认选中的value */
  defaultValue: _propTypes["default"].any,

  /** 下拉选择类型 */
  mode: _propTypes["default"].oneOf(['default', 'multiple', 'combobox', 'tags']),

  /** 搜索高亮的节点，默认'children', 如果是value,展示value值 */
  optionLabelProp: _propTypes["default"].string,

  /** 选中触发的onChange */
  onChange: _propTypes["default"].func,

  /** 搜索框失去焦点触发 */
  onBlur: _propTypes["default"].func,

  /** 搜索框触发焦点 */
  onFocus: _propTypes["default"].func,

  /** 下拉弹窗是否与target同宽 */
  dropdownMatchSelectWidth: _propTypes["default"].bool,

  /** 筛选的节点 */
  optionFilterProp: _propTypes["default"].string,

  /** 默认第一个是否高亮 */
  defaultActiveFirstOption: _propTypes["default"].bool,

  /** 弹窗挂载的节点 */
  getPopupContainer: _propTypes["default"].func,

  /** dropdown visible改变的时候触发 */
  onDropdownVisibleChange: _propTypes["default"].func,

  /** 鼠标移入触发 */
  onMouseEnter: _propTypes["default"].func,

  /** 鼠标移出触发 */
  onMouseLeave: _propTypes["default"].func,

  /** 弹窗弹出来的trigger */
  trigger: _propTypes["default"].string,

  /** 下拉选择器名称 */
  selectorName: _propTypes["default"].string,

  /**
   * 外部指定的报错信息 - 该字段只在mode为multiple时生效
   */
  errorMessage: _propTypes["default"].string,

  /**
   * 指定输入框的宽度
   */
  width: _propTypes["default"].number,

  /** 自定义target区域的规则, 只能用于单选，或者多选中的 emun、count、custom情况 */
  customRenderTarget: _propTypes["default"].func,

  /**
   * 多选的target回填，四类回填 enum, list, count, custom （枚举，陈列，计数，自定义枚举）
   */
  multipleRenderTargetMode: _propTypes["default"].oneOf(['enum', 'list', 'count', 'custom']),
  defaultVisible: _propTypes["default"].bool,
  suffixIcon: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  checkboxPrefixCls: _propTypes["default"].string
});

_defineProperty(Select, "defaultProps", {
  prefixCls: 'new-fc-one-select',
  className: '',
  size: 'small',
  showSearch: false,
  transitionName: 'slide-up',
  choiceTransitionName: 'zoom',
  trigger: 'click',
  optionLabelProp: 'children',
  notFoundContent: '无匹配结果',
  multipleRenderTargetMode: 'list',
  suffixIcon: null,
  checkboxPrefixCls: 'new-fc-one-checkbox'
});

_defineProperty(Select, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('errorMessage' in nextProps && nextProps.errorMessage !== prevState.errorMessage && isMultipleMode(nextProps)) {
    return {
      errorMessage: nextProps.errorMessage
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Select);
var _default = Select;
exports["default"] = _default;
module.exports = exports.default;