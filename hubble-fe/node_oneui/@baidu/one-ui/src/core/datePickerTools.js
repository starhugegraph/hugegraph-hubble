import dayjs from 'dayjs';

export const isLeapYear = year => {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0);
};

export const monthDayRange = year => {
    const leapYear = isLeapYear(+year);
    if (leapYear) {
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }

    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

export const formatPerMonthInDay = date => {
    let {
        year,
        month
    } = date;
    const monthInDay = [];
    const days = monthDayRange(year)[month - 1];
    const firstDayInMonth = `${year}/${month}/1`;
    const lastDayInMonth = `${year}/${month}/${days}`;
    const getFirstDay = new Date(firstDayInMonth).getDay() === 0 ? 7 : new Date(firstDayInMonth).getDay();
    const getLastDay = new Date(lastDayInMonth).getDay() === 0 ? 7 : new Date(lastDayInMonth).getDay();
    month = +month;
    year = +year;
    let prevMonth = month - 1;
    let prevYear = year;
    if (month === 1) {
        prevMonth = 12;
        prevYear--;
    }

    const prevDays = monthDayRange(prevYear)[prevMonth - 1];

    for (let i = 1; i <= getFirstDay - 1; i++) {
        const currentDay = prevDays - (getFirstDay - i) + 1;
        monthInDay.push({
            value: `${prevYear}/${prevMonth}/${currentDay}`,
            label: currentDay,
            isCurrentMonth: false
        });
    }

    for (let i = 1; i <= days; i++) {
        monthInDay.push({
            value: `${year}/${month}/${i}`,
            label: i,
            isCurrentMonth: true
        });
    }

    let nextMonth = +month + 1;
    let nextYear = year;
    if (month === 12) {
        nextMonth = 1;
        nextYear++;
    }

    for (let i = 1; i <= (14 - getLastDay); i++) {
        monthInDay.push({
            value: `${nextYear}/${nextMonth}/${i}`,
            label: i,
            isCurrentMonth: false
        });
    }
    return monthInDay;
};

export const getTimeStamp = date => {
    if (!date) {
        return null;
    }
    const dateTimesTamp = new Date(date);
    if (dateTimesTamp.toDateString() === 'Invalid Date') {
        // 时间戳不合格
        return null;
    }
    return dateTimesTamp;
};

export const getTimeTramp = time => {
    return new Date(`${time} 00:00:00`).getTime();
};

export const getDetailDate = date => {
    const dateTimeStamp = getTimeStamp(date);
    if (!dateTimeStamp) {
        return {};
    }
    const fullYear = dateTimeStamp.getFullYear();
    const fullMonth = dateTimeStamp.getMonth() + 1;
    const fullDay = dateTimeStamp.getDate();
    return {
        fullYear,
        fullMonth,
        fullDay
    };
};

export const getTodayDetail = () => {
    const todayTime = dayjs().format('YYYY/MM/DD');
    const {
        fullYear,
        fullMonth,
        fullDay
    } = getDetailDate(todayTime);
    return {
        fullYear,
        fullMonth,
        fullDay
    };
};

export const transDateFormat = date => {
    if (date) {
        return date.replace(/-/g, '/');
    }
    return '';
};

export const validateData = () => {
    return {
        validateMinDate: '1900/01/01',
        validateMaxDate: '2050/12/31'
    };
};

export const formatMultipleDate = (value, dateFormat) => {
    let beginDate = null;
    let endDate = null;
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

export const isSingleMode = (value, dateFormat) => {
    return !formatMultipleDate(value, dateFormat).endDate && !Array.isArray(value);
};

export const formatButtonText = ({
    value,
    dateFormat
}) => {
    const {
        beginDate,
        endDate
    } = formatMultipleDate(value, dateFormat);
    if (!beginDate && !endDate) {
        return '';
    }
    if (!endDate) {
        return beginDate;
    }
    return getTimeTramp(beginDate) === getTimeTramp(endDate)
        ? `${beginDate}`
        : `${beginDate}   ~    ${endDate}`;
};

export const formatInitialRangeDateInfo = (value = [], validateMaxDate) => {
    // 需要获取初始化的面板信息，起始日期面板的year和month，结束日期面板的year和month
    const beginDate = value[0] || '';
    const endDate = value[1] || '';
    const todayDetail = getTodayDetail();
    const beginDateDetail = getDetailDate(beginDate);
    const endDateDetail = getDetailDate(endDate);
    // 起始日历面板信息
    let beginDateYear = beginDate ? beginDateDetail.fullYear : todayDetail.fullYear;
    let beginDateMonth = beginDate ? beginDateDetail.fullMonth : todayDetail.fullMonth;

    // 结束日历面板信息
    let endDateYear;
    let endDateMonth;

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
    const maxDate = validateMaxDate ? getDetailDate(validateMaxDate) : '';
    if (maxDate && getTimeTramp(`${endDateYear}/${endDateMonth}/01`)
    > getTimeTramp(
        `${maxDate.fullYear}/${maxDate.fullMonth}/${monthDayRange(maxDate.fullYear)[maxDate.fullMonth - 1]}`
    )) {
        endDateMonth = maxDate.fullMonth;
        endDateYear = maxDate.fullYear;
        beginDateMonth = maxDate.fullMonth - 1;
        if (beginDateMonth === 0) {
            beginDateMonth = 12;
            beginDateYear--;
        }
    }

    return {
        beginDateYear,
        beginDateMonth,
        endDateYear,
        endDateMonth
    };
};

export const formatWeek = perMonthInDay => {
    const elm = [];
    let index = 0;
    for (let i = 1; i <= perMonthInDay.length; i++) {
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

export const formatShortCutDateItem = item => {
    const {startOf, months, weeks, days} = item;
    let currentType = 'day';
    let currentDate = 0;
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

export const getShortCutDate = (shortcutItem, dateFormat) => {
    const {
        from = 0,
        to = 0
    } = shortcutItem;
    let beginDate;
    let endDate;
    // from是beginDate to是endDate
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
        beginDate,
        endDate
    };
};
