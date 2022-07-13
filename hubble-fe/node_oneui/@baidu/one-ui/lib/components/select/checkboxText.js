"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _searchText = _interopRequireDefault(require("./searchText"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CheckboxText =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(CheckboxText, _PureComponent);

  function CheckboxText(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var searchValue = _this.state.searchValue;
      var newState = {};

      if ('searchValue' in nextProps && searchValue !== nextProps.searchValue) {
        newState.searchValue = nextProps.searchValue;
      }

      if ('source' in nextProps) {
        newState.source = nextProps.source;
      }

      if ('checked' in nextProps) {
        newState.checked = nextProps.checked;
      }

      _this.setState(newState);
    });

    _this.state = {
      searchValue: props.searchValue,
      source: props.source,
      checked: false
    };
    return _this;
  }

  var _proto = CheckboxText.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        text = _this$props.text,
        value = _this$props.value,
        label = _this$props.label,
        disabled = _this$props.disabled,
        disabledReason = _this$props.disabledReason,
        disablePlacement = _this$props.disablePlacement;
    var searchLabel = text || label;
    var _this$state = this.state,
        searchValue = _this$state.searchValue,
        source = _this$state.source;
    var searchTextProps = {
      text: searchLabel,
      showSearch: true,
      searchValue: searchValue
    };
    var checked = false;

    if (source.indexOf(value) > -1) {
      checked = true;
    }

    if ('checked' in this.props) {
      checked = this.state.checked;
    }

    var checkboxTextDom = _react["default"].createElement("span", null, _react["default"].createElement(_checkbox["default"], {
      checked: checked,
      disabled: disabled
    }), _react["default"].createElement(_searchText["default"], _extends({}, searchTextProps, {
      disabled: disabled
    })));

    return disabled && disabledReason ? _react["default"].createElement(_tooltip["default"], {
      title: disabledReason,
      placement: disablePlacement
    }, checkboxTextDom) : checkboxTextDom;
  };

  return CheckboxText;
}(_react.PureComponent);

exports["default"] = CheckboxText;

_defineProperty(CheckboxText, "isCheckboxText", true);

_defineProperty(CheckboxText, "propTypes", {
  searchValue: _propTypes["default"].string,
  text: _propTypes["default"].string,
  source: _propTypes["default"].array,
  value: _propTypes["default"].string,
  label: _propTypes["default"].string,
  checked: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  disabledReason: _propTypes["default"].string,
  disablePlacement: _propTypes["default"].string
});

_defineProperty(CheckboxText, "defaultProps", {
  searchValue: '',
  source: [],
  disablePlacement: 'right',
  disabled: false
});

module.exports = exports.default;