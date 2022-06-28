function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import classes from 'component-classes';
import { IconClose, IconCheckCircle, IconExclamationCircle, IconTimesCircle, IconInfoCircle } from '@baidu/one-ui-icon';
import Icon from '../icon';
var defaultHeight = 32;

var Alert =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Alert, _PureComponent);

  function Alert(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.setDomClassByHeight();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.setDomClassByHeight();
    });

    _defineProperty(_assertThisInitialized(_this), "setDomClassByHeight", function () {
      var alertContentRef = _this.alertContentRef;
      var alertRef = _this.alertRef;

      if (!alertContentRef || !alertRef) {
        return null;
      }

      var height = alertContentRef.offsetHeight;
      var multipleClassName = _this.props.prefixCls + "-multiple";
      var singleClassName = _this.props.prefixCls + "-single";
      var dom = classes(alertRef);

      if (height > defaultHeight) {
        dom.remove(singleClassName);
        dom.add(multipleClassName);
      } else if (dom.has(multipleClassName)) {
        dom.remove(multipleClassName);
        dom.add(singleClassName);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHandleClose", function (e) {
      e.preventDefault();

      if (!('visble' in _this.props)) {
        _this.setState({
          visible: false
        });
      }

      var onClose = _this.props.onClose;

      if (onClose) {
        onClose(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (type) {
      return function (ref) {
        _this[type] = ref;
      };
    });

    _this.state = {
      visible: props.visible || true
    };
    return _this;
  }

  var _proto = Alert.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props = this.props,
        className = _this$props.className,
        prefixCls = _this$props.prefixCls,
        style = _this$props.style,
        showIcon = _this$props.showIcon,
        icon = _this$props.icon,
        type = _this$props.type,
        content = _this$props.content,
        closable = _this$props.closable,
        title = _this$props.title,
        size = _this$props.size;
    var visible = this.state.visible;

    if (!visible) {
      return null;
    }

    var iconNode = null;

    if (!icon) {
      switch (type) {
        case 'success':
          iconNode = React.createElement(IconCheckCircle, null);
          break;

        case 'info':
          iconNode = React.createElement(IconInfoCircle, null);
          break;

        case 'error':
          iconNode = React.createElement(IconTimesCircle, null);
          break;

        case 'warning':
          iconNode = React.createElement(IconExclamationCircle, null);
          break;

        default:
          iconNode = null;
      }
    } else if (typeof icon === 'string') {
      iconNode = React.createElement(Icon, {
        type: icon
      });
    } else if (React.isValidElement(icon)) {
      iconNode = icon;
    }

    var alertCls = classNames(prefixCls, prefixCls + "-" + type, prefixCls + "-" + size, (_classNames = {}, _classNames[prefixCls + "-no-title"] = !title, _classNames[prefixCls + "-with-title"] = !!title, _classNames[prefixCls + "-show-icon"] = showIcon, _classNames[prefixCls + "-has-close-icon"] = closable, _classNames), className);
    var closeIcon = closable ? React.createElement("span", {
      onClick: this.onHandleClose,
      className: prefixCls + "-close-icon"
    }, React.createElement(IconClose, null)) : null;
    return React.createElement("div", {
      className: alertCls,
      style: style,
      ref: this.saveRef('alertRef')
    }, showIcon ? React.createElement("span", {
      className: prefixCls + "-icon"
    }, iconNode) : null, React.createElement("div", null, title ? React.createElement("div", {
      className: prefixCls + "-title"
    }, title) : null, React.createElement("div", {
      className: prefixCls + "-content",
      ref: this.saveRef('alertContentRef')
    }, content)), closeIcon);
  };

  return Alert;
}(PureComponent);

_defineProperty(Alert, "propTypes", {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
  showIcon: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(['small', 'medium'])
});

_defineProperty(Alert, "defaultProps", {
  onClose: function onClose() {},
  prefixCls: 'new-fc-one-alert',
  className: '',
  style: {},
  type: 'info',
  size: 'medium'
});

_defineProperty(Alert, "getDerivedStateFromProps", function (nextProps, prevState) {
  if ('visible' in nextProps && nextProps.visible !== prevState.visible) {
    return {
      visible: nextProps.visible
    };
  }

  return null;
});

polyfill(Alert);
export default Alert;