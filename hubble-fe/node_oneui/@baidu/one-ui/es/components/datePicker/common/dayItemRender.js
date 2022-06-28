function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'mini-store';
import WeekRender from './weekRender';
import DayRender from './dayRender';

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
        prefixCls = _this$props.prefixCls;

    if (panelType === 'month') {
      return null;
    }

    var bodyContainerClassName = prefixCls + "-day-container";
    return React.createElement("div", {
      className: bodyContainerClassName
    }, React.createElement(WeekRender, this.props), React.createElement(DayRender, this.props));
  };

  return DayItemRender;
}(PureComponent);

_defineProperty(DayItemRender, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  panelType: PropTypes.string.isRequired
});

export default connect(function (state) {
  return {
    showYear: state.showYear,
    showMonth: state.showMonth,
    panelType: state.panelType,
    currentDate: state._value,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate
  };
})(DayItemRender);