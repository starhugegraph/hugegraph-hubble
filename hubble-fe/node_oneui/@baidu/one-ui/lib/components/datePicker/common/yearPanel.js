"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _miniStore = require("mini-store");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _datePickerTools = require("../../../core/datePickerTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
      var maxYear = +(0, _datePickerTools.getDetailDate)(validateMaxDate).fullYear;
      var minYear = +(0, _datePickerTools.getDetailDate)(validateMinDate).fullYear;

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

        var className = (0, _classnames["default"])(prefixCls + "-year-container-item", (_classNames = {}, _classNames[prefixCls + "-year-container-item-selected"] = currentYear === i, _classNames));
        yearContainer.push(_react["default"].createElement("div", {
          className: className,
          key: i,
          onClick: (0, _partial["default"])(_this.onClickYear, i)
        }, _react["default"].createElement("span", null, i, isMonthRender ? '年' : null)));
      }

      var yearClassNames = (0, _classnames["default"])(prefixCls + "-year-container", (_classNames2 = {}, _classNames2[prefixCls + "-year-container-is-month-render"] = isMonthRender && panelType === 'year', _classNames2));
      return _react["default"].createElement("div", {
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
}(_react.PureComponent);

_defineProperty(YearRender, "propTypes", {
  store: _propTypes["default"].object.isRequired,
  prefixCls: _propTypes["default"].string.isRequired,
  showYear: _propTypes["default"].number.isRequired,
  validateMinDate: _propTypes["default"].string.isRequired,
  validateMaxDate: _propTypes["default"].string.isRequired,
  endDateShowYear: _propTypes["default"].number,
  type: _propTypes["default"].string,
  isMonthRender: _propTypes["default"].bool,
  panelType: _propTypes["default"].string,
  size: _propTypes["default"].string
});

var _default = (0, _miniStore.connect)(function (state) {
  return {
    endDateShowYear: state.endDateShowYear,
    showYear: state.showYear,
    validateMinDate: state.validateMinDate,
    validateMaxDate: state.validateMaxDate,
    panelType: state.panelType
  };
})(YearRender);

exports["default"] = _default;
module.exports = exports.default;