import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {polyfill} from 'react-lifecycles-compat';
import {IconCalendar, IconTimesCircle} from '@baidu/one-ui-icon';
import classNames from 'classnames';
import {Provider, create} from 'mini-store';
import {
    transDateFormat,
    validateData,
    formatButtonText,
    formatInitialRangeDateInfo
} from '../../core/datePickerTools';
import TitleHeader from './common/titleHeader';
import RangeRender from './common/rangeRender';
import Input from './common/input';
import Layer from '../popLayer';
import Button from '../button';
import ShortCut from './common/shortCut';
// import Message from '../message';

class RangePicker extends PureComponent {
    static propTypes = {
        // string类型为单日的时间，array类型为多日的时间戳，value[0]为起始时间，value[1]为结束时间
        defaultValue: PropTypes.array,
        value: PropTypes.array,
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
        shortcuts: PropTypes.array,
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
        shortcuts: null,
        getPopupContainer: () => document.body,
        showDeleteIcon: false,
        onDelete() {},
        layerPrefixCls: 'new-fc-one-popLayer',
        buttonPrefixCls: 'new-fc-one-btn'
    }

    constructor(props) {
        super(props);
        const {defaultValue, value, visible, defaultVisible, validateMaxDate} = props;
        const _value = defaultValue || value || [];
        const {
            beginDateYear,
            beginDateMonth,
            endDateYear,
            endDateMonth
        } = formatInitialRangeDateInfo(_value, validateMaxDate);
        this.state = {
            currentValue: _value,
            visible: defaultVisible || visible || false
        };
        this.store = create({
            _value,
            showYear: beginDateYear,
            showMonth: beginDateMonth,
            endDateShowYear: endDateYear,
            endDateShowMonth: endDateMonth,
            // 面板展示 date or month - 选择日期 or 月份
            panelType: 'date',
            endDatePanelType: 'date',
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
            const {value, validateMaxDate} = this.props;
            const {
                beginDateYear,
                beginDateMonth,
                endDateYear,
                endDateMonth
            } = formatInitialRangeDateInfo(value, validateMaxDate);
            // 控制一些组件内部属性
            newState = {
                ...newState,
                _value: value || [],
                showYear: beginDateYear,
                showMonth: beginDateMonth,
                endDateShowYear: endDateYear,
                endDateShowMonth: endDateMonth
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
        const {onChange, validateMaxDate, validator} = this.props;
        const newState = {};
        if (!('value' in this.props)) {
            // 非受控
            newState.currentValue = value;
        }
        const {
            beginDateYear,
            beginDateMonth,
            endDateYear,
            endDateMonth
        } = formatInitialRangeDateInfo(value, validateMaxDate);
        this.store.setState({
            _value: value,
            showYear: beginDateYear,
            showMonth: beginDateMonth,
            endDateShowYear: endDateYear,
            endDateShowMonth: endDateMonth
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

    renderMultipleDatePickerBody = () => {
        const {prefixCls, shortcuts, size} = this.props;
        const visible = this.state.visible;
        const datePickerContainerClassName = classNames(
            prefixCls,
            `${prefixCls}-multiple`,
            `${prefixCls}-panel-${size}`
        );
        return (
            <Provider store={this.store}>
                <div className={datePickerContainerClassName}>
                    {
                        shortcuts && shortcuts.length ? (
                            <ShortCut {...this.props} onChange={this.onSelectDay} />
                        ) : null
                    }
                    <div>
                        <Input
                            {...this.props}
                            visible={visible}
                            onChange={this.onSelectDay}
                            multiple
                        />
                        <TitleHeader {...this.props} multiple />
                        <RangeRender {...this.props} multiple onChange={this.onSelectDay} visible={visible} />
                    </div>
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
        const {onVisibleChange, onClickButton, validateMaxDate} = this.props;
        let formatValue;
        if ('value' in this.props) {
            formatValue = this.props.value;
        } else {
            formatValue = this.state.currentValue;
        }
        const {
            beginDateYear,
            beginDateMonth,
            endDateYear,
            endDateMonth
        } = formatInitialRangeDateInfo(formatValue, validateMaxDate);
        // 每次打开的时候，重置一下面板的type，并且保证当前value与state的value保持一致
        this.store.setState({
            panelType: 'date',
            endDatePanelType: 'date',
            _value: formatValue,
            showYear: beginDateYear,
            showMonth: beginDateMonth,
            endDateShowYear: endDateYear,
            endDateShowMonth: endDateMonth
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
                currentValue: []
            });
            this.store.setState({
                _value: []
            });
        }
    }

    render() {
        const {
            prefixCls,
            className,
            disabled,
            getPopupContainer,
            dateFormat,
            shortcuts,
            popupPlacement,
            size,
            customButtonTitle,
            showDeleteIcon,
            layerPrefixCls,
            buttonPrefixCls
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
        const text = customButtonTitle || buttonText || '开始日期   ~  结束日期';
        const datePickerClassNames = classNames(prefixCls, className, {
            [`${prefixCls}-empty`]: !buttonText,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-showDeleteIcon`]: showDeleteIcon
        });
        const layerProps = {
            trigger: disabled ? '' : 'click',
            visible,
            onVisibleChange: this.onLayerVisibleChange,
            overlay: this.renderMultipleDatePickerBody(),
            dropdownMatchSelectWidth: false,
            getPopupContainer,
            overlayClassName: classNames(`${prefixCls}-overlay`, {
                [`${prefixCls}-overlay-has-shortcuts`]: shortcuts && shortcuts.length
            }),
            popupPlacement,
            prefixCls: layerPrefixCls
        };
        const textClassName = classNames(`${prefixCls}-title-text`, {
            [`${prefixCls}-title-text-empty`]: !formatValue || !formatValue.length
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

polyfill(RangePicker);

export default RangePicker;
