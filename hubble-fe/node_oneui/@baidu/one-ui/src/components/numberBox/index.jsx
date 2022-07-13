/**
 * 数字输入框
 * @author Chen Xiao
 * @email companyforme@gmail.com
 * @author Shan Qianmin
 * @email shanqianmin@baidu.com
 * 悬浮态和点击态时会出现数字调节按钮
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';
import {
    IconChevronDown, IconChevronUp, IconPlus, IconMinus
} from '@baidu/one-ui-icon';
import Popover from '../popover';
import {changeNumber, numberFormater, rangeFormater} from '../../core/numberboxTools';
import {getPopoverProps, tipsAndErrorRender} from '../../core/tipsAndErrorTools';

/**
 * NumberBox component.
 */
class NumberBox extends PureComponent {
    static propTypes = {
        /** 输入数字的类型，float或int */
        type: PropTypes.string,
        /** 数字输入框中无内容时显示的提示文字 */
        placeholder: PropTypes.string,
        /** 用户可自定义class前缀 */
        prefixCls: PropTypes.string,
        /** 用户可自定义class */
        className: PropTypes.string,
        /** 禁用状态 */
        disabled: PropTypes.bool,
        /** 最大值 */
        max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 最小值 */
        min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 调节按钮点击时值跳动的步频 */
        step: PropTypes.number,
        /** 保留的小数位数，只有当type为float时有效 */
        fixed: PropTypes.number,
        /** 当前值，字符串类型 */
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** 值变化回调 */
        onChange: PropTypes.func,
        /** 聚焦回调 */
        onFocus: PropTypes.func,
        /** 失焦回调 */
        onBlur: PropTypes.func,
        /** 是否显示默认提示 */
        showTip: PropTypes.bool,
        /** 默认提示话术 */
        tipText: PropTypes.string,
        /** 报错信息 */
        errorMessage: PropTypes.string,
        /** 提示位置和报错位置，默认统一 */
        location: PropTypes.string,
        /** 提示位置，取值为right、bottom、layer，如未设置，取自location */
        tipLocation: PropTypes.string,
        /** 报错位置，取值为right、bottom、layer，如未设置，取自location */
        errorLocation: PropTypes.string,
        /** 一般为单位信息 */
        tailLabel: PropTypes.string,
        /** 宽度 */
        width: PropTypes.number,
        mode: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium']),
        readOnly: PropTypes.bool,
        defaultValue: PropTypes.string,
        /** 报错，但是没有错误提示，常用于有两个numberbox并列的时候第一个numberbox报错 */
        showErrorWithoutErrorMessage: PropTypes.bool,
        /** showErrorMessage为false的时候可以业务可以自己定义errorMessage的位置 */
        showErrorMessage: PropTypes.bool
    }

    static defaultProps = {
        type: 'float',
        placeholder: '',
        prefixCls: 'new-fc-one-numberbox',
        disabled: false,
        max: null,
        min: null,
        step: 1.00,
        fixed: Number.POSITIVE_INFINITY,
        onChange: _.noop,
        onFocus: _.noop,
        onBlur: _.noop,
        showTip: true,
        errorMessage: '',
        location: 'right',
        tipLocation: null,
        errorLocation: null,
        tailLabel: null,
        width: null,
        mode: 'basic',
        size: 'small',
        showErrorWithoutErrorMessage: false,
        showErrorMessage: true
    }

    state = {
        hasFocus: false,
        arrowUpDisable: false,
        arrowDownDisable: false
    }

    constructor(args) {
        super(...args);
        // const {value, errorMessage} = args;
        const value = typeof args.value === 'undefined' ? args.defaultValue : args.value;
        this.state = {
            hasFocus: false,
            arrowUpDisable: false,
            arrowDownDisable: false,
            value
        };
    }

    static getDerivedStateFromProps(nextProps) {
        if ('value' in nextProps) {
            return {
                value: nextProps.value
            };
        }
        return null;
    }

    onInputBoxChange = e => {
        if (this.props.disabled) return;
        e.target.value = numberFormater(e.target.value, this.props);
        this.disableArrow(+e.target.value);
        if (!('value' in this.props)) {
            this.setState({
                value: e.target.value
            });
        }
        this.props.onChange(e);
    }

    onInputBoxBlur = e => {
        const {onChange, onBlur} = this.props;
        this.setState({hasFocus: false});
        const oldValue = e.target.value;
        if (oldValue != null && oldValue !== '') {
            const newValue = rangeFormater(oldValue, this.props);
            if (newValue !== oldValue) {
                e.target.value = newValue;
                if (!('value' in this.props)) {
                    this.setState({
                        value: e.target.value
                    });
                }
                onChange(e);
            }
        }
        onBlur(e);
    }

    onSpinButtonClick = e => {
        const props = this.props;
        const {disabled, readOnly, onChange, step, min} = props;
        if (disabled || readOnly) {
            return;
        }
        const dataset = e && e.currentTarget && e.currentTarget.dataset;
        const optValue = dataset.uiCmd === 'add' ? 1 : -1;
        if ((optValue === 1 && this.state.arrowUpDisable)
            || (optValue === -1 && this.state.arrowDownDisable)) {
            return;
        }
        const target = this.numberBoxRef;
        let value = target.value;
        if (isNaN(value) || value.length === 0) {
            value = `${min}` || '0.0';
        }
        const newValue = changeNumber(value, step, optValue);
        this.disableArrow(+newValue);
        value = numberFormater(newValue, props, true);
        if (!('value' in this.props)) {
            this.setState({
                value
            });
        }
        onChange({target: {
            value
        }});
        this.numberBoxRef.focus();
    }

    onInputBoxFocus = () => {
        this.setState({hasFocus: true});
        this.props.onFocus({
            target: this.numberBoxRef
        });
    }

    disableArrow = currentValue => {
        const {min, max} = this.props;
        if (!this.state.arrowDownDisable && currentValue <= min && min != null) {
            this.setState({
                arrowDownDisable: true
            });
        } else if (currentValue > min) {
            this.setState({
                arrowDownDisable: false
            });
        }
        if (max != null && currentValue >= max && !this.state.arrowUpDisable) {
            this.setState({
                arrowUpDisable: true
            });
        } else if (currentValue < max) {
            this.setState({
                arrowUpDisable: false
            });
        }
    }

    addRef = node => {
        this.numberBoxRef = node;
    }

    render() {
        const props = this.props;
        const {
            className,
            placeholder,
            min,
            max,
            prefixCls,
            disabled,
            errorMessage,
            showTip,
            tipText,
            tipLocation,
            tailLabel,
            width,
            errorLocation,
            location,
            mode,
            size,
            readOnly,
            showErrorWithoutErrorMessage,
            showErrorMessage
        } = props;
        const {hasFocus, arrowUpDisable, arrowDownDisable} = this.state;
        const value = numberFormater(this.state.value, props);
        const inputProp = {
            ref: 'inputbox',
            type: 'text',
            placeholder: placeholder || '', // 当place是false时，不应该显示false
            value,
            onFocus: this.onInputBoxFocus,
            onChange: this.onInputBoxChange,
            onBlur: this.onInputBoxBlur
        };
        const mainClass = `${prefixCls}-main`;
        const mainProps = {
            className: mainClass
        };
        const addonClass = `${mainClass}-addon`;
        const containerProps = {
            className: classNames(prefixCls, {
                [`${prefixCls}-focus`]: hasFocus,
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-readonly`]: readOnly
            }),
            style: {
                width
            }
        };
        const wrapperClass = `${prefixCls}-wrapper`;
        const wrapperProps = {
            className: classNames(className, wrapperClass, `${prefixCls}-${size}`, {
                [`${prefixCls}-error`]: errorMessage || showErrorWithoutErrorMessage,
                [`${wrapperClass}-${mode}`]: mode,
                [`${wrapperClass}-disabled`]: disabled,
                [`${wrapperClass}-readonly`]: readOnly,
                [`${wrapperClass}-focus`]: hasFocus
            })
        };
        const btnContainer = {
            className: classNames(
                'btn-container',
                {
                    'btn-container-focus': hasFocus
                }
            )
        };
        const inputDisabled = disabled;
        const tailLabelClass = `${prefixCls}-tail-label`;
        const popParams = {
            tipLocation,
            errorMessage,
            tipText: showTip && (tipText || (min == null || max == null ? '' : `范围：${min}~${max}`)),
            errorLocation,
            location,
            prefixCls,
            size
        };
        const beforeCommon = {
            className: classNames({
                'new-fc-one-icon-disabled': arrowDownDisable || inputDisabled || readOnly
            }),
            'data-ui-cmd': 'sub',
            onClick: this.onSpinButtonClick
        };
        const beforeAddonProps = {
            ...beforeCommon,
            className: classNames(addonClass, `${addonClass}-before`, beforeCommon.className)
        };
        const afterCommon = {
            className: classNames({
                'new-fc-one-icon-disabled': arrowUpDisable || inputDisabled || readOnly
            }),
            'data-ui-cmd': 'add',
            onClick: this.onSpinButtonClick
        };
        const afterAddonProps = {
            ...afterCommon,
            className: classNames(addonClass, `${addonClass}-after`, afterCommon.className)
        };
        return (
            <div {...wrapperProps}>
                <Popover {...getPopoverProps(popParams, {hasFocus})}>
                    <div {...mainProps}>
                        <div {...beforeAddonProps}>
                            <span data-ui-cmd="sub">
                                <IconMinus />
                            </span>
                        </div>
                        <div {...containerProps}>
                            <input {...inputProp} disabled={inputDisabled} readOnly={readOnly} ref={this.addRef}/>
                            <div {...btnContainer}>
                                <div {...afterCommon}>
                                    <span data-ui-cmd="add">
                                        <IconChevronUp />
                                    </span>
                                </div>
                                <div {...beforeCommon}>
                                    <span data-ui-cmd="sub">
                                        <IconChevronDown />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div {...afterAddonProps}>
                            <span data-ui-cmd="add">
                                <IconPlus />
                            </span>
                        </div>
                    </div>
                </Popover>
                {tailLabel ? <span className={tailLabelClass}>{tailLabel}</span> : null}
                {showErrorMessage ? tipsAndErrorRender(popParams) : null}
            </div>
        );
    }
}

polyfill(NumberBox);

export default NumberBox;
