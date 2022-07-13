"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _omit = _interopRequireDefault(require("omit.js"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _cascader = _interopRequireDefault(require("./common/cascader"));

var _input = _interopRequireDefault(require("../input"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var optionsShape = _propTypes["default"].shape({
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  label: _propTypes["default"].string,
  disabled: _propTypes["default"].bool,
  children: optionsShape
});

var FieldNamesType = _propTypes["default"].shape({
  value: _propTypes["default"].string,
  label: _propTypes["default"].string,
  children: _propTypes["default"].string
});

var ShowSearchType = _propTypes["default"].shape({
  filter: _propTypes["default"].func,
  matchInputWidth: _propTypes["default"].bool,
  render: _propTypes["default"].func,
  sort: _propTypes["default"].func
});

function highlightKeyword(str, keyword, prefixCls) {
  return str.split(keyword).map(function (node, index) {
    return index === 0 ? node : [_react["default"].createElement("span", {
      className: prefixCls + "-menu-item-keyword",
      key: "seperator"
    }, keyword), node];
  });
}

function defaultFilterOption(inputValue, path, names) {
  return path.some(function (option) {
    return option[names.label].indexOf(inputValue) > -1;
  });
}

function defaultRenderFilteredOption(inputValue, path, prefixCls, names) {
  return path.map(function (option, index) {
    var label = option[names.label];
    var node = label.indexOf(inputValue) > -1 ? highlightKeyword(label, inputValue, prefixCls) : label;
    return index === 0 ? node : [' > ', node];
  });
}

function defaultSortFilteredOption(a, b, inputValue, names) {
  function callback(elem) {
    return elem[names.label].indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

var getFieldNames = function getFieldNames(props) {
  var fieldNames = props.fieldNames;
  return fieldNames;
};

var getFilledFieldNames = function getFilledFieldNames(props) {
  var fieldNames = getFieldNames(props) || {};
  var names = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value'
  };
  return names;
};

var defaultDisplayRender = function defaultDisplayRender(label) {
  return label.join(' > ');
};

var Cascader =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Cascader, _PureComponent);

  function Cascader(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getCascaderContainerInput", function (ref) {
      _this.cascaderInput = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "setValue", function (value, selectedOptions) {
      if (selectedOptions === void 0) {
        selectedOptions = [];
      }

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(value, selectedOptions);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (value, selectedOptions) {
      _this.setState({
        inputValue: ''
      });

      if (selectedOptions[0].__IS_FILTERED_OPTION) {
        var unwrappedValue = value[0];
        var unwrappedSelectedOptions = selectedOptions[0].path;

        _this.setValue(unwrappedValue, unwrappedSelectedOptions);

        return;
      }

      _this.setValue(value, selectedOptions);
    });

    _defineProperty(_assertThisInitialized(_this), "handlePopupVisibleChange", function (popupVisible) {
      if (!('popupVisible' in _this.props)) {
        var updater = function updater(state) {
          return {
            popupVisible: popupVisible,
            inputFocused: popupVisible,
            inputValue: popupVisible ? state.inputValue : ''
          };
        };

        _this.setState(updater);
      }

      var onPopupVisibleChange = _this.props.onPopupVisibleChange;

      if (onPopupVisibleChange) {
        onPopupVisibleChange(popupVisible);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputBlur", function () {
      _this.setState({
        inputFocused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function (e) {
      var _this$state = _this.state,
          inputFocused = _this$state.inputFocused,
          popupVisible = _this$state.popupVisible; // Prevent `Trigger` behaviour.

      if (inputFocused || popupVisible) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (e) {
      if (e.keyCode === _KeyCode["default"].BACKSPACE) {
        e.stopPropagation();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (e) {
      var inputValue = e.value;

      _this.setState({
        inputValue: inputValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearSelection", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (!_this.state.inputValue) {
        _this.setValue([]);

        _this.handlePopupVisibleChange(false);
      } else {
        _this.setState({
          inputValue: ''
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveInput", function (node) {
      _this.input = node;
    });

    _this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? _this.flattenTree(props.options, props) : undefined
    };
    return _this;
  }

  var _proto = Cascader.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        value: nextProps.value || []
      });
    }

    if ('popupVisible' in nextProps) {
      this.setState({
        popupVisible: nextProps.popupVisible
      });
    }

    if (nextProps.showSearch && this.props.options !== nextProps.options) {
      this.setState({
        flattenOptions: this.flattenTree(nextProps.options, nextProps)
      });
    }
  };

  _proto.getLabel = function getLabel() {
    var _this$props = this.props,
        options = _this$props.options,
        _this$props$displayRe = _this$props.displayRender,
        displayRender = _this$props$displayRe === void 0 ? defaultDisplayRender : _this$props$displayRe;
    var names = getFilledFieldNames(this.props);
    var value = this.state.value;
    var unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    var selectedOptions = (0, _arrayTreeFilter["default"])(options, function (o, level) {
      return o[names.value] === unwrappedValue[level];
    }, {
      childrenKeyName: names.children
    });
    var label = selectedOptions.map(function (o) {
      return o[names.label];
    });
    return displayRender(label, selectedOptions);
  };

  _proto.flattenTree = function flattenTree(options, props, ancestor) {
    var _this2 = this;

    if (ancestor === void 0) {
      ancestor = [];
    }

    var names = getFilledFieldNames(props);
    var flattenOptions = [];
    var childrenName = names.children;
    options.forEach(function (option) {
      var path = ancestor.concat(option);

      if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
        flattenOptions.push(path);
      }

      if (option[childrenName]) {
        flattenOptions = flattenOptions.concat(_this2.flattenTree(option[childrenName], props, path));
      }
    });
    return flattenOptions;
  };

  _proto.generateFilteredOptions = function generateFilteredOptions(prefixCls) {
    var _this3 = this,
        _ref2;

    var _this$props2 = this.props,
        showSearch = _this$props2.showSearch,
        notFoundContent = _this$props2.notFoundContent;
    var names = getFilledFieldNames(this.props);
    var _showSearch$filter = showSearch.filter,
        filter = _showSearch$filter === void 0 ? defaultFilterOption : _showSearch$filter,
        _showSearch$render = showSearch.render,
        render = _showSearch$render === void 0 ? defaultRenderFilteredOption : _showSearch$render,
        _showSearch$sort = showSearch.sort,
        sort = _showSearch$sort === void 0 ? defaultSortFilteredOption : _showSearch$sort;
    var _this$state2 = this.state,
        flattenOptions = _this$state2.flattenOptions,
        inputValue = _this$state2.inputValue;
    var filtered = flattenOptions.filter(function (path) {
      return filter(_this3.state.inputValue, path, names);
    }).sort(function (a, b) {
      return sort(a, b, inputValue, names);
    });

    if (filtered.length > 0) {
      return filtered.map(function (path) {
        var _ref;

        return _ref = {
          __IS_FILTERED_OPTION: true,
          path: path
        }, _ref[names.label] = render(inputValue, path, prefixCls, names), _ref[names.value] = path.map(function (o) {
          return o[names.value];
        }), _ref.disabled = path.some(function (o) {
          return !!o.disabled;
        }), _ref;
      });
    }

    return [(_ref2 = {}, _ref2[names.label] = notFoundContent, _ref2[names.value] = 'NEW_FC_ONE_CASCADER_NOT_FOUND', _ref2.disabled = true, _ref2)];
  };

  _proto.focus = function focus() {
    this.input.focus();
  };

  _proto.blur = function blur() {
    this.input.blur();
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var props = this.props,
        state = this.state;

    var prefixCls = props.prefixCls,
        inputPrefixCls = props.inputPrefixCls,
        children = props.children,
        placeholder = props.placeholder,
        size = props.size,
        disabled = props.disabled,
        width = props.width,
        className = props.className,
        style = props.style,
        allowClear = props.allowClear,
        _props$showSearch = props.showSearch,
        showSearch = _props$showSearch === void 0 ? false : _props$showSearch,
        showPlaceHolderWhenFocuse = props.showPlaceHolderWhenFocuse,
        otherProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "inputPrefixCls", "children", "placeholder", "size", "disabled", "width", "className", "style", "allowClear", "showSearch", "showPlaceHolderWhenFocuse"]);

    var value = state.value,
        inputFocused = state.inputFocused;
    var clearIcon = allowClear && !disabled && value.length > 0 || state.inputValue ? _react["default"].createElement(_icon["default"], {
      type: "close",
      className: prefixCls + "-picker-clear",
      onClick: this.clearSelection
    }) : null;
    var arrowCls = (0, _classnames["default"])((_classNames = {}, _classNames[prefixCls + "-picker-arrow"] = true, _classNames[prefixCls + "-picker-arrow-expand"] = state.popupVisible, _classNames)); // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop

    var inputProps = (0, _omit["default"])(otherProps, ['onChange', 'options', 'popupPlacement', 'transitionName', 'displayRender', 'onPopupVisibleChange', 'changeOnSelect', 'expandTrigger', 'popupVisible', 'getPopupContainer', 'loadData', 'popupClassName', 'filterOption', 'renderFilteredOption', 'sortFilteredOption', 'notFoundContent', 'fieldNames', 'defaultValue']);
    var options = props.options;

    if (state.inputValue) {
      options = this.generateFilteredOptions(prefixCls);
    } // Dropdown menu should keep previous status until it is fully closed.


    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    var dropdownMenuColumnStyle = {};
    var isNotFound = (options || []).length === 1 && options[0].value === 'NEW_FC_ONE_CASCADER_NOT_FOUND';

    if (isNotFound) {
      dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
    } // The default value of `matchInputWidth` is `true`


    var resultListMatchInputWidth = showSearch.matchInputWidth === false ? showSearch.matchInputWidth : true;

    if (isNotFound) {
      resultListMatchInputWidth = true;
    }

    var pickerCls = (0, _classnames["default"])(className, (_classNames2 = {}, _classNames2[prefixCls + "-picker"] = true, _classNames2[prefixCls + "-picker-with-value"] = state.inputValue, _classNames2[prefixCls + "-picker-disabled"] = disabled, _classNames2[prefixCls + "-picker-not-found"] = isNotFound, _classNames2[prefixCls + "-picker-show-search"] = !!showSearch, _classNames2[prefixCls + "-picker-focused"] = inputFocused, _classNames2[prefixCls + "-" + size] = size, _classNames2));

    if (resultListMatchInputWidth && state.inputValue && this.cascaderInput) {
      dropdownMenuColumnStyle.minWidth = this.cascaderInput.inputRef.offsetWidth;
    }

    var currentlabel = showPlaceHolderWhenFocuse && inputFocused && !value.length ? placeholder : this.getLabel();

    if (!state.inputValue && inputFocused && !value.length) {
      currentlabel = '';
    }

    var spanStyle = _extends({}, style, {
      width: width || style.width
    });

    var input = children || _react["default"].createElement("span", {
      style: spanStyle,
      className: pickerCls
    }, _react["default"].createElement("span", {
      className: prefixCls + "-picker-label"
    }, currentlabel), _react["default"].createElement(_input["default"], _extends({}, inputProps, {
      ref: this.getCascaderContainerInput,
      prefixCls: inputPrefixCls,
      placeholder: value && value.length > 0 ? undefined : placeholder,
      className: prefixCls + "-input",
      value: state.inputValue,
      disabled: disabled,
      readOnly: !showSearch,
      autoComplete: "off",
      onClick: showSearch ? this.handleInputClick : undefined,
      onBlur: showSearch ? this.handleInputBlur : undefined,
      onKeyDown: this.handleKeyDown,
      onChange: showSearch ? this.handleInputChange : undefined,
      style: spanStyle,
      width: width,
      isRequired: false,
      size: size
    })), clearIcon, _react["default"].createElement(_icon["default"], {
      type: "angle-down",
      className: arrowCls
    }));

    var expandIcon = _react["default"].createElement(_icon["default"], {
      type: "angle-right"
    });

    return _react["default"].createElement(_cascader["default"], _extends({}, props, {
      options: options,
      value: value,
      popupVisible: state.popupVisible,
      onPopupVisibleChange: this.handlePopupVisibleChange,
      onChange: this.handleChange,
      dropdownMenuColumnStyle: dropdownMenuColumnStyle,
      expandIcon: expandIcon,
      loadingIcon: expandIcon,
      transitionName: "slide-up"
    }), input);
  };

  return Cascader;
}(_react.PureComponent);

exports["default"] = Cascader;

_defineProperty(Cascader, "propTypes", {
  /** 可选项数据源 */
  options: _propTypes["default"].arrayOf(optionsShape),

  /** 指定选中项 */
  value: _propTypes["default"].array,

  /** 默认的选中项 */
  defaultValue: _propTypes["default"].array,

  /** 选择完成后的回调 */
  onChange: _propTypes["default"].func,

  /** 选择后展示的渲染函数 */
  displayRender: _propTypes["default"].func,

  /** 自定义样式 */
  style: _propTypes["default"].object,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** 自定义浮层类名 */
  popupClassName: _propTypes["default"].string,

  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement: _propTypes["default"].oneOf(['bottomLeft', 'bottomRight', 'topLeft', 'topRight']),

  /** 输入框占位文本 */
  placeholder: _propTypes["default"].string,

  /** 输入框大小 */
  size: _propTypes["default"].oneOf(['large', 'medium', 'small']),

  /** 禁用 */
  disabled: _propTypes["default"].bool,

  /** 是否支持清除 */
  allowClear: _propTypes["default"].bool,

  /** 是否展示 分为bool 和 object 两种
   * 为对象的时候
   * filter接收 inputValue path 两个参数，当 path 符合筛选条件时，应返回 true，反之则返回 false
   * limit搜索结果展示数量number
   * matchInputWidth搜索结果列表是否与输入框同宽
   * render 用于渲染 filter 后的选项
   * sort用于排序 filter 后的选项
   */
  showSearch: _propTypes["default"].oneOfType([ShowSearchType, _propTypes["default"].bool]),

  /** 搜索没有内容的时候 */
  notFoundContent: _propTypes["default"].node,

  /** 用于动态加载选项，无法与 showSearch 一起使用 */
  loadData: _propTypes["default"].func,

  /** 次级菜单的展开方式，可选 'click' 和 'hover */
  expandTrigger: _propTypes["default"].oneOf(['click', 'hover']),

  /** 当此选项为true时，点选每级菜单选项值都会发生变化 */
  changeOnSelect: _propTypes["default"].bool,

  /** 浮层可见变化时回调 */
  onPopupVisibleChange: _propTypes["default"].func,

  /** 前缀类名 */
  prefixCls: _propTypes["default"].string,

  /** 输入框的前缀类名 */
  inputPrefixCls: _propTypes["default"].string,

  /** 弹层挂载的位置的方法 */
  getPopupContainer: _propTypes["default"].func,

  /** 弹层是否可视 */
  popupVisible: _propTypes["default"].bool,

  /** 自定义 options 中 label name children 的字段 */
  fieldNames: FieldNamesType,

  /** 自定义的选择框后缀图标 */
  suffixIcon: _propTypes["default"].node,

  /** 展开面板的时候是否默认展示placeholder */
  showPlaceHolderWhenFocuse: _propTypes["default"].bool,

  /** 级联器的width */
  width: _propTypes["default"].number
});

_defineProperty(Cascader, "defaultProps", {
  prefixCls: 'new-fc-one-cascader',
  inputPrefixCls: 'new-fc-one-input',
  placeholder: '请选择',
  popupPlacement: 'bottomLeft',
  options: [],
  disabled: false,
  allowClear: true,
  notFoundContent: '未找到合适的选项',
  style: {},
  showPlaceHolderWhenFocuse: false,
  width: 200
});

module.exports = exports.default;