function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import shallowequal from 'shallowequal';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import { Provider, create } from 'mini-store';
import _ from 'lodash';
import classes from 'component-classes';
import { polyfill } from 'react-lifecycles-compat';
import ColumnManager from './columnManager';
import HeadTable from './headTable';
import BodyTable from './bodyTable';
import ExpandableTable from './expandableTable'; // 浏览器视口的高度

export var getWindowHeight = function getWindowHeight() {
  if (!window) {
    return 0;
  }

  var windowHeight = 0;
  var document = window.document;

  if (document.compatMode === 'CSS1Compat') {
    windowHeight = document.documentElement.clientHeight;
  } else {
    windowHeight = document.body.clientHeight;
  }

  return windowHeight;
};

var ComponentTable =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(ComponentTable, _PureComponent);

  function ComponentTable(props) {
    var _this;

    _this = _PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "getRowKey", function (record, index) {
      var rowKey = _this.props.rowKey;
      var key = typeof rowKey === 'function' ? rowKey(record, index) : record[rowKey];
      return key === undefined ? index : key;
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowResize", function () {
      _this.syncFixedTableRowHeight();

      _this.setScrollPositionClassName();
    });

    _defineProperty(_assertThisInitialized(_this), "handleWindowScroll", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          headTable = _assertThisInitialize.headTable,
          bodyTable = _assertThisInitialize.bodyTable;

      if (headTable && bodyTable) {
        var headTableRect = headTable.getBoundingClientRect();
        var bodyTableRect = bodyTable.getBoundingClientRect();
        var isHeaderFixed = headTableRect.top < _this.props.headerFixTop;

        var isBottomScrollShow = bodyTableRect.bottom > getWindowHeight() - _this.props.bottomScroll.bottom;

        if (isHeaderFixed !== _this.state.isHeaderFixed || isBottomScrollShow !== _this.state.isBottomScrollShow) {
          _this.setState({
            isHeaderFixed: isHeaderFixed,
            isBottomScrollShow: isBottomScrollShow
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "syncFixedTableRowHeight", function () {
      var tableRect = _this.tableNode.getBoundingClientRect();

      if (tableRect.height !== undefined && tableRect.height <= 0) {
        return;
      }

      var prefixCls = _this.props.prefixCls;
      var headRows = _this.headTable ? _this.headTable.querySelectorAll('thead') : _this.bodyTable.querySelectorAll('thead');
      var bodyRows = _this.bodyTable.querySelectorAll("." + prefixCls + "-row") || [];
      var fixedColumnsHeadRowsHeight = [].map.call(headRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });
      var fixedColumnsBodyRowsHeight = [].map.call(bodyRows, function (row) {
        return row.getBoundingClientRect().height || 'auto';
      });

      var state = _this.store.getState();

      if (shallowequal(state.fixedColumnsHeadRowsHeight, fixedColumnsHeadRowsHeight) && shallowequal(state.fixedColumnsBodyRowsHeight, fixedColumnsBodyRowsHeight)) {
        return;
      }

      _this.store.setState({
        fixedColumnsHeadRowsHeight: fixedColumnsHeadRowsHeight,
        fixedColumnsBodyRowsHeight: fixedColumnsBodyRowsHeight
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScrollLeft", function (e) {
      if (e.currentTarget !== e.target) {
        return;
      }

      var target = e.target;
      var _this$props$scroll = _this.props.scroll,
          scroll = _this$props$scroll === void 0 ? {} : _this$props$scroll;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          headTable = _assertThisInitialize2.headTable,
          bodyTable = _assertThisInitialize2.bodyTable,
          fixedHeadTable = _assertThisInitialize2.fixedHeadTable,
          bottomScroll = _assertThisInitialize2.bottomScroll;

      if (target.scrollLeft !== _this.lastScrollLeft && scroll.x) {
        if (target === bodyTable) {
          if (headTable) {
            headTable.scrollLeft = target.scrollLeft;
          }

          if (fixedHeadTable) {
            fixedHeadTable.scrollLeft = target.scrollLeft;
          }

          if (bottomScroll) {
            bottomScroll.scrollLeft = target.scrollLeft;
          }
        } else if (target === headTable) {
          if (fixedHeadTable) {
            fixedHeadTable.scrollLeft = target.scrollLeft;
          }

          if (bodyTable) {
            bodyTable.scrollLeft = target.scrollLeft;
          }

          if (bottomScroll) {
            bottomScroll.scrollLeft = target.scrollLeft;
          }
        } else if (target === fixedHeadTable) {
          if (headTable) {
            headTable.scrollLeft = target.scrollLeft;
          }

          if (bodyTable) {
            bodyTable.scrollLeft = target.scrollLeft;
          }

          if (bottomScroll) {
            bottomScroll.scrollLeft = target.scrollLeft;
          }
        } else if (target === bottomScroll) {
          if (headTable) {
            headTable.scrollLeft = target.scrollLeft;
          }

          if (bodyTable) {
            bodyTable.scrollLeft = target.scrollLeft;
          }

          if (fixedHeadTable) {
            fixedHeadTable.scrollLeft = target.scrollLeft;
          }
        }

        _this.setScrollPositionClassName();
      } // Remember last scrollLeft for scroll direction detecting.


      _this.lastScrollLeft = target.scrollLeft;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScrollTop", function (e) {
      var target = e.target;

      if (e.currentTarget !== target) {
        return;
      }

      var _this$props$scroll2 = _this.props.scroll,
          scroll = _this$props$scroll2 === void 0 ? {} : _this$props$scroll2;

      var _assertThisInitialize3 = _assertThisInitialized(_this),
          headTable = _assertThisInitialize3.headTable,
          bodyTable = _assertThisInitialize3.bodyTable,
          fixedColumnsBodyLeft = _assertThisInitialize3.fixedColumnsBodyLeft,
          fixedColumnsBodyRight = _assertThisInitialize3.fixedColumnsBodyRight;

      if (target.scrollTop !== _this.lastScrollTop && scroll.y && target !== headTable) {
        var scrollTop = target.scrollTop;

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      } // Remember last scrollTop for scroll direction detecting.


      _this.lastScrollTop = target.scrollTop;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBodyScroll", function (e) {
      _this.handleBodyScrollLeft(e);

      _this.handleBodyScrollTop(e);
    });

    _defineProperty(_assertThisInitialized(_this), "handleWheel", function (event) {
      var _this$props$scroll3 = _this.props.scroll,
          scroll = _this$props$scroll3 === void 0 ? {} : _this$props$scroll3;

      if (window.navigator.userAgent.match(/Trident\/7\./) && scroll.y) {
        event.preventDefault();
        var wd = event.deltaY;
        var target = event.target;

        var _assertThisInitialize4 = _assertThisInitialized(_this),
            bodyTable = _assertThisInitialize4.bodyTable,
            fixedColumnsBodyLeft = _assertThisInitialize4.fixedColumnsBodyLeft,
            fixedColumnsBodyRight = _assertThisInitialize4.fixedColumnsBodyRight;

        var scrollTop = 0;

        if (_this.lastScrollTop) {
          scrollTop = _this.lastScrollTop + wd;
        } else {
          scrollTop = wd;
        }

        if (fixedColumnsBodyLeft && target !== fixedColumnsBodyLeft) {
          fixedColumnsBodyLeft.scrollTop = scrollTop;
        }

        if (fixedColumnsBodyRight && target !== fixedColumnsBodyRight) {
          fixedColumnsBodyRight.scrollTop = scrollTop;
        }

        if (bodyTable && target !== bodyTable) {
          bodyTable.scrollTop = scrollTop;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveRef", function (name) {
      return function (node) {
        _this[name] = node;
      };
    });

    _this.columnManager = new ColumnManager(props.columns, props.children);
    _this.store = create({
      currentHoverKey: null,
      fixedColumnsHeadRowsHeight: [],
      fixedColumnsBodyRowsHeight: [],
      isHeaderFixed: true
    });

    _this.setScrollPosition('left');

    _this.debouncedWindowResize = _.debounce(_this.handleWindowResize, 150);
    _this.debouncedWindowScroll = _this.handleWindowScroll.bind(_assertThisInitialized(_this));
    _this.renderBottomScroll = _this.renderBottomScroll.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ComponentTable.prototype;

  _proto.getChildContext = function getChildContext() {
    return {
      table: {
        props: this.props,
        columnManager: this.columnManager,
        saveRef: this.saveRef,
        headTable: this.headTable,
        rightTable: this.rightTable,
        rightContainerTable: this.rightContainerTable,
        leftTable: this.leftTable,
        leftContainerTable: this.leftContainerTable,
        bottomScroll: this.bottomScroll,
        components: _.merge({
          table: 'table',
          header: {
            wrapper: 'thead',
            row: 'tr',
            cell: 'th'
          },
          body: {
            wrapper: 'tbody',
            row: 'tr',
            cell: 'td'
          }
        }, this.props.components)
      }
    };
  };

  ComponentTable.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.columns && nextProps.columns !== prevState.columns) {
      return {
        columns: nextProps.columns,
        children: null
      };
    }

    if (nextProps.children !== prevState.children) {
      return {
        columns: null,
        children: nextProps.children
      };
    }

    return null;
  };

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.columnManager.isAnyColumnsFixed()) {
      var that = this;
      that.handleWindowResize();
      this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
    }

    if (this.props.headerFixTop !== null || this.props.bottomScroll.bottom !== null) {
      this.timer = setInterval(function () {
        var bodyTable = _this2.bodyTable,
            bottomScrollContent = _this2.bottomScrollContent,
            rightContainerTable = _this2.rightContainerTable,
            rightTable = _this2.rightTable,
            leftContainerTable = _this2.leftContainerTable,
            leftTable = _this2.leftTable,
            headTable = _this2.headTable,
            fixedHeadTable = _this2.fixedHeadTable;

        if (bodyTable && bottomScrollContent && bodyTable.offsetWidth !== bottomScrollContent.offsetWidth) {
          bottomScrollContent.style.width = bodyTable.scrollWidth + "px";
        }

        if (rightContainerTable && rightTable && rightContainerTable.offsetHeight !== rightTable.offsetHeight) {
          rightContainerTable.style.height = rightTable.offsetHeight + "px";
        }

        if (leftContainerTable && leftTable && leftContainerTable.offsetHeight !== leftTable.offsetHeight) {
          leftContainerTable.style.height = leftTable.offsetHeight + "px";
        }

        if (headTable && fixedHeadTable && headTable.offsetHeight !== fixedHeadTable.offsetHeight) {
          headTable.style.height = fixedHeadTable.offsetHeight + "px";
        }

        if (headTable && bodyTable && headTable.offsetWidth !== bodyTable.offsetWidth) {
          headTable.style.width = bodyTable.offsetWidth + "px";
        }
      }, 100);
      this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
    }

    if (this.props.headerFixTop !== null) {
      this.handleWindowScroll();
      this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.columnManager.isAnyColumnsFixed()) {
      this.handleWindowResize();

      if (!this.resizeEvent) {
        this.resizeEvent = addEventListener(window, 'resize', this.debouncedWindowResize);
      }
    } // when table changes to empty, reset scrollLeft


    if (prevProps.data.length > 0 && this.props.data.length === 0 && this.hasScrollX()) {
      this.resetScrollX();
    }

    if (this.props.headerFixTop !== null || this.props.bottomScroll.bottom !== null) {
      this.handleWindowScroll();

      if (!this.scrollEvent) {
        this.scrollEvent = addEventListener(window, 'scroll', this.debouncedWindowScroll);
      }

      if (this.headTable) {
        this.headTable.scrollLeft = this.lastScrollLeft;
      }

      if (this.fixedHeadTable) {
        this.fixedHeadTable.scrollLeft = this.lastScrollLeft;
      }

      if (this.bottomScroll) {
        this.bottomScroll.scrollLeft = this.lastScrollLeft;
      }
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }

    if (this.debouncedWindowResize) {
      this.debouncedWindowResize.cancel();
    }

    if (this.scrollEvent) {
      this.scrollEvent.remove();
    } // if (this.debouncedWindowScroll) {
    //   this.debouncedWindowScroll.cancel();
    // }


    if (this.timer) {
      window.clearInterval(this.timer);
    }
  };

  _proto.setScrollPosition = function setScrollPosition(position) {
    this.scrollPosition = position;

    if (this.tableNode) {
      var prefixCls = this.props.prefixCls;

      if (position === 'both') {
        classes(this.tableNode).remove(new RegExp("^" + prefixCls + "-scroll-position-.+$")).add(prefixCls + "-scroll-position-left").add(prefixCls + "-scroll-position-right");
      } else {
        classes(this.tableNode).remove(new RegExp("^" + prefixCls + "-scroll-position-.+$")).add(prefixCls + "-scroll-position-" + position);
      }
    }
  };

  _proto.setScrollPositionClassName = function setScrollPositionClassName() {
    var node = this.bodyTable;
    var scrollToLeft = node.scrollLeft === 0;
    var scrollToRight = node.scrollLeft + 1 >= node.children[0].getBoundingClientRect().width - node.getBoundingClientRect().width;

    if (scrollToLeft && scrollToRight) {
      this.setScrollPosition('both');
    } else if (scrollToLeft) {
      this.setScrollPosition('left');
    } else if (scrollToRight) {
      this.setScrollPosition('right');
    } else if (this.scrollPosition !== 'middle') {
      this.setScrollPosition('middle');
    }
  };

  _proto.resetScrollX = function resetScrollX() {
    if (this.headTable) {
      this.headTable.scrollLeft = 0;
    }

    if (this.fixedHeadTable) {
      this.fixedHeadTable.scrollLeft = 0;
    }

    if (this.bodyTable) {
      this.bodyTable.scrollLeft = 0;
    }

    if (this.bottomScroll) {
      this.bottomScroll.scrollLeft = 0;
    }
  };

  _proto.hasScrollX = function hasScrollX() {
    var _this$props$scroll4 = this.props.scroll,
        scroll = _this$props$scroll4 === void 0 ? {} : _this$props$scroll4;
    return 'x' in scroll;
  };

  _proto.renderMainTable = function renderMainTable() {
    var _this$props = this.props,
        scroll = _this$props.scroll,
        prefixCls = _this$props.prefixCls;
    var isAnyColumnsFixed = this.columnManager.isAnyColumnsFixed();
    var scrollable = isAnyColumnsFixed || scroll.x || scroll.y;
    var table = [this.renderTable({
      columns: this.columnManager.groupedColumns(),
      isAnyColumnsFixed: isAnyColumnsFixed
    }), this.renderEmptyText(), this.renderFooter()];
    return scrollable ? React.createElement("div", {
      className: prefixCls + "-scroll"
    }, table) : table;
  };

  _proto.renderLeftFixedTable = function renderLeftFixedTable() {
    var prefixCls = this.props.prefixCls;
    return React.createElement("div", {
      className: prefixCls + "-fixed-left"
    }, this.renderTable({
      columns: this.columnManager.leftColumns(),
      fixed: 'left'
    }));
  };

  _proto.renderRightFixedTable = function renderRightFixedTable() {
    var prefixCls = this.props.prefixCls;
    return React.createElement("div", {
      className: prefixCls + "-fixed-right"
    }, this.renderTable({
      columns: this.columnManager.rightColumns(),
      fixed: 'right'
    }));
  };

  _proto.renderTable = function renderTable(options) {
    var columns = options.columns,
        fixed = options.fixed,
        isAnyColumnsFixed = options.isAnyColumnsFixed;
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        _this$props2$scroll = _this$props2.scroll,
        scroll = _this$props2$scroll === void 0 ? {} : _this$props2$scroll;
    var tableClassName = scroll.x || fixed ? prefixCls + "-fixed" : '';
    var isHeaderFixed = this.state.isHeaderFixed;
    var headTable = React.createElement(HeadTable, {
      key: "head",
      columns: columns,
      fixed: fixed,
      tableClassName: tableClassName,
      handleBodyScrollLeft: this.handleBodyScrollLeft,
      expander: this.expander,
      isHeaderFixed: isHeaderFixed
    });
    var bodyTable = React.createElement(BodyTable, {
      key: "body",
      columns: columns,
      fixed: fixed,
      tableClassName: tableClassName,
      getRowKey: this.getRowKey,
      handleWheel: this.handleWheel,
      handleBodyScroll: this.handleBodyScroll,
      expander: this.expander,
      isAnyColumnsFixed: isAnyColumnsFixed
    });
    return [headTable, bodyTable];
  };

  _proto.renderBottomScroll = function renderBottomScroll() {
    // const hasBottomScroll = this.state.hasBottomScroll;
    var bodyTable = this.bodyTable;
    var prefixCls = this.props.prefixCls;
    var _this$props$bottomScr = this.props.bottomScroll,
        style = _this$props$bottomScr.style,
        bottom = _this$props$bottomScr.bottom;

    var scrollContainerStyle = _extends({}, style, {
      bottom: bottom,
      width: bodyTable && bodyTable.offsetWidth,
      left: bodyTable && bodyTable.getBoundingClientRect().left
    });

    var scrollContentStyle = {
      width: bodyTable && bodyTable.scrollWidth
    };
    var bottomScroll = React.createElement("div", {
      className: prefixCls + "-scroll-container",
      style: scrollContainerStyle,
      ref: this.saveRef('bottomScroll'),
      onScroll: this.handleBodyScrollLeft
    }, React.createElement("div", {
      className: prefixCls + "-scroll-content",
      style: scrollContentStyle,
      ref: this.saveRef('bottomScrollContent')
    }));
    return bottomScroll; // return hasBottomScroll ? bottomScroll : null;
  };

  _proto.renderTitle = function renderTitle() {
    var _this$props3 = this.props,
        title = _this$props3.title,
        prefixCls = _this$props3.prefixCls;
    return title ? React.createElement("div", {
      className: prefixCls + "-title",
      key: "title"
    }, title(this.props.data)) : null;
  };

  _proto.renderFooter = function renderFooter() {
    var _this$props4 = this.props,
        footer = _this$props4.footer,
        prefixCls = _this$props4.prefixCls;
    return footer ? React.createElement("div", {
      className: prefixCls + "-footer",
      key: "footer"
    }, footer(this.props.data)) : null;
  };

  _proto.renderEmptyText = function renderEmptyText() {
    var _this$props5 = this.props,
        emptyText = _this$props5.emptyText,
        prefixCls = _this$props5.prefixCls,
        data = _this$props5.data;

    if (data.length) {
      return null;
    }

    var emptyClassName = prefixCls + "-placeholder";
    return React.createElement("div", {
      className: emptyClassName,
      key: "emptyText"
    }, typeof emptyText === 'function' ? emptyText() : emptyText);
  };

  _proto.render = function render() {
    var _this3 = this;

    var props = this.props;
    var prefixCls = props.prefixCls;

    if (this.state.columns) {
      this.columnManager.reset(props.columns);
    } else if (this.state.children) {
      this.columnManager.reset(null, props.children);
    }

    var className = props.prefixCls;

    if (props.className) {
      className += " " + props.className;
    }

    if (props.useFixedHeader || props.scroll && props.scroll.y) {
      className += " " + prefixCls + "-fixed-header";
    }

    if (this.scrollPosition === 'both') {
      className += " " + prefixCls + "-scroll-position-left " + prefixCls + "-scroll-position-right";
    } else {
      className += " " + prefixCls + "-scroll-position-" + this.scrollPosition;
    }

    var hasLeftFixed = this.columnManager.isAnyColumnsLeftFixed();
    var hasRightFixed = this.columnManager.isAnyColumnsRightFixed();
    var hasBottomScroll = this.state.isBottomScrollShow && props.bottomScroll.bottom !== null && props.scroll.x;
    return React.createElement(Provider, {
      store: this.store
    }, React.createElement(ExpandableTable, _extends({}, props, {
      columnManager: this.columnManager,
      getRowKey: this.getRowKey
    }), function (expander) {
      _this3.expander = expander;
      return React.createElement("div", {
        ref: _this3.saveRef('tableNode'),
        className: className,
        style: props.style,
        id: props.id
      }, _this3.renderTitle(), React.createElement("div", {
        className: prefixCls + "-content"
      }, _this3.renderMainTable(), hasLeftFixed && _this3.renderLeftFixedTable(), hasRightFixed && _this3.renderRightFixedTable(), hasBottomScroll && _this3.renderBottomScroll()));
    }));
  };

  return ComponentTable;
}(PureComponent);

_defineProperty(ComponentTable, "propTypes", _extends({
  headerFixTop: PropTypes.number,
  bottomScroll: PropTypes.object,
  data: PropTypes.array,
  useFixedHeader: PropTypes.bool,
  columns: PropTypes.array,
  prefixCls: PropTypes.string,
  bodyStyle: PropTypes.object,
  style: PropTypes.object,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rowClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  onRow: PropTypes.func,
  onHeaderRow: PropTypes.func,
  showHeader: PropTypes.bool,
  title: PropTypes.func,
  id: PropTypes.string,
  footer: PropTypes.func,
  emptyText: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  scroll: PropTypes.object,
  rowRef: PropTypes.func,
  children: PropTypes.node,
  components: PropTypes.shape({
    table: PropTypes.any,
    header: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    }),
    body: PropTypes.shape({
      wrapper: PropTypes.any,
      row: PropTypes.any,
      cell: PropTypes.any
    })
  })
}, ExpandableTable.PropTypes));

_defineProperty(ComponentTable, "childContextTypes", {
  table: PropTypes.any,
  components: PropTypes.any
});

_defineProperty(ComponentTable, "defaultProps", {
  headerFixTop: null,
  data: [],
  useFixedHeader: false,
  rowKey: 'key',
  rowClassName: function rowClassName() {
    return '';
  },
  onRow: function onRow() {},
  onHeaderRow: function onHeaderRow() {},
  prefixCls: 'new-fc-one-table',
  bodyStyle: {},
  style: {},
  showHeader: true,
  scroll: {},
  bottomScroll: {
    bottom: null,
    style: {}
  },
  rowRef: function rowRef() {
    return null;
  },
  emptyText: function emptyText() {
    return '暂无数据';
  }
});

polyfill(ComponentTable);
export default ComponentTable;