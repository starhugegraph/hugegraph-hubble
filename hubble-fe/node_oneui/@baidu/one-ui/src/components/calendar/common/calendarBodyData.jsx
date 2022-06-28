import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import classes from 'component-classes';
import tools from '../../../core';

const {
    initDateMonths,
    formatPerMonthInDay,
    getTimeTramp,
    selectedMonthIndex,
    formatDaysByScroll,
    getDetailDate,
    getDaysByTimeTramp,
    getTodayStr
} = tools.calendar;
let loadingInDateMode = false;

const needScrollWhenZeroScrollTop = ({currentYear, currentMonth, validateMinDate}) => {
    const validateObj = getDetailDate(validateMinDate);
    if (validateObj.fullYear === currentYear && validateObj.fullMonth === currentMonth) {
        return false;
    }
    return true;
};

class CalendarBodyData extends Component {
    static propTypes = {
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
    }

    constructor(props) {
        super(props);
        const beginTimeObj = props.beginTime ? getDetailDate(props.beginTime) : null;
        const isSingleMode = props.selectMode === 'single';
        const isCompareMode = props.selectMode === 'compare';
        this.state = {
            beginTime: beginTimeObj ? `${beginTimeObj.fullYear}/${beginTimeObj.fullMonth}/${beginTimeObj.fullDay}` : '',
            endTime: !isSingleMode ? props.endTime : '',
            compareBeginTime: isCompareMode ? props.compareBeginTime : '',
            compareEndTime: isCompareMode ? props.compareEndTime : '',
            // 点击完第一步，滑动的步数
            hoverTime: null,
            hoverCompareTime: null,
            hoverCompareEndTime: null,
            list: initDateMonths({
                currentDate: `${props.selectYear}/${props.selectMonth}/1`,
                validateMinDate: props.validateMinDate,
                validateMaxDate: props.validateMaxDate,
                canSelectFuture: props.canSelectFuture
            }),
            selectYear: props.selectYear,
            selectMonth: props.selectMonth,
            step: 0,
            compareSwitch: props.compareSwitch,
            showTip: false
        };
    }

    componentDidMount = () => {
        const {selectMonth, selectYear, list} = this.state;
        this.scrollToPosition({
            list,
            beginTime: `${selectYear}/${selectMonth}/1`
        });
        this.bindScroll();
    }

    static getDerivedStateFromProps = (nextProps, state) => {
        const {validateMinDate, validateMaxDate, canSelectFuture} = nextProps;
        const {selectMonth, selectYear, list, beginTime, endTime, compareBeginTime, compareEndTime, compareSwitch} = state;
        const beginTimeObj = nextProps.beginTime ? getDetailDate(nextProps.beginTime) : null;
        const nextBeginTime = beginTimeObj ? `${beginTimeObj.fullYear}/${beginTimeObj.fullMonth}/${beginTimeObj.fullDay}` : null;
        const newState = {};
        if (('compareSwitch' in nextProps) && nextProps.compareSwitch !== compareSwitch) {
            newState.compareSwitch = nextProps.compareSwitch;
            // 前一段时间如果选中了开始一段时间，点击比较的时候应该把这段时间带入，然后直接开始选比较时间
            newState.step = (nextProps.beginTime && nextProps.compareSwitch) ? 2 : 0;
            newState.hoverTime = null;
            newState.hoverCompareTime = null;
            newState.hoverCompareEndTime = null;
        }
        if (('beginTime' in nextProps) && nextBeginTime !== beginTime) {
            newState.beginTime = nextBeginTime;
            newState.step = (nextProps.beginTime && nextProps.compareSwitch) ? 2 : 0;
            newState.hoverTime = null;
        }
        const nextPropsEndTime = nextProps.endTime;
        if (('endTime' in nextProps) && nextPropsEndTime !== endTime) {
            newState.step = (nextProps.beginTime && nextProps.compareSwitch) ? 2 : 0;
            newState.endTime = nextPropsEndTime;
            newState.hoverTime = null;
        }
        const nextPropsCompareBeginTime = nextProps.compareBeginTime;
        if (('compareBeginTime' in nextProps) && nextPropsCompareBeginTime !== compareBeginTime) {
            newState.compareBeginTime = nextPropsCompareBeginTime;
            newState.step = 0;
            newState.hoverCompareTime = null;
            newState.hoverCompareEndTime = null;
        }
        const nextPropsCompareEndTime = nextProps.compareEndTime;
        if (('compareEndTime' in nextProps) && nextPropsCompareEndTime !== compareEndTime) {
            newState.compareEndTime = nextPropsCompareEndTime;
            newState.step = 0;
            newState.hoverCompareTime = null;
            newState.hoverCompareEndTime = null;
        }
        if (('selectYear' in nextProps && 'selectMonth' in nextProps)
        && ((selectYear !== nextProps.selectYear) || (selectMonth !== nextProps.selectMonth))) {
            newState.selectMonth = nextProps.selectMonth;
            newState.selectYear = nextProps.selectYear;
            if ((list[3] && nextProps.selectMonth === list[3].month && nextProps.selectYear === list[3].year)
            || (nextProps.selectMonth === list[list.length - 1].month && nextProps.selectYear === list[list.length - 1].year)) {
                const formatList = formatDaysByScroll({
                    currentDate: `${nextProps.selectYear}/${nextProps.selectMonth}/1`,
                    validateMinDate,
                    validateMaxDate,
                    list,
                    canSelectFuture
                });
                if (formatList.length) {
                    newState.list = formatList;
                }
            }
        }
        return newState;
    }

    componentDidUpdate = prevProps => {
        const {visible, selectYear, selectMonth} = this.props;
        const list = this.state.list;
        if (visible && prevProps.visible !== visible) {
            this.scrollToPosition({
                list,
                beginTime: `${selectYear}/${selectMonth}/1`
            });
        }
        loadingInDateMode = false;
    }

    getBodyElement = ref => {
        this.dateBody = ref;
    };

    getBodyListElement = ref => {
        this.dateBodyList = ref;
    };

    initDateMonthDays = currentDate => {
        const {validateMaxDate, validateMinDate, canSelectFuture} = this.props;
        const list = initDateMonths({
            currentDate,
            validateMinDate,
            validateMaxDate,
            canSelectFuture
        });
        this.setState({
            list
        });
    }

    scrollToPosition = props => {
        const body = this.dateBody;
        const head = body.previousSibling;
        const headOffsetTop = head.offsetTop;
        const headOffsetHeight = head.offsetHeight;
        const selectIndex = selectedMonthIndex(props);
        const HeadTop = headOffsetTop + headOffsetHeight;
        const currentNode = this.dateBodyList.children[selectIndex];
        if (currentNode) {
            const currentNodeOffsetTop = currentNode.offsetTop;
            body.scrollTop = currentNodeOffsetTop - HeadTop;
        }
    }


    formatWeek = perMonthInDay => {
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
        return elm;
    }

    bindScroll = () => {
        const body = this.dateBody;
        const {onScrollChange, validateMinDate, validateMaxDate, canSelectFuture} = this.props;
        // const bodyList = this.dateBodyList;
        const head = body.previousSibling;
        const headOffsetTop = head.offsetTop;
        const headOffsetHeight = head.offsetHeight;
        const HeadTop = (headOffsetTop + headOffsetHeight);
        // const {validateMaxDate, validateMinDate} = this.props;
        const scrollFunc = () => {
            const list = this.state.list;
            if (loadingInDateMode) {
                return;
            }
            const scrollTop = body.scrollTop;
            const bodyList = this.dateBodyList;
            const currentNode = bodyList.children;
            const domsOffsetTop = [];
            for (let i = 0; i < currentNode.length; i++) {
                domsOffsetTop.push((currentNode[i].offsetTop - HeadTop) - (currentNode[i].offsetHeight / 2) - 20);
            }
            const domsOffsetTopLength = domsOffsetTop.length;
            if (scrollTop === 0) {
                // 快速度滑到顶部, 因为有debounse, 所以懒加载是不会触发的
                // 判断一下是否还需要加载
                const needLoadData = needScrollWhenZeroScrollTop({currentYear: list[0].year, currentMonth: list[0].month, validateMinDate});
                if (!loadingInDateMode && needLoadData) {
                    loadingInDateMode = true;
                    const formatList = formatDaysByScroll({
                        currentDate: `${list[0].year}/${list[0].month}/1`,
                        validateMinDate,
                        validateMaxDate,
                        list,
                        canSelectFuture,
                        scrollIndex: 0
                    });
                    this.setState({
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
                for (let i = 0; i < domsOffsetTopLength; i++) {
                    if ((domsOffsetTop[i + 1] && scrollTop < domsOffsetTop[i + 1]) && scrollTop >= domsOffsetTop[i]) {
                        const index = i;
                        // 往前翻-改变月份
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
    }

    dayOnMonseEnter = e => {
        const target = e.target;
        const {value, disabled} = target.dataset;
        if (disabled === 'true') {
            return;
        }
        const {prefixCls, selectMode, canSelectFuture} = this.props;
        const {step, beginTime, endTime, compareSwitch} = this.state;
        const itemCls = `${prefixCls}-item`;
        // const selectedCls = `${itemCls}-selected`;
        const hoverCls = `${itemCls}-active`;
        const compareHoverCls = `${itemCls}-compare-active`;
        const dom = classes(target);
        // 悬浮，表示要开始选第一步
        if (step === 0 || step === 1) {
            dom.add(hoverCls);
        } else if (step === 2 && compareSwitch) {
            dom.add(compareHoverCls);
        }
        if (selectMode !== 'single') {
            if (step === 1) {
                this.setState({
                    hoverTime: value,
                    hoverCompareTime: null
                });
            } else if (step === 2 && compareSwitch) {
                let diffDays = getDaysByTimeTramp(getTimeTramp(endTime) - getTimeTramp(beginTime));
                const {fullYear, fullMonth, fullDay} = getDetailDate(value);
                let hoverCompareEndTime = value ? moment([fullYear, fullMonth - 1, fullDay]).add(diffDays - 1, 'days').format('YYYY/MM/DD') : '';
                if (getTimeTramp(hoverCompareEndTime) > getTimeTramp(getTodayStr()) && !canSelectFuture) {
                    diffDays = getDaysByTimeTramp(getTimeTramp(getTodayStr()) - getTimeTramp(value));
                    hoverCompareEndTime = value ? moment([fullYear, fullMonth - 1, fullDay]).add(diffDays - 1, 'days').format('YYYY/MM/DD') : '';
                }
                this.setState({
                    hoverTime: null,
                    hoverCompareTime: value || '',
                    hoverCompareEndTime,
                    showTip: true
                });
            }
        }
    }

    dayOnMonseLeave = e => {
        const target = e.target;
        const prefixCls = this.props.prefixCls;
        const itemCls = `${prefixCls}-item`;
        const hoverCls = `${itemCls}-active`;
        const dom = classes(target);
        if (dom.has(hoverCls)) {
            dom.remove(hoverCls);
        }
        this.setState({
            showTip: false
        });
    }

    dayOnClick = e => {
        const target = e.target;
        const {onChange, selectMode} = this.props;
        const {value, disabled} = target.dataset;
        const {
            step,
            beginTime,
            compareSwitch,
            endTime,
            hoverCompareTime,
            hoverCompareEndTime,
            compareBeginTime,
            compareEndTime
        } = this.state;
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
            const newState = {
                beginTime: value,
                endTime: selectMode === 'compare' ? value : '',
                compareBeginTime: '',
                compareEndTime: '',
                step: 1
            };
            this.setState(newState);
            if (onChange) {
                onChange(newState);
            }
        } else if (step === 1) {
            const beginTimeStamp = getTimeTramp(beginTime);
            const endTimeStamp = getTimeTramp(value);
            const isConverse = endTimeStamp < beginTimeStamp;
            const newState = {
                beginTime: isConverse ? value : beginTime,
                endTime: isConverse ? beginTime : value,
                compareBeginTime: compareSwitch ? compareBeginTime : '',
                compareEndTime: compareSwitch ? compareEndTime : '',
                step: compareSwitch ? 2 : 0
            };
            this.setState({
                ...newState,
                hoverTime: null
            });
            if (onChange) {
                onChange(newState);
            }
        } else if (step === 2) {
            const newState = {
                beginTime,
                endTime,
                compareBeginTime: hoverCompareTime,
                compareEndTime: hoverCompareEndTime,
                step: 0
            };
            this.setState({
                ...newState,
                hoverCompareTime: null,
                hoverCompareEndTime: null
            });
            if (onChange) {
                onChange(newState);
            }
        }
    }

    isFutureDay = ({currentDay}) => {
        if (!currentDay) {
            return false;
        }
        const todayDate = `${getTodayStr()} 23:59:59`;
        const todayTimeStamp = new Date(todayDate).getTime();
        const currentDateTimeStamp = getTimeTramp(currentDay.value);
        return currentDateTimeStamp > todayTimeStamp;
    }

    isBeyondMaxDay = ({currentDay}) => {
        if (!currentDay) {
            return false;
        }
        const validateMaxDate = this.props.validateMaxDate;
        const validateMaxDateTramp = getTimeTramp(validateMaxDate);
        const currentDateTimeStamp = getTimeTramp(currentDay.value);
        return currentDateTimeStamp > validateMaxDateTramp;
    }

    isPassDay = ({currentDay}) => {
        if (!currentDay) {
            return;
        }
        const validateMinDate = this.props.validateMinDate;
        const validateMinDateTramp = getTimeTramp(validateMinDate);
        const currentDateTimeStamp = getTimeTramp(currentDay.value);
        return currentDateTimeStamp < validateMinDateTramp;
    }

    isSelectedDay = ({currentDay}) => {
        const {beginTime, endTime} = this.state;
        const beginTimeStamp = beginTime && getTimeTramp(beginTime);
        const endTimeStamp = endTime && getTimeTramp(endTime);
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        return beginTimeStamp === currentTimeStamp || endTimeStamp === currentTimeStamp;
    }

    isCompareSelectedDay = ({currentDay}) => {
        const {compareEndTime, compareBeginTime, compareSwitch} = this.state;
        const canSelectFuture = this.props.canSelectFuture;
        if (!canSelectFuture && this.isFutureDay({currentDay})) {
            return false;
        }
        if (!compareSwitch) {
            return false;
        }
        const beginTimeStamp = compareBeginTime && getTimeTramp(compareBeginTime);
        const endTimeStamp = compareEndTime && getTimeTramp(compareEndTime);
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        return beginTimeStamp === currentTimeStamp || endTimeStamp === currentTimeStamp;
    }

    isBetweenDay = ({currentDay}) => {
        const {beginTime, endTime, hoverTime} = this.state;
        const beginTimeStamp = beginTime && getTimeTramp(beginTime);
        const endTimeStamp = endTime && getTimeTramp(endTime);
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        const hoverTimeStamp = hoverTime && getTimeTramp(hoverTime);
        const betweenBeginAndEnd = currentTimeStamp > beginTimeStamp && currentTimeStamp < endTimeStamp;
        const betweenBeginAndHoverFront = currentTimeStamp && hoverTimeStamp && currentTimeStamp < beginTimeStamp && currentTimeStamp > hoverTimeStamp;
        const betweenBeginAndHoverEnd = currentTimeStamp && hoverTimeStamp && currentTimeStamp > beginTimeStamp && currentTimeStamp < hoverTimeStamp;
        return betweenBeginAndEnd || betweenBeginAndHoverFront || betweenBeginAndHoverEnd;
    }

    isCompareBetweenDay = ({currentDay}) => {
        const {compareBeginTime, compareEndTime, hoverCompareTime, hoverCompareEndTime, compareSwitch} = this.state;
        const canSelectFuture = this.props.canSelectFuture;
        if (!canSelectFuture && this.isFutureDay({currentDay})) {
            return false;
        }
        if (!compareSwitch) {
            return false;
        }
        const beginTimeStamp = compareBeginTime && getTimeTramp(compareBeginTime);
        const endTimeStamp = compareEndTime && getTimeTramp(compareEndTime);
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        const hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
        const hoverCompareTimeStamp = hoverCompareEndTime && getTimeTramp(hoverCompareEndTime);
        const betweenBeginAndEnd = currentTimeStamp > beginTimeStamp && currentTimeStamp < endTimeStamp;
        const betweenHover = currentTimeStamp && hoverTimeStamp && hoverCompareTimeStamp && currentTimeStamp >= hoverTimeStamp && currentTimeStamp <= hoverCompareTimeStamp;
        return betweenBeginAndEnd || betweenHover;
    }

    isCrossDay = ({currentDay}) => {
        const {beginTime, endTime, compareBeginTime, compareEndTime, compareSwitch} = this.state;
        if (!compareSwitch || !currentDay) {
            return false;
        }
        const beginTimeStamp = beginTime && getTimeTramp(beginTime);
        const endTimeStamp = endTime && getTimeTramp(endTime);
        const compareBeginTimeStamp = beginTime && getTimeTramp(compareBeginTime);
        const compareEndTimeStamp = beginTime && getTimeTramp(compareEndTime);
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        return currentTimeStamp >= beginTimeStamp && currentTimeStamp <= endTimeStamp && currentTimeStamp >= compareBeginTimeStamp && currentTimeStamp <= compareEndTimeStamp;
    }

    isHoverDay = ({currentDay}) => {
        const hoverTime = this.state.hoverTime;
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        const hoverTimeStamp = hoverTime && getTimeTramp(hoverTime);
        return currentTimeStamp === hoverTimeStamp;
    }

    isCompareHoverDay = ({currentDay}) => {
        const {hoverCompareTime, hoverCompareEndTime} = this.state;
        const canSelectFuture = this.props.canSelectFuture;
        if (!canSelectFuture && this.isFutureDay({currentDay})) {
            return false;
        }
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        const hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
        const hoverEndTimeStamp = hoverCompareEndTime && getTimeTramp(hoverCompareEndTime);
        return currentTimeStamp === hoverTimeStamp || currentTimeStamp === hoverEndTimeStamp;
    }

    isFirstCompareHoverDay = ({currentDay}) => {
        const hoverCompareTime = this.state.hoverCompareTime;
        const currentTimeStamp = currentDay !== null ? getTimeTramp(currentDay.value) : 0;
        const hoverTimeStamp = hoverCompareTime && getTimeTramp(hoverCompareTime);
        return currentTimeStamp === hoverTimeStamp;
    }

    showToolTip = ({currentDay}) => {
        const isHoverDay = this.isHoverDay({currentDay});
        const isFirstCompareHoverDay = this.isFirstCompareHoverDay({currentDay});
        if (!isHoverDay && !isFirstCompareHoverDay) {
            return null;
        }
        const {beginTime, step, hoverCompareTime, hoverCompareEndTime} = this.state;
        let diffDays;
        if (step === 1 && isHoverDay) {
            const currentTimeStamp = getTimeTramp(currentDay.value);
            const beginTimeStamp = getTimeTramp(beginTime);
            diffDays = getDaysByTimeTramp(Math.abs(currentTimeStamp - beginTimeStamp));
        } else if (step === 2 && isFirstCompareHoverDay) {
            const hoverCompareTimeStamp = getTimeTramp(hoverCompareTime);
            const hoverCompareEndTimeStamp = getTimeTramp(hoverCompareEndTime);
            diffDays = getDaysByTimeTramp(Math.abs(hoverCompareEndTimeStamp - hoverCompareTimeStamp));
        }
        const prefixCls = this.props.prefixCls;
        return (
            <span className={`${prefixCls}-item-tooltip`}>
                {diffDays}
天
            </span>
        );
    }

    renderItem = data => {
        const {year, month} = data;
        const {prefixCls, canSelectFuture, selectMode} = this.props;
        const compareSwitch = this.state.compareSwitch;
        const calendarItemDaysClx = `${prefixCls}-date-body-month`;
        const perMonthInDay = formatPerMonthInDay({year, month});
        const elements = this.formatWeek(perMonthInDay);
        const isSingleMode = selectMode === 'single';
        const isCompareMode = selectMode === 'compare' && compareSwitch;
        const singleMonthElm = (
            <div className={calendarItemDaysClx}>
                {
                    elements.map((element, index) => {
                        return (
                            <div key={`week-${index}`} className={`${calendarItemDaysClx}-week`}>
                                {
                                    element.map((day, dayIndex) => {
                                        const value = day !== null ? day.value : `null-${dayIndex}`;
                                        const isFutureDay = (!canSelectFuture && this.isFutureDay({currentDay: day})) || this.isBeyondMaxDay({currentDay: day});
                                        const isPassDay = this.isPassDay({currentDay: day});
                                        const daySpanCls = classNames(`${prefixCls}-item`, {
                                            [`${prefixCls}-item-empty`]: !day,
                                            [`${prefixCls}-item-selected`]: this.isSelectedDay({currentDay: day}),
                                            [`${prefixCls}-item-disabled`]: isFutureDay || isPassDay,
                                            [`${prefixCls}-item-between`]: !isSingleMode && this.isBetweenDay({currentDay: day}),
                                            [`${prefixCls}-item-compare-selected`]: isCompareMode && this.isCompareSelectedDay({currentDay: day}),
                                            [`${prefixCls}-item-compare-between`]: isCompareMode && this.isCompareBetweenDay({currentDay: day}),
                                            [`${prefixCls}-item-cross`]: isCompareMode && this.isCrossDay({currentDay: day}),
                                            [`${prefixCls}-item-hover`]: !isSingleMode && this.isHoverDay({currentDay: day}),
                                            [`${prefixCls}-item-compare-hover`]: isCompareMode && this.isCompareHoverDay({currentDay: day})
                                        });
                                        const disabled = !day || isFutureDay || isPassDay;
                                        const singleEl = (
                                            <span
                                                key={value}
                                                data-value={value}
                                                className={daySpanCls}
                                                onMouseEnter={day ? this.dayOnMonseEnter : null}
                                                onMouseLeave={day ? this.dayOnMonseLeave : null}
                                                onClick={day ? this.dayOnClick : null}
                                                data-disabled={disabled}
                                            >
                                                {day ? day.label : ''}
                                                {
                                                    this.state.showTip ? this.showToolTip({currentDay: day}) : null
                                                }
                                            </span>
                                        );
                                        return singleEl;
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
        const singleMonth = (
            <div
                key={`${year}/${month}`}
                className={`${prefixCls}-date-body-item`}
                data-value={`${year}/${month}`}
            >
                <div className={`${prefixCls}-date-body-head`}>
                    <span
                        onMouseEnter={this.selectAllInHover}
                        onMouseLeave={this.clearAllInMonth}
                        onClick={this.selectAllInClick}
                        data-year={year}
                        data-month={month}
                    >
                        {year}
年
                        {month}
月
                    </span>
                </div>
                {singleMonthElm}
            </div>
        );
        return singleMonth;
    }

    render() {
        const prefixCls = this.props.prefixCls;
        const list = this.state.list;
        return (
            <div className={`${prefixCls}-date-body`} ref={this.getBodyElement}>
                {
                    loadingInDateMode ? <div className={`${prefixCls}-date-body-loading`}>日期正在加载中...</div> : null
                }
                <div className={`${prefixCls}-date-body-list`} ref={this.getBodyListElement}>
                    {
                        list.map(data => {
                            return this.renderItem(data);
                        })
                    }
                </div>
            </div>
        );
    }
}

polyfill(CalendarBodyData);
export default CalendarBodyData;
