function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';
import classes from 'component-classes';
import tools from '../../../core';
var _tools$calendar = tools.calendar,
    initDateMonths = _tools$calendar.initDateMonths,
    formatPerMonthInDay = _tools$calendar.formatPerMonthInDay,
    getTimeTramp = _tools$calendar.getTimeTramp,
    selectedMonthIndex = _tools$calendar.selectedMonthIndex,
    formatDaysByScroll = _tools$calendar.formatDaysByScroll,
    getDetailDate = _tools$calendar.getDetailDate,
    getDaysByTimeTramp = _tools$calendar.getDaysByTimeTramp,
    getTodayStr = _tools$calendar.getTodayStr;
var loadingInDateMode = false;

var needScrollWhenZeroScrollTop = function needScrollWhenZeroScrollTop(_ref) {
  var currentYear = _ref.currentYear,
      currentMonth = _ref.currentMonth,
      validateMinDate = _ref.validateMinDate;
  var validateObj = getDetailDate(validateMinDate);

  if (validateObj.fullYear === currentYear && validateObj.fullMonth === currentMonth) {
    return false;
  }

  return true;
};

var CalendarBodyData =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CalendarBodyData, _Component);

  function CalendarBodyData(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var _this$state = _this.state,
          selectMonth = _this$state.selectMonth,
          selectYear = _this$state.selectYear,
          list = _this$state.list;

      _this.scrollToPosition({
        list: list,
        beginTime: selectYear + "/" + selectMonth + "/1"
      });

      _this.bindScroll();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
      var _this$props = _this.props,
          visible = _this$props.visible,
          selectYear = _this$props.selectYear,
          selectMonth = _this$props.selectMonth;
      var list = _this.state.list;

      if (visible && prevProps.visible !== visible) {
        _this.scrollToPosition({
          list: list,
          beginTime: selectYear + "/" + selectMonth + "/1"
        });
      }

      loadingInDateMode = false;
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyElement", function (ref) {
      _this.dateBody = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "getBodyListElement", function (ref) {
      _this.dateBodyList = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "initDateMonthDays", function (currentDate) {
      var _this$props2 = _this.props,
          validateMaxDate = _this$props2.validateMaxDate,
          validateMinDate = _this$props2.validateMinDate,
          canSelectFuture = _this$props2.canSelectFuture;
      var list = initDateMonths({
        currentDate: currentDate,
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        canSelectFuture: canSelectFuture
      });

      _this.setState({
        list: list
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToPosition", function (props) {
      var body = _this.dateBody;
      var head = body.previousSibling;
      var headOffsetTop = head.offsetTop;
      var headOffsetHeight = head.offsetHeight;
      var selectIndex = selectedMonthIndex(props);
      var HeadTop = headOffsetTop + headOffsetHeight;
      var currentNode = _this.dateBodyList.children[selectIndex];

      if (currentNode) {
        var currentNodeOffsetTop = currentNode.offsetTop;
        body.scrollTop = currentNodeOffsetTop - HeadTop;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "formatWeek", function (perMonthInDay) {
      var elm = [];
      var index = 0;

      for (var i = 1; i <= perMonthInDay.length; i++) {
        if (i % 7 === 1) {
          elm.push([]);
          elm[index].push(perMonthInDay[i - 1]);
        } else if (i % 7 === 0) {
          elm[index].push(perMonthInDay[i - 1]);
          index++;
        } else {
          elm[index].push(perMonthInDay[i - 1]);
        }
      }

      return elm;
    });

    _defineProperty(_assertThisInitialized(_this), "bindScroll", function () {
      var body = _this.dateBody;
      var _this$props3 = _this.props,
          onScrollChange = _this$props3.onScrollChange,
          validateMinDate = _this$props3.validateMinDate,
          validateMaxDate = _this$props3.validateMaxDate,
          canSelectFuture = _this$props3.canSelectFuture; // const bodyList = this.dateBodyList;

      var head = body.previousSibling;
      var headOffsetTop = head.offsetTop;
      var headOffsetHeight = head.offsetHeight;
      var HeadTop = headOffsetTop + headOffsetHeight; // const {validateMaxDate, validateMinDate} = this.props;

      var scrollFunc = function scrollFunc() {
        var list = _this.state.list;

        if (loadingInDateMode) {
          return;
        }

        var scrollTop = body.scrollTop;
        var bodyList = _this.dateBodyList;
        var currentNode = bodyList.children;
        var domsOffsetTop = [];

        for (var i = 0; i < currentNode.length; i++) {
          domsOffsetTop.push(currentNode[i].offsetTop - HeadTop - currentNode[i].offsetHeight / 2 - 20);
        }

        var domsOffsetTopLength = domsOffsetTop.length;

        if (scrollTop === 0) {
          // 快速度滑到顶部, 因为有debounse, 所以懒加载是不会触发的
          // 判断一下是否还需要加载
          var needLoadData = needScrollWhenZeroScrollTop({
            currentYear: list[0].year,
            currentMonth: list[0].month,
            validateMinDate: validateMinDate
          });

          if (!loadingInDateMode && needLoadData) {
            loadingInDateMode = true;
            var formatList = formatDaysByScroll({
              currentDate: list[0].year + "/" + list[0].month + "/1",
              validateMinDate: validateMinDate,
              validateMaxDate: validateMaxDate,
              list: list,
              canSelectFuture: canSelectFuture,
              scrollIndex: 0
            });

            _this.setState({
              list: formatList
            });
          }
        } else if (scrollTop > domsOffsetTop[domsOffsetTopLength - 1] - 20) {
          // 往下翻页-改变月份
          if (onScrollChange) {
            onScrollChange({
              month: +list[domsOffsetTopLength - 1].month,
              year: +list[domsOffsetTopLength - 1].year
            });
          }
        } else {
          for (var _i = 0; _i < domsOffsetTopLength; _i++) {
            if (domsOffsetTop[_i + 1] && scrollTop < domsOffsetTop[_i + 1] && scrollTop >= domsOffsetTop[_i]) {
              var index = _i; // 往前翻-改变月份

              if (onScrollChange) {
                onScrollChange({
                  month: +list[index].month,
                  year: +list[index].year
                });
              }
            }
          }
        }
      };

      body.removeEventListener('scroll', _.debounce(scrollFunc, 50));
      body.addEventListener('scroll', _.debounce(scrollFunc, 50));
    });

    _defineProperty(_assertThisInitialized(_this), "dayOnMonseEnter", function (e) {
      var target = e.target;
      var _target$dataset = target.dataset,
          value = _target$dataset.value,
          disabled = _target$dataset.disabled;

      if (disabled === 'true') {
        return;
      }

      var _this$props4 = _this.props,
          prefixCls = _this$props4.prefixCls,
          selectMode = _this$props4.selectMode,
          canSelectFuture = _this$props4.canSelectFuture;
      var _this$state2 = _this.state,
          step = _this$state2.step,
          beginTime = _this$state2.beginTime,
          endTime = _this$state2.endTime,
          compareSwitch = _this$state2.compareSwitch;
      var itemCls = prefixCls + "-item"; // const selectedCls = `${itemCls}-selected`;

      var hoverCls = itemCls + "-active";
      var compareHoverCls = itemCls + "-compare-active";
      var dom = classes(target); // 悬浮，表示要开始选第一步

      if (step === 0 || step === 1) {
        dom.add(hoverCls);
      } else if (step === 2 && compareSwitch) {
        dom.add(compareHoverCls);
      }

      if (selectMode !== 'single') {
        if (step === 1) {
          _this.setState({
            hoverTime: value,
            hoverCompareTime: null
          });
        } else if (step === 2 && compareSwitch) {
          var diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime));

          var _getDetailDate = getDetailDate(value),
              fullYear = _getDetailDate.fullYear,
              fullMonth = _getDetailDate.fullMonth,
              fullDay = _getDetailDate.fullDay;

          var hoverCompareEndTime = value ? moment([fullYear, fullMonth - 1, fullDay]).add(diffDays - 1, 'days').format('YYYY/MM/DD') : '';

          if (getTimeTramp(hoverCompareEndTime) > getTimeTramp(getTodayStr()) && !canSelectFuture) {
            diffDays = getDaysByTimeTramp(getTimeTramp(getTodayStr()) - getTimeTramp(value));
            hoverCompareEndTime = value ? moment([fullYear, fullMonth - 1, fullDay]).add(diffDays - 1, 'days').format('YYYY/MM/DD') : '';
          }

          _this.setState({
            hoverTime: null,
            hoverCompareTime: value || '',
            hoverCompareEndTime: hoverCompareEndTime,
            showTip: true
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "dayOnMonseLeave", function (e) {
      var target = e.target;
      var prefixCls = _this.props.prefixCls;
      var itemCls = prefixCls + "-item";
      var hoverCls = itemCls + "-active";
      var dom = classes(target);

      if (dom.has(hoverCls)) {
        dom.remove(hoverCls);
      }

      _this.setState({
        showTip: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "dayOnClick", function (e) {
      var target = e.target;
      var _this$props5 = _this.props,
          onChange = _this$props5.onChange,
          selectMode = _this$props5.selectMode;
      var _target$dataset2 = target.dataset,
          value = _target$dataset2.value,
          disabled = _target$dataset2.disabled;
      var _this$state3 = _this.state,
          step = _this$state3.step,
          beginTime = _this$state3.beginTime,
          compareSwitch = _this$state3.compareSwitch,
          endTime = _this$state3.endTime,
          hoverCompareTime = _this$state3.hoverCompareTime,
          hoverCompareEndTime = _this$state3.hoverCompareEndTime,
          compareBeginTime = _this$state3.compareBeginTime,
          compareEndTime = _this$state3.compareEndTime;

      if (disabled === 'true') {
        return;
      }

      if (selectMode === 'single') {
        if (onChange) {
          onChange({
            beginTime: value,
            endTime: '',
            compareBeginTime: '',
            compareEndTime: ''
          });
        }
      } else if (step === 0) {
        var newState = {
          beginTime: value,
          endTime: selectMode === 'compare' ? value : '',
          compareBeginTime: '',
          compareEndTime: '',
          step: 1
        };

        _this.setState(newState);

        if (onChange) {
          onChange(newState);
        }
      } else if (step === 1) {
        var beginTimeStamp = getTimeTramp(beginTime);
        var endTimeStamp = getTimeTramp(value);
        var isConverse = endTimeStamp < beginTimeStamp;
        var _newState = {
          beginTime: isConverse ? value : beginTime,
          endTime: isConverse ? beginTime : value,
          compareBeginTime: compareSwitch ? compareBeginTime : '',
          compareEndTime: compareSwitch ? compareEndTime : '',
          step: compareSwitch ? 2 : 0
        };

        _this.setState(_extends({}, _newState, {
          hoverTime: null
        }));

        if (onChange) {
          onChange(_newState);
        }
      } else if (step === 2) {
        var _newState2 = {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: hoverCompareTime,
          compareEndTime: hoverCompareEndTime,
          step: 0
        };

        _this.setState(_extends({}, _newState2, {
          hoverCompareTime: null,
          hoverCompareEndTime: null
        }));

        if (onChange) {
          onChange(_newState2);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isFutureDay", function (_ref2) {
      var currentDay = _ref2.currentDay;

      if (!currentDay) {
        return false;
      }

      var todayDate = getTodayStr() + " 23:59:59";
      var todayTimeStamp = new Date(todayDate).getTime();
      var currentDateTimeStamp = getTimeTramp(currentDay.value);
      return currentDateTimeStamp > todayTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isBeyondMaxDay", function (_ref3) {
      var currentDay = _ref3.currentDay;

      if (!currentDay) {
        return false;
      }

      var validateMaxDate = _this.props.validateMaxDate;
      var validateMaxDateTramp = getTimeTramp(validateMaxDate);
      var currentDateTimeStamp = getTimeTramp(currentDay.value);
      return currentDateTimeStamp > validateMaxDateTramp;
    });

    _defineProperty(_assertThisInitialized(_this), "isPassDay", function (_ref4) {
      var currentDay = _ref4.currentDay;

      if (!currentDay) {
        return;
      }

      var validateMinDate = _this.props.validateMinDate;
      var validateMinDateTramp = getTimeTramp(validateMinDate);
      var currentDateTimeStamp = getTimeTramp(currentDay.value);
      return currentDateTimeStamp < validateMinDateTramp;
    });

    _defineProperty(_assertThisInitialized(_this), "isSelectedDay", function (_ref5) {
      var currentDay = _ref5.currentDay;
      var _this$state4 = _this.state,
          beginTime = _this$state4.beginTime,
          endTime = _this$state4.endTime;
      var beginTimeStamp = beginTime && getTimeTramp(beginTime);
      var endTimeStamp = endTime && getTimeTramp(endTime);
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      return beginTimeStamp === currentTimeStamp || endTimeStamp === currentTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isCompareSelectedDay", function (_ref6) {
      var currentDay = _ref6.currentDay;
      var _this$state5 = _this.state,
          compareEndTime = _this$state5.compareEndTime,
          compareBeginTime = _this$state5.compareBeginTime,
          compareSwitch = _this$state5.compareSwitch;
      var canSelectFuture = _this.props.canSelectFuture;

      if (!canSelectFuture && _this.isFutureDay({
        currentDay: currentDay
      })) {
        return false;
      }

      if (!compareSwitch) {
        return false;
      }

      var beginTimeStamp = compareBeginTime && getTimeTramp(compareBeginTime);
      var endTimeStamp = compareEndTime && getTimeTramp(compareEndTime);
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      return beginTimeStamp === currentTimeStamp || endTimeStamp === currentTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isBetweenDay", function (_ref7) {
      var currentDay = _ref7.currentDay;
      var _this$state6 = _this.state,
          beginTime = _this$state6.beginTime,
          endTime = _this$state6.endTime,
          hoverTime = _this$state6.hoverTime;
      var beginTimeStamp = beginTime && getTimeTramp(beginTime);
      var endTimeStamp = endTime && getTimeTramp(endTime);
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      var hoverTimeStamp = hoverTime && getTimeTramp(hoverTime);
      var betweenBeginAndEnd = currentTimeStamp > beginTimeStamp && currentTimeStamp < endTimeStamp;
      var betweenBeginAndHoverFront = currentTimeStamp && hoverTimeStamp && currentTimeStamp < beginTimeStamp && currentTimeStamp > hoverTimeStamp;
      var betweenBeginAndHoverEnd = currentTimeStamp && hoverTimeStamp && currentTimeStamp > beginTimeStamp && currentTimeStamp < hoverTimeStamp;
      return betweenBeginAndEnd || betweenBeginAndHoverFront || betweenBeginAndHoverEnd;
    });

    _defineProperty(_assertThisInitialized(_this), "isCompareBetweenDay", function (_ref8) {
      var currentDay = _ref8.currentDay;
      var _this$state7 = _this.state,
          compareBeginTime = _this$state7.compareBeginTime,
          compareEndTime = _this$state7.compareEndTime,
          hoverCompareTime = _this$state7.hoverCompareTime,
          hoverCompareEndTime = _this$state7.hoverCompareEndTime,
          compareSwitch = _this$state7.compareSwitch;
      var canSelectFuture = _this.props.canSelectFuture;

      if (!canSelectFuture && _this.isFutureDay({
        currentDay: currentDay
      })) {
        return false;
      }

      if (!compareSwitch) {
        return false;
      }

      var beginTimeStamp = compareBeginTime && getTimeTramp(compareBeginTime);
      var endTimeStamp = compareEndTime && getTimeTramp(compareEndTime);
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      var hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
      var hoverCompareTimeStamp = hoverCompareEndTime && getTimeTramp(hoverCompareEndTime);
      var betweenBeginAndEnd = currentTimeStamp > beginTimeStamp && currentTimeStamp < endTimeStamp;
      var betweenHover = currentTimeStamp && hoverTimeStamp && hoverCompareTimeStamp && currentTimeStamp >= hoverTimeStamp && currentTimeStamp <= hoverCompareTimeStamp;
      return betweenBeginAndEnd || betweenHover;
    });

    _defineProperty(_assertThisInitialized(_this), "isCrossDay", function (_ref9) {
      var currentDay = _ref9.currentDay;
      var _this$state8 = _this.state,
          beginTime = _this$state8.beginTime,
          endTime = _this$state8.endTime,
          compareBeginTime = _this$state8.compareBeginTime,
          compareEndTime = _this$state8.compareEndTime,
          compareSwitch = _this$state8.compareSwitch;

      if (!compareSwitch || !currentDay) {
        return false;
      }

      var beginTimeStamp = beginTime && getTimeTramp(beginTime);
      var endTimeStamp = endTime && getTimeTramp(endTime);
      var compareBeginTimeStamp = beginTime && getTimeTramp(compareBeginTime);
      var compareEndTimeStamp = beginTime && getTimeTramp(compareEndTime);
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      return currentTimeStamp >= beginTimeStamp && currentTimeStamp <= endTimeStamp && currentTimeStamp >= compareBeginTimeStamp && currentTimeStamp <= compareEndTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isHoverDay", function (_ref10) {
      var currentDay = _ref10.currentDay;
      var hoverTime = _this.state.hoverTime;
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      var hoverTimeStamp = hoverTime && getTimeTramp(hoverTime);
      return currentTimeStamp === hoverTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isCompareHoverDay", function (_ref11) {
      var currentDay = _ref11.currentDay;
      var _this$state9 = _this.state,
          hoverCompareTime = _this$state9.hoverCompareTime,
          hoverCompareEndTime = _this$state9.hoverCompareEndTime;
      var canSelectFuture = _this.props.canSelectFuture;

      if (!canSelectFuture && _this.isFutureDay({
        currentDay: currentDay
      })) {
        return false;
      }

      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      var hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
      var hoverEndTimeStamp = hoverCompareEndTime && getTimeTramp(hoverCompareEndTime);
      return currentTimeStamp === hoverTimeStamp || currentTimeStamp === hoverEndTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "isFirstCompareHoverDay", function (_ref12) {
      var currentDay = _ref12.currentDay;
      var hoverCompareTime = _this.state.hoverCompareTime;
      var currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
      var hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
      return currentTimeStamp === hoverTimeStamp;
    });

    _defineProperty(_assertThisInitialized(_this), "showToolTip", function (_ref13) {
      var currentDay = _ref13.currentDay;

      var isHoverDay = _this.isHoverDay({
        currentDay: currentDay
      });

      var isFirstCompareHoverDay = _this.isFirstCompareHoverDay({
        currentDay: currentDay
      });

      if (!isHoverDay && !isFirstCompareHoverDay) {
        return null;
      }

      var _this$state10 = _this.state,
          beginTime = _this$state10.beginTime,
          step = _this$state10.step,
          hoverCompareTime = _this$state10.hoverCompareTime,
          hoverCompareEndTime = _this$state10.hoverCompareEndTime;
      var diffDays;

      if (step === 1 && isHoverDay) {
        var currentTimeStamp = getTimeTramp(currentDay.value);
        var beginTimeStamp = getTimeTramp(beginTime);
        diffDays = getDaysByTimeTramp(Math.abs(currentTimeStamp - beginTimeStamp));
      } else if (step === 2 && isFirstCompareHoverDay) {
        var hoverCompareTimeStamp = getTimeTramp(hoverCompareTime);
        var hoverCompareEndTimeStamp = getTimeTramp(hoverCompareEndTime);
        diffDays = getDaysByTimeTramp(Math.abs(hoverCompareEndTimeStamp - hoverCompareTimeStamp));
      }

      var prefixCls = _this.props.prefixCls;
      return React.createElement("span", {
        className: prefixCls + "-item-tooltip"
      }, diffDays, "\u5929");
    });

    _defineProperty(_assertThisInitialized(_this), "renderItem", function (data) {
      var year = data.year,
          month = data.month;
      var _this$props6 = _this.props,
          prefixCls = _this$props6.prefixCls,
          canSelectFuture = _this$props6.canSelectFuture,
          selectMode = _this$props6.selectMode;
      var compareSwitch = _this.state.compareSwitch;
      var calendarItemDaysClx = prefixCls + "-date-body-month";
      var perMonthInDay = formatPerMonthInDay({
        year: year,
        month: month
      });

      var elements = _this.formatWeek(perMonthInDay);

      var isSingleMode = selectMode === 'single';
      var isCompareMode = selectMode === 'compare' && compareSwitch;
      var singleMonthElm = React.createElement("div", {
        className: calendarItemDaysClx
      }, elements.map(function (element, index) {
        return React.createElement("div", {
          key: "week-" + index,
          className: calendarItemDaysClx + "-week"
        }, element.map(function (day, dayIndex) {
          var _classNames;

          var value = day !== null ? day.value : "null-" + dayIndex;

          var isFutureDay = !canSelectFuture && _this.isFutureDay({
            currentDay: day
          }) || _this.isBeyondMaxDay({
            currentDay: day
          });

          var isPassDay = _this.isPassDay({
            currentDay: day
          });

          var daySpanCls = classNames(prefixCls + "-item", (_classNames = {}, _classNames[prefixCls + "-item-empty"] = !day, _classNames[prefixCls + "-item-selected"] = _this.isSelectedDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-disabled"] = isFutureDay || isPassDay, _classNames[prefixCls + "-item-between"] = !isSingleMode && _this.isBetweenDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-compare-selected"] = isCompareMode && _this.isCompareSelectedDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-compare-between"] = isCompareMode && _this.isCompareBetweenDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-cross"] = isCompareMode && _this.isCrossDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-hover"] = !isSingleMode && _this.isHoverDay({
            currentDay: day
          }), _classNames[prefixCls + "-item-compare-hover"] = isCompareMode && _this.isCompareHoverDay({
            currentDay: day
          }), _classNames));
          var disabled = !day || isFutureDay || isPassDay;
          var singleEl = React.createElement("span", {
            key: value,
            "data-value": value,
            className: daySpanCls,
            onMouseEnter: day ? _this.dayOnMonseEnter : null,
            onMouseLeave: day ? _this.dayOnMonseLeave : null,
            onClick: day ? _this.dayOnClick : null,
            "data-disabled": disabled
          }, day ? day.label : '', _this.state.showTip ? _this.showToolTip({
            currentDay: day
          }) : null);
          return singleEl;
        }));
      }));
      var singleMonth = React.createElement("div", {
        key: year + "/" + month,
        className: prefixCls + "-date-body-item",
        "data-value": year + "/" + month
      }, React.createElement("div", {
        className: prefixCls + "-date-body-head"
      }, React.createElement("span", {
        onMouseEnter: _this.selectAllInHover,
        onMouseLeave: _this.clearAllInMonth,
        onClick: _this.selectAllInClick,
        "data-year": year,
        "data-month": month
      }, year, "\u5E74", month, "\u6708")), singleMonthElm);
      return singleMonth;
    });

    var beginTimeObj = _props.beginTime ? getDetailDate(_props.beginTime) : null;

    var _isSingleMode = _props.selectMode === 'single';

    var _isCompareMode = _props.selectMode === 'compare';

    _this.state = {
      beginTime: beginTimeObj ? beginTimeObj.fullYear + "/" + beginTimeObj.fullMonth + "/" + beginTimeObj.fullDay : '',
      endTime: !_isSingleMode ? _props.endTime : '',
      compareBeginTime: _isCompareMode ? _props.compareBeginTime : '',
      compareEndTime: _isCompareMode ? _props.compareEndTime : '',
      // 点击完第一步，滑动的步数
      hoverTime: null,
      hoverCompareTime: null,
      hoverCompareEndTime: null,
      list: initDateMonths({
        currentDate: _props.selectYear + "/" + _props.selectMonth + "/1",
        validateMinDate: _props.validateMinDate,
        validateMaxDate: _props.validateMaxDate,
        canSelectFuture: _props.canSelectFuture
      }),
      selectYear: _props.selectYear,
      selectMonth: _props.selectMonth,
      step: 0,
      compareSwitch: _props.compareSwitch,
      showTip: false
    };
    return _this;
  }

  var _proto = CalendarBodyData.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var prefixCls = this.props.prefixCls;
    var list = this.state.list;
    return React.createElement("div", {
      className: prefixCls + "-date-body",
      ref: this.getBodyElement
    }, loadingInDateMode ? React.createElement("div", {
      className: prefixCls + "-date-body-loading"
    }, "\u65E5\u671F\u6B63\u5728\u52A0\u8F7D\u4E2D...") : null, React.createElement("div", {
      className: prefixCls + "-date-body-list",
      ref: this.getBodyListElement
    }, list.map(function (data) {
      return _this2.renderItem(data);
    })));
  };

  return CalendarBodyData;
}(Component);

_defineProperty(CalendarBodyData, "propTypes", {
  prefixCls: PropTypes.string,
  onScrollChange: PropTypes.func,
  beginTime: PropTypes.string,
  onChange: PropTypes.func,
  validateMinDate: PropTypes.string,
  validateMaxDate: PropTypes.string,
  visible: PropTypes.bool,
  selectYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  canSelectFuture: PropTypes.bool,
  selectMode: PropTypes.string,
  endTime: PropTypes.string,
  compareSwitch: PropTypes.bool,
  compareBeginTime: PropTypes.string,
  compareEndTime: PropTypes.string
});

_defineProperty(CalendarBodyData, "getDerivedStateFromProps", function (nextProps, state) {
  var validateMinDate = nextProps.validateMinDate,
      validateMaxDate = nextProps.validateMaxDate,
      canSelectFuture = nextProps.canSelectFuture;
  var selectMonth = state.selectMonth,
      selectYear = state.selectYear,
      list = state.list,
      beginTime = state.beginTime,
      endTime = state.endTime,
      compareBeginTime = state.compareBeginTime,
      compareEndTime = state.compareEndTime,
      compareSwitch = state.compareSwitch;
  var beginTimeObj = nextProps.beginTime ? getDetailDate(nextProps.beginTime) : null;
  var nextBeginTime = beginTimeObj ? beginTimeObj.fullYear + "/" + beginTimeObj.fullMonth + "/" + beginTimeObj.fullDay : null;
  var newState = {};

  if ('compareSwitch' in nextProps && nextProps.compareSwitch !== compareSwitch) {
    newState.compareSwitch = nextProps.compareSwitch; // 前一段时间如果选中了开始一段时间，点击比较的时候应该把这段时间带入，然后直接开始选比较时间

    newState.step = nextProps.beginTime && nextProps.compareSwitch ? 2 : 0;
    newState.hoverTime = null;
    newState.hoverCompareTime = null;
    newState.hoverCompareEndTime = null;
  }

  if ('beginTime' in nextProps && nextBeginTime !== beginTime) {
    newState.beginTime = nextBeginTime;
    newState.step = nextProps.beginTime && nextProps.compareSwitch ? 2 : 0;
    newState.hoverTime = null;
  }

  var nextPropsEndTime = nextProps.endTime;

  if ('endTime' in nextProps && nextPropsEndTime !== endTime) {
    newState.step = nextProps.beginTime && nextProps.compareSwitch ? 2 : 0;
    newState.endTime = nextPropsEndTime;
    newState.hoverTime = null;
  }

  var nextPropsCompareBeginTime = nextProps.compareBeginTime;

  if ('compareBeginTime' in nextProps && nextPropsCompareBeginTime !== compareBeginTime) {
    newState.compareBeginTime = nextPropsCompareBeginTime;
    newState.step = 0;
    newState.hoverCompareTime = null;
    newState.hoverCompareEndTime = null;
  }

  var nextPropsCompareEndTime = nextProps.compareEndTime;

  if ('compareEndTime' in nextProps && nextPropsCompareEndTime !== compareEndTime) {
    newState.compareEndTime = nextPropsCompareEndTime;
    newState.step = 0;
    newState.hoverCompareTime = null;
    newState.hoverCompareEndTime = null;
  }

  if ('selectYear' in nextProps && 'selectMonth' in nextProps && (selectYear !== nextProps.selectYear || selectMonth !== nextProps.selectMonth)) {
    newState.selectMonth = nextProps.selectMonth;
    newState.selectYear = nextProps.selectYear;

    if (list[3] && nextProps.selectMonth === list[3].month && nextProps.selectYear === list[3].year || nextProps.selectMonth === list[list.length - 1].month && nextProps.selectYear === list[list.length - 1].year) {
      var formatList = formatDaysByScroll({
        currentDate: nextProps.selectYear + "/" + nextProps.selectMonth + "/1",
        validateMinDate: validateMinDate,
        validateMaxDate: validateMaxDate,
        list: list,
        canSelectFuture: canSelectFuture
      });

      if (formatList.length) {
        newState.list = formatList;
      }
    }
  }

  return newState;
});

polyfill(CalendarBodyData);
export default CalendarBodyData;