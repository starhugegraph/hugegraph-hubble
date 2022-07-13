function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import { polyfill } from 'react-lifecycles-compat';
import LineNode from './common/lineNode';
import CardNode from './common/cardNode';
import ScrollBar from './common/scrollBar';
import ScrollContainer from './common/scrollContainer';

var Tabs =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tabs, _PureComponent);

  function Tabs(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClick", function (key, props) {
      if (props.disabled) {
        return;
      }

      if (!('activeKey' in _this.props)) {
        // 非受控
        _this.setState({
          activeKey: key
        });
      }

      _this.props.onTabClick(key);

      _this.onChange(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (key, props, e) {
      if (props.disabled) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      _this.props.onDelete(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onAdd", function () {
      _this.props.onAdd(_this.state.activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (currentKey) {
      if (_this.state.activeKey !== currentKey) {
        _this.props.onChange(currentKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      var newTitleChildren = [];
      var newPaneChildren = [];
      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          size = _this$props.size,
          type = _this$props.type;
      var activeKey = _this.state.activeKey;
      React.Children.forEach(children, function (child) {
        var _classNames;

        var _child$props = child.props,
            props = _child$props === void 0 ? {} : _child$props,
            key = child.key;

        var nodeProps = _extends({}, props, {
          key: key,
          currentKey: key,
          activeKey: activeKey,
          prefixCls: prefixCls,
          size: size,
          onClick: partial(_this.onClick, key, props),
          onDelete: partial(_this.onDelete, key, props)
        });

        var LineNodeDom = type === 'line' ? React.createElement(LineNode, nodeProps) : React.createElement(CardNode, nodeProps);
        newTitleChildren.push(LineNodeDom);
        var paneClassName = classNames(prefixCls + "-tab-pane", (_classNames = {}, _classNames[prefixCls + "-tab-pane-is-active"] = activeKey === key, _classNames[prefixCls + "-tab-pane-is-inactive"] = activeKey !== key, _classNames));
        newPaneChildren.push(React.createElement("div", {
          key: key,
          className: paneClassName
        }, child));
      });
      return {
        newTitleChildren: newTitleChildren,
        newPaneChildren: newPaneChildren
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollBarRef", function (ref) {
      _this.scrollBarRef = ref;
    });

    var _activeKey = _props.activeKey || _props.defaultActiveKey || null;

    _this.state = {
      activeKey: _activeKey
    };
    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        size = _this$props2.size,
        className = _this$props2.className,
        type = _this$props2.type,
        showAdd = _this$props2.showAdd,
        showAddDisabled = _this$props2.showAddDisabled,
        onNextClick = _this$props2.onNextClick,
        onPrevClick = _this$props2.onPrevClick,
        addButtonText = _this$props2.addButtonText;
    var activeKey = this.state.activeKey;
    var tabsClassNames = classNames(prefixCls, prefixCls + "-" + size, prefixCls + "-" + type, className);

    var _this$renderChildren = this.renderChildren(),
        newTitleChildren = _this$renderChildren.newTitleChildren,
        newPaneChildren = _this$renderChildren.newPaneChildren;

    return React.createElement("div", {
      className: tabsClassNames
    }, React.createElement(ScrollBar, {
      content: newTitleChildren,
      prefixCls: prefixCls,
      showAdd: showAdd,
      type: type,
      onAdd: this.onAdd,
      activeKey: activeKey,
      showAddDisabled: showAddDisabled,
      ref: this.getScrollBarRef,
      onNextClick: onNextClick,
      onPrevClick: onPrevClick,
      addButtonText: addButtonText
    }), React.createElement(ScrollContainer, {
      content: newPaneChildren,
      prefixCls: prefixCls,
      title: newTitleChildren,
      activeKey: activeKey
    }));
  };

  return Tabs;
}(PureComponent);

_defineProperty(Tabs, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 开关的样式 */
  size: PropTypes.oneOf(['small', 'medium']),

  /** 自定义类名 */
  className: PropTypes.string,

  /** 当前被选中的key - 受控 */
  activeKey: PropTypes.string,

  /** 默认当前被选中的key - 非受控 */
  defaultActiveKey: PropTypes.string,

  /** 是否展示添加按钮 */
  showAdd: PropTypes.bool,
  type: PropTypes.oneOf(['line', 'card']),
  onChange: PropTypes.func,
  onNextClick: PropTypes.func,
  onPrevClick: PropTypes.func,
  onTabClick: PropTypes.func,
  children: PropTypes.node,
  showAddDisabled: PropTypes.bool,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,

  /** 线性按钮支持自定义添加按钮文案 */
  addButtonText: PropTypes.string
});

_defineProperty(Tabs, "defaultProps", {
  prefixCls: 'new-fc-one-tabs',
  className: '',
  size: 'small',
  showAdd: false,
  type: 'line',
  onTabClick: function onTabClick() {},
  onChange: function onChange() {},
  onDelete: function onDelete() {},
  onAdd: function onAdd() {},
  showAddDisabled: false,
  addButtonText: '添加标签'
});

_defineProperty(Tabs, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {};

  if ('activeKey' in nextProps && nextProps.activeKey !== prevState.activeKey) {
    newState.activeKey = nextProps.activeKey;
  }

  return newState;
});

polyfill(Tabs);
export default Tabs;