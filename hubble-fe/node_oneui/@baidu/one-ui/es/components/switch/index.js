function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import { IconCheck, IconClose } from '@baidu/one-ui-icon';
import { transSizeOfDefault } from '../../core/commonTools';
import CommonSwitch from './common/switch';

var Switch =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Switch, _PureComponent);

  function Switch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "saveSwitch", function (node) {
      _this.rcSwitch = node;
    });

    return _this;
  }

  var _proto = Switch.prototype;

  _proto.focus = function focus() {
    this.rcSwitch.focus();
  };

  _proto.blur = function blur() {
    this.rcSwitch.blur();
  };

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        loading = _this$props.loading,
        _this$props$className = _this$props.className,
        className = _this$props$className === void 0 ? '' : _this$props$className,
        checkedChildren = _this$props.checkedChildren,
        unCheckedChildren = _this$props.unCheckedChildren,
        showInnerIcon = _this$props.showInnerIcon,
        showInnerLabel = _this$props.showInnerLabel;
    var size = transSizeOfDefault(this.props.size, 'medium');
    var classes = classNames(className, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-loading"] = loading, _classNames));
    var defaultCheckedChildren = checkedChildren;
    var defaultUnCheckedChildren = unCheckedChildren;

    if (showInnerIcon) {
      if (!checkedChildren) {
        defaultCheckedChildren = React.createElement(IconCheck, {
          className: prefixCls + "-checked-icon"
        });
      }

      if (!unCheckedChildren) {
        defaultUnCheckedChildren = React.createElement(IconClose, {
          className: prefixCls + "-closed-icon"
        });
      }
    } else if (showInnerLabel) {
      if (!checkedChildren) {
        defaultCheckedChildren = '开';
      }

      if (!unCheckedChildren) {
        defaultUnCheckedChildren = '关';
      }
    }

    var otherProps = {
      className: classes,
      ref: this.saveSwitch
    };

    if (defaultCheckedChildren && defaultUnCheckedChildren && size === 'large') {
      otherProps = _extends({}, otherProps, {
        checkedChildren: defaultCheckedChildren,
        unCheckedChildren: defaultUnCheckedChildren
      });
    }

    return React.createElement(CommonSwitch, _extends({}, omit(this.props, ['loading', 'showInnerLabel', 'showInnerIcon', 'size']), otherProps));
  };

  return Switch;
}(PureComponent);

_defineProperty(Switch, "propTypes", {
  /** 类名前缀 */
  prefixCls: PropTypes.string,

  /** 开关的样式 */
  size: PropTypes.oneOf(['small', 'medium', 'large']),

  /** 自定义类名 */
  className: PropTypes.string,

  /** 是否loading */
  loading: PropTypes.bool,

  /** 当前是否被选中 */
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,

  /** 变化时回调 */
  onChange: PropTypes.func,

  /** disabled */
  disabled: PropTypes.bool,

  /** 内部是否带图标 */
  showInnerIcon: PropTypes.bool,

  /** 内部是否带文字 */
  showInnerLabel: PropTypes.bool,
  checkedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  unCheckedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
});

_defineProperty(Switch, "defaultProps", {
  prefixCls: 'new-fc-one-switch',
  loading: false,
  size: 'medium',
  showInnerIcon: false,
  showInnerLabel: false
});

export { Switch as default };