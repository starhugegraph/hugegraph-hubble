function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '../../button';

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
        disabled = _this$props.disabled,
        maxSize = _this$props.maxSize,
        helperTextPostion = _this$props.helperTextPostion;
    var buttonClassName = prefixCls + "-anchor-file-button";
    var buttonProps = {
      className: buttonClassName,
      onClick: onClick,
      loading: loading,
      disabled: disabled,
      icon: 'upload'
    };
    var fileAnchorClassName = classNames(prefixCls + "-anchor-file-container", (_classNames = {}, _classNames[prefixCls + "-anchor-file-container-" + helperTextPostion] = helperTextPostion === 'right' || helperTextPostion === 'bottom', _classNames));
    return React.createElement("span", {
      className: fileAnchorClassName
    }, React.createElement(Button, buttonProps, "\u6587\u4EF6\u4E0A\u4F20"), maxSize ? React.createElement("span", {
      className: prefixCls + "-helper-text"
    }, "\u6587\u4EF6\u5927\u5C0F\u4E0D\u8D85\u8FC7", maxSize / (1024 * 1024), "MB") : null);
  };

  return UploaderAnchor;
}(PureComponent);

_defineProperty(UploaderAnchor, "propTypes", {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  prefixCls: PropTypes.string,
  disabled: PropTypes.bool,
  maxSize: PropTypes.number,
  helperTextPostion: PropTypes.string.isRequired
});

export { UploaderAnchor as default };