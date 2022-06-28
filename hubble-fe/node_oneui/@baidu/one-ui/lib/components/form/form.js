"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _createDOMForm = _interopRequireDefault(require("./common/createDOMForm"));

var _createFormField = _interopRequireDefault(require("./common/createFormField"));

var _formItem = _interopRequireWildcard(require("./formItem"));

var _context = require("./context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var formClassName = (0, _classnames["default"])(prefixCls, className, [prefixCls + "-" + layout], (_classNames = {}, _classNames[prefixCls + "-hide-required-mark"] = hideRequiredMark, _classNames), [prefixCls + "-" + size]);
    var formProps = (0, _omit["default"])(this.props, ['prefixCls', 'className', 'layout', 'form', 'hideRequiredMark', 'wrapperCol', 'labelAlign', 'labelCol', 'colon', 'size']);
    return _react["default"].createElement(_context.FormContext.Provider, {
      value: {
        wrapperCol: wrapperCol,
        labelAlign: labelAlign,
        labelCol: labelCol,
        vertical: layout === 'vertical',
        colon: colon,
        size: size
      }
    }, _react["default"].createElement("form", _extends({}, formProps, {
      className: formClassName,
      autoComplete: "off"
    })));
  };

  return Form;
}(_react.PureComponent);

exports["default"] = Form;

_defineProperty(Form, "propTypes", {
  prefixCls: _propTypes["default"].string,
  layout: _propTypes["default"].oneOf(['horizontal', 'inline', 'vertical']),
  className: _propTypes["default"].string,
  children: _propTypes["default"].any,
  onSubmit: _propTypes["default"].func,
  hideRequiredMark: _propTypes["default"].bool,
  colon: _propTypes["default"].bool,
  wrapperCol: _propTypes["default"].object,
  labelAlign: _propTypes["default"].oneOf(['left', 'right']),
  labelCol: _propTypes["default"].object,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large'])
});

_defineProperty(Form, "defaultProps", {
  prefixCls: 'new-fc-one-form',
  layout: 'horizontal',
  className: '',
  size: 'medium'
});

_defineProperty(Form, "Item", _formItem["default"]);

_defineProperty(Form, "createFormField", _createFormField["default"]);

_defineProperty(Form, "create", function (options) {
  if (options === void 0) {
    options = {};
  }

  return (0, _createDOMForm["default"])(_extends({
    fieldNameProp: 'id'
  }, options, {
    fieldMetaProp: _formItem.FIELD_META_PROP,
    fieldDataProp: _formItem.FIELD_DATA_PROP
  }));
});

module.exports = exports.default;