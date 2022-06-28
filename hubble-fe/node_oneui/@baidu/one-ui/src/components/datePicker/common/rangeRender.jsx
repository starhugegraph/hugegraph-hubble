import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import dayjs from 'dayjs';
import partial from 'lodash/partial';
import MonthAndYearPanel from './monthAndYearPanel';
import RangeDayRender from './rangeDayRender';
import {
    getTimeTramp,
    getDetailDate
} from '../../../core/datePickerTools';

class RangeRender extends PureComponent {
    static propTypes = {
        store: PropTypes.object.isRequired,
        prefixCls: PropTypes.string.isRequired,
        currentDate: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        dateFormat: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        endDateShowYear: PropTypes.number.isRequired,
        endDateShowMonth: PropTypes.number.isRequired,
        showYear: PropTypes.number.isRequired,
        showMonth: PropTypes.number.isRequired
    }

    static defaultProps = {
        onChange() {}
    }

    constructor(props) {
        super(props);
        const currentDate = props.currentDate;
        this.store = this.props.store;
        this.state = {
            beginDate: currentDate[0] || '',
            endDate: currentDate[1] || '',
            prevProps: props,
            step: 0,
            hoverDate: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const prevProps = prevState.prevProps;
        let newState = {};
        if (('currentDate' in nextProps && nextProps.currentDate !== prevProps.currentDate)
        || (prevProps.visible !== nextProps.visible)) {
            newState = {
                ...newState,
                beginDate: nextProps.currentDate[0] || '',
                endDate: nextProps.currentDate[1] || '',
                prevProps: nextProps,
                step: 0
            };
        }
        return newState;
    }

    onPickerDay = (type, value, readOnly = false) => {
        const {step, beginDate} = this.state;
        const {onChange, dateFormat, showYear, showMonth, endDateShowYear, endDateShowMonth} = this.props;
        if (step === 0) {
            // 表示开始选择
            this.setState({
                step: 1,
                endDate: '',
                beginDate: value
            });
            // 如果点击了readOnly部分的话，修改当前面板展示的年月
            if (readOnly) {
                const {fullYear, fullMonth} = getDetailDate(value);
                let newState = {};
                const currentFirstDate = getTimeTramp(`${fullYear}/${fullMonth}/01`);
                if (type === 'prevMultiple' && (
                    currentFirstDate !== getTimeTramp(`${endDateShowYear}/${endDateShowMonth}/01`)
                )) {
                    newState = {
                        showYear: fullYear,
                        showMonth: fullMonth
                    };
                } else if (type === 'nextMultiple' && (
                    currentFirstDate !== getTimeTramp(`${showYear}/${showMonth}/01`)
                )) {
                    newState = {
                        endDateShowYear: fullYear,
                        endDateShowMonth: fullMonth
                    };
                }
                this.store.setState(newState);
            }

        } else if (step === 1) {
            let currentBeginDate = beginDate;
            let currentEndDate = value;
            if (getTimeTramp(currentBeginDate) > getTimeTramp(currentEndDate)) {
                currentBeginDate = value;
                currentEndDate = beginDate;
            }
            this.setState({
                step: 0,
                endDate: currentEndDate,
                beginDate: currentBeginDate,
                hoverDate: ''
            });
            onChange(
                [dayjs(new Date(currentBeginDate)).format(dateFormat), dayjs(new Date(currentEndDate)).format(dateFormat)]
            );
        }
    }

    onMouseEnter = value => {
        const step = this.state.step;
        if (step === 1) {
            this.setState({
                hoverDate: value
            });
        }
    }

    onMouseLeave = () => {
        this.setState({
            hoverDate: ''
        });
    }

    render() {
        const containerClassName = `${this.props.prefixCls}-range`;
        const {beginDate, endDate, hoverDate} = this.state;
        const currentDate = [beginDate, endDate];
        return (
            <div className={containerClassName}>
                <div className={`${containerClassName}-item`}>
                    <MonthAndYearPanel {...this.props} type="prevMultiple" />
                    <RangeDayRender
                        {...this.props}
                        type="prevMultiple"
                        currentDate={currentDate}
                        onChange={partial(this.onPickerDay, 'prevMultiple')}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        hoverDate={hoverDate}
                    />
                </div>
                <div className={`${containerClassName}-item`}>
                    <MonthAndYearPanel {...this.props} type="nextMultiple" />
                    <RangeDayRender
                        {...this.props}
                        type="nextMultiple"
                        currentDate={currentDate}
                        onChange={partial(this.onPickerDay, 'nextMultiple')}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        hoverDate={hoverDate}
                    />
                </div>
            </div>
        );
    }
}

export default connect(state => {
    return {
        currentDate: state._value,
        endDateShowYear: state.endDateShowYear,
        endDateShowMonth: state.endDateShowMonth,
        showYear: state.showYear,
        showMonth: state.showMonth
    };
})(RangeRender);
