"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _rcMenu = _interopRequireDefault(require("rc-menu"));

var _domScrollIntoView = _interopRequireDefault(require("dom-scroll-into-view"));

var _raf = _interopRequireDefault(require("raf"));

var _core = _interopRequireDefault(require("../../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _tools$select = _core["default"].select,
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
      var itemComponent = (0, _reactDom.findDOMNode)(_this.firstActiveItem);
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


      _this.rafInstance = (0, _raf["default"])(function () {
        (0, _domScrollIntoView["default"])(itemComponent, (0, _reactDom.findDOMNode)(_this.menuRef), scrollIntoViewOpts);
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
            return (0, _react.cloneElement)(item, {
              ref: function ref(_ref) {
                _this2.firstActiveItem = _ref;
              }
            });
          }

          return item;
        };

        clonedMenuItems = menuItems.map(function (item) {
          if (item.type.isMenuItemGroup) {
            var children = (0, _toArray["default"])(item.props.children).map(clone);
            return (0, _react.cloneElement)(item, {}, children);
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

      return _react["default"].createElement(_rcMenu["default"], _extends({
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
    return renderMenu ? _react["default"].createElement("div", {
      className: prefixCls + "-menu-container",
      onFocus: this.props.onPopupFocus,
      onMouseDown: preventDefaultEvent,
      onScroll: this.props.onPopupScroll
    }, renderMenu) : null;
  };

  return DropdownMenu;
}(_react["default"].Component);

exports["default"] = DropdownMenu;

_defineProperty(DropdownMenu, "displayName", 'DropdownMenu');

_defineProperty(DropdownMenu, "propTypes", {
  defaultActiveFirstOption: _propTypes["default"].bool,
  value: _propTypes["default"].any,
  dropdownMenuStyle: _propTypes["default"].object,
  multiple: _propTypes["default"].bool,
  onPopupFocus: _propTypes["default"].func,
  onPopupScroll: _propTypes["default"].func,
  onMenuDeSelect: _propTypes["default"].func,
  onMenuSelect: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  menuItems: _propTypes["default"].any,
  inputValue: _propTypes["default"].string,
  visible: _propTypes["default"].bool,
  firstActiveValue: _propTypes["default"].string,
  menuItemSelectedIcon: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].node])
});

module.exports = exports.default;