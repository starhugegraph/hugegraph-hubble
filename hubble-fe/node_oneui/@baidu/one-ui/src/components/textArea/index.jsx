import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'omit.js';
import classNames from 'classnames';
import calculateNodeHeight from '../../core/textAreaTools';
import {handleErrorMessage, fixControlledValue, commonRemoveProps} from '../../core/inputTools';
import {noop, locationRemoveProps, handleCountTips, CHINA_COUNT_MODE, getRealLength, transSizeOfDefault} from '../../core/commonTools';
import Popover from '../popover';
import {getPopoverProps, tipsAndErrorRender} from '../../core/tipsAndErrorTools';

function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}

export default class TextArea extends PureComponent {
    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        value: PropTypes.any,
        width: PropTypes.number,
        minRows: PropTypes.number,
        maxRows: PropTypes.number,
        minLen: PropTypes.number,
        maxLen: PropTypes.number,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        errorMessage: PropTypes.string,
        isRequired: PropTypes.bool,
        requiredErrorMessage: PropTypes.string,
        maxLenErrorMessage: PropTypes.string,
        minLenErrorMessage: PropTypes.string,
        location: PropTypes.string,
        tipLocation: PropTypes.string,
        errorLocation: PropTypes.string,
        tipText: PropTypes.string,
        filterArray: PropTypes.array, // 计数时不算得字符
        countMode: PropTypes.string, // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
        getLength: PropTypes.func, // 自定义计数方式
        defaultValue: PropTypes.string,
        showErrorMessage: PropTypes.bool,
        showErrorWithoutErrorMessage: PropTypes.bool,
        originTextAreaProps: PropTypes.object
    };

    static defaultProps = {
        prefixCls: 'new-fc-one-textarea',
        width: 300,
        maxRows: 8,
        minRows: 3,
        maxLen: null,
        errorMessage: null,
        location: 'right',
        tipLocation: null,
        errorLocation: null,
        tipText: null,
        onChange: noop,
        onBlur: noop,
        size: 'small',
        isRequired: false,
        filterArray: [],
        countMode: CHINA_COUNT_MODE,
        getLength: null,
        disabled: false,
        readOnly: false,
        showErrorMessage: true,
        showErrorWithoutErrorMessage: false,
        originTextAreaProps: {}
    };

    constructor(args) {
        super(...args);
        const value = typeof args.value === 'undefined' ? args.defaultValue : args.value;
        this.state = {
            hasFocus: false,
            textareaStyles: null,
            value,
            errorMessage: '' // errorMessage || ''
        };
    }

    componentDidMount() {
        this.resizeTextarea();
    }

    componentWillReceiveProps(nextProps) {
        const value = nextProps.value;
        if (this.props.value !== value) {
            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
            this.nextFrameActionId = onNextFrame(this.resizeTextarea);
        }
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value});
        }
    }

    onInputCompositionStart = () => {
        this.___imeStart___ = true;
    }

    onInputCompositionEnd = e => {
        this.___imeStart___ = false;
        this.onChange(e);
    }

    onChange = e => {
        this.resizeTextarea();
        if (this.___imeStart___) {
            this.setState({value: e.target.value});
            return;
        }
        this.handleError(e, 'onChange', false);
    }

    resizeTextarea = () => {
        const {minRows, maxRows} = this.props;
        this.setState({textareaStyles: calculateNodeHeight(this.textAreaRef, false, minRows, maxRows)});
    };

    handleError = (e, funcName, isHandleMin = true) => {
        const props = this.props;
        const value = e.target.value;
        const errorMessage = handleErrorMessage({
            ...props,
            value
        }, isHandleMin, true);
        const result = {
            value,
            errorMessage,
            event: e
        };
        const newState = {
            errorMessage
        };
        if (!('value' in this.props)) {
            // this.setState(result);
            newState.value = value;
        }
        this.setState(newState);
        const func = props[funcName];
        if (func) {
            func(result, e);
        }
    }

    blur = e => {
        this.handleError(e, 'onBlur', true);
        this.setState({hasFocus: false});
    }

    focus = () => {
        this.setState({hasFocus: true});
    }

    saveTextAreaRef = textArea => {
        this.textAreaRef = textArea;
    };

    render() {
        const props = this.props;
        const propsErrorMessage = props.errorMessage;
        const otherProps = omit(props, [
            'prefixCls',
            'maxRows',
            'minRows',
            'filterArray',
            'defaultValue',
            'showErrorWithoutErrorMessage',
            'showErrorMessage',
            'originTextAreaProps',
            ...commonRemoveProps,
            ...locationRemoveProps
        ]);
        const {width, prefixCls, maxLen, className, disabled, readOnly, showErrorMessage, showErrorWithoutErrorMessage} = props;
        const {textareaStyles, hasFocus, value, errorMessage: stateErrorMessage} = this.state;
        const errorMessage = propsErrorMessage == null ? stateErrorMessage : propsErrorMessage;
        const defalutProps = {
            value: fixControlledValue(value),
            style: {
                width,
                ...textareaStyles
            },
            className: classNames(prefixCls, className, {
                [`${prefixCls}-disabled`]: disabled,
                [`${prefixCls}-readOnly`]: readOnly
            }),
            ref: this.saveTextAreaRef,
            onFocus: this.focus,
            onBlur: this.blur,
            onChange: this.onChange,
            onCompositionStart: this.onInputCompositionStart,
            onCompositionEnd: this.onInputCompositionEnd,
            ...props.originTextAreaProps
        };
        const containerProps = {
            className: classNames(`${prefixCls}-container`, {
                [`${prefixCls}-error`]: errorMessage || showErrorWithoutErrorMessage
            })
        };
        const popParams = {
            ...props,
            errorMessage
        };
        const wrapperClass = `${prefixCls}-wrapper`;
        const size = transSizeOfDefault(this.props.size, 'small');
        const wrapperProps = {
            className: classNames(wrapperClass, {
                [`${wrapperClass}-${size}`]: size
            })
        };
        return (
            <div {...wrapperProps}>
                <div {...containerProps}>
                    <Popover {...getPopoverProps(popParams, {hasFocus})}>
                        <textarea {...{...otherProps, ...defalutProps}} data-type="textarea"/>
                    </Popover>
                    {hasFocus && maxLen ? <span className={`${prefixCls}-count-tips`}>{handleCountTips(getRealLength(props, value), maxLen)}</span> : null}
                </div>
                {showErrorMessage ? tipsAndErrorRender(popParams) : null}
            </div>
        );
    }
}
