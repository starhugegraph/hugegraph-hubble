function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import ImageItem from './imageItem';
import Modal from '../../modal';
import FileItem from './fileItem';

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
        Modal.confirm({
          content: React.createElement("span", {
            className: _this.props.prefixCls + "-modal-blank"
          }, React.createElement("img", {
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
    var uploadListClassNames = classNames(prefixCls + "-list", prefixCls + "-list-" + listType);
    var Item = listType === 'file' ? FileItem : ImageItem;
    return React.createElement("div", {
      className: uploadListClassNames
    }, fileList.map(function (item, index) {
      return React.createElement(Item, _extends({}, item, {
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
}(PureComponent);

_defineProperty(UploadList, "propTypes", {
  fileList: PropTypes.arrayOf(Object),
  defaultFileList: PropTypes.arrayOf(Object),
  prefixCls: PropTypes.string.isRequired,
  listType: PropTypes.oneOf(['file', 'image']).isRequired,
  onRemove: PropTypes.func.isRequired,
  onPreview: PropTypes.func,
  onInsertImage: PropTypes.func,
  onReUpload: PropTypes.func,
  showUploadListIcon: PropTypes.object
});

_defineProperty(UploadList, "defaultProps", {
  onPreview: function onPreview() {},
  onInsertImage: function onInsertImage() {},
  onReUpload: function onReUpload() {}
});

polyfill(UploadList);
export default UploadList;