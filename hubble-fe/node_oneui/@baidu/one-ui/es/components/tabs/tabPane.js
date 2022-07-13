function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var TabPane =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TabPane, _PureComponent);

  function TabPane() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = TabPane.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        children = _this$props.children,
        prefixCls = _this$props.prefixCls;
    return React.createElement("div", {
      className: prefixCls + "-tabpane"
    }, children);
  };

  return TabPane;
}(PureComponent);

_defineProperty(TabPane, "propTypes", {
  children: PropTypes.node,
  prefixCls: PropTypes.string
});

_defineProperty(TabPane, "defaultProps", {
  children: null,
  prefixCls: 'new-fc-one-tabs'
});

export { TabPane as default };