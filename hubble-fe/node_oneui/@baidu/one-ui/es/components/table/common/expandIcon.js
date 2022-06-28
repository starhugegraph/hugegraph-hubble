function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import { IconChevronDown, IconChevronUp } from '@baidu/one-ui-icon';

var ExpandIcon =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ExpandIcon, _Component);

  function ExpandIcon() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ExpandIcon.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !shallowequal(nextProps, this.props);
  };

  _proto.render = function render() {
    var _this$props = this.props,
        expandable = _this$props.expandable,
        prefixCls = _this$props.prefixCls,
        expanded = _this$props.expanded,
        onExpand = _this$props.onExpand,
        needIndentSpaced = _this$props.needIndentSpaced,
        record = _this$props.record;

    if (expandable) {
      var expandClassName = expanded ? 'expanded' : 'collapsed';
      var expandIcon = expanded ? React.createElement(IconChevronUp, null) : React.createElement(IconChevronDown, null);
      return React.createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-" + expandClassName,
        onClick: function onClick(e) {
          return onExpand(record, e);
        }
      }, expandIcon);
    }

    if (needIndentSpaced) {
      return React.createElement("span", {
        className: prefixCls + "-expand-icon " + prefixCls + "-spaced"
      });
    }

    return null;
  };

  return ExpandIcon;
}(Component);

_defineProperty(ExpandIcon, "propTypes", {
  record: PropTypes.object,
  prefixCls: PropTypes.string,
  expandable: PropTypes.any,
  expanded: PropTypes.bool,
  needIndentSpaced: PropTypes.bool,
  onExpand: PropTypes.func
});

export { ExpandIcon as default };