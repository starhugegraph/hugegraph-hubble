function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IconClose, IconRefresh } from '@baidu/one-ui-icon';

var Line =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Line, _PureComponent);

  function Line() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderOperation", function () {
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          showRetry = _this$props.showRetry,
          showCancel = _this$props.showCancel,
          onRetry = _this$props.onRetry,
          onCancel = _this$props.onCancel;

      if (!showRetry && !showCancel) {
        return null;
      }

      var cancelProps = {
        type: 'close',
        title: '取消',
        onClick: onCancel
      };
      var retryProps = {
        type: 'refresh',
        title: '刷新',
        onClick: onRetry
      };
      return React.createElement("span", {
        className: prefixCls + "-operation"
      }, showRetry ? React.createElement(IconRefresh, retryProps) : null, showCancel ? React.createElement(IconClose, cancelProps) : null);
    });

    return _this;
  }

  var _proto = Line.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        percent = _this$props2.percent,
        strokeWidth = _this$props2.strokeWidth,
        strokeColor = _this$props2.strokeColor,
        trailColor = _this$props2.trailColor,
        strokeLinecap = _this$props2.strokeLinecap,
        width = _this$props2.width,
        children = _this$props2.children;
    var borderRadius = strokeLinecap === 'square' ? 0 : null;
    var outerStyle = {
      width: width
    };
    var percentStyle = {
      width: percent + "%",
      height: strokeWidth,
      borderRadius: borderRadius,
      background: strokeColor
    };
    var trailStyle = {
      borderRadius: borderRadius,
      backgroundColor: trailColor
    };
    return React.createElement("div", null, React.createElement("div", {
      className: prefixCls + "-outer",
      style: outerStyle
    }, React.createElement("div", {
      className: prefixCls + "-inner",
      style: trailStyle
    }, React.createElement("div", {
      className: prefixCls + "-bg",
      style: percentStyle
    }))), children, this.renderOperation());
  };

  return Line;
}(PureComponent);

_defineProperty(Line, "propTypes", {
  prefixCls: PropTypes.string,
  percent: PropTypes.number,
  strokeLinecap: PropTypes.string,
  strokeColor: PropTypes.string,
  trailColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  showRetry: PropTypes.bool,
  showCancel: PropTypes.bool,
  onRetry: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node
});

_defineProperty(Line, "defaultProps", {
  prefixCls: 'new-fc-one-progress',
  percent: 0,
  strokeLinecap: 'round',
  strokeColor: '',
  trailColor: '',
  showRetry: false,
  showCancel: false
});

export { Line as default };