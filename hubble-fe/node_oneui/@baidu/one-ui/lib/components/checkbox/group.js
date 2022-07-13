"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _checkbox = _interopRequireDefault(require("./checkbox"));

var _radioAndCheckboxTools = require("../../core/radioAndCheckboxTools");

var _commonTools = require("../../core/commonTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxValueType = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]);

var CheckboxOptionType = _propTypes["default"].shape({
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node]),
  value: CheckboxValueType,
  disabled: _propTypes["default"].bool
});

var CheckboxGroup =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CheckboxGroup, _PureComponent);

  function CheckboxGroup(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "toggleOption", function (option) {
      var stateValue = _this.state.value || [];
      var optionValue = option.value;
      var optionIndex = stateValue.indexOf(optionValue);
      var value = [].concat(stateValue);

      if (optionIndex === -1) {
        value.push(optionValue);
      } else {
        value.splice(optionIndex, 1);
      }

      var _this$props = _this.props,
          propsValue = _this$props.value,
          onChange = _this$props.onChange;

      if (propsValue == null) {
        _this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    });

    _this.state = {
      value: (0, _radioAndCheckboxTools.getRealValue)(props)
    };
    return _this;
  }

  var _proto = CheckboxGroup.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      checkboxGroup: {
        toggleOption: this.toggleOption,
        value: this.state.value,
        disabled: this.props.disabled,
        size: this.props.size
      }
    };
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;

    if (value != null) {
      this.setState({
        value: value
      });
    }
  };

  _proto.getOptions = function getOptions() {
    return this.props.options.map(function (option) {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        };
      }

      return option;
    });
  };

  _proto.render = function render() {
    var _this2 = this,
        _classNames;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        options = _this$props2.options,
        disabled = _this$props2.disabled,
        direction = _this$props2.direction,
        size = _this$props2.size,
        checkboxPrefixCls = _this$props2.checkboxPrefixCls;
    var children = this.props.children;

    if (options && options.length > 0) {
      children = this.getOptions().map(function (option) {
        var value = option.value,
            label = option.label,
            optionDisable = option.disabled;
        var stateValue = _this2.state.value || [];
        return _react["default"].createElement(_checkbox["default"], {
          key: value,
          disabled: optionDisable != null ? optionDisable : disabled,
          value: value,
          checked: stateValue.indexOf(value) !== -1,
          onChange: function onChange() {
            return _this2.toggleOption(option);
          },
          className: prefixCls + "-item",
          prefixCls: checkboxPrefixCls
        }, label);
      });
    }

    var newSize = (0, _commonTools.transSizeOfDefault)(size, 'medium');
    var classString = (0, _classnames["default"])(prefixCls, className, (_classNames = {}, _classNames[prefixCls + "-" + newSize] = newSize, _classNames[prefixCls + "-" + direction] = direction, _classNames));
    return _react["default"].createElement("div", {
      className: classString
    }, children);
  };

  return CheckboxGroup;
}(_react.PureComponent);

exports["default"] = CheckboxGroup;

_defineProperty(CheckboxGroup, "propTypes", {
  value: _propTypes["default"].arrayOf(CheckboxValueType),
  onChange: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  options: _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([CheckboxOptionType, _propTypes["default"].string])),
  size: _propTypes["default"].oneOf(['small', 'medium']),
  disabled: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  direction: _propTypes["default"].string,
  // 水平方向row还是垂直方向column
  checkboxPrefixCls: _propTypes["default"].string
});

_defineProperty(CheckboxGroup, "childContextTypes", {
  checkboxGroup: _propTypes["default"].any
});

_defineProperty(CheckboxGroup, "defaultProps", {
  options: [],
  prefixCls: 'new-fc-one-checkbox-group',
  direction: 'row',
  size: 'medium',
  checkboxPrefixCls: 'new-fc-one-checkbox'
});

module.exports = exports.default;