function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import { connect } from 'mini-store';
import PropTypes from 'prop-types';
import YearPanel from './yearPanel';
import MonthPanel from './monthPanel';

var PanelRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(PanelRender, _PureComponent);

  function PanelRender() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = PanelRender.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        panelType = _this$props.panelType,
        endDatePanelType = _this$props.endDatePanelType,
        _this$props$multiple = _this$props.multiple,
        multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
        type = _this$props.type;

    if (!multiple && panelType === 'date') {
      return null;
    }

    if (multiple && type === 'prevMultiple' && panelType === 'date') {
      return null;
    }

    if (multiple && type === 'nextMultiple' && endDatePanelType === 'date') {
      return null;
    }

    return React.createElement("div", {
      className: prefixCls + "-panel-container"
    }, React.createElement(YearPanel, this.props), React.createElement(MonthPanel, this.props));
  };

  return PanelRender;
}(PureComponent);

_defineProperty(PanelRender, "propTypes", {
  prefixCls: PropTypes.string.isRequired,
  panelType: PropTypes.string.isRequired,
  endDatePanelType: PropTypes.string,
  multiple: PropTypes.bool,
  type: PropTypes.string
});

export default connect(function (state) {
  return {
    panelType: state.panelType,
    endDatePanelType: state.endDatePanelType
  };
})(PanelRender);