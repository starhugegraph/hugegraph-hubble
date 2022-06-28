import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'mini-store';
import {polyfill} from 'react-lifecycles-compat';
import dayjs from 'dayjs';
import partial from 'lodash/partial';
import {
    formatMultipleDate,
    getTimeStamp,
    getTimeTramp,
    monthDayRange
} from '../../../core/datePickerTools';

class Input extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
        prefixCls: PropTypes.string.isRequired,
        dateFormat: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        onChange: PropTypes.func,
        multiple: PropTypes.bool,
        validateMinDate: PropTypes.string,
        validateMaxDate: PropTypes.string,
        inputType: PropTypes.string,
        validateDisabled: PropTypes.func
    }

    static defaultProps = {
        onChange() {},
        multiple: false
    }

    constructor(props) {
        super(props);
        const {value, dateFormat} = props;
        const {
            beginDate,
            endDate
        } = formatMultipleDate(value, dateFormat);
        this.state = {
            beginDate,
            endDate,
            prevProps: this.props
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const prevProps = prevState.prevProps;
        if (('value' in nextProps && (nextProps.value !== prevProps.value))
            || (nextProps.visible !== prevProps.visible)
        ) {
            const {value, dateFormat} = nextProps;
            const {
                beginDate,
                endDate
            } = formatMultipleDate(value, dateFormat);
            return {
                beginDate,
                endDate,
                prevProps: nextProps
            };
        }
        return null;
    }

    onChangeInput = (type, e) => {
        let value = e.target.value;
        const {
            dateFormat,
            onChange,
            multiple,
            validateMaxDate,
            validateMinDate,
            inputType,
            validateDisabled
        } = this.props;
        const {
            endDate,
            beginDate
        } = this.state;
        const reg = /^[\d/.///-]*$/;
        if (!reg.test(value)) {
            return;
        }
        let newState = {};
        if (type === 'beginDate') {
            newState = {
                beginDate: value
            };
        } else if (type === 'endDate') {
            newState = {
                endDate: value
            };
        }
        this.setState(newState);
        if (validateDisabled && typeof validateDisabled === 'function') {
            if (validateDisabled({
                dayItem: value,
                timeStamp: getTimeTramp(value),
                getTimeStamp: getTimeTramp
            })) {
                return;
            }
        }
        if (newState.endDate) {
            const endDateTimeTramp = getTimeTramp(newState.endDate);
            if (endDateTimeTramp < getTimeTramp(validateMinDate) || endDateTimeTramp > getTimeTramp(validateMaxDate)) {
                return;
            }
        }
        if (newState.beginDate) {
            const beginDateTimeTramp = getTimeTramp(newState.beginDate);
            if (beginDateTimeTramp < getTimeTramp(validateMinDate) || beginDateTimeTramp > getTimeTramp(validateMaxDate)) {
                return;
            }
        }
        value = value.replace(/\./g, '/');
        let timeArray = value.split('/');
        if (timeArray.length === 1) {
            timeArray = value.split('-');
        }
        if (getTimeStamp(value)
        && inputType !== 'month'
        && timeArray.length === 3
        && `${timeArray[1]}`.length === 2
        && `${timeArray[2]}`.length === 2
        && monthDayRange(timeArray[0])[timeArray[1] - 1] && +timeArray[2] <= monthDayRange(timeArray[0])[timeArray[1] - 1]) {
            // 合法时间戳的话，并且日期为标准的XXXX/XX/XX格式，则实时修改
            const formatDate = dayjs(new Date(value)).format(dateFormat);
            if (!multiple
            && getTimeTramp(value) <= getTimeTramp(validateMaxDate)
            && getTimeTramp(value) >= getTimeTramp(validateMinDate)) {
                onChange(formatDate, false);
            } else if (
                type === 'beginDate'
                && getTimeTramp(value) < getTimeTramp(endDate)
                && getTimeTramp(value) >= getTimeTramp(validateMinDate)
            ) {
                const endDateFormat = endDate ? dayjs(new Date(endDate)).format(dateFormat) : '';
                onChange([formatDate, endDateFormat], false);
            } else if (
                type === 'endDate'
                && getTimeTramp(value) > getTimeTramp(beginDate)
                && getTimeTramp(value) <= getTimeTramp(validateMaxDate)
            ) {
                const beginDateFormat = beginDate ? dayjs(new Date(beginDate)).format(dateFormat) : '';
                onChange([beginDateFormat, formatDate], false);
            }
        }
        if (inputType === 'month'
        && timeArray.length === 2
        && `${timeArray[1]}`.length === 2
        && +timeArray[1] < 13
        && getTimeTramp(value) <= getTimeTramp(validateMaxDate)
        && getTimeTramp(value) >= getTimeTramp(validateMinDate)) {
            const formatDate = dayjs(new Date(value)).format(dateFormat);
            onChange(formatDate, false);
        }
    }

    renderInput = () => {
        const inputProps = {
            value: this.state.beginDate,
            onChange: partial(this.onChangeInput, 'beginDate'),
            placeholder: '请输入日期'
        };
        return (
            <div className={`${this.props.prefixCls}-input-container`}>
                <input {...inputProps} />
            </div>
        );
    }

    renderMultipleInput = () => {
        const prefixCls = this.props.prefixCls;
        const {beginDate, endDate} = this.state;
        const beginInputProps = {
            value: beginDate || '',
            onChange: partial(this.onChangeInput, 'beginDate'),
            placeholder: '请输入日期'
        };
        const endInputProps = {
            value: endDate || '',
            onChange: partial(this.onChangeInput, 'endDate'),
            placeholder: '请输入日期'
        };
        const containerClassNames = `${prefixCls}-input-multiple`;
        return (
            <div className={containerClassNames}>
                <div className={`${this.props.prefixCls}-input-container`}>
                    <input {...beginInputProps} />
                </div>
                <span> ~ </span>
                <div className={`${this.props.prefixCls}-input-container`}>
                    <input {...endInputProps} />
                </div>
            </div>
        );
    }

    render() {
        const {prefixCls, multiple} = this.props;
        const inputClassNames = `${prefixCls}-input`;
        return (
            <div className={inputClassNames}>
                {multiple ? this.renderMultipleInput() : this.renderInput()}
            </div>
        );
    }
}

polyfill(Input);

export default connect(state => {
    return {
        value: state._value,
        validateMinDate: state.validateMinDate,
        validateMaxDate: state.validateMaxDate
    };
})(Input);
