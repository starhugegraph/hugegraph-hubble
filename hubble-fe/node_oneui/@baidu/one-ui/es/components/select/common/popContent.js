function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';

var Content =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Content, _React$Component);

  function Content() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Content.prototype;

  _proto.componentDidUpdate = function componentDidUpdate() {
    var trigger = this.props.trigger;

    if (trigger) {
      trigger.forcePopupAlign();
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        overlay = _this$props.overlay,
        prefixCls = _this$props.prefixCls,
        id = _this$props.id;
    return React.createElement("div", {
      className: prefixCls + "-inner",
      id: id
    }, typeof overlay === 'function' ? overlay() : overlay);
  };

  return Content;
}(React.Component);

_defineProperty(Content, "propTypes", {
  prefixCls: PropTypes.string,
  overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  id: PropTypes.string,
  trigger: PropTypes.any
});

export { Content as default };