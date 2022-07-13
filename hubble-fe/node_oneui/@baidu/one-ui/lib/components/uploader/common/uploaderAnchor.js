"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _imageAnchor = _interopRequireDefault(require("./imageAnchor"));

var _fileAnchor = _interopRequireDefault(require("./fileAnchor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UploaderAnchor =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(UploaderAnchor, _PureComponent);

  function UploaderAnchor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "inputRef", function (ref) {
      _this.uploadInputRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "onClickAnchor", function () {
      _this.uploadInputRef.value = '';

      _this.uploadInputRef.click();

      _this.props.onClickAnchor();
    });

    return _this;
  }

  var _proto = UploaderAnchor.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        disabled = _this$props.disabled,
        listType = _this$props.listType,
        CustomUploadAnchor = _this$props.CustomUploadAnchor,
        helperTextPostion = _this$props.helperTextPostion,
        inputControlName = _this$props.inputControlName,
        accept = _this$props.accept,
        multiple = _this$props.multiple,
        onChange = _this$props.onChange,
        loading = _this$props.loading,
        maxSize = _this$props.maxSize;
    var uploadAnchorClassName = (0, _classnames["default"])(prefixCls + "-anchor", (_classNames = {}, _classNames[prefixCls + "-anchor-disabled"] = disabled, _classNames), prefixCls + "-anchor-" + listType);
    var inputClassName = (0, _classnames["default"])(prefixCls + "-input", (_classNames2 = {}, _classNames2[prefixCls + "-input-disabled"] = disabled, _classNames2));
    var AnchorDom = listType === 'file' ? _fileAnchor["default"] : _imageAnchor["default"];

    if (CustomUploadAnchor) {
      AnchorDom = CustomUploadAnchor;
    }

    var inputProps = {
      ref: this.inputRef,
      type: 'file',
      name: inputControlName,
      className: inputClassName,
      multiple: multiple,
      onChange: onChange,
      disabled: disabled,
      accept: accept.join(',')
    };

    if (accept.length === 1 && accept[0] === '*') {
      delete inputProps.accept;
    }

    var anchorProps = {
      onClick: this.onClickAnchor,
      loading: loading,
      disabled: disabled,
      prefixCls: prefixCls,
      maxSize: maxSize,
      helperTextPostion: helperTextPostion
    };
    return _react["default"].createElement("div", {
      className: uploadAnchorClassName
    }, _react["default"].createElement(AnchorDom, anchorProps), _react["default"].createElement("input", inputProps));
  };

  return UploaderAnchor;
}(_react.PureComponent);

exports["default"] = UploaderAnchor;

_defineProperty(UploaderAnchor, "propTypes", {
  accept: _propTypes["default"].array,
  onChange: _propTypes["default"].func,
  inputControlName: _propTypes["default"].string.isRequired,
  multiple: _propTypes["default"].bool.isRequired,
  CustomUploadAnchor: _propTypes["default"].node,
  listType: _propTypes["default"].string.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  loading: _propTypes["default"].bool.isRequired,
  maxSize: _propTypes["default"].number,
  helperTextPostion: _propTypes["default"].string.isRequired,
  onClickAnchor: _propTypes["default"].func
});

_defineProperty(UploaderAnchor, "defaultProps", {
  onClickAnchor: function onClickAnchor() {}
});

module.exports = exports.default;