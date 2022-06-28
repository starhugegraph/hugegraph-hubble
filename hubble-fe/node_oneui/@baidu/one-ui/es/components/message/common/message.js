function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from 'component-classes';
import Icon from '../../icon';
var minHeightMap = {
  small: 32,
  medium: 36
};
var IconInfo = {
  info: React.createElement(Icon, {
    type: "info"
  }),
  warning: React.createElement(Icon, {
    type: "warning"
  }),
  success: React.createElement(Icon, {
    type: "success"
  }),
  error: React.createElement(Icon, {
    type: "fail"
  }),
  loading: React.createElement(Icon, {
    type: "loading"
  })
};

var Message =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Message, _PureComponent);

  function Message() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$props = _this.props,
          size = _this$props.size,
          prefixCls = _this$props.prefixCls;
      var height = _this.messageRef.offsetHeight;
      var minHeight = minHeightMap[size];

      if (height > minHeight) {
        var dom = classes(_this.messageRef);
        dom.add(prefixCls + "-multiple-line");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (ref) {
      _this.messageRef = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _classNames;

      var _this$props2 = _this.props,
          prefixCls = _this$props2.prefixCls,
          type = _this$props2.type,
          title = _this$props2.title,
          size = _this$props2.size,
          instance = _this$props2.instance,
          target = _this$props2.target,
          content = _this$props2.content,
          showCloseIcon = _this$props2.showCloseIcon;
      var wrapClass = classNames((_classNames = {}, _classNames[prefixCls + "-" + type] = type, _classNames[prefixCls + "-header"] = !!title, _classNames[prefixCls + "-widthout-header"] = !title, _classNames), prefixCls + "-custom-content", prefixCls + "-" + size);

      var removeNotice = function removeNotice() {
        if (instance) {
          instance.removeNotice(target);
        }
      };

      var iconNode = IconInfo[type];
      return React.createElement("div", {
        className: wrapClass,
        ref: _this.saveRef
      }, showCloseIcon && React.createElement("span", {
        className: prefixCls + "-close-icon"
      }, React.createElement(Icon, {
        type: "close",
        onClick: removeNotice
      })), iconNode, React.createElement("div", {
        className: prefixCls + "-container"
      }, title ? React.createElement("div", {
        className: prefixCls + "-container-header"
      }, title) : null, content ? React.createElement("div", {
        className: prefixCls + "-container-content"
      }, content) : null));
    });

    return _this;
  }

  return Message;
}(PureComponent);

_defineProperty(Message, "propTypes", {
  prefixCls: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.string,
  instance: PropTypes.object,
  target: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  showCloseIcon: PropTypes.bool
});

export { Message as default };