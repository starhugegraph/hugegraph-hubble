function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import createDOMForm from './common/createDOMForm';
import createFormField from './common/createFormField';
import FormItem, { FIELD_META_PROP, FIELD_DATA_PROP } from './formItem';
import { FormContext } from './context';

var Form =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Form, _PureComponent);

  function Form() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Form.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        className = _this$props.className,
        wrapperCol = _this$props.wrapperCol,
        labelAlign = _this$props.labelAlign,
        labelCol = _this$props.labelCol,
        layout = _this$props.layout,
        colon = _this$props.colon,
        hideRequiredMark = _this$props.hideRequiredMark,
        size = _this$props.size;
    var formClassName = classNames(prefixCls, className, [prefixCls + "-" + layout], (_classNames = {}, _classNames[prefixCls + "-hide-required-mark"] = hideRequiredMark, _classNames), [prefixCls + "-" + size]);
    var formProps = omit(this.props, ['prefixCls', 'className', 'layout', 'form', 'hideRequiredMark', 'wrapperCol', 'labelAlign', 'labelCol', 'colon', 'size']);
    return React.createElement(FormContext.Provider, {
      value: {
        wrapperCol: wrapperCol,
        labelAlign: labelAlign,
        labelCol: labelCol,
        vertical: layout === 'vertical',
        colon: colon,
        size: size
      }
    }, React.createElement("form", _extends({}, formProps, {
      className: formClassName,
      autoComplete: "off"
    })));
  };

  return Form;
}(PureComponent);

_defineProperty(Form, "propTypes", {
  prefixCls: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'inline', 'vertical']),
  className: PropTypes.string,
  children: PropTypes.any,
  onSubmit: PropTypes.func,
  hideRequiredMark: PropTypes.bool,
  colon: PropTypes.bool,
  wrapperCol: PropTypes.object,
  labelAlign: PropTypes.oneOf(['left', 'right']),
  labelCol: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
});

_defineProperty(Form, "defaultProps", {
  prefixCls: 'new-fc-one-form',
  layout: 'horizontal',
  className: '',
  size: 'medium'
});

_defineProperty(Form, "Item", FormItem);

_defineProperty(Form, "createFormField", createFormField);

_defineProperty(Form, "create", function (options) {
  if (options === void 0) {
    options = {};
  }

  return createDOMForm(_extends({
    fieldNameProp: 'id'
  }, options, {
    fieldMetaProp: FIELD_META_PROP,
    fieldDataProp: FIELD_DATA_PROP
  }));
});

export { Form as default };