function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 文字链
 * @author Chen Xiao
 * @email companyforme@gmail.com
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { transSizeOfDefault } from '../../core/commonTools';
/**
 * TextLink component.
 */

var oldTextLinkToDlsMap = {
  'base-01': 'noraml',
  'base-02': 'noraml',
  'important-01': 'strong',
  'important-02': 'strong',
  'important-03': 'strong',
  'important-04': 'strong'
};

var TextLink =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(TextLink, _PureComponent);

  function TextLink() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var _this$props = _this.props,
          toUrl = _this$props.toUrl,
          target = _this$props.target,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      window.open(toUrl, target);
    });

    return _this;
  }

  var _proto = TextLink.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props2 = this.props,
        type = _this$props2.type,
        className = _this$props2.className,
        prefixCls = _this$props2.prefixCls,
        children = _this$props2.children,
        disabled = _this$props2.disabled;
    var size = transSizeOfDefault(this.props.size, 'medium');
    var newType = oldTextLinkToDlsMap[type] || type;
    var classes = classNames(prefixCls, className, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-" + newType] = newType, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    var textLinkProps = {
      className: classes
    };
    return React.createElement("span", _extends({}, textLinkProps, {
      onClick: this.onClick
    }), children);
  };

  return TextLink;
}(PureComponent);

_defineProperty(TextLink, "propTypes", {
  /**
   *设置按钮类型，默认为base-01，可选值如下：
   * base-01 普通文字链01
   * base-02 普通文字链02
   * important-01 加强文字链01
   * important-02 加强文字链02
   * important-03 加强文字链03
   * important-04 加强文字链04
   * --- 版本更新 2019-06-05 --- 3.0以上版本对外暴露type不会是xxxx-xx形式了
   * 将根据新的DLS规范，将文字链类型分为
   * 普通文字链、加强文字链
   * type形式更加语义化 分别为 normal、strong两种
   * 默认不传type将定义为normal类型的普通按钮
   * --- end ---
   */
  type: PropTypes.oneOf(['normal', 'strong']),

  /** 文字链的链接打开类型，原a标签html属性，默认'_self'，取值有'_self'、'_blank'、'_parent'、'top' */
  target: PropTypes.string,

  /** 文字链的链接地址 */
  toUrl: PropTypes.string.isRequired,

  /** 文字链的内容节点 */
  children: PropTypes.node,

  /** 用户可自定义class前缀 */
  prefixCls: PropTypes.string,

  /** 用户可自定义class */
  className: PropTypes.string,

  /** 用户可自定义行内样式 */
  style: PropTypes.object,

  /**
   * 文字链尺寸，分为两种，默认为medium, 和small
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * 禁用
   */
  disabled: PropTypes.bool
});

_defineProperty(TextLink, "defaultProps", {
  type: 'noraml',
  target: '_self',
  size: 'medium',
  children: null,
  prefixCls: 'new-fc-one-text-link',
  className: '',
  style: {},
  disabled: false
});

export { TextLink as default };