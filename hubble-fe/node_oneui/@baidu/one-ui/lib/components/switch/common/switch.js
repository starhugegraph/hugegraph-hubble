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

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Switch =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Switch, _PureComponent);

  function Switch(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onHandleClick", function (e) {
      var checked = _this.state.checked;
      var onClick = _this.props.onClick;
      var newChecked = !checked;

      _this.setChecked(newChecked, e);

      if (onClick) {
        onClick(newChecked, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleKeyDown", function (e) {
      if (e.keyCode === 37) {
        // Left
        _this.setChecked(false, e);
      } else if (e.keyCode === 39) {
        // Right
        _this.setChecked(true, e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ref) {
      _this.switchRef = ref;
    });

    var _checked = false;

    if ('checked' in props) {
      _checked = !!props.checked;
    } else {
      _checked = !!props.defaultChecked;
    }

    _this.state = {
      checked: _checked
    };
    return _this;
  }

  var _proto = Switch.prototype;

  _proto.setChecked = function setChecked(checked, e) {
    var _this$props = this.props,
        disabled = _this$props.disabled,
        onChange = _this$props.onChange;

    if (disabled) {
      return;
    }

    if (!('checked' in this.props)) {
      this.setState({
        checked: checked
      });
    }

    if (onChange) {
      onChange(checked, e);
    }
  };

  _proto.focus = function focus() {
    if (this.switchRef) {
      this.switchRef.focus();
    }
  };

  _proto.blur = function blur() {
    if (this.switchRef) {
      this.switchRef.blur();
    }
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        disabled = _this$props2.disabled,
        loadingIcon = _this$props2.loadingIcon,
        checkedChildren = _this$props2.checkedChildren,
        unCheckedChildren = _this$props2.unCheckedChildren,
        onChange = _this$props2.onChange,
        restProps = _objectWithoutPropertiesLoose(_this$props2, ["className", "prefixCls", "disabled", "loadingIcon", "checkedChildren", "unCheckedChildren", "onChange"]);

    var checked = this.state.checked;
    var switchClassName = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames), className);
    return _react["default"].createElement("button", _extends({}, restProps, {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled: disabled,
      className: switchClassName,
      onKeyDown: this.onHandleKeyDown,
      onClick: this.onHandleClick,
      ref: this.saveRef
    }), loadingIcon, _react["default"].createElement("span", {
      className: prefixCls + "-inner"
    }, checked ? checkedChildren : unCheckedChildren));
  };

  return Switch;
}(_react.PureComponent);

_defineProperty(Switch, "propTypes", {
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool,
  checkedChildren: _propTypes["default"].node,
  unCheckedChildren: _propTypes["default"].node,
  onChange: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  tabIndex: _propTypes["default"].number,
  checked: _propTypes["default"].bool,
  defaultChecked: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  loadingIcon: _propTypes["default"].node
});

_defineProperty(Switch, "defaultProps", {
  checkedChildren: null,
  unCheckedChildren: null,
  className: '',
  defaultChecked: false
});

_defineProperty(Switch, "getDerivedStateFromProps", function (nextProps) {
  var newState = {};

  if ('checked' in nextProps) {
    newState.checked = !!nextProps.checked;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(Switch);
var _default = Switch;
exports["default"] = _default;
module.exports = exports.default;