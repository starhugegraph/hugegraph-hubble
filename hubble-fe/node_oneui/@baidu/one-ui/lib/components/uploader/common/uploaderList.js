"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _imageItem = _interopRequireDefault(require("./imageItem"));

var _modal = _interopRequireDefault(require("../../modal"));

var _fileItem = _interopRequireDefault(require("./fileItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UploadList =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(UploadList, _PureComponent);

  function UploadList() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onRemove", function (index) {
      var fileList = [].concat(_this.props.fileList);
      fileList.splice(index, 1);

      _this.props.onRemove({
        fileList: fileList,
        index: index
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPreview", function (index) {
      var _this$props = _this.props,
          fileList = _this$props.fileList,
          prefixCls = _this$props.prefixCls,
          onPreview = _this$props.onPreview;
      var currentItem = fileList[index];
      var preview = onPreview({
        file: currentItem,
        fileList: fileList,
        index: index
      });

      if (preview !== false) {
        _modal["default"].confirm({
          content: _react["default"].createElement("span", {
            className: _this.props.prefixCls + "-modal-blank"
          }, _react["default"].createElement("img", {
            src: currentItem.thumbUrl,
            alt: currentItem.name,
            className: prefixCls + "-modal-image"
          })),
          className: prefixCls + "-modal"
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onReUpload", function (index) {
      var _this$props2 = _this.props,
          fileList = _this$props2.fileList,
          onInsertImage = _this$props2.onInsertImage,
          onReUpload = _this$props2.onReUpload;
      var currentItem = fileList[index];
      var reUpload = onReUpload({
        file: currentItem,
        fileList: fileList,
        index: index
      });

      if (reUpload !== false) {
        onInsertImage(true, index);
      }
    });

    return _this;
  }

  var _proto = UploadList.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        listType = _this$props3.listType,
        fileList = _this$props3.fileList,
        showUploadListIcon = _this$props3.showUploadListIcon;
    var uploadListClassNames = (0, _classnames["default"])(prefixCls + "-list", prefixCls + "-list-" + listType);
    var Item = listType === 'file' ? _fileItem["default"] : _imageItem["default"];
    return _react["default"].createElement("div", {
      className: uploadListClassNames
    }, fileList.map(function (item, index) {
      return _react["default"].createElement(Item, _extends({}, item, {
        key: index,
        index: index,
        onRemove: _this2.onRemove,
        onPreview: _this2.onPreview,
        prefixCls: prefixCls,
        onReUpload: _this2.onReUpload,
        showUploadListIcon: showUploadListIcon
      }));
    }));
  };

  return UploadList;
}(_react.PureComponent);

_defineProperty(UploadList, "propTypes", {
  fileList: _propTypes["default"].arrayOf(Object),
  defaultFileList: _propTypes["default"].arrayOf(Object),
  prefixCls: _propTypes["default"].string.isRequired,
  listType: _propTypes["default"].oneOf(['file', 'image']).isRequired,
  onRemove: _propTypes["default"].func.isRequired,
  onPreview: _propTypes["default"].func,
  onInsertImage: _propTypes["default"].func,
  onReUpload: _propTypes["default"].func,
  showUploadListIcon: _propTypes["default"].object
});

_defineProperty(UploadList, "defaultProps", {
  onPreview: function onPreview() {},
  onInsertImage: function onInsertImage() {},
  onReUpload: function onReUpload() {}
});

(0, _reactLifecyclesCompat.polyfill)(UploadList);
var _default = UploadList;
exports["default"] = _default;
module.exports = exports.default;