/**
 * @file 多行输入框
 * @author shanqianmin
 * @date 2018/06/18
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import {handleCountTips, sortArraySequence, getNoEmptyArrayLength, showRender, CHINA_COUNT_MODE, getRealLength} from '../../core/commonTools';
import {getErrorMessage, handleErrorMessageArray, commonValidate, handleErrorObj, handleBackendError} from '../../core/textLineTools';

/**
 * TextLine component.
 */
export default class TextLine extends PureComponent {
    static propTypes = {
        /** 下限，最少要输入多少行 */
        minLine: PropTypes.number,
        /** 上限，最多能输入多少行 */
        maxLine: PropTypes.number,
        /** 每一行的最大长度 */
        maxLen: PropTypes.number,
        /** 错误信息最大长度 */
        maxLenErrorMessage: PropTypes.string,
        /** 表头名称 */
        title: PropTypes.string,
        /** 定制表头 */
        TitleRender: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.func
        ]),
        /** 定制操作符 */
        operationRender: PropTypes.node,
        /** 是否展示全部删除 */
        showAllDel: PropTypes.bool,
        /** 是否优化操作，不建议添加 */
        showHandleError: PropTypes.bool,
        /** 默认显示文字 */
        placeholder: PropTypes.string,
        /** textline的值 */
        value: PropTypes.array,
        /** 换行符，一次只支持一个 */
        lineBreak: PropTypes.string,
        /** 支持宽高，是指的包含 title 和实际输入框的宽高，不包含错误信息的高度 */
        width: PropTypes.number,
        height: PropTypes.number,
        style: PropTypes.object,
        isRequired: PropTypes.bool,
        /** 是否需要展示重复，默认不展示重复 */
        isUnique: PropTypes.bool,
        uniqueErrorMessage: PropTypes.string,
        requiredErrorMessage: PropTypes.string,
        minLineErrorMessage: PropTypes.string,
        maxLineErrorMessage: PropTypes.string,
        errorMessageArrayObj: PropTypes.object,
        /** 后端传过来的错误信息，组件不会自动清空或者处理，只会展示 */
        backendErrorMessageObj: PropTypes.object,
        /** 单行错误校验方法 */
        validate: PropTypes.func,
        onChange: PropTypes.func,
        onBlur: PropTypes.func,
        /** 优化操作的方法 */
        handleErrorMessage: PropTypes.func,

        prefixCls: PropTypes.string,
        countMode: PropTypes.string, // 计数方式，cn\en，当为cn时，一个汉字记为两个字符，当为en时，一个汉字记为两个字符。默认为cn
        getLength: PropTypes.func, // 自定义计数方式
        inputDisabled: PropTypes.bool
    };

    static defaultProps = {
        maxLine: null,
        minLine: null,
        maxLen: null,
        maxLenErrorMessage: '',

        title: '',
        TitleRender: null,
        operationRender: null,
        showAllDel: true,
        showHandleError: false,
        placeholder: '',
        value: [],
        lineBreak: '\n',
        width: null,
        height: null,
        style: {
            height: 245,
            width: 550
        },
        isRequired: true,
        isUnique: false, // 判断去重有问题，暂时不支持，因为【查看是会将错误的行都放在最前面，但是重复又是从第二个重复的行来出的，这块相悖】
        uniqueErrorMessage: '',
        requiredErrorMessage: '',
        minLineErrorMessage: '',
        maxLineErrorMessage: '',
        errorMessageArrayObj: {}, // {'搜索词长度不能超过40字符': [1, 2, 3]}
        backendErrorMessageObj: {}, // {'关键词1value': '搜索词长度不能超过40字符'}

        onChange: _.noop,
        onBlur: _.noop,
        validate: _.noop,
        handleErrorMessage: _.noop,

        prefixCls: 'new-fc-one-textline',
        countMode: CHINA_COUNT_MODE,
        getLength: null,
        inputDisabled: false
    };

    constructor(args) {
        super(...args);
        this.state = {
            fullValue: args.value, // 中文ime 输入中时，需要此字段存储全部 value 值，中文输入状态不需要dispatch 到外部，但内部需要展示
            hasFocus: false, // 是否得到焦点
            hoverLine: null, // 鼠标悬浮所在的层
            focusLine: null, // 焦点所在的层
            errorMessageObj: {}, // 错误信息 {0: '搜索词长度不能超过40字符', 2: '搜索词长度不能超过40字符'}
            errorIndexArray: [], // 存储错误信息的顺序，避免点击错误信息后乱序 [搜索词长度不能超过40字符', '不能为空']
            errorArrayObj: [], // 合并 props 的errorMessageArrayObj和backendErrorMessageObj，格式为{'搜索词长度不能超过40字符': [1, 2, 3]}
            commonValidate: commonValidate(args)
        };
    }

    componentWillMount() {
        this.handleErrorMessage(null, null, false);
    }

    componentWillReceiveProps(nextProps) {
        const fullValue = this.state.fullValue;
        const {value, title, maxLen, maxLenErrorMessage, errorMessageArrayObj, backendErrorMessageObj} = nextProps;
        const {
            title: beforeTitle,
            maxLen: beforeMaxLen,
            maxLenErrorMessage: beforeMaxLenErrorMessage,
            errorMessageArrayObj: beforeErrorMessageArrayObj,
            backendErrorMessageObj: beforeBackendErrorMessageObj
        } = this.props;
        // 保存时删除空行
        if (value.length !== fullValue.length
            || _.difference(fullValue, value).length
            || _.difference(value, fullValue).length) {
            this.setState({fullValue: value});
            // this.dispatchOnChange(value, null, null, false);
        }
        if (title !== beforeTitle || maxLen !== beforeMaxLen || maxLenErrorMessage !== beforeMaxLenErrorMessage) {
            this.setState({commonValidate: commonValidate(nextProps)});
        }
        if (!_.isEqual(errorMessageArrayObj, beforeErrorMessageArrayObj)
            || !_.isEqual(backendErrorMessageObj, beforeBackendErrorMessageObj)) {
            this.setErrorState(errorMessageArrayObj, backendErrorMessageObj, value);
        }
    }

    onStateChange = obj => {
        this.setState(obj);
    }

    onTextAreaInput = e => {
        const fullValue = e.target.value.split(this.props.lineBreak);
        if (this.___imeStart___) {
            this.setState({fullValue});
        } else {
            this.dispatchOnChange(fullValue);
        }
    }

    onDelAll = () => {
        this.dispatchOnChange([]);
    }

    onDelSingle = index => {
        const newValue = [...this.props.value];
        newValue.splice(index, 1);
        this.dispatchOnChange(newValue, index);
    }

    onDelErrorValues = indexArray => {
        const newValue = [...this.props.value];
        // 必须逆序
        const indexLen = indexArray.length;
        for (let i = indexLen; i > 0; i--) {
            newValue.splice(indexArray[i - 1], 1);
        }
        this.dispatchOnChange(newValue);
    }

    // 如果外部传进来，会再点查看会丢掉，这块不应该丢掉
    // 点击查看是已经包含外部错误信息，所以不需要 backendErrorMessageObj
    onStickErrorValues = indexArray => {
        const newValue = [...this.props.value];
        const {errorMessageObj, fullValue} = this.state;
        const newErrorMessageObj = {};
        const temp = []; // 存放遍历错误的实际位置

        let result = [];
        // 必须逆序
        const indexLen = indexArray.length;
        for (let i = indexLen; i > 0; i--) {
            const realI = i - 1;
            const realErrorIndex = indexArray[realI];
            // 按顺序的话，必须每次都放在前面
            result = [...newValue.splice(realErrorIndex, 1), ...result];
            newErrorMessageObj[realI] = errorMessageObj[realErrorIndex];
            temp.push(realI);
        }
        const fullValueLen = fullValue.length;
        for (let i = 0; i < fullValueLen; i++) {
            const realErrorMess = errorMessageObj[i];
            if (realErrorMess && indexArray.indexOf(i) === -1) {
                newErrorMessageObj[temp.length] = realErrorMess;
                temp.push(i);
            } else if (!realErrorMess) {
                temp.push(i);
            }
        }

        this.setState({
            errorMessageObj: newErrorMessageObj
        });

        this.dispatchOnChange([...result, ...newValue], null, handleErrorObj(newErrorMessageObj).errorMessageArrayObj);
        this.contentAnchor.scrollTop = 0;
    }

    onTextAreaKeyDown = e => {
        const keyCode = e.keyCode;
        const focusLine = this.state.focusLine;
        const value = this.props.value;
        const onStateChange = this.onStateChange;
        const newfocusLine = focusLine + 1;
        const valueLen = value.length;
        // 回车符、换行符
        if (keyCode === 13 || keyCode === 10) {
            onStateChange({focusLine: newfocusLine});
        // 方向键向下
        } else if (keyCode === 40) {
            if (valueLen > newfocusLine) {
                onStateChange({focusLine: newfocusLine});
            }
        // 方向键向上
        } else if (keyCode === 38) {
            if (focusLine >= 1) {
                onStateChange({focusLine: focusLine - 1});
            }
        // 方向键向左、向右、其他批量粘贴等
        } else {
            this.handleFocusLine();
        }
    }

    onMouseMove = e => {
        const contentRef = this.contentAnchor;
        this.setState({hoverLine: Math.floor(
            ((contentRef.scrollTop + e.clientY) - contentRef.getBoundingClientRect().y) / 28)});
    }

    onTextAreaBlur = () => {
        const {value, onBlur} = this.props;
        this.setState({
            hasFocus: false,
            focusLine: null
        });
        onBlur({value});
    }

    onTextAreaCompositionStart = () => {
        this.___imeStart___ = true;
    }

    onTextAreaCompositionEnd = e => {
        this.___imeStart___ = false;
        this.onTextAreaInput(e);
    }

    setErrorState(errorMessageArrayObj, backendErrorMessageObj, value) {
        const errorMessageObj = {};
        const errorIndexObj = {};
        const errorArrayObj = {
            ...errorMessageArrayObj
        };
        Object.keys(errorMessageArrayObj).forEach(error => {
            const indexArray = errorMessageArrayObj[error];
            if (Array.isArray(indexArray)) {
                indexArray.forEach(index => {
                    errorMessageObj[index] = error;
                });
            }

            errorIndexObj[error] = true;
        });
        handleBackendError(backendErrorMessageObj, value, errorMessageObj, errorIndexObj, errorArrayObj);
        this.setState({
            errorMessageObj,
            errorIndexArray: Object.keys(errorIndexObj).sort(),
            errorArrayObj
        });
    }

    handleFocusLine = setFocusFlag => {
        setTimeout(() => {
            const value = this.state.fullValue;
            const valueLen = value.length;
            const selectionStart = this.textAreaAnchor.selectionStart;
            const focusLine = this.state.focusLine;
            let sumLen = 0;
            let newFocusLine = 0;
            for (let i = 0; i < valueLen; i++) {
                if (sumLen <= selectionStart) {
                    newFocusLine = i;
                    sumLen += value[i].length + 1; // 换行符的长度
                } else {
                    break;
                }
            }
            if (focusLine !== newFocusLine || setFocusFlag) {
                this.setState({
                    hasFocus: true,
                    focusLine: newFocusLine
                });
            }
        }, 100);
    }

    dispatchOnChange = (value, index, errorMessageArrayObj, needChange = true) => {
        this.setState({fullValue: value});
        if (errorMessageArrayObj) {
            this.setState({errorArrayObj: errorMessageArrayObj});
        } else {
            errorMessageArrayObj = this.handleErrorMessage(value, index);
        }
        if (needChange) {
            this.props.onChange({value, errorMessageArrayObj});
        }
    }

    handleErrorMessage = (newValue, newIndex, showError = true) => {
        const {value, validate} = this.props;
        const {errorMessageObj, commonValidate} = this.state;
        const realValue = newValue || value;
        let newErrorMessageObj = {};
        if (newIndex != null) {
            // 只有单个删除时，才会有newIndex
            newErrorMessageObj = {...errorMessageObj};
            const valueLen = realValue.length + 1; // 一定要 + 1，否则最后一行有错误时会一直新增
            for (let i = newIndex; i < valueLen; i++) {
                newErrorMessageObj[i] = newErrorMessageObj[i + 1];
            }
        } else {
            newErrorMessageObj = getErrorMessage(realValue, [validate, commonValidate]);
        }
        const params = {
            ...this.props,
            errorMessage: newErrorMessageObj,
            value: realValue
        };
        const {
            errorMessageArrayObj: newErrorMessageArrayObj,
            errorIndexArray,
            errorMessageObj: afterErrorMessageObj
        } = handleErrorMessageArray(params);
        const errorMessageArrayObj = showError ? newErrorMessageArrayObj : {};

        this.setState({
            errorMessageObj: afterErrorMessageObj,
            errorIndexArray,
            errorArrayObj: errorMessageArrayObj
        });
        return errorMessageArrayObj;
    }

    addAnchor = (key, el) => {
        this[key] = el;
    }

    render() {
        const props = this.props;
        const {
            prefixCls,
            title,
            minLine,
            maxLine,
            showAllDel,
            placeholder,
            TitleRender,
            operationRender,
            maxLen,
            style,
            width,
            height,
            lineBreak,
            handleErrorMessage,
            showHandleError,
            inputDisabled
        } = props;
        const realWidth = width || style.width;
        const realHeight = height || style.height;
        const {errorMessageObj, hasFocus, focusLine, hoverLine, fullValue, errorIndexArray, errorArrayObj} = this.state;
        // 不能直接使用errorIndexArray因为初次会显示错误信息（不能为空）;
        const isShowError = !!(Object.keys(errorArrayObj).length);
        const containerProps = {
            className: prefixCls
        };
        const mainClass = `${prefixCls}-main`;
        const mainProps = {
            className: mainClass,
            style: {
                ...style,
                width: realWidth,
                height: realHeight
            }
        };
        // main -- title
        const mainTitle = `${mainClass}-title`;
        const titleProps = {
            className: mainTitle
        };
        const totalLine = fullValue.length;
        const realTotalLine = getNoEmptyArrayLength(fullValue);
        const titleCountProps = {
            className: classNames({
                [`${mainTitle}-count`]: 1,
                [`${prefixCls}-pure-error`]: (maxLine != null && realTotalLine > maxLine) || (minLine != null && realTotalLine < minLine && realTotalLine)
            })
        };
        const opearteProps = {
            className: `${mainTitle}-operate-area`
        };
        const delAllProps = {
            onClick: this.onDelAll
        };
        // main -- content
        const mainContent = `${mainClass}-content`;
        const mainContentClass = classNames(
            mainContent,
            {
                [`${mainContent}-error`]: isShowError
            }
        );
        const contentProps = {
            className: mainContentClass,
            ref: _.partial(this.addAnchor, 'contentAnchor'),
            style: {
                height: realHeight - 47
            }
        };
        const mainContentTable = `${mainContent}-table`;
        const tableProps = {
            className: mainContentTable,
            onMouseLeave: _.partial(this.onStateChange, {hoverLine: null}),
            onMouseMove: this.onMouseMove
        };
        const textLineNoList = `${mainContentTable}-no-list`;
        const textLineContent = `${mainContentTable}-content`;
        const onFocus = _.partial(this.handleFocusLine, true);
        const textAreaProps = {
            style: {
                width: realWidth - 90
            },
            disabled: inputDisabled,
            value: fullValue.join(lineBreak),
            ref: _.partial(this.addAnchor, 'textAreaAnchor'),
            placeholder,
            className: `${mainContent}-text-area`,
            onInput: this.onTextAreaInput,
            onChange: _.noop,
            onCompositionStart: this.onTextAreaCompositionStart,
            onCompositionEnd: this.onTextAreaCompositionEnd,
            onFocus,
            onBlur: this.onTextAreaBlur,
            onClick: onFocus,
            onKeyDown: this.onTextAreaKeyDown,
            spellCheck: false // 禁用拼写检查
        };
        // error
        const errorClass = `${prefixCls}-error`;
        const errorProps = {
            className: classNames({
                [errorClass]: isShowError
            })
        };
        return (
            <div {...containerProps}>
                <div {...mainProps}>
                    <div {...titleProps}>
                        {TitleRender ? showRender(TitleRender) : <span>{title}</span>}
                        {
                            maxLine != null
                                ? (
                                    <span {...titleCountProps}>
                                        (
                                        {handleCountTips(totalLine, maxLine)}
                                        )
                                    </span>
                                )
                                : null
                        }
                        <span {...opearteProps}>
                            {showAllDel ? <span {...delAllProps}>删除全部</span> : null}
                        </span>
                    </div>
                    <div {...contentProps}>
                        <table {...tableProps}>
                            <tbody>
                                <tr>
                                    <td className={textLineNoList}>
                                        {
                                            fullValue.map((currentValue, index) => {
                                                const showError = errorMessageObj[index];
                                                const textLineNo = `${textLineNoList}-no`;
                                                const lineNumberProps = {
                                                    key: `${textLineNoList}-${index}`,
                                                    className: classNames(
                                                        textLineNo,
                                                        {
                                                            [`${prefixCls}-pure-error`]: showError
                                                        }
                                                    )
                                                };
                                                const no = 'textline-real-no';
                                                const noContainerClass = classNames(
                                                    no,
                                                    {
                                                        [`${no}-error`]: showError
                                                    }
                                                );
                                                return (
                                                    <div {...lineNumberProps}>
                                                        <div className={noContainerClass}>
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                    <td className={textLineContent}>
                                        <div className={`${textLineContent}-container`}>
                                            {
                                                fullValue.map((currentValue, index) => {
                                                    const isHoverLine = hoverLine === index;
                                                    const isFoucusLine = focusLine === index;
                                                    const showFocus = hasFocus && isFoucusLine;
                                                    const textLineContentOpt = `${textLineContent}-opt`;
                                                    const errorMessage = errorMessageObj[index];
                                                    const currentValueLen = getRealLength(props, currentValue);
                                                    const lineAnchor = `lineAnchor${index}`;
                                                    // text 操作行
                                                    const lineOptContainerProps = {
                                                        className: classNames({
                                                            [textLineContentOpt]: 1,
                                                            [`${textLineContentOpt}-active`]: isHoverLine || showFocus
                                                        }),
                                                        onMouseEnter: _.partial(this.onStateChange, {hoverLine: index}),
                                                        ref: _.partial(this.addAnchor, lineAnchor),
                                                        key: `${textLineContentOpt}-${index}`
                                                    };
                                                    const textCountClassName = {
                                                        className: classNames({
                                                            'textline-text-count': 1,
                                                            [`${prefixCls}-pure-error`]: currentValueLen > maxLen
                                                        })
                                                    };
                                                    const delSingleProps = {
                                                        className: classNames({
                                                            'textline-del-single': 1,
                                                            'new-fc-one-icon': 1,
                                                            'new-fc-one-icon-close': 1
                                                        }),
                                                        onClick: _.partial(this.onDelSingle, index)
                                                    };
                                                    const hoverRender = isHoverLine
                                                        ? (operationRender || <div {...delSingleProps} />)
                                                        : null;
                                                    const errorLink = {
                                                        className: `${prefixCls}-error-link`,
                                                        onClick: handleErrorMessage(currentValue, index)
                                                    };
                                                    return (
                                                        <div {...lineOptContainerProps}>
                                                            {
                                                                showFocus ? (
                                                                    <span {...textCountClassName}>
                                                                        {handleCountTips(currentValueLen, maxLen)}
                                                                    </span>
                                                                ) : hoverRender
                                                            }
                                                            {
                                                                hasFocus && errorMessage && isFoucusLine
                                                                    ? (
                                                                        <div className="textline-error-message">
                                                                            {errorMessage}
                                                                            {showHandleError
                                                                                ? <span {...errorLink}>优化操作</span>
                                                                                : null}
                                                                        </div>
                                                                    )
                                                                    : null
                                                            }
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                        <textarea {...textAreaProps} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div {...errorProps}>
                    {
                        errorIndexArray.map((error, index) => {
                            let errorArray = errorArrayObj[error];
                            if (!errorArray) {
                                return null;
                            }
                            let len;
                            if (Array.isArray(errorArray)) {
                                len = errorArray.length;
                                errorArray = sortArraySequence(errorArray);
                            }
                            const delProps = {
                                className: `${errorClass}-link`,
                                onClick: _.partial(this.onDelErrorValues, errorArray)
                            };
                            const viewProps = {
                                className: `${errorClass}-link`,
                                onClick: _.partial(this.onStickErrorValues, errorArray)
                            };
                            const key = `textline-error-${index}`;
                            return len ? (
                                <div key={key}>
                                    {error}
，共
                                    {len}
个
                                    <span {...viewProps}>查看</span>
                                    <span {...delProps}>删除</span>
                                </div>
                            ) : <div key={key}>{error}</div>;
                        })
                    }
                </div>
            </div>
        );
    }
}
