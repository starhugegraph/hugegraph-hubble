import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import partial from 'lodash/partial';
import dayjs from 'dayjs';
import {
    formatPerMonthInDay,
    getTimeTramp,
    getTodayDetail,
    formatWeek
} from '../../../core/datePickerTools';

export default class DayItemRender extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        showYear: PropTypes.number,
        showMonth: PropTypes.number,
        onChange: PropTypes.func,
        dateFormat: PropTypes.string.isRequired,
        currentDate: PropTypes.string.isRequired,
        validateMinDate: PropTypes.string.isRequired,
        validateMaxDate: PropTypes.string.isRequired,
        validateDisabled: PropTypes.func
    }

    static defaultProps = {
        onChange() {}
    }

    cache = {};

    memoize = function (param) {
        if (!this.cache[param]) {
            const date = param.split('/');
            const result = formatPerMonthInDay({
                year: date[0],
                month: date[1]
            });
            this.cache[param] = result;
        }
        return this.cache[param];
    };

    onClickDay = (disabled, e) => {
        const value = e.target.dataset.value;
        if (disabled) {
            return;
        }
        const {onChange, dateFormat} = this.props;
        const formatDate = dayjs(new Date(value)).format(dateFormat);
        onChange(formatDate);
    }

    renderMonthItem = () => {
        const {
            showYear,
            showMonth,
            prefixCls,
            currentDate,
            validateMinDate,
            validateMaxDate,
            validateDisabled
        } = this.props;
        const perMonthInDay = this.memoize(`${showYear}/${showMonth}`);
        const elements = formatWeek(perMonthInDay);
        const itemDaysClx = `${prefixCls}-body-month`;
        const todayDetail = getTodayDetail();
        const todayTime = `${todayDetail.fullYear}/${todayDetail.fullMonth}/${todayDetail.fullDay}`;
        return (
            <div className={itemDaysClx}>
                {
                    elements.map((element, index) => {
                        return (
                            <div
                                key={`week-${index}`}
                                className={`${itemDaysClx}-week`}
                            >
                                {
                                    element.map(dayStr => {
                                        const value = dayStr.value;
                                        const dayTime = getTimeTramp(value);
                                        let disabled = false;
                                        if (dayTime > getTimeTramp(validateMaxDate) || dayTime < getTimeTramp(validateMinDate)) {
                                            disabled = true;
                                        } else if (validateDisabled && typeof validateDisabled === 'function') {
                                            disabled = validateDisabled({
                                                dayItem: value,
                                                timeStamp: getTimeTramp(value),
                                                getTimeStamp: getTimeTramp
                                            });
                                        }
                                        const readOnly = !dayStr.isCurrentMonth;
                                        const dayStrClassNames = classNames(
                                            `${itemDaysClx}-item`,
                                            {
                                                [`${itemDaysClx}-item-read-only`]: readOnly,
                                                [`${itemDaysClx}-item-today`]: dayTime === getTimeTramp(todayTime),
                                                [`${itemDaysClx}-item-selected`]: (dayTime === getTimeTramp(currentDate) && !readOnly),
                                                [`${itemDaysClx}-item-disabled`]: disabled
                                            }
                                        );
                                        return (
                                            <span
                                                key={value}
                                                data-value={value}
                                                data-disabled={dayStr === null}
                                                className={dayStrClassNames}
                                                onClick={partial(this.onClickDay, disabled)}
                                            >
                                                <span
                                                    data-value={value}
                                                    data-disabled={dayStr === null}
                                                >
                                                    {dayStr ? dayStr.label : ''}
                                                </span>
                                            </span>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return this.renderMonthItem();
    }
}
