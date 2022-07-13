function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import shallowEqual from 'shallowequal';

var Content =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Content, _Component);

  function Content() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Content.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps);
  };

  _proto.render = function render() {
    var _classnames;

    // 判断isItemActive再与避免不用的重复渲染
    var _this$props = this.props,
        renderDomWhenHide = _this$props.renderDomWhenHide,
        isActive = _this$props.isActive,
        prefixCls = _this$props.prefixCls,
        children = _this$props.children,
        destroyNotActivePanel = _this$props.destroyNotActivePanel;
    this.isItemActive = renderDomWhenHide || this.isItemActive || isActive;

    if (!this.isItemActive) {
      return null;
    }

    var contentCls = classnames(prefixCls + "-item-content", (_classnames = {}, _classnames[prefixCls + "-item-content-active"] = isActive, _classnames[prefixCls + "-item-content-not-active"] = !isActive, _classnames));
    var child = !renderDomWhenHide && !isActive && destroyNotActivePanel ? null : React.createElement("div", {
      className: prefixCls + "-content-box"
    }, children);
    return React.createElement("div", {
      className: contentCls
    }, child);
  };

  return Content;
}(Component);

_defineProperty(Content, "propTypes", {
  prefixCls: PropTypes.string,
  isActive: PropTypes.bool,
  children: PropTypes.any,
  destroyNotActivePanel: PropTypes.bool,
  renderDomWhenHide: PropTypes.bool
});

export { Content as default };