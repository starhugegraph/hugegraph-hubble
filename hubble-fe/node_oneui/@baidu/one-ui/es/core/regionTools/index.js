function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @file 地域组件 - 工具方法
 * @author huangshiming
 */
import pull from 'lodash/pull';
import uniq from 'lodash/uniq';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';
import { regionName, regionFiliationMap, topLevel, directCityCode, ancestorsRegionMap, currentLevelByKey } from './config';
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
export var rawRegionNames = regionName; // 地域名字的配置项

export var getRegionNames = function getRegionNames(customRegion) {
  if (customRegion && customRegion.regionNames) {
    return customRegion.regionNames;
  }

  return regionName;
}; // 直辖市的编码

export var getDirectCityCode = function getDirectCityCode(customRegion) {
  if (customRegion && customRegion.directCityCode) {
    return customRegion.directCityCode;
  }

  return directCityCode;
}; // children map

export var getRegionFiliation = function getRegionFiliation(customRegion) {
  if (customRegion && customRegion.regionFiliationMap) {
    return customRegion.regionFiliationMap;
  }

  return regionFiliationMap;
}; // ancestor map

export var getAncestorsRegion = function getAncestorsRegion(customRegion) {
  if (customRegion && customRegion.ancestorsRegionMap) {
    return customRegion.ancestorsRegionMap;
  }

  return ancestorsRegionMap;
}; // topLevelKeys

export var getTopLevelKeys = function getTopLevelKeys(customRegion) {
  if (customRegion && customRegion.topLevel) {
    return customRegion.topLevel;
  }

  return topLevel;
}; // 初始化第一层数据

export var firstLevelRegion = function firstLevelRegion(customRegion, disabledValue) {
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
export var levelMap = {
  country: 1,
  province: 2,
  city: 3,
  district: 4
}; // 根据key查找children数据

export var getChildrenByKey = function getChildrenByKey(_ref) {
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

  pull.apply(void 0, [childrenKey].concat(exceptionValues));
  childrenKey.forEach(function (key) {
    var optionItem = {
      value: key,
      label: regionNames[key]
    };
    options.push(optionItem);
  });
  return options;
};
export var getCurrentLevelByKey = function getCurrentLevelByKey(key) {
  var currentLevel = currentLevelByKey[key];

  if (!currentLevel) {
    return null;
  }

  return currentLevel;
};
export var renderChildrenCheckMap = function renderChildrenCheckMap(value, checkedMap, checked, indeterminateMap, showDistrict, disabledValueKeys, customRegion) {
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
export var renderParentMap = function renderParentMap(value, checkedMap, indeterminateMap, disabledValueKeys, customRegion) {
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
export var searchParentKey = function searchParentKey(key, keys, customRegion) {
  keys.push(key);
  var ancestorsRegionMap = getAncestorsRegion(customRegion);
  var parentKey = ancestorsRegionMap[key];

  if (parentKey) {
    searchParentKey(parentKey, keys, customRegion);
  }

  return keys;
};
export var getSearchLabel = function getSearchLabel(key, customRegion) {
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
export var formatSelectedValueToMap = function formatSelectedValueToMap(selectedValue, showDistrict, disabledValueKeys, customRegion) {
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
export var formatToIndeterminateMap = function formatToIndeterminateMap(selectedValue, checkedMap, indeterminateMap, disabledValueKeys, customRegion) {
  if (customRegion === void 0) {
    customRegion = null;
  }

  selectedValue.forEach(function (value) {
    renderParentMap(value, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
  });
};
export var formatCheckedArray = function formatCheckedArray(checkedMap, exceptionValues) {
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
export var formatSingleOptions = function formatSingleOptions(customRegion, disabledValueKeys, showDistrict, additionOption) {
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
    regionFiliation = regionFiliationMap;
    topLevelKey = regionFiliationMap[CHINA_KEY].filter(function (item) {
      return singleRegionExceptionKeys.indexOf(item) === -1;
    });
    topLevelKey = topLevelKey.concat(additionOption);
    regionNames = regionName;
    getDirectCityCode = directCityCode;
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

var getIsDirectCity = function getIsDirectCity(key) {
  // 判断一下是否是直辖市
  return directCityCode.indexOf(+key) > -1;
};

export var transOldKeyToNewRegionKey = function transOldKeyToNewRegionKey(key) {
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
export var transNewKeyToOldRegionKey = function transNewKeyToOldRegionKey(key) {
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
export var getDisabledChildrenKey = function getDisabledChildrenKey(key, customRegion, disabledValus) {
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

export var getFirstLevelDisabledValues = function getFirstLevelDisabledValues(disabledValues, customRegion) {
  if (!disabledValues) {
    return;
  }

  var values = _extends({}, disabledValues);

  Object.keys(disabledValues).forEach(function (value) {
    getDisabledChildrenKey(value, customRegion, values);
  });
  return values;
};
export var getCheckAllRegionKeys = function getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues) {
  var formatCurrentLevelByKey = showDistrict ? currentLevelByKey : omitBy(currentLevelByKey, function (value) {
    return value === levelMap.district;
  });
  var regionKeysByLevel = Object.keys(formatCurrentLevelByKey || {});
  pull.apply(void 0, [regionKeysByLevel].concat(disabledValueKeys, exceptionValues.map(function (value) {
    return "" + value;
  })));
  return regionKeysByLevel;
};
export var getCheckAllStatus = function getCheckAllStatus(selectedValue, showDistrict, disabledValueKeys, exceptionValues) {
  if (showDistrict === void 0) {
    showDistrict = true;
  }

  if (disabledValueKeys === void 0) {
    disabledValueKeys = [];
  }

  if (exceptionValues === void 0) {
    exceptionValues = [];
  }

  var uniqSelectedValue = uniq(selectedValue);
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
export var formatCheckAllMap = function formatCheckAllMap(checked, showDistrict, disabledValueKeys, exceptionValues) {
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
      checkedMap: reduce(regionKeysByLevel, function (result, value) {
        result[value] = true;
        return result;
      }, {}),
      indeterminateMap: reduce(regionKeysByLevel, function (result, value) {
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