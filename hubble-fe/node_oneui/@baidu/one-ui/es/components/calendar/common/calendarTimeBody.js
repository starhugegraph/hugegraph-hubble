function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tools from '../../../core';
var _tools$calendar = tools.calendar,
    allHours = _tools$calendar.allHours,
    allMinutesAndSeconds = _tools$calendar.allMinutesAndSeconds,
    rulesMap = _tools$calendar.rulesMap;

var CalendarTimeBody =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarTimeBody, _Component);

  function CalendarTimeBody(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.scrollToPosition(_this.state.timeObj);
    });

    _defineProperty(_assertThisInitialized(_this), "onClickItem", function (e) {
      var _e$target$dataset = e.target.dataset,
          flag = _e$target$dataset.flag,
          time = _e$target$dataset.time;
      var stateTimeObj = _this.state.timeObj;
      var timeObj = JSON.stringify(stateTimeObj) === '{}' ? {
        hour: '00',
        minute: '00',
        second: '00'
      } : stateTimeObj;
      var updateInputValue = _this.props.updateInputValue;
      timeObj[flag] = time;

      _this.setState({
        timeObj: timeObj
      });

      updateInputValue(timeObj);
    });

    _defineProperty(_assertThisInitialized(_this), "getHourListElement", function (ref) {
      _this.hourListElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getMinuteListElement", function (ref) {
      _this.minuteListElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getSecondListElement", function (ref) {
      _this.secondListElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyContainer", function (ref) {
      _this.bodyContainer = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToPosition", function (_ref) {
      var hour = _ref.hour,
          minute = _ref.minute,
          second = _ref.second;
      var bodyElement = _this.bodyContainer;
      var hourElement = _this.hourListElement && _this.hourListElement.children && _this.hourListElement.children[0];
      var minuteElement = _this.minuteListElement && _this.minuteListElement.children && _this.minuteListElement.children[0];
      var secondElement = _this.secondListElement && _this.secondListElement.children && _this.secondListElement.children[0];
      var hourNode = hourElement && hourElement.children && hourElement.children[+hour];
      var minuteNode = minuteElement && minuteElement.children && minuteElement.children[+minute];
      var secondNode = secondElement && secondElement.children && secondElement.children[+second];
      var bodyElementOffsetTop = bodyElement.offsetTop;

      if (hourNode && hourNode.offsetTop) {
        hourElement.parentElement.scrollTop = hourNode.offsetTop - bodyElementOffsetTop;
      }

      if (minuteNode && minuteNode.offsetTop) {
        minuteElement.parentElement.scrollTop = minuteNode.offsetTop - bodyElementOffsetTop;
      }

      if (secondNode && secondNode.offsetTop) {
        secondElement.parentElement.scrollTop = secondNode.offsetTop - bodyElementOffsetTop;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderList", function (_ref2) {
      var dateFlag = _ref2.dateFlag,
          ref = _ref2.ref;
      var prefixCls = _this.props.prefixCls;
      var timeObj = _this.state.timeObj;
      var list = dateFlag === 'hour' ? allHours : allMinutesAndSeconds;
      var clx = prefixCls + "-time-body-container";
      var listRender = React.createElement("div", {
        className: clx + " " + clx + "-" + dateFlag,
        ref: ref
      }, React.createElement("div", {
        className: clx + "-list"
      }, list.map(function (item, key) {
        var _classNames;

        var itemClx = classNames(clx + "-list-item", (_classNames = {}, _classNames[clx + "-list-item-selected"] = +item === +timeObj[dateFlag], _classNames));
        return React.createElement("div", {
          key: key,
          "data-flag": dateFlag,
          "data-time": item,
          className: itemClx
        }, item);
      })));
      return listRender;
    });

    _this.state = {
      timeObj: props.timeObj
    };
    return _this;
  }

  var _proto = CalendarTimeBody.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if ('timeObj' in nextProps && (nextProps.timeObj.hour !== this.props.timeObj.hour || nextProps.timeObj.minute !== this.props.timeObj.minute || nextProps.timeObj.second !== this.props.timeObj.second)) {
      this.setState({
        timeObj: nextProps.timeObj
      });
    }
  };

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        timeRules = _this$props.timeRules;
    var clx = prefixCls + "-time-body";
    return React.createElement("div", {
      className: clx,
      ref: this.getBodyContainer,
      onClick: this.onClickItem
    }, this.renderList({
      dateFlag: 'hour',
      ref: this.getHourListElement
    }), timeRules !== rulesMap.ONLY_HOUR ? this.renderList({
      dateFlag: 'minute',
      ref: this.getMinuteListElement
    }) : null, timeRules === rulesMap.ALL ? this.renderList({
      dateFlag: 'second',
      ref: this.getSecondListElement
    }) : null);
  };

  return CalendarTimeBody;
}(Component);

_defineProperty(CalendarTimeBody, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  updateInputValue: PropTypes.func.isRequired,
  timeObj: PropTypes.shape({
    hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    second: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  timeRules: PropTypes.number.isRequired
});

export { CalendarTimeBody as default };