/**
 * @file 穿梭框的工具方法
 * @author huangshiming@baidu.com
 * @date 2020-04-15
 */
import _ from 'lodash';
export var formatTransferDisbaledKeys = function formatTransferDisbaledKeys(list, keys, map) {
  if (list === void 0) {
    list = [];
  }

  if (keys === void 0) {
    keys = [];
  }

  if (map === void 0) {
    map = {};
  }

  list.forEach(function (key) {
    if (map[key] && map[key].disabled) {
      keys.push(key);
      keys = [].concat(keys.concat(map[key].children || []));
    }

    keys = [].concat(keys, formatTransferDisbaledKeys(map[key] && map[key].children, keys, map));
  });
  return _.uniq(keys);
};
export var getTransferData = function getTransferData(allDataMap) {
  return _.reduce(allDataMap, function (result, value, key) {
    if (value.children) {
      result.childrenRelationMap[key] = value.children;

      _.forEach(value.children, function (v) {
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
export var formatParentDisabled = function formatParentDisabled(transferData, keys) {
  if (keys === void 0) {
    keys = [];
  }

  var parentRelationMap = transferData.parentRelationMap,
      childrenRelationMap = transferData.childrenRelationMap;
  keys.forEach(function (key) {
    if (childrenRelationMap[parentRelationMap[key]] && childrenRelationMap[parentRelationMap[key]].length && childrenRelationMap[parentRelationMap[key]].length === 1 && keys.indexOf(parentRelationMap[key]) === -1) {
      var parentKeys = parentRelationMap[key];
      keys.push(parentKeys);
      formatParentDisabled(transferData, [parentKeys]);
    }
  });
  return keys;
};
export var isDisabledKeysChange = function isDisabledKeysChange(allDataMap, oldDisabledKeys) {
  var flag = false;
  Object.keys(allDataMap).forEach(function (key) {
    if (oldDisabledKeys.indexOf(key) === -1 && flag) {
      flag = true;
    }
  });
  return flag;
};
export var isSelectedDisabled = function isSelectedDisabled(parentRelationMap, selectedList, allDataMap) {
  var parentSelectedDisabledMap = {};
  selectedList.forEach(function (selectedId) {
    if (allDataMap[selectedId] && allDataMap[selectedId].disabled && parentSelectedDisabledMap[parentRelationMap[selectedId]] !== false) {
      parentSelectedDisabledMap[parentRelationMap[selectedId]] = true;
    } else if (allDataMap[selectedId] && !allDataMap[selectedId].disabled) {
      parentSelectedDisabledMap[parentRelationMap[selectedId]] = false;
    }
  });
  return parentSelectedDisabledMap;
};
export var isParentKeyDisabled = function isParentKeyDisabled(selectedKeys, parentRelationMap, childrenRelationMap, disabledMap) {
  var parentSelectedDisabledMap = {};
  selectedKeys.forEach(function (selectedKey) {
    var parentKey = parentRelationMap[selectedKey];
    var children = childrenRelationMap[parentKey];

    if (children && children.length) {
      children.forEach(function (childId) {
        if (parentSelectedDisabledMap[parentKey] !== false && disabledMap[childId]) {
          parentSelectedDisabledMap[parentKey] = true;
        } else if (disabledMap[childId] === false) {
          parentSelectedDisabledMap[parentKey] = false;
        }
      });
    }
  });
  return parentSelectedDisabledMap;
};
export var isAllDataMapEqual = function isAllDataMapEqual(newAllDataMap, oldAllDataMap) {
  var isEqual = true;

  try {
    isEqual = JSON.stringify(newAllDataMap) === JSON.stringify(oldAllDataMap);
  } catch (e) {
    console.error('alldataMap is not object');
  }

  return isEqual;
};