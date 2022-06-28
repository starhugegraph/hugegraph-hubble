/**
 * @file 日历组件 - 工具方法
 * @author huangshiming
 */
import _ from 'lodash';
import moment from 'moment';
import {
    allHours as allHourData,
    allMinutesAndSeconds as allMinutesAndSecondsData
} from './config';
import {addZero} from '../pickTimeTools';

export const allHours = allHourData;
export const allMinutesAndSeconds = allMinutesAndSecondsData;

export const rulesMap = {
    ALL: 1,
    HOUR_AND_MINUTE: 2,
    ONLY_HOUR: 3
};

export const rulesMapFormat = {
    [rulesMap.ALL]: 'HH:mm:ss',
    [rulesMap.HOUR_AND_MINUTE]: 'HH:mm',
    [rulesMap.ONLY_HOUR]: 'HH'
};


export const formatTimeByRule = (time, rule) => {
    const hour = time.hour || '00';
    const minute = time.minute || '00';
    const second = time.second || '00';
    switch (rule) {
        case rulesMap.ALL:
            return `${hour}:${minute}:${second}`;
        case rulesMap.HOUR_AND_MINUTE:
            return `${hour}:${minute}`;
        case rulesMap.ONLY_HOUR:
            return hour;
        default:
            return '';
    }
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
export const validateTime = (string, timeRules) => {
    const format = timeRules ? rulesMapFormat[timeRules] : 'HH:mm:ss';
    const parsed = moment(addZero(string), format, true);
    return parsed.isValid();
};

export const formatHours = params => {
    const beginTime = params.time;
    const timeRules = params.timeRules;
    if (!beginTime) {
        return {};
    }
    const timeStamp = getTimeStamp(beginTime);
    const timeArray = beginTime.split(' ');
    const timeStr = timeArray.length === 1 ? timeArray[0] : timeArray[1];
    if (!timeStamp && validateTime(timeStr, timeRules)) {
        const time = timeStr.split(':');
        return {
            hour: time[0] || '00',
            minute: time[1] || '00',
            second: time[2] || '00'
        };
    }
    if ((timeStamp && !validateTime(timeStr, timeRules)) || !timeStamp) {
        return {};
    }
    let hour = timeStamp.getHours();
    hour = hour < 10 ? `0${hour}` : hour;
    let minute = timeStamp.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;
    let second = timeStamp.getSeconds();
    second = second < 10 ? `0${second}` : second;
    return {
        hour,
        minute,
        second
    };
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

export const formatDataText = (current, compare, canSelectTime, selectMode, timeRules, compareSwitch) => {
    if (!compare && !current) {
        return '';
    }
    const {beginTime, endTime} = current;
    const begin = getDetailDate(beginTime.split(' ')[0]);
    const end = getDetailDate(endTime);
    const beiginFullYear = begin.fullYear;
    const beiginFullMonth = begin.fullMonth;
    const beiginFullDay = begin.fullDay;
    const endFullYear = end.fullYear;
    const endFullMonth = end.fullMonth;
    const endFullDay = end.fullDay;
    const isCompareMode = selectMode === 'compare';
    if ((!compare || !isCompareMode || !compareSwitch) && current) {
        if ((beginTime && !endTime) || (beginTime === endTime)) {
            const date = `${beiginFullYear}/${beiginFullMonth}/${beiginFullDay}`;
            const timeObj = formatHours({time: beginTime, timeRules});
            const time = JSON.stringify(timeObj) === '{}'
                ? '' : timeObj;
            let timeStr = '';
            switch (timeRules) {
                case rulesMap.ALL:
                    timeStr = time ? `${time.hour}:${time.minute}:${time.second}` : '';
                    break;
                case rulesMap.HOUR_AND_MINUTE:
                    timeStr = time ? `${time.hour}:${time.minute}` : '';
                    break;
                case rulesMap.ONLY_HOUR:
                    timeStr = time ? `${time.hour}时` : '';
                    break;
                default:
                    break;
            }
            return canSelectTime ? `${date} ${timeStr}` : date;
        }
        if (beginTime && endTime && beginTime !== endTime) {
            // 不跨年、不跨月
            if (beiginFullYear === endFullYear && beiginFullMonth === endFullMonth) {
                return `${beiginFullYear}/${beiginFullMonth}/${beiginFullDay}-${endFullDay}`;
            }
            // 不跨年、跨月
            if (beiginFullYear === endFullYear) {
                return `${beiginFullYear}/${beiginFullMonth}/${beiginFullDay}-${endFullMonth}/${endFullDay}`;
            }
            // 跨年
            return `${beiginFullYear}/${beiginFullMonth}/${beiginFullDay}-${endFullYear}/${endFullMonth}/${endFullDay}`;
        }
    }

    if (compare && current && isCompareMode) {
        const {compareBeginTime, compareEndTime} = compare;
        let compareText = `${beiginFullYear}/${beiginFullMonth}/${beiginFullDay}`;
        if (endTime && endTime !== beginTime) {
            compareText = `${compareText}-${endFullYear}/${endFullMonth}/${endFullDay}`;
        }
        if (compareBeginTime && compareEndTime) {
            const compareBegin = getDetailDate(compareBeginTime);
            // eslint-disable-next-line max-len
            compareText = `${compareText} 比较 ${compareBegin.fullYear}/${compareBegin.fullMonth}/${compareBegin.fullDay}`;
            if (compareEndTime && compareEndTime !== compareBeginTime) {
                const compareEnd = getDetailDate(compareEndTime);
                compareText = `${compareText}-${compareEnd.fullYear}/${compareEnd.fullMonth}/${compareEnd.fullDay}`;
            }
        }
        return compareText;
    }
};

export const switchIndex = {
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

export const getDateCompareObj = ({
    beginTime,
    endTime,
    compareBeginTime,
    compareEndTime,
    canSelectTime,
    selectMode,
    timeRules,
    compareSwitch
}) => {
    let current = null;
    let compare = null;
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

export const formatLastYearToday = () => {
    const today = moment().format('YYYY/MM/DD');
    const detailTime = getDetailDate(today);
    const {
        fullYear,
        fullMonth,
        fullDay
    } = detailTime;
    const lastYear = fullYear - 1;
    return `${lastYear}-${fullMonth}-${fullDay}`;
};

// 快捷操作的时候，要根据canSelectFuture，validateMaxDate，validateMinDate综合处理时间
export const getLimitTime = ({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate}) => {
    // 判断validateMinDate 和 beginTime
    let newBeginTime = beginTime;
    if (getTimeStamp(beginTime) < getTimeStamp(validateMinDate)) {
        newBeginTime = validateMinDate;
    }
    let newEndTime = endTime;
    // 比较后判断时间的时间戳
    const endTimeStamp = getTimeStamp(endTime);
    const validateMaxDateStamp = getTimeStamp(validateMaxDate);
    // 可以选择未来，就是最大时间与结束时间比较
    if (canSelectFuture) {
        if (endTimeStamp > validateMaxDateStamp) {
            newEndTime = validateMaxDate;
        }
    } else {
        // 不能选择未来，就是最大时间、今天、结束时间三个时间综合比较
        const today = moment().format('YYYY/MM/DD');
        const todayStamp = getTimeStamp(today);
        const maxTime = todayStamp > validateMaxDateStamp ? validateMaxDate : today;
        if (getTimeStamp(maxTime) < getTimeStamp(endTime)) {
            newEndTime = maxTime;
        }
    }
    return {
        beginTime: newBeginTime,
        endTime: newEndTime
    };
};

export const getTimeBySwitchStr = ({value, canSelectFuture, validateMaxDate, validateMinDate}) => {
    let beginTime;
    let endTime;
    let compareBeginTime;
    let compareEndTime;
    const lastYearToday = formatLastYearToday();
    switch (value) {
        case 'today': {
            beginTime = moment().format('YYYY/MM/DD');
            return {
                beginTime,
                endTime: beginTime
            };
        }
        case 'yesterday': {
            beginTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime: beginTime
            };
        }
        case 'lastSevenDays': {
            endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            beginTime = moment().subtract(7, 'days').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'lastFourteenDays': {
            endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            beginTime = moment().subtract(14, 'days').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'lastThirtyDays': {
            endTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            beginTime = moment().subtract(30, 'days').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'lastWeek': {
            beginTime = moment().week(moment().week() - 1).startOf('week').format('YYYY/MM/DD');
            endTime = moment().week(moment().week() - 1).endOf('week').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'lastMonth': {
            beginTime = moment().month(moment().month() - 1).startOf('month').format('YYYY/MM/DD');
            endTime = moment().month(moment().month() - 1).endOf('month').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'currentMonth': {
            beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
            endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD');
            // 本月为今天至今的时间
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            return {
                beginTime: newTime.beginTime,
                endTime: newTime.endTime
            };
        }
        case 'compareYesterday': {
            beginTime = moment().format('YYYY/MM/DD');
            endTime = moment().format('YYYY/MM/DD');
            compareBeginTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            compareEndTime = moment().subtract(1, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        case 'compareLastWeek': {
            beginTime = moment().week(moment().week()).startOf('week').format('YYYY/MM/DD');
            endTime = moment().week(moment().week()).endOf('week').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            beginTime = newTime.beginTime;
            endTime = newTime.endTime;
            compareBeginTime = moment().week(moment().week() - 1).startOf('week').format('YYYY/MM/DD');
            const diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;
            compareEndTime = moment(compareBeginTime).add(diffDays, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        case 'compareLastMonth': {
            beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
            endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            beginTime = newTime.beginTime;
            endTime = newTime.endTime;
            const diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;
            compareBeginTime = moment().month(moment().month() - 1).startOf('month').format('YYYY/MM/DD');
            compareEndTime = moment(compareBeginTime).add(diffDays, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        case 'lastYearToday': {
            beginTime = moment().format('YYYY/MM/DD');
            endTime = beginTime;
            compareBeginTime = moment(lastYearToday).format('YYYY/MM/DD');
            compareEndTime = compareBeginTime;
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        case 'lastYearWeek': {
            beginTime = moment().week(moment().week()).startOf('week').format('YYYY/MM/DD');
            endTime = moment().week(moment().week()).endOf('week').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            beginTime = newTime.beginTime;
            endTime = newTime.endTime;
            const diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;
            compareBeginTime = moment(lastYearToday).week(moment().week()).startOf('week').format('YYYY/MM/DD');
            compareEndTime = moment(compareBeginTime).add(diffDays, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        case 'lasterYearMonth': {
            beginTime = moment().month(moment().month()).startOf('month').format('YYYY/MM/DD');
            endTime = moment().month(moment().month()).endOf('month').format('YYYY/MM/DD');
            const newTime = getLimitTime({beginTime, endTime, canSelectFuture, validateMaxDate, validateMinDate});
            beginTime = newTime.beginTime;
            endTime = newTime.endTime;
            const diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime)) - 1;
            compareBeginTime = moment(lastYearToday).month(moment().month()).startOf('month').format('YYYY/MM/DD');
            compareEndTime = moment(compareBeginTime).add(diffDays, 'days').format('YYYY/MM/DD');
            return {
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime
            };
        }
        default:
            return '';
    }
};

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

export const getTodayDetail = () => {
    const todayTime = moment().format('YYYY/MM/DD');
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

export const formatPerMonthInDay = date => {
    const {
        year,
        month
    } = date;
    const monthInDay = [];
    const days = monthDayRange(year)[month - 1];
    const firstDayInMonth = `${year}/${month}/1`;
    const lastDayInMonth = `${year}/${month}/${days}`;
    const getFirstDay = new Date(firstDayInMonth).getDay() === 0 ? 7 : new Date(firstDayInMonth).getDay();
    const getLastDay = new Date(lastDayInMonth).getDay() === 0 ? 7 : new Date(lastDayInMonth).getDay();
    for (let i = 1; i <= getFirstDay - 1; i++) {
        monthInDay.push(null);
    }

    for (let i = 1; i <= days; i++) {
        monthInDay.push({
            value: `${year}/${month}/${i}`,
            label: i
        });
    }

    for (let i = 1; i <= (7 - getLastDay); i++) {
        monthInDay.push(null);
    }
    return monthInDay;
};

export const formatAllMonthByYear = totalYear => {
    const obj = {};
    const {
        fullYear,
        fullMonth
    } = getTodayDetail();
    let i = 1;
    let month = fullMonth;
    let year = fullYear;
    const maxCount = (totalYear * 12) + 1;
    while (i < maxCount) {
        obj[`${year}/${month}`] = maxCount - i;
        i++;
        month--;
        if (month === 0) {
            year--;
            month = 12;
        }
    }
    return obj;
};

export const getTimeTramp = time => {
    return new Date(`${time} 00:00:00`).getTime();
};

export const getDaysByTimeTramp = timeTramp => {
    return Math.ceil(timeTramp / (24 * 3600 * 1000)) + 1;
};

export const formatSelectTime = params => {
    const {beginTime, endTime, compareBeginTime, compareEndTime, selectMode, compareSwitch} = params;
    if (!beginTime && !endTime && !compareBeginTime && !compareEndTime) {
        const todayTime = getTodayDetail();
        return {
            year: todayTime.fullYear,
            month: todayTime.fullMonth
        };
    }
    let fullMonth;
    let fullYear;
    if (selectMode === 'single') {
        const beginTimeObj = getDetailDate(beginTime);
        fullYear = beginTimeObj.fullYear;
        fullMonth = beginTimeObj.fullMonth;
    } else if (selectMode === 'multiple') {
        const beginTimeObj = getDetailDate(endTime);
        fullYear = beginTimeObj.fullYear;
        fullMonth = beginTimeObj.fullMonth;
    } else if (selectMode === 'compare') {
        const endTimeStamp = getTimeStamp(endTime);
        const compareEndTimeStamp = getTimeStamp(compareEndTime);
        const time = (compareEndTimeStamp > endTimeStamp && compareSwitch)
            ? compareEndTime
            : endTime;
        const timeObj = getDetailDate(time);
        fullYear = timeObj.fullYear;
        fullMonth = timeObj.fullMonth;
    }
    return {
        year: fullYear,
        month: fullMonth
    };
};

export const formatSingleYear = year => {
    return {
        year,
        month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
};

export const formatAllMonths = params => {
    let newMonthsList = [];
    const {list, currentYear, validateMinDate, validateMaxDate, canSelectFuture} = params;
    const validateFirstYear = getDetailDate(validateMinDate).fullYear;
    let validateLastYear = getDetailDate(validateMaxDate).fullYear;
    const todayYear = getTodayDetail().fullYear;
    if (!canSelectFuture && (validateLastYear > todayYear)) {
        validateLastYear = todayYear;
    }
    const minGap = currentYear - validateFirstYear;
    const maxGap = validateLastYear - currentYear;
    if (currentYear === list[0].year) {
        for (let i = 0; i < (minGap > 5 ? 5 : minGap); i++) {
            newMonthsList.unshift(formatSingleYear(currentYear - i - 1));
        }
        newMonthsList = newMonthsList.concat(list);
    } else if (currentYear === list[list.length - 1].year) {
        for (let i = 0; i < (maxGap > 5 ? 5 : maxGap); i++) {
            newMonthsList.push(formatSingleYear(currentYear + i + 1));
        }
        newMonthsList = list.concat(newMonthsList);
    }
    return newMonthsList;
};

export const initFormatAllMonths = params => {
    const newMonthsList = [];
    const {currentYear, validateMinDate, validateMaxDate, canSelectFuture} = params;
    const validateFirstYear = getDetailDate(validateMinDate).fullYear;
    let validateLastYear = getDetailDate(validateMaxDate).fullYear;
    const todayYear = getTodayDetail().fullYear;
    if (!canSelectFuture && (validateLastYear > todayYear)) {
        validateLastYear = todayYear;
    }
    const minGap = currentYear - validateFirstYear;
    const maxGap = validateLastYear - currentYear;
    const firstIndex = minGap > 5 ? currentYear - 5 : validateFirstYear;
    const lastIndex = maxGap > 5 ? currentYear + 5 : validateLastYear;
    for (let i = firstIndex; i <= lastIndex; i++) {
        newMonthsList.push(formatSingleYear(i));
    }
    return newMonthsList;
};

export const selectScrollYearIndex = params => {
    const {
        selectYear,
        list
    } = params;
    return _.findIndex(list, item => {
        return +item.year === +selectYear;
    });
};

export const validateData = () => {
    const currentYear = getTodayDetail().fullYear;
    return {
        validateMinDate: `${currentYear - 10}/1/1`,
        validateMaxDate: `${currentYear + 10}/12/31`
    };
};

export const initDateMonths = params => {
    const list = [];
    const {currentDate, validateMinDate, validateMaxDate, canSelectFuture} = params;
    const today = getTodayDetail();
    const todayFullMonth = today.fullMonth;
    const todayFullYear = today.fullYear;
    let fullYear;
    let fullMonth;
    if (!currentDate) {
        fullYear = todayFullYear;
        fullMonth = todayFullMonth;
    } else {
        fullYear = getDetailDate(currentDate).fullYear;
        fullMonth = getDetailDate(currentDate).fullMonth;
    }
    const validateBeginDate = getDetailDate(validateMinDate);
    const validateFirstDate = `${validateBeginDate.fullYear}/${validateBeginDate.fullMonth}/1`;
    const validateEndDate = getDetailDate(validateMaxDate);
    const validateLastDate = `${validateEndDate.fullYear}/
        ${validateEndDate.fullMonth}/
        ${monthDayRange(+validateEndDate.fullYear)[(+validateEndDate.fullMonth) - 1]}`;
    list.push({
        year: fullYear,
        month: fullMonth
    });

    // 往前加12个月数据，往后推6个月数据，减少翻页时的卡顿
    let prevCount = 18;
    let currentPrevMonth = fullMonth;
    let currentPrevYear = fullYear;
    while (prevCount > 0) {
        if (currentPrevMonth === 1) {
            currentPrevYear--;
            currentPrevMonth = 12;
        } else {
            currentPrevMonth--;
        }
        const currentTimeStamp = getTimeStamp(`${currentPrevYear}/${currentPrevMonth}/1`);
        if (currentTimeStamp >= getTimeStamp(validateFirstDate)) {
            list.unshift({
                year: currentPrevYear,
                month: currentPrevMonth
            });
        }
        prevCount--;
    }
    let currentNextMonth = fullMonth;
    let currentNextYear = fullYear;
    let nextCount = 6;
    while (nextCount > 0) {
        if (currentNextMonth === 12) {
            currentNextYear++;
            currentNextMonth = 1;
        } else {
            currentNextMonth++;
        }
        const nextDay = `${currentNextYear}/${currentNextMonth}/${monthDayRange(currentNextYear)[currentNextMonth - 1]}`;
        const nextDate = getTimeStamp(nextDay);
        if (nextDate <= getTimeStamp(validateLastDate)
        && !(!canSelectFuture
            && nextDate
            > getTimeStamp(`${todayFullYear}/${todayFullMonth}/${monthDayRange(todayFullYear)[todayFullMonth - 1]}`))) {
            list.push({
                year: currentNextYear,
                month: currentNextMonth
            });
        }
        nextCount--;
    }
    return list;
};

// 将月份与dom的index挂载
export const selectedMonthIndex = params => {
    const {
        beginTime,
        list
    } = params;
    const {fullMonth, fullYear} = getDetailDate(beginTime);
    const index = _.findIndex(list, item => {
        return (+fullMonth === +item.month && +fullYear === +item.year);
    });
    return index || 0;
};

export const formatDaysByScroll = params => {
    let newList = [];
    const {list, currentDate, validateMinDate, validateMaxDate, canSelectFuture, scrollIndex} = params;
    const {fullYear, fullMonth} = getDetailDate(currentDate);
    const validateBeginDate = getDetailDate(validateMinDate);
    const validateFirstDate = `${validateBeginDate.fullYear}/${validateBeginDate.fullMonth}/1`;
    const validateEndDate = getDetailDate(validateMaxDate);
    const validateLastDate = `${validateEndDate.fullYear}/
        ${validateEndDate.fullMonth}/
        ${monthDayRange(+validateEndDate.fullYear)[(+validateEndDate.fullMonth) - 1]}`;
    // 滑动在中间区域去加载数据
    const index = scrollIndex !== 0 ? 3 : 0;
    const middleYear = list[index] && list[index].year;
    const middleMonth = list[index] && list[index].month;
    const firstYear = list[0].year;
    const firstMonth = list[0].month;
    if (middleYear === fullYear && middleMonth === fullMonth) {
        // 一次往前加12个月数据
        for (let i = 1; i <= 6; i++) {
            let currentYear;
            let currentMonth;
            if (firstMonth - i <= 0) {
                currentYear = firstYear - 1;
                currentMonth = 12 + (firstMonth - i);
            } else {
                currentYear = firstYear;
                currentMonth = firstMonth - i;
            }
            if (getTimeStamp(`${currentYear}/${currentMonth}/1`) >= getTimeStamp(validateFirstDate)) {
                newList.unshift({
                    year: currentYear,
                    month: currentMonth
                });
            }
        }
        newList = newList.concat(list);
        // 防止数据过多造成数据渲染卡顿，永远只有2年数据
        newList = newList.length > 24 ? newList.splice(0, 24) : newList;
        return newList;
    }
    if (list[list.length - 1].year === fullYear
        && list[list.length - 1].month === fullMonth) {
        // 一次往后加载6个月数据
        for (let i = 1; i <= 6; i++) {
            let currentYear;
            let currentMonth;
            if (fullMonth + i > 12) {
                currentYear = fullYear + 1;
                currentMonth = (fullMonth + i) - 12;
            } else {
                currentYear = fullYear;
                currentMonth = fullMonth + i;
            }
            /** 当前时间小于validateMaxDate 或者 如果不能选择未来的话，月份要小于当前月份的最后一天 */
            const currentMonthDays = monthDayRange(currentYear)[currentMonth - 1];
            const currentDayTimeStamp = getTimeStamp(`${currentYear}/${currentMonth}/${currentMonthDays}`);
            const today = getTodayDetail();
            const todayMonthDays = monthDayRange(today.fullYear)[today.fullMonth - 1];
            const todayLastDayTimeStamp = getTimeStamp(`${today.fullYear}/${today.fullMonth}/${todayMonthDays}`);
            if (currentDayTimeStamp <= getTimeStamp(validateLastDate)
            && !(!canSelectFuture && currentDayTimeStamp > todayLastDayTimeStamp)) {
                newList.push({
                    year: currentYear,
                    month: currentMonth
                });
            }
        }
        newList = list.concat(newList);
        // 防止数据过多造成数据渲染卡顿，永远只有2年数据
        newList = newList.length > 24 ? newList.slice(-24) : newList;
        return newList;
    }
    return list;
};

export const formatHoursByString = string => {
    const timeArray = string.split(':');
    return {
        hour: timeArray[0] || '00',
        minute: timeArray[1] || '00',
        second: timeArray[2] || '00'
    };
};

export const getMaxTimeInTwoDate = ({prevTime, compareTime}) => {
    const prevTimeStamp = getTimeStamp(prevTime);
    const compareTimeStamp = getTimeStamp(compareTime);
    const time = compareTimeStamp > prevTimeStamp ? compareTimeStamp : prevTimeStamp;
    const timeObj = getDetailDate(time);
    return {
        year: timeObj.fullYear,
        month: timeObj.fullMonth
    };
};

export const formatTwoDateInOrder = ({minDate, maxDate}) => {
    const minDateTimeStamp = getTimeStamp(minDate);
    const maxDateTimeStamp = getTimeStamp(maxDate);
    if (minDateTimeStamp > maxDateTimeStamp) {
        return {
            minDate: maxDate,
            maxDate: minDate
        };
    }
    return {
        minDate,
        maxDate
    };
};

export const validateDateBeyondToday = date => {
    const todayDate = new Date().getTime();
    const selectDay = new Date(date).getTime();
    if (selectDay > todayDate) {
        return true;
    }
    return false;
};

export const transDateFormat = date => {
    if (date) {
        return date.replace(/-/g, '/');
    }
    return '';
};

// 格式话时间 symbol 只支持/ 和 -
export const formatDate = (symbol, date) => {
    let seperater = '/';
    if (symbol === '-') {
        seperater = symbol;
    }
    return moment(new Date(date)).format(`YYYY${seperater}MM${seperater}DD`);
};

export const transObjDateFormat = obj => {
    const {
        beginTime,
        endTime,
        compareBeginTime,
        compareEndTime,
        canSelectTime
    } = obj;
    const timeArray = beginTime.split(' ');
    const time = canSelectTime ? timeArray[1] : '';
    const currentBeginTime = canSelectTime ? timeArray[0] : beginTime;
    const formatBeginTime = beginTime ? formatDate('-', currentBeginTime) : '';
    const formatEndTime = endTime ? formatDate('-', endTime) : '';
    const formatCompareBeginTime = compareBeginTime ? formatDate('-', compareBeginTime) : '';
    const formatCompareEndTime = compareEndTime ? formatDate('-', compareEndTime) : '';
    return {
        ...obj,
        beginTime: canSelectTime ? `${formatBeginTime} ${time}` : formatBeginTime,
        endTime: formatEndTime,
        compareBeginTime: formatCompareBeginTime,
        compareEndTime: formatCompareEndTime
    };
};

export const getTodayStr = () => {
    const {fullYear, fullMonth, fullDay} = getTodayDetail();
    return `${fullYear}/${fullMonth}/${fullDay}`;
};


export const dateFormat = (date, tpl) => {
    if (!(date instanceof Date)) {
        return date;
    }
    date = date || new Date();
    tpl = tpl || 'YYYY-MM-DD hh:mm:ss';
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'D+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'S+': date.getMilliseconds() // 毫秒
    };
    if (/(Y+)/.test(tpl)) {
        tpl = tpl.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    _.forEach(Object.keys(o), k => {
        if (new RegExp(`(${k})`).test(tpl)) {
            tpl = tpl.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length));
        }
    });

    return tpl;
};
