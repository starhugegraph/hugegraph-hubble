import React from 'react';

export const toChildrenArray = children => {
    const childrens = [];
    React.Children.forEach(children, child => {
        if (child) {
            childrens.push(child);
        }
    });
    return childrens;
};

export const getActiveIndex = (children, activeKey) => {
    const c = toChildrenArray(children);
    for (let i = 0; i < c.length; i++) {
        if (c[i].key === activeKey) {
            return i;
        }
    }
    return -1;
};

export const isTransform3dSupported = style => {
    return ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob;
};

export const setTransform = (style, value) => {
    style.transform = value;
    style.webkitTransform = value;
    style.mozTransform = value;
};
