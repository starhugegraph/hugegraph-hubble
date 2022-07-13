import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import tools from '../../../core';

const {
    initFormatAllMonths,
    selectScrollYearIndex,
    formatAllMonths,
    getTimeStamp,
    getDetailDate
} = tools.calendar;

let loadingInMonthMode = false;

export default class CalendarBodyMonth extends Component {
    static propTypes = {
        selectMonth: PropTypes.number,
        selectYear: PropTypes.number,
        prefixCls: PropTypes.string,
        onSelectMonth: PropTypes.func,
        validateMinDate: PropTypes.string,
        validateMaxDate: PropTypes.string,
        canSelectFuture: PropTypes.bool.isRequired,
        mode: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            selectMonth: props.selectMonth,
            selectYear: props.selectYear,
            list: initFormatAllMonths({
                currentYear: props.selectYear,
                validateMinDate: props.validateMinDate,
                validateMaxDate: props.validateMaxDate,
                canSelectFuture: props.canSelectFuture
            })
        };
    }

    componentDidMount = () => {
        this.scrollToPosition(this.state);
        this.bindScroll();
    }

    componentWillReceiveProps(nextProps) {
        const {validateMinDate, validateMaxDate, canSelectFuture} = this.props;
        if ('selectYear' in nextProps) {
            this.setState({
                selectYear: nextProps.selectYear,
                list: initFormatAllMonths({
                    currentYear: nextProps.selectYear,
                    validateMinDate,
                    validateMaxDate,
                    canSelectFuture
                })
            });
        }
        if ('selectMonth' in nextProps) {
            this.setState({
                selectMonth: nextProps.selectMonth
            });
        }
        if ('mode' in nextProps
            && nextProps.mode === 'month'
            && nextProps.mode !== this.props.mode) {
            this.scrollToPosition(this.state);
            this.bindScroll();
        }
    }

    componentDidUpdate = () => {
        // dom 渲染完后
        loadingInMonthMode = false;
    }

    onSelectMonth = e => {
        const dataset = e.target.dataset;
        const type = dataset.type;
        if (type !== 'month' || dataset.disabled === 'true') {
            return;
        }
        const year = +dataset.year;
        const month = +dataset.month;
        const onSelectMonth = this.props.onSelectMonth;
        onSelectMonth({
            year,
            month
        });
    }

    getBodyElement = ref => {
        this.dateBody = ref;
    };

    getBodyListElement = ref => {
        this.dateBodyList = ref;
    };

    scrollToPosition = props => {
        const body = this.dateBody;
        const selectIndex = selectScrollYearIndex({
            list: this.state.list,
            selectYear: props.selectYear
        });
        const currentNode = this.dateBodyList.children[selectIndex];
        if (currentNode) {
            const currentNodeOffsetTop = currentNode.offsetTop - body.offsetTop;
            body.scrollTop = currentNodeOffsetTop;
        }
    }

    bindScroll = () => {
        const body = this.dateBody;
        const bodyList = this.dateBodyList;
        const {validateMaxDate, validateMinDate, canSelectFuture} = this.props;
        const scrollFunc = () => {
            const scrollTop = body.scrollTop;
            const list = this.state.list;
            if (scrollTop < 10 && !loadingInMonthMode) {
                loadingInMonthMode = true;
                this.setState({
                    list: formatAllMonths({
                        list,
                        currentYear: list[0].year,
                        validateMinDate,
                        validateMaxDate,
                        canSelectFuture
                    })
                });
            } else if ((scrollTop > bodyList.children[list.length - 3].offsetTop - body.offsetTop) && !loadingInMonthMode) {
                loadingInMonthMode = true;
                this.setState({
                    list: formatAllMonths({
                        list,
                        currentYear: list[list.length - 1].year,
                        validateMinDate,
                        validateMaxDate,
                        canSelectFuture
                    })
                });
            }
        };
        body.removeEventListener('scroll', _.debounce(scrollFunc, 50));
        body.addEventListener('scroll', _.debounce(scrollFunc, 50));
    }

    isMonthDisabled = ({item, dayIndex}) => {
        const {canSelectFuture, validateMinDate, validateMaxDate} = this.props;
        const currentMonthFirstDay = getTimeStamp(`${item.year}/${dayIndex + 1}/1`);
        const todayTimeStramp = new Date().getTime();
        if (currentMonthFirstDay > todayTimeStramp && !canSelectFuture) {
            return true;
        }
        const validateFirstDate = getDetailDate(validateMinDate);
        const validateLastDate = getDetailDate(validateMaxDate);
        const disabled = (getTimeStamp(`${validateFirstDate.fullYear}/${validateFirstDate.fullMonth}/1`)
            > currentMonthFirstDay)
            || (getTimeStamp(`${validateLastDate.fullYear}/${validateLastDate.fullMonth}/1`)
            < currentMonthFirstDay);
        return disabled;
    }

    render() {
        const {selectMonth, selectYear} = this.state;
        const prefixCls = this.props.prefixCls;
        const clx = `${prefixCls}-month-select`;
        const selectText = `${selectYear}/${selectMonth}`;
        const list = this.state.list;
        return (
            <div className={clx} ref={this.getBodyElement}>
                <div className={`${clx}-list`} ref={this.getBodyListElement} onClick={this.onSelectMonth}>
                    {
                        list.map((item, index) => {
                            return (
                                <div key={index} className={`${clx}-item`}>
                                    <div className={`${clx}-item-year`}>
                                        <span>
                                            {item.year}
年
                                        </span>
                                    </div>
                                    <div className={`${clx}-item-months`}>
                                        {
                                            item.month.map((day, dayIndex) => {
                                                const isSelected = selectText === `${item.year}/${dayIndex + 1}`;
                                                const disabled = this.isMonthDisabled({item, dayIndex});
                                                const classes = classNames(`${clx}-item-months-single`, {
                                                    [`${clx}-item-months-single-normal`]: !disabled,
                                                    [`${clx}-item-months-single-selected`]: isSelected && !disabled,
                                                    [`${clx}-item-months-single-disabled`]: disabled
                                                });
                                                return (
                                                    <span
                                                        key={dayIndex}
                                                        className={classes}
                                                        data-type="month"
                                                        data-year={item.year}
                                                        data-month={`${dayIndex + 1}`}
                                                        data-disabled={disabled}
                                                    >
                                                        {day}
月
                                                    </span>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
