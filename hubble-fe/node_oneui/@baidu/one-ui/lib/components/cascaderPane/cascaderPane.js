"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _componentClasses = _interopRequireDefault(require("component-classes"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _cascaderPaneTools = require("../../core/cascaderPaneTools");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _input = _interopRequireDefault(require("./input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CascaderPane =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CascaderPane, _PureComponent);

  function CascaderPane(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "formatOptionsObject", function (newCheckedKeys) {
      var _this$props = _this.props,
          options = _this$props.options,
          showCheckbox = _this$props.showCheckbox,
          showSearch = _this$props.showSearch;
      var newState = {};

      if (showCheckbox) {
        var optionsObject = (0, _cascaderPaneTools.transOptionsToObject)(options, 'value');
        var checkedKeys = newCheckedKeys || _this.state.interCheckedKeys;
        var interCheckedKeys = (0, _cascaderPaneTools.formatCheckedKeys)(optionsObject, checkedKeys);
        checkedKeys.forEach(function (key) {
          interCheckedKeys = interCheckedKeys.concat((0, _cascaderPaneTools.formatAllCheckedKeys)(optionsObject, key, interCheckedKeys));
        });
        var interIndeterminateKeys = (0, _cascaderPaneTools.formatIndeterminateKeys)(optionsObject, interCheckedKeys);
        newState.optionsObject = optionsObject;
        newState.interCheckedKeys = interCheckedKeys;
        newState.interIndeterminateKeys = interIndeterminateKeys;
      }

      if (showSearch) {
        var _optionsObject = (0, _cascaderPaneTools.transOptionsToObject)(options, 'value');

        var flattenTrees = (0, _cascaderPaneTools.flattenTree)(options);
        newState.flattenTrees = [].concat(showCheckbox ? [].concat((0, _cascaderPaneTools.flattenMultipleTree)(_optionsObject, options)) : [], flattenTrees);
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "saveMenuItem", function (index) {
      return function (node) {
        _this.menuItems[index] = node;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleSelect", function (targetOption, menuIndex, e) {
      var target = (0, _componentClasses["default"])(e.target);

      if (target.has(_this.props.checkboxPrefixCls) || target.has(_this.props.checkboxPrefixCls + "-input")) {
        return;
      }

      var onSelect = _this.props.onSelect;
      var activeValue = _this.state.value;
      activeValue = activeValue.slice(0, menuIndex + 1);
      activeValue[menuIndex] = targetOption[_this.getFieldName('value')];

      if (!('value' in _this.props)) {
        _this.setState({
          value: activeValue
        });
      }

      onSelect(targetOption, menuIndex, activeValue);
    });

    _defineProperty(_assertThisInitialized(_this), "onCheckboxChange", function (targetOption, e) {
      var value = targetOption[_this.getFieldName('value')];

      var onCheckboxChange = _this.props.onCheckboxChange;
      var _this$state = _this.state,
          optionsObject = _this$state.optionsObject,
          interCheckedKeys = _this$state.interCheckedKeys;
      var newCheckedKeys;
      var newIndeterminateKeys;
      var checked = e.target.checked;

      if (checked) {
        // 选中
        newCheckedKeys = [].concat(interCheckedKeys, (0, _cascaderPaneTools.formatCheckedKeys)(optionsObject, [value]), (0, _cascaderPaneTools.formatAllCheckedKeys)(optionsObject, value, interCheckedKeys));
        newIndeterminateKeys = (0, _cascaderPaneTools.formatIndeterminateKeys)(optionsObject, [].concat((0, _uniq["default"])(newCheckedKeys)));
      } else {
        // 未选中
        newCheckedKeys = (0, _cascaderPaneTools.formatDeleteCheckedKeys)(optionsObject, value, [].concat(interCheckedKeys));
        newIndeterminateKeys = (0, _cascaderPaneTools.formatIndeterminateKeys)(optionsObject, [].concat(newCheckedKeys));
      }

      var checkedKeys = (0, _uniq["default"])(newCheckedKeys);

      if (!('checkedKeys' in _this.props)) {
        _this.setState({
          interCheckedKeys: checkedKeys,
          interIndeterminateKeys: (0, _uniq["default"])(newIndeterminateKeys)
        });
      }

      onCheckboxChange(checkedKeys);
    });

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      _this.props.onInputChange(e);

      var inputValue = e.value;
      var useDefaultFilter = _this.props.useDefaultFilter;
      var flattenTrees = _this.state.flattenTrees;
      var newSearchOptions = [];

      if (!('searchValue' in _this.props)) {
        _this.setState({
          inputValue: inputValue
        });
      }

      if (useDefaultFilter) {
        if (inputValue) {
          newSearchOptions = (0, _cascaderPaneTools.filterSearchValue)(flattenTrees, inputValue);
        }

        _this.setState({
          searchOptions: (0, _uniq["default"])(newSearchOptions)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickSearchItem", function (searchOption) {
      _this.props.onClickSearchItem(searchOption);

      var showCheckbox = _this.props.showCheckbox;
      var newValue = searchOption.map(function (option) {
        return option.value;
      });
      var newState = {};

      if (!('value' in _this.props)) {
        newState.value = newValue;
      } // 对于单选，选中的展开


      if (showCheckbox) {
        if (!('checkedKeys' in _this.props)) {
          var newCheckedKeys = [newValue[newValue.length - 1]];
          newState.interCheckedKeys = newCheckedKeys;

          _this.formatOptionsObject(newCheckedKeys);
        }
      }

      newState.inputValue = '';
      newState.searchOptions = [];

      _this.setState(newState);
    });

    _this.menuItems = {};
    _this.state = {
      value: props.value || props.defaultValue || [],
      // checkedKeys: props.checkedKeys || props.defaultCheckedKeys || [],
      optionsObject: {},
      interCheckedKeys: props.checkedKeys || props.defaultCheckedKeys || [],
      interIndeterminateKeys: [],
      inputValue: props.defaultSearchValue || props.searchValue || '',
      flattenTrees: [],
      searchOptions: []
    };
    return _this;
  }

  var _proto = CascaderPane.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollActiveItemToView();
    this.formatOptionsObject();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.scrollActiveItemToView();
    }

    if (prevProps.options !== this.props.options || this.props.checkedKeys && this.props.checkedKeys !== prevProps.checkedKeys) {
      this.formatOptionsObject(this.props.checkedKeys);
    }
  };

  CascaderPane.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    var newState = {};

    if ('value' in nextProps) {
      newState.value = nextProps.value;
    }

    return newState;
  };

  _proto.getOption = function getOption(option, menuIndex) {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        expandTrigger = _this$props2.expandTrigger,
        expandIcon = _this$props2.expandIcon,
        loadingIcon = _this$props2.loadingIcon,
        showCheckbox = _this$props2.showCheckbox,
        checkboxPrefixCls = _this$props2.checkboxPrefixCls,
        size = _this$props2.size;
    var onSelect = (0, _partial["default"])(this.onHandleSelect, option, menuIndex);
    var expandProps = {
      onClick: onSelect
    };
    var menuItemCls = prefixCls + "-menu-item";
    var expandIconNode = null;
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if (hasChildren || option.isLeaf === false) {
      menuItemCls += " " + prefixCls + "-menu-item-expand";

      if (!option.loading) {
        expandIconNode = _react["default"].createElement("span", {
          className: prefixCls + "-menu-item-expand-icon"
        }, expandIcon);
      }
    }

    if (expandTrigger === 'hover' && hasChildren) {
      expandProps = {
        onMouseEnter: (0, _partial["default"])(this.onMouseEnterItem, option, menuIndex),
        onMouseLeave: this.onMouseLeaveItem,
        onClick: onSelect
      };
    }

    if (this.isActiveOption(option, menuIndex)) {
      menuItemCls += " " + prefixCls + "-menu-item-active";
      expandProps.ref = this.saveMenuItem(menuIndex);
    }

    if (option.disabled) {
      menuItemCls += " " + prefixCls + "-menu-item-disabled";
    }

    var loadingIconNode = null;

    if (option.loading) {
      menuItemCls += " " + prefixCls + "-menu-item-loading";
      loadingIconNode = loadingIcon || null;
    }

    var title = '';

    if (option.title) {
      title = option.title;
    } else if (typeof option[this.getFieldName('label')] === 'string') {
      title = option[this.getFieldName('label')];
    }

    var label = option[this.getFieldName('label')];

    if (showCheckbox) {
      label = [_react["default"].createElement(_checkbox["default"], _extends({}, this.getOptionCheckboxProps(option), {
        prefixCls: checkboxPrefixCls,
        onChange: (0, _partial["default"])(this.onCheckboxChange, option),
        key: "checkbox",
        size: size
      })), _react["default"].createElement("span", {
        className: prefixCls + "-menu-item-label-text",
        key: "label"
      }, label)];
    }

    return _react["default"].createElement("li", _extends({
      key: option[this.getFieldName('value')],
      className: menuItemCls,
      title: title
    }, expandProps), label, option[this.getFieldName('icon')] ? _react["default"].createElement("span", {
      style: {
        marginLeft: 15
      }
    }, option[this.getFieldName('icon')]) : null, expandIconNode, loadingIconNode);
  };

  _proto.getFieldName = function getFieldName(name) {
    var fieldNames = this.props.fieldNames; // 防止只设置单个属性的名字

    return fieldNames[name];
  };

  _proto.scrollActiveItemToView = function scrollActiveItemToView() {
    // scroll into view
    var optionsLength = this.getShowOptions().length;

    for (var i = 0; i < optionsLength; i++) {
      var itemComponent = this.menuItems[i];

      if (itemComponent) {
        var target = (0, _reactDom.findDOMNode)(itemComponent);
        target.parentNode.scrollTop = target.offsetTop;
      }
    }
  };

  _proto.getShowOptions = function getShowOptions() {
    var _this2 = this;

    var options = this.props.options;
    var result = this.getActiveOptions().map(function (activeOption) {
      return activeOption[_this2.getFieldName('children')];
    }).filter(function (activeOption) {
      return !!activeOption;
    });
    result.unshift(options);
    return result;
  };

  _proto.getActiveOptions = function getActiveOptions(values) {
    var _this3 = this;

    var activeValue = values || this.state.value;
    var options = this.props.options;
    return (0, _arrayTreeFilter["default"])(options, function (o, level) {
      return o[_this3.getFieldName('value')] === activeValue[level];
    }, {
      childrenKeyName: this.getFieldName('children')
    });
  };

  _proto.isActiveOption = function isActiveOption(option, menuIndex) {
    var _this$state$value = this.state.value,
        value = _this$state$value === void 0 ? [] : _this$state$value;
    return value[menuIndex] === option[this.getFieldName('value')];
  };

  _proto.getOptionCheckboxProps = function getOptionCheckboxProps(option) {
    var _this$state2 = this.state,
        _this$state2$interChe = _this$state2.interCheckedKeys,
        interCheckedKeys = _this$state2$interChe === void 0 ? [] : _this$state2$interChe,
        _this$state2$interInd = _this$state2.interIndeterminateKeys,
        interIndeterminateKeys = _this$state2$interInd === void 0 ? [] : _this$state2$interInd;
    var value = option[this.getFieldName('value')];

    if (interIndeterminateKeys.indexOf(value) > -1) {
      // 半选
      return {
        indeterminate: true,
        checked: false
      };
    }

    if (interCheckedKeys.indexOf(value) > -1) {
      return {
        indeterminate: false,
        checked: true
      };
    }

    return {
      indeterminate: false,
      checked: false
    };
  };

  _proto.onMouseEnterItem = function onMouseEnterItem(optionTarget, menuIndex) {
    var _this4 = this;

    this.delayTimer = setTimeout(function () {
      _this4.onHandleSelect(optionTarget, menuIndex);

      _this4.delayTimer = null;
    }, 150);
  };

  _proto.onMouseLeaveItem = function onMouseLeaveItem() {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
  };

  _proto.render = function render() {
    var _classNames,
        _this5 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        cascaderPaneStyle = _this$props3.cascaderPaneStyle,
        className = _this$props3.className,
        paneWidth = _this$props3.paneWidth,
        showSearch = _this$props3.showSearch,
        searchProps = _this$props3.searchProps,
        defaultSearchValue = _this$props3.defaultSearchValue,
        useDefaultFilter = _this$props3.useDefaultFilter,
        emptyNode = _this$props3.emptyNode,
        CustomItemRender = _this$props3.CustomItemRender;
    var _this$state3 = this.state,
        inputValue = _this$state3.inputValue,
        searchOptions = _this$state3.searchOptions;
    var paneClassName = (0, _classnames["default"])(className, "" + prefixCls, (_classNames = {}, _classNames[prefixCls + "-show-search"] = showSearch, _classNames));
    var style = {};

    if (paneWidth && showSearch) {
      style.width = typeof paneWidth === 'number' ? paneWidth + "px" : paneWidth;
    }

    var cascaderInputProps = {
      width: paneWidth,
      onInputChange: this.onInputChange
    };
    cascaderInputProps.value = inputValue;

    if (defaultSearchValue) {
      cascaderInputProps.defaultValue = defaultSearchValue;
    }

    if (searchProps) {
      cascaderInputProps.searchProps = searchProps;
    }

    return _react["default"].createElement("div", {
      className: paneClassName
    }, showSearch ? _react["default"].createElement("div", null, _react["default"].createElement(_input["default"], cascaderInputProps)) : null, !inputValue && useDefaultFilter || !useDefaultFilter ? _react["default"].createElement("div", {
      className: prefixCls + "-menus",
      style: style
    }, _react["default"].createElement("div", {
      className: prefixCls + "-menus-container"
    }, this.getShowOptions().map(function (options, menuIndex) {
      return _react["default"].createElement("ul", {
        className: prefixCls + "-menu",
        key: menuIndex,
        style: cascaderPaneStyle
      }, menuIndex === 0 && CustomItemRender ? _react["default"].createElement("li", {
        className: prefixCls + "-menu-item"
      }, CustomItemRender) : null, options.map(function (option) {
        return _this5.getOption(option, menuIndex);
      }));
    }))) : null, inputValue && useDefaultFilter ? _react["default"].createElement("div", {
      className: (0, _classnames["default"])(prefixCls + "-menus", prefixCls + "-menus-search-box")
    }, _react["default"].createElement("div", {
      className: prefixCls + "-menus-search-box-container"
    }, searchOptions.map(function (searchOption, index) {
      var newSearchOption = searchOption.map(function (option) {
        return option.label;
      });
      return _react["default"].createElement("div", {
        className: prefixCls + "-menu-item",
        key: index,
        onClick: (0, _partial["default"])(_this5.onClickSearchItem, searchOption)
      }, newSearchOption.join('>'));
    }), !(searchOptions && searchOptions.length) ? _react["default"].createElement("div", {
      className: prefixCls + "-empty"
    }, emptyNode) : null)) : null);
  };

  return CascaderPane;
}(_react.PureComponent);

_defineProperty(CascaderPane, "propTypes", {
  /** 当前展开的key */
  value: _propTypes["default"].array,

  /** 默认选中的key */
  defaultValue: _propTypes["default"].array,

  /** options */
  options: _propTypes["default"].array,

  /** 样式前缀 */
  prefixCls: _propTypes["default"].string,

  /** 展开的trigger */
  expandTrigger: _propTypes["default"].string,

  /** 点击item触发的回调 */
  onSelect: _propTypes["default"].func,

  /** 面板是否可见，常用做下拉面板里面 */
  visible: _propTypes["default"].bool,

  /** 级联面板自定义样式 */
  cascaderPaneStyle: _propTypes["default"].object,

  /** 指定的fieldName的对象 */
  fieldNames: _propTypes["default"].object,

  /** 展开的icon */
  expandIcon: _propTypes["default"].node,

  /** 正在加载的icon */
  loadingIcon: _propTypes["default"].node,

  /** 自定义className */
  className: _propTypes["default"].string,

  /** 多选选中的keys */
  checkedKeys: _propTypes["default"].array,

  /** 默认多选选中的keys */
  defaultCheckedKeys: _propTypes["default"].array,

  /** 是否多选 */
  showCheckbox: _propTypes["default"].bool,
  checkboxPrefixCls: _propTypes["default"].string,
  onCheckboxChange: _propTypes["default"].func,
  // 是否展示搜索
  showSearch: _propTypes["default"].bool,
  // 自定义搜索的props
  searchProps: _propTypes["default"].object,
  // 级联器宽度
  paneWidth: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  // 是否默认筛选
  useDefaultFilter: _propTypes["default"].bool,
  onInputChange: _propTypes["default"].func,
  defaultSearchValue: _propTypes["default"].string,
  searchValue: _propTypes["default"].string,
  emptyNode: _propTypes["default"].node,
  CustomItemRender: _propTypes["default"].node,
  onClickSearchItem: _propTypes["default"].func
});

_defineProperty(CascaderPane, "defaultProps", {
  options: [],
  prefixCls: 'new-fc-one-cascader-pane',
  expandTrigger: 'click',
  onSelect: function onSelect() {},
  visible: true,
  fieldNames: {
    label: 'label',
    value: 'value',
    children: 'children',
    icon: 'icon'
  },
  expandIcon: _react["default"].createElement(_oneUiIcon.IconChevronRight, null),
  loadingIcon: _react["default"].createElement(_oneUiIcon.IconLoading, null),
  showCheckbox: false,
  checkboxPrefixCls: 'new-fc-one-checkbox',
  onCheckboxChange: function onCheckboxChange() {},
  showSearch: false,
  paneWidth: 360,
  size: 'small',
  useDefaultFilter: true,
  onInputChange: function onInputChange() {},
  emptyNode: '暂无结果',
  onClickSearchItem: function onClickSearchItem() {}
});

(0, _reactLifecyclesCompat.polyfill)(CascaderPane);
var _default = CascaderPane;
exports["default"] = _default;
module.exports = exports.default;