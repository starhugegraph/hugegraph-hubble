"use strict";

exports.__esModule = true;
exports["default"] = HeadTable;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = _interopRequireDefault(require("../../../core"));

var _baseTable = _interopRequireDefault(require("./baseTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var measureScrollbar = _core["default"].table.measureScrollbar;

function HeadTable(props, _ref) {
  var table = _ref.table;
  var _table$props = table.props,
      prefixCls = _table$props.prefixCls,
      scroll = _table$props.scroll,
      showHeader = _table$props.showHeader,
      headerFixTop = _table$props.headerFixTop,
      style = _table$props.style;
  var columns = props.columns,
      fixed = props.fixed,
      tableClassName = props.tableClassName,
      handleBodyScrollLeft = props.handleBodyScrollLeft,
      expander = props.expander,
      isHeaderFixed = props.isHeaderFixed;
  var saveRef = table.saveRef,
      headTable = table.headTable;
  var useFixedHeader = table.props.useFixedHeader;
  var refName = isHeaderFixed ? 'fixedHeadTable' : 'headTable';
  var headFixedClass = '';
  var headStyle = isHeaderFixed ? {
    position: 'fixed',
    top: headerFixTop,
    zIndex: 1,
    paddingBottom: 0
  } : {};
  var scrollbarWidth = measureScrollbar('horizontal');

  if (scroll.y) {
    useFixedHeader = true; // Add negative margin bottom for scroll bar overflow bug
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
    headFixedClass = " " + prefixCls + "-fixed-header-fixed";

    if (isHeaderFixed) {
      headStyle.width = headTable ? headTable.offsetWidth : style.width || '100%';
    }
  } else {
    headFixedClass = " " + prefixCls + "-fixed-" + fixed + "-header-fixed";
  }

  var headContent = _react["default"].createElement("div", {
    key: refName,
    ref: fixed ? saveRef(fixed + "Table") : saveRef(refName),
    className: prefixCls + "-header" + headFixedClass,
    style: headStyle,
    onScroll: handleBodyScrollLeft
  }, _react["default"].createElement(_baseTable["default"], {
    tableClassName: tableClassName,
    hasHead: true,
    hasBody: false,
    fixed: fixed,
    columns: columns,
    expander: expander
  }));

  var fixHeadContainerStyle = !fixed ? {
    width: headTable && headTable.offsetWidth,
    height: headTable && (scroll.y ? headTable.offsetHeight - scrollbarWidth : headTable.offsetHeight)
  } : {
    width: table[fixed + "Table"] && table[fixed + "Table"].offsetWidth,
    height: table[fixed + "Table"] && table[fixed + "Table"].offsetHeight
  };

  if (isHeaderFixed) {
    headStyle.left = !fixed ? headTable && headTable.getBoundingClientRect().left : table[fixed + "ContainerTable"] && table[fixed + "ContainerTable"].getBoundingClientRect().left;
  }

  return isHeaderFixed ? _react["default"].createElement("div", {
    ref: fixed ? saveRef(fixed + "ContainerTable") : saveRef('headTable'),
    style: fixHeadContainerStyle
  }, headContent) : headContent;
}

HeadTable.propTypes = {
  isHeaderFixed: _propTypes["default"].bool,
  fixed: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].bool]),
  columns: _propTypes["default"].array.isRequired,
  tableClassName: _propTypes["default"].string.isRequired,
  handleBodyScrollLeft: _propTypes["default"].func.isRequired,
  expander: _propTypes["default"].object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  refName: _propTypes["default"].string,
  // eslint-disable-next-line react/no-unused-prop-types
  fixedStyle: _propTypes["default"].object
};
HeadTable.defaultProps = {
  isHeaderFixed: false,
  refName: '',
  fixedStyle: {}
};
HeadTable.contextTypes = {
  table: _propTypes["default"].any
};
module.exports = exports.default;