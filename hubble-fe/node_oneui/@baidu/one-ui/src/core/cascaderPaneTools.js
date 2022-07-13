/**
 * @file 级联面板tools
 * @author huangshiming
 * @date 2020-03-20
 */
import uniq from 'lodash/uniq';
import pullAll from 'lodash/pullAll';

// 将options转成对象
export const transOptionsToObject = (options, fieldName = 'value', optionsObject = {}, parent) => {
    options.forEach(option => {
        const value = option[fieldName];
        optionsObject[value] = {
            value,
            parent: parent || '',
            label: option.label
        };
        if (option.children && option.children.length) {
            optionsObject[value].children = option.children.map(child => child[fieldName]);
            transOptionsToObject(option.children, 'value', optionsObject, value);
        }
    });
    return optionsObject;
};

// 获取选中状态
export const formatCheckedKeys = (optionsObject, checkedKeys, newCheckedKeys = []) => {
    checkedKeys.forEach(checkedKey => {
        newCheckedKeys.push(checkedKey);
        if (optionsObject[checkedKey] && optionsObject[checkedKey].children) {
            formatCheckedKeys(optionsObject, optionsObject[checkedKey].children, newCheckedKeys);
        }
    });
    return newCheckedKeys;
};

// 获取半选状态
export const formatIndeterminateKeys = (
    optionsObject,
    checkedKeys,
    indeterminates = []
) => {
    checkedKeys.forEach(checkedKey => {
        if (optionsObject[checkedKey]
            && optionsObject[checkedKey].parent
            && checkedKeys.indexOf(optionsObject[checkedKey].parent) === -1) {
            // 找父亲节点是否为半选
            let allChecked = true;
            const parentKey = optionsObject[checkedKey].parent;
            optionsObject[parentKey].children.forEach(child => {
                if (checkedKeys.indexOf(child) === -1) {
                    allChecked = false;
                }
            });
            if (!allChecked) {
                indeterminates.push(parentKey);
                formatIndeterminateKeys(optionsObject, [parentKey, ...checkedKeys], indeterminates);
            }
        }
    });
    return indeterminates;
};

// 获取父亲全选的节点
export const formatAllCheckedKeys = (
    optionsObject, checkedKey, alCheckedKeys, checkedKeys = []
) => {
    checkedKeys.push(checkedKey);
    const newCheckedKeys = [...alCheckedKeys, checkedKey];
    if (optionsObject[checkedKey] && optionsObject[checkedKey].parent) {
        let allChecked = true;
        const parentKey = optionsObject[checkedKey].parent;
        optionsObject[parentKey].children.forEach(child => {
            if (newCheckedKeys.indexOf(child) === -1) {
                allChecked = false;
            }
        });
        if (allChecked) {
            formatAllCheckedKeys(optionsObject, parentKey, newCheckedKeys, checkedKeys);
        }
    }
    return checkedKeys;
};

// 遍历parent节点
export const formatParentKeys = (optionsObject, checkedKey, parentKeys = []) => {
    if (optionsObject[checkedKey] && optionsObject[checkedKey].parent) {
        parentKeys.push(optionsObject[checkedKey].parent);
        formatParentKeys(optionsObject, optionsObject[checkedKey].parent, parentKeys);
    }
    return parentKeys;
};

// 删除选中的checked keys
export const formatDeleteCheckedKeys = (optionsObject, deleteKey, interCheckedKeys) => {
    const deleteCheckedKeys = [
        ...formatCheckedKeys(optionsObject, [deleteKey]),
        ...formatParentKeys(optionsObject, deleteKey)
    ];
    return [...pullAll(interCheckedKeys, deleteCheckedKeys)];
};

// 获取筛选的key
export const filterSearchValue = (flattenTrees, inputValue) => {
    const newFlattenTrees = [];
    flattenTrees.forEach(flattenTree => {
        flattenTree.forEach(tree => {
            if (tree.label.indexOf(inputValue) > -1) {
                newFlattenTrees.push(flattenTree);
            }
        });
    });
    return newFlattenTrees;
};

// 展平树 - 单选的情况
export const flattenTree = (options, ancestor = []) => {
    let flattenOptions = [];
    options.forEach(option => {
        const path = ancestor.concat(option);
        if (!option.children || !option.children.length) {
            flattenOptions.push(path);
        }
        if (option.children) {
            flattenOptions = flattenOptions.concat(flattenTree(option.children, path));
        }
    });
    return flattenOptions;
};

// 寻找祖先
export const findAncestor = (optionsObject, curKey, ancestor = []) => {
    if (optionsObject[curKey] && optionsObject[curKey].children) {
        ancestor.unshift(optionsObject[curKey]);
    }
    if (optionsObject[curKey] && optionsObject[curKey].parent) {
        const parentKey = optionsObject[curKey].parent;
        ancestor.unshift(optionsObject[curKey]);
        ancestor.unshift(optionsObject[parentKey]);
        if (optionsObject[parentKey] && optionsObject[parentKey].parent) {
            findAncestor(optionsObject, parentKey, ancestor);
        }
    }
    return uniq(ancestor);
};

// 展平多选树 - 多选的情况
export const flattenMultipleTree = (optionsObject, options, ancestor = []) => {
    options.forEach(option => {
        if (option.children && option.children.length) {
            ancestor.push(findAncestor(optionsObject, option.value));
            flattenMultipleTree(optionsObject, option.children, ancestor);
        }
    });
    return ancestor;
};
