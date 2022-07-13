function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '../../switch';
import tools from '../../../core';
var switchIndex = tools.calendar.switchIndex;

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
          return React.createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        });
      } else {
        el = React.createElement("div", {
          className: prefixCls + "-list-box"
        }, overRollDateList && overRollDateList.length ? React.createElement("div", {
          className: prefixCls + "-list-title"
        }, "\u73AF\u6BD4") : null, overRollDateList.map(function (item) {
          return React.createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        }), sameOverRollDateList && sameOverRollDateList.length ? React.createElement("div", {
          className: prefixCls + "-list-title"
        }, "\u540C\u6BD4") : null, sameOverRollDateList.map(function (item) {
          return React.createElement("div", {
            key: item,
            "data-value": item,
            className: prefixCls + "-list-item"
          }, switchIndex[item] && switchIndex[item].text);
        }));
      }

      return React.createElement("div", {
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
    return React.createElement("div", {
      className: prefixCls
    }, showCompareSwitch ? React.createElement("div", {
      className: prefixCls + "-container"
    }, React.createElement("div", null, React.createElement("span", {
      className: prefixCls + "-container-text"
    }, "\u6BD4\u8F83"), React.createElement(Switch, switchProps))) : null, this.renderList());
  };

  return CalendarSwitch;
}(Component);

_defineProperty(CalendarSwitch, "propTypes", {
  compareSwitch: PropTypes.bool,
  dateList: PropTypes.array,
  overRollDateList: PropTypes.array,
  sameOverRollDateList: PropTypes.array,
  onChangeSwitch: PropTypes.func,
  prefixCls: PropTypes.string,
  onChooseSwitchItem: PropTypes.func,
  showCompareSwitch: PropTypes.bool
});

_defineProperty(CalendarSwitch, "defaultProps", {
  prefixCls: 'new-fc-one-calendar-switch',
  dateList: ['today', 'yesterday', 'lastSevenDays', 'lastFourteenDays', 'lastThirtyDays', 'lastWeek', 'currentMonth', 'lastMonth'],
  overRollDateList: ['compareYesterday', 'compareLastWeek', 'compareLastMonth'],
  sameOverRollDateList: ['lastYearToday', 'lastYearWeek', 'lasterYearMonth']
});

export { CalendarSwitch as default };