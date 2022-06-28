function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconChevronDown, IconLoading } from '@baidu/one-ui-icon';
import RcTree from 'rc-tree';
import TreeNode from './common/treeNode';

var Tree =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tree, _Component);

  function Tree() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderSwitcherIcon", function (_ref) {
      var isLeaf = _ref.isLeaf,
          loading = _ref.loading;
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          switcherIcon = _this$props.switcherIcon;

      if (loading) {
        return React.createElement(IconLoading, {
          className: prefixCls + "-switcher-loading-icon"
        });
      }

      if (isLeaf) {
        return null;
      }

      var switcherCls = prefixCls + "-switcher-icon";

      if (switcherIcon) {
        var switcherOriginCls = switcherIcon.props && switcherIcon.props.className || '';
        return React.cloneElement(switcherIcon, {
          className: classNames(switcherOriginCls, switcherCls)
        });
      }

      return React.createElement(IconChevronDown, {
        className: switcherCls
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setTreeRef", function (node) {
      _this.treeRef = node;
    });

    return _this;
  }

  var _proto = Tree.prototype;

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var props = this.props;
    var prefixCls = props.prefixCls,
        className = props.className,
        checkable = props.checkable,
        showIcon = props.showIcon,
        size = props.size,
        switcherIcon = props.switcherIcon;
    return React.createElement(RcTree, _extends({
      ref: this.setTreeRef
    }, props, {
      className: classNames(className, (_classNames = {}, _classNames[prefixCls + "-icon-hide"] = !showIcon, _classNames), prefixCls + "-" + size),
      checkable: checkable,
      switcherIcon: switcherIcon && typeof switcherIcon === 'function' ? switcherIcon : function (nodeProps) {
        return _this2.renderSwitcherIcon(nodeProps);
      }
    }), this.props.children);
  };

  return Tree;
}(Component);

_defineProperty(Tree, "TreeNode", TreeNode);

_defineProperty(Tree, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  checkStrictly: PropTypes.bool,
  checkable: PropTypes.bool,
  defaultExpandAll: PropTypes.bool,
  defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
  expandedKeys: PropTypes.arrayOf(PropTypes.string),
  checkedKeys: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.shape({
    checked: PropTypes.arrayOf(PropTypes.string),
    halfChecked: PropTypes.arrayOf(PropTypes.string)
  })]),
  defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  onExpand: PropTypes.func,
  onCheck: PropTypes.func,
  onSelect: PropTypes.func,
  loadData: PropTypes.func,
  style: PropTypes.object,
  filterTreeNode: PropTypes.func,
  children: PropTypes.node,
  switcherIcon: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  size: PropTypes.oneOf(['small', 'medium'])
});

_defineProperty(Tree, "defaultProps", {
  prefixCls: 'new-fc-one-tree',
  checkable: false,
  showIcon: false,
  checkStrictly: false,
  size: 'small'
});

export { Tree as default };