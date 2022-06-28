import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import moment from 'moment';
import classNames from 'classnames';
import {generateOptions, toNearestValidTime, noop} from '../../core/pickTimeTools';
import TimeInput from './common/timeInput';
import TimePickerPanel from './common/timePickerPanel';
import placements from './common/placements';

export default class TimePicker extends Component {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 时间值 moment类型 */
        value: PropTypes.string,
        /** 是否只读 */
        inputReadOnly: PropTypes.bool,
        /** 是否不可用 */
        disabled: PropTypes.bool,
        /** 是否允许值为null */
        allowEmpty: PropTypes.bool,
        /** 面板展开时的默认值 */
        defaultOpenValue: PropTypes.object,
        /** 面板展开/收起状态 */
        open: PropTypes.bool,
        /** 面板对齐时的位置调整数据 */
        align: PropTypes.object,
        /** 时间选择面板位置 如bottomLeft，bottomRight，topRight，topLeft */
        placement: PropTypes.any,
        /** 定义面板的容器，默认为 body 上新建 div */
        getPopupContainer: PropTypes.func,
        /** 面板类名 */
        popupClassName: PropTypes.string,
        /** 面板样式对象 */
        popupStyle: PropTypes.object,
        /** 输入框没有值的时候显示的内容 */
        placeholder: PropTypes.string,
        /** 时间格式化，如HH:mm:ss */
        format: PropTypes.string,
        /** 是否展现小时选择 */
        showHour: PropTypes.bool,
        /** 是否展现分钟选择 */
        showMinute: PropTypes.bool,
        /** 是否展现秒钟选择 */
        showSecond: PropTypes.bool,
        /** 宽度 */
        width: PropTypes.number,
        /** 行内样式 */
        style: PropTypes.object,
        /** 最外层css类名 */
        className: PropTypes.string,
        /** 不可选的小时数，返回array类型 */
        disabledHours: PropTypes.func,
        /** 不可选的分钟数，返回array类型 */
        disabledMinutes: PropTypes.func,
        /** 不可选的秒钟数，返回array类型 */
        disabledSeconds: PropTypes.func,
        /** 是否隐藏不可选的项 */
        hideDisabledOptions: PropTypes.bool,
        /** value更改回调函数 */
        onChange: PropTypes.func,
        /** am、pm格式的value更改回调函数 */
        onAmPmChange: PropTypes.func,
        /** 面板展开状态回调函数 */
        onOpen: PropTypes.func,
        /** 面板收起状态回调函数 */
        onClose: PropTypes.func,
        /** 输入框获得焦点回调函数 */
        onFocus: PropTypes.func,
        /** 输入框失去焦点回调函数 */
        onBlur: PropTypes.func,
        /** 按键事件回调函数 */
        onKeyDown: PropTypes.func,
        /** 鼠标滑入事件回调函数 */
        onMouseEnter: PropTypes.func,
        /** 鼠标滑出事件回调函数 */
        onMouseLeave: PropTypes.func,
        /** 表单name值 */
        name: PropTypes.string,
        /** 是否采用12小时制 format 默认为 h:mm:ss a */
        use12Hours: PropTypes.bool,
        /** 小时选择列选项间隔 */
        hourStep: PropTypes.number,
        /** 分钟选择列选项间隔 */
        minuteStep: PropTypes.number,
        /** 秒钟选择列选项间隔 */
        secondStep: PropTypes.number,
        /** 错误信息 */
        errorMessage: PropTypes.string,
        /** 错误信息展现位置， bottom/right */
        errorLocation: PropTypes.string,
        /** 尺寸 small/medium */
        size: PropTypes.oneOf(['small', 'medium'])
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-time-picker',
        inputReadOnly: false,
        style: {},
        className: '',
        popupClassName: '',
        popupStyle: {},
        align: {},
        defaultOpenValue: moment(),
        format: 'HH:mm:ss',
        allowEmpty: true,
        showHour: true,
        showMinute: true,
        showSecond: true,
        disabledHours: noop,
        disabledMinutes: noop,
        disabledSeconds: noop,
        hideDisabledOptions: false,
        placement: 'bottomLeft',
        onChange: noop,
        onAmPmChange: noop,
        onOpen: noop,
        onClose: noop,
        onFocus: noop,
        onBlur: noop,
        onMouseEnter: noop,
        onMouseLeave: noop,
        onKeyDown: noop,
        use12Hours: false,
        errorMessage: '',
        errorLocation: 'bottom',
        size: 'small',
        width: 150
    };

    constructor(props) {
        super(props);
        const {open, value} = props;
        this.momentValue = value => {
            return value ? moment(value, this.getFormat(), true) : null;
        };
        this.state = {
            open,
            value: this.momentValue(value)
        };
    }

    state = {
        dropdownWidth: null
    }

    componentDidMount() {
        this.setDropdownWidth();
    }

    componentDidUpdate() {
        this.setDropdownWidth();
    }

    componentWillReceiveProps(nextProps) {
        const {value, open} = nextProps;
        if ('value' in nextProps) {
            this.setState({
                value: this.momentValue(value)
            });
        }
        if (open !== undefined) {
            this.setState({open});
        }
    }

    setDropdownWidth = () => {
        const width = ReactDOM.findDOMNode(this.timePickerTargetRef).offsetWidth;
        if (width !== this.state.dropdownWidth) {
            this.setState({dropdownWidth: width});
        }
    }

    saveRef = ref => {
        this.timePickerTargetRef = ref;
    }

    onPanelChange = value => {
        this.setValue(value);
    };

    onAmPmChange = ampm => {
        this.props.onAmPmChange(ampm);
    };

    onClear = event => {
        event.stopPropagation();
        this.setValue(null);
        this.setOpen(false);
    };

    onVisibleChange = open => {
        this.setOpen(open);
    };

    onEsc = () => {
        this.setOpen(false);
    };

    onKeyDown = e => {
        if (e.keyCode === 40) {
            this.setOpen(true);
        }
        this.props.onKeyDown(e);
    };

    onFocus = () => {
        this.props.onFocus();
    }

    onBlur = () => {
        this.props.onBlur();
    }

    getPlaceHolder = () => {
        const {placeholder, showHour, showMinute, showSecond} = this.props;
        if ('placeholder' in this.props) {
            return placeholder;
        }
        return [showHour ? '小时' : '', showMinute ? '分钟' : '', showSecond ? '秒钟' : '']
            .filter(item => !!item)
            .join(':');
    }

    getFormat = () => {
        const {format, showHour, showMinute, showSecond, use12Hours} = this.props;
        if (format) {
            return format;
        }

        if (use12Hours) {
            const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
                .filter(item => !!item)
                .join(':');

            return fmtString.concat(' a');
        }

        return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
            .filter(item => !!item)
            .join(':');
    }

    setValue = value => {
        if (!('value' in this.props)) {
            this.setState({
                value
            });
        }
        let formatValue = value;
        if (value && typeof value === 'object' && value.format) {
            formatValue = value.format(this.getFormat());
        }
        this.props.onChange(formatValue);
    }

    setOpen = open => {
        const {onOpen, onClose} = this.props;
        const {open: currentOpen} = this.state;
        if (currentOpen !== open) {
            if (!('open' in this.props)) {
                this.setState({open});
            }
            if (open) {
                onOpen({open});
            } else {
                onClose({open});
            }
        }
    }

    getPopupClassName = () => {
        const {showHour, showMinute, showSecond, use12Hours, prefixCls, popupClassName} = this.props;
        let className = popupClassName;
        // Keep it for old compatibility
        if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
            className += ` ${prefixCls}-panel-narrow`;
        }
        let selectColumnCount = 0;
        if (showHour) {
            selectColumnCount += 1;
        }
        if (showMinute) {
            selectColumnCount += 1;
        }
        if (showSecond) {
            selectColumnCount += 1;
        }
        if (use12Hours) {
            selectColumnCount += 1;
        }
        className += ` ${prefixCls}-panel-column-${selectColumnCount}`;
        return className;
    }

    getOptions = () => {
        const {
            disabledMinutes,
            disabledSeconds,
            hideDisabledOptions,
            hourStep,
            minuteStep,
            secondStep
        } = this.props;
        const value = this.state.value;
        const disabledHourOptions = this.disabledHours();
        const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null);
        const disabledSecondOptions = disabledSeconds(
            value ? value.hour() : null,
            value ? value.minute() : null,
        );
        const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions, hourStep);
        const minuteOptions = generateOptions(
            60,
            disabledMinuteOptions,
            hideDisabledOptions,
            minuteStep,
        );
        const secondOptions = generateOptions(
            60,
            disabledSecondOptions,
            hideDisabledOptions,
            secondStep,
        );
        return {hourOptions, minuteOptions, secondOptions};
    }

    getPanelElement = () => {
        const {
            prefixCls,
            disabledMinutes,
            disabledSeconds,
            hideDisabledOptions,
            showHour,
            showMinute,
            showSecond,
            defaultOpenValue,
            use12Hours,
            size
        } = this.props;
        const value = this.state.value;
        const {hourOptions, minuteOptions, secondOptions} = this.getOptions();
        return (
            <TimePickerPanel
                prefixCls={`${prefixCls}-panel`}
                ref={ref => {
                    this.panelInstance = ref;
                }}
                className={`${prefixCls}-panel-${size}`}
                value={value}
                onChange={this.onPanelChange}
                onAmPmChange={this.onAmPmChange}
                defaultOpenValue={defaultOpenValue}
                showHour={showHour}
                showMinute={showMinute}
                showSecond={showSecond}
                onEsc={this.onEsc}
                format={this.getFormat()}
                disabledHours={this.disabledHours}
                disabledMinutes={disabledMinutes}
                disabledSeconds={disabledSeconds}
                hideDisabledOptions={hideDisabledOptions}
                use12Hours={use12Hours}
                toNearestValidTime={toNearestValidTime}
                hourOptions={hourOptions}
                minuteOptions={minuteOptions}
                secondOptions={secondOptions}
                isAM={this.isAM()}
            />
        );
    }

    disabledHours = () => {
        const {use12Hours, disabledHours} = this.props;
        let disabledOptions = disabledHours();
        if (use12Hours && Array.isArray(disabledOptions)) {
            if (this.isAM()) {
                disabledOptions = disabledOptions.filter(h => h < 12).map(h => (h === 0 ? 12 : h));
            } else {
                disabledOptions = disabledOptions.map(h => (h === 12 ? 12 : h - 12));
            }
        }
        return disabledOptions;
    };

    isAM() {
        const defaultOpenValue = this.props.defaultOpenValue;
        const value = this.state.value;
        const realValue = value || defaultOpenValue;
        return realValue.hour() >= 0 && realValue.hour() < 12;
    }

    render() {
        const {
            prefixCls,
            placement,
            align,
            disabled,
            style,
            className,
            getPopupContainer,
            name,
            inputReadOnly,
            popupStyle,
            defaultOpenValue,
            disabledMinutes,
            disabledSeconds,
            allowEmpty,
            errorMessage,
            errorLocation,
            size,
            width
        } = this.props;
        const {open, value} = this.state;
        const popupClassName = this.getPopupClassName();

        const {hourOptions, minuteOptions, secondOptions} = this.getOptions();
        const validDefaultOpenValue = toNearestValidTime(
            defaultOpenValue,
            hourOptions,
            minuteOptions,
            secondOptions,
        );
        const errorClass = `${prefixCls}-error`;
        const errorProps = {
            className: classNames(
                errorClass,
                `${errorClass}-${errorLocation}`
            )
        };
        const timePickerClassName = classNames(prefixCls, className, `${prefixCls}-${size}`);
        const timePickerStyle = {
            ...popupStyle
        };
        const dropdownWidth = this.state.dropdownWidth;
        if (dropdownWidth) {
            timePickerStyle.width = `${dropdownWidth}px`;
        }

        const timePickerElement = (
            <span
                className={timePickerClassName}
            >
                <Trigger
                    prefixCls={`${prefixCls}-panel`}
                    popupClassName={popupClassName}
                    popupStyle={timePickerStyle}
                    popup={this.getPanelElement()}
                    popupAlign={align}
                    builtinPlacements={placements}
                    popupPlacement={placement}
                    action={disabled ? [] : ['click']}
                    destroyPopupOnHide
                    getPopupContainer={getPopupContainer}
                    popupVisible={open}
                    onPopupVisibleChange={this.onVisibleChange}
                >
                    <span className={`${prefixCls}-input-container`} ref={this.saveRef}>
                        <TimeInput
                            style={style}
                            prefixCls={prefixCls}
                            defaultOpenValue={validDefaultOpenValue}
                            value={value}
                            onEsc={this.onEsc}
                            format={this.getFormat()}
                            placeholder={this.getPlaceHolder()}
                            hourOptions={hourOptions}
                            minuteOptions={minuteOptions}
                            secondOptions={secondOptions}
                            disabledHours={this.disabledHours}
                            disabledMinutes={disabledMinutes}
                            disabledSeconds={disabledSeconds}
                            onChange={this.onPanelChange}
                            allowEmpty={allowEmpty}
                            onKeyDown={this.onKeyDown}
                            inputReadOnly={inputReadOnly}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            disabled={disabled}
                            name={name}
                            onClear={this.onClear}
                            errorMessage={errorMessage}
                            size={size}
                            width={width}
                        />
                    </span>
                </Trigger>
                {errorMessage ? <div {...errorProps}>{errorMessage}</div> : null}
            </span>
        );
        return timePickerElement;
    }
}
