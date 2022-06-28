function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconImageAdd } from '@baidu/one-ui-icon';
import Loading from '../../loading';

var noop = function noop() {};

var UploaderAnchor =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(UploaderAnchor, _PureComponent);

  function UploaderAnchor() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = UploaderAnchor.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        onClick = _this$props.onClick,
        loading = _this$props.loading,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled;
    var buttonClassName = classNames(prefixCls + "-anchor-image-button", (_classNames = {}, _classNames[prefixCls + "-anchor-image-button-loading"] = loading, _classNames[prefixCls + "-anchor-image-button-disabled"] = disabled, _classNames));
    var buttonProps = {
      className: buttonClassName,
      onClick: disabled || loading ? noop : onClick
    };
    return React.createElement("div", buttonProps, loading ? React.createElement(Loading, {
      type: "strong"
    }) : React.createElement(IconImageAdd, null));
  };

  return UploaderAnchor;
}(PureComponent);

_defineProperty(UploaderAnchor, "propTypes", {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool
});

export { UploaderAnchor as default };