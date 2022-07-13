"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _omit = _interopRequireDefault(require("omit.js"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _commonTools = require("../../core/commonTools");

var _switch = _interopRequireDefault(require("./common/switch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    var size = (0, _commonTools.transSizeOfDefault)(this.props.size, 'medium');
    var classes = (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-loading"] = loading, _classNames));
    var defaultCheckedChildren = checkedChildren;
    var defaultUnCheckedChildren = unCheckedChildren;

    if (showInnerIcon) {
      if (!checkedChildren) {
        defaultCheckedChildren = _react["default"].createElement(_oneUiIcon.IconCheck, {
          className: prefixCls + "-checked-icon"
        });
      }

      if (!unCheckedChildren) {
        defaultUnCheckedChildren = _react["default"].createElement(_oneUiIcon.IconClose, {
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

    return _react["default"].createElement(_switch["default"], _extends({}, (0, _omit["default"])(this.props, ['loading', 'showInnerLabel', 'showInnerIcon', 'size']), otherProps));
  };

  return Switch;
}(_react.PureComponent);

exports["default"] = Switch;

_defineProperty(Switch, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 开关的样式 */
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** 是否loading */
  loading: _propTypes["default"].bool,

  /** 当前是否被选中 */
  checked: _propTypes["default"].bool,
  defaultChecked: _propTypes["default"].bool,

  /** 变化时回调 */
  onChange: _propTypes["default"].func,

  /** disabled */
  disabled: _propTypes["default"].bool,

  /** 内部是否带图标 */
  showInnerIcon: _propTypes["default"].bool,

  /** 内部是否带文字 */
  showInnerLabel: _propTypes["default"].bool,
  checkedChildren: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  unCheckedChildren: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node])
});

_defineProperty(Switch, "defaultProps", {
  prefixCls: 'new-fc-one-switch',
  loading: false,
  size: 'medium',
  showInnerIcon: false,
  showInnerLabel: false
});

module.exports = exports.default;