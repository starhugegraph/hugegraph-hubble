function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import toArray from 'rc-util/lib/Children/toArray';
import Menu from 'rc-menu';
import scrollIntoView from 'dom-scroll-into-view';
import raf from 'raf';
import tools from '../../../core';
var _tools$select = tools.select,
    getSelectKeys = _tools$select.getSelectKeys,
    preventDefaultEvent = _tools$select.preventDefaultEvent,
    saveRef = _tools$select.saveRef;

var DropdownMenu =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "scrollActiveItemToView", function () {
      // scroll into view
      var itemComponent = findDOMNode(_this.firstActiveItem);
      var _this$props = _this.props,
          value = _this$props.value,
          visible = _this$props.visible,
          firstActiveValue = _this$props.firstActiveValue;

      if (!itemComponent || !visible) {
        return;
      }

      var scrollIntoViewOpts = {
        onlyScrollIfNeeded: true
      };

      if ((!value || value.length === 0) && firstActiveValue) {
        scrollIntoViewOpts.alignWithTop = true;
      } // Delay to scroll since current frame item position is not ready when pre view is by filter


      _this.rafInstance = raf(function () {
        scrollIntoView(itemComponent, findDOMNode(_this.menuRef), scrollIntoViewOpts);
      });
    });

    _this.lastInputValue = props.inputValue;
    _this.saveMenuRef = saveRef(_assertThisInitialized(_this), 'menuRef');
    return _this;
  }

  var _proto = DropdownMenu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollActiveItemToView();
    this.lastVisible = this.props.visible;
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    if (!nextProps.visible) {
      this.lastVisible = false;
    } // freeze when hide


    return nextProps.visible || nextProps.inputValue !== this.props.inputValue;
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var props = this.props;

    if (!prevProps.visible && props.visible) {
      this.scrollActiveItemToView();
    }

    this.lastVisible = props.visible;
    this.lastInputValue = props.inputValue;
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.rafInstance && this.rafInstance.cancel) {
      this.rafInstance.cancel();
    }
  };

  _proto.renderMenu = function renderMenu() {
    var _this2 = this;

    var props = this.props;
    var menuItems = props.menuItems,
        menuItemSelectedIcon = props.menuItemSelectedIcon,
        defaultActiveFirstOption = props.defaultActiveFirstOption,
        value = props.value,
        prefixCls = props.prefixCls,
        multiple = props.multiple,
        onMenuSelect = props.onMenuSelect,
        inputValue = props.inputValue,
        firstActiveValue = props.firstActiveValue,
        backfillValue = props.backfillValue;

    if (menuItems && menuItems.length) {
      var menuProps = {};

      if (multiple) {
        menuProps.onDeselect = props.onMenuDeselect;
        menuProps.onSelect = onMenuSelect;
      } else {
        menuProps.onClick = onMenuSelect;
      }

      var selectedKeys = getSelectKeys(menuItems, value);
      var activeKeyProps = {};
      var clonedMenuItems = menuItems;

      if (selectedKeys.length || firstActiveValue) {
        if (props.visible && !this.lastVisible) {
          activeKeyProps.activeKey = selectedKeys[0] || firstActiveValue;
        }

        var foundFirst = false; // set firstActiveItem via cloning menus
        // for scroll into view

        var clone = function clone(item) {
          if (!foundFirst && selectedKeys.indexOf(item.key) !== -1 || !foundFirst && !selectedKeys.length && firstActiveValue.indexOf(item.key) !== -1) {
            foundFirst = true;
            return cloneElement(item, {
              ref: function ref(_ref) {
                _this2.firstActiveItem = _ref;
              }
            });
          }

          return item;
        };

        clonedMenuItems = menuItems.map(function (item) {
          if (item.type.isMenuItemGroup) {
            var children = toArray(item.props.children).map(clone);
            return cloneElement(item, {}, children);
          }

          return clone(item);
        });
      } else {
        // Clear firstActiveItem when dropdown menu items was empty
        // Avoid `Unable to find node on an unmounted component`
        this.firstActiveItem = null;
      } // clear activeKey when inputValue change


      var lastValue = value && value[value.length - 1];

      if (inputValue !== this.lastInputValue && (!lastValue || lastValue !== backfillValue)) {
        activeKeyProps.activeKey = '';
      }

      return React.createElement(Menu, _extends({
        ref: this.saveMenuRef,
        style: this.props.dropdownMenuStyle,
        defaultActiveFirst: defaultActiveFirstOption,
        role: "listbox",
        itemIcon: multiple ? menuItemSelectedIcon : null
      }, activeKeyProps, {
        multiple: multiple
      }, menuProps, {
        selectedKeys: selectedKeys,
        prefixCls: prefixCls + "-menu"
      }), clonedMenuItems);
    }

    return null;
  };

  _proto.render = function render() {
    var renderMenu = this.renderMenu();
    var prefixCls = this.props.prefixCls;
    return renderMenu ? React.createElement("div", {
      className: prefixCls + "-menu-container",
      onFocus: this.props.onPopupFocus,
      onMouseDown: preventDefaultEvent,
      onScroll: this.props.onPopupScroll
    }, renderMenu) : null;
  };

  return DropdownMenu;
}(React.Component);

_defineProperty(DropdownMenu, "displayName", 'DropdownMenu');

_defineProperty(DropdownMenu, "propTypes", {
  defaultActiveFirstOption: PropTypes.bool,
  value: PropTypes.any,
  dropdownMenuStyle: PropTypes.object,
  multiple: PropTypes.bool,
  onPopupFocus: PropTypes.func,
  onPopupScroll: PropTypes.func,
  onMenuDeSelect: PropTypes.func,
  onMenuSelect: PropTypes.func,
  prefixCls: PropTypes.string,
  menuItems: PropTypes.any,
  inputValue: PropTypes.string,
  visible: PropTypes.bool,
  firstActiveValue: PropTypes.string,
  menuItemSelectedIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
});

export { DropdownMenu as default };