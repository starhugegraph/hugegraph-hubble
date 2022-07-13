/**
 * @file 单行文本输入框公共信息
 *
 * @author Shan Qianmin
 * @date 2018/09/07
 */
import {getRealLength} from './commonTools';

export const defaultInputWidth = 300;

export const handleErrorMessage = (props, needMinError = true, onlyStateError = false) => {
    const {
        maxLen,
        minLen,
        isRequired,
        requiredErrorMessage,
        maxLenErrorMessage,
        minLenErrorMessage,
        value,
        title = '',
        errorMessage
    } = props;
    if (errorMessage != null && !onlyStateError) {
        return errorMessage;
    }
    const valueLen = getRealLength(props, value);
    if (isRequired && !valueLen) {
        return requiredErrorMessage || `请输入${title}`;
    }
    if (maxLen != null && valueLen > maxLen) {
        const overLen = valueLen - maxLen;
        return maxLenErrorMessage || `已超出${overLen}个字符`;
    }
    if (needMinError && minLen != null && valueLen && valueLen < minLen) {
        return minLenErrorMessage || `最少${minLen}个字符`;
    }
    if (onlyStateError) {
        return '';
    }
    return errorMessage;
};

export const isMaxLenError = ({
    value,
    maxLen,
    ...props
}) => maxLen != null && getRealLength(props, value) > maxLen;

export const isMinLenError = ({
    value,
    minLen,
    ...props
}) => minLen != null && getRealLength(props, value) < minLen;

export const fixControlledValue = value => {
    if (value == null) {
        return '';
    }
    return value;
};

export const commonRemoveProps = [
    'maxLen',
    'minLen',
    'errorLocation',
    'errorMessage',
    'isRequired',
    'requiredErrorMessage',
    'maxLenErrorMessage',
    'minLenErrorMessage',
    'countMode',
    'getLength'
];

export const moveToEnd = inputElement => {
    const inputElementLength = (inputElement && inputElement.value && inputElement.value.length) || 0;
    if (document && document.selection) {
        const inputRange = inputElement.createTextRange();
        inputRange.moveStart('character', inputElementLength);
        inputRange.collapse();
        inputRange.select();
    } else if (typeof inputElement.selectionStart === 'number' && typeof inputElement.selectionEnd === 'number') {
        inputElement.selectionStart = inputElementLength;
        inputElement.selectionEnd = inputElementLength;
    }
};
