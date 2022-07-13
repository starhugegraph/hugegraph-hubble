import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../../icon';
import tools from '../../../core';
import Button from '../../button';
import Tooltip from '../../tooltip';

const {
    getDetailDate,
    getTodayStr,
    formatTwoDateInOrder
} = tools.calendar;

export default class CalendarHeader extends PureComponent {
    static propTypes = {
        currentYear: PropTypes.number,
        currentMonth: PropTypes.number,
        onChangeTitle: PropTypes.func,
        prefixCls: PropTypes.string,
        mode: PropTypes.string.isRequired, // 日期模式: date 月份模式 month
        onChangePage: PropTypes.func,
        validateMinDate: PropTypes.string,
        validateMaxDate: PropTypes.string,
        canSelectFuture: PropTypes.bool
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-calendar-header'
    }

    constructor(props) {
        super(props);
        this.state = {
            currentYear: props.currentYear,
            currentMonth: props.currentMonth,
            mode: props.mode
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('currentYear' in nextProps) {
            this.setState({currentYear: nextProps.currentYear});
        }
        if ('currentMonth' in nextProps) {
            this.setState({
                currentMonth: nextProps.currentMonth
            });
        }
        if ('mode' in nextProps) {
            this.setState({mode: nextProps.mode});
        }
    }

    onChangeTitle = () => {
        const {mode, onChangeTitle} = this.props;
        const newMode = mode === 'date' ? 'month' : 'date';
        if (onChangeTitle) {
            onChangeTitle(newMode);
        }
    }

    onGoToNextMonth = () => {
        const {currentYear, currentMonth} = this.state;
        let newCurrentMonth = currentMonth + 1;
        let newCurrentYear = currentYear;
        if (newCurrentMonth === 13) {
            newCurrentMonth = 1;
            newCurrentYear++;
        }
        const onChangePage = this.props.onChangePage;
        if (onChangePage) {
            onChangePage({
                currentMonth: newCurrentMonth,
                currentYear: newCurrentYear
            });
        }
    }

    onGoToPrevMonth = () => {
        const {currentYear, currentMonth} = this.state;
        let newCurrentMonth = currentMonth - 1;
        let newCurrentYear = currentYear;
        if (newCurrentMonth === 0) {
            newCurrentMonth = 12;
            newCurrentYear--;
        }
        const onChangePage = this.props.onChangePage;
        if (onChangePage) {
            onChangePage({
                currentMonth: newCurrentMonth,
                currentYear: newCurrentYear
            });
        }
    }

    canShowNextIcon = () => {
        const {currentYear, currentMonth} = this.state;
        const {canSelectFuture, validateMaxDate} = this.props;
        const todayStr = getTodayStr();
        const validateDay = canSelectFuture
            ? validateMaxDate
            : formatTwoDateInOrder({minDate: todayStr, maxDate: validateMaxDate}).minDate;
        const validateMaxDateObj = getDetailDate(validateDay);
        const showNextIcon = !(validateMaxDateObj.fullYear === currentYear && currentMonth === validateMaxDateObj.fullMonth);
        return showNextIcon;
    }

    render() {
        const prefixCls = this.props.prefixCls;
        const {currentYear, currentMonth, mode} = this.state;
        const validateMinDate = this.props.validateMinDate;
        const angleCls = classNames(`${prefixCls}-angle`, {
            [`${prefixCls}-angle-open`]: mode === 'month'
        });
        const showNextIcon = this.canShowNextIcon();
        let showPrevIcon = true;
        const validateMinDateObj = getDetailDate(validateMinDate);
        if (validateMinDateObj.fullYear === currentYear && currentMonth === validateMinDateObj.fullMonth) {
            showPrevIcon = false;
        }
        return (
            <div className={`${prefixCls}`}>
                <span className={`${prefixCls}-container`} onClick={this.onChangeTitle}>
                    <span className={`${prefixCls}-title`}>
                        {currentYear}
年
                        {currentMonth}
月
                    </span>
                    <span className={angleCls}>
                        <Icon type="angle-down" />
                    </span>
                </span>

                <span className={`${prefixCls}-page`}>
                    {
                        showPrevIcon ? (
                            <Tooltip placement="top" title="上月">
                                <Button className={`${prefixCls}-page-prev`} onClick={this.onGoToPrevMonth}>
                                    <Icon type="angle-left" />
                                </Button>
                            </Tooltip>
                        ) : null
                    }
                    {
                        showNextIcon ? (
                            <Tooltip placement="top" title="下月">
                                <Button className={`${prefixCls}-page-next`} onClick={this.onGoToNextMonth}>
                                    <Icon type="angle-right" />
                                </Button>
                            </Tooltip>
                        ) : null
                    }
                </span>
            </div>
        );
    }
}
