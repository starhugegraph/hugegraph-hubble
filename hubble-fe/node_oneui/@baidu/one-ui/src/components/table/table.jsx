import React, {PureComponent} from 'react';
import {findDOMNode} from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {IconSort, IconArrowUp, IconArrowDown} from '@baidu/one-ui-icon';
import TableComponent from './common/table';
import tools from '../../core';
import Pagination from '../pagination';
import Icon from '../icon';
import FilterDropdown from './common/filterDropdown';
import SelectionBox from './common/selectionBox';
import SelectionCheckboxAll from './common/selectionCheckboxAll';

const {noop, stopPropagation, flatArray, treeMap, flatFilter, createStore} = tools.common;
const normalizeColumns = tools.table.normalizeColumns;

const defaultPageSize = 20;

const defaultLocale = {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterCancel: '取消',
    emptyText: <span>暂无数据</span>,
    selectAll: '全选当页',
    selectInvert: '反选当页'
};
const defaultPagination = {
    onPageSizeChange: noop,
    onPageNoChange: noop
};

const emptyObject = {};
export default class Table extends PureComponent {
    static propTypes = {
        /** 表格的数据 */
        dataSource: PropTypes.array,
        /** 表格的表头 详见demo */
        columns: PropTypes.array,
        /** 自定义表格类名 */
        prefixCls: PropTypes.string,
        /** 表格的分页器 */
        pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
        /** 表格行的key */
        rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        /** 表格行的className */
        rowClassName: PropTypes.func,
        /** 字母表子表渲染 */
        expandedRowRender: PropTypes.any,
        /** 默认展开的子表的key */
        defaultExpandedRowKeys: PropTypes.array,
        /** 展开的子表的key */
        expandedRowKeys: PropTypes.array,
        /** 展开按钮是否占一个单元格 */
        expandIconAsCell: PropTypes.bool,
        /** 展开字母表行变化的时候触发 Function(expandedRows) */
        onExpandedRowsChange: PropTypes.func,
        /** 点击展开/关闭字母表按钮时候触发 */
        onExpand: PropTypes.func,
        // onChange: PropTypes.func,
        /** 表格是否正在加载中 */
        loading: PropTypes.bool,
        /** 一些默认话术
         * filterTitle: '筛选',
         * filterConfirm: '确定',
         *  filterCancel: '取消',
         *  emptyText: <span>暂无数据</span>
         */
        locale: PropTypes.object,
        /** 表格单元格是否需要border */
        bordered: PropTypes.bool,
        /** 是否展示表头 */
        showHeader: PropTypes.bool,
        /**
         * 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比, true { x: number | true, y: number }
         */
        scroll: PropTypes.shape({
            x: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
            y: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
        }),
        /** 选择功能
         * rowSelection = {
         * type: 'checkbox',  选择类型，「checkbox」和 「radio」
            selectedRowKeys,  指定选中项的 key 数组，需要和 onChange 进行配合
            getCheckboxProps: record => { getCheckboxProps 选择框的默认属性配置 Function(record)
                return {
                    disabled: (panelIsEditing || !record.campaignId)
                };
            },
            onChange: this.props.onSelectChange 选中项发生变化时的回调 Function(selectedRowKeys, selectedRows)
            fixed 把选择框列固定在左边 boolean
        };
        */
        rowSelection: PropTypes.object,
        /** 自定义表格区域 style */
        bodyStyle: PropTypes.object,
        /** 自定义表格 类名 */
        className: PropTypes.string,
        /** 自定义 表格根节点样式 */
        style: PropTypes.object,
        /** 筛选dropdown 样式 */
        dropdownPrefixCls: PropTypes.string,
        /** 传入children 不推荐 */
        children: PropTypes.array,
        /** 当存在排序icon时候，点击触发函数 */
        onSortClick: PropTypes.func,
        /** 筛选改变时触发 */
        onFilterChange: PropTypes.func,
        /** 字母表的expand的icon类名 */
        expandIconClassName: PropTypes.string,
        /** 点击expand的icon触发的函数 */
        onClickExpandIcon: PropTypes.func,
        size: PropTypes.oneOf(['small', 'medium'])
    };

    static contextTypes = {
        oneLocale: PropTypes.object
    };

    static defaultProps = {
        dataSource: [],
        prefixCls: 'new-fc-one-table',
        rowSelection: null,
        className: '',
        loading: false,
        bordered: false,
        locale: {},
        rowKey: 'key',
        showHeader: true,
        expandIconClassName: '',
        onClickExpandIcon() {},
        size: 'small'
    };

    constructor(props) {
        super(props);
        this.columns = props.columns || normalizeColumns(props.children);
        this.state = {
            ...this.getSortStateFromColumns(),
            // 减少状态
            filters: this.getFiltersFromColumns(this.columns, true),
            pagination: this.getDefaultPagination(props),
            // eslint-disable-next-line react/no-unused-state
            prevProps: props
        };
        this.CheckboxPropsCache = {};
        this.store = createStore({
            selectedRowKeys: (props.rowSelection || {}).selectedRowKeys || [],
            selectionDirty: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.columns = nextProps.columns || normalizeColumns(nextProps.children);
        if ('pagination' in nextProps || 'pagination' in this.props) {
            this.setState(previousState => {
                const newPagination = {
                    ...defaultPagination,
                    ...previousState.pagination,
                    ...nextProps.pagination
                };
                newPagination.pageNo = newPagination.pageNo || 1;
                newPagination.pageSize = newPagination.pageSize || defaultPageSize;
                return {pagination: nextProps.pagination !== false ? newPagination : emptyObject};
            });
        }
        if (nextProps.rowSelection
            && 'selectedRowKeys' in nextProps.rowSelection) {
            this.store.setState({
                selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
            });
            const {rowSelection} = this.props;
            if (rowSelection && (
                nextProps.rowSelection.getCheckboxProps !== rowSelection.getCheckboxProps
            )) {
                this.CheckboxPropsCache = {};
            }
        }
        if ('dataSource' in nextProps
            && nextProps.dataSource !== this.props.dataSource) {
            this.store.setState({
                selectionDirty: false
            });
            this.CheckboxPropsCache = {};
        }
        if (this.getSortOrderColumns(this.columns).length > 0) {
            const sortState = this.getSortStateFromColumns(this.columns);
            if (sortState.sortColumn !== this.state.sortColumn
            || sortState.sortOrder !== this.state.sortOrder) {
                this.setState(sortState);
            }
        }
        const filteredValueColumns = this.getFilteredValueColumns(this.columns);
        if (filteredValueColumns.length > 0) {
            const filtersFromColumns = this.getFiltersFromColumns(this.columns);
            const newFilters = {...this.state.filters};
            Object.keys(filtersFromColumns).forEach(key => {
                newFilters[key] = filtersFromColumns[key];
            });
            if (this.isFiltersChanged(newFilters)) {
                this.setState({filters: newFilters});
            }
        }
    }

    getLocale() {
        let locale = {};
        if (this.context.oneLocale && this.context.oneLocale.Table) {
            locale = this.context.oneLocale.Table;
        }
        return {
            ...defaultLocale,
            ...locale,
            ...this.props.locale
        };
    }

    getCheckboxPropsByItem = (item, index) => {
        const {rowSelection = {}} = this.props;
        if (!rowSelection.getCheckboxProps) {
            return {};
        }
        const key = this.getRecordKey(item, index);
        // Cache checkboxProps
        if (!this.CheckboxPropsCache[key]) {
            this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
        }
        return this.CheckboxPropsCache[key];
    }

    getDefaultPagination(props) {
        const pagination = props.pagination || {};
        return this.hasPagination(props)
            ? {
                ...defaultPagination,
                ...pagination,
                pageNo: pagination.pageNo || 1,
                pageSize: pagination.pageSize || defaultPageSize
            } : {};
    }

    getDefaultSelection() {
        const {rowSelection = {}} = this.props;
        if (!rowSelection.getCheckboxProps) {
            return [];
        }
        return this.getFlatData()
            .filter((item, rowIndex) => this.getCheckboxPropsByItem(item, rowIndex).defaultChecked)
            .map((record, rowIndex) => this.getRecordKey(record, rowIndex));
    }

    setSelectedRowKeys(selectedRowKeys, {selectWay, record, checked, changeRowKeys}) {
        const {rowSelection = {}} = this.props;
        if (rowSelection && !('selectedRowKeys' in rowSelection)) {
            this.store.setState({selectedRowKeys});
        }
        const data = this.getFlatData();
        if (!rowSelection.onChange && !rowSelection[selectWay]) {
            return;
        }
        const selectedRows = data.filter(
            (row, i) => selectedRowKeys.indexOf(this.getRecordKey(row, i)) >= 0,
        );
        if (rowSelection.onChange) {
            rowSelection.onChange(selectedRowKeys, selectedRows);
        }
        if (selectWay === 'onSelect' && rowSelection.onSelect) {
            rowSelection.onSelect(record, checked, selectedRows);
        } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
            const changeRows = data.filter(
                (row, i) => changeRowKeys.indexOf(this.getRecordKey(row, i)) >= 0,
            );
            rowSelection.onSelectAll(checked, selectedRows, changeRows);
        } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
            rowSelection.onSelectInvert(selectedRowKeys);
        }
    }

    getFilteredValueColumns(columns, useDefault = false) {
        const filteredValue = flatFilter(columns || this.columns || [], column => typeof column.filteredValue !== 'undefined');
        if (useDefault) {
            return (flatFilter(columns || this.columns || [], column => typeof column.defaultFilteredValue !== 'undefined').concat(filteredValue));
        }
        return filteredValue;
    }

    getFiltersFromColumns(columns, useDefault = false) {
        const filters = {};
        this.getFilteredValueColumns(columns, useDefault).forEach(col => {
            let filteredValue = [];
            if (useDefault) {
                filteredValue = col.filteredValue || col.defaultFilteredValue || [];
            } else {
                filteredValue = col.filteredValue;
            }
            filters[this.getColumnKey(col)] = filteredValue;
        });
        return filters;
    }

    getSortStateFromColumns(columns) {
        // return fisrt column which sortOrder is not falsy
        const sortedColumn = this.getSortOrderColumns(columns).filter(col => col.sortOrder)[0];
        if (sortedColumn) {
            return {
                sortColumn: sortedColumn,
                sortOrder: sortedColumn.sortOrder
            };
        }
        return {
            sortColumn: null,
            sortOrder: null
        };
    }

    getLocalData() {
        const state = this.state;
        const {dataSource} = this.props;
        let data = dataSource || [];
        // 优化本地排序
        data = data.slice(0);
        const sorterFn = this.getSorterFn();
        if (sorterFn) {
            data = this.recursiveSort(data, sorterFn);
        }
        // 筛选
        if (state.filters) {
            Object.keys(state.filters).forEach(columnKey => {
                const col = this.findColumn(columnKey);
                if (!col) {
                    return;
                }
                const values = state.filters[columnKey] || [];
                if (values.length === 0) {
                    return;
                }
                const onFilter = col.onFilter;
                data = onFilter ? data.filter(record => {
                    return values.some(v => onFilter(v, record));
                }) : data;
            });
        }
        return data;
    }

    getSortOrderColumns(columns) {
        return flatFilter(columns || this.columns || [], column => 'sortOrder' in column);
    }

    getSorterFn() {
        const {sortOrder, sortColumn} = this.state;
        if (!sortOrder || !sortColumn
            || typeof sortColumn.sorter !== 'function') {
            return;
        }
        return (a, b) => {
            const result = sortColumn.sorter(a, b);
            if (result !== 0) {
                return (sortOrder === 'descend') ? -result : result;
            }
            return 0;
        };
    }

    getRecordKey = (record, index) => {
        const rowKey = this.props.rowKey;
        const recordKey = (typeof rowKey === 'function')
            ? rowKey(record, index) : record[rowKey];
        return recordKey === undefined ? index : recordKey;
    }

    getPopupContainer = () => {
        return findDOMNode(this);
    }

    getColumnKey = (column, index) => {
        return column.key || column.dataIndex || index;
    }

    getCurrentPageData() {
        let data = this.getLocalData();
        let pageNo;
        let pageSize;
        const state = this.state;
        // 如果没有分页的话，默认全部展示
        if (!this.hasPagination()) {
            pageSize = Number.MAX_VALUE;
            pageNo = 1;
        } else {
            pageSize = state.pagination.pageSize;
            pageNo = this.getMaxCurrent(state.pagination.total || data.length);
        }
        // 分页
        // ---
        // 当数据量少于等于每页数量时，直接设置数据
        // 否则进行读取分页数据
        if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
            data = data.filter((_, i) => {
                return i >= (pageNo - 1) * pageSize && i < pageNo * pageSize;
            });
        }
        return data;
    }

    getFlatCurrentPageData() {
        return flatArray(this.getCurrentPageData());
    }

    getMaxCurrent(total) {
        const {pageNo, pageSize} = this.state.pagination;
        if ((pageNo - 1) * pageSize >= total) {
            return Math.floor((total - 1) / pageSize) + 1;
        }
        return pageNo;
    }

    getFlatData() {
        return flatArray(this.getLocalData());
    }

    isFiltersChanged(filters) {
        let filtersChanged = false;
        if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
            filtersChanged = true;
        } else {
            Object.keys(filters).forEach(columnKey => {
                if (filters[columnKey] !== this.state.filters[columnKey]) {
                    filtersChanged = true;
                }
            });
        }
        return filtersChanged;
    }

    hasPagination(props) {
        return (props || this.props).pagination !== false;
    }

    toggleSortOrder(order, column) {
        let {sortColumn, sortOrder} = this.state;
        // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
        const isSortColumn = this.isSortColumn(column);
        if (!isSortColumn) { // 当前列未排序
            sortOrder = order;
            sortColumn = column;
        } else if (sortOrder === order) { // 当前列已排序
            // 切换为未排序状态
            sortOrder = '';
            sortColumn = null;
        } else { // 切换为排序状态
            sortOrder = order;
        }
        const newState = {
            sortOrder,
            sortColumn
        };
        // Controlled
        if (this.getSortOrderColumns().length === 0) {
            this.setState(newState);
        }
        const onSortClick = this.props.onSortClick;
        if (onSortClick) {
            onSortClick(newState);
        }
    }

    handleFilter = (column, nextFilters) => {
        const filters = {
            ...this.state.filters,
            [this.getColumnKey(column)]: nextFilters
        };
        // Remove filters not in current columns
        const currentColumnKeys = [];
        treeMap(this.columns, c => {
            if (!c.children) {
                currentColumnKeys.push(this.getColumnKey(c));
            }
        });
        Object.keys(filters).forEach(columnKey => {
            if (currentColumnKeys.indexOf(columnKey) < 0) {
                delete filters[columnKey];
            }
        });
        const newState = {
            // pagination,
            filters: {}
        };
        const filtersToSetState = {...filters};
        // Remove filters which is controlled
        this.getFilteredValueColumns().forEach(col => {
            const columnKey = this.getColumnKey(col);
            if (columnKey) {
                delete filtersToSetState[columnKey];
            }
        });
        if (Object.keys(filtersToSetState).length > 0) {
            newState.filters = filtersToSetState;
        }
        this.setState(newState, () => {
            this.store.setState({
                selectionDirty: false
            });
            const onFilterChange = this.props.onFilterChange;
            if (onFilterChange) {
                onFilterChange(filters);
            }
        });
    }

    handleSelect = (record, rowIndex, e) => {
        const checked = e.target.checked;
        const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
        let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
        const key = this.getRecordKey(record, rowIndex);
        if (checked) {
            selectedRowKeys.push(this.getRecordKey(record, rowIndex));
        } else {
            selectedRowKeys = selectedRowKeys.filter(i => key !== i);
        }
        this.store.setState({
            selectionDirty: true
        });
        this.setSelectedRowKeys(selectedRowKeys, {
            selectWay: 'onSelect',
            record,
            checked
        });
    }

    handleRadioSelect = (record, rowIndex, e) => {
        const checked = e.target.checked;
        const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
        let selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
        const key = this.getRecordKey(record, rowIndex);
        selectedRowKeys = [key];
        this.store.setState({
            selectionDirty: true
        });
        this.setSelectedRowKeys(selectedRowKeys, {
            selectWay: 'onSelect',
            record,
            checked
        });
    }

    handleSelectRow = (selectionKey, index, onSelectFunc) => {
        const data = this.getFlatCurrentPageData();
        const defaultSelection = this.store.getState().selectionDirty ? [] : this.getDefaultSelection();
        const selectedRowKeys = this.store.getState().selectedRowKeys.concat(defaultSelection);
        const changeableRowKeys = data
            .filter((item, i) => !this.getCheckboxPropsByItem(item, i).disabled)
            .map((item, i) => this.getRecordKey(item, i));
        const changeRowKeys = [];
        let selectWay = '';
        let checked;
        // handle default selection
        switch (selectionKey) {
            case 'all':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) < 0) {
                        selectedRowKeys.push(key);
                        changeRowKeys.push(key);
                    }
                });
                selectWay = 'onSelectAll';
                checked = true;
                break;
            case 'removeAll':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) >= 0) {
                        selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                        changeRowKeys.push(key);
                    }
                });
                selectWay = 'onSelectAll';
                checked = false;
                break;
            case 'invert':
                changeableRowKeys.forEach(key => {
                    if (selectedRowKeys.indexOf(key) < 0) {
                        selectedRowKeys.push(key);
                    } else {
                        selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
                    }
                    changeRowKeys.push(key);
                    selectWay = 'onSelectInvert';
                });
                break;
            default:
                break;
        }
        this.store.setState({
            selectionDirty: true
        });
        // when select custom selection, callback selections[n].onSelect
        const {rowSelection} = this.props;
        let customSelectionStartIndex = 2;
        if (rowSelection && rowSelection.hideDefaultSelections) {
            customSelectionStartIndex = 0;
        }
        if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
            return onSelectFunc(changeableRowKeys);
        }
        this.setSelectedRowKeys(selectedRowKeys, {
            selectWay,
            checked,
            changeRowKeys
        });
    }

    handlePageChange = e => {
        const props = this.props;
        const pageNo = +e.target.value;
        const pagination = {...this.state.pagination};
        if (pageNo) {
            pagination.pageNo = pageNo;
        } else {
            pagination.pageNo = pagination.pageNo || 1;
        }
        const newPageNo = pagination.pageNo;
        pagination.onPageNoChange({
            pageNo: newPageNo,
            pageSize: pagination.pageSize,
            target: {
                value: newPageNo
            }
        });
        const newState = {
            pagination
        };
        // Controlled current prop will not respond user interaction
        if (props.pagination
            && typeof props.pagination === 'object'
            && 'pageNo' in (props.pagination)) {
            newState.pagination = {
                ...pagination,
                pageNo: this.state.pagination.pageNo
            };
        }
        this.setState(newState);
        this.store.setState({
            selectionDirty: false
        });
    }

    isSortColumn(column) {
        const {sortColumn} = this.state;
        if (!column || !sortColumn) {
            return false;
        }
        return this.getColumnKey(sortColumn) === this.getColumnKey(column);
    }

    handleShowSizeChange = e => {
        const pagination = this.state.pagination;
        const pageSize = +e.target.value;
        const total = pagination.total || this.getLocalData().length;
        const pageNo = this.getMaxCurrent(total);
        pagination.onPageSizeChange({
            pageNo,
            pageSize,
            // 应该暴露的e.target.value, 但是因为之前已经这样暴露了，所以封装了一下
            target: {
                value: pageSize
            }
        });
        const nextPagination = {
            ...pagination,
            pageSize,
            pageNo
        };
        this.setState({pagination: nextPagination});
    }

    // Get pagination, filters, sorter
    prepareParamsArguments(state) {
        const pagination = {...state.pagination};
        // remove useless handle function in Table.onChange
        delete pagination.onPageSizeChange;
        delete pagination.onShowSizeChange;
        const filters = state.filters;
        const sorter = {};
        if (state.sortColumn && state.sortOrder) {
            sorter.column = state.sortColumn;
            sorter.order = state.sortOrder;
            sorter.field = state.sortColumn.dataIndex;
            sorter.columnKey = this.getColumnKey(state.sortColumn);
        }
        return [pagination, filters, sorter];
    }

    findColumn(myKey) {
        let column;
        treeMap(this.columns, c => {
            if (this.getColumnKey(c) === myKey) {
                column = c;
            }
        });
        return column;
    }

    recursiveSort(data, sorterFn) {
        // const {childrenColumnName = 'children'} = this.props;
        const childrenColumnName = 'children';
        return data.sort(sorterFn).map(item => (item[childrenColumnName] ? {
            ...item,
            [childrenColumnName]: this.recursiveSort(item[childrenColumnName], sorterFn)
        } : item));
    }

    renderPagination() {
        // 强制不需要分页
        if (!this.hasPagination()) {
            return null;
        }
        let size = 'small';
        const pagination = this.state.pagination;
        if (pagination.size) {
            size = pagination.size;
        }
        const total = pagination.total || this.getLocalData().length;
        return (total > 0) ? (
            <Pagination
                key="pagination"
                {...pagination}
                className={classNames(pagination.className, `${this.props.prefixCls}-pagination`)}
                onPageNoChange={this.handlePageChange}
                total={total}
                size={size}
                pageNo={this.getMaxCurrent(total)}
                onPageSizeChange={this.handleShowSizeChange}
            />
        ) : null;
    }

    renderColumnsDropdown(columns) {
        const {prefixCls, dropdownPrefixCls} = this.props;
        const {sortOrder, filters} = this.state;
        const locale = this.getLocale();
        return treeMap(columns, (originColumn, i) => {
            const column = {...originColumn};
            const key = this.getColumnKey(column, i);
            let filterDropdown;
            let sortButton;
            let hasIcon = false;
            if ((column.filters && column.filters.length > 0) || column.filterDropdown) {
                const colFilters = this.state.filters[key] || [];
                hasIcon = true;
                filterDropdown = (
                    <FilterDropdown
                        locale={locale}
                        column={column}
                        selectedKeys={colFilters}
                        confirmFilter={this.handleFilter}
                        prefixCls={`${prefixCls}-filter`}
                        dropdownPrefixCls={dropdownPrefixCls || 'new-fc-one-dropdown'}
                        getPopupContainer={this.getPopupContainer}
                    />
                );
            }
            const customSortNode = column.customSortNode;
            if (column.sorter || customSortNode) {
                const isSortColumn = this.isSortColumn(column);
                hasIcon = true;
                if (isSortColumn) {
                    column.className = column.className || '';
                    if (sortOrder) {
                        column.className += ` ${prefixCls}-column-sort`;
                    }
                }
                const isAscend = isSortColumn && sortOrder === 'ascend';
                const isDescend = isSortColumn && sortOrder === 'descend';
                const initialSortType = column.initialSortType || 'descend';
                let sortIcon = <IconSort />;
                let nextSortType = initialSortType;
                if (isAscend) {
                    sortIcon = <IconArrowUp />;
                    nextSortType = 'descend';
                } else if (isDescend) {
                    sortIcon = <IconArrowDown />;
                    nextSortType = 'ascend';
                }
                // 支持自定义排序节点， 如果没传入就用默认的
                sortButton = customSortNode || (
                    <div className={`${prefixCls}-column-sorter`}>
                        <span
                            className={`${prefixCls}-column-sort`}
                            onClick={() => this.toggleSortOrder(nextSortType, column)}
                        >
                            {sortIcon}
                        </span>
                    </div>
                );
            }
            if (column.customOperate && column.customOperate.length > 0) {
                hasIcon = true;
            }
            const columnClassName = classNames(
                `${prefixCls}-selection-column`,
                column.className
            );
            column.hasIcon = hasIcon;
            column.title = (
                <span className={columnClassName}>
                    {typeof column.title === 'function' ? column.title({sortOrder, filters}) : column.title}
                    {
                        hasIcon ? (
                            <div className={`${prefixCls}-selection-column-operate`}>
                                {
                                    sortButton ? (
                                        <span className={`${prefixCls}-selection-column-operate-item`}>
                                            {sortButton}
                                        </span>
                                    ) : null
                                }
                                {
                                    filterDropdown ? (
                                        <span className={`${prefixCls}-selection-column-operate-item`}>
                                            {filterDropdown}
                                        </span>
                                    ) : null
                                }
                                {
                                    column.customOperate && column.customOperate.map((itemNode, key) => {
                                        return itemNode ? (
                                            <span
                                                className={`${prefixCls}-selection-column-operate-item`}
                                                key={key}
                                            >
                                                {itemNode}
                                            </span>
                                        ) : null;
                                    })
                                }
                            </div>
                        ) : null
                    }
                </span>
            );
            return column;
        });
    }

    renderRowSelection() {
        const {prefixCls, rowSelection} = this.props;
        const columns = this.columns.concat();
        if (rowSelection) {
            const data = this.getFlatCurrentPageData().filter((item, index) => {
                if (rowSelection.getCheckboxProps) {
                    return !this.getCheckboxPropsByItem(item, index).disabled;
                }
                return true;
            });
            const selectionColumnClass = classNames(`${prefixCls}-selection-column`, {
                [`${prefixCls}-selection-column-custom`]: rowSelection.selections
            });
            const selectionColumn = {
                key: 'selection-column',
                render: this.renderSelectionBox(rowSelection.type),
                className: selectionColumnClass
            };
            if (rowSelection.type !== 'radio') {
                const checkboxAllDisabled = data.every((item, index) => this.getCheckboxPropsByItem(item, index).disabled);
                selectionColumn.title = (
                    <SelectionCheckboxAll
                        store={this.store}
                        locale={this.getLocale()}
                        data={data}
                        getCheckboxPropsByItem={this.getCheckboxPropsByItem}
                        getRecordKey={this.getRecordKey}
                        disabled={checkboxAllDisabled}
                        prefixCls={prefixCls}
                        onSelect={this.handleSelectRow}
                        selections={rowSelection.selections}
                        hideDefaultSelections={rowSelection.hideDefaultSelections}
                        getPopupContainer={this.getPopupContainer}
                    />
                );
            }
            if (columns.some(column => column.fixed === 'left' || column.fixed === true)) {
                selectionColumn.fixed = 'left';
            }
            if (columns[0] && columns[0].key === 'selection-column') {
                columns[0] = selectionColumn;
            } else {
                columns.unshift(selectionColumn);
            }
        }
        return columns;
    }

    renderSelectionBox = type => {
        return (_, record, index) => {
            const rowIndex = this.getRecordKey(record, index); // 从 1 开始
            const props = this.getCheckboxPropsByItem(record, index);
            const handleChange = e => {
                if (type === 'radio') {
                    this.handleRadioSelect(record, index, e);
                } else {
                    this.handleSelect(record, index, e);
                }
            };
            return (
                <span onClick={stopPropagation}>
                    <SelectionBox
                        type={type}
                        store={this.store}
                        rowIndex={rowIndex}
                        disabled={props.disabled}
                        indeterminate={props.indeterminate}
                        onChange={handleChange}
                        defaultSelection={this.getDefaultSelection()}
                    />
                </span>
            );
        };
    }

    render() {
        const {style, className, prefixCls, showHeader, loading, size, ...restProps} = this.props;
        const data = this.getCurrentPageData();
        let columns = this.renderRowSelection();
        const expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
        const locale = this.getLocale();
        const classString = classNames(`${prefixCls}-${size}`, {
            [`${prefixCls}-bordered`]: this.props.bordered,
            [`${prefixCls}-empty`]: !data.length,
            [`${prefixCls}-without-column-header`]: !showHeader
        });
        columns = this.renderColumnsDropdown(columns);
        columns = columns.map((column, i) => {
            const newColumn = {...column};
            newColumn.key = this.getColumnKey(newColumn, i);
            return newColumn;
        });
        let expandIconColumnIndex = (columns[0] && columns[0].key === 'selection-column') ? 1 : 0;
        if ('expandIconColumnIndex' in restProps) {
            expandIconColumnIndex = restProps.expandIconColumnIndex;
        }
        const table = (
            <TableComponent
                key="table"
                {...restProps}
                prefixCls={prefixCls}
                data={data}
                columns={columns}
                showHeader={showHeader}
                className={classString}
                expandIconColumnIndex={expandIconColumnIndex}
                expandIconAsCell={expandIconAsCell}
                emptyText={() => locale.emptyText}
            />
        );
        const paginationPatchClass = (this.hasPagination() && data && data.length !== 0)
            ? `${prefixCls}-with-pagination` : `${prefixCls}-without-pagination`;
        return (
            <div
                className={classNames(`${prefixCls}-wrapper`, className, {
                    [`${prefixCls}-wrapper-no-header`]: !showHeader
                })}
                style={style}
            >
                <div
                    className={loading ? `${paginationPatchClass} ${prefixCls}-loading-holder` : ''}
                >
                    {
                        loading ? (
                            <div className={`${prefixCls}-loading-holder-mask`}>
                                <Icon type="loading" />
                            </div>
                        ) : null
                    }
                    {table}
                    {this.renderPagination()}
                </div>
            </div>
        );
    }
}
