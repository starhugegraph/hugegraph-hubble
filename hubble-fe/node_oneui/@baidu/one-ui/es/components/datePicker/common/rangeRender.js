function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import dayjs from 'dayjs';
import partial from 'lodash/partial';
import MonthAndYearPanel from './monthAndYearPanel';
import RangeDayRender from './rangeDayRender';
import { getTimeTramp, getDetailDate } from '../../../core/datePickerTools';

var RangeRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(RangeRender, _PureComponent);

  function RangeRender(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "onPickerDay", function (type, value, readOnly) {
      if (readOnly === void 0) {
        readOnly = false;
      }

      var _this$state = _this.state,
          step = _this$state.step,
          beginDate = _this$state.beginDate;
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          dateFormat = _this$props.dateFormat,
          showYear = _this$props.showYear,
          showMonth = _this$props.showMonth,
          endDateShowYear = _this$props.endDateShowYear,
          endDateShowMonth = _this$props.endDateShowMonth;

      if (step === 0) {
        // 表示开始选择
        _this.setState({
          step: 1,
          endDate: '',
          beginDate: value
        }); // 如果点击了readOnly部分的话，修改当前面板展示的年月


        if (readOnly) {
          var _getDetailDate = getDetailDate(value),
              fullYear = _getDetailDate.fullYear,
              fullMonth = _getDetailDate.fullMonth;

          var newState = {};
          var currentFirstDate = getTimeTramp(fullYear + "/" + fullMonth + "/01");

          if (type === 'prevMultiple' && currentFirstDate !== getTimeTramp(endDateShowYear + "/" + endDateShowMonth + "/01")) {
            newState = {
              showYear: fullYear,
              showMonth: fullMonth
            };
          } else if (type === 'nextMultiple' && currentFirstDate !== getTimeTramp(showYear + "/" + showMonth + "/01")) {
            newState = {
              endDateShowYear: fullYear,
              endDateShowMonth: fullMonth
            };
          }

          _this.store.setState(newState);
        }
      } else if (step === 1) {
        var currentBeginDate = beginDate;
        var currentEndDate = value;

        if (getTimeTramp(currentBeginDate) > getTimeTramp(currentEndDate)) {
          currentBeginDate = value;
          currentEndDate = beginDate;
        }

        _this.setState({
          step: 0,
          endDate: currentEndDate,
          beginDate: currentBeginDate,
          hoverDate: ''
        });

        onChange([dayjs(new Date(currentBeginDate)).format(dateFormat), dayjs(new Date(currentEndDate)).format(dateFormat)]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (value) {
      var step = _this.state.step;

      if (step === 1) {
        _this.setState({
          hoverDate: value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      _this.setState({
        hoverDate: ''
      });
    });

    var currentDate = props.currentDate;
    _this.store = _this.props.store;
    _this.state = {
      beginDate: currentDate[0] || '',
      endDate: currentDate[1] || '',
      prevProps: props,
      step: 0,
      hoverDate: ''
    };
    return _this;
  }

  RangeRender.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var prevProps = prevState.prevProps;
    var newState = {};

    if ('currentDate' in nextProps && nextProps.currentDate !== prevProps.currentDate || prevProps.visible !== nextProps.visible) {
      newState = _extends({}, newState, {
        beginDate: nextProps.currentDate[0] || '',
        endDate: nextProps.currentDate[1] || '',
        prevProps: nextProps,
        step: 0
      });
    }

    return newState;
  };

  var _proto = RangeRender.prototype;

  _proto.render = function render() {
    var containerClassName = this.props.prefixCls + "-range";
    var _this$state2 = this.state,
        beginDate = _this$state2.beginDate,
        endDate = _this$state2.endDate,
        hoverDate = _this$state2.hoverDate;
    var currentDate = [beginDate, endDate];
    return React.createElement("div", {
      className: containerClassName
    }, React.createElement("div", {
      className: containerClassName + "-item"
    }, React.createElement(MonthAndYearPanel, _extends({}, this.props, {
      type: "prevMultiple"
    })), React.createElement(RangeDayRender, _extends({}, this.props, {
      type: "prevMultiple",
      currentDate: currentDate,
      onChange: partial(this.onPickerDay, 'prevMultiple'),
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      hoverDate: hoverDate
    }))), React.createElement("div", {
      className: containerClassName + "-item"
    }, React.createElement(MonthAndYearPanel, _extends({}, this.props, {
      type: "nextMultiple"
    })), React.createElement(RangeDayRender, _extends({}, this.props, {
      type: "nextMultiple",
      currentDate: currentDate,
      onChange: partial(this.onPickerDay, 'nextMultiple'),
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      hoverDate: hoverDate
    }))));
  };

  return RangeRender;
}(PureComponent);

_defineProperty(RangeRender, "propTypes", {
  store: PropTypes.object.isRequired,
  prefixCls: PropTypes.string.isRequired,
  currentDate: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  dateFormat: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  endDateShowYear: PropTypes.number.isRequired,
  endDateShowMonth: PropTypes.number.isRequired,
  showYear: PropTypes.number.isRequired,
  showMonth: PropTypes.number.isRequired
});

_defineProperty(RangeRender, "defaultProps", {
  onChange: function onChange() {}
});

export default connect(function (state) {
  return {
    currentDate: state._value,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    showYear: state.showYear,
    showMonth: state.showMonth
  };
})(RangeRender);