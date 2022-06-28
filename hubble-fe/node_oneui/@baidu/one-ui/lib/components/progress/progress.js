"use strict";

exports.__esModule = true;
exports["default"] = exports.PROGRESS_STATUS_MAP = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _values = _interopRequireDefault(require("lodash/values"));

var _icon = _interopRequireDefault(require("../icon"));

var _line = _interopRequireDefault(require("./common/line"));

var _circle = _interopRequireDefault(require("./common/circle"));

var _commonTools = require("../../core/commonTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PROGRESS_STATUS_MAP = {
  NORMAL: 'normal',
  EXCEPTION: 'exception',
  SUCCESS: 'success'
};
exports.PROGRESS_STATUS_MAP = PROGRESS_STATUS_MAP;
var ProgressStatuses = (0, _values["default"])(PROGRESS_STATUS_MAP);
var strokeWidthMap = {
  medium: 8,
  small: 4
};

var validProgress = function validProgress(progress) {
  if (!progress || progress < 0) {
    return 0;
  }

  if (progress > 100) {
    return 100;
  }

  return progress;
};

var Progress =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Progress, _PureComponent);

  function Progress() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "getProgressStatus", function () {
      var _this$props = _this.props,
          status = _this$props.status,
          percent = _this$props.percent;

      if (ProgressStatuses.indexOf(status) < 0 && percent >= 100) {
        return 'success';
      }

      return status || 'normal';
    });

    _defineProperty(_assertThisInitialized(_this), "renderProcessInfo", function (prefixCls, progressStatus) {
      var _this$props2 = _this.props,
          showInfo = _this$props2.showInfo,
          format = _this$props2.format,
          type = _this$props2.type,
          percent = _this$props2.percent;

      if (!showInfo) {
        return null;
      }

      var text;

      var textFormatter = format || function (percentNumber) {
        return percentNumber + "%";
      };

      if (format || progressStatus !== 'exception' && progressStatus !== 'success') {
        text = textFormatter(validProgress(percent));
      } else if (progressStatus === 'exception') {
        text = _react["default"].createElement(_icon["default"], {
          type: type === 'line' ? 'fail' : 'close'
        });
      } else if (progressStatus === 'success') {
        text = _react["default"].createElement(_icon["default"], {
          type: type === 'line' ? 'success' : 'check'
        });
      }

      return _react["default"].createElement("span", {
        className: prefixCls + "-text",
        title: typeof text === 'string' ? text : undefined
      }, text);
    });

    return _this;
  }

  var _proto = Progress.prototype;

  _proto.render = function render() {
    var _classNames;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        className = _this$props3.className,
        type = _this$props3.type,
        showInfo = _this$props3.showInfo,
        percent = _this$props3.percent,
        strokeLinecap = _this$props3.strokeLinecap,
        strokeColor = _this$props3.strokeColor,
        strokeWidth = _this$props3.strokeWidth,
        width = _this$props3.width,
        trailColor = _this$props3.trailColor,
        onRetry = _this$props3.onRetry,
        onCancel = _this$props3.onCancel;
    var size = (0, _commonTools.transSizeOfDefault)(this.props.size, 'medium');
    var progressStatus = this.getProgressStatus();
    var classString = (0, _classnames["default"])(prefixCls, className, [prefixCls + "-" + type], [prefixCls + "-status-" + progressStatus], (_classNames = {}, _classNames[prefixCls + "-show-info"] = showInfo, _classNames[prefixCls + "-" + size] = size, _classNames[prefixCls + "-show-operation"] = onRetry || onCancel, _classNames));
    var validPercent = validProgress(percent);
    var lineProps = {
      prefixCls: prefixCls,
      percent: validPercent,
      strokeLinecap: strokeLinecap,
      strokeColor: strokeColor,
      trailColor: trailColor,
      width: width,
      strokeWidth: strokeWidth || strokeWidthMap[size],
      showRetry: onRetry && progressStatus === PROGRESS_STATUS_MAP.EXCEPTION,
      showCancel: onCancel && progressStatus !== PROGRESS_STATUS_MAP.EXCEPTION && progressStatus !== PROGRESS_STATUS_MAP.SUCCESS,
      onRetry: onRetry,
      onCancel: onCancel
    };
    var circleProps = {
      prefixCls: prefixCls,
      percent: validPercent,
      strokeLinecap: strokeLinecap,
      strokeColor: strokeColor,
      strokeWidth: strokeWidth || strokeWidthMap[size],
      width: width,
      trailColor: trailColor
    };
    var progressInfo = this.renderProcessInfo(prefixCls, progressStatus);
    return _react["default"].createElement("div", {
      className: classString
    }, type === 'line' ? _react["default"].createElement(_line["default"], lineProps, progressInfo) : null, type === 'circle' ? _react["default"].createElement(_circle["default"], circleProps, progressInfo) : null);
  };

  return Progress;
}(_react.PureComponent);

exports["default"] = Progress;

_defineProperty(Progress, "propTypes", {
  /** 样式前缀 */
  prefixCls: _propTypes["default"].string,

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /**
   * 类型，默认为line，可选值如下：
   * line 进度条
   * circle 进度环
   */
  type: _propTypes["default"].string,

  /**
   * 尺寸，默认为medium，可选值如下：
   * medium 默认中号
   * small 小号
   */
  size: _propTypes["default"].oneOf(['small', 'medium']),

  /** 百分比 */
  percent: _propTypes["default"].number,

  /** 内容的模板函数 */
  format: _propTypes["default"].func,

  /** 是否显示进度数值或状态图标 */
  showInfo: _propTypes["default"].bool,

  /**
   * 状态，默认为normal，可选值如下：
   * success 完成
   * exception 报错
   * normal 进行中
   */
  status: _propTypes["default"].oneOf(ProgressStatuses),

  /**
   * 进度条边缘的形状，默认为round，可选值如下：
   * round 圆角
   * square 直角
   */
  strokeLinecap: _propTypes["default"].string,

  /** 进度条颜色 */
  strokeColor: _propTypes["default"].string,

  /** 进度条线的宽度，单位 px */
  strokeWidth: _propTypes["default"].number,

  /** 画布宽度 */
  width: _propTypes["default"].number,

  /** 进度环背景色 */
  trailColor: _propTypes["default"].string,

  /** 进度条刷新操作 */
  onRetry: _propTypes["default"].func,

  /** 进度条取消操作 */
  onCancel: _propTypes["default"].func
});

_defineProperty(Progress, "defaultProps", {
  prefixCls: 'new-fc-one-progress',
  type: 'line',
  size: 'medium',
  percent: 0,
  showInfo: true,
  strokeLinecap: 'round',
  trailColor: ''
});