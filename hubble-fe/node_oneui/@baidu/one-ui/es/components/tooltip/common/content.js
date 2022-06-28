function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

var Content =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Content, _PureComponent);

  function Content() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Content.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        overlay = _this$props.overlay,
        prefixCls = _this$props.prefixCls;
    return React.createElement("div", {
      className: prefixCls + "-inner",
      role: "tooltip"
    }, typeof overlay === 'function' ? overlay() : overlay);
  };

  return Content;
}(PureComponent);

_defineProperty(Content, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  overlay: PropTypes.node
});

export { Content as default };