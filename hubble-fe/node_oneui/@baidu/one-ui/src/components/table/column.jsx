/* eslint-disable no-unused-vars */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/prefer-stateless-function */
export default class Column extends PureComponent {
    /* eslint-disable react/no-unused-prop-types */
    static propTypes = {
        title: PropTypes.node,
        key: PropTypes.string,
        dataIndex: PropTypes.string,
        render: PropTypes.func,
        filters: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.string,
            children: PropTypes.any
        })),
        onFilter: PropTypes.func,
        filterMultiple: PropTypes.bool,
        filterDropdown: PropTypes.node,
        filterDropdownVisible: PropTypes.bool,
        onFilterDropdownVisibleChange: PropTypes.func,
        sorter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
        colSpan: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        className: PropTypes.string,
        fixed: PropTypes.oneOf(['left', 'right', true, false]),
        filterIcon: PropTypes.node,
        filteredValue: PropTypes.array,
        sortOrder: PropTypes.oneOf(['ascend', 'descend', true, false]),
        children: PropTypes.array,
        onCellClick: PropTypes.func,
        customOperate: PropTypes.array,
        customSortNode: PropTypes.node
    };
}
