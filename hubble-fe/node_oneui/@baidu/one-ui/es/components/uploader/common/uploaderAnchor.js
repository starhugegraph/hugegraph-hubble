function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ImageAnchor from './imageAnchor';
import FileAnchor from './fileAnchor';

var UploaderAnchor =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(UploaderAnchor, _PureComponent);

  function UploaderAnchor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "inputRef", function (ref) {
      _this.uploadInputRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "onClickAnchor", function () {
      _this.uploadInputRef.value = '';

      _this.uploadInputRef.click();

      _this.props.onClickAnchor();
    });

    return _this;
  }

  var _proto = UploaderAnchor.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled,
        listType = _this$props.listType,
        CustomUploadAnchor = _this$props.CustomUploadAnchor,
        helperTextPostion = _this$props.helperTextPostion,
        inputControlName = _this$props.inputControlName,
        accept = _this$props.accept,
        multiple = _this$props.multiple,
        onChange = _this$props.onChange,
        loading = _this$props.loading,
        maxSize = _this$props.maxSize;
    var uploadAnchorClassName = classNames(prefixCls + "-anchor", (_classNames = {}, _classNames[prefixCls + "-anchor-disabled"] = disabled, _classNames), prefixCls + "-anchor-" + listType);
    var inputClassName = classNames(prefixCls + "-input", (_classNames2 = {}, _classNames2[prefixCls + "-input-disabled"] = disabled, _classNames2));
    var AnchorDom = listType === 'file' ? FileAnchor : ImageAnchor;

    if (CustomUploadAnchor) {
      AnchorDom = CustomUploadAnchor;
    }

    var inputProps = {
      ref: this.inputRef,
      type: 'file',
      name: inputControlName,
      className: inputClassName,
      multiple: multiple,
      onChange: onChange,
      disabled: disabled,
      accept: accept.join(',')
    };

    if (accept.length === 1 && accept[0] === '*') {
      delete inputProps.accept;
    }

    var anchorProps = {
      onClick: this.onClickAnchor,
      loading: loading,
      disabled: disabled,
      prefixCls: prefixCls,
      maxSize: maxSize,
      helperTextPostion: helperTextPostion
    };
    return React.createElement("div", {
      className: uploadAnchorClassName
    }, React.createElement(AnchorDom, anchorProps), React.createElement("input", inputProps));
  };

  return UploaderAnchor;
}(PureComponent);

_defineProperty(UploaderAnchor, "propTypes", {
  accept: PropTypes.array,
  onChange: PropTypes.func,
  inputControlName: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
  CustomUploadAnchor: PropTypes.node,
  listType: PropTypes.string.isRequired,
  prefixCls: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  maxSize: PropTypes.number,
  helperTextPostion: PropTypes.string.isRequired,
  onClickAnchor: PropTypes.func
});

_defineProperty(UploaderAnchor, "defaultProps", {
  onClickAnchor: function onClickAnchor() {}
});

export { UploaderAnchor as default };