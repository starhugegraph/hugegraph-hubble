"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Checkbox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Checkbox, _PureComponent);

  function Checkbox(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "saveInput", function (node) {
      _this.input = node;
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleChange", function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          onChange = _this$props.onChange;

      if (disabled) {
        return;
      }

      var checked = e.target.checked;

      if (!('checked' in _this.props)) {
        _this.setState({
          checked: checked
        });
      }

      if (onChange) {
        onChange({
          target: _extends({}, _this.props, {
            checked: checked
          }),
          stopPropagation: function stopPropagation() {
            e.stopPropagation();
          },
          preventDefault: function preventDefault() {
            e.preventDefault();
          },
          nativeEvent: e.nativeEvent
        });
      }
    });

    var _checked = 'checked' in props ? props.checked : props.defaultChecked;

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  var _proto = Checkbox.prototype;

  _proto.focus = function focus() {
    this.input.focus();
  };

  _proto.blur = function blur() {
    this.input.blur();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        style = _this$props2.style,
        type = _this$props2.type,
        disabled = _this$props2.disabled,
        onClick = _this$props2.onClick,
        onFocus = _this$props2.onFocus,
        onBlur = _this$props2.onBlur,
        inputOriginProps = _this$props2.inputOriginProps;
    var checked = this.state.checked;
    var classString = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    return _react["default"].createElement("span", {
      className: classString,
      style: style
    }, _react["default"].createElement("input", _extends({
      name: name,
      type: type,
      disabled: disabled,
      className: prefixCls + "-input",
      checked: !!checked,
      onClick: onClick,
      onFocus: onFocus,
      onBlur: onBlur,
      onChange: this.onHandleChange,
      ref: this.saveInput
    }, inputOriginProps)), _react["default"].createElement("span", {
      className: prefixCls + "-inner"
    }));
  };

  return Checkbox;
}(_react.PureComponent);

_defineProperty(Checkbox, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  type: _propTypes["default"].string,
  defaultChecked: _propTypes["default"].bool,
  checked: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  onFocus: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  onChange: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  inputOriginProps: _propTypes["default"].object
});

_defineProperty(Checkbox, "defaultProps", {
  className: '',
  style: {},
  type: 'checkbox',
  defaultChecked: false,
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onChange: function onChange() {}
});

_defineProperty(Checkbox, "getDerivedStateFromProps", function (nextProps) {
  if ('checked' in nextProps) {
    return {
      checked: nextProps.checked
    };
  }

  return null;
});

(0, _reactLifecyclesCompat.polyfill)(Checkbox);
var _default = Checkbox;
exports["default"] = _default;
module.exports = exports.default;