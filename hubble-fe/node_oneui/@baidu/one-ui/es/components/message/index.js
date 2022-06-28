function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Notification from 'rc-notification';
import MessageContainer from './common/message';
/* eslint-disable no-unused-vars */

var defaultDuration = 3;
var defaultTop = '30%';
var messageInstance;
var key = 1;
var prefixCls = 'new-fc-one-message';
var getContainer;
var messageSize = 'small';

var getMessageInstance = function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }

  Notification.newInstance({
    prefixCls: prefixCls,
    transitionName: 'move-up',
    style: {
      top: defaultTop
    },
    // 覆盖原来的样式
    getContainer: getContainer
  }, function (instance) {
    if (messageInstance) {
      callback(messageInstance);
      return;
    }

    messageInstance = instance;
    callback(instance);
  });
};

var notice = function notice(props) {
  var duration = props.duration !== undefined ? props.duration : defaultDuration;
  var target = key++;
  var closePromise = new Promise(function (resolve) {
    var callback = function callback() {
      if (typeof props.onClose === 'function') {
        props.onClose();
      }

      return resolve(true);
    };

    getMessageInstance(function (instance) {
      var title = props.title,
          content = props.content,
          type = props.type,
          _props$showCloseIcon = props.showCloseIcon,
          showCloseIcon = _props$showCloseIcon === void 0 ? true : _props$showCloseIcon;
      var size = props.size || messageSize;
      var messageProps = {
        prefixCls: prefixCls,
        type: type,
        title: title,
        size: size,
        instance: instance,
        target: target,
        content: content,
        showCloseIcon: showCloseIcon
      };
      instance.notice({
        key: target,
        duration: duration,
        style: props.style ? props.style : {},
        content: React.createElement(MessageContainer, messageProps),
        onClose: callback
      });
    });
  });

  var result = function result() {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };

  result.then = function (filled, rejected) {
    return closePromise.then(filled, rejected);
  };

  result.promise = closePromise;
  return result;
};

export default {
  info: function info(props) {
    return notice(_extends({
      type: 'info'
    }, props));
  },
  success: function success(props) {
    return notice(_extends({
      type: 'success'
    }, props));
  },
  error: function error(props) {
    return notice(_extends({
      type: 'error'
    }, props));
  },
  warning: function warning(props) {
    return notice(_extends({
      type: 'warning'
    }, props));
  },
  loading: function loading(props) {
    return notice(_extends({
      type: 'loading'
    }, props));
  },
  config: function config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }

    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }

    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }

    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }

    if (options.size !== undefined) {
      messageSize = options.size;
    }
  },
  destroy: function destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  }
};