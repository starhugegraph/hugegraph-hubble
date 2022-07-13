
/**
 * @file 单行文本计数输入框
 * @author shanqianmin
 * @date 2018/09/05
 */
import React, {PureComponent, cloneElement} from 'react';
import {polyfill} from 'react-lifecycles-compat';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import _ from 'lodash';
import {handleCountTips, CHINA_COUNT_MODE, getRealLength, handleEventParams, transSizeOfDefault} from '../../core/commonTools';
import {handleErrorMessage, isMaxLenError, isMinLenError, fixControlledValue, commonRemoveProps, defaultInputWidth} from '../../core/inputTools';

class Input extends PureComponent {
    static propTypes = {
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        isRequired: PropTypes.bool,
        requiredErrorMessage: PropTypes.string,
        maxLenErrorMessage: PropTypes.string,
        minLenErrorMessage: PropTypes.string,
        width: PropTypes.number, // 设置宽度
        style: PropTypes.object,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool, // 只读状态，暂未暴露，为了联动
        value: PropTypes.any,
        className: PropTypes.string,
        prefixCls: PropTypes.string,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onPressEnter: PropTypes.func,
        addonBefore: PropTypes.node,
        addonAfter: PropTypes.node,
        prefix: PropTypes.node,
        suffix: PropTypes.node,
        placeholder: PropTypes.string,
        maxLen: PropTypes.number,
        minLen: PropTypes.number,
        countMode: PropTypes.string, // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
        getLength: PropTypes.func, // 自定义计数方式
        errorMessage: PropTypes.string, // 如果外部存在errorMessage，则以外部为准，不参考内部errorMessage
        showErrorMessage: PropTypes.bool, // 如果为false，当errorMessage存在时，仅有外框标红，但不显示错误信息
        errorLocation: PropTypes.string, // right、layer、bottom
        filterArray: PropTypes.array, // 计数的时候某些数据不计数
        isErrorHTML: PropTypes.bool, // 错误信息是不是html
        inputRef: PropTypes.func,
        defaultValue: PropTypes.string,
        originInputProps: PropTypes.object
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-input',
        disabled: false,
        readOnly: false,
        maxLen: null,
        minLen: null,
        errorMessage: null,
        showErrorMessage: true,
        errorLocation: 'right',
        isRequired: false,
        requiredErrorMessage: '',
        maxLenErrorMessage: '',
        minLenErrorMessage: '',
        width: null,
        style: {},
        filterArray: [],
        isErrorHTML: false,
        className: '',
        countMode: CHINA_COUNT_MODE,
        getLength: null,
        size: 'small',
        originInputProps: {}
    };

    constructor(args) {
        super(...args);
        // const {value, errorMessage} = args;
        const value = typeof args.value === 'undefined' ? args.defaultValue : args.value;
        this.state = {
            hasFocus: false,
            countLabelWidth: 0,
            value,
            errorMessage: '', // errorMessage || ''
            prevValue: value,
            cacheValue: value
        };
    }

    componentDidMount() {
        this.setLabelWidth();
        const {width, style = {}} = this.props;
        const inputDetailRef = this.inputDetailRef;
        if (this.isAddonInput()) {
            // 组合的话要宽度要重新计算
            const inputWidth = width || style.width || defaultInputWidth;
            const addonBeforeRefWidth = (this.addonBeforeRef && this.addonBeforeRef.offsetWidth) || 0;
            const addonAfterRefWidth = (this.addonAfterRef && this.addonAfterRef.offsetWidth) || 0;
            inputDetailRef.style.width = `${inputWidth + addonBeforeRefWidth + addonAfterRefWidth}px`;
        } else if (style.width === '100%' || width === '100%') {
            // 父级别input也应该100%来自定义
            inputDetailRef.style.width = '100%';
            this.inputContainerRef.style.width = '100%';
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = {
            value: prevState.value,
            prevValue: nextProps.value
        };
        // state变化的时候不触发，只有props变化的时候触发，处理中文输入的时候onChange不触发时候改变了state的问题
        if ('value' in nextProps && nextProps.value !== prevState.prevValue) {
            newState.value = nextProps.value;
            newState.cacheValue = nextProps.value;
            const errorMessage = handleErrorMessage({
                ...nextProps,
                value: nextProps.value
            }, true, true);
            newState.errorMessage = errorMessage;
        }
        return newState;
    }

    componentWillUnmount() {
        clearTimeout(this.___countLabelTimer___);
    }

    onInputCompositionStart = () => {
        this.___imeStart___ = true;
    }

    onInputCompositionEnd = e => {
        this.___imeStart___ = false;
        this.onChange(e);
    }

    onChange = e => {
        const value = e.target.value;
        const props = this.props;
        if (this.___imeStart___) {
            this.setState({
                // value,
                cacheValue: value
            });
            return;
        }
        const errorMessage = handleErrorMessage({
            ...props,
            value
        }, true, true);
        const result = {
            value,
            errorMessage,
            event: e
        };
        const newState = {
            errorMessage,
            cacheValue: value
        };
        if (!('value' in this.props)) {
            // this.setState(result);
            newState.value = value;
        }
        this.setState(newState);
        this.setLabelWidth();
        const onChange = props.onChange;
        if (onChange) {
            onChange(result);
        }
    }

    onKeyDown = e => {
        if (e.keyCode === 13) {
            const onPressEnter = this.props.onPressEnter;
            if (onPressEnter) {
                onPressEnter({
                    value: e.target.value,
                    errorMessage: this.state.errorMessage
                });
            }
        }
    }

    setLabelWidth = (showLabel = true) => {
        const me = this;
        const inputCountAnchor = me.inputCountAnchor;
        if (!inputCountAnchor) {
            me.setState({countLabelWidth: 0});
            return;
        }
        const countLabelWidth = showLabel ? inputCountAnchor.offsetWidth : 0;
        if (countLabelWidth === me.state.countLabelWidth) {
            return;
        }
        me.setState({countLabelWidth});
    }

    getInputClassName() {
        const {prefixCls, disabled, readOnly, size} = this.props;
        return classNames(prefixCls, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-readOnly`]: readOnly
        });
    }

    focus = e => {
        this.___countLabelTimer___ = setTimeout(this.setLabelWidth, 0); // display为none时无法获取宽度
        this.setState({hasFocus: true});
        const onFocus = this.props.onFocus;
        if (onFocus) {
            onFocus(handleEventParams(e, this));
        }
    }

    blur = e => {
        this.setLabelWidth(false);
        this.setState({hasFocus: false});
        const onBlur = this.props.onBlur;
        if (onBlur) {
            onBlur(handleEventParams(e, this));
        }
    }

    addAnchor = (key, el) => {
        this[key] = el;
    }

    renderLabeledIcon(children) {
        const {prefix, suffix, prefixCls, className, style} = this.props;
        if (!(prefix != null || suffix != null)) {
            return children;
        }
        // 以下暂时未用到
        const prefixItem = prefix
            ? (
                <span className={`${prefixCls}-prefix`}>
                    {prefix}
                </span>
            )
            : null;
        const suffixItem = suffix
            ? (
                <span className={`${prefixCls}-suffix`}>
                    {suffix}
                </span>
            )
            : null;
        const wrapperClassName = classNames(
            className,
            `${prefixCls}-affix-wrapper`,
            {
                [`${prefixCls}-affix-wrapper-has-prefix`]: !!prefix,
                [`${prefixCls}-affix-wrapper-has-suffix`]: !!suffix
            }
        );
        return (
            <span className={wrapperClassName} style={style}>
                {prefixItem}
                {cloneElement(children, {style: null, className: this.getInputClassName()})}
                {suffixItem}
            </span>
        );
    }

    renderInput() {
        const stateValue = this.state.value;
        const cacheValue = this.state.cacheValue;
        const props = this.props;
        const otherProps = omit(props, [
            'prefixCls',
            'onPressEnter',
            'addonBefore',
            'addonAfter',
            'prefix',
            'suffix',
            'defaultValue',
            'originInputProps',
            ...commonRemoveProps,
            'filterArray',
            'isErrorHTML',
            'showErrorMessage',
            'inputRef'
        ]);
        otherProps.value = this.___imeStart___
            ? fixControlledValue(cacheValue)
            : fixControlledValue(stateValue);
        otherProps.style = {
            paddingRight: this.state.countLabelWidth || null
        };
        otherProps.onFocus = this.focus;
        otherProps.onBlur = this.blur;
        otherProps.onCompositionStart = this.onInputCompositionStart;
        otherProps.onCompositionEnd = this.onInputCompositionEnd;
        otherProps.onChange = this.onChange;
        otherProps.onKeyDown = this.onKeyDown;
        otherProps.ref = props.inputRef || _.partial(this.addAnchor, 'inputRef');
        return this.renderLabeledIcon(<input
            {...otherProps}
            {...props.originInputProps}
            data-type="input"
            className={classNames(this.getInputClassName())}
        />);
    }

    saveRef = name => node => {
        this[name] = node;
    };

    renderLabeledInput(children) {
        const {addonBefore, addonAfter, prefixCls, style} = this.props;
        if ((!addonBefore && !addonAfter)) {
            return children;
        }

        const wrapperClassName = `${prefixCls}-group`;
        const addonClassName = `${wrapperClassName}-addon`;
        const addonBeforeItem = addonBefore
            ? (
                <span className={classNames(addonClassName, `${addonClassName}-before`)} ref={this.saveRef('addonBeforeRef')}>
                    {addonBefore}
                </span>
            )
            : null;
        const addonAfterItem = addonAfter
            ? (
                <span className={classNames(addonClassName, `${addonClassName}-after`)} ref={this.saveRef('addonAfterRef')}>
                    {addonAfter}
                </span>
            )
            : null;
        const className = classNames(`${prefixCls}-wrapper`, {
            [wrapperClassName]: (addonBeforeItem || addonAfterItem)
        });
        if (addonBeforeItem || addonAfterItem) {
            return (
                <span className={`${prefixCls}-group-wrapper`} style={style}>
                    <span className={className}>
                        {addonBeforeItem}
                        {cloneElement(children, {style: null})}
                        {addonAfterItem}
                    </span>
                </span>
            );
        }
        return (
            <span className={className}>
                {addonBeforeItem}
                {children}
                {addonAfterItem}
            </span>
        );
    }

    isAddonInput = () => {
        const {addonBefore, addonAfter} = this.props;
        return addonBefore || addonAfter;
    }


    render() {
        const props = this.props;
        const {
            prefixCls,
            maxLen,
            errorLocation,
            style = {},
            isErrorHTML,
            className,
            showErrorMessage: showError,
            errorMessage: propsErrorMessage,
            width
        } = props;
        const {value, hasFocus, errorMessage: stateErrorMessage} = this.state;
        const size = transSizeOfDefault(props.size, 'small');
        const errorMessage = propsErrorMessage == null ? stateErrorMessage : propsErrorMessage;
        const countClass = `${prefixCls}-count`;
        const countProps = {
            ref: _.partial(this.addAnchor, 'inputCountAnchor'),
            className: classNames(
                countClass,
                {
                    [`${countClass}-visible`]: hasFocus,
                    [`${countClass}-error`]: isMaxLenError({...props, value}) || isMinLenError({...props, value})

                })
        };
        const containerClass = `${prefixCls}-all-container`;
        const containerProps = {
            className: classNames(
                className,
                containerClass,
                `${containerClass}-${size}`,
                {
                    [`${containerClass}-error`]: errorMessage,
                    [`${containerClass}-has-focused`]: hasFocus
                }
            ),
            ref: this.saveRef('inputContainerRef')
        };
        const detailProps = {
            className: `${prefixCls}-detail`,
            style: {
                ...style
            },
            ref: this.saveRef('inputDetailRef')
        };
        if (!this.isAddonInput()) {
            detailProps.style.width = width || style.width || defaultInputWidth;
        }
        const errorClass = `${prefixCls}-error`;
        const errorProps = {
            className: classNames(
                errorClass,
                `${errorClass}-${errorLocation}`
            )
        };
        const showErrorMessage = errorLocation === 'layer' ? hasFocus && errorMessage : errorMessage;
        const errorRender = isErrorHTML ? (
            <div
                {...errorProps}
                /* eslint-disable react/no-danger */
                dangerouslySetInnerHTML={{__html: errorMessage}}
            />
        ) : <div {...errorProps}>{errorMessage}</div>;
        return (
            <div {...containerProps}>
                <div {...detailProps}>
                    {this.renderLabeledInput(this.renderInput())}
                    {maxLen != null ? <span {...countProps}>{handleCountTips(getRealLength(props, value), maxLen)}</span> : null}
                </div>
                {showError && showErrorMessage ? errorRender : null}
            </div>
        );
    }
}

polyfill(Input);

export default Input;
