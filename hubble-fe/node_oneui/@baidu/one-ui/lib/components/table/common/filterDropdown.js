"use strict";

exports.__esModule = true;
exports["default"] = exports.FilterDropdownMenuWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _oneUiIcon = require("@baidu/one-ui-icon");

var _domClosest = _interopRequireDefault(require("dom-closest"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dropdown = _interopRequireDefault(require("../../dropdown"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _radio = _interopRequireDefault(require("../../radio"));

var _button = _interopRequireDefault(require("../../button"));

var _menu = _interopRequireDefault(require("../../menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SubMenu = _menu["default"].SubMenu;
var MenuItem = _menu["default"].Item;

var FilterDropdownMenuWrapper = function FilterDropdownMenuWrapper(props) {
  return _react["default"].createElement("div", {
    className: props.className,
    onClick: props.onClick
  }, props.children);
};

exports.FilterDropdownMenuWrapper = FilterDropdownMenuWrapper;
FilterDropdownMenuWrapper.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  children: _propTypes["default"].node
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
      var rootNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var filterBelongToScrollBody = !!(0, _domClosest["default"])(rootNode, '.new-fc-one-table-scroll');

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
      return filterIcon ? _react["default"].cloneElement(filterIcon, {
        title: locale.filterTitle,
        className: (0, _classnames["default"])(filterIcon.className, (_classNames = {}, _classNames[prefixCls + "-icon"] = true, _classNames))
      }) : _react["default"].createElement(_oneUiIcon.IconFilter, {
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
        return _react["default"].createElement(SubMenu, {
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
    var input = multiple ? _react["default"].createElement(_checkbox["default"], {
      checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0
    }) : _react["default"].createElement(_radio["default"], {
      checked: this.state.selectedKeys.indexOf(item.value.toString()) >= 0
    });
    return _react["default"].createElement(MenuItem, {
      key: item.value
    }, input, _react["default"].createElement("span", null, item.text));
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
    var dropdownMenuClass = (0, _classnames["default"])((_classNames2 = {}, _classNames2[dropdownPrefixCls + "-menu-without-submenu"] = !this.hasSubMenu(), _classNames2));
    var menus = column.filterDropdown ? _react["default"].createElement(FilterDropdownMenuWrapper, null, column.filterDropdown) : _react["default"].createElement(FilterDropdownMenuWrapper, {
      className: prefixCls + "-dropdown"
    }, _react["default"].createElement(_menu["default"], {
      multiple: multiple,
      onClick: this.handleMenuItemClick,
      prefixCls: dropdownPrefixCls + "-menu",
      className: dropdownMenuClass,
      onSelect: this.setSelectedKeys,
      onDeselect: this.setSelectedKeys,
      selectedKeys: this.state.selectedKeys
    }, this.renderMenus(column.filters)), !filterWithoutConfirm ? _react["default"].createElement("div", {
      className: prefixCls + "-dropdown-btns"
    }, _react["default"].createElement(_button["default"], {
      className: prefixCls + "-dropdown-link " + prefixCls + "-dropdown-link-confirm",
      onClick: this.handleConfirm,
      type: "primary"
    }, locale.filterConfirm), _react["default"].createElement(_button["default"], {
      className: prefixCls + "-dropdown-link " + prefixCls + "-dropdown-link-cancel",
      onClick: this.handleCancel,
      type: "normal"
    }, locale.filterCancel)) : null);
    return _react["default"].createElement(_dropdown["default"], {
      trigger: ['click'],
      overlay: menus,
      visible: this.neverShown ? false : this.state.visible,
      onVisibleChange: this.onVisibleChange,
      getPopupContainer: getPopupContainer,
      overlayClassName: prefixCls + "-dropdown"
    }, this.renderFilterIcon());
  };

  return FilterMenu;
}(_react.PureComponent);

_defineProperty(FilterMenu, "propTypes", {
  locale: _propTypes["default"].any,
  selectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  column: _propTypes["default"].shape({
    filterMultiple: _propTypes["default"].bool,
    filterDropdown: _propTypes["default"].node,
    filters: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      text: _propTypes["default"].string,
      value: _propTypes["default"].string,
      children: _propTypes["default"].any
    })),
    filterDropdownVisible: _propTypes["default"].bool,
    onFilterDropdownVisibleChange: _propTypes["default"].func,
    fixed: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string]),
    filterIcon: _propTypes["default"].node,
    filterWithoutConfirm: _propTypes["default"].bool
  }),

  /* eslint-disable react/no-unused-prop-types */
  handleFilter: _propTypes["default"].func,
  confirmFilter: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  dropdownPrefixCls: _propTypes["default"].string,
  getPopupContainer: _propTypes["default"].func
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

  if ('selectedKeys' in nextProps && !(0, _shallowequal["default"])(prevProps.selectedKeys, nextProps.selectedKeys)) {
    newState.selectedKeys = nextProps.selectedKeys;
  }

  if ('filterDropdownVisible' in column) {
    newState.visible = column.filterDropdownVisible;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(FilterMenu);
var _default = FilterMenu;
exports["default"] = _default;