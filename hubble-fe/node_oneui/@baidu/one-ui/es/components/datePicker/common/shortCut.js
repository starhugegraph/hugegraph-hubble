function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import partial from 'lodash/partial';
import dayjs from 'dayjs';
import { getShortCutDate, getTimeTramp } from '../../../core/datePickerTools';

var ShortCut =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ShortCut, _PureComponent);

  function ShortCut() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickShortCut", function (index) {
      var _this$props = _this.props,
          shortcuts = _this$props.shortcuts,
          dateFormat = _this$props.dateFormat,
          onChange = _this$props.onChange;
      var shortcut = shortcuts[index];

      var _getShortCutDate = getShortCutDate(shortcut, dateFormat),
          beginDate = _getShortCutDate.beginDate,
          endDate = _getShortCutDate.endDate;

      var currentBeginDate = beginDate;
      var currentEndDate = endDate;

      if (getTimeTramp(currentBeginDate) > getTimeTramp(currentEndDate)) {
        currentBeginDate = endDate;
        currentEndDate = beginDate;
      }

      onChange([dayjs(new Date(currentBeginDate)).format(dateFormat), dayjs(new Date(currentEndDate)).format(dateFormat)]);
    });

    return _this;
  }

  var _proto = ShortCut.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        shortcuts = _this$props2.shortcuts;
    return React.createElement("div", {
      className: prefixCls + "-short-cut"
    }, shortcuts.map(function (shortcut, index) {
      return React.createElement("div", {
        className: prefixCls + "-short-cut-item",
        onClick: partial(_this2.onClickShortCut, index),
        key: index
      }, shortcut.label);
    }));
  };

  return ShortCut;
}(PureComponent);

_defineProperty(ShortCut, "propTypes", {
  shortcuts: PropTypes.array,
  prefixCls: PropTypes.string.isRequired,
  dateFormat: PropTypes.string.isRequired,
  onChange: PropTypes.func
});

_defineProperty(ShortCut, "defaultProps", {
  onChange: function onChange() {}
});

export { ShortCut as default };