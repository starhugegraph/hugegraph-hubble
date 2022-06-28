function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import partial from 'lodash/partial';
import { connect } from 'mini-store';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getDetailDate } from '../../../core/datePickerTools';
var yearCellPadding = 4;
var yearCellHeight = 28;
var mediumYearCellHeight = 32;

var YearRender =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(YearRender, _PureComponent);

  function YearRender(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.scrollToCurrentYear();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.scrollToCurrentYear();
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToCurrentYear", function () {
      var yearRenderElement = _this.yearRenderElement;

      if (!yearRenderElement) {
        return;
      }

      var _this$props = _this.props,
          showYear = _this$props.showYear,
          endDateShowYear = _this$props.endDateShowYear,
          type = _this$props.type,
          isMonthRender = _this$props.isMonthRender,
          panelType = _this$props.panelType,
          size = _this$props.size;
      var currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;

      var minYear = _this.getMaxAndMinYear().minYear;

      var gapYear = currentYear - minYear;
      var yearCellCurrentHeigt = size === 'medium' ? mediumYearCellHeight : yearCellHeight;
      var scrollTop = (yearCellCurrentHeigt + yearCellPadding) * gapYear;

      if (isMonthRender && panelType === 'year') {
        gapYear = Math.ceil(gapYear / 3) - 3;
        scrollTop = (yearCellCurrentHeigt + yearCellPadding * 5) * gapYear;
      }

      yearRenderElement.scrollTop = scrollTop;
    });

    _defineProperty(_assertThisInitialized(_this), "getMaxAndMinYear", function () {
      var _this$props2 = _this.props,
          validateMinDate = _this$props2.validateMinDate,
          validateMaxDate = _this$props2.validateMaxDate,
          type = _this$props2.type,
          endDateShowYear = _this$props2.endDateShowYear,
          showYear = _this$props2.showYear;
      var maxYear = +getDetailDate(validateMaxDate).fullYear;
      var minYear = +getDetailDate(validateMinDate).fullYear;

      if (type === 'prevMultiple') {
        maxYear = endDateShowYear;
      } else if (type === 'nextMultiple') {
        minYear = showYear;
      }

      return {
        maxYear: maxYear,
        minYear: minYear
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onClickYear", function (currentYear) {
      var type = _this.props.type;
      var newState = {};

      if (type === 'nextMultiple') {
        newState.endDateShowYear = currentYear;
      } else {
        newState.showYear = currentYear;
      }

      _this.store.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyElement", function (ref) {
      _this.yearRenderElement = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "renderYear", function () {
      var _classNames2;

      var _this$props3 = _this.props,
          showYear = _this$props3.showYear,
          prefixCls = _this$props3.prefixCls,
          endDateShowYear = _this$props3.endDateShowYear,
          type = _this$props3.type,
          isMonthRender = _this$props3.isMonthRender,
          panelType = _this$props3.panelType;

      if (isMonthRender && panelType !== 'year') {
        return null;
      }

      var _this$getMaxAndMinYea = _this.getMaxAndMinYear(),
          minYear = _this$getMaxAndMinYea.minYear,
          maxYear = _this$getMaxAndMinYea.maxYear;

      var yearContainer = [];
      var currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;

      for (var i = minYear; i <= maxYear; i++) {
        var _classNames;

        var className = classNames(prefixCls + "-year-container-item", (_classNames = {}, _classNames[prefixCls + "-year-container-item-selected"] = currentYear === i, _classNames));
        yearContainer.push(React.createElement("div", {
          className: className,
          key: i,
          onClick: partial(_this.onClickYear, i)
        }, React.createElement("span", null, i, isMonthRender ? '年' : null)));
      }

      var yearClassNames = classNames(prefixCls + "-year-container", (_classNames2 = {}, _classNames2[prefixCls + "-year-container-is-month-render"] = isMonthRender && panelType === 'year', _classNames2));
      return React.createElement("div", {
        className: yearClassNames,
        ref: _this.getBodyElement
      }, yearContainer);
    });

    _this.store = _this.props.store;
    return _this;
  }

  var _proto = YearRender.prototype;

  _proto.render = function render() {
    return this.renderYear();
  };

  return YearRender;
}(PureComponent);

_defineProperty(YearRender, "propTypes", {
  store: PropTypes.object.isRequired,
  prefixCls: PropTypes.string.isRequired,
  showYear: PropTypes.number.isRequired,
  validateMinDate: PropTypes.string.isRequired,
  validateMaxDate: PropTypes.string.isRequired,
  endDateShowYear: PropTypes.number,
  type: PropTypes.string,
  isMonthRender: PropTypes.bool,
  panelType: PropTypes.string,
  size: PropTypes.string
});

export default connect(function (state) {
  return {
    endDateShowYear: state.endDateShowYear,
    showYear: state.showYear,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    panelType: state.panelType
  };
})(YearRender);