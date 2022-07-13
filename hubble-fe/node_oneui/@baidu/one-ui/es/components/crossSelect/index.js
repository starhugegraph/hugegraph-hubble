function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import Dropdown from '../dropdown';
import Menu from '../menu';
import Icon from '../icon';
import Input from '../input';
import SearchText from '../select/searchText';
import Select from '../select';
import tools from '../../core';
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;
var Search = Input.Search;
var SingleSelect = Select.SingleSelect;
var flattern = tools.common.flattern;

var CrossSelect =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CrossSelect, _Component);

  function CrossSelect(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSearch", function () {
      var onClickSearch = _this.props.onClickSearch;
      var searchValue = _this.state.searchValue;

      if (onClickSearch) {
        onClickSearch(searchValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeSearch", function (e) {
      var value = e.target.value;
      var onSearchChange = _this.props.onSearchChange;

      _this.setState({
        searchValue: value
      });

      if (onSearchChange) {
        onSearchChange(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClearClick", function () {
      var onClearSearch = _this.props.onClearSearch;
      var value = '';

      if (onClearSearch) {
        onClearSearch(value);
      }

      _this.setState({
        searchValue: value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onInputFocus", function (e) {
      var showSearch = _this.state.showSearch;
      var onSearchInputFocus = _this.props.onSearchInputFocus;

      if (!showSearch) {
        _this.setState({
          showSearch: true
        });
      }

      if (onSearchInputFocus) {
        onSearchInputFocus(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function () {
      var showDisabledReason = _this.state.showDisabledReason;
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          disabledReason = _this$props.disabledReason,
          onMouseEnter = _this$props.onMouseEnter;

      if (disabled && disabledReason && !showDisabledReason) {
        _this.setState({
          showDisabledReason: !showDisabledReason
        });
      }

      if (onMouseEnter) {
        onMouseEnter();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      var showDisabledReason = _this.state.showDisabledReason;
      var onMouseLeave = _this.props.onMouseLeave;

      if (showDisabledReason) {
        _this.setState({
          showDisabledReason: !showDisabledReason
        });
      }

      if (onMouseLeave) {
        onMouseLeave();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getButtonRef", function (ref) {
      _this.buttonRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuItemRef", function (ref) {
      _this.menuItemRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getSubMenuItem", function (option, optionLength, index) {
      var _this$props2 = _this.props,
          onMenuItemHeight = _this$props2.onMenuItemHeight,
          prefixCls = _this$props2.prefixCls,
          onTitleClick = _this$props2.onTitleClick;
      var _this$state = _this.state,
          searchValue = _this$state.searchValue,
          showSearch = _this$state.showSearch;
      var parent = option.parent,
          children = option.children,
          emptyText = option.emptyText;

      if (children) {
        // children为[]给默认话术
        var subMenuOptions = children.length ? _this.renderSubMenuItem({
          searchValue: searchValue,
          showSearch: showSearch,
          children: children
        }) : _this.renderEmptySubMenuItem({
          emptyText: emptyText
        });

        var subMenuTitle = _this.renderParentSubMenuTitle({
          option: option,
          showSearch: showSearch,
          searchValue: searchValue,
          parent: parent,
          prefixCls: prefixCls
        });

        var subMenuProps = {
          key: option.value,
          title: subMenuTitle,
          disabled: option.disabled || false,
          onTitleClick: onTitleClick
        };

        var placements = _this.calculateSubMenuPlacements({
          children: children,
          index: index,
          optionLength: optionLength,
          onMenuItemHeight: onMenuItemHeight
        });

        if (placements) {
          subMenuProps.placements = placements;
        }

        return React.createElement(SubMenu, subMenuProps, subMenuOptions);
      }

      return _this.renderMenuItem({
        option: option,
        showSearch: showSearch,
        searchValue: searchValue,
        parent: parent,
        prefixCls: prefixCls
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getOperateRef", function (ref) {
      _this.operateRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownOverlay", function () {
      var dropdownHeight = _this.props.dropdownHeight;
      var _this$state2 = _this.state,
          options = _this$state2.options,
          searchValue = _this$state2.searchValue,
          notFound = _this$state2.notFound,
          searchPlaceholder = _this$state2.searchPlaceholder,
          selectValue = _this$state2.selectValue,
          levelList = _this$state2.levelList,
          showSearch = _this$state2.showSearch,
          selectedKeys = _this$state2.selectedKeys;
      var optionsLength = options.length;
      var defaultDisabledStyle = {
        padding: 0,
        cursor: 'auto'
      };
      var searchMenuProps = {
        disabled: true,
        style: defaultDisabledStyle
      };
      var searchProps = {
        placeholder: searchPlaceholder,
        value: searchValue,
        isShowDropDown: false,
        onSearch: _this.onSearch,
        onChange: _this.onChangeSearch,
        onClearClick: _this.onClearClick,
        onFocus: _this.onInputFocus
      };

      if (_this.buttonRef && _this.buttonRef.offsetWidth) {
        searchProps.style = {};
        var buttonWidth = _this.buttonRef.offsetWidth;
        searchProps.width = showSearch ? buttonWidth - 27 : buttonWidth;
      }

      var notFoundProps = {
        disabled: true
      };
      var selectProps = {
        style: {
          width: 64
        },
        options: levelList,
        onChange: _this.hanldLevelChange,
        value: selectValue
      };
      var menu = React.createElement(Menu, {
        style: {
          height: dropdownHeight
        },
        onClick: _this.handleMenuClick,
        theme: "light",
        triggerSubMenuAction: "click",
        selectedKeys: selectedKeys
      }, React.createElement(MenuItem, _extends({}, searchMenuProps, {
        ref: _this.getOperateRef
      }), showSearch ? React.createElement(SingleSelect, selectProps) : null, React.createElement(Search, searchProps)), options.map(function (option, index) {
        return _this.getSubMenuItem(option, optionsLength, index);
      }), !options.length && notFound ? React.createElement(MenuItem, notFoundProps, notFound) : null);
      return menu;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownContainer", function (ref) {
      _this.dropdown = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupContainer", function (triggerNode) {
      return triggerNode.parentNode;
    });

    _defineProperty(_assertThisInitialized(_this), "getLabel", function (value) {
      var options = flattern(_this.state.options);
      var textImpressionWay = _this.props.textImpressionWay;
      var currentOption = null;

      _.map(options, function (option) {
        if (value === option.value) {
          currentOption = option;
        }
      });

      if (!currentOption) {
        return null;
      }

      if (textImpressionWay === 'single') {
        return currentOption.label;
      }

      return currentOption.parent ? currentOption.parent.join(' > ') + " > " + currentOption.label : currentOption.label;
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuClick", function (e) {
      var handleMenuClick = _this.props.handleMenuClick;
      var options = _this.state.options;
      var newOptions = flattern(options);

      var index = _.findIndex(newOptions, function (option) {
        var newKey = "" + option.value;
        return newKey === e.key;
      });

      var currentItem = newOptions[index];

      if (handleMenuClick) {
        handleMenuClick(e, currentItem);
      }

      var parentKey = currentItem.parentValue;
      var currentKey = ["" + currentItem.value];
      var selectedKeys = parentKey ? parentKey.concat(currentKey) : currentKey;

      _this.setState({
        isExpend: false,
        value: currentItem.value,
        selectedKeys: selectedKeys
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hanldLevelChange", function (e) {
      var value = e.key;
      var hanldLevelChange = _this.props.hanldLevelChange;

      if (hanldLevelChange) {
        hanldLevelChange(value);
      }

      if (!('selectValue' in _this.props)) {
        _this.setState({
          selectValue: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dropdownVisibleChange", function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }

      _this.setState({
        isExpend: visible,
        searchValue: '',
        showSearch: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "calculateSubMenuPlacements", function (params) {
      var children = params.children,
          index = params.index,
          onMenuItemHeight = params.onMenuItemHeight,
          optionLength = params.optionLength;
      var placements = null; // 判断子菜单是否长，如果子菜单比母菜单长则判定为超长

      if (children.length >= optionLength && index) {
        placements = {
          rightTop: {
            points: ['tl', 'tr'],
            overflow: {
              adjustX: 1,
              adjustY: 1
            },
            offset: [4, -(onMenuItemHeight * index + 8)]
          }
        };
      }

      return placements;
    });

    _defineProperty(_assertThisInitialized(_this), "renderSubMenuItem", function (params) {
      var children = params.children,
          showSearch = params.showSearch,
          searchValue = params.searchValue;
      var subMenu = children.map(function (item) {
        var menuItemProps = {
          key: item.value,
          disabled: item.disabled || false
        };
        return React.createElement(MenuItem, menuItemProps, showSearch ? React.createElement(SearchText, {
          text: item.label,
          showSearch: true,
          searchValue: searchValue
        }) : item.label);
      });
      return subMenu;
    });

    _defineProperty(_assertThisInitialized(_this), "renderEmptySubMenuItem", function (params) {
      var emptyText = params.emptyText || '暂无数据';
      var emptyProps = {
        key: 'null-0',
        disabled: true
      };
      return [React.createElement(MenuItem, emptyProps, emptyText)];
    });

    _defineProperty(_assertThisInitialized(_this), "renderParentText", function (params) {
      var parent = params.parent;
      var menuItemText = parent && parent.length ? parent.join('>') : '';
      return menuItemText;
    });

    _defineProperty(_assertThisInitialized(_this), "renderParentSubMenuTitle", function (params) {
      var option = params.option,
          showSearch = params.showSearch,
          searchValue = params.searchValue,
          parent = params.parent,
          prefixCls = params.prefixCls;
      var label = option.label;

      var parentText = _this.renderParentText({
        parent: parent
      });

      var labelTextRender = showSearch ? React.createElement(SearchText, {
        text: label,
        showSearch: true,
        searchValue: searchValue
      }) : React.createElement("span", null, label);

      if (!parentText) {
        return labelTextRender;
      }

      var labelParentRender = showSearch ? React.createElement(SearchText, {
        text: "(" + parentText + ")",
        showSearch: true,
        searchValue: searchValue,
        className: prefixCls + "-item-parent"
      }) : React.createElement("span", {
        className: prefixCls + "-item-parent"
      }, "(", parentText, ")");
      return React.createElement("span", null, labelTextRender, labelParentRender);
    });

    _defineProperty(_assertThisInitialized(_this), "renderMenuItem", function (params) {
      var option = params.option,
          showSearch = params.showSearch,
          searchValue = params.searchValue,
          parent = params.parent,
          prefixCls = params.prefixCls;
      var menuItemProps = {
        key: option.value,
        ref: _this.getMenuItemRef,
        disabled: option.disabled
      };

      var textRender = _this.renderParentSubMenuTitle({
        option: option,
        showSearch: showSearch,
        searchValue: searchValue,
        parent: parent,
        prefixCls: prefixCls
      });

      return React.createElement(MenuItem, menuItemProps, textRender);
    });

    _this.state = {
      isExpend: false,
      showDisabledReason: false,
      options: props.options,
      searchValue: '',
      notFound: props.notFound,
      value: props.value,
      searchPlaceholder: props.searchPlaceholder,
      showSearch: false,
      selectValue: props.selectValue || props.levelList && props.levelList[0] && props.levelList[0].value,
      levelList: props.levelList,
      selectedKeys: props.value ? [props.value] : []
    };
    return _this;
  }

  var _proto = CrossSelect.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('options' in nextProps) {
      this.setState({
        options: nextProps.options
      });
    }

    if ('notFound' in nextProps) {
      this.setState({
        notFound: nextProps.notFound
      });
    }

    if ('searchPlaceholder' in nextProps) {
      this.setState({
        searchPlaceholder: nextProps.searchPlaceholder
      });
    }

    if ('selectValue' in nextProps) {
      this.setState({
        selectValue: nextProps.selectValue
      });
    }

    if ('levelList' in nextProps) {
      this.setState({
        levelList: nextProps.levelList
      });
    }
  };

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props3 = this.props,
        trigger = _this$props3.trigger,
        placement = _this$props3.placement,
        disabled = _this$props3.disabled,
        disabledReason = _this$props3.disabledReason,
        visible = _this$props3.visible,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style,
        getPopupContainer = _this$props3.getPopupContainer,
        titlePlaceHolder = _this$props3.titlePlaceHolder;
    var overlay = this.getDropdownOverlay();
    var dropdownProps = {
      // align,
      overlay: overlay,
      trigger: disabled ? [] : trigger,
      onVisibleChange: this.dropdownVisibleChange,
      placement: placement,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      getPopupContainer: getPopupContainer || this.getPopupContainer,
      className: prefixCls + "-container"
    };

    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    var _this$state3 = this.state,
        isExpend = _this$state3.isExpend,
        showDisabledReason = _this$state3.showDisabledReason,
        value = _this$state3.value;
    var classes = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-open"] = isExpend || visible, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    var showText = this.getLabel(value) || titlePlaceHolder;
    var textCls = classNames(prefixCls + "-text", (_classNames2 = {}, _classNames2[prefixCls + "-text-empty"] = !value || isExpend || visible, _classNames2));
    return React.createElement("div", {
      className: prefixCls + "-containers",
      ref: this.getDropdownContainer
    }, React.createElement(Dropdown, dropdownProps, React.createElement("span", {
      className: classes,
      style: style,
      ref: this.getButtonRef
    }, React.createElement("span", {
      className: textCls
    }, showText), React.createElement(Icon, {
      type: "angle-down"
    }), disabledReason && disabled && showDisabledReason ? React.createElement("span", {
      className: prefixCls + "-disabled-reason"
    }, disabledReason) : null)));
  };

  return CrossSelect;
}(Component);

_defineProperty(CrossSelect, "propTypes", {
  /** 菜单选项内容 */
  options: PropTypes.array,

  /** 默认展示的value */
  value: PropTypes.string,

  /** 外部输入框默认展示的placeholder */
  titlePlaceHolder: PropTypes.string,

  /** 自定义类目前缀 */
  prefixCls: PropTypes.string,

  /** 弹层展示的位置 */
  placement: PropTypes.string,

  /** 下拉选择禁用 */
  disabled: PropTypes.bool,
  trigger: PropTypes.array,

  /** 弹层视图变化时触发 */
  onVisibleChange: PropTypes.func,

  /** 弹层是否可视 */
  visible: PropTypes.any,

  /** 弹层挂载的节点 */
  getPopupContainer: PropTypes.any,

  /** 点击item的时候触发回调 */
  handleMenuClick: PropTypes.func,

  /** 弹层的高度 */
  dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 搜索框的placeholder */
  searchPlaceholder: PropTypes.string,

  /** dropdownStyle */
  style: PropTypes.object,

  /** 禁用原因 */
  disabledReason: PropTypes.string,

  /** 鼠标滑入触发 */
  onMouseEnter: PropTypes.func,

  /** 鼠标滑出触发 */
  onMouseLeave: PropTypes.func,

  /** 传入菜单item的高度，便于计算subMenu的placement定位 */
  onMenuItemHeight: PropTypes.number,

  /** 点击搜索框触发 */
  onClickSearch: PropTypes.func,

  /** 输入框改变时候触发回调 */
  onSearchChange: PropTypes.func,

  /** 清空输入框时触发回调 */
  onClearSearch: PropTypes.func,

  /** 找不到时候触发 */
  notFound: PropTypes.string,

  /** 选择的层级信息 */
  levelList: PropTypes.array,

  /** 默认选中的层级 */
  selectValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 选择层级时候的回调 */
  hanldLevelChange: PropTypes.func,

  /** 点击父层级，展开子层级的回调 */
  onTitleClick: PropTypes.func,

  /** 选中菜单收起后，展示的层级，默认是选中的label, 可设置全部层级，展现方式为 parent > current > children, 值为single单一层级，all全部层级 */
  textImpressionWay: PropTypes.string,

  /** 搜索框暴露focus函数  */
  onSearchInputFocus: PropTypes.func
});

_defineProperty(CrossSelect, "defaultProps", {
  prefixCls: 'new-fc-one-cross-select',
  disabled: false,
  dropdownHeight: 'auto',
  searchPlaceholder: '',
  style: {},
  onMenuItemHeight: 28,
  trigger: ['click'],
  notFound: '暂无内容',
  value: '',
  titlePlaceHolder: '请选择...',
  textImpressionWay: 'single'
});

export { CrossSelect as default };