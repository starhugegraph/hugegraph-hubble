function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import { polyfill } from 'react-lifecycles-compat';
import WeekRender from './weekRender';
import RangeDayItemRender from './rangeDayItemRender';

var DayItemRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(DayItemRender, _PureComponent);

  function DayItemRender() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = DayItemRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        panelType = _this$props.panelType,
        prefixCls = _this$props.prefixCls,
        type = _this$props.type,
        endDatePanelType = _this$props.endDatePanelType,
        endDateShowYear = _this$props.endDateShowYear,
        endDateShowMonth = _this$props.endDateShowMonth,
        currentDate = _this$props.currentDate;
    var currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;

    if (currentPanelType === 'month') {
      return null;
    }

    var bodyContainerClassName = prefixCls + "-day-container";
    var otherProps = {
      beginDate: currentDate[0] || '',
      endDate: currentDate[1] || ''
    };

    if (type === 'nextMultiple') {
      otherProps = _extends({}, otherProps, {
        showYear: endDateShowYear,
        showMonth: endDateShowMonth
      });
    }

    return React.createElement("div", {
      className: bodyContainerClassName
    }, React.createElement(WeekRender, this.props), React.createElement(RangeDayItemRender, _extends({}, this.props, otherProps)));
  };

  return DayItemRender;
}(PureComponent);

_defineProperty(DayItemRender, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  panelType: PropTypes.string.isRequired,
  currentDate: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  endDatePanelType: PropTypes.string.isRequired,
  endDateShowMonth: PropTypes.number.isRequired,
  endDateShowYear: PropTypes.number.isRequired
});

polyfill(DayItemRender);
export default connect(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    panelType: state.panelType,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    endDateShowYear: state.endDateShowYear,
    endDateShowMonth: state.endDateShowMonth,
    endDatePanelType: state.endDatePanelType
  };
})(DayItemRender);