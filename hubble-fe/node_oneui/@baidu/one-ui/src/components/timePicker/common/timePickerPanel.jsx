import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import {formatOption, noop} from '../../../core/pickTimeTools';
import TimeSelecter from './timeSelecter';

export default class TimePickerPanel extends Component {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        defaultOpenValue: PropTypes.object,
        value: PropTypes.object,
        format: PropTypes.string,
        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledSeconds: PropTypes.func,
        onChange: PropTypes.func,
        onAmPmChange: PropTypes.func,
        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
        showSecond: PropTypes.bool,
        use12Hours: PropTypes.bool,
        toNearestValidTime: PropTypes.func,
        onCurrentSelectPanelChange: PropTypes.func,
        onEsc: PropTypes.func,
        hourOptions: PropTypes.array,
        minuteOptions: PropTypes.array,
        secondOptions: PropTypes.array,
        isAM: PropTypes.bool
    };

    static defaultProps = {
        prefixCls: 'rc-time-picker-panel',
        onChange: noop,
        disabledHours: noop,
        disabledMinutes: noop,
        disabledSeconds: noop,
        defaultOpenValue: moment(),
        use12Hours: false,
        onEsc: noop,
        toNearestValidTime: noop,
        onCurrentSelectPanelChange: noop,
        className: ''
    };

    onItemChange = (type, itemValue) => {
        const {
            onChange,
            use12Hours,
            isAM,
            onAmPmChange
        } = this.props;
        const value = this.getDefaultOpenValue().clone();

        if (type === 'hour') {
            if (use12Hours) {
                if (isAM) {
                    value.hour(+itemValue % 12);
                } else {
                    value.hour((+itemValue % 12) + 12);
                }
            } else {
                value.hour(+itemValue);
            }
        } else if (type === 'minute') {
            value.minute(+itemValue);
        } else if (type === 'ampm') {
            const ampm = itemValue.toUpperCase();
            if (use12Hours) {
                if (ampm === 'PM' && value.hour() < 12) {
                    value.hour((value.hour() % 12) + 12);
                }

                if (ampm === 'AM') {
                    if (value.hour() >= 12) {
                        value.hour(value.hour() - 12);
                    }
                }
            }
            onAmPmChange(ampm);
        } else {
            value.second(+itemValue);
        }
        onChange(value);
    };

    onEnterSelectPanel = range => {
        this.props.onCurrentSelectPanelChange(range);
    };

    getHourSelect(hour) {
        const {prefixCls, hourOptions, disabledHours, showHour, use12Hours} = this.props;
        if (!showHour) {
            return null;
        }
        const disabledOptions = disabledHours();
        let hourOptionsAdj;
        let hourAdj;
        if (use12Hours) {
            hourOptionsAdj = [12].concat(hourOptions.filter(h => h < 12 && h > 0));
            hourAdj = hour % 12 || 12;
        } else {
            hourOptionsAdj = hourOptions;
            hourAdj = hour;
        }

        return (
            <TimeSelecter
                prefixCls={prefixCls}
                options={hourOptionsAdj.map(option => formatOption(option, disabledOptions))}
                selectedIndex={hourOptionsAdj.indexOf(hourAdj)}
                type="hour"
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('hour')}
            />
        );
    }

    getMinuteSelect(minute) {
        const {
            prefixCls,
            minuteOptions,
            disabledMinutes,
            showMinute
        } = this.props;
        if (!showMinute) {
            return null;
        }
        const value = this.getDefaultOpenValue();
        const disabledOptions = disabledMinutes(value.hour());

        return (
            <TimeSelecter
                prefixCls={prefixCls}
                options={minuteOptions.map(option => formatOption(option, disabledOptions))}
                selectedIndex={minuteOptions.indexOf(minute)}
                type="minute"
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('minute')}
            />
        );
    }

    getSecondSelect(second) {
        const {
            prefixCls,
            secondOptions,
            disabledSeconds,
            showSecond
        } = this.props;
        if (!showSecond) {
            return null;
        }
        const value = this.getDefaultOpenValue();
        const disabledOptions = disabledSeconds(value.hour(), value.minute());

        return (
            <TimeSelecter
                prefixCls={prefixCls}
                options={secondOptions.map(option => formatOption(option, disabledOptions))}
                selectedIndex={secondOptions.indexOf(second)}
                type="second"
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('second')}
            />
        );
    }

    getAMPMSelect() {
        const {prefixCls, use12Hours, format, isAM} = this.props;
        if (!use12Hours) {
            return null;
        }

        const AMPMOptions = ['am', 'pm'] // If format has A char, then we should uppercase AM/PM
            .map(c => (format.match(/\sA/) ? c.toUpperCase() : c))
            .map(c => ({value: c}));

        const selected = isAM ? 0 : 1;

        return (
            <TimeSelecter
                prefixCls={prefixCls}
                options={AMPMOptions}
                selectedIndex={selected}
                type="ampm"
                onSelect={this.onItemChange}
                onMouseEnter={() => this.onEnterSelectPanel('ampm')}
            />
        );
    }

    getDefaultOpenValue = () => {
        const {value, toNearestValidTime, defaultOpenValue, hourOptions, minuteOptions, secondOptions} = this.props;
        return value || toNearestValidTime(
            defaultOpenValue,
            hourOptions,
            minuteOptions,
            secondOptions,
        );
    }

    close() {
        this.props.onEsc();
    }

    render() {
        const {
            prefixCls,
            className
        } = this.props;

        const value = this.getDefaultOpenValue();
        return (
            <div
                className={classNames(className, {
                    [`${prefixCls}-inner`]: true
                })}
            >
                <div className={`${prefixCls}-combobox`}>
                    {this.getHourSelect(value.hour())}
                    {this.getMinuteSelect(value.minute())}
                    {this.getSecondSelect(value.second())}
                    {this.getAMPMSelect(value.hour())}
                </div>
            </div>
        );
    }
}
