/**
 * @file 级联面板tools
 * @author huangshiming
 * @date 2020-03-20
 */
import uniq from 'lodash/uniq';
import pullAll from 'lodash/pullAll'; // 将options转成对象

export var transOptionsToObject = function transOptionsToObject(options, fieldName, optionsObject, parent) {
  if (fieldName === void 0) {
    fieldName = 'value';
  }

  if (optionsObject === void 0) {
    optionsObject = {};
  }

  options.forEach(function (option) {
    var value = option[fieldName];
    optionsObject[value] = {
      value: value,
      parent: parent || '',
      label: option.label
    };

    if (option.children && option.children.length) {
      optionsObject[value].children = option.children.map(function (child) {
        return child[fieldName];
      });
      transOptionsToObject(option.children, 'value', optionsObject, value);
    }
  });
  return optionsObject;
}; // 获取选中状态

export var formatCheckedKeys = function formatCheckedKeys(optionsObject, checkedKeys, newCheckedKeys) {
  if (newCheckedKeys === void 0) {
    newCheckedKeys = [];
  }

  checkedKeys.forEach(function (checkedKey) {
    newCheckedKeys.push(checkedKey);

    if (optionsObject[checkedKey] && optionsObject[checkedKey].children) {
      formatCheckedKeys(optionsObject, optionsObject[checkedKey].children, newCheckedKeys);
    }
  });
  return newCheckedKeys;
}; // 获取半选状态

export var formatIndeterminateKeys = function formatIndeterminateKeys(optionsObject, checkedKeys, indeterminates) {
  if (indeterminates === void 0) {
    indeterminates = [];
  }

  checkedKeys.forEach(function (checkedKey) {
    if (optionsObject[checkedKey] && optionsObject[checkedKey].parent && checkedKeys.indexOf(optionsObject[checkedKey].parent) === -1) {
      // 找父亲节点是否为半选
      var allChecked = true;
      var parentKey = optionsObject[checkedKey].parent;
      optionsObject[parentKey].children.forEach(function (child) {
        if (checkedKeys.indexOf(child) === -1) {
          allChecked = false;
        }
      });

      if (!allChecked) {
        indeterminates.push(parentKey);
        formatIndeterminateKeys(optionsObject, [parentKey].concat(checkedKeys), indeterminates);
      }
    }
  });
  return indeterminates;
}; // 获取父亲全选的节点

export var formatAllCheckedKeys = function formatAllCheckedKeys(optionsObject, checkedKey, alCheckedKeys, checkedKeys) {
  if (checkedKeys === void 0) {
    checkedKeys = [];
  }

  checkedKeys.push(checkedKey);
  var newCheckedKeys = [].concat(alCheckedKeys, [checkedKey]);

  if (optionsObject[checkedKey] && optionsObject[checkedKey].parent) {
    var allChecked = true;
    var parentKey = optionsObject[checkedKey].parent;
    optionsObject[parentKey].children.forEach(function (child) {
      if (newCheckedKeys.indexOf(child) === -1) {
        allChecked = false;
      }
    });

    if (allChecked) {
      formatAllCheckedKeys(optionsObject, parentKey, newCheckedKeys, checkedKeys);
    }
  }

  return checkedKeys;
}; // 遍历parent节点

export var formatParentKeys = function formatParentKeys(optionsObject, checkedKey, parentKeys) {
  if (parentKeys === void 0) {
    parentKeys = [];
  }

  if (optionsObject[checkedKey] && optionsObject[checkedKey].parent) {
    parentKeys.push(optionsObject[checkedKey].parent);
    formatParentKeys(optionsObject, optionsObject[checkedKey].parent, parentKeys);
  }

  return parentKeys;
}; // 删除选中的checked keys

export var formatDeleteCheckedKeys = function formatDeleteCheckedKeys(optionsObject, deleteKey, interCheckedKeys) {
  var deleteCheckedKeys = [].concat(formatCheckedKeys(optionsObject, [deleteKey]), formatParentKeys(optionsObject, deleteKey));
  return [].concat(pullAll(interCheckedKeys, deleteCheckedKeys));
}; // 获取筛选的key

export var filterSearchValue = function filterSearchValue(flattenTrees, inputValue) {
  var newFlattenTrees = [];
  flattenTrees.forEach(function (flattenTree) {
    flattenTree.forEach(function (tree) {
      if (tree.label.indexOf(inputValue) > -1) {
        newFlattenTrees.push(flattenTree);
      }
    });
  });
  return newFlattenTrees;
}; // 展平树 - 单选的情况

export var flattenTree = function flattenTree(options, ancestor) {
  if (ancestor === void 0) {
    ancestor = [];
  }

  var flattenOptions = [];
  options.forEach(function (option) {
    var path = ancestor.concat(option);

    if (!option.children || !option.children.length) {
      flattenOptions.push(path);
    }

    if (option.children) {
      flattenOptions = flattenOptions.concat(flattenTree(option.children, path));
    }
  });
  return flattenOptions;
}; // 寻找祖先

export var findAncestor = function findAncestor(optionsObject, curKey, ancestor) {
  if (ancestor === void 0) {
    ancestor = [];
  }

  if (optionsObject[curKey] && optionsObject[curKey].children) {
    ancestor.unshift(optionsObject[curKey]);
  }

  if (optionsObject[curKey] && optionsObject[curKey].parent) {
    var parentKey = optionsObject[curKey].parent;
    ancestor.unshift(optionsObject[curKey]);
    ancestor.unshift(optionsObject[parentKey]);

    if (optionsObject[parentKey] && optionsObject[parentKey].parent) {
      findAncestor(optionsObject, parentKey, ancestor);
    }
  }

  return uniq(ancestor);
}; // 展平多选树 - 多选的情况

export var flattenMultipleTree = function flattenMultipleTree(optionsObject, options, ancestor) {
  if (ancestor === void 0) {
    ancestor = [];
  }

  options.forEach(function (option) {
    if (option.children && option.children.length) {
      ancestor.push(findAncestor(optionsObject, option.value));
      flattenMultipleTree(optionsObject, option.children, ancestor);
    }
  });
  return ancestor;
};