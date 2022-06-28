import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {polyfill} from 'react-lifecycles-compat';
import classNames from 'classnames';
import {Provider, create} from 'mini-store';
import {IconCalendar, IconTimesCircle} from '@baidu/one-ui-icon';
import {
    getDetailDate,
    getTodayDetail,
    transDateFormat,
    validateData,
    formatButtonText
} from '../../core/datePickerTools';
import TitleHeader from './common/titleHeader';
import DayItemRender from './common/dayItemRender';
import MonthAndYearPanel from './common/monthAndYearPanel';
import Input from './common/input';
import Layer from '../popLayer';
import Button from '../button';
// import Message from '../message';

class DatePicker extends PureComponent {
    static propTypes = {
        // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
        defaultValue: PropTypes.string,
        value: PropTypes.string,
        dateFormat: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        getPopupContainer: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        defaultVisible: PropTypes.bool,
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        onChange: PropTypes.func,
        /** 支持传入默认开始时间 */
        validateMinDate: PropTypes.string,
        /** 支持传入默认结束时间 */
        validateMaxDate: PropTypes.string,
        onClickButton: PropTypes.func,
        popupPlacement: PropTypes.string,
        // 校验器，如果校验的话抛错，则不触发onChange
        validator: PropTypes.func,
        customButtonTitle: PropTypes.node,
        onDelete: PropTypes.func,
        showDeleteIcon: PropTypes.bool,
        layerPrefixCls: PropTypes.string,
        buttonPrefixCls: PropTypes.string,
        validateDisabled: PropTypes.func
    }

    static defaultProps = {
        dateFormat: 'YYYY/MM/DD',
        prefixCls: 'new-fc-one-date-picker',
        className: '',
        disabled: false,
        size: 'small',
        onVisibleChange() {},
        onChange() {},
        onClickButton() {},
        getPopupContainer: () => document.body,
        onDelete() {},
        showDeleteIcon: false,
        layerPrefixCls: 'new-fc-one-popLayer',
        buttonPrefixCls: 'new-fc-one-btn'
    }

    constructor(props) {
        super(props);
        const {defaultValue, value, visible, defaultVisible} = props;
        const _value = defaultValue || value || '';
        const todayDetail = getTodayDetail();
        const currentDetail = getDetailDate(_value);
        this.state = {
            currentValue: _value,
            visible: defaultVisible || visible || false,
            errorMessage: ''
        };
        this.store = create({
            _value,
            showYear: _value ? currentDetail.fullYear : todayDetail.fullYear,
            showMonth: _value ? currentDetail.fullMonth : todayDetail.fullMonth,
            // 面板展示 date or month - 选择日期 or 月份
            panelType: 'date',
            validateMinDate: transDateFormat(props.validateMinDate) || validateData().validateMinDate,
            validateMaxDate: transDateFormat(props.validateMaxDate) || validateData().validateMaxDate
        });
    }

    static getDerivedStateFromProps = nextProps => {
        const newState = {};
        if ('value' in nextProps) {
            newState.currentValue = nextProps.value;
        }
        if ('visible' in nextProps) {
            newState.visible = nextProps.visible;
        }
        return newState;
    }

    componentDidUpdate = prevProps => {
        let newState = {};
        if ('value' in this.props) {
            const _value = this.props.value || '';
            const todayDetail = getTodayDetail();
            const currentDetail = getDetailDate(_value);
            // 控制一些组件内部属性
            newState = {
                ...newState,
                _value,
                showYear: _value ? currentDetail.fullYear : todayDetail.fullYear,
                showMonth: _value ? currentDetail.fullMonth : todayDetail.fullMonth
            };
        }
        if ('validateMinDate' in this.props
            && this.props.validateMinDate !== prevProps.validateMinDate) {
            newState = {
                ...newState,
                validateMinDate: this.props.validateMinDate
            };
        }
        if ('validateMaxDate' in this.props
            && this.props.validateMaxDate !== prevProps.validateMaxDate) {
            newState = {
                ...newState,
                validateMaxDate: this.props.validateMaxDate
            };
        }
        this.store.setState(newState);
    }

    onSelectDay = (value, colsePanel = true) => {
        const {onChange, validator} = this.props;
        const newState = {};
        if (!('value' in this.props)) {
            // 非受控
            newState.currentValue = value;
        }
        const todayDetail = getTodayDetail();
        const currentDetail = getDetailDate(value);
        this.store.setState({
            _value: value,
            showYear: value ? currentDetail.fullYear : todayDetail.fullYear,
            showMonth: value ? currentDetail.fullMonth : todayDetail.fullMonth
        });
        if (!('visible' in this.props) && colsePanel) {
            // 非受控
            newState.visible = false;
        }
        let validatorError = '';
        validatorError = (validator && typeof validator === 'function')
            ? validator(value)
            : '';
        if (!validatorError) {
            onChange(value);
            newState.errorMessage = '';
        } else {
            newState.errorMessage = validatorError;
        }
        this.setState(newState);
    }

    renderDatePickerBody = () => {
        const {prefixCls, size} = this.props;
        const visible = this.state.visible;
        const datePickerPanelClassName = classNames(prefixCls, `${prefixCls}-panel-${size}`);
        return (
            <Provider store={this.store}>
                <div className={datePickerPanelClassName}>
                    <Input {...this.props} visible={visible} onChange={this.onSelectDay}/>
                    <TitleHeader {...this.props} />
                    <DayItemRender {...this.props} onChange={this.onSelectDay}/>
                    <MonthAndYearPanel {...this.props} />
                </div>
            </Provider>
        );
    }

    onLayerVisibleChange = visible => {
        this.props.onVisibleChange(visible);
        if (!('visible' in this.props)) {
            this.setState({
                visible
            });
        }
    }

    onOpenDatePicker = e => {
        if (!('visible' in this.props)) {
            this.setState({
                visible: true
            });
        }
        const {onVisibleChange, onClickButton} = this.props;
        let formatValue;
        if ('value' in this.props) {
            formatValue = this.props.value;
        } else {
            formatValue = this.state.currentValue;
        }
        const todayDetail = getTodayDetail();
        const currentDetail = getDetailDate(formatValue);
        // 每次打开的时候，重置一下面板的type，并且保证当前value与state的value保持一致
        this.store.setState({
            panelType: 'date',
            _value: formatValue,
            showYear: formatValue ? currentDetail.fullYear : todayDetail.fullYear,
            showMonth: formatValue ? currentDetail.fullMonth : todayDetail.fullMonth
        });
        onVisibleChange(true);
        onClickButton(e);
    };

    onDetete = e => {
        e.stopPropagation();
        e.preventDefault();
        this.props.onDelete();
        if (!('value' in this.props)) {
            this.setState({
                currentValue: ''
            });
            this.store.setState({
                _value: ''
            });
        }
    }

    render() {
        const {
            prefixCls, className, disabled, getPopupContainer,
            dateFormat, popupPlacement, size, customButtonTitle,
            showDeleteIcon, buttonPrefixCls, layerPrefixCls
        } = this.props;
        const {currentValue, visible, errorMessage} = this.state;
        let formatValue;
        if ('value' in this.props) {
            formatValue = this.props.value;
        } else {
            formatValue = currentValue;
        }
        const buttonText = formatButtonText({
            value: formatValue,
            dateFormat
        });
        const text = customButtonTitle || buttonText || '请选择日期';
        const datePickerClassNames = classNames(prefixCls, className, {
            [`${prefixCls}-empty`]: !buttonText,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-showDeleteIcon`]: showDeleteIcon
        });
        const layerProps = {
            trigger: disabled ? '' : 'click',
            visible,
            onVisibleChange: this.onLayerVisibleChange,
            overlay: this.renderDatePickerBody(),
            dropdownMatchSelectWidth: false,
            getPopupContainer,
            popupPlacement,
            prefixCls: layerPrefixCls
        };
        const textClassName = classNames(`${prefixCls}-title-text`, {
            [`${prefixCls}-title-text-empty`]: !formatValue
        });
        return (
            <div className={datePickerClassNames}>
                <Layer {...layerProps}>
                    <div className={`${prefixCls}-empty-target`} />
                </Layer>
                <Button
                    className={`${prefixCls}-title`}
                    disabled={disabled}
                    size={size}
                    // icon="calendar"
                    onClick={this.onOpenDatePicker}
                    prefixCls={buttonPrefixCls}
                >
                    <span className={textClassName}>{text}</span>
                    <IconCalendar />
                    <IconTimesCircle onClick={this.onDetete}/>
                </Button>
                {
                    errorMessage ? (
                        <span className={`${prefixCls}-error-message`}>
                            {errorMessage}
                        </span>
                    ) : null
                }
            </div>
        );
    }
}

polyfill(DatePicker);

export default DatePicker;
