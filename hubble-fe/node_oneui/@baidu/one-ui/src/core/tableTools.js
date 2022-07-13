/**
 * @file 表格的工具方法
 */
import React from 'react';

const scrollbarMeasure = {
    position: 'absolute',
    top: '-9999px',
    width: '50px',
    height: '50px',
    overflow: 'scroll'
};

export const measureScrollbar = (direction = 'vertical') => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return 0;
    }
    const scrollDiv = document.createElement('div');
    Object.keys(scrollbarMeasure).forEach(scrollProp => {
        scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
    });
    document.body.appendChild(scrollDiv);
    let size = 0;
    if (direction === 'vertical') {
        size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    } else if (direction === 'horizontal') {
        size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    }

    document.body.removeChild(scrollDiv);
    return size;
};

export function normalizeColumns(elements) {
    const columns = [];
    React.Children.forEach(elements, element => {
        if (!React.isValidElement(element)) {
            return;
        }
        const column = {
            ...element.props
        };
        if (element.key) {
            column.key = element.key;
        }
        if (element.type && (element.type).__ONE_TABLE_COLUMN_GROUP) {
            column.children = normalizeColumns(column.children);
        }
        columns.push(column);
    });
    return columns;
}
