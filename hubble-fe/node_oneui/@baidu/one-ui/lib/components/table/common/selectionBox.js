"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _radio = _interopRequireDefault(require("../../radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SelectionBox =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(SelectionBox, _PureComponent);

  function SelectionBox(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getCheckState", function (props) {
      var store = props.store,
          defaultSelection = props.defaultSelection,
          rowIndex = props.rowIndex;
      var checked = false;

      if (store.getState().selectionDirty) {
        checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 || defaultSelection.indexOf(rowIndex) >= 0;
      }

      return checked;
    });

    _this.state = {
      checked: _this.getCheckState(_props)
    };
    return _this;
  }

  var _proto = SelectionBox.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.subscribe();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  };

  _proto.subscribe = function subscribe() {
    var _this2 = this;

    var store = this.props.store;
    this.unsubscribe = store.subscribe(function () {
      var checked = _this2.getCheckState(_this2.props);

      _this2.setState({
        checked: checked
      });
    });
  };

  _proto.render = function render() {
    var _this$props = this.props,
        type = _this$props.type,
        rowIndex = _this$props.rowIndex,
        disabled = _this$props.disabled,
        indeterminate = _this$props.indeterminate,
        onChange = _this$props.onChange;
    var checked = this.state.checked;

    if (type === 'radio') {
      return _react["default"].createElement(_radio["default"], {
        disabled: disabled,
        onChange: onChange,
        value: rowIndex,
        checked: checked
      });
    }

    return _react["default"].createElement(_checkbox["default"], {
      indeterminate: indeterminate,
      checked: checked,
      disabled: disabled,
      onChange: onChange
    });
  };

  return SelectionBox;
}(_react.PureComponent);

exports["default"] = SelectionBox;

_defineProperty(SelectionBox, "propTypes", {
  store: _propTypes["default"].object,
  type: _propTypes["default"].string,

  /* eslint-disable react/no-unused-prop-types */
  defaultSelection: _propTypes["default"].arrayOf(_propTypes["default"].string),
  rowIndex: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  disabled: _propTypes["default"].bool,
  indeterminate: _propTypes["default"].bool,
  onChange: _propTypes["default"].func
});

module.exports = exports.default;