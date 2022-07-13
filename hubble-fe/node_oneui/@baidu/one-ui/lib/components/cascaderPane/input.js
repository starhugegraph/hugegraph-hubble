"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _input = _interopRequireDefault(require("../input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CascaderInput =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CascaderInput, _PureComponent);

  function CascaderInput(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onInputChange", function (e) {
      var value = e.value;

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      _this.props.onInputChange(e);
    });

    _this.state = {
      value: props.value || props.defaultValue || undefined
    };
    return _this;
  }

  CascaderInput.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    var newState = {};

    if ('value' in nextProps) {
      newState.value = nextProps.value;
    }

    return newState;
  };

  var _proto = CascaderInput.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        searchProps = _this$props.searchProps,
        width = _this$props.width;
    var value = this.state.value;
    return _react["default"].createElement(_input["default"], _extends({}, searchProps, {
      value: value,
      onChange: this.onInputChange,
      width: width
    }));
  };

  return CascaderInput;
}(_react.PureComponent);

_defineProperty(CascaderInput, "propTypes", {
  /** 输入框的value */
  value: _propTypes["default"].string,

  /** default value */
  defaultValue: _propTypes["default"].string,

  /** 搜索框的props */
  searchProps: _propTypes["default"].object,

  /** input onChange */
  onInputChange: _propTypes["default"].func,

  /** 搜索框的宽度 */
  width: _propTypes["default"].number
});

_defineProperty(CascaderInput, "defaultProps", {
  searchProps: {
    placeholder: '请输入...'
  },
  onInputChange: function onInputChange() {},
  width: 360
});

(0, _reactLifecyclesCompat.polyfill)(CascaderInput);
var _default = CascaderInput;
exports["default"] = _default;
module.exports = exports.default;