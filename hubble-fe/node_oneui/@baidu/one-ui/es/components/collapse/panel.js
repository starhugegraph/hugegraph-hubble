function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import shallowEqual from 'shallowequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconChevronDown, IconChevronRight } from '@baidu/one-ui-icon';
import Content from './common/content';

var CollapsePanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CollapsePanel, _Component);

  function CollapsePanel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      focused: false
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onItemClick", function () {
      var _this$props = _this.props,
          onItemClick = _this$props.onItemClick,
          panelKey = _this$props.panelKey,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (typeof onItemClick === 'function') {
        onItemClick(panelKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13 || e.key === ' ' || e.which === 32 || e.keyCode === 32) {
        // tab和确认
        _this.onItemClick();

        _this.setState({
          focused: true
        });
      }
    });

    return _this;
  }

  var _proto = CollapsePanel.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  } // 点击事件
  ;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props2 = this.props,
        className = _this$props2.className,
        id = _this$props2.id,
        style = _this$props2.style,
        prefixCls = _this$props2.prefixCls,
        header = _this$props2.header,
        headerClass = _this$props2.headerClass,
        children = _this$props2.children,
        isActive = _this$props2.isActive,
        disabled = _this$props2.disabled,
        destroyNotActivePanel = _this$props2.destroyNotActivePanel,
        accordion = _this$props2.accordion,
        renderDomWhenHide = _this$props2.renderDomWhenHide;
    var headerCls = classNames(prefixCls + "-item-header", (_classNames = {}, _classNames[headerClass] = headerClass, _classNames));
    var itemCls = classNames(prefixCls + "-item", (_classNames2 = {}, _classNames2[prefixCls + "-item-active"] = isActive, _classNames2[prefixCls + "-item-not-active"] = !isActive, _classNames2[prefixCls + "-item-disabled"] = disabled, _classNames2[prefixCls + "-item-focused"] = this.state.focused, _classNames2), className);
    var iconNode = isActive ? React.createElement(IconChevronDown, null) : React.createElement(IconChevronRight, null);
    return React.createElement("div", {
      className: itemCls,
      style: style,
      id: id
    }, React.createElement("div", {
      className: headerCls,
      onClick: this.onItemClick,
      onKeyPress: this.onKeyPress,
      "data-type": accordion ? 'accordion' : 'normal',
      tabIndex: id,
      onBlur: this.onBlur
    }, iconNode, header || null), React.createElement(Content, {
      prefixCls: prefixCls,
      isActive: isActive,
      destroyNotActivePanel: destroyNotActivePanel,
      renderDomWhenHide: renderDomWhenHide
    }, children));
  };

  return CollapsePanel;
}(Component);

_defineProperty(CollapsePanel, "propTypes", {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
  isActive: PropTypes.bool,
  onItemClick: PropTypes.func,
  headerClass: PropTypes.string,
  style: PropTypes.object,
  panelKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  destroyNotActivePanel: PropTypes.bool,
  accordion: PropTypes.bool,
  // 隐藏的时候渲染dom
  renderDomWhenHide: PropTypes.bool
});

_defineProperty(CollapsePanel, "defaultProps", {
  isActive: false,
  onItemClick: function onItemClick() {},
  headerClass: '',
  prefixCls: 'new-fc-one-collapse',
  disabled: false,
  style: {},
  destroyNotActivePanel: false,
  accordion: false,
  renderDomWhenHide: false
});

export { CollapsePanel as default };