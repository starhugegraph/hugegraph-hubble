function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import partial from 'lodash/partial';
import uniq from 'lodash/uniq';
import classes from 'component-classes';
import { polyfill } from 'react-lifecycles-compat';
import arrayTreeFilter from 'array-tree-filter';
import { IconChevronRight, IconLoading } from '@baidu/one-ui-icon';
import { transOptionsToObject, formatCheckedKeys, formatIndeterminateKeys, formatDeleteCheckedKeys, formatAllCheckedKeys, flattenTree, filterSearchValue, flattenMultipleTree } from '../../core/cascaderPaneTools';
import Checkbox from '../checkbox';
import CascaderInput from './input';

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
        var optionsObject = transOptionsToObject(options, 'value');
        var checkedKeys = newCheckedKeys || _this.state.interCheckedKeys;
        var interCheckedKeys = formatCheckedKeys(optionsObject, checkedKeys);
        checkedKeys.forEach(function (key) {
          interCheckedKeys = interCheckedKeys.concat(formatAllCheckedKeys(optionsObject, key, interCheckedKeys));
        });
        var interIndeterminateKeys = formatIndeterminateKeys(optionsObject, interCheckedKeys);
        newState.optionsObject = optionsObject;
        newState.interCheckedKeys = interCheckedKeys;
        newState.interIndeterminateKeys = interIndeterminateKeys;
      }

      if (showSearch) {
        var _optionsObject = transOptionsToObject(options, 'value');

        var flattenTrees = flattenTree(options);
        newState.flattenTrees = [].concat(showCheckbox ? [].concat(flattenMultipleTree(_optionsObject, options)) : [], flattenTrees);
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "saveMenuItem", function (index) {
      return function (node) {
        _this.menuItems[index] = node;
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleSelect", function (targetOption, menuIndex, e) {
      var target = classes(e.target);

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
        newCheckedKeys = [].concat(interCheckedKeys, formatCheckedKeys(optionsObject, [value]), formatAllCheckedKeys(optionsObject, value, interCheckedKeys));
        newIndeterminateKeys = formatIndeterminateKeys(optionsObject, [].concat(uniq(newCheckedKeys)));
      } else {
        // 未选中
        newCheckedKeys = formatDeleteCheckedKeys(optionsObject, value, [].concat(interCheckedKeys));
        newIndeterminateKeys = formatIndeterminateKeys(optionsObject, [].concat(newCheckedKeys));
      }

      var checkedKeys = uniq(newCheckedKeys);

      if (!('checkedKeys' in _this.props)) {
        _this.setState({
          interCheckedKeys: checkedKeys,
          interIndeterminateKeys: uniq(newIndeterminateKeys)
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
          newSearchOptions = filterSearchValue(flattenTrees, inputValue);
        }

        _this.setState({
          searchOptions: uniq(newSearchOptions)
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
    var onSelect = partial(this.onHandleSelect, option, menuIndex);
    var expandProps = {
      onClick: onSelect
    };
    var menuItemCls = prefixCls + "-menu-item";
    var expandIconNode = null;
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if (hasChildren || option.isLeaf === false) {
      menuItemCls += " " + prefixCls + "-menu-item-expand";

      if (!option.loading) {
        expandIconNode = React.createElement("span", {
          className: prefixCls + "-menu-item-expand-icon"
        }, expandIcon);
      }
    }

    if (expandTrigger === 'hover' && hasChildren) {
      expandProps = {
        onMouseEnter: partial(this.onMouseEnterItem, option, menuIndex),
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
      label = [React.createElement(Checkbox, _extends({}, this.getOptionCheckboxProps(option), {
        prefixCls: checkboxPrefixCls,
        onChange: partial(this.onCheckboxChange, option),
        key: "checkbox",
        size: size
      })), React.createElement("span", {
        className: prefixCls + "-menu-item-label-text",
        key: "label"
      }, label)];
    }

    return React.createElement("li", _extends({
      key: option[this.getFieldName('value')],
      className: menuItemCls,
      title: title
    }, expandProps), label, option[this.getFieldName('icon')] ? React.createElement("span", {
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
        var target = findDOMNode(itemComponent);
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
    return arrayTreeFilter(options, function (o, level) {
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
    var paneClassName = classNames(className, "" + prefixCls, (_classNames = {}, _classNames[prefixCls + "-show-search"] = showSearch, _classNames));
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

    return React.createElement("div", {
      className: paneClassName
    }, showSearch ? React.createElement("div", null, React.createElement(CascaderInput, cascaderInputProps)) : null, !inputValue && useDefaultFilter || !useDefaultFilter ? React.createElement("div", {
      className: prefixCls + "-menus",
      style: style
    }, React.createElement("div", {
      className: prefixCls + "-menus-container"
    }, this.getShowOptions().map(function (options, menuIndex) {
      return React.createElement("ul", {
        className: prefixCls + "-menu",
        key: menuIndex,
        style: cascaderPaneStyle
      }, menuIndex === 0 && CustomItemRender ? React.createElement("li", {
        className: prefixCls + "-menu-item"
      }, CustomItemRender) : null, options.map(function (option) {
        return _this5.getOption(option, menuIndex);
      }));
    }))) : null, inputValue && useDefaultFilter ? React.createElement("div", {
      className: classNames(prefixCls + "-menus", prefixCls + "-menus-search-box")
    }, React.createElement("div", {
      className: prefixCls + "-menus-search-box-container"
    }, searchOptions.map(function (searchOption, index) {
      var newSearchOption = searchOption.map(function (option) {
        return option.label;
      });
      return React.createElement("div", {
        className: prefixCls + "-menu-item",
        key: index,
        onClick: partial(_this5.onClickSearchItem, searchOption)
      }, newSearchOption.join('>'));
    }), !(searchOptions && searchOptions.length) ? React.createElement("div", {
      className: prefixCls + "-empty"
    }, emptyNode) : null)) : null);
  };

  return CascaderPane;
}(PureComponent);

_defineProperty(CascaderPane, "propTypes", {
  /** 当前展开的key */
  value: PropTypes.array,

  /** 默认选中的key */
  defaultValue: PropTypes.array,

  /** options */
  options: PropTypes.array,

  /** 样式前缀 */
  prefixCls: PropTypes.string,

  /** 展开的trigger */
  expandTrigger: PropTypes.string,

  /** 点击item触发的回调 */
  onSelect: PropTypes.func,

  /** 面板是否可见，常用做下拉面板里面 */
  visible: PropTypes.bool,

  /** 级联面板自定义样式 */
  cascaderPaneStyle: PropTypes.object,

  /** 指定的fieldName的对象 */
  fieldNames: PropTypes.object,

  /** 展开的icon */
  expandIcon: PropTypes.node,

  /** 正在加载的icon */
  loadingIcon: PropTypes.node,

  /** 自定义className */
  className: PropTypes.string,

  /** 多选选中的keys */
  checkedKeys: PropTypes.array,

  /** 默认多选选中的keys */
  defaultCheckedKeys: PropTypes.array,

  /** 是否多选 */
  showCheckbox: PropTypes.bool,
  checkboxPrefixCls: PropTypes.string,
  onCheckboxChange: PropTypes.func,
  // 是否展示搜索
  showSearch: PropTypes.bool,
  // 自定义搜索的props
  searchProps: PropTypes.object,
  // 级联器宽度
  paneWidth: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  // 是否默认筛选
  useDefaultFilter: PropTypes.bool,
  onInputChange: PropTypes.func,
  defaultSearchValue: PropTypes.string,
  searchValue: PropTypes.string,
  emptyNode: PropTypes.node,
  CustomItemRender: PropTypes.node,
  onClickSearchItem: PropTypes.func
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
  expandIcon: React.createElement(IconChevronRight, null),
  loadingIcon: React.createElement(IconLoading, null),
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

polyfill(CascaderPane);
export default CascaderPane;