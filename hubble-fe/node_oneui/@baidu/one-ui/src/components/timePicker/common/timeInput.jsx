import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import {fomatStr, addZero} from '../../../core/pickTimeTools';
import Input from '../../input';
import Icon from '../../icon';

export default class TimeInput extends PureComponent {
    static propTypes = {
        format: PropTypes.string,
        prefixCls: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.object,
        defaultOpenValue: PropTypes.object,
        inputReadOnly: PropTypes.bool,
        hourOptions: PropTypes.array,
        minuteOptions: PropTypes.array,
        secondOptions: PropTypes.array,
        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledSeconds: PropTypes.func,
        allowEmpty: PropTypes.bool,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        errorMessage: PropTypes.string,
        onChange: PropTypes.func,
        onEsc: PropTypes.func,
        onKeyDown: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onClear: PropTypes.func,
        size: PropTypes.string,
        width: PropTypes.number
    };

    static defaultProps = {
        inputReadOnly: false,
        style: {}
    };

    constructor(props) {
        super(props);
        const {value, format} = props;
        this.state = {
            str: (value && value.format(format)) || '',
            invalid: false,
            isFocus: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const {value, format} = nextProps;
        const {value: originValue} = this.props;
        const currentStr = (originValue && originValue.format(format)) || '';
        const nextStr = (value && value.format(format)) || '';
        if (nextStr !== currentStr) {
            this.setState({
                str: nextStr,
                invalid: false
            });
        }
    }

    onEsc = () => {
        this.props.onEsc();
        this.refInput.focus();
    };

    onInputChange = event => {
        let str = event.value;
        const preFn = event.preFn;
        str = fomatStr(str);
        this.setState({str});
        const {
            format,
            hourOptions,
            minuteOptions,
            secondOptions,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            onChange,
            allowEmpty
        } = this.props;

        if (str) {
            const {value: originalValue} = this.props;
            const value = this.getProtoValue().clone();
            const parsed = moment(str, format, true);
            let newState = {invalid: true};
            const originalStr = (originalValue && originalValue.format(this.props.format)) || '';
            if (!parsed.isValid()) {
                if (preFn === 'onBlur') {
                    newState = {
                        str: originalStr,
                        invalid: false
                    };
                }
                this.setState(newState);
                return;
            }
            value
                .hour(parsed.hour())
                .minute(parsed.minute())
                .second(parsed.second());

            // if time value not allowed, response warning.
            if (
                hourOptions.indexOf(value.hour()) < 0
                || minuteOptions.indexOf(value.minute()) < 0
                || secondOptions.indexOf(value.second()) < 0
            ) {
                if (preFn === 'onBlur') {
                    newState = {
                        str: originalStr,
                        invalid: false
                    };
                }
                this.setState(newState);
                return;
            }

            // if time value is disabled, response warning.
            const disabledHourOptions = disabledHours();
            const disabledMinuteOptions = disabledMinutes(value.hour());
            const disabledSecondOptions = disabledSeconds(value.hour(), value.minute());
            if (
                (disabledHourOptions && disabledHourOptions.indexOf(value.hour()) >= 0)
                || (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.minute()) >= 0)
                || (disabledSecondOptions && disabledSecondOptions.indexOf(value.second()) >= 0)
            ) {
                if (preFn === 'onBlur') {
                    newState = {
                        str: originalStr,
                        invalid: false
                    };
                }
                this.setState(newState);
                return;
            }
            if (originalValue) {
                const changedValue = originalValue.clone();
                changedValue.hour(value.hour());
                changedValue.minute(value.minute());
                changedValue.second(value.second());
                onChange(changedValue);
            } else if (originalValue !== value) {
                onChange(value);
            }
        } else if (allowEmpty) {
            onChange(null);
        } else {
            this.setState({
                invalid: true
            });
            return;
        }

        this.setState({
            invalid: false
        });
    };

    onKeyDown = e => {
        if (e.keyCode === 27) {
            this.onEsc();
        } else if (e.keyCode === 13) {
            this.onBlur();
        }

        this.props.onKeyDown(e);
    };

    onFocus = () => {
        this.setState({isFocus: true});
        this.props.onFocus();
    }

    onBlur = () => {
        setTimeout(() => {
            if (this.___stopBlur___) {
                this.___stopBlur___ = false;
                return;
            }
            const {str, invalid} = this.state;
            if (str && invalid) {
                // 为了小于10的数补上0
                this.onInputChange({value: addZero(str), preFn: 'onBlur'});
            }
            this.setState({isFocus: false});
        }, 200);
        this.props.onBlur();
    }

    onClear = e => {
        this.___stopBlur___ = true;
        this.props.onClear(e);
    }

    getProtoValue = () => {
        const {value, defaultOpenValue} = this.props;
        return value || defaultOpenValue;
    }

    renderClearButton = () => {
        const {str, isFocus} = this.state;
        const {prefixCls, allowEmpty} = this.props;
        if (!allowEmpty) {
            return null;
        }

        return (
            isFocus && str
                ? <Icon onClick={this.onClear} className={`${prefixCls}-icon-close`} type="fail" />
                : <Icon className={`${prefixCls}-icon-clock`} type="time" />
        );
    }

    renderInput = () => {
        const {
            prefixCls,
            placeholder,
            inputReadOnly,
            disabled,
            style,
            size,
            width
        } = this.props;
        const {invalid, str} = this.state;
        const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
        return (
            <Input
                style={style}
                className={`${prefixCls}-input  ${invalidClass}`}
                ref={ref => {
                    this.refInput = ref;
                }}
                onKeyDown={this.onKeyDown}
                value={str}
                placeholder={placeholder}
                onChange={this.onInputChange}
                readOnly={!!inputReadOnly}
                isRequired={false}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                disabled={disabled}
                name={name}
                size={size}
                width={width}
            />
        );
    }

    render() {
        const {prefixCls, errorMessage} = this.props;
        const wrapClass = classNames(
            `${prefixCls}-input-wrap`,
            {
                [`${prefixCls}-input-wrap-error`]: errorMessage
            }
        );
        return (
            <div className={wrapClass}>
                {this.renderInput()}
                {this.renderClearButton()}
            </div>
        );
    }
}
