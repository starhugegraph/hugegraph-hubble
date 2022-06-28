import React from 'react';
import PropTypes from 'prop-types';
import tools from '../../../core';
import BaseTable from './baseTable';

const measureScrollbar = tools.table.measureScrollbar;

export default function HeadTable(props, {table}) {
    const {prefixCls, scroll, showHeader, headerFixTop, style} = table.props;
    const {columns, fixed, tableClassName, handleBodyScrollLeft, expander, isHeaderFixed} = props;
    const {saveRef, headTable} = table;
    let {useFixedHeader} = table.props;
    const refName = isHeaderFixed ? 'fixedHeadTable' : 'headTable';
    let headFixedClass = '';

    const headStyle = isHeaderFixed
        ? {
            position: 'fixed',
            top: headerFixTop,
            zIndex: 1,
            paddingBottom: 0
        }
        : {};

    const scrollbarWidth = measureScrollbar('horizontal');
    if (scroll.y) {
        useFixedHeader = true;
        // Add negative margin bottom for scroll bar overflow bug
        // if (scrollbarWidth > 0 && !fixed) {
        //     headStyle.marginBottom = `-${scrollbarWidth}px`;
        //     headStyle.paddingBottom = '0px';
        // }

        // if (scrollbarWidth > 0 && fixed === 'right') {
        //     headStyle.paddingRight = `${scrollbarWidth}px`;
        // }
    }

    if (table.props.headerFixTop !== null) {
        useFixedHeader = true;
    }

    if (!useFixedHeader || !showHeader) {
        return null;
    }

    if (!fixed && scrollbarWidth > 0 && isHeaderFixed) {
        headStyle.overflow = 'hidden';
    }

    if (!fixed) {
        headFixedClass = ` ${prefixCls}-fixed-header-fixed`;
        if (isHeaderFixed) {
            headStyle.width = headTable ? headTable.offsetWidth : style.width || '100%';
        }
    } else {
        headFixedClass = ` ${prefixCls}-fixed-${fixed}-header-fixed`;
    }

    const headContent = (
        <div
            key={refName}
            ref={fixed ? saveRef(`${fixed}Table`) : saveRef(refName)}
            className={`${prefixCls}-header${headFixedClass}`}
            style={headStyle}
            onScroll={handleBodyScrollLeft}
        >
            <BaseTable
                tableClassName={tableClassName}
                hasHead
                hasBody={false}
                fixed={fixed}
                columns={columns}
                expander={expander}
            />
        </div>
    );
    const fixHeadContainerStyle = !fixed
        ? {
            width: headTable && headTable.offsetWidth,
            height: headTable && (scroll.y ? headTable.offsetHeight - scrollbarWidth : headTable.offsetHeight)
        }
        : {
            width: table[`${fixed}Table`] && table[`${fixed}Table`].offsetWidth,
            height: table[`${fixed}Table`] && table[`${fixed}Table`].offsetHeight
        };
    if (isHeaderFixed) {
        headStyle.left = !fixed
            ? headTable && headTable.getBoundingClientRect().left
            : table[`${fixed}ContainerTable`] && table[`${fixed}ContainerTable`].getBoundingClientRect().left;
    }

    return isHeaderFixed ? (
        <div
            ref={fixed ? saveRef(`${fixed}ContainerTable`) : saveRef('headTable')}
            style={fixHeadContainerStyle}
        >
            {headContent}
        </div>
    ) : (
        headContent
    );
}

HeadTable.propTypes = {
    isHeaderFixed: PropTypes.bool,
    fixed: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    columns: PropTypes.array.isRequired,
    tableClassName: PropTypes.string.isRequired,
    handleBodyScrollLeft: PropTypes.func.isRequired,
    expander: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    refName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    fixedStyle: PropTypes.object
};

HeadTable.defaultProps = {
    isHeaderFixed: false,
    refName: '',
    fixedStyle: {}
};

HeadTable.contextTypes = {
    table: PropTypes.any
};
