"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _menu = _interopRequireDefault(require("../menu"));

var _icon = _interopRequireDefault(require("../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuItem = _menu["default"].Item;
var SubMenu = _menu["default"].SubMenu;
var Divider = _menu["default"].Divider;

var SingleSelect =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SingleSelect, _PureComponent);

  function SingleSelect(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (e) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(e);
      }

      _this.setState({
        isExpend: false,
        value: e.key
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getSubMenuItem", function (option, index) {
      var disabled = option.disabled,
          value = option.value,
          label = option.label;
      var menuItem = {
        key: value,
        disabled: disabled || false
      };

      if (option.divider) {
        return _react["default"].createElement(Divider, {
          key: index + "-divider"
        });
      }

      if (option.children && option.children.length) {
        return _react["default"].createElement(SubMenu, _extends({}, menuItem, {
          title: label
        }), option.children.map(function (child) {
          return _this.getSubMenuItem(child);
        }));
      }

      return _react["default"].createElement(MenuItem, menuItem, label);
    });

    _defineProperty(_assertThisInitialized(_this), "getDropdownOverlay", function () {
      var _this$props = _this.props,
          options = _this$props.options,
          dropdownHeight = _this$props.dropdownHeight;
      var value = _this.state.value;

      if ('value' in _this.props) {
        value = _this.props.value;
      }

      var menu = _react["default"].createElement(_menu["default"], {
        selectable: true,
        selectedKeys: ["" + value],
        style: {
          height: dropdownHeight
        },
        onClick: _this.onChange,
        mode: "vertical"
      }, options.map(function (option, index) {
        return _this.getSubMenuItem(option, index);
      }));

      return menu;
    });

    _defineProperty(_assertThisInitialized(_this), "renderValueByOptions", function (options, value, label) {
      if (label === void 0) {
        label = '';
      }

      _lodash["default"].map(options, function (option) {
        if ((typeof value === 'number' || typeof option.value === 'number') && +option.value === +value) {
          label = option.label;
        } else if (option.value === value) {
          label = option.label;
        } else if (option.children) {
          label = _this.renderValueByOptions(option.children, value, label);
        }
      });

      return label;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedLabel", function () {
      var value = _this.state.value;

      if ('value' in _this.props) {
        value = _this.props.value;
      }

      var _this$props2 = _this.props,
          options = _this$props2.options,
          selectorName = _this$props2.selectorName;

      var label = _this.renderValueByOptions(options, value);

      return label || selectorName;
    });

    _defineProperty(_assertThisInitialized(_this), "dropdownVisibleChange", function (visible) {
      var onVisibleChange = _this.props.onVisibleChange;

      if (onVisibleChange) {
        onVisibleChange(visible);
      }

      _this.setState({
        isExpend: visible
      });
    });

    _this.state = {
      isExpend: false,
      value: props.value || ''
    };
    return _this;
  }

  var _proto = SingleSelect.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        trigger = _this$props3.trigger,
        placement = _this$props3.placement,
        getPopupContainer = _this$props3.getPopupContainer,
        disabled = _this$props3.disabled,
        visible = _this$props3.visible,
        prefixCls = _this$props3.prefixCls,
        style = _this$props3.style;
    var overlay = this.getDropdownOverlay();
    var dropdownProps = {
      overlay: overlay,
      trigger: disabled ? [] : [trigger],
      onVisibleChange: this.dropdownVisibleChange,
      placement: placement,
      getPopupContainer: getPopupContainer
    };

    if ('visible' in this.props) {
      dropdownProps.visible = visible;
    }

    var isExpend = this.state.isExpend;
    var classes = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-open"] = isExpend || visible, _classNames[prefixCls + "-disabled"] = disabled, _classNames));
    return _react["default"].createElement(_dropdown["default"], dropdownProps, _react["default"].createElement("span", {
      className: classes,
      style: style
    }, _react["default"].createElement("span", {
      className: prefixCls + "-text"
    }, this.getSelectedLabel()), _react["default"].createElement(_icon["default"], {
      type: "angle-down"
    })));
  };

  return SingleSelect;
}(_react.PureComponent);

exports["default"] = SingleSelect;

_defineProperty(SingleSelect, "propTypes", {
  /** options */
  options: _propTypes["default"].array,

  /** 传入的value */
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 弹出的位置 */
  placement: _propTypes["default"].string,

  /** 是否禁用 */
  disabled: _propTypes["default"].bool,

  /** 触发的trigger, 可选hover,click */
  trigger: _propTypes["default"].string,

  /** 视图改变时候触发 */
  onVisibleChange: _propTypes["default"].func,

  /** 是否可见 */
  visible: _propTypes["default"].any,

  /** 弹窗挂载的位置 */
  getPopupContainer: _propTypes["default"].any,

  /** 选择的时候触发 */
  onChange: _propTypes["default"].func,

  /** 自定义类名 */
  style: _propTypes["default"].object,

  /** 可定义dropdown的高度 */
  dropdownHeight: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),

  /** placeholder名称 */
  selectorName: _propTypes["default"].string
});

_defineProperty(SingleSelect, "defaultProps", {
  prefixCls: 'new-fc-one-single-select',
  disabled: false,
  dropdownHeight: 'auto',
  style: {},
  trigger: 'hover',
  selectorName: '请选择...'
});

module.exports = exports.default;