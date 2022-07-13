import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import partial from 'lodash/partial';
import {
    IconAngleDoubleLeft,
    IconAngleDoubleRight,
    IconAngleLeft,
    IconAngleRight
} from '@baidu/one-ui-icon';
import Icon from '../../icon';
import {
    getDetailDate,
    monthDayRange,
    getTimeTramp
} from '../../../core/datePickerTools';

class TitleHeader extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        prefixCls: PropTypes.string.isRequired,
        showYear: PropTypes.number,
        showMonth: PropTypes.number,
        panelType: PropTypes.string.isRequired,
        validateMinDate: PropTypes.string.isRequired,
        validateMaxDate: PropTypes.string.isRequired,
        endDateShowYear: PropTypes.number,
        endDateShowMonth: PropTypes.number,
        endDatePanelType: PropTypes.string,
        multiple: PropTypes.bool,
        isMonthRender: PropTypes.bool
    }

    static defaultProps = {
        multiple: false
    }

    constructor(props) {
        super(props);
        this.store = this.props.store;
    }

    onGoToPrevYear = type => {
        const {showYear, endDateShowYear} = this.props;
        const currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
        const prevYear = currentYear - 1;
        const newState = {};
        if (type === 'multipleNext') {
            newState.endDateShowYear = prevYear;
        } else {
            newState.showYear = prevYear;
        }
        this.store.setState(newState);
    }

    onGoToPrevMonth = type => {
        const {showMonth, endDateShowMonth, showYear, endDateShowYear} = this.props;
        const currentMonth = type === 'multipleNext' ? endDateShowMonth : showMonth;
        let currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
        let prevMonth = currentMonth - 1;
        if (currentMonth === 1) {
            prevMonth = 12;
            currentYear--;
        }
        const newState = {};
        if (type === 'multipleNext') {
            newState.endDateShowMonth = prevMonth;
            newState.endDateShowYear = currentYear;
        } else {
            newState.showMonth = prevMonth;
            newState.showYear = currentYear;
        }
        this.store.setState(newState);
    }

    onGoToNextYear = type => {
        const {showYear, endDateShowYear} = this.props;
        const currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
        const nextYear = currentYear + 1;
        const newState = {};
        if (type === 'multipleNext') {
            newState.endDateShowYear = nextYear;
        } else {
            newState.showYear = nextYear;
        }
        this.store.setState(newState);
    }

    onGoToNextMonth = type => {
        const {showMonth, endDateShowMonth, showYear, endDateShowYear} = this.props;
        const currentMonth = type === 'multipleNext' ? endDateShowMonth : showMonth;
        let currentYear = type === 'multipleNext' ? endDateShowYear : showYear;
        let nextMonth = currentMonth + 1;
        if (currentMonth === 12) {
            nextMonth = 1;
            currentYear++;
        }
        const newState = {};
        if (type === 'multipleNext') {
            newState.endDateShowMonth = nextMonth;
            newState.endDateShowYear = currentYear;
        } else {
            newState.showMonth = nextMonth;
            newState.showYear = currentYear;
        }
        this.store.setState(newState);
    }

    togglePanel = type => {
        const newState = {};
        if (type === 'multipleNext') {
            newState.endDatePanelType = this.props.endDatePanelType === 'date' ? 'month' : 'date';
        } else if (!this.props.isMonthRender) {
            newState.panelType = this.props.panelType === 'date' ? 'month' : 'date';
        } else {
            newState.panelType = this.props.panelType === 'month' ? 'year' : 'month';
        }
        this.store.setState(newState);
    }

    showChangeYearIcon = type => {
        const {
            validateMinDate,
            validateMaxDate,
            showYear,
            endDateShowYear
        } = this.props;
        const minYear = getDetailDate(validateMinDate).fullYear;
        const maxYear = getDetailDate(validateMaxDate).fullYear;
        let showPrevYearIcon;
        let showNextYearIcon;
        if (type === 'single') {
            showPrevYearIcon = minYear < showYear;
            showNextYearIcon = maxYear > showYear;
        } else if (type === 'multiplePrev') {
            // 多选中的第一个面板
            showNextYearIcon = showYear < endDateShowYear;
            showPrevYearIcon = minYear < showYear;
        } else if (type === 'multipleNext') {
            // 多选中的第二个面板
            showNextYearIcon = maxYear > endDateShowYear;
            showPrevYearIcon = endDateShowYear > showYear;
        }
        return {
            showPrevYearIcon,
            showNextYearIcon
        };
    }

    showChangeMonthIcon = type => {
        const {
            validateMinDate,
            validateMaxDate,
            showYear,
            showMonth,
            endDateShowYear,
            endDateShowMonth
        } = this.props;
        const minDate = getDetailDate(validateMinDate);
        const maxDate = getDetailDate(validateMaxDate);
        let firstDayInCurrentMonth = `${showYear}/${showMonth}/01`;
        let lastDayInCurrentMonth = `${showYear}/${showMonth}/${monthDayRange(showYear)[showMonth - 1]}`;
        if (type === 'multipleNext') {
            firstDayInCurrentMonth = `${endDateShowYear}/${endDateShowMonth}/01`;
            lastDayInCurrentMonth = `${endDateShowYear}/${endDateShowMonth}/${monthDayRange(endDateShowYear)[endDateShowMonth - 1]}`;
        }
        const minDateStamp = getTimeTramp(`${minDate.fullYear}/${minDate.fullMonth}/01`);
        const maxDateStamp = getTimeTramp(`${maxDate.fullYear}/${maxDate.fullMonth}/${monthDayRange(maxDate.fullYear)[maxDate.fullMonth - 1]}`);
        let showPrevMonthIcon;
        let showNextMonthIcon;
        if (type === 'single') {
            showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > minDateStamp;
            showNextMonthIcon = getTimeTramp(lastDayInCurrentMonth) < maxDateStamp;
        } else if (type === 'multiplePrev') {
            // 多选面板中的第一个面板
            showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > minDateStamp;
            let endDate = `${endDateShowYear}/${endDateShowMonth - 1}/01`;
            if (endDateShowMonth === 1) {
                endDate = `${endDateShowYear - 1}/12/01`;
            }
            showNextMonthIcon = getTimeTramp(firstDayInCurrentMonth) < getTimeTramp(endDate);
        } else if (type === 'multipleNext') {
            // 多选面板的第二个面板
            let firstDate = `${showYear}/${showMonth + 1}/01`;
            if (showMonth === 12) {
                firstDate = `${endDateShowYear + 1}/01/01`;
            }
            showPrevMonthIcon = getTimeTramp(firstDayInCurrentMonth) > getTimeTramp(firstDate);
            showNextMonthIcon = getTimeTramp(lastDayInCurrentMonth) < maxDateStamp;
        }
        return {
            showPrevMonthIcon,
            showNextMonthIcon
        };
    }

    renderItem = (type = 'single') => {
        const {
            prefixCls,
            showYear,
            showMonth,
            endDateShowYear,
            endDateShowMonth,
            endDatePanelType,
            panelType,
            isMonthRender
        } = this.props;
        let currentPanelType = panelType;
        let currentShowYear = showYear;
        let currentShowMonth = showMonth;
        if (type === 'multipleNext') {
            currentPanelType = endDatePanelType;
            currentShowYear = endDateShowYear;
            currentShowMonth = endDateShowMonth;
        }
        const classNames = `${prefixCls}-title-header`;
        let iconType = currentPanelType === 'date'
            ? <Icon type="angle-down" />
            : <Icon type="angle-up" />;
        if (isMonthRender) {
            iconType = currentPanelType === 'month'
                ? <Icon type="angle-down" />
                : <Icon type="angle-up" />;
        }
        const showYearIcon = this.showChangeYearIcon(type);
        const showMonthIcon = this.showChangeMonthIcon(type);
        return (
            <div className={classNames}>
                {
                    showYearIcon.showPrevYearIcon ? (
                        <span className={`${classNames}-link-year ${classNames}-link-year-prev`} onClick={partial(this.onGoToPrevYear, type)}>
                            <IconAngleDoubleLeft />
                        </span>
                    ) : null
                }
                {
                    showMonthIcon.showPrevMonthIcon && !isMonthRender ? (
                        <span className={`${classNames}-link-month ${classNames}-link-month-prev`} onClick={partial(this.onGoToPrevMonth, type)}>
                            <IconAngleLeft />
                        </span>
                    ) : null
                }
                <span className={`${classNames}-content`} onClick={partial(this.togglePanel, type)}>
                    <span>
                        {`${currentShowYear}年`}
                        {!isMonthRender ? `${currentShowMonth}月` : null}
                    </span>
                    {iconType}
                </span>
                {
                    showYearIcon.showNextYearIcon ? (
                        <span className={`${classNames}-link-month ${classNames}-link-month-next`} onClick={partial(this.onGoToNextYear, type)}>
                            <IconAngleDoubleRight />
                        </span>
                    ) : null
                }
                {
                    showMonthIcon.showNextMonthIcon && !isMonthRender ? (
                        <span className={`${classNames}-link-year ${classNames}-link-year-next`} onClick={partial(this.onGoToNextMonth, type)}>
                            <IconAngleRight />
                        </span>
                    ) : null
                }
            </div>
        );
    }

    renderMultipleHeader = () => {
        const prefixCls = this.props.prefixCls;
        return (
            <div className={`${prefixCls}-multiple-header`}>
                <span>{this.renderItem('multiplePrev')}</span>
                <span>{this.renderItem('multipleNext')}</span>
            </div>
        );
    }

    render() {
        const multiple = this.props.multiple;
        return multiple ? this.renderMultipleHeader() : this.renderItem();
    }
}

export default connect(state => {
    return {
        showYear: state.showYear,
        showMonth: state.showMonth,
        panelType: state.panelType,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate,
        endDateShowYear: state.endDateShowYear,
        endDateShowMonth: state.endDateShowMonth,
        endDatePanelType: state.endDatePanelType
    };
})(TitleHeader);
