function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @file 多行输入框帮助方法
 * @author shanqianmin
 * @date 2018/06/20
 */
import _ from 'lodash';
import { getRealLength, getAllIndexFromArray, getNoEmptyArray } from './commonTools'; // 公共校验方法
// 1. 字符超限校验

export var commonValidate = function commonValidate(params) {
  return function (value) {
    var maxLen = params.maxLen,
        maxLenErrorMessage = params.maxLenErrorMessage,
        title = params.title;

    if (maxLen != null && getRealLength(params, value) > maxLen) {
      return maxLenErrorMessage || title + "\u4E0D\u80FD\u8D85\u8FC7" + maxLen + "\u5B57\u7B26";
    }

    return '';
  };
}; // 1、判断 validateFunc 是否是数组，
//  a) 如果是，则只使用validateFunc对 textline 的数据进行校验
//  b) 如果只是方法，则将会将此方法和公共的校验方法合并为数组
//   return {'0': '搜索词为空'，'1': 'url 格式不正确'}

export var getErrorMessage = function getErrorMessage(valueArray, validateFunc, params) {
  var realValidateArray = [];

  if (Array.isArray(validateFunc)) {
    realValidateArray = [].concat(validateFunc);
  } else {
    if (validateFunc) {
      realValidateArray.push(validateFunc);
    }

    realValidateArray.push(commonValidate(params));
  }

  var newErrorMessageObj = {};
  var validateLen = realValidateArray.length;
  valueArray.forEach(function (currentValue, index) {
    if (currentValue) {
      var errorMessage = '';

      for (var i = 0; i < validateLen; i++) {
        errorMessage = realValidateArray[i](currentValue);

        if (errorMessage) {
          break;
        }
      }

      newErrorMessageObj[index] = errorMessage;
    }
  });
  return newErrorMessageObj;
}; // params {'0': '搜索词为空'，'1': 'url 格式不正确'}
// return
// {
//     errorMessageArrayObj: {'搜索词为空': [1, 2, 3]},
//     errorIndexObj: {'搜索词为空': true}
// }

export var handleErrorObj = function handleErrorObj(errorMessageObj) {
  var errorMessageArrayObj = {};
  var errorIndexObj = {};
  Object.keys(errorMessageObj).forEach(function (index) {
    index = +index;
    var errorMessage = errorMessageObj[index];

    if (errorMessage) {
      var errorMessageArray = errorMessageArrayObj[errorMessage] || [];
      errorMessageArrayObj[errorMessage] = [].concat(errorMessageArray, [index]);
      errorIndexObj[errorMessage] = true;
    }
  });
  return {
    errorMessageArrayObj: errorMessageArrayObj,
    errorIndexObj: errorIndexObj
  };
}; // params {'鲜花': '关键字触犯注册商标规则'}
// return
// {
//     errorMessageObj: {'0': '搜索词为空'，'1': 'url 格式不正确'},
//     errorIndexObj: {'搜索词为空': true},
//     errorArrayObj: {'搜索词长度不能超过40字符': [1, 2, 3]}
// }

export var handleBackendError = function handleBackendError(backendErrorMessageObj, value, errorMessageObj, errorIndexObj, errorArrayObj) {
  if (errorMessageObj === void 0) {
    errorMessageObj = {};
  }

  if (errorIndexObj === void 0) {
    errorIndexObj = {};
  }

  if (errorArrayObj === void 0) {
    errorArrayObj = {};
  }

  Object.keys(backendErrorMessageObj).forEach(function (errorValue) {
    var errorMessage = backendErrorMessageObj[errorValue];
    var indexArray = getAllIndexFromArray(value, errorValue);

    if (indexArray.length) {
      indexArray.forEach(function (index) {
        errorMessageObj[index] = errorMessage;
      });
      errorIndexObj[errorMessage] = true;
      errorArrayObj[errorMessage] = _.union(errorArrayObj[errorMessage], indexArray);
    }
  });
  return {
    errorMessageObj: errorMessageObj,
    errorIndexObj: errorIndexObj,
    errorArrayObj: errorArrayObj
  };
};

var getErrorObj = function getErrorObj(result, errorIndexObj, errorMessageObj) {
  return {
    errorMessageArrayObj: result,
    errorIndexArray: Object.keys(errorIndexObj).sort(),
    errorMessageObj: errorMessageObj
  };
}; // 返回
// {
//     errorMessageArrayObj: {'搜索词为空': [1, 2, 3]}
//     errorIndexArray: ['搜索词为空', 'url 格式不正确'],
//     errorMessageObj: {0: '搜索词为空', 1: '搜索词为空'}
// }


export var handleErrorMessageArray = function handleErrorMessageArray(_ref) {
  var _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? true : _ref$isRequired,
      requiredErrorMessage = _ref.requiredErrorMessage,
      maxLineErrorMessage = _ref.maxLineErrorMessage,
      minLineErrorMessage = _ref.minLineErrorMessage,
      title = _ref.title,
      maxLine = _ref.maxLine,
      minLine = _ref.minLine,
      value = _ref.value,
      _ref$errorMessage = _ref.errorMessage,
      errorMessage = _ref$errorMessage === void 0 ? {} : _ref$errorMessage,
      _ref$backendErrorMess = _ref.backendErrorMessageObj,
      backendErrorMessageObj = _ref$backendErrorMess === void 0 ? {} : _ref$backendErrorMess,
      isUnique = _ref.isUnique,
      uniqueErrorMessage = _ref.uniqueErrorMessage;

  var errorMessageObj = _extends({}, errorMessage);

  var _handleErrorObj = handleErrorObj(errorMessage),
      result = _handleErrorObj.errorMessageArrayObj,
      errorIndexObj = _handleErrorObj.errorIndexObj;

  handleBackendError(backendErrorMessageObj, value, errorMessageObj, errorIndexObj, result);
  var realValue = getNoEmptyArray(value);
  var valueLen = realValue.length;

  if (isRequired && !valueLen) {
    var requireError = requiredErrorMessage || "\u8BF7\u8F93\u5165" + title;
    result[requireError] = true;
    errorIndexObj[requireError] = true;
    return getErrorObj(result, errorIndexObj, errorMessageObj);
  }

  if (maxLine != null && valueLen > maxLine) {
    var overLen = valueLen - maxLine;
    var maxError = maxLineErrorMessage || title + "\u5DF2\u8D85\u51FA" + overLen + "\u4E2A";
    result[maxError] = true;
    errorIndexObj[maxError] = true;
  }

  if (minLine != null && valueLen < minLine) {
    var minError = minLineErrorMessage || title + "\u6700\u5C11" + minLine + "\u4E2A";
    result[minError] = true;
    errorIndexObj[minError] = true;
  }

  if (isUnique) {
    var uniqueError = uniqueErrorMessage || title + "\u91CD\u590D";
    var uniqueIndexArray = [];

    if (_.uniq(realValue).length !== valueLen) {
      realValue.forEach(function (value, index) {
        var indexArray = getAllIndexFromArray(realValue, value);

        if (indexArray.length > 1 && uniqueIndexArray.indexOf(index) === -1) {
          uniqueIndexArray = [].concat(uniqueIndexArray, indexArray.slice(1));
        }
      });
      result[uniqueError] = _.union(result[uniqueError], uniqueIndexArray);
      errorIndexObj[uniqueError] = true;
    }
  }

  return getErrorObj(result, errorIndexObj, errorMessageObj);
}; // 该方法可以实现两个容器同时滚动绑定，有一定的dom结构
// @author huangshiming

export var twoContainerBindScroll = function twoContainerBindScroll(leftContainer, rightContainer) {
  var textLineContentChild = leftContainer.childNodes;
  var priceListChild = rightContainer.childNodes;

  if (!textLineContentChild || !textLineContentChild) {
    return false;
  } // 标志位，用来设置当前滚动的区域


  var currentTab = 0;
  var scale = (priceListChild[0].offsetHeight - rightContainer.offsetHeight) / (textLineContentChild[0].offsetHeight - leftContainer.offsetHeight);
  leftContainer.addEventListener('mouseover', function () {
    currentTab = 1;
  });
  rightContainer.addEventListener('mouseover', function () {
    currentTab = 2;
  });

  var leftScrollHandle = function leftScrollHandle() {
    if (currentTab !== 1) {
      return false;
    }

    rightContainer.scrollTop = leftContainer.scrollTop * scale;
  };

  var rightScrollHandle = function rightScrollHandle() {
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