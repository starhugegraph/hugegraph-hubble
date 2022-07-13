/**
 * @file 多行输入框帮助方法
 * @author shanqianmin
 * @date 2018/06/20
 */
import _ from 'lodash';
import {getRealLength, getAllIndexFromArray, getNoEmptyArray} from './commonTools';

// 公共校验方法
// 1. 字符超限校验
export const commonValidate = params => value => {
    const {maxLen, maxLenErrorMessage, title} = params;
    if (maxLen != null && getRealLength(params, value) > maxLen) {
        return maxLenErrorMessage || `${title}不能超过${maxLen}字符`;
    }
    return '';
};

// 1、判断 validateFunc 是否是数组，
//  a) 如果是，则只使用validateFunc对 textline 的数据进行校验
//  b) 如果只是方法，则将会将此方法和公共的校验方法合并为数组
//   return {'0': '搜索词为空'，'1': 'url 格式不正确'}
export const getErrorMessage = (valueArray, validateFunc, params) => {
    let realValidateArray = [];
    if (Array.isArray(validateFunc)) {
        realValidateArray = [...validateFunc];
    } else {
        if (validateFunc) {
            realValidateArray.push(validateFunc);
        }
        realValidateArray.push(commonValidate(params));
    }
    const newErrorMessageObj = {};
    const validateLen = realValidateArray.length;
    valueArray.forEach((currentValue, index) => {
        if (currentValue) {
            let errorMessage = '';
            for (let i = 0; i < validateLen; i++) {
                errorMessage = realValidateArray[i](currentValue);
                if (errorMessage) {
                    break;
                }
            }
            newErrorMessageObj[index] = errorMessage;
        }
    });
    return newErrorMessageObj;
};

// params {'0': '搜索词为空'，'1': 'url 格式不正确'}
// return
// {
//     errorMessageArrayObj: {'搜索词为空': [1, 2, 3]},
//     errorIndexObj: {'搜索词为空': true}
// }
export const handleErrorObj = errorMessageObj => {
    const errorMessageArrayObj = {};
    const errorIndexObj = {};
    Object.keys(errorMessageObj).forEach(index => {
        index = +index;
        const errorMessage = errorMessageObj[index];
        if (errorMessage) {
            const errorMessageArray = errorMessageArrayObj[errorMessage] || [];
            errorMessageArrayObj[errorMessage] = [...errorMessageArray, index];
            errorIndexObj[errorMessage] = true;
        }
    });
    return {errorMessageArrayObj, errorIndexObj};
};

// params {'鲜花': '关键字触犯注册商标规则'}
// return
// {
//     errorMessageObj: {'0': '搜索词为空'，'1': 'url 格式不正确'},
//     errorIndexObj: {'搜索词为空': true},
//     errorArrayObj: {'搜索词长度不能超过40字符': [1, 2, 3]}
// }
export const handleBackendError = (
    backendErrorMessageObj, value, errorMessageObj = {}, errorIndexObj = {}, errorArrayObj = {}
) => {
    Object.keys(backendErrorMessageObj).forEach(errorValue => {
        const errorMessage = backendErrorMessageObj[errorValue];
        const indexArray = getAllIndexFromArray(value, errorValue);
        if (indexArray.length) {
            indexArray.forEach(index => {
                errorMessageObj[index] = errorMessage;
            });
            errorIndexObj[errorMessage] = true;
            errorArrayObj[errorMessage] = _.union(errorArrayObj[errorMessage], indexArray);
        }
    });
    return {errorMessageObj, errorIndexObj, errorArrayObj};
};

const getErrorObj = (result, errorIndexObj, errorMessageObj) => ({
    errorMessageArrayObj: result,
    errorIndexArray: Object.keys(errorIndexObj).sort(),
    errorMessageObj
});

// 返回
// {
//     errorMessageArrayObj: {'搜索词为空': [1, 2, 3]}
//     errorIndexArray: ['搜索词为空', 'url 格式不正确'],
//     errorMessageObj: {0: '搜索词为空', 1: '搜索词为空'}
// }
export const handleErrorMessageArray = ({
    isRequired = true,
    requiredErrorMessage,
    maxLineErrorMessage,
    minLineErrorMessage,
    title,
    maxLine,
    minLine,
    value,
    errorMessage = {},
    backendErrorMessageObj = {},
    isUnique,
    uniqueErrorMessage
}) => {
    const errorMessageObj = {
        ...errorMessage
    };
    const {errorMessageArrayObj: result, errorIndexObj} = handleErrorObj(errorMessage);
    handleBackendError(backendErrorMessageObj, value, errorMessageObj, errorIndexObj, result);
    const realValue = getNoEmptyArray(value);
    const valueLen = realValue.length;
    if (isRequired && !valueLen) {
        const requireError = (requiredErrorMessage || `请输入${title}`);
        result[requireError] = true;
        errorIndexObj[requireError] = true;
        return getErrorObj(result, errorIndexObj, errorMessageObj);
    }
    if (maxLine != null && valueLen > maxLine) {
        const overLen = valueLen - maxLine;
        const maxError = maxLineErrorMessage || `${title}已超出${overLen}个`;
        result[maxError] = true;
        errorIndexObj[maxError] = true;
    }
    if (minLine != null && valueLen < minLine) {
        const minError = minLineErrorMessage || `${title}最少${minLine}个`;
        result[minError] = true;
        errorIndexObj[minError] = true;
    }
    if (isUnique) {
        const uniqueError = uniqueErrorMessage || `${title}重复`;
        let uniqueIndexArray = [];
        if (_.uniq(realValue).length !== valueLen) {
            realValue.forEach((value, index) => {
                const indexArray = getAllIndexFromArray(realValue, value);
                if (indexArray.length > 1 && uniqueIndexArray.indexOf(index) === -1) {
                    uniqueIndexArray = [...uniqueIndexArray, ...indexArray.slice(1)];
                }
            });
            result[uniqueError] = _.union(result[uniqueError], uniqueIndexArray);
            errorIndexObj[uniqueError] = true;
        }
    }
    return getErrorObj(result, errorIndexObj, errorMessageObj);
};

// 该方法可以实现两个容器同时滚动绑定，有一定的dom结构
// @author huangshiming
export const twoContainerBindScroll = (leftContainer, rightContainer) => {
    const textLineContentChild = leftContainer.childNodes;
    const priceListChild = rightContainer.childNodes;
    if (!textLineContentChild || !textLineContentChild) {
        return false;
    }
    // 标志位，用来设置当前滚动的区域
    let currentTab = 0;
    const scale = (priceListChild[0].offsetHeight - rightContainer.offsetHeight)
        / (textLineContentChild[0].offsetHeight - leftContainer.offsetHeight);
    leftContainer.addEventListener('mouseover', () => {
        currentTab = 1;
    });
    rightContainer.addEventListener('mouseover', () => {
        currentTab = 2;
    });

    const leftScrollHandle = () => {
        if (currentTab !== 1) {
            return false;
        }
        rightContainer.scrollTop = leftContainer.scrollTop * scale;
    };

    const rightScrollHandle = () => {
        if (currentTab !== 2) {
            return false;
        }
        leftContainer.scrollTop = rightContainer.scrollTop / scale;
    };

    leftContainer.removeEventListener('scroll', leftScrollHandle);
    leftContainer.addEventListener('scroll', leftScrollHandle);

    rightContainer.removeEventListener('scroll', rightScrollHandle);
    rightContainer.addEventListener('scroll', rightScrollHandle);
};
