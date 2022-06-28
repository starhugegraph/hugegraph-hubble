import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tools from '../../../core';

const {
    getDetailDate,
    monthDayRange,
    getTimeStamp,
    validateDateBeyondToday
} = tools.calendar;

const {
    strIsNumber
} = tools.common;

export default class DateInput extends PureComponent {
    static propTypes = {
        /** 当前的日期，标准日期格式 */
        date: PropTypes.string,
        /** 当前的前缀 */
        prefixCls: PropTypes.string,
        /** 输完日，后进行校验 */
        onFinishInput: PropTypes.func,
        /** 日期校验， 最大日期 */
        validateMaxDate: PropTypes.string,
        /** 日期校验，最小日期 */
        validateMinDate: PropTypes.string,
        /** 输入框类型 透传 */
        dateType: PropTypes.string,
        /** 是否是比较日期的输入框 */
        isCompare: PropTypes.bool,
        /** 是否能选择未来，如果不能选择未来，需要单独校验 */
        canSelectFuture: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-calendar-input',
        isCompare: false,
        validateMinDate: null,
        validateMaxDate: null,
        dateType: 'beginTime',
        canSelectFuture: true
    }

    constructor(props) {
        super(props);
        const date = props.date;
        this.state = {
            date: (props.date && props.date.split(' ')[0]) || '',
            year: (getDetailDate(date) && getDetailDate(date).fullYear) || '',
            month: (getDetailDate(date) && getDetailDate(date).fullMonth) || '',
            day: (getDetailDate(date) && getDetailDate(date).fullDay) || '',
            validateMaxDate: props.validateMaxDate,
            validateMinDate: props.validateMinDate
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('date' in nextProps) {
            const newDate = nextProps.date;
            const newState = {
                date: newDate.split(' ')[0],
                year: (getDetailDate(newDate) && getDetailDate(newDate).fullYear) || '',
                month: (getDetailDate(newDate) && getDetailDate(newDate).fullMonth) || '',
                day: (getDetailDate(newDate) && getDetailDate(newDate).fullDay) || ''
            };
            this.setState(newState);
        }
    }

    onKeyDown = e => {
        if (e.keyCode === 13) {
            this.inputOnBlur();
            e.preventDefault();
        }
    }

    getYearInputElement = ref => {
        this.yearInputElement = ref;
    }

    getMonthInputElement = ref => {
        this.monthInputElement = ref;
    }

    getDayInputElement = ref => {
        this.dayInputElement = ref;
    }

    changeYear = e => {
        const value = e.target.value ? +e.target.value : '';
        const updater = state => {
            const year = (strIsNumber(value) || value === '') ? value : state.year;
            if (`${value}`.length > 4) {
                return null;
            }
            return {year};
        };
        this.setState(updater);
    }

    changeMonth = e => {
        const value = e.target.value ? +e.target.value : '';
        const updater = state => {
            const month = (strIsNumber(value) || value === '') ? value : state.month;
            if (value && (+value > 12 || +value < 1)) {
                return null;
            }
            if (`${month}`.length > 2) {
                return null;
            }
            return {month};
        };
        this.setState(updater);
    }

    changeDay = e => {
        const value = e.target.value ? +e.target.value : '';
        const updater = state => {
            const {year, month} = state;
            const day = (strIsNumber(value) || value === '') ? value : state.day;
            if (`${value}`.length > 2) {
                return null;
            }
            // 输入日校验
            const daysInMonth = monthDayRange(year);
            if (+day > daysInMonth[month - 1]) {
                return null;
            }
            return {day};
        };
        this.setState(updater);
    }

    inputOnBlur = () => {
        const {
            onFinishInput,
            dateType,
            canSelectFuture
        } = this.props;
        const {
            validateMaxDate,
            validateMinDate,
            year,
            month,
            day,
            date
        } = this.state;
        if (year && month && day) {
            const currentDate = `${year}/${month}/${day}`;
            const currentTimeStamp = getTimeStamp(currentDate);
            if ((validateMinDate && getTimeStamp(validateMinDate) && (currentTimeStamp < getTimeStamp(validateMinDate)))
            || (validateMaxDate && getTimeStamp(validateMaxDate) && (currentTimeStamp > getTimeStamp(validateMaxDate)))
            || (validateDateBeyondToday(currentDate) && !canSelectFuture)) {
                this.setState({
                    year: (getDetailDate(date) && getDetailDate(date).fullYear) || '',
                    month: (getDetailDate(date) && getDetailDate(date).fullMonth) || '',
                    day: (getDetailDate(date) && getDetailDate(date).fullDay) || ''
                });
                return;
            }
            this.setState({
                year,
                month,
                day
            });
            if (onFinishInput) {
                onFinishInput({
                    value: `${year}/${month}/${day}`,
                    type: dateType
                });
            }
        }
    }

    render() {
        const {
            prefixCls,
            isCompare
        } = this.props;
        const {year, month, day} = this.state;
        const inputCls = classNames(`${prefixCls}-container`, {
            [`${prefixCls}-compare`]: isCompare
        });
        return (
            <span className={`${prefixCls}`}>
                <input
                    ref={this.getYearInputElement}
                    type="text"
                    className={`${inputCls} ${prefixCls}-large`}
                    value={year}
                    placeholder="年"
                    onChange={this.changeYear}
                    max="4"
                    data-type="year"
                    onBlur={this.inputOnBlur}
                    onKeyDown={this.onKeyDown}
                />
                <span className={`${prefixCls}-seperate`}>/</span>
                <input
                    ref={this.getMonthInputElement}
                    type="text"
                    className={inputCls}
                    value={month}
                    placeholder="月"
                    onChange={this.changeMonth}
                    max="2"
                    data-type="month"
                    onBlur={this.inputOnBlur}
                    onKeyDown={this.onKeyDown}
                />
                <span className={`${prefixCls}-seperate`}>/</span>
                <input
                    ref={this.getDayInputElement}
                    type="text"
                    className={inputCls}
                    value={day}
                    placeholder="日"
                    onChange={this.changeDay}
                    max="2"
                    data-type="day"
                    onBlur={this.inputOnBlur}
                    onKeyDown={this.onKeyDown}
                />
            </span>
        );
    }
}
