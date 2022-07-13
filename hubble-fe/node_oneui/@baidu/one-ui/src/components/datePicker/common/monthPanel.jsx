import React, {PureComponent} from 'react';
import partial from 'lodash/partial';
import {connect} from 'mini-store';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {
    getTimeTramp,
    monthDayRange
} from '../../../core/datePickerTools';

const monthItems = [
    1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12
];

class MonthRender extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        prefixCls: PropTypes.string.isRequired,
        showMonth: PropTypes.number.isRequired,
        showYear: PropTypes.number.isRequired,
        panelType: PropTypes.string.isRequired,
        endDatePanelType: PropTypes.string,
        validateMinDate: PropTypes.string.isRequired,
        validateMaxDate: PropTypes.string.isRequired,
        endDateShowYear: PropTypes.number,
        endDateShowMonth: PropTypes.number,
        type: PropTypes.string,
        onClickMonth: PropTypes.func,
        isMonthRender: PropTypes.bool,
        dateFormat: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    onClickMonth = ({
        month,
        disabled
    }) => {
        if (disabled) {
            return;
        }
        const newState = {};
        const {type, isMonthRender, showYear, dateFormat} = this.props;
        if (type === 'nextMultiple') {
            newState.endDateShowMonth = month;
            newState.endDatePanelType = 'date';
        } else {
            newState.showMonth = month;
            newState.panelType = isMonthRender ? 'month' : 'date';
        }
        this.store.setState(newState);
        if (this.props.onClickMonth) {
            const value = dayjs(`${showYear}/${month}`).format(dateFormat);
            this.props.onClickMonth(value);
        }
    }

    formatItemClassName = (showYear, showMonth, month) => {
        const {prefixCls, type, endDateShowYear, endDateShowMonth} = this.props;
        let {validateMinDate, validateMaxDate} = this.props;
        const range = monthDayRange(showYear);
        if (type === 'prevMultiple') {
            let endDate = `${endDateShowYear}/${endDateShowMonth - 1}/01`;
            if (endDateShowMonth === 1) {
                endDate = `${endDateShowYear - 1}/12/01`;
            }
            if (getTimeTramp(endDate) < getTimeTramp(validateMaxDate)) {
                validateMaxDate = endDate;
            }
        } else if (type === 'nextMultiple') {
            let beginDate = `${this.props.showYear}/${this.props.showMonth + 1}/01`;
            if (this.props.showMonth === 12) {
                beginDate = `${this.props.showYear + 1}/01/01`;
            }
            if (getTimeTramp(beginDate) > getTimeTramp(validateMinDate)) {
                validateMinDate = beginDate;
            }
        }
        const monthClassName = `${prefixCls}-month-container-item`;
        const currentMonthLastDay = getTimeTramp(`${showYear}/${month}/${range[month - 1]}`);
        const currentMonthFirstDay = getTimeTramp(`${showYear}/${month}/01`);
        const disabled = currentMonthLastDay < getTimeTramp(validateMinDate)
                || currentMonthFirstDay > getTimeTramp(validateMaxDate);
        const monthClassNames = classNames(
            monthClassName,
            {
                [`${monthClassName}-selected`]: month === showMonth,
                [`${monthClassName}-disabled`]: disabled,
                [`${monthClassName}-last-row`]: month > 9
            }
        );
        return {
            disabled,
            monthClassNames
        };
    }

    renderMonth = () => {
        const monthContainers = [];
        const {showMonth, showYear, endDateShowYear, endDateShowMonth, type} = this.props;
        const currentMonth = type === 'nextMultiple' ? endDateShowMonth : showMonth;
        const currentYear = type === 'nextMultiple' ? endDateShowYear : showYear;
        monthItems.forEach(month => {
            const {monthClassNames, disabled} = this.formatItemClassName(currentYear, currentMonth, month);
            monthContainers.push(
                <span
                    className={monthClassNames}
                    key={month}
                    onClick={partial(this.onClickMonth, {
                        month,
                        disabled
                    })}
                >
                    {`${month}月`}
                </span>
            );
        });
        return monthContainers;
    }

    render() {
        const {prefixCls, panelType, endDatePanelType, type} = this.props;
        const currentPanelType = type === 'nextMultiple' ? endDatePanelType : panelType;
        if (currentPanelType !== 'month') {
            return null;
        }
        return (
            <div className={`${prefixCls}-month-container`}>
                {this.renderMonth()}
            </div>
        );
    }
}

export default connect(state => {
    return {
        showYear: state.showYear,
        showMonth: state.showMonth,
        endDateShowYear: state.endDateShowYear,
        endDateShowMonth: state.endDateShowMonth,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate,
        endDatePanelType: state.endDatePanelType,
        panelType: state.panelType
    };
})(MonthRender);
