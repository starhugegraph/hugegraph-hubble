"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _partial = _interopRequireDefault(require("lodash/partial"));

var _progress = _interopRequireDefault(require("../../progress"));

var _popover = _interopRequireDefault(require("../../popover"));

var _icon = _interopRequireDefault(require("../../icon"));

var _uploaderTools = require("../../../core/uploaderTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileItem =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(FileItem, _PureComponent);

  function FileItem() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = FileItem.prototype;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        status = _this$props.status,
        name = _this$props.name,
        progressStep = _this$props.progressStep,
        thumbUrl = _this$props.thumbUrl,
        customUploadListIcon = _this$props.customUploadListIcon,
        errorMessage = _this$props.errorMessage,
        onRemove = _this$props.onRemove,
        index = _this$props.index,
        onPreview = _this$props.onPreview,
        onReUpload = _this$props.onReUpload,
        showUploadListIcon = _this$props.showUploadListIcon;
    var itemClassNames = (0, _classnames["default"])(prefixCls + "-image-item", prefixCls + "-image-item-" + status);
    var showPreview = status === _uploaderTools.originStatus.SUCCESS && thumbUrl && showUploadListIcon && showUploadListIcon.showPreviewIcon;
    var showReUpload = (status === _uploaderTools.originStatus.SUCCESS || status === _uploaderTools.originStatus.ERROR) && showUploadListIcon && showUploadListIcon.showReUploadIcon;
    var showDelete = showUploadListIcon && showUploadListIcon.showRemoveOnIcon;

    var iconContainer = customUploadListIcon || _react["default"].createElement("div", {
      className: (0, _classnames["default"])(prefixCls + "-image-item-card-operation", (_classNames = {}, _classNames[prefixCls + "-image-item-card-operation-hide"] = !(showPreview || showReUpload || showDelete), _classNames))
    }, _react["default"].createElement("div", {
      className: prefixCls + "-image-item-card-operation-mask"
    }), _react["default"].createElement("div", {
      className: prefixCls + "-image-item-card-operation-icons"
    }, showPreview ? _react["default"].createElement(_oneUiIcon.IconEye, {
      onClick: (0, _partial["default"])(onPreview, index)
    }) : null, showReUpload ? _react["default"].createElement(_oneUiIcon.IconUpload, {
      onClick: (0, _partial["default"])(onReUpload, index)
    }) : null, showDelete ? _react["default"].createElement(_oneUiIcon.IconTrash, {
      onClick: (0, _partial["default"])(onRemove, index)
    }) : null));

    return _react["default"].createElement("div", {
      className: itemClassNames
    }, _react["default"].createElement("div", {
      className: (0, _classnames["default"])(prefixCls + "-image-item-card", (_classNames2 = {}, _classNames2[prefixCls + "-image-item-card-hide"] = !(showPreview || showReUpload || showDelete), _classNames2))
    }, status === _uploaderTools.originStatus.WAITING || status === _uploaderTools.originStatus.ERROR ? _react["default"].createElement(_oneUiIcon.IconImageAdd, null) : null, status === _uploaderTools.originStatus.UPLOADING ? _react["default"].createElement("div", {
      className: prefixCls + "-image-item-uploading-container"
    }, _react["default"].createElement("div", {
      className: prefixCls + "-image-item-uploading-text"
    }, "\u4E0A\u4F20\u4E2D"), _react["default"].createElement(_progress["default"], {
      size: "small",
      percent: progressStep,
      showInfo: false,
      className: prefixCls + "-image-item-progress"
    })) : null, status === _uploaderTools.originStatus.SUCCESS ? _react["default"].createElement("span", {
      className: prefixCls + "-image-item-thumbUrl"
    }, thumbUrl ? _react["default"].createElement("img", {
      src: thumbUrl,
      alt: name,
      className: prefixCls + "-image-item-thumbUrl-image"
    }) : _react["default"].createElement(_oneUiIcon.IconImageAdd, null)) : null, iconContainer), errorMessage && errorMessage.length ? _react["default"].createElement("div", {
      className: prefixCls + "-image-item-error-message"
    }, _react["default"].createElement("span", {
      className: prefixCls + "-image-item-error-message-tip"
    }, "\u4E0A\u4F20\u5931\u8D25\u539F\u56E0"), _react["default"].createElement(_popover["default"], {
      content: errorMessage.join('，'),
      overlayClassName: prefixCls + "-file-item-popover"
    }, _react["default"].createElement(_icon["default"], {
      type: "question"
    }))) : null);
  };

  return FileItem;
}(_react.PureComponent);

exports["default"] = FileItem;

_defineProperty(FileItem, "propTypes", {
  status: _propTypes["default"].string,
  errorMessage: _propTypes["default"].array,
  name: _propTypes["default"].string,
  progressStep: _propTypes["default"].number,
  onRemove: _propTypes["default"].func.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  index: _propTypes["default"].number.isRequired,
  thumbUrl: _propTypes["default"].string,
  customUploadListIcon: _propTypes["default"].node,
  onPreview: _propTypes["default"].func.isRequired,
  onReUpload: _propTypes["default"].func.isRequired,
  showUploadListIcon: _propTypes["default"].object
});

_defineProperty(FileItem, "defaultProps", {
  thumbUrl: ''
});

module.exports = exports.default;