function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import omit from 'omit.js';
import { polyfill } from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import Icon from '../icon';

var Tag =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tag, _PureComponent);

  function Tag(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "close", function (e) {
      var onClose = _this.props.onClose;

      if (onClose) {
        onClose(e);
      }

      if (e.defaultPrevented) {
        return;
      }

      var dom = ReactDOM.findDOMNode(_assertThisInitialized(_this));
      dom.style.width = dom.getBoundingClientRect().width + "px";

      _this.setState({
        closed: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "isPresetColor", function (color) {
      if (!color) {
        return false;
      }

      return /^(pink|red|yellow|orange|cyan|green|blue|purple)(-inverse)?$/.test(color);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickTag", function () {
      var checked = !_this.state.checked;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (!('checked' in _this.props)) {
        _this.setState({
          checked: checked
        });
      }

      onChange(checked);
    });

    _this.state = {
      closed: false,
      checked: props.checked
    };
    return _this;
  }

  var _proto = Tag.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        closable = _this$props2.closable,
        className = _this$props2.className,
        children = _this$props2.children,
        style = _this$props2.style,
        color = _this$props2.color,
        size = _this$props2.size,
        disabled = _this$props2.disabled,
        checkable = _this$props2.checkable,
        otherProps = _objectWithoutPropertiesLoose(_this$props2, ["prefixCls", "closable", "className", "children", "style", "color", "size", "disabled", "checkable"]);

    var checked = checkable && this.state.checked;
    var closeIcon = closable ? React.createElement(Icon, {
      type: "close",
      onClick: this.close
    }) : '';
    var isPresetColor = this.isPresetColor(color);
    var classString = classNames(prefixCls, className, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-" + color] = isPresetColor, _classNames[prefixCls + "-has-color"] = color && !isPresetColor, _classNames[prefixCls + "-can-closable"] = closable, _classNames[prefixCls + "-inverse"] = checked, _classNames[prefixCls + "-" + color + "-inverse"] = checked && isPresetColor, _classNames[prefixCls + "-checkable"] = checkable, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    var divProps = omit(otherProps, ['onClose']);

    if (checkable) {
      divProps.onClick = this.onClickTag;
    }

    var tagStyle = _extends({
      backgroundColor: color && !isPresetColor ? color : null
    }, style);

    var tag = this.state.closed ? null : React.createElement("div", _extends({
      "data-show": !this.state.closed
    }, divProps, {
      className: classString,
      style: tagStyle
    }), React.createElement("span", {
      className: prefixCls + "-text"
    }, children), closeIcon);
    return tag;
  };

  return Tag;
}(PureComponent);

_defineProperty(Tag, "propTypes", {
  /**
   * tag类名前缀
   */
  prefixCls: PropTypes.string,

  /**
   * 自定义tag类名
   */
  className: PropTypes.string,

  /**
   * tag是否可以关闭
   */
  closable: PropTypes.bool,

  /**
   * tag点击关闭时的回调
   */
  onClose: PropTypes.func,

  /**
   * 自定义tag的样式
   */
  style: PropTypes.object,

  /**
   * tag的children
   */
  children: PropTypes.any,

  /**
   * 自定义tag的颜色
   */
  color: PropTypes.string,

  /**
   * 尺寸
   */
  size: PropTypes.oneOf(['small', 'medium']),
  disabled: PropTypes.bool,

  /**
   * 以下是可点击的tag属性(选中)
   */

  /**
   * 是否可点击
   */
  checkable: PropTypes.bool,

  /**
   * checkable为true的时候的回调函数，暴露checked
   */
  onChange: PropTypes.func,

  /**
   * checked 是否被选中，checkable为true的时候才生效
   */
  checked: PropTypes.bool
});

_defineProperty(Tag, "defaultProps", {
  prefixCls: 'new-fc-one-tag',
  closable: false,
  size: 'small',
  disabled: false,
  checkable: false,
  onChange: function onChange() {}
});

_defineProperty(Tag, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('checked' in nextProps && nextProps.checked !== prevState.checked) {
    return {
      checked: nextProps.checked
    };
  }

  return null;
});

polyfill(Tag);
export default Tag;