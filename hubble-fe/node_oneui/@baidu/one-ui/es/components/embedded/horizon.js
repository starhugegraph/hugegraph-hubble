function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';

var Horizon =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Horizon, _PureComponent);

  function Horizon(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClose", function () {
      _this.setState({
        visible: false
      });

      _this.props.onClose();
    });

    _this.state = {
      visible: true
    };
    return _this;
  }

  var _proto = Horizon.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        closable = _this$props.closable,
        children = _this$props.children;
    var visible = this.state.visible;

    if ('visible' in this.props) {
      visible = this.props.visible;
    }

    if (!visible) {
      return null;
    }

    return React.createElement("div", {
      className: prefixCls + " " + className
    }, closable ? React.createElement("span", {
      className: prefixCls + "-close",
      onClick: this.onClose
    }, React.createElement(Icon, {
      type: "close"
    })) : null, React.createElement("div", {
      className: prefixCls + "-body"
    }, children));
  };

  return Horizon;
}(PureComponent);

_defineProperty(Horizon, "propTypes", {
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool
});

_defineProperty(Horizon, "defaultProps", {
  closable: true,
  prefixCls: 'new-fc-one-embedded-horizon',
  className: ''
});

export { Horizon as default };