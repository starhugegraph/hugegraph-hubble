"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _radio = _interopRequireDefault(require("./radio"));

var _commonTools = require("../../core/commonTools");

var _radioAndCheckboxTools = require("../../core/radioAndCheckboxTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxValueType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]);

var CheckboxOptionType = _propTypes["default"].shape({
  label: _propTypes["default"].string,
  value: CheckboxValueType,
  disabled: _propTypes["default"].bool
});

var RadioGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RadioGroup, _PureComponent);

  function RadioGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onRadioChange", function (ev) {
      var lastValue = _this.state.value;
      var newValue = ev.target.value;

      if (newValue !== lastValue) {
        var _this$props = _this.props,
            value = _this$props.value,
            onChange = _this$props.onChange;

        if (value == null) {
          _this.setState({
            value: newValue
          });
        }

        if (onChange) {
          onChange(ev);
        }
      }
    });

    _this.state = {
      value: (0, _radioAndCheckboxTools.getRealValue)(props, true)
    };
    return _this;
  }

  var _proto = RadioGroup.prototype;

  _proto.getChildContext = function getChildContext() {
    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        name = _this$props2.name;
    return {
      radioGroup: {
        onChange: this.onRadioChange,
        value: this.state.value,
        disabled: disabled,
        name: name
      }
    };
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value,
        children = nextProps.children;
    var newValue = value == null ? (0, _radioAndCheckboxTools.getCheckedValue)(children)[0] : value;

    if (newValue != null && this.state.value !== newValue) {
      this.setState({
        value: value
      });
    }
  };

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        className = _this$props3.className,
        options = _this$props3.options,
        disabled = _this$props3.disabled,
        style = _this$props3.style,
        onMouseEnter = _this$props3.onMouseEnter,
        onMouseLeave = _this$props3.onMouseLeave,
        direction = _this$props3.direction,
        radioPrefixCls = _this$props3.radioPrefixCls;
    var children = this.props.children;
    var value = this.state.value;
    var size = (0, _commonTools.transSizeOfDefault)(this.props.size, 'small');
    var classString = (0, _classnames["default"])(prefixCls, (_classNames = {}, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-" + direction] = direction, _classNames), className); // 如果存在 options, 优先使用

    if (options && options.length > 0) {
      children = options.map(function (option, index) {
        if (typeof option === 'string') {
          // 此处类型自动推导为 string
          option = {
            label: option,
            value: option
          };
        }

        var _option = option,
            optionValue = _option.value,
            optionDisabled = _option.disabled,
            label = _option.label; // 此处类型自动推导为 { label: string, value: string }

        return _react["default"].createElement(_radio["default"], {
          key: index,
          disabled: optionDisabled || disabled,
          value: optionValue,
          onChange: _this2.onRadioChange,
          checked: value === optionValue,
          size: size,
          prefixCls: radioPrefixCls
        }, label);
      });
    }

    return _react["default"].createElement("div", {
      className: classString,
      style: style,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave
    }, children);
  };

  return RadioGroup;
}(_react.PureComponent);

exports["default"] = RadioGroup;

_defineProperty(RadioGroup, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([CheckboxOptionType, _propTypes["default"].string])),
  disabled: _propTypes["default"].bool,
  style: _propTypes["default"].object,
  value: _propTypes["default"].any,
  onChange: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['medium', 'small']),
  onMouseEnter: _propTypes["default"].func,
  onMouseLeave: _propTypes["default"].func,
  name: _propTypes["default"].string,
  children: _propTypes["default"].node,
  direction: _propTypes["default"].string,
  // 水平方向row还是垂直方向column
  radioPrefixCls: _propTypes["default"].string
});

_defineProperty(RadioGroup, "childContextTypes", {
  radioGroup: _propTypes["default"].any
});

_defineProperty(RadioGroup, "defaultProps", {
  disabled: false,
  prefixCls: 'new-fc-one-radio-group',
  className: '',
  direction: 'row',
  size: 'medium',
  radioPrefixCls: 'new-fc-one-radio'
});

module.exports = exports.default;