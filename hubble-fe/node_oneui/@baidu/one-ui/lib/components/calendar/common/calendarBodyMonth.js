"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash"));

var _classnames = _interopRequireDefault(require("classnames"));

var _core = _interopRequireDefault(require("../../../core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _tools$calendar = _core["default"].calendar,
    initFormatAllMonths = _tools$calendar.initFormatAllMonths,
    selectScrollYearIndex = _tools$calendar.selectScrollYearIndex,
    formatAllMonths = _tools$calendar.formatAllMonths,
    getTimeStamp = _tools$calendar.getTimeStamp,
    getDetailDate = _tools$calendar.getDetailDate;
var loadingInMonthMode = false;

var CalendarBodyMonth =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarBodyMonth, _Component);

  function CalendarBodyMonth(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.scrollToPosition(_this.state);

      _this.bindScroll();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      // dom 渲染完后
      loadingInMonthMode = false;
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectMonth", function (e) {
      var dataset = e.target.dataset;
      var type = dataset.type;

      if (type !== 'month' || dataset.disabled === 'true') {
        return;
      }

      var year = +dataset.year;
      var month = +dataset.month;
      var onSelectMonth = _this.props.onSelectMonth;
      onSelectMonth({
        year: year,
        month: month
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyElement", function (ref) {
      _this.dateBody = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyListElement", function (ref) {
      _this.dateBodyList = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToPosition", function (props) {
      var body = _this.dateBody;
      var selectIndex = selectScrollYearIndex({
        list: _this.state.list,
        selectYear: props.selectYear
      });
      var currentNode = _this.dateBodyList.children[selectIndex];

      if (currentNode) {
        var currentNodeOffsetTop = currentNode.offsetTop - body.offsetTop;
        body.scrollTop = currentNodeOffsetTop;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "bindScroll", function () {
      var body = _this.dateBody;
      var bodyList = _this.dateBodyList;
      var _this$props = _this.props,
          validateMaxDate = _this$props.validateMaxDate,
          validateMinDate = _this$props.validateMinDate,
          canSelectFuture = _this$props.canSelectFuture;

      var scrollFunc = function scrollFunc() {
        var scrollTop = body.scrollTop;
        var list = _this.state.list;

        if (scrollTop < 10 && !loadingInMonthMode) {
          loadingInMonthMode = true;

          _this.setState({
            list: formatAllMonths({
              list: list,
              currentYear: list[0].year,
              validateMinDate: validateMinDate,
              validateMaxDate: validateMaxDate,
              canSelectFuture: canSelectFuture
            })
          });
        } else if (scrollTop > bodyList.children[list.length - 3].offsetTop - body.offsetTop && !loadingInMonthMode) {
          loadingInMonthMode = true;

          _this.setState({
            list: formatAllMonths({
              list: list,
              currentYear: list[list.length - 1].year,
              validateMinDate: validateMinDate,
              validateMaxDate: validateMaxDate,
              canSelectFuture: canSelectFuture
            })
          });
        }
      };

      body.removeEventListener('scroll', _lodash["default"].debounce(scrollFunc, 50));
      body.addEventListener('scroll', _lodash["default"].debounce(scrollFunc, 50));
    });

    _defineProperty(_assertThisInitialized(_this), "isMonthDisabled", function (_ref) {
      var item = _ref.item,
          dayIndex = _ref.dayIndex;
      var _this$props2 = _this.props,
          canSelectFuture = _this$props2.canSelectFuture,
          validateMinDate = _this$props2.validateMinDate,
          validateMaxDate = _this$props2.validateMaxDate;
      var currentMonthFirstDay = getTimeStamp(item.year + "/" + (dayIndex + 1) + "/1");
      var todayTimeStramp = new Date().getTime();

      if (currentMonthFirstDay > todayTimeStramp && !canSelectFuture) {
        return true;
      }

      var validateFirstDate = getDetailDate(validateMinDate);
      var validateLastDate = getDetailDate(validateMaxDate);
      var disabled = getTimeStamp(validateFirstDate.fullYear + "/" + validateFirstDate.fullMonth + "/1") > currentMonthFirstDay || getTimeStamp(validateLastDate.fullYear + "/" + validateLastDate.fullMonth + "/1") < currentMonthFirstDay;
      return disabled;
    });

    _this.state = {
      selectMonth: _props.selectMonth,
      selectYear: _props.selectYear,
      list: initFormatAllMonths({
        currentYear: _props.selectYear,
        validateMinDate: _props.validateMinDate,
        validateMaxDate: _props.validateMaxDate,
        canSelectFuture: _props.canSelectFuture
      })
    };
    return _this;
  }

  var _proto = CalendarBodyMonth.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this$props3 = this.props,
        validateMinDate = _this$props3.validateMinDate,
        validateMaxDate = _this$props3.validateMaxDate,
        canSelectFuture = _this$props3.canSelectFuture;

    if ('selectYear' in nextProps) {
      this.setState({
        selectYear: nextProps.selectYear,
        list: initFormatAllMonths({
          currentYear: nextProps.selectYear,
          validateMinDate: validateMinDate,
          validateMaxDate: validateMaxDate,
          canSelectFuture: canSelectFuture
        })
      });
    }

    if ('selectMonth' in nextProps) {
      this.setState({
        selectMonth: nextProps.selectMonth
      });
    }

    if ('mode' in nextProps && nextProps.mode === 'month' && nextProps.mode !== this.props.mode) {
      this.scrollToPosition(this.state);
      this.bindScroll();
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var _this$state = this.state,
        selectMonth = _this$state.selectMonth,
        selectYear = _this$state.selectYear;
    var prefixCls = this.props.prefixCls;
    var clx = prefixCls + "-month-select";
    var selectText = selectYear + "/" + selectMonth;
    var list = this.state.list;
    return _react["default"].createElement("div", {
      className: clx,
      ref: this.getBodyElement
    }, _react["default"].createElement("div", {
      className: clx + "-list",
      ref: this.getBodyListElement,
      onClick: this.onSelectMonth
    }, list.map(function (item, index) {
      return _react["default"].createElement("div", {
        key: index,
        className: clx + "-item"
      }, _react["default"].createElement("div", {
        className: clx + "-item-year"
      }, _react["default"].createElement("span", null, item.year, "\u5E74")), _react["default"].createElement("div", {
        className: clx + "-item-months"
      }, item.month.map(function (day, dayIndex) {
        var _classNames;

        var isSelected = selectText === item.year + "/" + (dayIndex + 1);

        var disabled = _this2.isMonthDisabled({
          item: item,
          dayIndex: dayIndex
        });

        var classes = (0, _classnames["default"])(clx + "-item-months-single", (_classNames = {}, _classNames[clx + "-item-months-single-normal"] = !disabled, _classNames[clx + "-item-months-single-selected"] = isSelected && !disabled, _classNames[clx + "-item-months-single-disabled"] = disabled, _classNames));
        return _react["default"].createElement("span", {
          key: dayIndex,
          className: classes,
          "data-type": "month",
          "data-year": item.year,
          "data-month": "" + (dayIndex + 1),
          "data-disabled": disabled
        }, day, "\u6708");
      })));
    })));
  };

  return CalendarBodyMonth;
}(_react.Component);

exports["default"] = CalendarBodyMonth;

_defineProperty(CalendarBodyMonth, "propTypes", {
  selectMonth: _propTypes["default"].number,
  selectYear: _propTypes["default"].number,
  prefixCls: _propTypes["default"].string,
  onSelectMonth: _propTypes["default"].func,
  validateMinDate: _propTypes["default"].string,
  validateMaxDate: _propTypes["default"].string,
  canSelectFuture: _propTypes["default"].bool.isRequired,
  mode: _propTypes["default"].string
});

module.exports = exports.default;