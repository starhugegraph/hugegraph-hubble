import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {polyfill} from 'react-lifecycles-compat';
import Calendar from './calendar';

class FormCalendar extends PureComponent {
    static propTypes = {
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        defaultValue: '',
        value: '',
        onChange() {}
    }

    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if ('value' in nextProps && nextProps.value !== prevState.value) {
            return {value: nextProps.value};
        }
        return null;
    }

    formatDateObj = value => {
        let date;
        try {
            date = JSON.parse(value);
        } catch (e) {
            date = {};
        }
        return date;
    }

    onChange = obj => {
        this.props.onChange(JSON.stringify(obj));
    }

    render() {
        const {value, defaultValue} = this.props;
        const defaultDate = this.formatDateObj(defaultValue);
        const date = this.formatDateObj(value);
        const newProps = {
            beginDate: date.beginTime || date.beginDate || '',
            endDate: date.endTime || date.endDate || '',
            compareBeginDate: date.compareBeginTime || date.compareBeginDate || '',
            compareEndDate: date.compareEndTime || date.compareEndDate || '',
            defaultBeginDate: defaultDate.defaultBeginTime || defaultDate.defaultBeginDate || '',
            defaultEndDate: defaultDate.defaultEndTime || defaultDate.defaultEndDate || '',
            defaultCompareBeginDate: defaultDate.defaultCompareBeginTime || defaultDate.defaultCompareBeginDate || '',
            defaultCompareEndDate: defaultDate.defaultCompareEndTime || defaultDate.defaultCompareEndDate || ''
        };

        return <Calendar {...this.props} {...newProps} onChange={this.onChange}/>;
    }
}

polyfill(FormCalendar);
export default FormCalendar;
