"use strict";

exports.__esModule = true;
exports.formatCheckAllMap = exports.getCheckAllStatus = exports.getCheckAllRegionKeys = exports.getFirstLevelDisabledValues = exports.getDisabledChildrenKey = exports.transNewKeyToOldRegionKey = exports.transOldKeyToNewRegionKey = exports.formatSingleOptions = exports.formatCheckedArray = exports.formatToIndeterminateMap = exports.formatSelectedValueToMap = exports.getSearchLabel = exports.searchParentKey = exports.renderParentMap = exports.renderChildrenCheckMap = exports.getCurrentLevelByKey = exports.getChildrenByKey = exports.levelMap = exports.firstLevelRegion = exports.getTopLevelKeys = exports.getAncestorsRegion = exports.getRegionFiliation = exports.getDirectCityCode = exports.getRegionNames = exports.rawRegionNames = void 0;

var _pull = _interopRequireDefault(require("lodash/pull"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _omitBy = _interopRequireDefault(require("lodash/omitBy"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _config = require("./config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var CHINA_KEY = 998; // 港澳台，日本除外

var singleRegionExceptionKeys = [7, 34, 35, 36, 37];
var exceptionNewKeyMap = {
  7: 200000,
  37: 300000
};
var exceptionOldKeyMap = {
  200000: 7,
  300000: 37
};
var rawRegionNames = _config.regionName; // 地域名字的配置项

exports.rawRegionNames = rawRegionNames;

var getRegionNames = function getRegionNames(customRegion) {
  if (customRegion && customRegion.regionNames) {
    return customRegion.regionNames;
  }

  return _config.regionName;
}; // 直辖市的编码


exports.getRegionNames = getRegionNames;

var getDirectCityCode = function getDirectCityCode(customRegion) {
  if (customRegion && customRegion.directCityCode) {
    return customRegion.directCityCode;
  }

  return _config.directCityCode;
}; // children map


exports.getDirectCityCode = getDirectCityCode;

var getRegionFiliation = function getRegionFiliation(customRegion) {
  if (customRegion && customRegion.regionFiliationMap) {
    return customRegion.regionFiliationMap;
  }

  return _config.regionFiliationMap;
}; // ancestor map


exports.getRegionFiliation = getRegionFiliation;

var getAncestorsRegion = function getAncestorsRegion(customRegion) {
  if (customRegion && customRegion.ancestorsRegionMap) {
    return customRegion.ancestorsRegionMap;
  }

  return _config.ancestorsRegionMap;
}; // topLevelKeys


exports.getAncestorsRegion = getAncestorsRegion;

var getTopLevelKeys = function getTopLevelKeys(customRegion) {
  if (customRegion && customRegion.topLevel) {
    return customRegion.topLevel;
  }

  return _config.topLevel;
}; // 初始化第一层数据


exports.getTopLevelKeys = getTopLevelKeys;

var firstLevelRegion = function firstLevelRegion(customRegion, disabledValue) {
  if (disabledValue === void 0) {
    disabledValue = {};
  }

  var topLevelKeys = getTopLevelKeys(customRegion);
  var regionFiliation = getRegionFiliation(customRegion);
  var regionNames = getRegionNames(customRegion);
  var options = [];
  topLevelKeys.forEach(function (item) {
    var optionItem = {
      value: item,
      label: regionNames[item],
      children: [],
      disabled: Object.keys(disabledValue).indexOf("" + item) > -1
    };
    regionFiliation[item].forEach(function (child) {
      optionItem.children.push({
        value: child,
        label: regionNames[child]
      });
    });
    options.push(optionItem);
  });
  return options;
};

exports.firstLevelRegion = firstLevelRegion;
var levelMap = {
  country: 1,
  province: 2,
  city: 3,
  district: 4
}; // 根据key查找children数据

exports.levelMap = levelMap;

var getChildrenByKey = function getChildrenByKey(_ref) {
  var key = _ref.key,
      level = _ref.level,
      customRegion = _ref.customRegion,
      _ref$exceptionValues = _ref.exceptionValues,
      exceptionValues = _ref$exceptionValues === void 0 ? [] : _ref$exceptionValues;

  if (!key) {
    return [];
  }

  var sameKeyCode = getDirectCityCode(customRegion);
  var regionFiliationMap = getRegionFiliation(customRegion);
  var childrenKey = sameKeyCode.indexOf(key) > -1 && level === levelMap.city ? [key] : regionFiliationMap[key] || [];
  var options = [];
  var regionNames = getRegionNames(customRegion); // 过滤exceptionValue

  _pull["default"].apply(void 0, [childrenKey].concat(exceptionValues));

  childrenKey.forEach(function (key) {
    var optionItem = {
      value: key,
      label: regionNames[key]
    };
    options.push(optionItem);
  });
  return options;
};

exports.getChildrenByKey = getChildrenByKey;

var getCurrentLevelByKey = function getCurrentLevelByKey(key) {
  var currentLevel = _config.currentLevelByKey[key];

  if (!currentLevel) {
    return null;
  }

  return currentLevel;
};

exports.getCurrentLevelByKey = getCurrentLevelByKey;

var renderChildrenCheckMap = function renderChildrenCheckMap(value, checkedMap, checked, indeterminateMap, showDistrict, disabledValueKeys, customRegion) {
  if (showDistrict === void 0) {
    showDistrict = true;
  }

  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (customRegion === void 0) {
    customRegion = null;
  }

  var regionFiliation = getRegionFiliation(customRegion);
  var children = regionFiliation[value] || [];
  children.forEach(function (child) {
    var currentLevel = getCurrentLevelByKey(child);

    if (!(currentLevel === levelMap.district && !showDistrict) && disabledValueKeys.indexOf("" + child) === -1) {
      checkedMap[child] = checked;
      indeterminateMap[child] = false;
      renderChildrenCheckMap(child, checkedMap, checked, indeterminateMap, showDistrict, disabledValueKeys, customRegion);
    }
  });
};

exports.renderChildrenCheckMap = renderChildrenCheckMap;

var renderParentMap = function renderParentMap(value, checkedMap, indeterminateMap, disabledValueKeys, customRegion) {
  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (customRegion === void 0) {
    customRegion = null;
  }

  var ancestorsRegion = getAncestorsRegion(customRegion);
  var parentKey = ancestorsRegion[value];
  var regionFiliation = getRegionFiliation(customRegion);

  if (parentKey && parentKey !== value) {
    var currentLevel = regionFiliation[parentKey] || [];
    var total = 0;
    currentLevel.forEach(function (current) {
      if (checkedMap[current] || disabledValueKeys.indexOf("" + current) > -1) {
        total++;
      }
    });
    var currentLevelLength = currentLevel.length;
    checkedMap[parentKey] = total === currentLevelLength;
    indeterminateMap[parentKey] = currentLevelLength > total || false;
    renderParentMap(parentKey, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
  }
};

exports.renderParentMap = renderParentMap;

var searchParentKey = function searchParentKey(key, keys, customRegion) {
  keys.push(key);
  var ancestorsRegionMap = getAncestorsRegion(customRegion);
  var parentKey = ancestorsRegionMap[key];

  if (parentKey) {
    searchParentKey(parentKey, keys, customRegion);
  }

  return keys;
};

exports.searchParentKey = searchParentKey;

var getSearchLabel = function getSearchLabel(key, customRegion) {
  var keys = [];
  keys = searchParentKey(key, keys, customRegion);
  var label = [];
  var regionNames = getRegionNames(customRegion);
  keys.forEach(function (currentKey) {
    label.unshift(regionNames[currentKey]);
  });
  return {
    value: keys,
    label: label.join(' > ')
  };
};

exports.getSearchLabel = getSearchLabel;

var formatSelectedValueToMap = function formatSelectedValueToMap(selectedValue, showDistrict, disabledValueKeys, customRegion) {
  var checkedMap = {};
  var indeterminateMap = {};
  selectedValue.forEach(function (value) {
    checkedMap[value] = true;
    renderChildrenCheckMap(value, checkedMap, true, indeterminateMap, showDistrict, disabledValueKeys, customRegion);
  });
  return {
    checkedMap: checkedMap,
    indeterminateMap: indeterminateMap
  };
};

exports.formatSelectedValueToMap = formatSelectedValueToMap;

var formatToIndeterminateMap = function formatToIndeterminateMap(selectedValue, checkedMap, indeterminateMap, disabledValueKeys, customRegion) {
  if (customRegion === void 0) {
    customRegion = null;
  }

  selectedValue.forEach(function (value) {
    renderParentMap(value, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
  });
};

exports.formatToIndeterminateMap = formatToIndeterminateMap;

var formatCheckedArray = function formatCheckedArray(checkedMap, exceptionValues) {
  if (exceptionValues === void 0) {
    exceptionValues = [];
  }

  var array = [];
  Object.keys(checkedMap).forEach(function (key) {
    if (checkedMap[key] && exceptionValues.indexOf(+key) === -1) {
      array.push(+key);
    }
  });
  return array;
};

exports.formatCheckedArray = formatCheckedArray;

var formatSingleOptions = function formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption) {
  if (customRegion === void 0) {
    customRegion = null;
  }

  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (showDistrict === void 0) {
    showDistrict = true;
  }

  if (additionOption === void 0) {
    additionOption = [];
  }

  var regionFiliation;
  var topLevelKey;
  var regionNames;
  var getDirectCityCode = [];

  if (customRegion) {
    regionFiliation = customRegion.regionFiliationMap;
    topLevelKey = customRegion.topLevel;
    regionNames = customRegion.regionNames;
  } else {
    regionFiliation = _config.regionFiliationMap;
    topLevelKey = _config.regionFiliationMap[CHINA_KEY].filter(function (item) {
      return singleRegionExceptionKeys.indexOf(item) === -1;
    });
    topLevelKey = topLevelKey.concat(additionOption);
    regionNames = _config.regionName;
    getDirectCityCode = _config.directCityCode;
  }

  var disabledKeys = disabledValueKeys.map(function (key) {
    return "" + key;
  });
  var getCascaderOptions = topLevelKey.map(function (region) {
    var regionId = "" + region;
    var childrenArray = regionFiliation[regionId];

    if (!showDistrict && childrenArray && getDirectCityCode.indexOf(region) > -1) {
      // 直辖市的情况特殊处理
      childrenArray = null;
    }

    return {
      value: regionId,
      label: regionNames[regionId],
      disabled: disabledKeys.indexOf(regionId) > -1,
      children: childrenArray && childrenArray.length && childrenArray.map(function (city) {
        var cityId = "" + city;
        return {
          value: cityId,
          label: regionNames[cityId],
          disabled: disabledKeys.indexOf(cityId) > -1,
          children: regionFiliation[cityId] && regionFiliation[cityId].length && showDistrict ? regionFiliation[cityId].map(function (distric) {
            var districId = "" + distric;
            return {
              value: districId,
              label: regionNames[districId],
              disabled: disabledKeys.indexOf(districId) > -1
            };
          }) : null
        };
      })
    };
  });
  return getCascaderOptions;
};

exports.formatSingleOptions = formatSingleOptions;

var getIsDirectCity = function getIsDirectCity(key) {
  // 判断一下是否是直辖市
  return _config.directCityCode.indexOf(+key) > -1;
};

var transOldKeyToNewRegionKey = function transOldKeyToNewRegionKey(key) {
  // 非自定义地域的时候进行判断，兼容商业两种地域编码规范
  var level = getCurrentLevelByKey(key); // 判断一下是日本还是其他国家

  if (Object.keys(exceptionNewKeyMap).indexOf("" + key) > -1) {
    return exceptionNewKeyMap[key];
  } // 先判断一下是否直辖市


  var isDirectCity = getIsDirectCity(key);

  if (isDirectCity || level === levelMap.province) {
    // 直辖市provinceId和cityId相同或者为省级区域
    return key * 1000;
  }

  if (level === levelMap.city) {
    var provinceId = getAncestorsRegion()[key];
    return provinceId * 1000 + key;
  }

  return key;
};

exports.transOldKeyToNewRegionKey = transOldKeyToNewRegionKey;

var transNewKeyToOldRegionKey = function transNewKeyToOldRegionKey(key) {
  // 判断一下日本和其他国家特殊情况
  if (Object.keys(exceptionOldKeyMap).indexOf("" + key) > -1) {
    return exceptionOldKeyMap[key];
  }

  var directId = getCurrentLevelByKey(key);

  if (directId) {
    return directId;
  } // 判断是省or市


  var id = +key;
  var cityId = id % 1000;
  return cityId === 0 ? id / 1000 : cityId;
};

exports.transNewKeyToOldRegionKey = transNewKeyToOldRegionKey;

var getDisabledChildrenKey = function getDisabledChildrenKey(key, customRegion, disabledValus) {
  if (!disabledValus[key]) {
    disabledValus[key] = '';
  }

  var regionFiliationMap = getRegionFiliation(customRegion);
  var children = regionFiliationMap[key];

  if (!children) {
    return disabledValus;
  }

  children.forEach(function (child) {
    getDisabledChildrenKey(child, customRegion, disabledValus);
  });
}; // 如果传入的是中国和国外的话，disabledValue的值应该下一层也不可选


exports.getDisabledChildrenKey = getDisabledChildrenKey;

var getFirstLevelDisabledValues = function getFirstLevelDisabledValues(disabledValues, customRegion) {
  if (!disabledValues) {
    return;
  }

  var values = _extends({}, disabledValues);

  Object.keys(disabledValues).forEach(function (value) {
    getDisabledChildrenKey(value, customRegion, values);
  });
  return values;
};

exports.getFirstLevelDisabledValues = getFirstLevelDisabledValues;

var getCheckAllRegionKeys = function getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues) {
  var formatCurrentLevelByKey = showDistrict ? _config.currentLevelByKey : (0, _omitBy["default"])(_config.currentLevelByKey, function (value) {
    return value === levelMap.district;
  });
  var regionKeysByLevel = Object.keys(formatCurrentLevelByKey || {});

  _pull["default"].apply(void 0, [regionKeysByLevel].concat(disabledValueKeys, exceptionValues.map(function (value) {
    return "" + value;
  })));

  return regionKeysByLevel;
};

exports.getCheckAllRegionKeys = getCheckAllRegionKeys;

var getCheckAllStatus = function getCheckAllStatus(selectedValue, showDistrict, disabledValueKeys, exceptionValues) {
  if (showDistrict === void 0) {
    showDistrict = true;
  }

  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (exceptionValues === void 0) {
    exceptionValues = [];
  }

  var uniqSelectedValue = (0, _uniq["default"])(selectedValue);
  var uniqSelectedValueLength = uniqSelectedValue.length;
  var regionKeysByLevel = getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues);
  var regionKeysLength = regionKeysByLevel.length;

  if (!uniqSelectedValueLength) {
    return {
      checked: false,
      indeterminate: false
    };
  }

  return {
    checked: !(uniqSelectedValueLength < regionKeysLength),
    indeterminate: uniqSelectedValueLength < regionKeysLength
  };
};

exports.getCheckAllStatus = getCheckAllStatus;

var formatCheckAllMap = function formatCheckAllMap(checked, showDistrict, disabledValueKeys, exceptionValues) {
  if (showDistrict === void 0) {
    showDistrict = true;
  }

  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (exceptionValues === void 0) {
    exceptionValues = [];
  }

  var regionKeysByLevel = getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues);

  if (checked) {
    return {
      checkedMap: (0, _reduce["default"])(regionKeysByLevel, function (result, value) {
        result[value] = true;
        return result;
      }, {}),
      indeterminateMap: (0, _reduce["default"])(regionKeysByLevel, function (result, value) {
        result[value] = false;
        return result;
      }, {})
    };
  }

  return {
    checkedMap: {},
    indeterminateMap: {}
  };
};

exports.formatCheckAllMap = formatCheckAllMap;