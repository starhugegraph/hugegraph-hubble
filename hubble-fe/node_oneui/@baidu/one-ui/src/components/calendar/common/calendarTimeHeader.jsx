import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import tools from '../../../core';

const {
    formatHoursByString,
    allHours,
    allMinutesAndSeconds,
    formatHours,
    rulesMapFormat,
    rulesMap,
    formatTimeByRule
} = tools.calendar;

const {
    addZero
} = tools.pickTime;

export default class CalendarTimeHeader extends Component {
    static propTypes = {
        prefixCls: PropTypes.string.isRequired,
        timeObj: PropTypes.shape({
            hour: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            minute: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            second: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }).isRequired,
        updateInputValue: PropTypes.func.isRequired,
        timeRules: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);
        const timeObj = props.timeObj;
        const timeRules = props.timeRules;
        const time = JSON.stringify(props.timeObj) !== '{}'
            ? formatHours({time: `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`})
            : null;
        const value = time ? formatTimeByRule(time, timeRules) : '';
        this.state = {
            defaultValue: value,
            value,
            isValid: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('timeObj' in nextProps) {
            const timeObj = nextProps.timeObj;
            const time = JSON.stringify(timeObj) !== '{}'
                ? formatHours({time: `${timeObj.hour}:${timeObj.minute}:${timeObj.second}`})
                : null;
            const value = time ? formatTimeByRule(time, nextProps.timeRules) : '';
            this.setState({
                value,
                defaultValue: value
            });
        }
    }

    onKeyDown = e => {
        const keyCode = e.keyCode;
        const value = e.target.value;
        const defaultValue = this.state.defaultValue;
        const {updateInputValue, timeRules} = this.props;
        if (keyCode === 13) {
            let time = addZero(value);
            const parsed = moment(time, rulesMapFormat[timeRules], true);
            if (!parsed.isValid()) {
                time = defaultValue;
            }
            this.setState({
                value: time,
                defaultValue: time
            });
            const timeObj = formatHoursByString(time);
            updateInputValue(timeObj);
            this.inputElement.blur();
            e.preventDefault();
        }
    }

    getInputElement = ref => {
        this.inputElement = ref;
    }

    inputOnBlur = e => {
        const value = e.target.value;
        const {updateInputValue, timeRules} = this.props;
        const defaultValue = this.state.defaultValue;
        let time = addZero(value);
        const parsed = moment(time, rulesMapFormat[timeRules], true);
        if (!parsed.isValid()) {
            time = defaultValue;
        }
        this.setState({
            value: time,
            defaultValue: time
        });
        const timeObj = formatHoursByString(time);
        updateInputValue(timeObj);
    }

    changeInput = e => {
        let value = e.target.value;
        const timeRules = this.props.timeRules;
        value = value.replace(/：/g, ':');
        const values = value.split(':');
        if ((values[0] && values[0].length > 2)
            || (values[1] && values[1].length > 2)
            || (values[2] && (values[2].length > 2))) {
            return;
        }
        if (values[0] && allHours.indexOf(addZero(values[0])) < 0) {
            this.setState({
                isValid: false
            });
            return;
        }
        if ((values[1] && allMinutesAndSeconds.indexOf(addZero(values[1]))) < 0
        || (values[2] && allMinutesAndSeconds.indexOf(addZero(values[2])) < 0)) {
            this.setState({
                isValid: false
            });
            return;
        }
        if (rulesMap.HOUR_AND_MINUTE === timeRules && values.length > 2) {
            return;
        }
        if (rulesMap.ONLY_HOUR === timeRules && values.length > 1) {
            return;
        }
        this.setState({
            value
        });
    }

    render() {
        const prefixCls = this.props.prefixCls;
        const {value, isValid} = this.state;
        const inputClx = classNames(`${prefixCls}-time-header`, {
            [`${prefixCls}-time-header-error`]: !isValid
        });
        return (
            <div className={inputClx}>
                <input
                    ref={this.getInputElement}
                    type="text"
                    className={`${inputClx}-input`}
                    value={value}
                    placeholder={value || '请选择时间'}
                    onChange={this.changeInput}
                    max="4"
                    data-type="year"
                    onBlur={this.inputOnBlur}
                    onKeyDown={this.onKeyDown}
                />
            </div>
        );
    }
}
