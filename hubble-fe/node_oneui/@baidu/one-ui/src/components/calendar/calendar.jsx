import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import {polyfill} from 'react-lifecycles-compat';
import tools from '../../core';
import Layer from '../popLayer';
import Button from '../button';
import Icon from '../icon';
import DateInput from './common/dateInput';
import CalendarHeader from './common/calendarHeader';
import CalendarBody from './common/calendarBody';
import CalendarTime from './common/calendarTime';
import CalendarSwitch from './common/calendarSwitch';

const {
    getDateCompareObj,
    formatSelectTime,
    getDetailDate,
    validateData,
    getTimeBySwitchStr,
    formatHours,
    validateTime,
    formatTimeByRule,
    formatTwoDateInOrder,
    getTimeStamp,
    transDateFormat,
    transObjDateFormat
} = tools.calendar;

const {
    addZero
} = tools.pickTime;

const formatInitCompareSwitch = props => {
    if (props.selectMode !== 'compare') {
        return false;
    }
    return props.openCompareSwitch && props.showCompareSwitch;
};

class Calendar extends Component {
    static propTypes = {
        /** 类名前缀 */
        prefixCls: PropTypes.string,
        /** 默认开始时间， canSelectTime为true的时候，可以传入时分秒作为初始值, 时间格式为YYYY/HH/mm */
        defaultBeginDate: PropTypes.string,
        /** 默认结束时间，selectMode 为multiple的时候，可以选择一段时间，该字段为一段时间的结束时间, 时间格式为YYYY/HH/mm */
        defaultEndDate: PropTypes.string,
        /** 默认对比开始时间 selectMode 为compare时候，可选, 时间格式为YYYY/HH/mm */
        defaultCompareBeginDate: PropTypes.string,
        /** 默认结束对比时间 selectMode 为compare时候，可选, 时间格式为YYYY/HH/mm */
        defaultCompareEndDate: PropTypes.string,
        /** 开始时间，canSelectTime为true的时候，可以传入时分秒作为初始值, 时间格式为YYYY/HH/mm */
        beginDate: PropTypes.string,
        /** 结束时间 时间格式为YYYY/HH/mm */
        endDate: PropTypes.string,
        /** 对比开始时间 */
        compareBeginDate: PropTypes.string,
        /** 对比结束时间 */
        compareEndDate: PropTypes.string,
        /** 弹窗是否可视 */
        visible: PropTypes.bool,
        /** 弹窗关闭/打开时的函数，传出visible */
        onVisibleChange: PropTypes.func,
        /** 选中日期的时候的回调函数, 如果有确定按钮的话，改方法失效 */
        onSelectDay: PropTypes.func,
        /** select mode (single, multiple, compare) 单选，跨选, 比较模式，默认单选 */
        selectMode: PropTypes.string,
        /** 是否能选择未来, 默认能选择未来 */
        canSelectFuture: PropTypes.bool,
        /** 是否可以选择时间，只在selectMode为single下可设置为true */
        canSelectTime: PropTypes.bool,
        /** onConfirm 确定按钮的回调函数，只有有确定按钮的时候才有作用 */
        onConfirm: PropTypes.func,
        /** onCancel  取消按钮的回调函数，只有有取消按钮的时候才有作用 */
        onCancel: PropTypes.func,
        /** showCompareSwitch 是否展示比较开关, 默认展示 */
        showCompareSwitch: PropTypes.bool,
        /** openCompareSwitch 是否展开比较开关，默认展示 */
        openCompareSwitch: PropTypes.bool,
        /** 快捷选择日期 配置项
         * 注释：['今日'，'昨日'，'最近7天'，'最近14天‘，'最近30天'，'上周'，'本月'，'上个月']
         * 类型：['today', 'yesterday', 'lastSevenDays', 'lastFourteenDays', 'lastThirtyDays', 'lastWeek', 'currentMonth', 'lastMonth']
         * */
        dateList: PropTypes.array,
        /**
         * 快捷选择 环比 对比日期 配置项
         * 注释：['今天/昨天'，'本周/上周'，'本月/上月']
         * 类型：['compareYesterday', 'compareLastWeek', 'compareLastMonth']
         */
        overRollDateList: PropTypes.array,
        /**
         * 快捷选择 同比 对比日期 配置项
         * 注释：['上一年今日'，'上一年本周'，'上一年本月']
         * 类型：['compareYesterday', 'compareLastWeek', 'compareLastMonth']
         */
        sameOverRollDateList: PropTypes.array,
        /** selectMode 为compare时候，选择左侧快捷操作时的回调函数 */
        onChooseDateItem: PropTypes.func,
        /** time展示规则, 当 canSelectTime 为true的时候起作用，目前只支持三种展示方案，时分秒、时分、时，赋值，1-时分秒，2-时分，3-时 */
        timeRules: PropTypes.number,
        /** 自定义类名 */
        className: PropTypes.string,
        /** 支持传入默认开始时间 */
        validateMinDate: PropTypes.string,
        /** 支持传入默认结束时间 */
        validateMaxDate: PropTypes.string,
        /** 可支持自定义校验, onSelectDay 和 onConfirm的时候会进行校验 */
        rangeValidator: PropTypes.func,
        /** onChooseSwitch 点击开关以后的回调 */
        onChooseSwitch: PropTypes.func,
        /** 弹层挂载的位置的方法, 默认挂载在body上, 参数弹窗的node */
        getPopupContainer: PropTypes.func,
        /** disabled 日历是否处于禁用 */
        disabled: PropTypes.bool,
        /** 按钮的尺寸 */
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        /** 兼容onSelectDay 和 onConfirm 在表单中的使用 */
        onChange: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'new-fc-one-calendar',
        selectMode: 'single',
        canSelectFuture: true,
        canSelectTime: false,
        showCompareSwitch: true,
        openCompareSwitch: true,
        timeRules: 1,
        onSelectDay() {},
        onVisibleChange() {},
        onConfirm() {},
        onCancel() {},
        onChooseDateItem() {},
        className: '',
        disabled: false,
        size: 'small',
        onChange() {}
    }

    constructor(props) {
        super(props);
        const isMultipleMode = props.selectMode === 'multiple';
        const isCompareMode = props.selectMode === 'compare';
        const canSelectTime = props.canSelectTime;
        const timeRules = props.timeRules;
        // const compareSwitch = props.openCompareSwitch && props.showCompareSwitch;
        const compareSwitch = formatInitCompareSwitch(props);
        const initialBeginTime = props.defaultBeginDate || props.beginDate;
        const beginTime = initialBeginTime ? transDateFormat(initialBeginTime) : '';
        const initialEndTime = props.defaultEndDate || props.endDate;
        const endTime = transDateFormat(initialEndTime);
        const initialCompareBeginTime = props.defaultCompareBeginDate || props.compareBeginDate;
        const compareBeginTime = transDateFormat(initialCompareBeginTime);
        const initialCompareEndTime = props.defaultCompareEndDate || props.compareEndDate;
        const compareEndTime = transDateFormat(initialCompareEndTime);
        this.state = {
            beginTime,
            endTime: ((isMultipleMode || isCompareMode) && endTime) || '',
            compareBeginTime: (isCompareMode && compareBeginTime) || '',
            compareEndTime: (isCompareMode && compareEndTime) || '',
            visible: props.visible,
            // 三种类型 month 展示月份面板 date 展现日期面板 time 展现选时间面板
            mode: 'date',
            selectTime: formatSelectTime({
                beginTime,
                endTime,
                compareBeginTime: compareSwitch && compareBeginTime,
                compareEndTime: compareSwitch && compareEndTime,
                selectMode: props.selectMode,
                compareSwitch
            }),
            validateMinDate: transDateFormat(props.validateMinDate) || validateData().validateMinDate,
            validateMaxDate: transDateFormat(props.validateMaxDate) || validateData().validateMaxDate,
            // 内置state, 非单选模式或者单选带时间模式时候可以用
            _beginTime: beginTime,
            _endTime: (isMultipleMode || isCompareMode) && endTime,
            _compareBeginTime: isCompareMode && compareBeginTime,
            _compareEndTime: isCompareMode && compareEndTime,
            // 控制外部按钮比较信息展示
            compareSwitch,
            // 内部比较信息
            _compareSwitch: compareSwitch,
            // 报错信息
            errorMsg: '',
            timeObj: canSelectTime ? formatHours({time: beginTime, timeRules}) : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
        if ('openCompareSwitch' in nextProps && nextProps.openCompareSwitch !== this.props.openCompareSwitch) {
            this.setState({
                compareSwitch: nextProps.openCompareSwitch,
                _compareSwitch: nextProps.openCompareSwitch
            });
        }
        const {selectMode, timeRules, canSelectTime} = this.props;
        const {beginTime, endTime, compareBeginTime, compareEndTime, compareSwitch} = this.state;
        if ('beginDate' in nextProps && nextProps.beginDate !== this.props.beginDate) {
            const formatBeginTime = transDateFormat(nextProps.beginDate);
            const newState = {
                beginTime: formatBeginTime,
                _beginTime: formatBeginTime,
                selectTime: formatSelectTime({
                    beginTime: formatBeginTime,
                    endTime,
                    compareBeginTime,
                    compareEndTime,
                    selectMode,
                    compareSwitch
                })
            };
            if (canSelectTime) {
                newState.timeObj = formatHours({
                    time: formatBeginTime,
                    timeRules
                });
            }
            this.setState(newState);
        }
        if ('endDate' in nextProps && nextProps.endDate !== this.props.endDate) {
            const formatEndTime = transDateFormat(nextProps.endDate);
            this.setState({
                endTime: formatEndTime,
                _endTime: formatEndTime,
                selectTime: formatSelectTime({
                    beginTime,
                    endTime: formatEndTime,
                    compareBeginTime,
                    compareEndTime,
                    selectMode,
                    compareSwitch
                })
            });
        }
        if ('compareBeginDate' in nextProps && nextProps.compareBeginDate !== this.props.compareBeginDate) {
            const formatCompareBeginTime = transDateFormat(nextProps.compareBeginDate);
            this.setState({
                compareBeginTime: formatCompareBeginTime,
                _compareBeginTime: formatCompareBeginTime,
                selectTime: formatSelectTime({
                    beginTime,
                    endTime,
                    compareBeginTime: formatCompareBeginTime,
                    compareEndTime,
                    selectMode,
                    compareSwitch
                })
            });
        }
        if ('compareEndDate' in nextProps && nextProps.compareEndDate !== this.props.compareEndDate) {
            const formatCompareEndTime = transDateFormat(nextProps.compareEndDate);
            this.setState({
                compareEndTime: formatCompareEndTime,
                _compareEndTime: formatCompareEndTime,
                selectTime: formatSelectTime({
                    beginTime,
                    endTime,
                    compareBeginTime,
                    compareEndTime: formatCompareEndTime,
                    selectMode,
                    compareSwitch
                })
            });
        }

        if ('validateMinDate' in nextProps && nextProps.validateMinDate !== this.props.validateMinDate) {
            this.setState({
                validateMinDate: transDateFormat(nextProps.validateMinDate)
            });
        }

        if ('validateMaxDate' in nextProps && nextProps.validateMaxDate !== this.props.validateMaxDate) {
            this.setState({
                validateMaxDate: transDateFormat(nextProps.validateMaxDate)
            });
        }
    }

    onChangeTitle = mode => {
        this.setState({
            mode
        });
    }

    onChangePage = params => {
        const {
            currentMonth,
            currentYear
        } = params;
        this.setState({
            selectTime: {
                year: currentYear,
                month: currentMonth
            }
        });
        this.scrollToPosition({currentYear, currentMonth});
    }

    onLayerVisibleChange = visible => {
        const {
            onVisibleChange,
            selectMode,
            showCompareSwitch,
            canSelectTime,
            timeRules,
            beginDate,
            endDate,
            compareBeginDate,
            compareEndDate
        } = this.props;
        const {beginTime, endTime, compareBeginTime, compareEndTime, compareSwitch} = this.state;
        if (onVisibleChange) {
            onVisibleChange(visible);
        }
        if (!('visible' in this.props)) {
            this.setState({
                visible
            });
        }
        if (visible) {
            // 新打开弹层的时候，都要初始化一下一些值
            const formatBeginTime = transDateFormat(beginDate || beginTime);
            const initBeginTime = formatBeginTime || '';
            const initbeginDate = (initBeginTime && initBeginTime.split(' ')[0]) || '';
            const selectTime = formatSelectTime({
                beginTime: initbeginDate,
                endTime,
                compareBeginTime,
                compareEndTime,
                selectMode,
                compareSwitch
            });
            const timeObj = canSelectTime ? formatHours({time: initBeginTime, timeRules}) : {};
            this.setState({
                selectTime,
                _beginTime: initbeginDate,
                _endTime: transDateFormat(endDate || endTime),
                _compareBeginTime: transDateFormat(compareBeginDate || compareBeginTime),
                _compareEndTime: transDateFormat(compareEndDate || compareEndTime),
                mode: 'date',
                compareSwitch: showCompareSwitch && compareSwitch,
                _compareSwitch: showCompareSwitch && compareSwitch,
                errorMsg: '',
                timeObj
            });
        }
    }

    onFinishInput = obj => {
        const {value, type} = obj;
        const {canSelectTime, selectMode} = this.props;
        const {_beginTime, _endTime, _compareEndTime, _compareBeginTime, _compareSwitch} = this.state;
        const newState = {errorMsg: ''};
        let scrollDate = '';
        if (selectMode === 'single') {
            scrollDate = value;
            if (canSelectTime) {
                newState._beginTime = (_beginTime && _beginTime.split(' ')[1]) ? `${value} ${_beginTime.split(' ')[1]}` : value;
            } else {
                newState.beginTime = value;
                this.onSelectDayValide({
                    beginTime: value,
                    endTime: ''
                });
                if (!('visible' in this.props)) {
                    newState.visible = false;
                }
            }
        } else if (selectMode === 'multiple') {
            if (type === 'beginTime') {
                newState._beginTime = value;
                if (_endTime && (getTimeStamp(value) > getTimeStamp(_endTime))) {
                    // 输入的起始日期大于结束日期的话，结束日期变为起始日期
                    newState._endTime = value;
                }
                scrollDate = value;
            } else if (type === 'endTime') {
                // 先要比较一下，起始时间是否大于开始时间
                const {minDate, maxDate} = formatTwoDateInOrder({
                    minDate: _beginTime,
                    maxDate: value
                });
                newState.beginTime = minDate;
                newState.endTime = maxDate;
                newState._endTime = maxDate;
                scrollDate = maxDate;
                this.onSelectDayValide({
                    beginTime: minDate,
                    endTime: maxDate
                });
                if (!('visible' in this.props)) {
                    newState.visible = false;
                }
            }
        } else if (selectMode === 'compare') {
            if (type === 'compareBeginTime') {
                newState._compareBeginTime = value;
                if (getTimeStamp(value) > getTimeStamp(_compareEndTime)) {
                    // 输入的起始日期大于结束日期的话，结束日期变为起始日期
                    newState._compareEndTime = value;
                }
                scrollDate = value;
            } else if (type === 'beginTime') {
                newState._beginTime = value;
                if (getTimeStamp(value) > getTimeStamp(_endTime)) {
                    // 输入的起始日期大于结束日期的话，结束日期变为起始日期
                    newState._endTime = value;
                }
                scrollDate = value;
            } else if (type === 'compareEndTime') {
                // 先要比较一下，起始时间是否大于开始时间
                const {minDate, maxDate} = formatTwoDateInOrder({
                    minDate: _compareBeginTime,
                    maxDate: value
                });
                newState._compareBeginTime = minDate;
                newState._compareEndTime = maxDate;
                scrollDate = _compareSwitch ? formatTwoDateInOrder({minDate: _endTime, maxDate}).maxDate : maxDate;
            } else if (type === 'endTime') {
                // 先要比较一下，起始时间是否大于开始时间，如果用户输入的起始日期大于结束日期，位置对调
                const {minDate, maxDate} = formatTwoDateInOrder({
                    minDate: _beginTime,
                    maxDate: value
                });
                newState._beginTime = minDate;
                newState._endTime = maxDate;
                scrollDate = _compareSwitch ? formatTwoDateInOrder({minDate: _compareEndTime, maxDate}).maxDate : maxDate;
            }
        }
        // 搜索结束后，如月份面板滚动联动
        const {fullYear, fullMonth} = getDetailDate(scrollDate);
        newState.selectTime = {
            year: fullYear,
            month: fullMonth
        };
        this.initMonthDate(`${fullYear}/${fullMonth}/1`);
        setTimeout(() => {
            this.scrollToPosition({currentYear: fullYear, currentMonth: fullMonth});
        }, 250);
        this.setState(newState);
    }

    onSelectMonth = params => {
        const {year, month} = params;
        this.setState({
            mode: 'date',
            selectTime: {
                year,
                month
            }
        });
        this.initMonthDate(`${year}/${month}/1`);
        setTimeout(() => {
            this.scrollToPosition({currentYear: year, currentMonth: month});
        }, 250);
    }

    onSelectDayValide = ({beginTime, endTime}) => {
        const {rangeValidator, onSelectDay, onChange} = this.props;
        const date = transObjDateFormat({beginTime, endTime});
        if (rangeValidator) {
            const validateStr = rangeValidator({
                beginTime,
                endTime
            });
            if (validateStr) {
                this.setState({
                    errorMsg: validateStr
                });
                return;
            }
            onSelectDay(date);
            onChange(date);
        }
        onSelectDay(date);
        onChange(date);
    }

    onSelectDay = params => {
        const {canSelectTime, selectMode} = this.props;
        const {beginTime, endTime, compareBeginTime, compareEndTime, step} = params;
        const isFirstStep = step === 0;
        const isLastStep = step === 1;
        // const _compareSwitch = this.state._compareSwitch;
        if ((selectMode === 'single' && !canSelectTime) || (selectMode === 'multiple' && isFirstStep)) {
            this.onSelectDayValide(params);
        }
        const newState = {
            errorMsg: ''
        };
        newState._beginTime = beginTime;
        newState._endTime = endTime;
        newState._compareBeginTime = compareBeginTime;
        newState._compareEndTime = compareEndTime;
        if (selectMode === 'single' && !canSelectTime) {
            newState.beginTime = beginTime;
            if (!('visible' in this.props)) {
                newState.visible = false;
            }
        } else if (selectMode === 'multiple') {
            if (isLastStep) {
                newState._beginTime = beginTime;
                newState._endTime = '';
            } else if (isFirstStep) {
                newState.beginTime = beginTime;
                newState.endTime = endTime;
                if (!('visible' in this.props)) {
                    newState.visible = false;
                }
            }
        }
        this.setState(newState);
    }

    onSelectTime = timeObj => {
        this.setState({
            errorMsg: '',
            timeObj
        });
    }

    onScrollChange = ({year, month}) => {
        const selectTime = this.state.selectTime;
        if (year !== selectTime.year || month !== selectTime.month) {
            this.setState({
                selectTime: {
                    year,
                    month
                }
            });
        }
    }

    onConfirm = () => {
        const {
            _beginTime,
            _endTime,
            _compareBeginTime,
            _compareEndTime,
            _compareSwitch,
            timeObj
        } = this.state;
        const {selectMode, canSelectTime, timeRules, rangeValidator, onChange, onConfirm} = this.props;
        const beginTime = canSelectTime ? _beginTime && _beginTime.split(' ')[0] : _beginTime;
        const beginTimeValid = dayjs(dayjs(addZero(beginTime, '/')).format('YYYY/MM/DD')).isValid();
        const endTimeValid = dayjs(dayjs(addZero(_endTime, '/')).format('YYYY/MM/DD')).isValid();
        const compareBeginTimeValid = dayjs(dayjs(addZero(_compareBeginTime, '/')).format('YYYY/MM/DD')).isValid();
        const compareEndTimeValid = dayjs(dayjs(addZero(_compareEndTime, '/')).format('YYYY/MM/DD')).isValid();

        if (selectMode === 'single' && (!beginTimeValid || (canSelectTime && !validateTime(`${timeObj.hour}:${timeObj.minute}:${timeObj.second}`)))) {
            this.setState({
                errorMsg: '请输入正确日期'
            });
            return;
        }
        if (selectMode === 'multiple' && (!beginTimeValid || !endTimeValid)) {
            this.setState({
                errorMsg: '请输入一段比较日期'
            });
            return;
        }
        if (selectMode === 'compare') {
            if (_compareSwitch && (!beginTimeValid || !endTimeValid || !compareBeginTimeValid || !compareEndTimeValid)) {
                this.setState({
                    errorMsg: '请输入两段比较日期'
                });
                return;
            }
            if (!_compareSwitch && (!beginTimeValid || !endTimeValid)) {
                this.setState({
                    errorMsg: '请输入一段比较日期'
                });
                return;
            }
        }
        // 校验外部规则
        if (rangeValidator) {
            const validateDateStr = rangeValidator(transObjDateFormat({
                compareSwitch: _compareSwitch,
                beginTime: _beginTime,
                endTime: _endTime,
                compareBeginTime: _compareBeginTime,
                compareEndTime: _compareEndTime,
                canSelectTime
            }));
            if (validateDateStr) {
                this.setState({
                    errorMsg: validateDateStr
                });
                return;
            }
        }
        const currentTime = formatTimeByRule(timeObj, timeRules);
        const newState = {
            beginTime: canSelectTime
                ? `${_beginTime.split(' ')[0]} ${currentTime}`
                : _beginTime,
            endTime: _endTime,
            compareBeginTime: _compareBeginTime,
            compareEndTime: _compareEndTime,
            compareSwitch: _compareSwitch,
            mode: 'date'
        };
        if (!('visible' in this.props)) {
            newState.visible = false;
        }
        this.setState(newState);
        const date = transObjDateFormat({
            ...newState,
            canSelectTime
        });
        if (onConfirm) {
            onConfirm(date);
        }
        onChange(date);
    }

    onCancel = () => {
        const {beginTime, endTime, compareBeginTime, compareEndTime} = this.state;
        const newState = {
            _beginTime: beginTime,
            _endTime: endTime,
            _compareBeginTime: compareBeginTime,
            _compareEndTime: compareEndTime,
            mode: 'date',
            errorMsg: ''
        };
        if (!('visible' in this.props)) {
            newState.visible = false;
        }
        this.setState(newState);
        const onCancel = this.props.onCancel;
        if (onCancel) {
            onCancel();
        }
    }

    onChangeSwitch = checked => {
        const onChooseSwitch = this.props.onChooseSwitch;
        // 每次开关变化的时候，都应该要清掉比较时间
        this.setState({
            _compareSwitch: checked,
            _compareBeginTime: '',
            _compareEndTime: ''
        });
        if (onChooseSwitch) {
            onChooseSwitch(checked);
        }
    }

    onChooseSwitchItem = value => {
        const canSelectFuture = this.props.canSelectFuture;
        const {_compareSwitch, validateMaxDate, validateMinDate} = this.state;
        const {
            beginTime,
            endTime,
            compareBeginTime,
            compareEndTime
        } = getTimeBySwitchStr({value, canSelectFuture, validateMaxDate, validateMinDate});
        // 关闭弹窗，映射外部变化
        const newState = {
            beginTime,
            endTime,
            compareBeginTime,
            compareEndTime,
            _beginTime: beginTime,
            _endTime: endTime,
            _compareBeginTime: compareBeginTime,
            _compareEndTime: compareEndTime,
            compareIndex: value,
            compareSwitch: _compareSwitch
        };
        const onChooseDateItem = this.props.onChooseDateItem;
        if (onChooseDateItem) {
            onChooseDateItem(transObjDateFormat({
                beginTime,
                endTime,
                compareBeginTime,
                compareEndTime,
                compareSwitch: _compareSwitch,
                compareIndex: value
            }));
        }
        if (!('visible' in this.props)) {
            newState.visible = false;
        }
        this.setState(newState);
    }

    getCalendarBodayRef = ref => {
        this.calendarBodyRef = ref;
    }

    scrollToPosition = ({currentMonth, currentYear}) => {
        const scrollFunc = this.calendarBodyRef
            && this.calendarBodyRef.bodyRef
            && this.calendarBodyRef.bodyRef.scrollToPosition;
        if (typeof scrollFunc === 'function') {
            scrollFunc({
                beginTime: `${currentYear}/${currentMonth}/1`,
                list: this.calendarBodyRef.bodyRef.state.list
            });
        }
    }

    initMonthDate = currentDate => {
        const initDateMonthDays = this.calendarBodyRef
            && this.calendarBodyRef.bodyRef
            && this.calendarBodyRef.bodyRef.initDateMonthDays;
        if (typeof initDateMonthDays === 'function') {
            initDateMonthDays(currentDate);
        }
    }

    selectTimeMode = e => {
        const mode = e.target.dataset.mode === 'time' ? 'date' : 'time';
        this.setState({
            mode
        });

    }

    renderDateInput = () => {
        // 输入的日期不能小于开始时间的十年之前，不能大于当前时间的十年之后
        const {
            beginTime,
            validateMaxDate,
            validateMinDate,
            _beginTime,
            _endTime
        } = this.state;
        const {canSelectTime, selectMode, prefixCls, canSelectFuture} = this.props;
        const inputProps = {
            date: (canSelectTime || selectMode === 'multiple') ? _beginTime : beginTime,
            onFinishInput: this.onFinishInput,
            validateMinDate,
            validateMaxDate,
            dateType: 'beginTime',
            canSelectFuture
        };
        const inputEndDateProps = {
            date: _endTime,
            onFinishInput: this.onFinishInput,
            validateMinDate,
            validateMaxDate,
            dateType: 'endTime',
            canSelectFuture
        };
        return selectMode === 'multiple'
            ? (
                <div>
                    <DateInput {...inputProps} />
                    <span className={`${prefixCls}-seperate`}>
                        -
                    </span>
                    <DateInput {...inputEndDateProps} />
                </div>
            ) : <DateInput {...inputProps} />;
    }

    renderCompareDateInput = () => {
        const {prefixCls, canSelectFuture} = this.props;
        const {
            _beginTime,
            _endTime,
            _compareBeginTime,
            _compareEndTime,
            _compareSwitch,
            validateMinDate,
            validateMaxDate
        } = this.state;
        const inputProps = {
            onFinishInput: this.onFinishInput,
            validateMinDate,
            validateMaxDate,
            canSelectFuture
        };
        const elm = (
            <div>
                <div className={`${prefixCls}-line`}>
                    <DateInput
                        {...inputProps}
                        date={_beginTime}
                        dateType="beginTime"
                    />
                    <span className={`${prefixCls}-seperate`}>
                        -
                    </span>
                    <DateInput
                        {...inputProps}
                        date={_endTime}
                        dateType="endTime"
                    />
                </div>
                {
                    _compareSwitch ? (
                        <div className={`${prefixCls}-line-text`}>
                            比较
                        </div>
                    ) : null
                }
                {
                    _compareSwitch ? (
                        <div className={`${prefixCls}-line`}>
                            <DateInput
                                {...inputProps}
                                date={_compareBeginTime}
                                dateType="compareBeginTime"
                                isCompare
                            />
                            <span className={`${prefixCls}-seperate`}>
                                -
                            </span>
                            <DateInput
                                {...inputProps}
                                date={_compareEndTime}
                                dateType="compareEndTime"
                                isCompare
                            />
                        </div>
                    ) : null
                }
            </div>
        );
        return elm;
    }

    renderDateHeader = () => {
        const canSelectFuture = this.props.canSelectFuture;
        const {mode, selectTime, validateMinDate, validateMaxDate} = this.state;
        const {
            year,
            month
        } = selectTime;
        const calendarHeaderProps = {
            currentYear: year,
            currentMonth: month,
            onChangeTitle: this.onChangeTitle,
            mode,
            onChangePage: this.onChangePage,
            validateMinDate,
            validateMaxDate,
            canSelectFuture
        };
        return <CalendarHeader {...calendarHeaderProps} />;
    }

    renderDateBody = () => {
        const {
            mode,
            selectTime,
            validateMinDate,
            validateMaxDate,
            beginTime,
            visible,
            _beginTime,
            _endTime,
            _compareBeginTime,
            _compareEndTime,
            _compareSwitch
        } = this.state;
        const {prefixCls, selectMode, canSelectFuture, canSelectTime} = this.props;
        const isCompareMode = selectMode === 'compare';
        const isSingleMode = selectMode === 'single';
        const bodyProps = {
            mode,
            selectYear: selectTime.year,
            selectMonth: selectTime.month,
            prefixCls,
            onSelectMonth: this.onSelectMonth,
            validateMinDate,
            validateMaxDate,
            beginTime: (!canSelectTime && isSingleMode) ? beginTime : _beginTime,
            endTime: (!isSingleMode && _endTime) || '',
            compareBeginTime: (isCompareMode && _compareSwitch && _compareBeginTime) || '',
            compareEndTime: (isCompareMode && _compareSwitch && _compareEndTime) || '',
            onChange: this.onSelectDay,
            visible,
            ref: this.getCalendarBodayRef,
            onScrollChange: this.onScrollChange,
            selectMode,
            canSelectFuture,
            compareSwitch: _compareSwitch
        };
        return <CalendarBody {...bodyProps} />;
    }

    renderFooter = () => {
        const {prefixCls, canSelectTime, selectMode} = this.props;
        const {mode, errorMsg} = this.state;
        const showFooter = (canSelectTime && selectMode === 'single') || selectMode === 'compare';
        if (!showFooter) {
            if (!errorMsg) {
                return null;
            }
            return (
                <div className={`${prefixCls}-footer`}>
                    <div className={`${prefixCls}-error`}>
                        {errorMsg}
                    </div>
                </div>
            );
        }
        return (
            <div className={`${prefixCls}-footer`}>
                {
                    errorMsg ? (
                        <div className={`${prefixCls}-error`}>
                            {errorMsg}
                        </div>
                    ) : null
                }
                <Button type="primary" onClick={this.onConfirm}>
                    确定
                </Button>
                <Button type="normal" onClick={this.onCancel}>
                    取消
                </Button>
                {
                    (canSelectTime && selectMode === 'single') ? (
                        <span data-mode={mode} className={`${prefixCls}-footer-mode`} onClick={this.selectTimeMode}>
                            {mode === 'time' ? '日期选择' : '时间选择'}
                        </span>
                    ) : null
                }
            </div>
        );
    }

    renderTime = () => {
        const {timeObj, mode} = this.state;
        const {prefixCls, timeRules} = this.props;
        const calendarProps = {
            timeObj,
            mode,
            prefixCls,
            onSelectTime: this.onSelectTime,
            timeRules
        };
        return <CalendarTime {...calendarProps} />;
    }

    renderSingleDatePickerLayer = () => {
        const {prefixCls, canSelectTime} = this.props;
        const mode = this.state.mode;
        const pickClassName = classNames(`${prefixCls}-single`, `${prefixCls}-single-${mode}`, {
            [`${prefixCls}-single-has-comfirm`]: canSelectTime
        });
        return (
            <div className={`${prefixCls}-layer`}>
                <div className={pickClassName}>
                    {
                        mode !== 'time' ? (
                            <div>
                                {this.renderDateInput()}
                                {this.renderDateHeader()}
                                {this.renderDateBody()}
                            </div>
                        ) : (this.renderTime())
                    }
                    {this.renderFooter()}
                </div>
            </div>
        );
    }

    renderCompareSwitch = () => {
        const {
            dateList,
            overRollDateList,
            sameOverRollDateList,
            showCompareSwitch
        } = this.props;
        const _compareSwitch = this.state._compareSwitch;
        const switchProps = {
            compareSwitch: _compareSwitch,
            dateList,
            overRollDateList,
            sameOverRollDateList,
            onChooseSwitchItem: this.onChooseSwitchItem,
            onChangeSwitch: this.onChangeSwitch,
            showCompareSwitch
        };
        return <CalendarSwitch {...switchProps} />;
    }

    renderCompareDatePickerLayer = () => {
        const prefixCls = this.props.prefixCls;
        return (
            <div className={`${prefixCls}-layer`}>
                <div className={`${prefixCls}-box`}>
                    {this.renderCompareSwitch()}
                    <div className={`${prefixCls}-main`}>
                        {this.renderCompareDateInput()}
                        {this.renderDateHeader()}
                        {this.renderDateBody()}
                    </div>
                </div>
                {this.renderFooter()}
            </div>
        );
    }

    render() {
        const {prefixCls, canSelectTime, selectMode, timeRules, showCompareSwitch, className, getPopupContainer, disabled, size} = this.props;
        const {beginTime, endTime, compareBeginTime, compareEndTime, compareSwitch} = this.state;
        const buttonText = getDateCompareObj({
            beginTime,
            canSelectTime,
            endTime,
            compareBeginTime,
            compareEndTime,
            selectMode,
            timeRules,
            compareSwitch: showCompareSwitch && compareSwitch
        });
        let visible = this.state.visible;
        if ('visible' in this.props) {
            visible = this.props.visible;
        }
        const text = buttonText || '请选择日期';
        const calendarCls = classNames(prefixCls, className, {
            [`${prefixCls}-empty`]: !buttonText,
            [`${prefixCls}-disabled`]: disabled
        });
        let overlay = <span />;
        if (visible) {
            overlay = selectMode === 'compare' ? this.renderCompareDatePickerLayer : this.renderSingleDatePickerLayer;
        }
        const layerProps = {
            trigger: disabled ? '' : 'click',
            visible,
            onVisibleChange: this.onLayerVisibleChange,
            overlay,
            dropdownMatchSelectWidth: false,
            getPopupContainer
        };
        return (
            <div className={calendarCls}>
                <Layer {...layerProps}>
                    <Button className={`${prefixCls}-title`} disabled={disabled} size={size}>
                        <span>{text}</span>
                        <Icon type="calendar" />
                    </Button>
                </Layer>
            </div>
        );
    }
}

polyfill(Calendar);
export default Calendar;
