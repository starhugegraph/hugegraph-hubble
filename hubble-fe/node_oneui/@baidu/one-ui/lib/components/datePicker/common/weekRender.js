"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DAYS_PER_WEEK = ['一', '二', '三', '四', '五', '六', '日'];

var WeekRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(WeekRender, _PureComponent);

  function WeekRender() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderWeekItem", function () {
      var classNames = _this.props.prefixCls + "-week";
      return _react["default"].createElement("div", {
        className: classNames
      }, DAYS_PER_WEEK.map(function (dayStr, index) {
        return _react["default"].createElement("span", {
          key: index,
          className: classNames + "-week"
        }, dayStr);
      }));
    });

    return _this;
  }

  var _proto = WeekRender.prototype;

  _proto.render = function render() {
    return this.renderWeekItem();
  };

  return WeekRender;
}(_react.PureComponent);

exports["default"] = WeekRender;

_defineProperty(WeekRender, "propTypes", {
  prefixCls: _propTypes["default"].string.isRequired
});

module.exports = exports.default;