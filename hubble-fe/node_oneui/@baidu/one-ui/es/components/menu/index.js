function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import RcMenu, { Divider, ItemGroup } from 'rc-menu';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import animation from '../../core/openAnimation';
import Item from './menuItem';
import SubMenu from './subMenu';
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

    warning(!('inlineCollapsed' in props && props.mode !== 'inline'), '`inlineCollapsed` should only be used when Menu\'s `mode` is inline.');

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
          menuOpenAnimation = _extends({}, animation, {
            leave: function leave(node, done) {
              return animation.leave(node, function () {
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
    var menuClassName = classNames(prefixCls + "-light", (_classNames = {}, _classNames[prefixCls + "-inline-collapsed"] = this.getInlineCollapsed(), _classNames[prefixCls + "-container-border"] = mode === 'inline' && needBorder, _classNames[prefixCls + "-container-arrow-left"] = arrowPosition === 'left', _classNames));
    var currentSize = size || horizontalMap[menuLevel] || 'medium';
    var menuBoxCls = classNames(prefixCls + "-" + mode + "-box", prefixCls + "-" + mode + "-" + currentSize, className);
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
    return React.createElement("div", {
      className: menuBoxCls,
      style: style
    }, React.createElement(RcMenu, _extends({}, RcMenuProps, menuProps)));
  };

  return Menu;
}(PureComponent);

_defineProperty(Menu, "Divider", Divider);

_defineProperty(Menu, "Item", Item);

_defineProperty(Menu, "SubMenu", SubMenu);

_defineProperty(Menu, "ItemGroup", ItemGroup);

_defineProperty(Menu, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 自定义类名 */
  className: PropTypes.string,

  /**
   * 菜单的模式：垂直弹出、水平内嵌、垂直内嵌
   */
  mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),

  /**
   * 只有mode为inline才使用
   */
  inlineCollapsed: PropTypes.bool,

  /**
   * 需要展开的key值
   */
  openKeys: PropTypes.array,

  /**
   * 默认展开的key值
   */
  defaultOpenKeys: PropTypes.array,
  openAnimation: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  openTransitionName: PropTypes.oneOf([PropTypes.string, PropTypes.object]),

  /**
   * SubMenu 展开/关闭的回调
   */
  onOpenChange: PropTypes.func,

  /**
   * 点击 MenuItem 调用此函数
   */
  onClick: PropTypes.func,

  /** 导航层级 */
  menuLevel: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  popupClassName: PropTypes.string,

  /** inline是否需要border,默认false */
  needBorder: PropTypes.bool,

  /** 菜单item剪头位置， 默认右边，支持左边， 传入left right */
  arrowPosition: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
});

_defineProperty(Menu, "contextTypes", {
  siderCollapsed: PropTypes.bool
});

_defineProperty(Menu, "childContextTypes", {
  inlineCollapsed: PropTypes.bool
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

export { Menu as default };