function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconImageAdd, IconEye, IconTrash, IconUpload } from '@baidu/one-ui-icon';
import partial from 'lodash/partial';
import Progress from '../../progress';
import Popover from '../../popover';
import Icon from '../../icon';
import { originStatus } from '../../../core/uploaderTools';

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
    var itemClassNames = classNames(prefixCls + "-image-item", prefixCls + "-image-item-" + status);
    var showPreview = status === originStatus.SUCCESS && thumbUrl && showUploadListIcon && showUploadListIcon.showPreviewIcon;
    var showReUpload = (status === originStatus.SUCCESS || status === originStatus.ERROR) && showUploadListIcon && showUploadListIcon.showReUploadIcon;
    var showDelete = showUploadListIcon && showUploadListIcon.showRemoveOnIcon;
    var iconContainer = customUploadListIcon || React.createElement("div", {
      className: classNames(prefixCls + "-image-item-card-operation", (_classNames = {}, _classNames[prefixCls + "-image-item-card-operation-hide"] = !(showPreview || showReUpload || showDelete), _classNames))
    }, React.createElement("div", {
      className: prefixCls + "-image-item-card-operation-mask"
    }), React.createElement("div", {
      className: prefixCls + "-image-item-card-operation-icons"
    }, showPreview ? React.createElement(IconEye, {
      onClick: partial(onPreview, index)
    }) : null, showReUpload ? React.createElement(IconUpload, {
      onClick: partial(onReUpload, index)
    }) : null, showDelete ? React.createElement(IconTrash, {
      onClick: partial(onRemove, index)
    }) : null));
    return React.createElement("div", {
      className: itemClassNames
    }, React.createElement("div", {
      className: classNames(prefixCls + "-image-item-card", (_classNames2 = {}, _classNames2[prefixCls + "-image-item-card-hide"] = !(showPreview || showReUpload || showDelete), _classNames2))
    }, status === originStatus.WAITING || status === originStatus.ERROR ? React.createElement(IconImageAdd, null) : null, status === originStatus.UPLOADING ? React.createElement("div", {
      className: prefixCls + "-image-item-uploading-container"
    }, React.createElement("div", {
      className: prefixCls + "-image-item-uploading-text"
    }, "\u4E0A\u4F20\u4E2D"), React.createElement(Progress, {
      size: "small",
      percent: progressStep,
      showInfo: false,
      className: prefixCls + "-image-item-progress"
    })) : null, status === originStatus.SUCCESS ? React.createElement("span", {
      className: prefixCls + "-image-item-thumbUrl"
    }, thumbUrl ? React.createElement("img", {
      src: thumbUrl,
      alt: name,
      className: prefixCls + "-image-item-thumbUrl-image"
    }) : React.createElement(IconImageAdd, null)) : null, iconContainer), errorMessage && errorMessage.length ? React.createElement("div", {
      className: prefixCls + "-image-item-error-message"
    }, React.createElement("span", {
      className: prefixCls + "-image-item-error-message-tip"
    }, "\u4E0A\u4F20\u5931\u8D25\u539F\u56E0"), React.createElement(Popover, {
      content: errorMessage.join('，'),
      overlayClassName: prefixCls + "-file-item-popover"
    }, React.createElement(Icon, {
      type: "question"
    }))) : null);
  };

  return FileItem;
}(PureComponent);

_defineProperty(FileItem, "propTypes", {
  status: PropTypes.string,
  errorMessage: PropTypes.array,
  name: PropTypes.string,
  progressStep: PropTypes.number,
  onRemove: PropTypes.func.isRequired,
  prefixCls: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string,
  customUploadListIcon: PropTypes.node,
  onPreview: PropTypes.func.isRequired,
  onReUpload: PropTypes.func.isRequired,
  showUploadListIcon: PropTypes.object
});

_defineProperty(FileItem, "defaultProps", {
  thumbUrl: ''
});

export { FileItem as default };