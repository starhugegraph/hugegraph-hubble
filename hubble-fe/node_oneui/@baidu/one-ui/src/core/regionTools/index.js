/**
 * @file 地域组件 - 工具方法
 * @author huangshiming
 */
import pull from 'lodash/pull';
import uniq from 'lodash/uniq';
import omitBy from 'lodash/omitBy';
import reduce from 'lodash/reduce';
import {
    regionName,
    regionFiliationMap,
    topLevel,
    directCityCode,
    ancestorsRegionMap,
    currentLevelByKey
} from './config';

const CHINA_KEY = 998;
// 港澳台，日本除外
const singleRegionExceptionKeys = [7, 34, 35, 36, 37];

const exceptionNewKeyMap = {
    7: 200000,
    37: 300000
};

const exceptionOldKeyMap = {
    200000: 7,
    300000: 37
};

export const rawRegionNames = regionName;

// 地域名字的配置项
export const getRegionNames = customRegion => {
    if (customRegion && customRegion.regionNames) {
        return customRegion.regionNames;
    }
    return regionName;
};

// 直辖市的编码
export const getDirectCityCode = customRegion => {
    if (customRegion && customRegion.directCityCode) {
        return customRegion.directCityCode;
    }
    return directCityCode;
};

// children map
export const getRegionFiliation = customRegion => {
    if (customRegion && customRegion.regionFiliationMap) {
        return customRegion.regionFiliationMap;
    }
    return regionFiliationMap;
};

// ancestor map
export const getAncestorsRegion = customRegion => {
    if (customRegion && customRegion.ancestorsRegionMap) {
        return customRegion.ancestorsRegionMap;
    }
    return ancestorsRegionMap;
};

// topLevelKeys
export const getTopLevelKeys = customRegion => {
    if (customRegion && customRegion.topLevel) {
        return customRegion.topLevel;
    }
    return topLevel;
};

// 初始化第一层数据
export const firstLevelRegion = (customRegion, disabledValue = {}) => {
    const topLevelKeys = getTopLevelKeys(customRegion);
    const regionFiliation = getRegionFiliation(customRegion);
    const regionNames = getRegionNames(customRegion);
    const options = [];
    topLevelKeys.forEach(item => {
        const optionItem = {
            value: item,
            label: regionNames[item],
            children: [],
            disabled: Object.keys(disabledValue).indexOf(`${item}`) > -1
        };
        regionFiliation[item].forEach(child => {
            optionItem.children.push({
                value: child,
                label: regionNames[child]
            });
        });
        options.push(optionItem);
    });
    return options;
};

export const levelMap = {
    country: 1,
    province: 2,
    city: 3,
    district: 4
};

// 根据key查找children数据
export const getChildrenByKey = ({key, level, customRegion, exceptionValues = []}) => {
    if (!key) {
        return [];
    }
    const sameKeyCode = getDirectCityCode(customRegion);
    const regionFiliationMap = getRegionFiliation(customRegion);
    const childrenKey = (sameKeyCode.indexOf(key) > -1 && level === levelMap.city)
        ? [key]
        : (regionFiliationMap[key] || []);
    const options = [];
    const regionNames = getRegionNames(customRegion);
    // 过滤exceptionValue
    pull(childrenKey, ...exceptionValues);
    childrenKey.forEach(key => {
        const optionItem = {
            value: key,
            label: regionNames[key]
        };
        options.push(optionItem);
    });
    return options;
};

export const getCurrentLevelByKey = key => {
    const currentLevel = currentLevelByKey[key];
    if (!currentLevel) {
        return null;
    }
    return currentLevel;
};

export const renderChildrenCheckMap = (
    value,
    checkedMap,
    checked,
    indeterminateMap,
    showDistrict = true,
    disabledValueKeys = [],
    customRegion = null
) => {
    const regionFiliation = getRegionFiliation(customRegion);
    const children = regionFiliation[value] || [];
    children.forEach(child => {
        const currentLevel = getCurrentLevelByKey(child);
        if (!(currentLevel === levelMap.district && !showDistrict)
        && disabledValueKeys.indexOf(`${child}`) === -1) {
            checkedMap[child] = checked;
            indeterminateMap[child] = false;
            renderChildrenCheckMap(
                child,
                checkedMap,
                checked,
                indeterminateMap,
                showDistrict,
                disabledValueKeys,
                customRegion
            );
        }
    });
};

export const renderParentMap = (
    value,
    checkedMap,
    indeterminateMap,
    disabledValueKeys = [],
    customRegion = null
) => {
    const ancestorsRegion = getAncestorsRegion(customRegion);
    const parentKey = ancestorsRegion[value];
    const regionFiliation = getRegionFiliation(customRegion);
    if (parentKey && parentKey !== value) {
        const currentLevel = regionFiliation[parentKey] || [];
        let total = 0;
        currentLevel.forEach(current => {
            if (checkedMap[current] || disabledValueKeys.indexOf(`${current}`) > -1) {
                total++;
            }
        });
        const currentLevelLength = currentLevel.length;
        checkedMap[parentKey] = total === currentLevelLength;
        indeterminateMap[parentKey] = currentLevelLength > total || false;
        renderParentMap(parentKey, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
    }
};

export const searchParentKey = (key, keys, customRegion) => {
    keys.push(key);
    const ancestorsRegionMap = getAncestorsRegion(customRegion);
    const parentKey = ancestorsRegionMap[key];
    if (parentKey) {
        searchParentKey(parentKey, keys, customRegion);
    }
    return keys;
};

export const getSearchLabel = (key, customRegion) => {
    let keys = [];
    keys = searchParentKey(key, keys, customRegion);
    const label = [];
    const regionNames = getRegionNames(customRegion);
    keys.forEach(currentKey => {
        label.unshift(regionNames[currentKey]);
    });
    return {
        value: keys,
        label: label.join(' > ')
    };
};

export const formatSelectedValueToMap = (
    selectedValue,
    showDistrict,
    disabledValueKeys,
    customRegion
) => {
    const checkedMap = {};
    const indeterminateMap = {};
    selectedValue.forEach(value => {
        checkedMap[value] = true;
        renderChildrenCheckMap(
            value,
            checkedMap,
            true,
            indeterminateMap,
            showDistrict,
            disabledValueKeys,
            customRegion
        );
    });
    return {
        checkedMap,
        indeterminateMap
    };
};


export const formatToIndeterminateMap = (
    selectedValue,
    checkedMap,
    indeterminateMap,
    disabledValueKeys,
    customRegion = null
) => {
    selectedValue.forEach(value => {
        renderParentMap(value, checkedMap, indeterminateMap, disabledValueKeys, customRegion);
    });
};

export const formatCheckedArray = (checkedMap, exceptionValues = []) => {
    const array = [];
    Object.keys(checkedMap).forEach(key => {
        if (checkedMap[key] && exceptionValues.indexOf(+key) === -1) {
            array.push(+key);
        }
    });
    return array;
};

export const formatSingleOptions = (
    customRegion = null, disabledValueKeys = [], showDistrict = true, additionOption = []
) => {
    let regionFiliation;
    let topLevelKey;
    let regionNames;
    let getDirectCityCode = [];
    if (customRegion) {
        regionFiliation = customRegion.regionFiliationMap;
        topLevelKey = customRegion.topLevel;
        regionNames = customRegion.regionNames;
    } else {
        regionFiliation = regionFiliationMap;
        topLevelKey = regionFiliationMap[CHINA_KEY].filter(item => singleRegionExceptionKeys.indexOf(item) === -1);
        topLevelKey = topLevelKey.concat(additionOption);
        regionNames = regionName;
        getDirectCityCode = directCityCode;
    }
    const disabledKeys = disabledValueKeys.map(key => `${key}`);
    const getCascaderOptions = topLevelKey.map(region => {
        const regionId = `${region}`;
        let childrenArray = regionFiliation[regionId];
        if (!showDistrict && childrenArray && (getDirectCityCode.indexOf(region) > -1)) {
            // 直辖市的情况特殊处理
            childrenArray = null;
        }
        return {
            value: regionId,
            label: regionNames[regionId],
            disabled: disabledKeys.indexOf(regionId) > -1,
            children: childrenArray && childrenArray.length && childrenArray.map(city => {
                const cityId = `${city}`;
                return {
                    value: cityId,
                    label: regionNames[cityId],
                    disabled: disabledKeys.indexOf(cityId) > -1,
                    children: regionFiliation[cityId] && regionFiliation[cityId].length && showDistrict
                        ? regionFiliation[cityId].map(distric => {
                            const districId = `${distric}`;
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

const getIsDirectCity = key => {
    // 判断一下是否是直辖市
    return directCityCode.indexOf(+key) > -1;
};

export const transOldKeyToNewRegionKey = key => {
    // 非自定义地域的时候进行判断，兼容商业两种地域编码规范
    const level = getCurrentLevelByKey(key);
    // 判断一下是日本还是其他国家
    if (Object.keys(exceptionNewKeyMap).indexOf(`${key}`) > -1) {
        return exceptionNewKeyMap[key];
    }
    // 先判断一下是否直辖市
    const isDirectCity = getIsDirectCity(key);
    if (isDirectCity || level === levelMap.province) {
        // 直辖市provinceId和cityId相同或者为省级区域
        return key * 1000;
    }
    if (level === levelMap.city) {
        const provinceId = getAncestorsRegion()[key];
        return provinceId * 1000 + key;
    }
    return key;
};

export const transNewKeyToOldRegionKey = key => {
    // 判断一下日本和其他国家特殊情况
    if (Object.keys(exceptionOldKeyMap).indexOf(`${key}`) > -1) {
        return exceptionOldKeyMap[key];
    }
    const directId = getCurrentLevelByKey(key);
    if (directId) {
        return directId;
    }
    // 判断是省or市
    const id = +key;
    const cityId = id % 1000;
    return cityId === 0 ? id / 1000 : cityId;
};

export const getDisabledChildrenKey = (key, customRegion, disabledValus) => {
    if (!disabledValus[key]) {
        disabledValus[key] = '';
    }
    const regionFiliationMap = getRegionFiliation(customRegion);
    const children = regionFiliationMap[key];
    if (!children) {
        return disabledValus;
    }
    children.forEach(child => {
        getDisabledChildrenKey(child, customRegion, disabledValus);
    });
};

// 如果传入的是中国和国外的话，disabledValue的值应该下一层也不可选
export const getFirstLevelDisabledValues = (disabledValues, customRegion) => {
    if (!disabledValues) {
        return;
    }
    const values = {...disabledValues};
    Object.keys(disabledValues).forEach(value => {
        getDisabledChildrenKey(value, customRegion, values);
    });
    return values;
};

export const getCheckAllRegionKeys = (showDistrict, disabledValueKeys, exceptionValues) => {
    const formatCurrentLevelByKey = showDistrict ? currentLevelByKey
        : omitBy(currentLevelByKey, value => (value === levelMap.district));
    const regionKeysByLevel = Object.keys(formatCurrentLevelByKey || {});
    pull(regionKeysByLevel, ...disabledValueKeys, ...exceptionValues.map(value => `${value}`));
    return regionKeysByLevel;
};

export const getCheckAllStatus = (
    selectedValue,
    showDistrict = true,
    disabledValueKeys = [],
    exceptionValues = []
) => {
    const uniqSelectedValue = uniq(selectedValue);
    const uniqSelectedValueLength = uniqSelectedValue.length;
    const regionKeysByLevel = getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues);
    const regionKeysLength = regionKeysByLevel.length;
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

export const formatCheckAllMap = (
    checked,
    showDistrict = true,
    disabledValueKeys = [],
    exceptionValues = []
) => {
    const regionKeysByLevel = getCheckAllRegionKeys(showDistrict, disabledValueKeys, exceptionValues);
    if (checked) {
        return {
            checkedMap: reduce(regionKeysByLevel, (result, value) => {
                result[value] = true;
                return result;
            }, {}),
            indeterminateMap: reduce(regionKeysByLevel, (result, value) => {
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
