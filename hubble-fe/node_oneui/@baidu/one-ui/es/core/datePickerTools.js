import dayjs from 'dayjs';
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
export var formatPerMonthInDay = function formatPerMonthInDay(date) {
  var year = date.year,
      month = date.month;
  var monthInDay = [];
  var days = monthDayRange(year)[month - 1];
  var firstDayInMonth = year + "/" + month + "/1";
  var lastDayInMonth = year + "/" + month + "/" + days;
  var getFirstDay = new Date(firstDayInMonth).getDay() === 0 ? 7 : new Date(firstDayInMonth).getDay();
  var getLastDay = new Date(lastDayInMonth).getDay() === 0 ? 7 : new Date(lastDayInMonth).getDay();
  month = +month;
  year = +year;
  var prevMonth = month - 1;
  var prevYear = year;

  if (month === 1) {
    prevMonth = 12;
    prevYear--;
  }

  var prevDays = monthDayRange(prevYear)[prevMonth - 1];

  for (var i = 1; i <= getFirstDay - 1; i++) {
    var currentDay = prevDays - (getFirstDay - i) + 1;
    monthInDay.push({
      value: prevYear + "/" + prevMonth + "/" + currentDay,
      label: currentDay,
      isCurrentMonth: false
    });
  }

  for (var _i = 1; _i <= days; _i++) {
    monthInDay.push({
      value: year + "/" + month + "/" + _i,
      label: _i,
      isCurrentMonth: true
    });
  }

  var nextMonth = +month + 1;
  var nextYear = year;

  if (month === 12) {
    nextMonth = 1;
    nextYear++;
  }

  for (var _i2 = 1; _i2 <= 14 - getLastDay; _i2++) {
    monthInDay.push({
      value: nextYear + "/" + nextMonth + "/" + _i2,
      label: _i2,
      isCurrentMonth: false
    });
  }

  return monthInDay;
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
export var getTimeTramp = function getTimeTramp(time) {
  return new Date(time + " 00:00:00").getTime();
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
export var getTodayDetail = function getTodayDetail() {
  var todayTime = dayjs().format('YYYY/MM/DD');

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
export var transDateFormat = function transDateFormat(date) {
  if (date) {
    return date.replace(/-/g, '/');
  }

  return '';
};
export var validateData = function validateData() {
  return {
    validateMinDate: '1900/01/01',
    validateMaxDate: '2050/12/31'
  };
};
export var formatMultipleDate = function formatMultipleDate(value, dateFormat) {
  var beginDate = null;
  var endDate = null;

  if (Array.isArray(value)) {
    // 存在比较的形式
    beginDate = value[0];
    endDate = value[1];
  } else {
    beginDate = value;
  }

  return {
    beginDate: beginDate ? dayjs(new Date(beginDate)).format(dateFormat) : beginDate,
    endDate: endDate ? dayjs(new Date(endDate)).format(dateFormat) : endDate
  };
};
export var isSingleMode = function isSingleMode(value, dateFormat) {
  return !formatMultipleDate(value, dateFormat).endDate && !Array.isArray(value);
};
export var formatButtonText = function formatButtonText(_ref) {
  var value = _ref.value,
      dateFormat = _ref.dateFormat;

  var _formatMultipleDate = formatMultipleDate(value, dateFormat),
      beginDate = _formatMultipleDate.beginDate,
      endDate = _formatMultipleDate.endDate;

  if (!beginDate && !endDate) {
    return '';
  }

  if (!endDate) {
    return beginDate;
  }

  return getTimeTramp(beginDate) === getTimeTramp(endDate) ? "" + beginDate : beginDate + "   ~    " + endDate;
};
export var formatInitialRangeDateInfo = function formatInitialRangeDateInfo(value, validateMaxDate) {
  if (value === void 0) {
    value = [];
  }

  // 需要获取初始化的面板信息，起始日期面板的year和month，结束日期面板的year和month
  var beginDate = value[0] || '';
  var endDate = value[1] || '';
  var todayDetail = getTodayDetail();
  var beginDateDetail = getDetailDate(beginDate);
  var endDateDetail = getDetailDate(endDate); // 起始日历面板信息

  var beginDateYear = beginDate ? beginDateDetail.fullYear : todayDetail.fullYear;
  var beginDateMonth = beginDate ? beginDateDetail.fullMonth : todayDetail.fullMonth; // 结束日历面板信息

  var endDateYear;
  var endDateMonth;

  if (endDate) {
    endDateYear = endDateDetail.fullYear;
    endDateMonth = endDateDetail.fullMonth;
  } else if (beginDateMonth === 12) {
    endDateYear = beginDateYear + 1;
    endDateMonth = 1;
  } else {
    endDateYear = beginDateYear;
    endDateMonth = beginDateMonth + 1;
  }

  if (beginDateYear === endDateYear && beginDateMonth === endDateMonth) {
    // 如果两者相等的情况下
    endDateMonth = beginDateMonth + 1;

    if (beginDateMonth === 12) {
      endDateMonth = 1;
      endDateYear++;
    }
  }

  var maxDate = validateMaxDate ? getDetailDate(validateMaxDate) : '';

  if (maxDate && getTimeTramp(endDateYear + "/" + endDateMonth + "/01") > getTimeTramp(maxDate.fullYear + "/" + maxDate.fullMonth + "/" + monthDayRange(maxDate.fullYear)[maxDate.fullMonth - 1])) {
    endDateMonth = maxDate.fullMonth;
    endDateYear = maxDate.fullYear;
    beginDateMonth = maxDate.fullMonth - 1;

    if (beginDateMonth === 0) {
      beginDateMonth = 12;
      beginDateYear--;
    }
  }

  return {
    beginDateYear: beginDateYear,
    beginDateMonth: beginDateMonth,
    endDateYear: endDateYear,
    endDateMonth: endDateMonth
  };
};
export var formatWeek = function formatWeek(perMonthInDay) {
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

  return elm.splice(0, 6);
};
export var formatShortCutDateItem = function formatShortCutDateItem(item) {
  var startOf = item.startOf,
      months = item.months,
      weeks = item.weeks,
      days = item.days;
  var currentType = 'day';
  var currentDate = 0;

  if (months !== undefined) {
    currentType = 'month';
    currentDate = months;
  }

  if (weeks !== undefined) {
    currentType = 'week';
    currentDate = weeks;
  }

  if (days !== undefined) {
    currentType = 'day';
    currentDate = days;
  }

  return dayjs().startOf(startOf).add(currentDate, currentType);
};
export var getShortCutDate = function getShortCutDate(shortcutItem, dateFormat) {
  var _shortcutItem$from = shortcutItem.from,
      from = _shortcutItem$from === void 0 ? 0 : _shortcutItem$from,
      _shortcutItem$to = shortcutItem.to,
      to = _shortcutItem$to === void 0 ? 0 : _shortcutItem$to;
  var beginDate;
  var endDate; // from是beginDate to是endDate

  if (typeof from === 'number') {
    beginDate = dayjs().add(from, 'day').format(dateFormat);
  }

  if (typeof to === 'number') {
    endDate = dayjs().add(to, 'day').format(dateFormat);
  }

  if (typeof from === 'object') {
    beginDate = formatShortCutDateItem(from).format(dateFormat);
  }

  if (typeof to === 'object') {
    endDate = formatShortCutDateItem(to).format(dateFormat);
  }

  return {
    beginDate: beginDate,
    endDate: endDate
  };
};