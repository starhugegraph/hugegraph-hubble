function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isFragment } from 'react-is';
import shallowEqual from 'shallowequal';
import { polyfill } from 'react-lifecycles-compat';

var formatActiveKeyArray = function formatActiveKeyArray(activeKey) {
  var currentKey = activeKey;

  if (!Array.isArray(currentKey)) {
    currentKey = currentKey ? [currentKey] : [];
  }

  return currentKey;
};

var Collapse =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Collapse, _Component);

  function Collapse(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickItem", function (key) {
      // 判断是否是手风琴折叠面板
      var activeKey = _this.state.activeKey;
      var isAccordion = _this.props.accordion;

      if (isAccordion) {
        // 选择已打开的面板 => 关闭，选择其他 => 打开面板，关闭已选择的，是全局永远只有一个打开面板
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [].concat(activeKey);
        var index = activeKey.indexOf(key);
        var isActive = index > -1;

        if (isActive) {
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }

      if (!('activeKey' in _this.props)) {
        _this.setState({
          activeKey: activeKey
        });
      }

      _this.props.onChange(isAccordion ? activeKey[0] : activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPanel", function () {
      var activeKey = _this.state.activeKey;
      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          accordion = _this$props.accordion,
          destroyNotActivePanel = _this$props.destroyNotActivePanel;
      var childList = isFragment(children) ? children.props.children : children;
      var newChildren = Children.map(childList, function (child, index) {
        if (!child) {
          return null;
        } // 如果没有key，就用index索引做key


        var key = child.key || String(index);
        var _child$props = child.props,
            header = _child$props.header,
            headerClass = _child$props.headerClass,
            disabled = _child$props.disabled;
        var isActive = false;

        if (accordion) {
          isActive = activeKey[0] === key;
        } else {
          isActive = activeKey.indexOf(key) > -1;
        }

        var props = {
          key: key,
          panelKey: key,
          header: header,
          prefixCls: prefixCls,
          children: child.props.children,
          onItemClick: _this.onClickItem,
          headerClass: headerClass,
          isActive: isActive,
          destroyNotActivePanel: destroyNotActivePanel,
          accordion: accordion,
          disabled: _this.props.disabled || disabled,
          id: key
        };
        return React.cloneElement(child, props);
      });

      if (isFragment(children)) {
        return React.createElement(React.Fragment, null, newChildren);
      }

      return newChildren;
    });

    var _activeKey = _props.activeKey,
        defaultActiveKey = _props.defaultActiveKey;
    var currentKey = defaultActiveKey; // 处理受控非受控情况

    if ('activeKey' in _props) {
      currentKey = _activeKey;
    }

    _this.state = {
      activeKey: formatActiveKeyArray(currentKey)
    };
    return _this;
  }

  Collapse.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    // 判断受控情况
    if ('activeKey' in nextProps) {
      return {
        activeKey: formatActiveKeyArray(nextProps.activeKey)
      };
    }

    return null;
  };

  var _proto = Collapse.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        style = _this$props2.style,
        size = _this$props2.size;
    var collapseClassName = classNames(prefixCls, className, [prefixCls + "-" + size]);
    return React.createElement("div", {
      className: collapseClassName,
      style: style
    }, this.renderPanel());
  };

  return Collapse;
}(Component);

_defineProperty(Collapse, "propTypes", {
  size: PropTypes.oneOf(['small', 'medium']),
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  defaultActiveKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onChange: PropTypes.func,
  accordion: PropTypes.bool,
  destroyNotActivePanel: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number])
});

_defineProperty(Collapse, "defaultProps", {
  prefixCls: 'new-fc-one-collapse',
  className: '',
  style: {},
  size: 'small',
  onChange: function onChange() {}
});

polyfill(Collapse);
export default Collapse;