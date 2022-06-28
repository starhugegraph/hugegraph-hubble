function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import { IconChevronDown, IconTimesCircle, IconClose } from '@baidu/one-ui-icon';
import OneSelect from './common/oneSelect';
import { transSizeOfDefault } from '../../core/commonTools';

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
    size = transSizeOfDefault(size, 'small');
    var selectCls = classNames(prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-error-line"] = errorMessage, _classNames));
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

    var dropdownCls = classNames(dropdownClassName, prefixCls + "-dropdown-" + size);

    if (!isMultiple && !isTags) {
      selectCls = classNames(selectCls, className);
      return React.createElement(OneSelect, _extends({}, restProps, modeConfig, {
        prefixCls: prefixCls,
        className: selectCls,
        optionLabelProp: optionLabelProp,
        notFoundContent: notFoundContent,
        inputIcon: React.createElement(IconChevronDown, null),
        clearIcon: React.createElement(IconTimesCircle, null),
        removeIcon: React.createElement(IconClose, null),
        onChange: onChange,
        style: selectStyle,
        customRenderTarget: customRenderTarget,
        dropdownClassName: dropdownCls,
        defaultOpen: defaultVisible,
        suffixIcon: suffixIcon,
        checkboxPrefixCls: checkboxPrefixCls
      }));
    }

    var selectRootCls = classNames(prefixCls + "-container", className, (_classNames2 = {}, _classNames2[prefixCls + "-multiple"] = isMultiple, _classNames2));
    return React.createElement("div", {
      className: selectRootCls
    }, React.createElement(OneSelect, _extends({}, restProps, modeConfig, {
      prefixCls: prefixCls,
      className: selectCls,
      optionLabelProp: optionLabelProp,
      notFoundContent: notFoundContent,
      inputIcon: React.createElement(IconChevronDown, null),
      clearIcon: React.createElement(IconTimesCircle, null),
      removeIcon: React.createElement(IconClose, null),
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
    })), errorMessage ? React.createElement("div", {
      className: prefixCls + "-selection-text-error"
    }, errorMessage) : null);
  };

  return Select;
}(PureComponent);

_defineProperty(Select, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义类名 */
  className: PropTypes.string,

  /** 下拉选择尺寸 */
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),

  /** 搜索时候无内容展现 */
  notFoundContent: PropTypes.node,
  transitionName: PropTypes.string,
  choiceTransitionName: PropTypes.string,

  /** 是否可搜索 */
  showSearch: PropTypes.bool,

  /** 是否允许清空 */
  allowClear: PropTypes.bool,

  /** 是否禁用 */
  disabled: PropTypes.bool,

  /** 搜索时的placeholder */
  placeholder: PropTypes.string,

  /** 下拉选择自定义类名 */
  dropdownClassName: PropTypes.string,

  /** 搜索时触发 */
  onSearch: PropTypes.func,

  /** 搜索时是否支持筛选 */
  filterOption: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),

  /** 下拉选择的value */
  value: PropTypes.any,

  /** 下拉选择默认选中的value */
  defaultValue: PropTypes.any,

  /** 下拉选择类型 */
  mode: PropTypes.oneOf(['default', 'multiple', 'combobox', 'tags']),

  /** 搜索高亮的节点，默认'children', 如果是value,展示value值 */
  optionLabelProp: PropTypes.string,

  /** 选中触发的onChange */
  onChange: PropTypes.func,

  /** 搜索框失去焦点触发 */
  onBlur: PropTypes.func,

  /** 搜索框触发焦点 */
  onFocus: PropTypes.func,

  /** 下拉弹窗是否与target同宽 */
  dropdownMatchSelectWidth: PropTypes.bool,

  /** 筛选的节点 */
  optionFilterProp: PropTypes.string,

  /** 默认第一个是否高亮 */
  defaultActiveFirstOption: PropTypes.bool,

  /** 弹窗挂载的节点 */
  getPopupContainer: PropTypes.func,

  /** dropdown visible改变的时候触发 */
  onDropdownVisibleChange: PropTypes.func,

  /** 鼠标移入触发 */
  onMouseEnter: PropTypes.func,

  /** 鼠标移出触发 */
  onMouseLeave: PropTypes.func,

  /** 弹窗弹出来的trigger */
  trigger: PropTypes.string,

  /** 下拉选择器名称 */
  selectorName: PropTypes.string,

  /**
   * 外部指定的报错信息 - 该字段只在mode为multiple时生效
   */
  errorMessage: PropTypes.string,

  /**
   * 指定输入框的宽度
   */
  width: PropTypes.number,

  /** 自定义target区域的规则, 只能用于单选，或者多选中的 emun、count、custom情况 */
  customRenderTarget: PropTypes.func,

  /**
   * 多选的target回填，四类回填 enum, list, count, custom （枚举，陈列，计数，自定义枚举）
   */
  multipleRenderTargetMode: PropTypes.oneOf(['enum', 'list', 'count', 'custom']),
  defaultVisible: PropTypes.bool,
  suffixIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  checkboxPrefixCls: PropTypes.string
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

polyfill(Select);
export default Select;