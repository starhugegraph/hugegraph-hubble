"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _icon = _interopRequireDefault(require("../../icon"));

var _progress = _interopRequireDefault(require("../../progress"));

var _popover = _interopRequireDefault(require("../../popover"));

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
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        status = _this$props.status,
        name = _this$props.name,
        progressStep = _this$props.progressStep,
        errorMessage = _this$props.errorMessage,
        onRemove = _this$props.onRemove,
        index = _this$props.index;
    var itemClassNames = (0, _classnames["default"])(prefixCls + "-file-item", prefixCls + "-file-item-" + status);
    var flagIcon = null;

    if (status === _uploaderTools.originStatus.SUCCESS) {
      flagIcon = _react["default"].createElement(_icon["default"], {
        className: prefixCls + "-file-item-success-icon",
        type: "success"
      });
    } else if (status === _uploaderTools.originStatus.ERROR) {
      flagIcon = _react["default"].createElement(_icon["default"], {
        className: prefixCls + "-file-item-fail-icon",
        type: "fail"
      });
    }

    var item = _react["default"].createElement("div", {
      className: itemClassNames
    }, _react["default"].createElement(_icon["default"], {
      className: prefixCls + "-file-item-file-icon",
      type: "file"
    }), name, status === _uploaderTools.originStatus.UPLOADING ? _react["default"].createElement(_progress["default"], {
      size: "small",
      percent: progressStep,
      showInfo: false,
      className: prefixCls + "-file-item-progress"
    }) : null, _react["default"].createElement("span", {
      className: prefixCls + "-file-item-flag"
    }, flagIcon), _react["default"].createElement("span", {
      className: prefixCls + "-file-item-close",
      onClick: (0, _partial["default"])(onRemove, index)
    }, _react["default"].createElement(_icon["default"], {
      className: prefixCls + "-file-item-close-icon",
      type: "close"
    })));

    return status === _uploaderTools.originStatus.ERROR && errorMessage && errorMessage.length ? _react["default"].createElement(_popover["default"], {
      content: errorMessage.join('，'),
      overlayClassName: prefixCls + "-file-item-popover"
    }, item) : item;
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
  index: _propTypes["default"].number.isRequired
});

module.exports = exports.default;