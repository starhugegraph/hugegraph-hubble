"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _commonTools = require("../../core/commonTools");

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 向下兼容映射老的type，同时提醒业务方老的不能用了
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

    var size = (0, _commonTools.transSizeOfDefault)(props.size, 'small');
    var newType = oldButtonConfigMap[type] || type;
    var onlyIcon = !children && icon;
    var classes = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + newType] = newType, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-" + newType + "-disabled"] = disabled, _classNames[prefixCls + "-readOnly"] = readonly || readOnly, _classNames[prefixCls + "-icon-only"] = onlyIcon, _classNames[prefixCls + "-" + newType + "-loading"] = loading, _classNames[prefixCls + "-has-icon"] = icon, _classNames));

    var buttonProps = _extends({
      type: htmlType || 'button',
      disabled: disabled
    }, rest, {
      onClick: this.handleClick
    });

    var iconNode = null;

    if (icon) {
      if (typeof icon === 'string') {
        iconNode = _react["default"].createElement(_icon["default"], {
          type: icon
        });
      } else {
        iconNode = icon;
      }
    }

    if (onlyIcon && loading) {
      // 只有图标，并且只在loading状态的时候，只展现loading状态
      return (// eslint-disable-next-line react/button-has-type
        _react["default"].createElement("button", _extends({}, buttonProps, {
          className: classes
        }), _react["default"].createElement(_icon["default"], {
          className: prefixCls + "-loading-icon",
          type: "loading"
        }))
      );
    }

    return (// eslint-disable-next-line react/button-has-type
      _react["default"].createElement("button", _extends({}, buttonProps, {
        className: classes
      }), loading ? _react["default"].createElement(_icon["default"], {
        className: prefixCls + "-loading-icon",
        type: "loading"
      }) : iconNode, children && _react["default"].createElement("span", null, children))
    );
  };

  return Button;
}(_react.PureComponent);

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
  type: _propTypes["default"].oneOf(['normal', 'strong', 'primary', 'translucent', 'link']),

  /** 按钮域名，如果组件在表单中，此属性等同于原生dom的name属性 */
  name: _propTypes["default"].string,

  /**
   * 设置按钮大小，可选值为 small large 或者不设
   * --- 版本更新 2019-06-05 --- 3.0以上版本对外暴露增加 xlarge, xsmall, medium, 不支持default,为超大尺寸按钮以及超小尺寸按钮
   * 默认保留以前逻辑default为默认值，对应的是M尺寸的按钮
   * */
  size: _propTypes["default"].oneOf(['large', 'medium', 'small', 'xsmall', 'xlarge']),

  /** 用户可自定义class前缀 */
  prefixCls: _propTypes["default"].string,

  /** 用户可自定义class */
  className: _propTypes["default"].string,

  /** 用户可自定义行内样式 */
  style: _propTypes["default"].object,

  /** 用户可自定义icon图标 */
  icon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string]),

  /** 设置 button 原生的 type 值 */
  htmlType: _propTypes["default"].oneOf(['submit', 'button', 'reset']),

  /** 禁用状态 */
  disabled: _propTypes["default"].bool,

  /** 兼容老版本 */
  readonly: _propTypes["default"].bool,

  /** 只读状态 */
  readOnly: _propTypes["default"].bool,

  /** click 事件的回调 */
  onClick: _propTypes["default"].func,
  children: _propTypes["default"].node,

  /**
   * loading 状态
   */
  loading: _propTypes["default"].bool
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
  onClick: _lodash["default"].noop,
  loading: false
});

Button.displayName = 'Button';
var _default = Button;
exports["default"] = _default;
module.exports = exports.default;