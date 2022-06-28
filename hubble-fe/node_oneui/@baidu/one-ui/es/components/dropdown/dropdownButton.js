function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { IconChevronDown } from '@baidu/one-ui-icon';
import Dropdown from './dropdown';
import Menu from '../menu';
import Input from '../input';
import SearchText from '../select/searchText';
import Button from '../button';
var MenuItem = Menu.Item;
var SubMenu = Menu.SubMenu;
var ItemGroup = Menu.ItemGroup;
var Search = Input.Search;
var Divider = Menu.Divider;
var itemHeightBySize = {
  xsmall: 24,
  small: 28,
  medium: 32,
  large: 36
};

var DropdownButton =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(DropdownButton, _Component);

  function DropdownButton(props) {
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
      var _this$props = _this.props,
          onSearchChange = _this$props.onSearchChange,
          searchControlled = _this$props.searchControlled,
          options = _this$props.options;

      _this.setState({
        searchValue: value
      });

      if (onSearchChange) {
        onSearchChange(value);
      }

      if (!searchControlled) {
        // 不受控的话 内部进行搜索
        var newOptions = options.filter(function (option) {
          return option.label && option.label.indexOf(value) > -1;
        });

        _this.setState({
          options: newOptions
        });
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

    _defineProperty(_assertThisInitialized(_this), "getButtonRef", function (ref) {
      _this.buttonRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getMenuItemRef", function (ref) {
      _this.menuItemRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getSubMenuItem", function (option, optionLength, index) {
      var _this$props2 = _this.props,
          onMenuItemHeight = _this$props2.onMenuItemHeight,
          showSearch = _this$props2.showSearch,
          size = _this$props2.size,
          prefixCls = _this$props2.prefixCls;
      var searchValue = _this.state.searchValue;

      if (option.children && option.children.length) {
        var childrenLength = option.children.length;
        var subMenu = option.children.map(function (item, index) {
          var menuItemProps = {
            key: item.value
          };

          if (item.disabled) {
            menuItemProps.disabled = true;
          }

          if (item.divider) {
            return React.createElement(Divider, {
              key: index + "-divider"
            });
          }

          var onClick = item.onClick || _.noop;

          if (showSearch) {
            return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
              onClick: onClick
            }, React.createElement(SearchText, {
              text: option.label,
              showSearch: true,
              searchValue: searchValue
            })));
          }

          return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
            onClick: onClick
          }, item.label));
        });
        var subMenuProps = {
          key: option.value,
          title: option.label,
          popupClassName: prefixCls + "-menu-submenu-" + size
        };

        if (option.disabled) {
          subMenuProps.disabled = true;
        } // 判断子菜单是否长，如果子菜单比母菜单长则判定为超长


        if (childrenLength >= optionLength && index) {
          var itemHeight = onMenuItemHeight || itemHeightBySize[size];
          subMenuProps.placements = {
            rightTop: {
              points: ['tl', 'tr'],
              overflow: {
                adjustX: 1,
                adjustY: 1
              },
              offset: [4, -(itemHeight * index)]
            }
          };
        }

        if (showSearch) {
          return React.createElement(SubMenu, subMenuProps, React.createElement(SearchText, {
            text: option.label,
            showSearch: true,
            searchValue: searchValue
          }));
        }

        return React.createElement(SubMenu, subMenuProps, subMenu);
      }

      if (option.groupChildren && option.groupChildren.length) {
        // 分组
        var children = option.groupChildren.map(function (child) {
          var menuItemProps = {
            key: child.value
          };

          if (child.disabled) {
            menuItemProps.disabled = true;
          }

          if (child.divider) {
            return React.createElement(Divider, {
              key: index + "-divider"
            });
          }

          var onClick = child.onClick || _.noop;

          if (showSearch) {
            return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
              onClick: onClick
            }, React.createElement(SearchText, {
              text: child.label,
              showSearch: true,
              searchValue: searchValue
            })));
          }

          return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
            onClick: onClick
          }, option.label));
        });
        return React.createElement(ItemGroup, {
          key: option.value,
          title: option.label
        }, children);
      }

      var menuItemProps = {
        key: option.value,
        ref: _this.getMenuItemRef
      };

      if (option.disabled) {
        menuItemProps.disabled = true;
      }

      if (option.divider) {
        return React.createElement(Divider, {
          key: index + "-divider"
        });
      }

      var onClick = option.onClick || _.noop;

      if (showSearch) {
        return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
          onClick: onClick
        }, React.createElement(SearchText, {
          text: option.label,
          showSearch: true,
          searchValue: searchValue
        })));
      }

      return React.createElement(MenuItem, menuItemProps, React.createElement("span", {
        onClick: onClick
      }, option.label));
    });

    _defineProperty(_assertThisInitialized(_this), "menuRef", function (ref) {
      _this.dropdownMenuRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownOverlay", function () {
      var _this$props3 = _this.props,
          dropdownHeight = _this$props3.dropdownHeight,
          showSearch = _this$props3.showSearch,
          searchPlaceholder = _this$props3.searchPlaceholder,
          searchWidth = _this$props3.searchWidth,
          prefixCls = _this$props3.prefixCls,
          size = _this$props3.size,
          searchPrefixCls = _this$props3.searchPrefixCls;
      var _this$state = _this.state,
          options = _this$state.options,
          searchValue = _this$state.searchValue,
          notFound = _this$state.notFound;
      var optionsLength = options.length;
      var searchMenuProps = {
        disabled: true,
        style: {
          padding: 0,
          cursor: 'auto'
        }
      };
      var searchProps = {
        placeholder: searchPlaceholder,
        value: searchValue,
        isShowDropDown: false,
        onSearch: _this.onSearch,
        onChange: _this.onChangeSearch,
        onClearClick: _this.onClearClick,
        size: size,
        prefixCls: searchPrefixCls
      };

      if (searchWidth) {
        searchProps.width = searchWidth;
      } else {
        searchProps.width = '100%';
      }

      var notFoundProps = {
        disabled: true,
        className: prefixCls + "-menu-item-not-found"
      };
      var menu = React.createElement(Menu, {
        style: {
          height: dropdownHeight
        },
        onClick: _this.handleMenuClick,
        className: prefixCls + "-menu-" + size,
        ref: _this.menuRef
      }, showSearch ? React.createElement(MenuItem, searchMenuProps, React.createElement(Search, searchProps)) : null, options.map(function (option, index) {
        return _this.getSubMenuItem(option, optionsLength, index);
      }), !options.length && notFound ? React.createElement(MenuItem, notFoundProps, notFound) : null);
      return menu;
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownContainer", function (ref) {
      _this.dropdown = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuClick", function (e) {
      var _this$props4 = _this.props,
          handleMenuClick = _this$props4.handleMenuClick,
          onHandleMenuClick = _this$props4.onHandleMenuClick;

      if (onHandleMenuClick) {
        onHandleMenuClick(e);
      } else if (handleMenuClick) {
        handleMenuClick(e);
      }

      _this.setState({
        isExpand: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dropdownVisibleChange", function (visible) {
      var _this$props5 = _this.props,
          onVisibleChange = _this$props5.onVisibleChange,
          options = _this$props5.options;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }

      _this.setState({
        isExpand: visible,
        searchValue: '',
        options: options
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setDropdownWidth", function () {
      var width = ReactDOM.findDOMNode(_this.buttonRef).offsetWidth;

      if (width !== _this.state.dropdownWidth) {
        _this.setState({
          dropdownWidth: width
        });
      }
    });

    _this.state = {
      isExpand: false,
      options: props.options || [],
      searchValue: '',
      notFound: props.notFound,
      dropdownWidth: null
    };
    return _this;
  }

  var _proto = DropdownButton.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.setDropdownWidth();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.setDropdownWidth();
  };

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
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props6 = this.props,
        trigger = _this$props6.trigger,
        placement = _this$props6.placement,
        disabled = _this$props6.disabled,
        visible = _this$props6.visible,
        title = _this$props6.title,
        style = _this$props6.style,
        getPopupContainer = _this$props6.getPopupContainer,
        className = _this$props6.className,
        overlayStyle = _this$props6.overlayStyle,
        overlayClassName = _this$props6.overlayClassName,
        width = _this$props6.width,
        onMouseEnter = _this$props6.onMouseEnter,
        onMouseLeave = _this$props6.onMouseLeave,
        size = _this$props6.size,
        type = _this$props6.type,
        onClickButton = _this$props6.onClickButton,
        buttonProps = _this$props6.buttonProps,
        primaryType = _this$props6.primaryType,
        textLink = _this$props6.textLink,
        dropdownMatchSelectWidth = _this$props6.dropdownMatchSelectWidth;
    var overlay = this.getDropdownOverlay();
    var dropdownProps = {
      overlay: overlay,
      trigger: disabled ? [] : trigger,
      onVisibleChange: this.dropdownVisibleChange,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      getPopupContainer: getPopupContainer,
      overlayStyle: overlayStyle,
      overlayClassName: overlayClassName,
      size: size
    };

    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    if ('placement' in this.props) {
      dropdownProps.placement = placement;
    }

    var prefixCls = this.props.prefixCls + "-button";
    var isExpand = this.state.isExpand;
    var dropdownButtonClassName = classNames(prefixCls, prefixCls + "-" + size, prefixCls + "-" + type, (_classNames = {}, _classNames[prefixCls + "-open"] = isExpand || visible, _classNames[prefixCls + "-textLink"] = textLink, _classNames));

    var buttonStyle = _extends({}, style);

    if (width) {
      buttonStyle.width = width + "px";
    }

    var dropdownButtonContainerClassName = classNames(prefixCls + "-containers", className);
    var otherProps = {};

    if (textLink) {
      otherProps.type = 'link';
    }

    var widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';

    if (this.state.dropdownWidth) {
      overlayStyle[widthProp] = this.state.dropdownWidth + "px";
    }

    return React.createElement("span", {
      className: dropdownButtonContainerClassName,
      ref: this.getDropdownContainer
    }, type === 'normal' ? React.createElement(Dropdown, dropdownProps, React.createElement("span", {
      ref: this.getButtonRef
    }, React.createElement(Button, _extends({
      className: dropdownButtonClassName,
      style: buttonStyle,
      disabled: disabled,
      size: size
    }, buttonProps, otherProps), title, React.createElement(IconChevronDown, null)))) : React.createElement("span", {
      ref: this.getButtonRef,
      className: prefixCls + "-primary-container"
    }, React.createElement(Button, {
      disabled: disabled,
      onClick: onClickButton,
      type: primaryType,
      size: size
    }, title), React.createElement(Dropdown, _extends({
      placement: "bottomRight"
    }, dropdownProps), React.createElement("span", {
      className: prefixCls + "-primary-container-item"
    }, React.createElement(Button, _extends({
      className: dropdownButtonClassName,
      style: buttonStyle,
      size: size,
      disabled: disabled,
      type: primaryType,
      icon: React.createElement(IconChevronDown, null)
    }, buttonProps))))));
  };

  return DropdownButton;
}(Component);

_defineProperty(DropdownButton, "propTypes", {
  /** option, {value,label} */
  options: PropTypes.array.isRequired,

  /** 标题名 */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 弹窗位置 */
  placement: PropTypes.string,

  /** 是否禁用 */
  disabled: PropTypes.bool,

  /** 触发方式 */
  trigger: PropTypes.array,

  /** 弹层视图变化时触发 */
  onVisibleChange: PropTypes.func,

  /** 弹层是否可视 */
  visible: PropTypes.any,

  /** 弹层挂载的位置 */
  getPopupContainer: PropTypes.any,

  /** 点击item触发 */
  handleMenuClick: PropTypes.func,

  /** 设置dropdown的高度 */
  dropdownHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** 搜索时候的Placeholder */
  searchPlaceholder: PropTypes.string,

  /** 是否可搜索 */
  showSearch: PropTypes.bool,

  /** 输入框宽度 */
  searchWidth: PropTypes.number,

  /** 自定义style */
  style: PropTypes.object,

  /** 鼠标移入触发 */
  onMouseEnter: PropTypes.func,

  /** 鼠标移出 */
  onMouseLeave: PropTypes.func,

  /** 可定义单个item的高度 */
  onMenuItemHeight: PropTypes.number,
  // 传入菜单item的高度，便于计算subMenu的placement定位,

  /** 点击搜索 */
  onClickSearch: PropTypes.func,

  /** 搜索时触发 */
  onSearchChange: PropTypes.func,

  /** 清空搜索时触发 */
  onClearSearch: PropTypes.func,

  /** 搜不到的展示话术 */
  notFound: PropTypes.string,

  /** 自定义className */
  className: PropTypes.string,

  /** 自定义下拉根元素的样式 */
  overlayStyle: PropTypes.object,

  /** 自定义下拉根元素的类名 */
  overlayClassName: PropTypes.string,

  /** 自定义宽度 */
  width: PropTypes.number,
  onHandleMenuClick: PropTypes.func,
  size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
  type: PropTypes.oneOf(['normal', 'primary']),
  onClickButton: PropTypes.func,
  buttonProps: PropTypes.object,

  /** 带主命令按钮 - 分成两种样式 */
  primaryType: PropTypes.oneOf(['primary', 'normal']),
  textLink: PropTypes.bool,
  searchControlled: PropTypes.bool,
  dropdownMatchSelectWidth: PropTypes.bool,
  searchPrefixCls: PropTypes.string
});

_defineProperty(DropdownButton, "defaultProps", {
  prefixCls: 'new-fc-one-dropdown',
  disabled: false,
  dropdownHeight: 'auto',
  showSearch: false,
  style: {},
  trigger: ['hover'],
  notFound: '暂无内容',
  className: '',
  searchPlaceholder: '请输入需要搜索的内容',
  size: 'small',
  type: 'normal',
  onClickButton: function onClickButton() {},
  buttonProps: {},
  primaryType: 'normal',
  textLink: false,
  searchControlled: false,
  dropdownMatchSelectWidth: false,
  overlayStyle: {},
  searchPrefixCls: 'new-fc-one-input-search'
});

export { DropdownButton as default };