var _rulesMapFormat;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @file 日历组件 - 工具方法
 * @author huangshiming
 */
import _ from 'lodash';
import moment from 'moment';
import { allHours as allHourData, allMinutesAndSeconds as allMinutesAndSecondsData } from './config';
import { addZero } from '../pickTimeTools';
export var allHours = allHourData;
export var allMinutesAndSeconds = allMinutesAndSecondsData;
export var rulesMap = {
  ALL: 1,
  HOUR_AND_MINUTE: 2,
  ONLY_HOUR: 3
};
export var rulesMapFormat = (_rulesMapFormat = {}, _rulesMapFormat[rulesMap.ALL] = 'HH:mm:ss', _rulesMapFormat[rulesMap.HOUR_AND_MINUTE] = 'HH:mm', _rulesMapFormat[rulesMap.ONLY_HOUR] = 'HH', _rulesMapFormat);
export var formatTimeByRule = function formatTimeByRule(time, rule) {
  var hour = time.hour || '00';
  var minute = time.minute || '00';
  var second = time.second || '00';

  switch (rule) {
    case rulesMap.ALL:
      return hour + ":" + minute + ":" + second;

    case rulesMap.HOUR_AND_MINUTE:
      return hour + ":" + minute;

    case rulesMap.ONLY_HOUR:
      return hour;

    default:
      return '';
  }
};
export var getTimeStamp = function getTimeStamp(date) {
  if (!date) {
    return null;
  }

  var dateTimesTamp = new Date(date);

  if (dateTimesTamp.toDateString() === 'Invalid Date') {
    // 时间戳不合格
    return null;
  }

  return dateTimesTamp;
};
export var validateTime = function validateTime(string, timeRules) {
  var format = timeRules ? rulesMapFormat[timeRules] : 'HH:mm:ss';
  var parsed = moment(addZero(string), format, true);
  return parsed.isValid();
};
export var formatHours = function formatHours(params) {
  var beginTime = params.time;
  var timeRules = params.timeRules;

  if (!beginTime) {
    return {};
  }

  var timeStamp = getTimeStamp(beginTime);
  var timeArray = beginTime.split(' ');
  var timeStr = timeArray.length === 1 ? timeArray[0] : timeArray[1];

  if (!timeStamp && validateTime(timeStr, timeRules)) {
    var time = timeStr.split(':');
    return {
      hour: time[0] || '00',
      minute: time[1] || '00',
      second: time[2] || '00'
    };
  }

  if (timeStamp && !validateTime(timeStr, timeRules) || !timeStamp) {
    return {};
  }

  var hour = timeStamp.getHours();
  hour = hour < 10 ? "0" + hour : hour;
  var minute = timeStamp.getMinutes();
  minute = minute < 10 ? "0" + minute : minute;
  var second = timeStamp.getSeconds();
  second = second < 10 ? "0" + second : second;
  return {
    hour: hour,
    minute: minute,
    second: second
  };
};
export var getDetailDate = function getDetailDate(date) {
  var dateTimeStamp = getTimeStamp(date);

  if (!dateTimeStamp) {
    return {};
  }

  var fullYear = dateTimeStamp.getFullYear();
  var fullMonth = dateTimeStamp.getMonth() + 1;
  var fullDay = dateTimeStamp.getDate();
  return {
    fullYear: fullYear,
    fullMonth: fullMonth,
    fullDay: fullDay
  };
};
export var formatDataText = function formatDataText(current, compare, canSelectTime, selectMode, timeRules, compareSwitch) {
  if (!compare && !current) {
    return '';
  }

  var beginTime = current.beginTime,
      endTime = current.endTime;
  var begin = getDetailDate(beginTime.split(' ')[0]);
  var end = getDetailDate(endTime);
  var beiginFullYear = begin.fullYear;
  var beiginFullMonth = begin.fullMonth;
  var beiginFullDay = begin.fullDay;
  var endFullYear = end.fullYear;
  var endFullMonth = end.fullMonth;
  var endFullDay = end.fullDay;
  var isCompareMode = selectMode === 'compare';

  if ((!compare || !isCompareMode || !compareSwitch) && current) {
    if (beginTime && !endTime || beginTime === endTime) {
      var date = beiginFullYear + "/" + beiginFullMonth + "/" + beiginFullDay;
      var timeObj = formatHours({
        time: beginTime,
        timeRules: timeRules
      });
      var time = JSON.stringify(timeObj) === '{}' ? '' : timeObj;
      var timeStr = '';

      switch (timeRules) {
        case rulesMap.ALL:
          timeStr = time ? time.hour + ":" + time.minute + ":" + time.second : '';
          break;

        case rulesMap.HOUR_AND_MINUTE:
          timeStr = time ? time.hour + ":" + time.minute : '';
          break;

        case rulesMap.ONLY_HOUR:
          timeStr = time ? time.hour + "\u65F6" : '';
          break;

        default:
          break;
      }

      return canSelectTime ? date + " " + timeStr : date;
    }

    if (beginTime && endTime && beginTime !== endTime) {
      // 不跨年、不跨月
      if (beiginFullYear === endFullYear && beiginFullMonth === endFullMonth) {
        return beiginFullYear + "/" + beiginFullMonth + "/" + beiginFullDay + "-" + endFullDay;
      } // 不跨年、跨月


      if (beiginFullYear === endFullYear) {
        return beiginFullYear + "/" + beiginFullMonth + "/" + beiginFullDay + "-" + endFullMonth + "/" + endFullDay;
      } // 跨年


      return beiginFullYear + "/" + beiginFullMonth + "/" + beiginFullDay + "-" + endFullYear + "/" + endFullMonth + "/" + endFullDay;
    }
  }

  if (compare && current && isCompareMode) {
    var compareBeginTime = compare.compareBeginTime,
        compareEndTime = compare.compareEndTime;
    var compareText = beiginFullYear + "/" + beiginFullMonth + "/" + beiginFullDay;

    if (endTime && endTime !== beginTime) {
      compareText = compareText + "-" + endFullYear + "/" + endFullMonth + "/" + endFullDay;
    }

    if (compareBeginTime && compareEndTime) {
      var compareBegin = getDetailDate(compareBeginTime); // eslint-disable-next-line max-len

      compareText = compareText + " \u6BD4\u8F83 " + compareBegin.fullYear + "/" + compareBegin.fullMonth + "/" + compareBegin.fullDay;

      if (compareEndTime && compareEndTime !== compareBeginTime) {
        var compareEnd = getDetailDate(compareEndTime);
        compareText = compareText + "-" + compareEnd.fullYear + "/" + compareEnd.fullMonth + "/" + compareEnd.fullDay;
      }
    }

    return compareText;
  }
};
export var switchIndex = {
  today: {
    value: 'today',
    text: '今天'
  },
  yesterday: {
    value: 'yesterday',
    text: '昨天'
  },
  lastSevenDays: {
    value: 'lastSevenDays',
    text: '最近7天'
  },
  lastFourteenDays: {
    value: 'lastFourteenDays',
    text: '最近14天'
  },
  lastThirtyDays: {
    value: 'lastThirtyDays',
    text: '最近30天'
  },
  lastWeek: {
    value: 'lastWeek',
    text: '上周'
  },
  currentMonth: {
    value: 'currentMonth',
    text: '本月'
  },
  lastMonth: {
    value: 'lastMonth',
    text: '上个月'
  },
  compareYesterday: {
    value: 'compareYesterday',
    text: '今天/昨天'
  },
  compareLastWeek: {
    value: 'compareLastWeek',
    text: '本周/上周'
  },
  compareLastMonth: {
    value: 'compareLastMonth',
    text: '本月/上月'
  },
  lastYearToday: {
    value: 'lastYearToday',
    text: '上一年今日'
  },
  lastYearWeek: {
    value: 'lastYearWeek',
    text: '上一年本周'
  },
  lasterYearMonth: {
    value: 'lasterYearMonth',
    text: '上一年本月'
  }
};
export var getDateCompareObj = function getDateCompareObj(_ref) {
  var beginTime = _ref.beginTime,
      endTime = _ref.endTime,
      compareBeginTime = _ref.compareBeginTime,
      compareEndTime = _ref.compareEndTime,
      canSelectTime = _ref.canSelectTime,
      selectMode = _ref.selectMode,
      timeRules = _ref.timeRules,
      compareSwitch = _ref.compareSwitch;
  var current = null;
  var compare = null;

  if (!beginTime) {
    return null;
  }

  if (beginTime) {
    current = {};
    current.beginTime = beginTime;

    if (endTime) {
      current.endTime = endTime;
    }
  }

  if (compareBeginTime) {
    compare = {};
    compare.compareBeginTime = compareBeginTime;

    if (compareEndTime) {
      compare.compareEndTime = compareEndTime;
    }
  }

  return formatDataText(current, compare, canSelectTime, selectMode, timeRules, compareSwitch);
};
export var formatLastYearToday = function formatLastYearToday() {
  var today = moment().format('YYYY/MM/DD');
  var detailTime = getDetailDate(today);
  var fullYear = detailTime.fullYear,
      fullMonth = detailTime.fullMonth,
      fullDay = detailTime.fullDay;
  var lastYear = fullYear - 1;
  return lastYear + "-" + fullMonth + "-" + fullDay;
}; // 快捷操作的时候，要根据canSelectFuture，validateMaxDate，validateMinDate综合处理时间

export var getLimitTime = function getLimitTime(_ref2) {
  var beginTime = _ref2.beginTime,
      endTime = _ref2.endTime,
      canSelectFuture = _ref2.canSelectFuture,
      validateMaxDate = _ref2.validateMaxDate,
      validateMinDate = _ref2.validateMinDate;
  // 判断validateMinDate 和 beginTime
  var newBeginTime = beginTime;

  if (getTimeStamp(beginTime) < getTimeStamp(validateMinDate)) {
    newBeginTime = validateMinDate;
  }

  var newEndTime = endTime; // 比较后判断时间的时间戳

  var endTimeStamp = getTimeStamp(endTime);
  var validateMaxDateStamp = getTimeStamp(validateMaxDate); // 可以选择未来，就是最大时间与结束时间比较

  if (canSelectFuture) {
    if (endTimeStamp > validateMaxDateStamp) {
      newEndTime = validateMaxDate;
    }
  } else {
    // 不能选择未来，就是最大时间、今天、结束时间三个时间综合比较
    var today = moment().format('YYYY/MM/DD');
    var todayStamp = getTimeStamp(today);
    var maxTime = todayStamp > validateMaxDateStamp ? validateMaxDate : today;

    if (getTimeStamp(maxTime) < getTimeStamp(endTime)) {
      newEndTime = maxTime;
    }
  }

  return {
    beginTime: newBeginTime,
    endTime: newEndTime
  };
};
export var getTimeBySwitchStr = function getTimeBySwitchStr(_ref3) {
  var value = _ref3.value,
      canSelectFuture = _ref3.canSelectFuture,
      validateMaxDate = _ref3.validateMaxDate,
      validateMinDate = _ref3.validateMinDate;
  var beginTime;
  var endTime;
  var compareBeginTime;
  var compareEndTime;
  var lastYearToday = formatLastYearToday();

  switch (value) {
    case 'today':
      {
        beginTime = moment().format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: beginTime
        };
      }

    case 'yesterday':
      {
        beginTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: beginTime
        };
      }

    case 'lastSevenDays':
      {
        endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        beginTime = moment().subtract(7, 'days').format('YYYY/MM/DD');
        var newTime = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });
        return {
          beginTime: newTime.beginTime,
          endTime: newTime.endTime
        };
      }

    case 'lastFourteenDays':
      {
        endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        beginTime = moment().subtract(14, 'days').format('YYYY/MM/DD');

        var _newTime = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        return {
          beginTime: _newTime.beginTime,
          endTime: _newTime.endTime
        };
      }

    case 'lastThirtyDays':
      {
        endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        beginTime = moment().subtract(30, 'days').format('YYYY/MM/DD');

        var _newTime2 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        return {
          beginTime: _newTime2.beginTime,
          endTime: _newTime2.endTime
        };
      }

    case 'lastWeek':
      {
        beginTime = moment().week(moment().week() - 1).startOf('week').format('YYYY/MM/DD');
        endTime = moment().week(moment().week() - 1).endOf('week').format('YYYY/MM/DD');

        var _newTime3 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        return {
          beginTime: _newTime3.beginTime,
          endTime: _newTime3.endTime
        };
      }

    case 'lastMonth':
      {
        beginTime = moment().month(moment().month() - 1).startOf('month').format('YYYY/MM/DD');
        endTime = moment().month(moment().month() - 1).endOf('month').format('YYYY/MM/DD');

        var _newTime4 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        return {
          beginTime: _newTime4.beginTime,
          endTime: _newTime4.endTime
        };
      }

    case 'currentMonth':
      {
        beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
        endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD'); // 本月为今天至今的时间

        var _newTime5 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        return {
          beginTime: _newTime5.beginTime,
          endTime: _newTime5.endTime
        };
      }

    case 'compareYesterday':
      {
        beginTime = moment().format('YYYY/MM/DD');
        endTime = moment().format('YYYY/MM/DD');
        compareBeginTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        compareEndTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    case 'compareLastWeek':
      {
        beginTime = moment().week(moment().week()).startOf('week').format('YYYY/MM/DD');
        endTime = moment().week(moment().week()).endOf('week').format('YYYY/MM/DD');

        var _newTime6 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        beginTime = _newTime6.beginTime;
        endTime = _newTime6.endTime;
        compareBeginTime = moment().week(moment().week() - 1).startOf('week').format('YYYY/MM/DD');
        var diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;
        compareEndTime = moment(compareBeginTime).add(diffDays, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    case 'compareLastMonth':
      {
        beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
        endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD');

        var _newTime7 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        beginTime = _newTime7.beginTime;
        endTime = _newTime7.endTime;

        var _diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;

        compareBeginTime = moment().month(moment().month() - 1).startOf('month').format('YYYY/MM/DD');
        compareEndTime = moment(compareBeginTime).add(_diffDays, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    case 'lastYearToday':
      {
        beginTime = moment().format('YYYY/MM/DD');
        endTime = beginTime;
        compareBeginTime = moment(lastYearToday).format('YYYY/MM/DD');
        compareEndTime = compareBeginTime;
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    case 'lastYearWeek':
      {
        beginTime = moment().week(moment().week()).startOf('week').format('YYYY/MM/DD');
        endTime = moment().week(moment().week()).endOf('week').format('YYYY/MM/DD');

        var _newTime8 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        beginTime = _newTime8.beginTime;
        endTime = _newTime8.endTime;

        var _diffDays2 = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;

        compareBeginTime = moment(lastYearToday).week(moment().week()).startOf('week').format('YYYY/MM/DD');
        compareEndTime = moment(compareBeginTime).add(_diffDays2, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    case 'lasterYearMonth':
      {
        beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
        endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD');

        var _newTime9 = getLimitTime({
          beginTime: beginTime,
          endTime: endTime,
          canSelectFuture: canSelectFuture,
          validateMaxDate: validateMaxDate,
          validateMinDate: validateMinDate
        });

        beginTime = _newTime9.beginTime;
        endTime = _newTime9.endTime;

        var _diffDays3 = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;

        compareBeginTime = moment(lastYearToday).month(moment().month()).startOf('month').format('YYYY/MM/DD');
        compareEndTime = moment(compareBeginTime).add(_diffDays3, 'days').format('YYYY/MM/DD');
        return {
          beginTime: beginTime,
          endTime: endTime,
          compareBeginTime: compareBeginTime,
          compareEndTime: compareEndTime
        };
      }

    default:
      return '';
  }
};
export var isLeapYear = function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
export var monthDayRange = function monthDayRange(year) {
  var leapYear = isLeapYear(+year);

  if (leapYear) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};
export var getTodayDetail = function getTodayDetail() {
  var todayTime = moment().format('YYYY/MM/DD');

  var _getDetailDate = getDetailDate(todayTime),
      fullYear = _getDetailDate.fullYear,
      fullMonth = _getDetailDate.fullMonth,
      fullDay = _getDetailDate.fullDay;

  return {
    fullYear: fullYear,
    fullMonth: fullMonth,
    fullDay: fullDay
  };
};
export var formatPerMonthInDay = function formatPerMonthInDay(date) {
  var year = date.year,
      month = date.month;
  var monthInDay = [];
  var days = monthDayRange(year)[month - 1];
  var firstDayInMonth = year + "/" + month + "/1";
  var lastDayInMonth = year + "/" + month + "/" + days;
  var getFirstDay = new Date(firstDayInMonth).getDay() === 0 ? 7 : new Date(firstDayInMonth).getDay();
  var getLastDay = new Date(lastDayInMonth).getDay() === 0 ? 7 : new Date(lastDayInMonth).getDay();

  for (var i = 1; i <= getFirstDay - 1; i++) {
    monthInDay.push(null);
  }

  for (var _i = 1; _i <= days; _i++) {
    monthInDay.push({
      value: year + "/" + month + "/" + _i,
      label: _i
    });
  }

  for (var _i2 = 1; _i2 <= 7 - getLastDay; _i2++) {
    monthInDay.push(null);
  }

  return monthInDay;
};
export var formatAllMonthByYear = function formatAllMonthByYear(totalYear) {
  var obj = {};

  var _getTodayDetail = getTodayDetail(),
      fullYear = _getTodayDetail.fullYear,
      fullMonth = _getTodayDetail.fullMonth;

  var i = 1;
  var month = fullMonth;
  var year = fullYear;
  var maxCount = totalYear * 12 + 1;

  while (i < maxCount) {
    obj[year + "/" + month] = maxCount - i;
    i++;
    month--;

    if (month === 0) {
      year--;
      month = 12;
    }
  }

  return obj;
};
export var getTimeTramp = function getTimeTramp(time) {
  return new Date(time + " 00:00:00").getTime();
};
export var getDaysByTimeTramp = function getDaysByTimeTramp(timeTramp) {
  return Math.ceil(timeTramp / (24 * 3600 * 1000)) + 1;
};
export var formatSelectTime = function formatSelectTime(params) {
  var beginTime = params.beginTime,
      endTime = params.endTime,
      compareBeginTime = params.compareBeginTime,
      compareEndTime = params.compareEndTime,
      selectMode = params.selectMode,
      compareSwitch = params.compareSwitch;

  if (!beginTime && !endTime && !compareBeginTime && !compareEndTime) {
    var todayTime = getTodayDetail();
    return {
      year: todayTime.fullYear,
      month: todayTime.fullMonth
    };
  }

  var fullMonth;
  var fullYear;

  if (selectMode === 'single') {
    var beginTimeObj = getDetailDate(beginTime);
    fullYear = beginTimeObj.fullYear;
    fullMonth = beginTimeObj.fullMonth;
  } else if (selectMode === 'multiple') {
    var _beginTimeObj = getDetailDate(endTime);

    fullYear = _beginTimeObj.fullYear;
    fullMonth = _beginTimeObj.fullMonth;
  } else if (selectMode === 'compare') {
    var endTimeStamp = getTimeStamp(endTime);
    var compareEndTimeStamp = getTimeStamp(compareEndTime);
    var time = compareEndTimeStamp > endTimeStamp && compareSwitch ? compareEndTime : endTime;
    var timeObj = getDetailDate(time);
    fullYear = timeObj.fullYear;
    fullMonth = timeObj.fullMonth;
  }

  return {
    year: fullYear,
    month: fullMonth
  };
};
export var formatSingleYear = function formatSingleYear(year) {
  return {
    year: year,
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  };
};
export var formatAllMonths = function formatAllMonths(params) {
  var newMonthsList = [];
  var list = params.list,
      currentYear = params.currentYear,
      validateMinDate = params.validateMinDate,
      validateMaxDate = params.validateMaxDate,
      canSelectFuture = params.canSelectFuture;
  var validateFirstYear = getDetailDate(validateMinDate).fullYear;
  var validateLastYear = getDetailDate(validateMaxDate).fullYear;
  var todayYear = getTodayDetail().fullYear;

  if (!canSelectFuture && validateLastYear > todayYear) {
    validateLastYear = todayYear;
  }

  var minGap = currentYear - validateFirstYear;
  var maxGap = validateLastYear - currentYear;

  if (currentYear === list[0].year) {
    for (var i = 0; i < (minGap > 5 ? 5 : minGap); i++) {
      newMonthsList.unshift(formatSingleYear(currentYear - i - 1));
    }

    newMonthsList = newMonthsList.concat(list);
  } else if (currentYear === list[list.length - 1].year) {
    for (var _i3 = 0; _i3 < (maxGap > 5 ? 5 : maxGap); _i3++) {
      newMonthsList.push(formatSingleYear(currentYear + _i3 + 1));
    }

    newMonthsList = list.concat(newMonthsList);
  }

  return newMonthsList;
};
export var initFormatAllMonths = function initFormatAllMonths(params) {
  var newMonthsList = [];
  var currentYear = params.currentYear,
      validateMinDate = params.validateMinDate,
      validateMaxDate = params.validateMaxDate,
      canSelectFuture = params.canSelectFuture;
  var validateFirstYear = getDetailDate(validateMinDate).fullYear;
  var validateLastYear = getDetailDate(validateMaxDate).fullYear;
  var todayYear = getTodayDetail().fullYear;

  if (!canSelectFuture && validateLastYear > todayYear) {
    validateLastYear = todayYear;
  }

  var minGap = currentYear - validateFirstYear;
  var maxGap = validateLastYear - currentYear;
  var firstIndex = minGap > 5 ? currentYear - 5 : validateFirstYear;
  var lastIndex = maxGap > 5 ? currentYear + 5 : validateLastYear;

  for (var i = firstIndex; i <= lastIndex; i++) {
    newMonthsList.push(formatSingleYear(i));
  }

  return newMonthsList;
};
export var selectScrollYearIndex = function selectScrollYearIndex(params) {
  var selectYear = params.selectYear,
      list = params.list;
  return _.findIndex(list, function (item) {
    return +item.year === +selectYear;
  });
};
export var validateData = function validateData() {
  var currentYear = getTodayDetail().fullYear;
  return {
    validateMinDate: currentYear - 10 + "/1/1",
    validateMaxDate: currentYear + 10 + "/12/31"
  };
};
export var initDateMonths = function initDateMonths(params) {
  var list = [];
  var currentDate = params.currentDate,
      validateMinDate = params.validateMinDate,
      validateMaxDate = params.validateMaxDate,
      canSelectFuture = params.canSelectFuture;
  var today = getTodayDetail();
  var todayFullMonth = today.fullMonth;
  var todayFullYear = today.fullYear;
  var fullYear;
  var fullMonth;

  if (!currentDate) {
    fullYear = todayFullYear;
    fullMonth = todayFullMonth;
  } else {
    fullYear = getDetailDate(currentDate).fullYear;
    fullMonth = getDetailDate(currentDate).fullMonth;
  }

  var validateBeginDate = getDetailDate(validateMinDate);
  var validateFirstDate = validateBeginDate.fullYear + "/" + validateBeginDate.fullMonth + "/1";
  var validateEndDate = getDetailDate(validateMaxDate);
  var validateLastDate = validateEndDate.fullYear + "/\n        " + validateEndDate.fullMonth + "/\n        " + monthDayRange(+validateEndDate.fullYear)[+validateEndDate.fullMonth - 1];
  list.push({
    year: fullYear,
    month: fullMonth
  }); // 往前加12个月数据，往后推6个月数据，减少翻页时的卡顿

  var prevCount = 18;
  var currentPrevMonth = fullMonth;
  var currentPrevYear = fullYear;

  while (prevCount > 0) {
    if (currentPrevMonth === 1) {
      currentPrevYear--;
      currentPrevMonth = 12;
    } else {
      currentPrevMonth--;
    }

    var currentTimeStamp = getTimeStamp(currentPrevYear + "/" + currentPrevMonth + "/1");

    if (currentTimeStamp >= getTimeStamp(validateFirstDate)) {
      list.unshift({
        year: currentPrevYear,
        month: currentPrevMonth
      });
    }

    prevCount--;
  }

  var currentNextMonth = fullMonth;
  var currentNextYear = fullYear;
  var nextCount = 6;

  while (nextCount > 0) {
    if (currentNextMonth === 12) {
      currentNextYear++;
      currentNextMonth = 1;
    } else {
      currentNextMonth++;
    }

    var nextDay = currentNextYear + "/" + currentNextMonth + "/" + monthDayRange(currentNextYear)[currentNextMonth - 1];
    var nextDate = getTimeStamp(nextDay);

    if (nextDate <= getTimeStamp(validateLastDate) && !(!canSelectFuture && nextDate > getTimeStamp(todayFullYear + "/" + todayFullMonth + "/" + monthDayRange(todayFullYear)[todayFullMonth - 1]))) {
      list.push({
        year: currentNextYear,
        month: currentNextMonth
      });
    }

    nextCount--;
  }

  return list;
}; // 将月份与dom的index挂载

export var selectedMonthIndex = function selectedMonthIndex(params) {
  var beginTime = params.beginTime,
      list = params.list;

  var _getDetailDate2 = getDetailDate(beginTime),
      fullMonth = _getDetailDate2.fullMonth,
      fullYear = _getDetailDate2.fullYear;

  var index = _.findIndex(list, function (item) {
    return +fullMonth === +item.month && +fullYear === +item.year;
  });

  return index || 0;
};
export var formatDaysByScroll = function formatDaysByScroll(params) {
  var newList = [];
  var list = params.list,
      currentDate = params.currentDate,
      validateMinDate = params.validateMinDate,
      validateMaxDate = params.validateMaxDate,
      canSelectFuture = params.canSelectFuture,
      scrollIndex = params.scrollIndex;

  var _getDetailDate3 = getDetailDate(currentDate),
      fullYear = _getDetailDate3.fullYear,
      fullMonth = _getDetailDate3.fullMonth;

  var validateBeginDate = getDetailDate(validateMinDate);
  var validateFirstDate = validateBeginDate.fullYear + "/" + validateBeginDate.fullMonth + "/1";
  var validateEndDate = getDetailDate(validateMaxDate);
  var validateLastDate = validateEndDate.fullYear + "/\n        " + validateEndDate.fullMonth + "/\n        " + monthDayRange(+validateEndDate.fullYear)[+validateEndDate.fullMonth - 1]; // 滑动在中间区域去加载数据

  var index = scrollIndex !== 0 ? 3 : 0;
  var middleYear = list[index] && list[index].year;
  var middleMonth = list[index] && list[index].month;
  var firstYear = list[0].year;
  var firstMonth = list[0].month;

  if (middleYear === fullYear && middleMonth === fullMonth) {
    // 一次往前加12个月数据
    for (var i = 1; i <= 6; i++) {
      var currentYear = void 0;
      var currentMonth = void 0;

      if (firstMonth - i <= 0) {
        currentYear = firstYear - 1;
        currentMonth = 12 + (firstMonth - i);
      } else {
        currentYear = firstYear;
        currentMonth = firstMonth - i;
      }

      if (getTimeStamp(currentYear + "/" + currentMonth + "/1") >= getTimeStamp(validateFirstDate)) {
        newList.unshift({
          year: currentYear,
          month: currentMonth
        });
      }
    }

    newList = newList.concat(list); // 防止数据过多造成数据渲染卡顿，永远只有2年数据

    newList = newList.length > 24 ? newList.splice(0, 24) : newList;
    return newList;
  }

  if (list[list.length - 1].year === fullYear && list[list.length - 1].month === fullMonth) {
    // 一次往后加载6个月数据
    for (var _i4 = 1; _i4 <= 6; _i4++) {
      var _currentYear = void 0;

      var _currentMonth = void 0;

      if (fullMonth + _i4 > 12) {
        _currentYear = fullYear + 1;
        _currentMonth = fullMonth + _i4 - 12;
      } else {
        _currentYear = fullYear;
        _currentMonth = fullMonth + _i4;
      }
      /** 当前时间小于validateMaxDate 或者 如果不能选择未来的话，月份要小于当前月份的最后一天 */


      var currentMonthDays = monthDayRange(_currentYear)[_currentMonth - 1];

      var currentDayTimeStamp = getTimeStamp(_currentYear + "/" + _currentMonth + "/" + currentMonthDays);
      var today = getTodayDetail();
      var todayMonthDays = monthDayRange(today.fullYear)[today.fullMonth - 1];
      var todayLastDayTimeStamp = getTimeStamp(today.fullYear + "/" + today.fullMonth + "/" + todayMonthDays);

      if (currentDayTimeStamp <= getTimeStamp(validateLastDate) && !(!canSelectFuture && currentDayTimeStamp > todayLastDayTimeStamp)) {
        newList.push({
          year: _currentYear,
          month: _currentMonth
        });
      }
    }

    newList = list.concat(newList); // 防止数据过多造成数据渲染卡顿，永远只有2年数据

    newList = newList.length > 24 ? newList.slice(-24) : newList;
    return newList;
  }

  return list;
};
export var formatHoursByString = function formatHoursByString(string) {
  var timeArray = string.split(':');
  return {
    hour: timeArray[0] || '00',
    minute: timeArray[1] || '00',
    second: timeArray[2] || '00'
  };
};
export var getMaxTimeInTwoDate = function getMaxTimeInTwoDate(_ref4) {
  var prevTime = _ref4.prevTime,
      compareTime = _ref4.compareTime;
  var prevTimeStamp = getTimeStamp(prevTime);
  var compareTimeStamp = getTimeStamp(compareTime);
  var time = compareTimeStamp > prevTimeStamp ? compareTimeStamp : prevTimeStamp;
  var timeObj = getDetailDate(time);
  return {
    year: timeObj.fullYear,
    month: timeObj.fullMonth
  };
};
export var formatTwoDateInOrder = function formatTwoDateInOrder(_ref5) {
  var minDate = _ref5.minDate,
      maxDate = _ref5.maxDate;
  var minDateTimeStamp = getTimeStamp(minDate);
  var maxDateTimeStamp = getTimeStamp(maxDate);

  if (minDateTimeStamp > maxDateTimeStamp) {
    return {
      minDate: maxDate,
      maxDate: minDate
    };
  }

  return {
    minDate: minDate,
    maxDate: maxDate
  };
};
export var validateDateBeyondToday = function validateDateBeyondToday(date) {
  var todayDate = new Date().getTime();
  var selectDay = new Date(date).getTime();

  if (selectDay > todayDate) {
    return true;
  }

  return false;
};
export var transDateFormat = function transDateFormat(date) {
  if (date) {
    return date.replace(/-/g, '/');
  }

  return '';
}; // 格式话时间 symbol 只支持/ 和 -

export var formatDate = function formatDate(symbol, date) {
  var seperater = '/';

  if (symbol === '-') {
    seperater = symbol;
  }

  return moment(new Date(date)).format("YYYY" + seperater + "MM" + seperater + "DD");
};
export var transObjDateFormat = function transObjDateFormat(obj) {
  var beginTime = obj.beginTime,
      endTime = obj.endTime,
      compareBeginTime = obj.compareBeginTime,
      compareEndTime = obj.compareEndTime,
      canSelectTime = obj.canSelectTime;
  var timeArray = beginTime.split(' ');
  var time = canSelectTime ? timeArray[1] : '';
  var currentBeginTime = canSelectTime ? timeArray[0] : beginTime;
  var formatBeginTime = beginTime ? formatDate('-', currentBeginTime) : '';
  var formatEndTime = endTime ? formatDate('-', endTime) : '';
  var formatCompareBeginTime = compareBeginTime ? formatDate('-', compareBeginTime) : '';
  var formatCompareEndTime = compareEndTime ? formatDate('-', compareEndTime) : '';
  return _extends({}, obj, {
    beginTime: canSelectTime ? formatBeginTime + " " + time : formatBeginTime,
    endTime: formatEndTime,
    compareBeginTime: formatCompareBeginTime,
    compareEndTime: formatCompareEndTime
  });
};
export var getTodayStr = function getTodayStr() {
  var _getTodayDetail2 = getTodayDetail(),
      fullYear = _getTodayDetail2.fullYear,
      fullMonth = _getTodayDetail2.fullMonth,
      fullDay = _getTodayDetail2.fullDay;

  return fullYear + "/" + fullMonth + "/" + fullDay;
};
export var dateFormat = function dateFormat(date, tpl) {
  if (!(date instanceof Date)) {
    return date;
  }

  date = date || new Date();
  tpl = tpl || 'YYYY-MM-DD hh:mm:ss';
  var o = {
    'M+': date.getMonth() + 1,
    // 月份
    'D+': date.getDate(),
    // 日
    'h+': date.getHours(),
    // 小时
    'm+': date.getMinutes(),
    // 分
    's+': date.getSeconds(),
    // 秒
    'S+': date.getMilliseconds() // 毫秒

  };

  if (/(Y+)/.test(tpl)) {
    tpl = tpl.replace(RegExp.$1, ("" + date.getFullYear()).substr(4 - RegExp.$1.length));
  }

  _.forEach(Object.keys(o), function (k) {
    if (new RegExp("(" + k + ")").test(tpl)) {
      tpl = tpl.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  });

  return tpl;
};