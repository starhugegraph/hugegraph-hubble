/**
 * @file 单选和复选公共方法
 * @author shanqianmin
 * @date 2019/06/14
 */
import React from 'react';

export const getCheckedValue = children => {
    const result = [];
    React.Children.forEach(children, (radio = {}) => {
        const {checked, value} = radio.props || {};
        if (checked) {
            result.push(value);
        }
    });
    return result;
};

export const getRealValue = (props, showFirst) => {
    const {value, children, defaultValue} = props;
    let stateValue = null;
    if (value != null) {
        stateValue = value;
    } else if (defaultValue != null) {
        stateValue = defaultValue;
    } else {
        const childrenValue = getCheckedValue(children);
        if (showFirst) {
            stateValue = childrenValue[0];
        } else {
            stateValue = childrenValue;
        }
    }
    return stateValue;
};
