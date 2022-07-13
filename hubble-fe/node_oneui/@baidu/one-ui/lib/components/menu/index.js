"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rcMenu = _interopRequireWildcard(require("rc-menu"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _warning = _interopRequireDefault(require("warning"));

var _openAnimation = _interopRequireDefault(require("../../core/openAnimation"));

var _menuItem = _interopRequireDefault(require("./menuItem"));

var _subMenu = _interopRequireDefault(require("./subMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var horizontalMap = {
  1: 'large',
  2: 'medium',
  3: 'small'
};

var Menu =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Menu, _PureComponent);

  function Menu(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "getChildContext", function () {
      return {
        inlineCollapsed: _this.getInlineCollapsed()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps, nextContext) {
      if (_this.props.mode === 'inline' && nextProps.mode !== 'inline') {
        _this.switchModeFromInline = true;
      }

      if ('openKeys' in nextProps) {
        _this.setState({
          openKeys: nextProps.openKeys
        });

        return;
      }

      if (nextProps.inlineCollapsed && !_this.props.inlineCollapsed || nextContext.siderCollapsed && !_this.context.siderCollapsed) {
        _this.switchModeFromInline = !!_this.state.openKeys.length;
        _this.inlineOpenKeys = _this.state.openKeys;

        _this.setState({
          openKeys: []
        });
      }

      if (!nextProps.inlineCollapsed && _this.props.inlineCollapsed || !nextContext.siderCollapsed && _this.context.siderCollapsed) {
        _this.setState({
          openKeys: _this.inlineOpenKeys
        });

        _this.inlineOpenKeys = [];
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setOpenKeys", function (openKeys) {
      if (!('openKeys' in _this.props)) {
        _this.setState({
          openKeys: openKeys
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getRealMenuMode", function () {
      var inlineCollapsed = _this.getInlineCollapsed();

      if (_this.switchModeFromInline && inlineCollapsed) {
        return 'inline';
      }

      var mode = _this.props.mode;
      return inlineCollapsed ? 'vertical' : mode;
    });

    _defineProperty(_assertThisInitialized(_this), "getInlineCollapsed", function () {
      var inlineCollapsed = _this.props.inlineCollapsed;

      if (_this.context.siderCollapsed !== undefined) {
        return _this.context.siderCollapsed;
      }

      return inlineCollapsed;
    });

    _defineProperty(_assertThisInitialized(_this), "handleOpenChange", function (openKeys) {
      _this.setOpenKeys(openKeys);

      var onOpenChange = _this.props.onOpenChange;

      if (onOpenChange) {
        onOpenChange(openKeys);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      _this.handleOpenChange([]);

      var onClick = _this.props.onClick;

      if (onClick) {
        onClick(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "inlineOpenKeys", []);

    (0, _warning["default"])(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');

    var _openKeys;

    if ('defaultOpenKeys' in props) {
      _openKeys = props.defaultOpenKeys;
    } else if ('openKeys' in props) {
      _openKeys = props.openKeys;
    }

    _this.state = {
      openKeys: _openKeys || []
    };
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.getMenuOpenAnimation = function getMenuOpenAnimation(menuMode) {
    var _this2 = this;

    var _this$props = this.props,
        openAnimation = _this$props.openAnimation,
        openTransitionName = _this$props.openTransitionName;
    var menuOpenAnimation = openAnimation || openTransitionName;

    if (openAnimation === undefined && openTransitionName === undefined) {
      switch (menuMode) {
        case 'horizontal':
          menuOpenAnimation = 'slide-up';
          break;

        case 'vertical':
          // When mode switch from inline
          // submenu should hide without animation
          if (this.switchModeFromInline) {
            menuOpenAnimation = '';
            this.switchModeFromInline = false;
          } else {
            menuOpenAnimation = 'zoom-big';
          }

          break;

        case 'inline':
          menuOpenAnimation = _extends({}, _openAnimation["default"], {
            leave: function leave(node, done) {
              return _openAnimation["default"].leave(node, function () {
                // Make sure inline menu leave animation finished before mode is switched
                _this2.switchModeFromInline = false;

                _this2.setState({});

                done();
              });
            }
          });
          break;

        default:
      }
    }

    return menuOpenAnimation;
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        mode = _this$props2.mode,
        style = _this$props2.style,
        needBorder = _this$props2.needBorder,
        arrowPosition = _this$props2.arrowPosition,
        size = _this$props2.size;
    var menuLevel = this.props.menuLevel;

    if (+menuLevel === 4) {
      // 向下兼容，3.0版本去掉四级了
      menuLevel = 3;
    }

    var menuMode = this.getRealMenuMode();
    var menuOpenAnimation = this.getMenuOpenAnimation(menuMode);
    var menuClassName = (0, _classnames["default"])(prefixCls + "-light", (_classNames = {}, _classNames[prefixCls + "-inline-collapsed"] = this.getInlineCollapsed(), _classNames[prefixCls + "-container-border"] = mode === 'inline' && needBorder, _classNames[prefixCls + "-container-arrow-left"] = arrowPosition === 'left', _classNames));
    var currentSize = size || horizontalMap[menuLevel] || 'medium';
    var menuBoxCls = (0, _classnames["default"])(prefixCls + "-" + mode + "-box", prefixCls + "-" + mode + "-" + currentSize, className);
    var menuProps = {
      openKeys: this.state.openKeys,
      onOpenChange: this.handleOpenChange,
      className: menuClassName,
      mode: menuMode,
      inlineIndent: 16
    };

    if (menuMode !== 'inline') {
      menuProps.onClick = this.handleClick;
      menuProps.openTransitionName = menuOpenAnimation;
    } else {
      menuProps.openAnimation = menuOpenAnimation;
    }

    var RcMenuProps = _extends({}, this.props);

    delete RcMenuProps.menuLevel;
    delete RcMenuProps.needBorder;
    delete RcMenuProps.arrowPosition;
    return _react["default"].createElement("div", {
      className: menuBoxCls,
      style: style
    }, _react["default"].createElement(_rcMenu["default"], _extends({}, RcMenuProps, menuProps)));
  };

  return Menu;
}(_react.PureComponent);

exports["default"] = Menu;

_defineProperty(Menu, "Divider", _rcMenu.Divider);

_defineProperty(Menu, "Item", _menuItem["default"]);

_defineProperty(Menu, "SubMenu", _subMenu["default"]);

_defineProperty(Menu, "ItemGroup", _rcMenu.ItemGroup);

_defineProperty(Menu, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /**
   * 菜单的模式：垂直弹出、水平内嵌、垂直内嵌
   */
  mode: _propTypes["default"].oneOf(['vertical', 'horizontal', 'inline']),

  /**
   * 只有mode为inline才使用
   */
  inlineCollapsed: _propTypes["default"].bool,

  /**
   * 需要展开的key值
   */
  openKeys: _propTypes["default"].array,

  /**
   * 默认展开的key值
   */
  defaultOpenKeys: _propTypes["default"].array,
  openAnimation: _propTypes["default"].oneOf([_propTypes["default"].string, _propTypes["default"].object]),
  openTransitionName: _propTypes["default"].oneOf([_propTypes["default"].string, _propTypes["default"].object]),

  /**
   * SubMenu 展开/关闭的回调
   */
  onOpenChange: _propTypes["default"].func,

  /**
   * 点击 MenuItem 调用此函数
   */
  onClick: _propTypes["default"].func,

  /** 导航层级 */
  menuLevel: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  style: _propTypes["default"].object,
  popupClassName: _propTypes["default"].string,

  /** inline是否需要border,默认false */
  needBorder: _propTypes["default"].bool,

  /** 菜单item剪头位置， 默认右边，支持左边， 传入left right */
  arrowPosition: _propTypes["default"].string,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large'])
});

_defineProperty(Menu, "contextTypes", {
  siderCollapsed: _propTypes["default"].bool
});

_defineProperty(Menu, "childContextTypes", {
  inlineCollapsed: _propTypes["default"].bool
});

_defineProperty(Menu, "defaultProps", {
  prefixCls: 'new-fc-one-menu',
  className: '',
  mode: 'vertical',
  menuLevel: 2,
  // 默认是二级导航
  needBorder: false,
  popupClassName: '',
  style: {},
  arrowPosition: 'right'
});

module.exports = exports.default;