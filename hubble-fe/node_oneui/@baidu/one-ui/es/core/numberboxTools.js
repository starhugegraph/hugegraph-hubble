/**
 * NumberBox 工具集
 * @author chenxiao
 * @email companyforme@gmail.com
 */

/**
 * 过滤掉字符串中所有非数字，包括串中间的负号、第二次出现的小数点、前方不合法的0
 *
 * @interface charFilter
 * @param {String|number} value 待处理的串
 * @return {String} 过滤后数字串
 */
export var charFilter = function charFilter(value) {
  value = typeof value === 'string' || typeof value === 'number' ? "" + value : '';
  if (value.length === 0) return value;
  value = value.replace(/。/g, '.'); // 过滤非法字符

  var str = '-.0123456789';
  var result = '';

  for (var i = 0; i < value.length; i++) {
    var _char = value.charAt(i);

    if (str.indexOf(_char) < 0 || _char === '-' && i > 0 || _char === '.' && result.indexOf('.') > -1) {
      continue;
    }

    result += _char;
  }

  if (result.length === 0) return result; // 去除前方非法0

  while (result.charAt(0) === '0' && result.length > 1 && result.charAt(1) !== '.') {
    result = result.substr(1, result.length);
  } // 小数点前自动添0


  if (result.charAt(0) === '.') {
    result = "0" + result;
  }

  return result;
};

var getResultValue = function getResultValue(originValue, value) {
  return originValue != null ? originValue : value;
};
/**
 * 数字区间过滤，在区间内，返回值，否则返回区间边界
 * @interface regionFilter
 * @param {String|number} value 待处理值
 * @param {number} max 最大值
 * @param {number} min 最小值
 * @return {String|Number} 在区间内的值
 */


export var rangeFilter = function rangeFilter(value, _ref) {
  var max = _ref.max,
      min = _ref.min,
      originValue = _ref.originValue;

  if (isNaN(value)) {
    return NaN;
  }

  var result = value;
  min = isNaN(min) ? Number.NEGATIVE_INFINITY : parseFloat(min);
  max = isNaN(max) ? Number.POSITIVE_INFINITY : parseFloat(max);

  if (min > max) {
    var tmpValue = min;
    min = max;
    max = tmpValue;
  }

  result = result > max ? getResultValue(originValue, max) : result;
  result = result < min ? getResultValue(originValue, min) : result;
  return result;
};
/**
 * 截取小数点，四舍五入
 * @interface fixed
 * @param {String} value 是合法数字字符串
 * @param {Number} fixed 小数位数
 * @return {String} 截取了小数部分的数字字符串
 */

export var fixed = function fixed(value, _fixed) {
  value = typeof value === 'string' || typeof value === 'number' ? "" + value : '';
  _fixed = isNaN(_fixed) ? 2 : parseInt(_fixed, 10);
  var arr = value.split('.').slice(0, 2);

  if (arr.length > 1 && arr[1].length > _fixed) {
    arr[1] = arr[1].slice(0, _fixed);
  }

  if (arr.length > 1) {
    return arr.join('.');
  }

  if (arr.length === 1) {
    return arr[0];
  }

  if (arr.length === 0) {
    return '';
  }
};
/**
 * 根据配置将字符串处理成合法数字
 * @interface numberFormater
 * @param {String} value 字符串
 * @param {Object} config 配置参数
 * @param {Number} config.max 最大值
 * @param {Number} config.min 最小值
 * @param {String} config.type 类型，int或float
 * @param {Number} config.fixed 小数位数，只在type=float时才有用
 * @return {String} 符合要求的数字字符串
 */

export var numberFormater = function numberFormater(value, config, isRangeFormat) {
  config = config || {};
  value = charFilter(value);

  if (!value.length || value === '-' || value === '.') {
    return value;
  }

  if (isNaN(value)) {
    return '';
  }

  if (isRangeFormat) {
    value = rangeFilter(value, config);
  }

  return config.type === 'int' ? value.split('.')[0] : fixed(value, config.fixed);
}; // 格式化

export var rangeFormater = function rangeFormater(value, config) {
  return "" + rangeFilter(value, config);
};
/**
 * 根据对应的按键操作，转换成对应的值输出
 * @interface changeNumber
 * @param {String} stepValue 调节按钮点击时值跳动的步频
 * @param {Number} config 配置参数
 * @param {Number} optValue 最大值
 * @return {Number} 符合要求的数字
 */

export var changeNumber = function changeNumber(initialValue, stepValue, optValue) {
  var stringStep = "" + stepValue;
  var initialDigit = 0;
  var stepDigit = 0;

  if (initialValue.indexOf('.') > 0) {
    initialDigit = initialValue.split('.')[1].length;
  }

  if (stringStep.indexOf('.') > 0) {
    stepDigit = stringStep.split('.')[1].length;
  }

  var fixed = Math.max(initialDigit, stepDigit);
  initialValue = Number(initialValue);
  stepValue = Number(stepValue);
  return +parseFloat(initialValue + optValue * stepValue).toFixed(fixed);
};