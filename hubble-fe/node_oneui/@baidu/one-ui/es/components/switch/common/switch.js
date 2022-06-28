function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

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
    var switchClassName = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-checked"] = checked, _classNames[prefixCls + "-disabled"] = disabled, _classNames), className);
    return React.createElement("button", _extends({}, restProps, {
      type: "button",
      role: "switch",
      "aria-checked": checked,
      disabled: disabled,
      className: switchClassName,
      onKeyDown: this.onHandleKeyDown,
      onClick: this.onHandleClick,
      ref: this.saveRef
    }), loadingIcon, React.createElement("span", {
      className: prefixCls + "-inner"
    }, checked ? checkedChildren : unCheckedChildren));
  };

  return Switch;
}(PureComponent);

_defineProperty(Switch, "propTypes", {
  className: PropTypes.string,
  prefixCls: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  checkedChildren: PropTypes.node,
  unCheckedChildren: PropTypes.node,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  tabIndex: PropTypes.number,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  style: PropTypes.object,
  loadingIcon: PropTypes.node
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

polyfill(Switch);
export default Switch;