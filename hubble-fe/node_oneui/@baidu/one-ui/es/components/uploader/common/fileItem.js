function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import Icon from '../../icon';
import Progress from '../../progress';
import Popover from '../../popover';
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
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        status = _this$props.status,
        name = _this$props.name,
        progressStep = _this$props.progressStep,
        errorMessage = _this$props.errorMessage,
        onRemove = _this$props.onRemove,
        index = _this$props.index;
    var itemClassNames = classNames(prefixCls + "-file-item", prefixCls + "-file-item-" + status);
    var flagIcon = null;

    if (status === originStatus.SUCCESS) {
      flagIcon = React.createElement(Icon, {
        className: prefixCls + "-file-item-success-icon",
        type: "success"
      });
    } else if (status === originStatus.ERROR) {
      flagIcon = React.createElement(Icon, {
        className: prefixCls + "-file-item-fail-icon",
        type: "fail"
      });
    }

    var item = React.createElement("div", {
      className: itemClassNames
    }, React.createElement(Icon, {
      className: prefixCls + "-file-item-file-icon",
      type: "file"
    }), name, status === originStatus.UPLOADING ? React.createElement(Progress, {
      size: "small",
      percent: progressStep,
      showInfo: false,
      className: prefixCls + "-file-item-progress"
    }) : null, React.createElement("span", {
      className: prefixCls + "-file-item-flag"
    }, flagIcon), React.createElement("span", {
      className: prefixCls + "-file-item-close",
      onClick: partial(onRemove, index)
    }, React.createElement(Icon, {
      className: prefixCls + "-file-item-close-icon",
      type: "close"
    })));
    return status === originStatus.ERROR && errorMessage && errorMessage.length ? React.createElement(Popover, {
      content: errorMessage.join('，'),
      overlayClassName: prefixCls + "-file-item-popover"
    }, item) : item;
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
  index: PropTypes.number.isRequired
});

export { FileItem as default };