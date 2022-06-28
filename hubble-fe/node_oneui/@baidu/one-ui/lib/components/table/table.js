"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _table = _interopRequireDefault(require("./common/table"));

var _core = _interopRequireDefault(require("../../core"));

var _pagination = _interopRequireDefault(require("../pagination"));

var _icon = _interopRequireDefault(require("../icon"));

var _filterDropdown = _interopRequireDefault(require("./common/filterDropdown"));

var _selectionBox = _interopRequireDefault(require("./common/selectionBox"));

var _selectionCheckboxAll = _interopRequireDefault(require("./common/selectionCheckboxAll"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _tools$common = _core["default"].common,
    noop = _tools$common.noop,
    stopPropagation = _tools$common.stopPropagation,
    flatArray = _tools$common.flatArray,
    treeMap = _tools$common.treeMap,
    flatFilter = _tools$common.flatFilter,
    createStore = _tools$common.createStore;
var normalizeColumns = _core["default"].table.normalizeColumns;
var defaultPageSize = 20;
var defaultLocale = {
  filterTitle: '筛选',
  filterConfirm: '确定',
  filterCancel: '取消',
  emptyText: _react["default"].createElement("span", null, "\u6682\u65E0\u6570\u636E"),
  selectAll: '全选当页',
  selectInvert: '反选当页'
};
var defaultPagination = {
  onPageSizeChange: noop,
  onPageNoChange: noop
};
var emptyObject = {};

var Table =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Table, _PureComponent);

  function Table(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getCheckboxPropsByItem", function (item, index) {
      var _this$props$rowSelect = _this.props.rowSelection,
          rowSelection = _this$props$rowSelect === void 0 ? {} : _this$props$rowSelect;

      if (!rowSelection.getCheckboxProps) {
        return {};
      }

      var key = _this.getRecordKey(item, index); // Cache checkboxProps


      if (!_this.CheckboxPropsCache[key]) {
        _this.CheckboxPropsCache[key] = rowSelection.getCheckboxProps(item);
      }

      return _this.CheckboxPropsCache[key];
    });

    _defineProperty(_assertThisInitialized(_this), "getRecordKey", function (record, index) {
      var rowKey = _this.props.rowKey;
      var recordKey = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      return recordKey === undefined ? index : recordKey;
    });

    _defineProperty(_assertThisInitialized(_this), "getPopupContainer", function () {
      return (0, _reactDom.findDOMNode)(_assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "getColumnKey", function (column, index) {
      return column.key || column.dataIndex || index;
    });

    _defineProperty(_assertThisInitialized(_this), "handleFilter", function (column, nextFilters) {
      var _extends2;

      var filters = _extends({}, _this.state.filters, (_extends2 = {}, _extends2[_this.getColumnKey(column)] = nextFilters, _extends2)); // Remove filters not in current columns


      var currentColumnKeys = [];
      treeMap(_this.columns, function (c) {
        if (!c.children) {
          currentColumnKeys.push(_this.getColumnKey(c));
        }
      });
      Object.keys(filters).forEach(function (columnKey) {
        if (currentColumnKeys.indexOf(columnKey) < 0) {
          delete filters[columnKey];
        }
      });
      var newState = {
        // pagination,
        filters: {}
      };

      var filtersToSetState = _extends({}, filters); // Remove filters which is controlled


      _this.getFilteredValueColumns().forEach(function (col) {
        var columnKey = _this.getColumnKey(col);

        if (columnKey) {
          delete filtersToSetState[columnKey];
        }
      });

      if (Object.keys(filtersToSetState).length > 0) {
        newState.filters = filtersToSetState;
      }

      _this.setState(newState, function () {
        _this.store.setState({
          selectionDirty: false
        });

        var onFilterChange = _this.props.onFilterChange;

        if (onFilterChange) {
          onFilterChange(filters);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelect", function (record, rowIndex, e) {
      var checked = e.target.checked;
      var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();

      var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);

      var key = _this.getRecordKey(record, rowIndex);

      if (checked) {
        selectedRowKeys.push(_this.getRecordKey(record, rowIndex));
      } else {
        selectedRowKeys = selectedRowKeys.filter(function (i) {
          return key !== i;
        });
      }

      _this.store.setState({
        selectionDirty: true
      });

      _this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: 'onSelect',
        record: record,
        checked: checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRadioSelect", function (record, rowIndex, e) {
      var checked = e.target.checked;
      var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();

      var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);

      var key = _this.getRecordKey(record, rowIndex);

      selectedRowKeys = [key];

      _this.store.setState({
        selectionDirty: true
      });

      _this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: 'onSelect',
        record: record,
        checked: checked
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectRow", function (selectionKey, index, onSelectFunc) {
      var data = _this.getFlatCurrentPageData();

      var defaultSelection = _this.store.getState().selectionDirty ? [] : _this.getDefaultSelection();

      var selectedRowKeys = _this.store.getState().selectedRowKeys.concat(defaultSelection);

      var changeableRowKeys = data.filter(function (item, i) {
        return !_this.getCheckboxPropsByItem(item, i).disabled;
      }).map(function (item, i) {
        return _this.getRecordKey(item, i);
      });
      var changeRowKeys = [];
      var selectWay = '';
      var checked; // handle default selection

      switch (selectionKey) {
        case 'all':
          changeableRowKeys.forEach(function (key) {
            if (selectedRowKeys.indexOf(key) < 0) {
              selectedRowKeys.push(key);
              changeRowKeys.push(key);
            }
          });
          selectWay = 'onSelectAll';
          checked = true;
          break;

        case 'removeAll':
          changeableRowKeys.forEach(function (key) {
            if (selectedRowKeys.indexOf(key) >= 0) {
              selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
              changeRowKeys.push(key);
            }
          });
          selectWay = 'onSelectAll';
          checked = false;
          break;

        case 'invert':
          changeableRowKeys.forEach(function (key) {
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

      _this.store.setState({
        selectionDirty: true
      }); // when select custom selection, callback selections[n].onSelect


      var rowSelection = _this.props.rowSelection;
      var customSelectionStartIndex = 2;

      if (rowSelection && rowSelection.hideDefaultSelections) {
        customSelectionStartIndex = 0;
      }

      if (index >= customSelectionStartIndex && typeof onSelectFunc === 'function') {
        return onSelectFunc(changeableRowKeys);
      }

      _this.setSelectedRowKeys(selectedRowKeys, {
        selectWay: selectWay,
        checked: checked,
        changeRowKeys: changeRowKeys
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handlePageChange", function (e) {
      var props = _this.props;
      var pageNo = +e.target.value;

      var pagination = _extends({}, _this.state.pagination);

      if (pageNo) {
        pagination.pageNo = pageNo;
      } else {
        pagination.pageNo = pagination.pageNo || 1;
      }

      var newPageNo = pagination.pageNo;
      pagination.onPageNoChange({
        pageNo: newPageNo,
        pageSize: pagination.pageSize,
        target: {
          value: newPageNo
        }
      });
      var newState = {
        pagination: pagination
      }; // Controlled current prop will not respond user interaction

      if (props.pagination && typeof props.pagination === 'object' && 'pageNo' in props.pagination) {
        newState.pagination = _extends({}, pagination, {
          pageNo: _this.state.pagination.pageNo
        });
      }

      _this.setState(newState);

      _this.store.setState({
        selectionDirty: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleShowSizeChange", function (e) {
      var pagination = _this.state.pagination;
      var pageSize = +e.target.value;

      var total = pagination.total || _this.getLocalData().length;

      var pageNo = _this.getMaxCurrent(total);

      pagination.onPageSizeChange({
        pageNo: pageNo,
        pageSize: pageSize,
        // 应该暴露的e.target.value, 但是因为之前已经这样暴露了，所以封装了一下
        target: {
          value: pageSize
        }
      });

      var nextPagination = _extends({}, pagination, {
        pageSize: pageSize,
        pageNo: pageNo
      });

      _this.setState({
        pagination: nextPagination
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelectionBox", function (type) {
      return function (_, record, index) {
        var rowIndex = _this.getRecordKey(record, index); // 从 1 开始


        var props = _this.getCheckboxPropsByItem(record, index);

        var handleChange = function handleChange(e) {
          if (type === 'radio') {
            _this.handleRadioSelect(record, index, e);
          } else {
            _this.handleSelect(record, index, e);
          }
        };

        return _react["default"].createElement("span", {
          onClick: stopPropagation
        }, _react["default"].createElement(_selectionBox["default"], {
          type: type,
          store: _this.store,
          rowIndex: rowIndex,
          disabled: props.disabled,
          indeterminate: props.indeterminate,
          onChange: handleChange,
          defaultSelection: _this.getDefaultSelection()
        }));
      };
    });

    _this.columns = _props.columns || normalizeColumns(_props.children);
    _this.state = _extends({}, _this.getSortStateFromColumns(), {
      // 减少状态
      filters: _this.getFiltersFromColumns(_this.columns, true),
      pagination: _this.getDefaultPagination(_props),
      // eslint-disable-next-line react/no-unused-state
      prevProps: _props
    });
    _this.CheckboxPropsCache = {};
    _this.store = createStore({
      selectedRowKeys: (_props.rowSelection || {}).selectedRowKeys || [],
      selectionDirty: false
    });
    return _this;
  }

  var _proto = Table.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.columns = nextProps.columns || normalizeColumns(nextProps.children);

    if ('pagination' in nextProps || 'pagination' in this.props) {
      this.setState(function (previousState) {
        var newPagination = _extends({}, defaultPagination, previousState.pagination, nextProps.pagination);

        newPagination.pageNo = newPagination.pageNo || 1;
        newPagination.pageSize = newPagination.pageSize || defaultPageSize;
        return {
          pagination: nextProps.pagination !== false ? newPagination : emptyObject
        };
      });
    }

    if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
      this.store.setState({
        selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
      });
      var rowSelection = this.props.rowSelection;

      if (rowSelection && nextProps.rowSelection.getCheckboxProps !== rowSelection.getCheckboxProps) {
        this.CheckboxPropsCache = {};
      }
    }

    if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
      this.store.setState({
        selectionDirty: false
      });
      this.CheckboxPropsCache = {};
    }

    if (this.getSortOrderColumns(this.columns).length > 0) {
      var sortState = this.getSortStateFromColumns(this.columns);

      if (sortState.sortColumn !== this.state.sortColumn || sortState.sortOrder !== this.state.sortOrder) {
        this.setState(sortState);
      }
    }

    var filteredValueColumns = this.getFilteredValueColumns(this.columns);

    if (filteredValueColumns.length > 0) {
      var filtersFromColumns = this.getFiltersFromColumns(this.columns);

      var newFilters = _extends({}, this.state.filters);

      Object.keys(filtersFromColumns).forEach(function (key) {
        newFilters[key] = filtersFromColumns[key];
      });

      if (this.isFiltersChanged(newFilters)) {
        this.setState({
          filters: newFilters
        });
      }
    }
  };

  _proto.getLocale = function getLocale() {
    var locale = {};

    if (this.context.oneLocale && this.context.oneLocale.Table) {
      locale = this.context.oneLocale.Table;
    }

    return _extends({}, defaultLocale, locale, this.props.locale);
  };

  _proto.getDefaultPagination = function getDefaultPagination(props) {
    var pagination = props.pagination || {};
    return this.hasPagination(props) ? _extends({}, defaultPagination, pagination, {
      pageNo: pagination.pageNo || 1,
      pageSize: pagination.pageSize || defaultPageSize
    }) : {};
  };

  _proto.getDefaultSelection = function getDefaultSelection() {
    var _this2 = this;

    var _this$props$rowSelect2 = this.props.rowSelection,
        rowSelection = _this$props$rowSelect2 === void 0 ? {} : _this$props$rowSelect2;

    if (!rowSelection.getCheckboxProps) {
      return [];
    }

    return this.getFlatData().filter(function (item, rowIndex) {
      return _this2.getCheckboxPropsByItem(item, rowIndex).defaultChecked;
    }).map(function (record, rowIndex) {
      return _this2.getRecordKey(record, rowIndex);
    });
  };

  _proto.setSelectedRowKeys = function setSelectedRowKeys(selectedRowKeys, _ref) {
    var _this3 = this;

    var selectWay = _ref.selectWay,
        record = _ref.record,
        checked = _ref.checked,
        changeRowKeys = _ref.changeRowKeys;
    var _this$props$rowSelect3 = this.props.rowSelection,
        rowSelection = _this$props$rowSelect3 === void 0 ? {} : _this$props$rowSelect3;

    if (rowSelection && !('selectedRowKeys' in rowSelection)) {
      this.store.setState({
        selectedRowKeys: selectedRowKeys
      });
    }

    var data = this.getFlatData();

    if (!rowSelection.onChange && !rowSelection[selectWay]) {
      return;
    }

    var selectedRows = data.filter(function (row, i) {
      return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
    });

    if (rowSelection.onChange) {
      rowSelection.onChange(selectedRowKeys, selectedRows);
    }

    if (selectWay === 'onSelect' && rowSelection.onSelect) {
      rowSelection.onSelect(record, checked, selectedRows);
    } else if (selectWay === 'onSelectAll' && rowSelection.onSelectAll) {
      var changeRows = data.filter(function (row, i) {
        return changeRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
      });
      rowSelection.onSelectAll(checked, selectedRows, changeRows);
    } else if (selectWay === 'onSelectInvert' && rowSelection.onSelectInvert) {
      rowSelection.onSelectInvert(selectedRowKeys);
    }
  };

  _proto.getFilteredValueColumns = function getFilteredValueColumns(columns, useDefault) {
    if (useDefault === void 0) {
      useDefault = false;
    }

    var filteredValue = flatFilter(columns || this.columns || [], function (column) {
      return typeof column.filteredValue !== 'undefined';
    });

    if (useDefault) {
      return flatFilter(columns || this.columns || [], function (column) {
        return typeof column.defaultFilteredValue !== 'undefined';
      }).concat(filteredValue);
    }

    return filteredValue;
  };

  _proto.getFiltersFromColumns = function getFiltersFromColumns(columns, useDefault) {
    var _this4 = this;

    if (useDefault === void 0) {
      useDefault = false;
    }

    var filters = {};
    this.getFilteredValueColumns(columns, useDefault).forEach(function (col) {
      var filteredValue = [];

      if (useDefault) {
        filteredValue = col.filteredValue || col.defaultFilteredValue || [];
      } else {
        filteredValue = col.filteredValue;
      }

      filters[_this4.getColumnKey(col)] = filteredValue;
    });
    return filters;
  };

  _proto.getSortStateFromColumns = function getSortStateFromColumns(columns) {
    // return fisrt column which sortOrder is not falsy
    var sortedColumn = this.getSortOrderColumns(columns).filter(function (col) {
      return col.sortOrder;
    })[0];

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
  };

  _proto.getLocalData = function getLocalData() {
    var _this5 = this;

    var state = this.state;
    var dataSource = this.props.dataSource;
    var data = dataSource || []; // 优化本地排序

    data = data.slice(0);
    var sorterFn = this.getSorterFn();

    if (sorterFn) {
      data = this.recursiveSort(data, sorterFn);
    } // 筛选


    if (state.filters) {
      Object.keys(state.filters).forEach(function (columnKey) {
        var col = _this5.findColumn(columnKey);

        if (!col) {
          return;
        }

        var values = state.filters[columnKey] || [];

        if (values.length === 0) {
          return;
        }

        var onFilter = col.onFilter;
        data = onFilter ? data.filter(function (record) {
          return values.some(function (v) {
            return onFilter(v, record);
          });
        }) : data;
      });
    }

    return data;
  };

  _proto.getSortOrderColumns = function getSortOrderColumns(columns) {
    return flatFilter(columns || this.columns || [], function (column) {
      return 'sortOrder' in column;
    });
  };

  _proto.getSorterFn = function getSorterFn() {
    var _this$state = this.state,
        sortOrder = _this$state.sortOrder,
        sortColumn = _this$state.sortColumn;

    if (!sortOrder || !sortColumn || typeof sortColumn.sorter !== 'function') {
      return;
    }

    return function (a, b) {
      var result = sortColumn.sorter(a, b);

      if (result !== 0) {
        return sortOrder === 'descend' ? -result : result;
      }

      return 0;
    };
  };

  _proto.getCurrentPageData = function getCurrentPageData() {
    var data = this.getLocalData();
    var pageNo;
    var pageSize;
    var state = this.state; // 如果没有分页的话，默认全部展示

    if (!this.hasPagination()) {
      pageSize = Number.MAX_VALUE;
      pageNo = 1;
    } else {
      pageSize = state.pagination.pageSize;
      pageNo = this.getMaxCurrent(state.pagination.total || data.length);
    } // 分页
    // ---
    // 当数据量少于等于每页数量时，直接设置数据
    // 否则进行读取分页数据


    if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
      data = data.filter(function (_, i) {
        return i >= (pageNo - 1) * pageSize && i < pageNo * pageSize;
      });
    }

    return data;
  };

  _proto.getFlatCurrentPageData = function getFlatCurrentPageData() {
    return flatArray(this.getCurrentPageData());
  };

  _proto.getMaxCurrent = function getMaxCurrent(total) {
    var _this$state$paginatio = this.state.pagination,
        pageNo = _this$state$paginatio.pageNo,
        pageSize = _this$state$paginatio.pageSize;

    if ((pageNo - 1) * pageSize >= total) {
      return Math.floor((total - 1) / pageSize) + 1;
    }

    return pageNo;
  };

  _proto.getFlatData = function getFlatData() {
    return flatArray(this.getLocalData());
  };

  _proto.isFiltersChanged = function isFiltersChanged(filters) {
    var _this6 = this;

    var filtersChanged = false;

    if (Object.keys(filters).length !== Object.keys(this.state.filters).length) {
      filtersChanged = true;
    } else {
      Object.keys(filters).forEach(function (columnKey) {
        if (filters[columnKey] !== _this6.state.filters[columnKey]) {
          filtersChanged = true;
        }
      });
    }

    return filtersChanged;
  };

  _proto.hasPagination = function hasPagination(props) {
    return (props || this.props).pagination !== false;
  };

  _proto.toggleSortOrder = function toggleSortOrder(order, column) {
    var _this$state2 = this.state,
        sortColumn = _this$state2.sortColumn,
        sortOrder = _this$state2.sortOrder; // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题

    var isSortColumn = this.isSortColumn(column);

    if (!isSortColumn) {
      // 当前列未排序
      sortOrder = order;
      sortColumn = column;
    } else if (sortOrder === order) {
      // 当前列已排序
      // 切换为未排序状态
      sortOrder = '';
      sortColumn = null;
    } else {
      // 切换为排序状态
      sortOrder = order;
    }

    var newState = {
      sortOrder: sortOrder,
      sortColumn: sortColumn
    }; // Controlled

    if (this.getSortOrderColumns().length === 0) {
      this.setState(newState);
    }

    var onSortClick = this.props.onSortClick;

    if (onSortClick) {
      onSortClick(newState);
    }
  };

  _proto.isSortColumn = function isSortColumn(column) {
    var sortColumn = this.state.sortColumn;

    if (!column || !sortColumn) {
      return false;
    }

    return this.getColumnKey(sortColumn) === this.getColumnKey(column);
  };

  // Get pagination, filters, sorter
  _proto.prepareParamsArguments = function prepareParamsArguments(state) {
    var pagination = _extends({}, state.pagination); // remove useless handle function in Table.onChange


    delete pagination.onPageSizeChange;
    delete pagination.onShowSizeChange;
    var filters = state.filters;
    var sorter = {};

    if (state.sortColumn && state.sortOrder) {
      sorter.column = state.sortColumn;
      sorter.order = state.sortOrder;
      sorter.field = state.sortColumn.dataIndex;
      sorter.columnKey = this.getColumnKey(state.sortColumn);
    }

    return [pagination, filters, sorter];
  };

  _proto.findColumn = function findColumn(myKey) {
    var _this7 = this;

    var column;
    treeMap(this.columns, function (c) {
      if (_this7.getColumnKey(c) === myKey) {
        column = c;
      }
    });
    return column;
  };

  _proto.recursiveSort = function recursiveSort(data, sorterFn) {
    var _this8 = this;

    // const {childrenColumnName = 'children'} = this.props;
    var childrenColumnName = 'children';
    return data.sort(sorterFn).map(function (item) {
      var _extends3;

      return item[childrenColumnName] ? _extends({}, item, (_extends3 = {}, _extends3[childrenColumnName] = _this8.recursiveSort(item[childrenColumnName], sorterFn), _extends3)) : item;
    });
  };

  _proto.renderPagination = function renderPagination() {
    // 强制不需要分页
    if (!this.hasPagination()) {
      return null;
    }

    var size = 'small';
    var pagination = this.state.pagination;

    if (pagination.size) {
      size = pagination.size;
    }

    var total = pagination.total || this.getLocalData().length;
    return total > 0 ? _react["default"].createElement(_pagination["default"], _extends({
      key: "pagination"
    }, pagination, {
      className: (0, _classnames["default"])(pagination.className, this.props.prefixCls + "-pagination"),
      onPageNoChange: this.handlePageChange,
      total: total,
      size: size,
      pageNo: this.getMaxCurrent(total),
      onPageSizeChange: this.handleShowSizeChange
    })) : null;
  };

  _proto.renderColumnsDropdown = function renderColumnsDropdown(columns) {
    var _this9 = this;

    var _this$props = this.props,
        prefixCls = _this$props.prefixCls,
        dropdownPrefixCls = _this$props.dropdownPrefixCls;
    var _this$state3 = this.state,
        sortOrder = _this$state3.sortOrder,
        filters = _this$state3.filters;
    var locale = this.getLocale();
    return treeMap(columns, function (originColumn, i) {
      var column = _extends({}, originColumn);

      var key = _this9.getColumnKey(column, i);

      var filterDropdown;
      var sortButton;
      var hasIcon = false;

      if (column.filters && column.filters.length > 0 || column.filterDropdown) {
        var colFilters = _this9.state.filters[key] || [];
        hasIcon = true;
        filterDropdown = _react["default"].createElement(_filterDropdown["default"], {
          locale: locale,
          column: column,
          selectedKeys: colFilters,
          confirmFilter: _this9.handleFilter,
          prefixCls: prefixCls + "-filter",
          dropdownPrefixCls: dropdownPrefixCls || 'new-fc-one-dropdown',
          getPopupContainer: _this9.getPopupContainer
        });
      }

      var customSortNode = column.customSortNode;

      if (column.sorter || customSortNode) {
        var isSortColumn = _this9.isSortColumn(column);

        hasIcon = true;

        if (isSortColumn) {
          column.className = column.className || '';

          if (sortOrder) {
            column.className += " " + prefixCls + "-column-sort";
          }
        }

        var isAscend = isSortColumn && sortOrder === 'ascend';
        var isDescend = isSortColumn && sortOrder === 'descend';
        var initialSortType = column.initialSortType || 'descend';

        var sortIcon = _react["default"].createElement(_oneUiIcon.IconSort, null);

        var nextSortType = initialSortType;

        if (isAscend) {
          sortIcon = _react["default"].createElement(_oneUiIcon.IconArrowUp, null);
          nextSortType = 'descend';
        } else if (isDescend) {
          sortIcon = _react["default"].createElement(_oneUiIcon.IconArrowDown, null);
          nextSortType = 'ascend';
        } // 支持自定义排序节点， 如果没传入就用默认的


        sortButton = customSortNode || _react["default"].createElement("div", {
          className: prefixCls + "-column-sorter"
        }, _react["default"].createElement("span", {
          className: prefixCls + "-column-sort",
          onClick: function onClick() {
            return _this9.toggleSortOrder(nextSortType, column);
          }
        }, sortIcon));
      }

      if (column.customOperate && column.customOperate.length > 0) {
        hasIcon = true;
      }

      var columnClassName = (0, _classnames["default"])(prefixCls + "-selection-column", column.className);
      column.hasIcon = hasIcon;
      column.title = _react["default"].createElement("span", {
        className: columnClassName
      }, typeof column.title === 'function' ? column.title({
        sortOrder: sortOrder,
        filters: filters
      }) : column.title, hasIcon ? _react["default"].createElement("div", {
        className: prefixCls + "-selection-column-operate"
      }, sortButton ? _react["default"].createElement("span", {
        className: prefixCls + "-selection-column-operate-item"
      }, sortButton) : null, filterDropdown ? _react["default"].createElement("span", {
        className: prefixCls + "-selection-column-operate-item"
      }, filterDropdown) : null, column.customOperate && column.customOperate.map(function (itemNode, key) {
        return itemNode ? _react["default"].createElement("span", {
          className: prefixCls + "-selection-column-operate-item",
          key: key
        }, itemNode) : null;
      })) : null);
      return column;
    });
  };

  _proto.renderRowSelection = function renderRowSelection() {
    var _this10 = this;

    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        rowSelection = _this$props2.rowSelection;
    var columns = this.columns.concat();

    if (rowSelection) {
      var _classNames;

      var data = this.getFlatCurrentPageData().filter(function (item, index) {
        if (rowSelection.getCheckboxProps) {
          return !_this10.getCheckboxPropsByItem(item, index).disabled;
        }

        return true;
      });
      var selectionColumnClass = (0, _classnames["default"])(prefixCls + "-selection-column", (_classNames = {}, _classNames[prefixCls + "-selection-column-custom"] = rowSelection.selections, _classNames));
      var selectionColumn = {
        key: 'selection-column',
        render: this.renderSelectionBox(rowSelection.type),
        className: selectionColumnClass
      };

      if (rowSelection.type !== 'radio') {
        var checkboxAllDisabled = data.every(function (item, index) {
          return _this10.getCheckboxPropsByItem(item, index).disabled;
        });
        selectionColumn.title = _react["default"].createElement(_selectionCheckboxAll["default"], {
          store: this.store,
          locale: this.getLocale(),
          data: data,
          getCheckboxPropsByItem: this.getCheckboxPropsByItem,
          getRecordKey: this.getRecordKey,
          disabled: checkboxAllDisabled,
          prefixCls: prefixCls,
          onSelect: this.handleSelectRow,
          selections: rowSelection.selections,
          hideDefaultSelections: rowSelection.hideDefaultSelections,
          getPopupContainer: this.getPopupContainer
        });
      }

      if (columns.some(function (column) {
        return column.fixed === 'left' || column.fixed === true;
      })) {
        selectionColumn.fixed = 'left';
      }

      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }

    return columns;
  };

  _proto.render = function render() {
    var _classNames2,
        _this11 = this,
        _classNames3;

    var _this$props3 = this.props,
        style = _this$props3.style,
        className = _this$props3.className,
        prefixCls = _this$props3.prefixCls,
        showHeader = _this$props3.showHeader,
        loading = _this$props3.loading,
        size = _this$props3.size,
        restProps = _objectWithoutPropertiesLoose(_this$props3, ["style", "className", "prefixCls", "showHeader", "loading", "size"]);

    var data = this.getCurrentPageData();
    var columns = this.renderRowSelection();
    var expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
    var locale = this.getLocale();
    var classString = (0, _classnames["default"])(prefixCls + "-" + size, (_classNames2 = {}, _classNames2[prefixCls + "-bordered"] = this.props.bordered, _classNames2[prefixCls + "-empty"] = !data.length, _classNames2[prefixCls + "-without-column-header"] = !showHeader, _classNames2));
    columns = this.renderColumnsDropdown(columns);
    columns = columns.map(function (column, i) {
      var newColumn = _extends({}, column);

      newColumn.key = _this11.getColumnKey(newColumn, i);
      return newColumn;
    });
    var expandIconColumnIndex = columns[0] && columns[0].key === 'selection-column' ? 1 : 0;

    if ('expandIconColumnIndex' in restProps) {
      expandIconColumnIndex = restProps.expandIconColumnIndex;
    }

    var table = _react["default"].createElement(_table["default"], _extends({
      key: "table"
    }, restProps, {
      prefixCls: prefixCls,
      data: data,
      columns: columns,
      showHeader: showHeader,
      className: classString,
      expandIconColumnIndex: expandIconColumnIndex,
      expandIconAsCell: expandIconAsCell,
      emptyText: function emptyText() {
        return locale.emptyText;
      }
    }));

    var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? prefixCls + "-with-pagination" : prefixCls + "-without-pagination";
    return _react["default"].createElement("div", {
      className: (0, _classnames["default"])(prefixCls + "-wrapper", className, (_classNames3 = {}, _classNames3[prefixCls + "-wrapper-no-header"] = !showHeader, _classNames3)),
      style: style
    }, _react["default"].createElement("div", {
      className: loading ? paginationPatchClass + " " + prefixCls + "-loading-holder" : ''
    }, loading ? _react["default"].createElement("div", {
      className: prefixCls + "-loading-holder-mask"
    }, _react["default"].createElement(_icon["default"], {
      type: "loading"
    })) : null, table, this.renderPagination()));
  };

  return Table;
}(_react.PureComponent);

exports["default"] = Table;

_defineProperty(Table, "propTypes", {
  /** 表格的数据 */
  dataSource: _propTypes["default"].array,

  /** 表格的表头 详见demo */
  columns: _propTypes["default"].array,

  /** 自定义表格类名 */
  prefixCls: _propTypes["default"].string,

  /** 表格的分页器 */
  pagination: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].bool]),

  /** 表格行的key */
  rowKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]),

  /** 表格行的className */
  rowClassName: _propTypes["default"].func,

  /** 字母表子表渲染 */
  expandedRowRender: _propTypes["default"].any,

  /** 默认展开的子表的key */
  defaultExpandedRowKeys: _propTypes["default"].array,

  /** 展开的子表的key */
  expandedRowKeys: _propTypes["default"].array,

  /** 展开按钮是否占一个单元格 */
  expandIconAsCell: _propTypes["default"].bool,

  /** 展开字母表行变化的时候触发 Function(expandedRows) */
  onExpandedRowsChange: _propTypes["default"].func,

  /** 点击展开/关闭字母表按钮时候触发 */
  onExpand: _propTypes["default"].func,
  // onChange: PropTypes.func,

  /** 表格是否正在加载中 */
  loading: _propTypes["default"].bool,

  /** 一些默认话术
   * filterTitle: '筛选',
   * filterConfirm: '确定',
   *  filterCancel: '取消',
   *  emptyText: <span>暂无数据</span>
   */
  locale: _propTypes["default"].object,

  /** 表格单元格是否需要border */
  bordered: _propTypes["default"].bool,

  /** 是否展示表头 */
  showHeader: _propTypes["default"].bool,

  /**
   * 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比, true { x: number | true, y: number }
   */
  scroll: _propTypes["default"].shape({
    x: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string, _propTypes["default"].bool]),
    y: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string, _propTypes["default"].bool])
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
  rowSelection: _propTypes["default"].object,

  /** 自定义表格区域 style */
  bodyStyle: _propTypes["default"].object,

  /** 自定义表格 类名 */
  className: _propTypes["default"].string,

  /** 自定义 表格根节点样式 */
  style: _propTypes["default"].object,

  /** 筛选dropdown 样式 */
  dropdownPrefixCls: _propTypes["default"].string,

  /** 传入children 不推荐 */
  children: _propTypes["default"].array,

  /** 当存在排序icon时候，点击触发函数 */
  onSortClick: _propTypes["default"].func,

  /** 筛选改变时触发 */
  onFilterChange: _propTypes["default"].func,

  /** 字母表的expand的icon类名 */
  expandIconClassName: _propTypes["default"].string,

  /** 点击expand的icon触发的函数 */
  onClickExpandIcon: _propTypes["default"].func,
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Table, "contextTypes", {
  oneLocale: _propTypes["default"].object
});

_defineProperty(Table, "defaultProps", {
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
  onClickExpandIcon: function onClickExpandIcon() {},
  size: 'small'
});

module.exports = exports.default;