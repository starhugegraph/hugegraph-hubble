function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getActiveIndex } from '../../../core/tabsTools';

var ScrollContainer =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ScrollContainer, _PureComponent);

  function ScrollContainer() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = ScrollContainer.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        content = _this$props.content,
        prefixCls = _this$props.prefixCls,
        title = _this$props.title,
        activeKey = _this$props.activeKey;
    var activeIndex = getActiveIndex(title, activeKey);
    var style = activeIndex ? {
      marginLeft: "-" + activeIndex * 100 + "%"
    } : {};
    return React.createElement("div", {
      className: prefixCls + "-content",
      style: style
    }, content);
  };

  return ScrollContainer;
}(PureComponent);

_defineProperty(ScrollContainer, "propTypes", {
  content: PropTypes.node.isRequired,
  prefixCls: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired
});

export { ScrollContainer as default };