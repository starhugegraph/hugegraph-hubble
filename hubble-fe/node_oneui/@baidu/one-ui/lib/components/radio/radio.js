"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _commonTools = require("../../core/commonTools");

var _checkbox = _interopRequireDefault(require("../checkbox/common/checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Radio =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Radio, _Component);

  function Radio() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = Radio.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !(0, _shallowequal["default"])(this.props, nextProps) || !(0, _shallowequal["default"])(this.state, nextState) || !(0, _shallowequal["default"])(this.context.radioGroup, nextContext.radioGroup);
  };

  _proto.render = function render() {
    var _classNames;

    var props = this.props,
        context = this.context;

    var prefixCls = props.prefixCls,
        className = props.className,
        children = props.children,
        style = props.style,
        direction = props.direction,
        size = props.size,
        restProps = _objectWithoutPropertiesLoose(props, ["prefixCls", "className", "children", "style", "direction", "size"]);

    var radioGroup = context.radioGroup;

    var radioProps = _extends({}, restProps);

    if (radioGroup) {
      var value = radioGroup.value,
          _disabled = radioGroup.disabled;
      radioProps.name = radioGroup.name;
      radioProps.onChange = radioGroup.onChange;
      radioProps.checked = value != null ? props.value === value : props.checked;
      radioProps.disabled = props.disabled || _disabled;
    }

    var checked = radioProps.checked,
        disabled = radioProps.disabled;
    var newSize = size || 'medium';
    newSize = (0, _commonTools.transSizeOfDefault)(newSize, 'medium');
    var wrapperClassString = (0, _classnames["default"])(className, prefixCls + "-wrapper-" + newSize, (_classNames = {}, _classNames[prefixCls + "-wrapper"] = true, _classNames[prefixCls + "-wrapper-checked"] = checked, _classNames[prefixCls + "-wrapper-disabled"] = disabled, _classNames[prefixCls + "-wrapper-checked-disabled"] = checked && disabled, _classNames[prefixCls + "-wrapper-" + direction] = direction, _classNames));
    return _react["default"].createElement("label", {
      className: wrapperClassString,
      style: style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave
    }, _react["default"].createElement(_checkbox["default"], _extends({}, radioProps, {
      prefixCls: prefixCls
    })), children != null ? _react["default"].createElement("span", null, children) : null);
  };

  return Radio;
}(_react.Component);

exports["default"] = Radio;

_defineProperty(Radio, "propTypes", {
  type: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  checked: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  disabled: _propTypes["default"].bool,
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  value: _propTypes["default"].any,
  name: _propTypes["default"].string,
  children: _propTypes["default"].node,
  direction: _propTypes["default"].string,
  // 水平方向row还是垂直方向column,
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Radio, "contextTypes", {
  radioGroup: _propTypes["default"].any
});

_defineProperty(Radio, "defaultProps", {
  prefixCls: 'new-fc-one-radio',
  type: 'radio',
  direction: 'row'
});

module.exports = exports.default;