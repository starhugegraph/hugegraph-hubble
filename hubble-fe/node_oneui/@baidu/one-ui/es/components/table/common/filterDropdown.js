function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';
import { IconFilter } from '@baidu/one-ui-icon';
import closest from 'dom-closest';
import classNames from 'classnames';
import Dropdown from '../../dropdown';
import Checkbox from '../../checkbox';
import Radio from '../../radio';
import Button from '../../button';
import Menu from '../../menu';
var SubMenu = Menu.SubMenu;
var MenuItem = Menu.Item;
export var FilterDropdownMenuWrapper = function FilterDropdownMenuWrapper(props) {
  return React.createElement("div", {
    className: props.className,
    onClick: props.onClick
  }, props.children);
};
FilterDropdownMenuWrapper.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

var FilterMenu =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FilterMenu, _PureComponent);

  function FilterMenu(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var column = _this.props.column;

      _this.setNeverShown(column);
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      var column = _this.props.column;

      _this.setNeverShown(column);
    });

    _defineProperty(_assertThisInitialized(_this), "onVisibleChange", function (visible) {
      _this.setVisible(visible);

      if (!visible) {
        _this.confirmFilter();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setNeverShown", function (column) {
      var rootNode = ReactDOM.findDOMNode(_assertThisInitialized(_this));
      var filterBelongToScrollBody = !!closest(rootNode, '.new-fc-one-table-scroll');

      if (filterBelongToScrollBody) {
        _this.neverShown = !!column.fixed;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectedKeys", function (_ref) {
      var selectedKeys = _ref.selectedKeys;
      var column = _this.props.column;

      _this.setState({
        selectedKeys: selectedKeys
      });

      if (column.filterWithoutConfirm) {
        _this.props.confirmFilter(_this.props.column, selectedKeys);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleConfirm", function () {
      _this.setVisible(false);

      _this.confirmFilter();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCancel", function () {
      _this.setVisible(false);
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuItemClick", function (info) {
      if (info.keyPath.length <= 1) {
        return;
      }

      var updater = function updater(state) {
        var keyPathOfSelectedItem = _extends({}, state.keyPathOfSelectedItem);

        if (state.selectedKeys.indexOf(info.key) >= 0) {
          // deselect SubMenu child
          delete keyPathOfSelectedItem[info.key];
        } else {
          // select SubMenu child
          keyPathOfSelectedItem[info.key] = info.keyPath;
        }

        return {
          keyPathOfSelectedItem: keyPathOfSelectedItem
        };
      };

      _this.setState(updater);
    });

    _defineProperty(_assertThisInitialized(_this), "renderFilterIcon", function () {
      var _classNames;

      var _this$props = _this.props,
          column = _this$props.column,
          locale = _this$props.locale,
          prefixCls = _this$props.prefixCls;
      var filterIcon = column.filterIcon;
      var dropdownSelectedClass = _this.props.selectedKeys.length > 0 ? prefixCls + "-selected" : '';
      return filterIcon ? React.cloneElement(filterIcon, {
        title: locale.filterTitle,
        className: classNames(filterIcon.className, (_classNames = {}, _classNames[prefixCls + "-icon"] = true, _classNames))
      }) : React.createElement(IconFilter, {
        title: locale.filterTitle,
        className: dropdownSelectedClass
      });
    });

    var _visible = 'filterDropdownVisible' in props.column ? props.column.filterDropdownVisible : false;

    _this.state = {
      selectedKeys: props.selectedKeys,
      keyPathOfSelectedItem: {},
      // 记录所有有选中子菜单的祖先菜单
      visible: _visible,
      prevProps: props
    };
    return _this;
  }

  var _proto = FilterMenu.prototype;

  _proto.setVisible = function setVisible(visible) {
    var column = this.props.column;

    if (!('filterDropdownVisible' in column)) {
      this.setState({
        visible: visible
      });
    }

    if (column.onFilterDropdownVisibleChange) {
      column.onFilterDropdownVisibleChange(visible);
    }
  };

  _proto.confirmFilter = function confirmFilter() {
    if (this.state.selectedKeys !== this.props.selectedKeys) {
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    }
  };

  _proto.hasSubMenu = function hasSubMenu() {
    var _this$props$column$fi = this.props.column.filters,
        filters = _this$props$column$fi === void 0 ? [] : _this$props$column$fi;
    return filters.some(function (item) {
      return !!(item.children && item.children.length > 0);
    });
  };

  _proto.renderMenus = function renderMenus(items) {
    var _this2 = this;

    return items.map(function (item) {
      if (item.children && item.children.length > 0) {
        var keyPathOfSelectedItem = _this2.state.keyPathOfSelectedItem;
        var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
          return keyPathOfSelectedItem[key].indexOf(item.value) >= 0;
        });
        var subMenuCls = containSelected ? _this2.props.dropdownPrefixCls + "-submenu-contain-selected" : '';
        return React.createElement(SubMenu, {
          title: item.text,
          className: subMenuCls,
          key: item.value.toString()
        }, _this2.renderMenus(item.children));
      }

      return _this2.renderMenuItem(item);
    });
  };

  _proto.renderMenuItem = function renderMenuItem(item) {
    var column = this.props.column;
    var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    var input = multiple ? React.createElement(Checkbox, {
      checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0
    }) : React.createElement(Radio, {
      checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0
    });
    return React.createElement(MenuItem, {
      key: item.value
    }, input, React.createElement("span", null, item.text));
  };

  _proto.render = function render() {
    var _classNames2;

    var _this$props2 = this.props,
        column = _this$props2.column,
        locale = _this$props2.locale,
        prefixCls = _this$props2.prefixCls,
        dropdownPrefixCls = _this$props2.dropdownPrefixCls,
        getPopupContainer = _this$props2.getPopupContainer; // default multiple selection in filter dropdown

    var multiple = 'filterMultiple' in column ? column.filterMultiple : true;
    var filterWithoutConfirm = 'filterWithoutConfirm' in column ? column.filterWithoutConfirm : false;
    var dropdownMenuClass = classNames((_classNames2 = {}, _classNames2[dropdownPrefixCls + "-menu-without-submenu"] = !this.hasSubMenu(), _classNames2));
    var menus = column.filterDropdown ? React.createElement(FilterDropdownMenuWrapper, null, column.filterDropdown) : React.createElement(FilterDropdownMenuWrapper, {
      className: prefixCls + "-dropdown"
    }, React.createElement(Menu, {
      multiple: multiple,
      onClick: this.handleMenuItemClick,
      prefixCls: dropdownPrefixCls + "-menu",
      className: dropdownMenuClass,
      onSelect: this.setSelectedKeys,
      onDeselect: this.setSelectedKeys,
      selectedKeys: this.state.selectedKeys
    }, this.renderMenus(column.filters)), !filterWithoutConfirm ? React.createElement("div", {
      className: prefixCls + "-dropdown-btns"
    }, React.createElement(Button, {
      className: prefixCls + "-dropdown-link " + prefixCls + "-dropdown-link-confirm",
      onClick: this.handleConfirm,
      type: "primary"
    }, locale.filterConfirm), React.createElement(Button, {
      className: prefixCls + "-dropdown-link " + prefixCls + "-dropdown-link-cancel",
      onClick: this.handleCancel,
      type: "normal"
    }, locale.filterCancel)) : null);
    return React.createElement(Dropdown, {
      trigger: ['click'],
      overlay: menus,
      visible: this.neverShown ? false : this.state.visible,
      onVisibleChange: this.onVisibleChange,
      getPopupContainer: getPopupContainer,
      overlayClassName: prefixCls + "-dropdown"
    }, this.renderFilterIcon());
  };

  return FilterMenu;
}(PureComponent);

_defineProperty(FilterMenu, "propTypes", {
  locale: PropTypes.any,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  column: PropTypes.shape({
    filterMultiple: PropTypes.bool,
    filterDropdown: PropTypes.node,
    filters: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      children: PropTypes.any
    })),
    filterDropdownVisible: PropTypes.bool,
    onFilterDropdownVisibleChange: PropTypes.func,
    fixed: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    filterIcon: PropTypes.node,
    filterWithoutConfirm: PropTypes.bool
  }),

  /* eslint-disable react/no-unused-prop-types */
  handleFilter: PropTypes.func,
  confirmFilter: PropTypes.func,
  prefixCls: PropTypes.string,
  dropdownPrefixCls: PropTypes.string,
  getPopupContainer: PropTypes.func
});

_defineProperty(FilterMenu, "defaultProps", {
  handleFilter: function handleFilter() {},
  column: {}
});

_defineProperty(FilterMenu, "getDerivedStateFromProps", function (nextProps, prevState) {
  var column = nextProps.column;
  var newState = {
    prevProps: nextProps
  };
  var prevProps = prevState.prevProps;

  if ('selectedKeys' in nextProps && !shallowequal(prevProps.selectedKeys, nextProps.selectedKeys)) {
    newState.selectedKeys = nextProps.selectedKeys;
  }

  if ('filterDropdownVisible' in column) {
    newState.visible = column.filterDropdownVisible;
  }

  return newState;
});

polyfill(FilterMenu);
export default FilterMenu;