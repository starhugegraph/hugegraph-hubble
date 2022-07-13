"use strict";

exports.__esModule = true;
exports.flatArray = flatArray;
exports.treeMap = treeMap;
exports.flatFilter = flatFilter;
exports.createStore = createStore;
exports.remove = remove;
exports.intersperseSpace = exports.getScroll = exports.transSizeOfDefault = exports.stopPropagation = exports.locationRemoveProps = exports.noop = exports.getNoEmptyArrayLength = exports.getNoEmptyArray = exports.flattern = exports.strIsNumber = exports.sortArraySequence = exports.getAllIndexFromArray = exports.showRender = exports.handleCountTips = exports.getRealLength = exports.getLengthInBytes = exports.CHINA_COUNT_MODE = exports.handleEventParams = exports.handleControlled = exports.COUNT_MODE = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var COUNT_MODE = {
  CHINA: 'cn',
  ENGLISH: 'en'
};
exports.COUNT_MODE = COUNT_MODE;

var handleControlled = function handleControlled(propsKey, stateKey) {
  return propsKey == null ? stateKey : propsKey;
};

exports.handleControlled = handleControlled;

var handleEventParams = function handleEventParams(e, that) {
  if (e === void 0) {
    e = {};
  }

  var _that$state = that.state,
      value = _that$state.value,
      errorMessage = _that$state.errorMessage;
  e.value = value;
  e.errorMessage = errorMessage;
  return e;
};

exports.handleEventParams = handleEventParams;

var handleFilter = function handleFilter(str, arr) {
  if (str === void 0) {
    str = '';
  }

  if (arr === void 0) {
    arr = [];
  }

  arr.forEach(function (element) {
    if (typeof element === 'string') {
      str = str.replace(new RegExp(element, 'g'), '');
    }
  });
  return str;
};

var CHINA_COUNT_MODE = COUNT_MODE.CHINA;
exports.CHINA_COUNT_MODE = CHINA_COUNT_MODE;
var ENGLISH_COUNT_MODE = COUNT_MODE.ENGLISH;

var getLengthInBytes = function getLengthInBytes(str, needTrim, filterArray, countMode) {
  if (needTrim === void 0) {
    needTrim = true;
  }

  if (filterArray === void 0) {
    filterArray = [];
  }

  if (countMode === void 0) {
    countMode = CHINA_COUNT_MODE;
  }

  if (str == null) {
    return 0;
  }

  if (!_lodash["default"].isString(str) && !_lodash["default"].isNumber(str)) {
    throw new Error('传入的数据为非字符串或数字');
  }

  if (needTrim) {
    str = ("" + str).trim();
  }

  if (filterArray.length) {
    str = handleFilter(str, filterArray);
  }

  var b = str.match(/[^\x20-\xff]/g);
  return str.length + (!b || countMode === ENGLISH_COUNT_MODE ? 0 : b.length);
};

exports.getLengthInBytes = getLengthInBytes;

var getRealLength = function getRealLength(_ref, value) {
  var getLength = _ref.getLength,
      filterArray = _ref.filterArray,
      countMode = _ref.countMode;
  return getLength ? getLength(value) : getLengthInBytes(value, true, filterArray, countMode);
};

exports.getRealLength = getRealLength;

var handleCountTips = function handleCountTips(currentLine, maxLine) {
  return maxLine != null ? currentLine + "/" + maxLine : null;
}; // 如果是组件显示组件，如果是node显示node


exports.handleCountTips = handleCountTips;

var showRender = function showRender(render) {
  return typeof render === 'function' ? render() : render;
};

exports.showRender = showRender;

var getAllIndex = function getAllIndex(array, value, fromIndex, result) {
  if (fromIndex === void 0) {
    fromIndex = 0;
  }

  var index = array.indexOf(value, fromIndex);

  if (index !== -1) {
    result.push(index);
    getAllIndex(array, value, index + 1, result);
  }
};

var getAllIndexFromArray = function getAllIndexFromArray(array, value) {
  var result = [];
  getAllIndex(array, value, 0, result);
  return result;
}; // 顺序排序


exports.getAllIndexFromArray = getAllIndexFromArray;

var sortArraySequence = function sortArraySequence(array) {
  return array.sort(function (a, b) {
    return a - b;
  });
}; // 校验字符串是否是数字


exports.sortArraySequence = sortArraySequence;

var strIsNumber = function strIsNumber(value) {
  return /^[1-9]\d*$/.test(value);
}; // 数组展平


exports.strIsNumber = strIsNumber;

var flattern = function flattern(options) {
  var newOptions = [];

  _lodash["default"].map(options, function (option) {
    newOptions.push(option);

    if (option.children && option.children.length) {
      _lodash["default"].map(option.children, function (item, index) {
        option.children[index].parent = [option.label];
        option.children[index].parentValue = ["" + option.value];
      });

      newOptions = newOptions.concat(option.children);
    }
  });

  return newOptions;
}; // 将空行过滤掉


exports.flattern = flattern;

var getNoEmptyArray = function getNoEmptyArray(array) {
  if (array === void 0) {
    array = [];
  }

  return array.filter(function (currentValue) {
    return currentValue.trim();
  });
};

exports.getNoEmptyArray = getNoEmptyArray;

var getNoEmptyArrayLength = function getNoEmptyArrayLength(array) {
  if (array === void 0) {
    array = [];
  }

  return getNoEmptyArray(array).length;
};

exports.getNoEmptyArrayLength = getNoEmptyArrayLength;

var noop = function noop() {};

exports.noop = noop;
var locationRemoveProps = ['location', 'tipLocation', 'errorLocation', 'tipText'];
exports.locationRemoveProps = locationRemoveProps;

var stopPropagation = function stopPropagation(e) {
  e.stopPropagation();

  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
};

exports.stopPropagation = stopPropagation;

function flatArray(data, childrenName) {
  if (childrenName === void 0) {
    childrenName = 'children';
  }

  var result = [];

  var loop = function loop(array) {
    array.forEach(function (item) {
      if (item[childrenName]) {
        var newItem = _extends({}, item);

        delete newItem[childrenName];
        result.push(newItem);

        if (item[childrenName].length > 0) {
          loop(item[childrenName]);
        }
      } else {
        result.push(item);
      }
    });
  };

  loop(data);
  return result;
}

function treeMap(tree, mapper, childrenName) {
  if (childrenName === void 0) {
    childrenName = 'children';
  }

  return tree.map(function (node, index) {
    var extra = {};

    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }

    return _extends({}, mapper(node, index), extra);
  });
}

function flatFilter(tree, callback) {
  return tree.reduce(function (acc, node) {
    if (callback(node)) {
      acc.push(node);
    }

    if (node.children) {
      var children = flatFilter(node.children, callback);
      acc.push.apply(acc, children);
    }

    return acc;
  }, []);
}

function createStore(initialState) {
  var state = initialState;
  var listeners = [];

  function setState(partial) {
    state = _extends({}, state, partial);

    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  return {
    setState: setState,
    getState: getState,
    subscribe: subscribe
  };
}

function remove(array, item) {
  var index = array.indexOf(item);
  var front = array.slice(0, index);
  var last = array.slice(index + 1, array.length);
  return front.concat(last);
} // 向下兼容处理尺寸


var transSizeOfDefault = function transSizeOfDefault(oldSize, newSize) {
  if (oldSize === 'default') {
    return newSize;
  }

  return oldSize;
};

exports.transSizeOfDefault = transSizeOfDefault;

var getScroll = function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  var prop = top ? 'pageYOffset' : 'pageXOffset';
  var method = top ? 'scrollTop' : 'scrollLeft';
  var isWindow = target === window;
  var ret = isWindow ? target[prop] : target[method]; // ie6,7,8 standard mode

  if (isWindow && typeof ret !== 'number') {
    ret = document.documentElement[method];
  }

  return ret;
};

exports.getScroll = getScroll;

var intersperseSpace = function intersperseSpace(list) {
  return list.reduce(function (current, item) {
    return [].concat(current, [' ', item]);
  }, []).slice(1);
};

exports.intersperseSpace = intersperseSpace;