/**
 * @file 穿梭框的工具方法
 * @author huangshiming@baidu.com
 * @date 2020-04-15
 */
import _ from 'lodash';

export const formatTransferDisbaledKeys = (list = [], keys = [], map = {}) => {
    list.forEach(key => {
        if (map[key] && map[key].disabled) {
            keys.push(key);
            keys = [...keys.concat(map[key].children || [])];
        }
        keys = [
            ...keys,
            ...formatTransferDisbaledKeys(map[key] && map[key].children, keys, map)
        ];
    });
    return _.uniq(keys);
};


export const getTransferData = allDataMap => {
    return _.reduce(allDataMap, (result, value, key) => {
        if (value.children) {
            result.childrenRelationMap[key] = value.children;
            _.forEach(value.children, v => {
                result.parentRelationMap[v] = value.key;
            });
        } else {
            result.candidateTotalCount += 1;
        }
        return result;
    }, {
        parentRelationMap: {},
        childrenRelationMap: {},
        candidateTotalCount: 0
    });
};

export const formatParentDisabled = (transferData, keys = []) => {
    const {parentRelationMap, childrenRelationMap} = transferData;
    keys.forEach(key => {
        if (
            childrenRelationMap[parentRelationMap[key]]
            && childrenRelationMap[parentRelationMap[key]].length
            && childrenRelationMap[parentRelationMap[key]].length === 1
            && keys.indexOf(parentRelationMap[key]) === -1
        ) {
            const parentKeys = parentRelationMap[key];
            keys.push(parentKeys);
            formatParentDisabled(transferData, [parentKeys]);
        }
    });
    return keys;
};


export const isDisabledKeysChange = (allDataMap, oldDisabledKeys) => {
    let flag = false;
    Object.keys(allDataMap).forEach(key => {
        if (oldDisabledKeys.indexOf(key) === -1 && flag) {
            flag = true;
        }
    });
    return flag;
};

export const isSelectedDisabled = (
    parentRelationMap,
    selectedList,
    allDataMap
) => {
    const parentSelectedDisabledMap = {};
    selectedList.forEach(selectedId => {
        if (allDataMap[selectedId] && allDataMap[selectedId].disabled
            && parentSelectedDisabledMap[parentRelationMap[selectedId]] !== false
        ) {
            parentSelectedDisabledMap[parentRelationMap[selectedId]] = true;
        } else if (allDataMap[selectedId] && !allDataMap[selectedId].disabled) {
            parentSelectedDisabledMap[parentRelationMap[selectedId]] = false;
        }
    });
    return parentSelectedDisabledMap;
};

export const isParentKeyDisabled = (
    selectedKeys,
    parentRelationMap,
    childrenRelationMap,
    disabledMap
) => {
    const parentSelectedDisabledMap = {};
    selectedKeys.forEach(selectedKey => {
        const parentKey = parentRelationMap[selectedKey];
        const children = childrenRelationMap[parentKey];
        if (children && children.length) {
            children.forEach(childId => {
                if (parentSelectedDisabledMap[parentKey] !== false
                && disabledMap[childId]) {
                    parentSelectedDisabledMap[parentKey] = true;
                } else if (disabledMap[childId] === false) {
                    parentSelectedDisabledMap[parentKey] = false;
                }
            });
        }
    });
    return parentSelectedDisabledMap;
};

export const isAllDataMapEqual = (newAllDataMap, oldAllDataMap) => {
    let isEqual = true;
    try {
        isEqual = JSON.stringify(newAllDataMap) === JSON.stringify(oldAllDataMap);
    } catch (e) {
        console.error('alldataMap is not object');
    }
    return isEqual;
};
