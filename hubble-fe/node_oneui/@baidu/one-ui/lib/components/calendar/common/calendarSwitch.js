"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _switch = _interopRequireDefault(require("../../switch"));

var _core = _interopRequireDefault(require("../../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var switchIndex = _core["default"].calendar.switchIndex;

var CalendarSwitch =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarSwitch, _Component);

  function CalendarSwitch(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onChange", function (checked) {
      _this.setState({
        compareSwitch: checked
      });

      var onChangeSwitch = _this.props.onChangeSwitch;

      if (onChangeSwitch) {
        onChangeSwitch(checked);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onChooseSwitchItem", function (e) {
      var value = e.target.dataset.value;
      var onChooseSwitchItem = _this.props.onChooseSwitchItem;

      if (onChooseSwitchItem) {
        onChooseSwitchItem(value);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderList", function () {
      var compareSwitch = _this.state.compareSwitch;
      var _this$props = _this.props,
          dateList = _this$props.dateList,
          overRollDateList = _this$props.overRollDateList,
          prefixCls = _this$props.prefixCls,
          sameOverRollDateList = _this$props.sameOverRollDateList;
      var el;

      if (!compareSwitch) {
        el = dateList.map(function (item) {
          return _react["default"].createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        });
      } else {
        el = _react["default"].createElement("div", {
          className: prefixCls + "-list-box"
        }, overRollDateList && overRollDateList.length ? _react["default"].createElement("div", {
          className: prefixCls + "-list-title"
        }, "\u73AF\u6BD4") : null, overRollDateList.map(function (item) {
          return _react["default"].createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        }), sameOverRollDateList && sameOverRollDateList.length ? _react["default"].createElement("div", {
          className: prefixCls + "-list-title"
        }, "\u540C\u6BD4") : null, sameOverRollDateList.map(function (item) {
          return _react["default"].createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        }));
      }

      return _react["default"].createElement("div", {
        className: prefixCls + "-list",
        onClick: _this.onChooseSwitchItem
      }, el);
    });

    _this.state = {
      compareSwitch: props.compareSwitch
    };
    return _this;
  }

  var _proto = CalendarSwitch.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('compareSwitch' in nextProps) {
      this.setState({
        compareSwitch: nextProps.compareSwitch
      });
    }
  };

  _proto.render = function render() {
    var compareSwitch = this.state.compareSwitch;
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        showCompareSwitch = _this$props2.showCompareSwitch;
    var switchProps = {
      checked: compareSwitch,
      onChange: this.onChange,
      size: 'medium'
    };
    return _react["default"].createElement("div", {
      className: prefixCls
    }, showCompareSwitch ? _react["default"].createElement("div", {
      className: prefixCls + "-container"
    }, _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: prefixCls + "-container-text"
    }, "\u6BD4\u8F83"), _react["default"].createElement(_switch["default"], switchProps))) : null, this.renderList());
  };

  return CalendarSwitch;
}(_react.Component);

exports["default"] = CalendarSwitch;

_defineProperty(CalendarSwitch, "propTypes", {
  compareSwitch: _propTypes["default"].bool,
  dateList: _propTypes["default"].array,
  overRollDateList: _propTypes["default"].array,
  sameOverRollDateList: _propTypes["default"].array,
  onChangeSwitch: _propTypes["default"].func,
  prefixCls: _propTypes["default"].string,
  onChooseSwitchItem: _propTypes["default"].func,
  showCompareSwitch: _propTypes["default"].bool
});

_defineProperty(CalendarSwitch, "defaultProps", {
  prefixCls: 'new-fc-one-calendar-switch',
  dateList: ['today', 'yesterday', 'lastSevenDays', 'lastFourteenDays', 'lastThirtyDays', 'lastWeek', 'currentMonth', 'lastMonth'],
  overRollDateList: ['compareYesterday', 'compareLastWeek', 'compareLastMonth'],
  sameOverRollDateList: ['lastYearToday', 'lastYearWeek', 'lasterYearMonth']
});

module.exports = exports.default;