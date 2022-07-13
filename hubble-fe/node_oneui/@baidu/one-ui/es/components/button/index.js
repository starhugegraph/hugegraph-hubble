function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 按钮
 * @author Chen Xiao
 * @author huangshiming
 * @email companyforme@gmail.com
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { transSizeOfDefault } from '../../core/commonTools';
import Icon from '../icon'; // 向下兼容映射老的type，同时提醒业务方老的不能用了

var oldButtonConfigMap = {
  'base-b1': 'normal',
  'base-b2': 'primary',
  'base-b3': 'strong',
  'base-b4': 'link',
  'base-b5': 'normal',
  'base-b6': 'primary',
  'base-b7': 'link',
  'base-b8': 'translucent'
};

var Button =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Button, _PureComponent);

  function Button() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (e) {
      var _this$props = _this.props,
          disabled = _this$props.disabled,
          readonly = _this$props.readonly,
          onClick = _this$props.onClick,
          readOnly = _this$props.readOnly,
          loading = _this$props.loading;

      if (disabled || readonly || readOnly || loading) {
        return;
      }

      if (onClick) {
        onClick(e);
      }
    });

    return _this;
  }

  var _proto = Button.prototype;

  _proto.render = function render() {
    var _classNames;

    var props = this.props;

    var type = props.type,
        className = props.className,
        prefixCls = props.prefixCls,
        icon = props.icon,
        htmlType = props.htmlType,
        disabled = props.disabled,
        readonly = props.readonly,
        readOnly = props.readOnly,
        loading = props.loading,
        children = props.children,
        rest = _objectWithoutPropertiesLoose(props, ["type", "className", "prefixCls", "icon", "htmlType", "disabled", "readonly", "readOnly", "loading", "children"]);

    var size = transSizeOfDefault(props.size, 'small');
    var newType = oldButtonConfigMap[type] || type;
    var onlyIcon = !children && icon;
    var classes = classNames(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + newType] = newType, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-" + newType + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readonly || readOnly, _classNames[prefixCls + "-icon-only"] = onlyIcon, _classNames[prefixCls + "-" + newType + "-loading"] = loading, _classNames[prefixCls + "-has-icon"] = icon, _classNames));

    var buttonProps = _extends({
      type: htmlType || 'button',
      disabled: disabled
    }, rest, {
      onClick: this.handleClick
    });

    var iconNode = null;

    if (icon) {
      if (typeof icon === 'string') {
        iconNode = React.createElement(Icon, {
          type: icon
        });
      } else {
        iconNode = icon;
      }
    }

    if (onlyIcon && loading) {
      // 只有图标，并且只在loading状态的时候，只展现loading状态
      return (// eslint-disable-next-line react/button-has-type
        React.createElement("button", _extends({}, buttonProps, {
          className: classes
        }), React.createElement(Icon, {
          className: prefixCls + "-loading-icon",
          type: "loading"
        }))
      );
    }

    return (// eslint-disable-next-line react/button-has-type
      React.createElement("button", _extends({}, buttonProps, {
        className: classes
      }), loading ? React.createElement(Icon, {
        className: prefixCls + "-loading-icon",
        type: "loading"
      }) : iconNode, children && React.createElement("span", null, children))
    );
  };

  return Button;
}(PureComponent);

_defineProperty(Button, "propTypes", {
  /**
   *设置按钮类型，默认为base-b1，可选值如下：
   * base-b1 加强按钮
   * base-b2 重要按钮2
   * base-b3 普通按钮2
   * base-b4 文字按钮蓝色
   * base-b5 普通按钮1
   * base-b6 重要按钮1
   * base-b7 文字按钮灰色
   * base-b8 半透明按钮
   * --- 版本更新 2019-06-05 --- 3.0以上版本对外暴露type不会是base-bX形式了
   * 将根据新的DLS规范，将按钮类型分为
   * 普通按钮、加强按钮、重要按钮、半透明按钮、文字按钮
   * type形式更加语义化 分别为 normal、strong、primary、translucent、link五种
   * 默认不传type将定义为normal类型的普通按钮
   * --- end ---
   */
  type: PropTypes.oneOf(['normal', 'strong', 'primary', 'translucent', 'link']),

  /** 按钮域名，如果组件在表单中，此属性等同于原生dom的name属性 */
  name: PropTypes.string,

  /**
   * 设置按钮大小，可选值为 small large 或者不设
   * --- 版本更新 2019-06-05 --- 3.0以上版本对外暴露增加 xlarge, xsmall, medium, 不支持default,为超大尺寸按钮以及超小尺寸按钮
   * 默认保留以前逻辑default为默认值，对应的是M尺寸的按钮
   * */
  size: PropTypes.oneOf(['large', 'medium', 'small', 'xsmall', 'xlarge']),

  /** 用户可自定义class前缀 */
  prefixCls: PropTypes.string,

  /** 用户可自定义class */
  className: PropTypes.string,

  /** 用户可自定义行内样式 */
  style: PropTypes.object,

  /** 用户可自定义icon图标 */
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),

  /** 设置 button 原生的 type 值 */
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),

  /** 禁用状态 */
  disabled: PropTypes.bool,

  /** 兼容老版本 */
  readonly: PropTypes.bool,

  /** 只读状态 */
  readOnly: PropTypes.bool,

  /** click 事件的回调 */
  onClick: PropTypes.func,
  children: PropTypes.node,

  /**
   * loading 状态
   */
  loading: PropTypes.bool
});

_defineProperty(Button, "defaultProps", {
  type: 'normal',
  name: '',
  size: 'small',
  style: {},
  prefixCls: 'new-fc-one-btn',
  className: '',
  icon: '',
  htmlType: 'button',
  disabled: false,
  readonly: false,
  readOnly: false,
  onClick: _.noop,
  loading: false
});

Button.displayName = 'Button';
export default Button;