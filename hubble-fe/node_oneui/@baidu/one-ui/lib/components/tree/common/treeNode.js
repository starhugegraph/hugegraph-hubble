"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _rcAnimate = _interopRequireDefault(require("rc-animate"));

var _toArray = _interopRequireDefault(require("rc-util/lib/Children/toArray"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _util = require("rc-tree/lib/util");

var _contextTypes = require("rc-tree/lib/contextTypes");

var _checkbox = _interopRequireDefault(require("../../checkbox"));

var _searchText = _interopRequireDefault(require("../../select/searchText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ICON_OPEN = 'open';
var ICON_CLOSE = 'close';
var defaultTitle = '---';

var TreeNode =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(TreeNode, _React$Component);

  function TreeNode(_props) {
    var _this;

    _this = _React$Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onSelectorClick", function (e) {
      // Click trigger before select/check operation
      if (_this.isDisabled() && _this.props.disabledAllWhenNodeDisabled) {
        return;
      }

      var onNodeClick = _this.context.rcTree.onNodeClick;
      onNodeClick(e, _assertThisInitialized(_this));

      if (_this.isSelectable()) {
        _this.onSelect(e);
      } else {
        _this.onCheck(e);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSelectorDoubleClick", function (e) {
      if (_this.isDisabled() && _this.props.disabledAllWhenNodeDisabled) {
        return;
      }

      var onNodeDoubleClick = _this.context.rcTree.onNodeDoubleClick;
      onNodeDoubleClick(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function (e) {
      if (_this.isDisabled()) {
        return;
      }

      var onNodeSelect = _this.context.rcTree.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onCheck", function (e) {
      if (_this.isDisabled()) {
        return;
      }

      var _this$props = _this.props,
          disableCheckbox = _this$props.disableCheckbox,
          checked = _this$props.checked;
      var _this$context$rcTree = _this.context.rcTree,
          checkable = _this$context$rcTree.checkable,
          onNodeCheck = _this$context$rcTree.onNodeCheck;

      if (!checkable || disableCheckbox) {
        return;
      }

      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, _assertThisInitialized(_this), targetChecked);
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseEnter", function (e) {
      var onNodeMouseEnter = _this.context.rcTree.onNodeMouseEnter;
      onNodeMouseEnter(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function (e) {
      var onNodeMouseLeave = _this.context.rcTree.onNodeMouseLeave;
      onNodeMouseLeave(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onContextMenu", function (e) {
      var onNodeContextMenu = _this.context.rcTree.onNodeContextMenu;
      onNodeContextMenu(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragStart", function (e) {
      var onNodeDragStart = _this.context.rcTree.onNodeDragStart;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: true
      });

      onNodeDragStart(e, _assertThisInitialized(_this));

      try {
        // ie throw error
        // firefox-need-it
        e.dataTransfer.setData('text/plain', '');
      } catch (error) {// empty
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnter", function (e) {
      var onNodeDragEnter = _this.context.rcTree.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragOver", function (e) {
      var onNodeDragOver = _this.context.rcTree.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragLeave", function (e) {
      var onNodeDragLeave = _this.context.rcTree.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDragEnd", function (e) {
      var onNodeDragEnd = _this.context.rcTree.onNodeDragEnd;
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDragEnd(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onDrop", function (e) {
      var onNodeDrop = _this.context.rcTree.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();

      _this.setState({
        dragNodeHighlight: false
      });

      onNodeDrop(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "onExpand", function (e) {
      if (_this.isDisabled() && _this.props.disabledAllWhenNodeDisabled) {
        return;
      }

      var onNodeExpand = _this.context.rcTree.onNodeExpand;
      onNodeExpand(e, _assertThisInitialized(_this));
    });

    _defineProperty(_assertThisInitialized(_this), "setSelectHandle", function (node) {
      _this.selectHandle = node;
    });

    _defineProperty(_assertThisInitialized(_this), "getNodeChildren", function () {
      var children = _this.props.children;
      var originList = (0, _toArray["default"])(children).filter(function (node) {
        return node;
      });
      var targetList = (0, _util.getNodeChildren)(originList);

      if (originList.length !== targetList.length) {
        (0, _util.warnOnlyTreeNode)();
      }

      return targetList;
    });

    _defineProperty(_assertThisInitialized(_this), "getNodeState", function () {
      var expanded = _this.props.expanded;

      if (_this.isLeaf()) {
        return null;
      }

      return expanded ? ICON_OPEN : ICON_CLOSE;
    });

    _defineProperty(_assertThisInitialized(_this), "isLeaf", function () {
      var _this$props2 = _this.props,
          isLeaf = _this$props2.isLeaf,
          loaded = _this$props2.loaded;
      var loadData = _this.context.rcTree.loadData;
      var hasChildren = _this.getNodeChildren().length !== 0;

      if (isLeaf === false) {
        return false;
      }

      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    });

    _defineProperty(_assertThisInitialized(_this), "isDisabled", function () {
      var disabled = _this.props.disabled;
      var treeDisabled = _this.context.rcTree.disabled; // Follow the logic of Selectable

      if (disabled === false) {
        return false;
      }

      return !!(treeDisabled || disabled);
    });

    _defineProperty(_assertThisInitialized(_this), "syncLoadData", function (props) {
      var expanded = props.expanded,
          loading = props.loading,
          loaded = props.loaded;
      var _this$context$rcTree2 = _this.context.rcTree,
          loadData = _this$context$rcTree2.loadData,
          onNodeLoad = _this$context$rcTree2.onNodeLoad;

      if (loading) {
        return;
      } // read from state to avoid loadData at same time


      if (loadData && expanded && !_this.isLeaf()) {
        // We needn't reload data when has children in sync logic
        // It's only needed in node expanded
        var hasChildren = _this.getNodeChildren().length !== 0;

        if (!hasChildren && !loaded) {
          onNodeLoad(_assertThisInitialized(_this));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderSwitcher", function () {
      var _this$props3 = _this.props,
          switcherIconFromProps = _this$props3.switcherIcon,
          expanded = _this$props3.expanded;
      var _this$context$rcTree3 = _this.context.rcTree,
          prefixCls = _this$context$rcTree3.prefixCls,
          switcherIconFromCtx = _this$context$rcTree3.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;

      if (_this.isLeaf()) {
        return _react["default"].createElement("span", {
          className: (0, _classnames["default"])(prefixCls + "-switcher", prefixCls + "-switcher-noop")
        }, typeof switcherIcon === 'function' ? _react["default"].createElement(switcherIcon, _extends({}, _this.props, {
          isLeaf: true
        })) : switcherIcon);
      }

      var switcherCls = (0, _classnames["default"])(prefixCls + "-switcher", prefixCls + "-switcher_" + (expanded ? ICON_OPEN : ICON_CLOSE));
      return _react["default"].createElement("span", {
        onClick: _this.onExpand,
        className: switcherCls
      }, typeof switcherIcon === 'function' ? _react["default"].createElement(switcherIcon, _extends({}, _this.props, {
        isLeaf: false
      })) : switcherIcon);
    });

    _defineProperty(_assertThisInitialized(_this), "renderCheckbox", function () {
      var _this$props4 = _this.props,
          checked = _this$props4.checked,
          halfChecked = _this$props4.halfChecked,
          disableCheckbox = _this$props4.disableCheckbox,
          size = _this$props4.size;
      var _this$context$rcTree4 = _this.context.rcTree,
          prefixCls = _this$context$rcTree4.prefixCls,
          checkable = _this$context$rcTree4.checkable;

      var disabled = _this.isDisabled();

      var currentCheckable = checkable;

      if ('checkable' in _this.props) {
        currentCheckable = _this.props.checkable;
      }

      if (!currentCheckable) {
        return null;
      } // [Legacy] Custom element should be separate with `checkable` in future


      var $custom = typeof currentCheckable !== 'boolean' ? currentCheckable : null;

      if (typeof currentCheckable === 'boolean' && currentCheckable === true) {
        $custom = _react["default"].createElement(_checkbox["default"], {
          checked: checked,
          indeterminate: !checked && halfChecked,
          disabled: disabled || disableCheckbox,
          size: size
        });
      }

      return _react["default"].createElement("span", {
        className: (0, _classnames["default"])(prefixCls + "-checkbox", checked && prefixCls + "-checkbox-checked", !checked && halfChecked && prefixCls + "-checkbox-indeterminate", (disabled || disableCheckbox) && prefixCls + "-checkbox-disabled"),
        onClick: _this.onCheck
      }, $custom);
    });

    _defineProperty(_assertThisInitialized(_this), "renderIcon", function () {
      var loading = _this.props.loading;
      var prefixCls = _this.context.rcTree.prefixCls;
      return _react["default"].createElement("span", {
        className: (0, _classnames["default"])(prefixCls + "-iconEle", prefixCls + "-icon__" + (_this.getNodeState() || 'docu'), loading && prefixCls + "-icon_loading")
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderSelector", function (filterTitle) {
      var dragNodeHighlight = _this.state.dragNodeHighlight;
      var _this$props5 = _this.props,
          title = _this$props5.title,
          selected = _this$props5.selected,
          icon = _this$props5.icon;
      var _this$context$rcTree5 = _this.context.rcTree,
          prefixCls = _this$context$rcTree5.prefixCls,
          showIcon = _this$context$rcTree5.showIcon,
          treeIcon = _this$context$rcTree5.icon,
          draggable = _this$context$rcTree5.draggable;

      var disabled = _this.isDisabled();

      var wrapClass = prefixCls + "-node-content-wrapper"; // Icon - Still show loading icon when loading without showIcon

      var $icon;

      if (showIcon) {
        var currentIcon = icon || treeIcon;
        console.log(currentIcon);
        $icon = currentIcon ? _react["default"].createElement("span", {
          className: (0, _classnames["default"])(prefixCls + "-iconEle", prefixCls + "-icon__customize")
        }, typeof currentIcon === 'function' ? _react["default"].createElement(currentIcon, _extends({}, _this.props)) : currentIcon) : null;
      }

      var currentTitle = title;

      if (typeof title === 'string' && typeof filterTitle === 'string' && !!filterTitle) {
        currentTitle = _react["default"].createElement(_searchText["default"], {
          prefixCls: prefixCls,
          text: title,
          searchValue: filterTitle,
          showSearch: true
        });
      } // Title


      var $title = _react["default"].createElement("span", {
        className: prefixCls + "-title"
      }, currentTitle);

      return _react["default"].createElement("span", {
        ref: _this.setSelectHandle,
        title: typeof title === 'string' ? title : '',
        className: (0, _classnames["default"])("" + wrapClass, wrapClass + "-" + (_this.getNodeState() || 'normal'), !disabled && (selected || dragNodeHighlight) && prefixCls + "-node-selected", !disabled && draggable && 'draggable'),
        draggable: !disabled && draggable || undefined,
        "aria-grabbed": !disabled && draggable || undefined,
        onMouseEnter: _this.onMouseEnter,
        onMouseLeave: _this.onMouseLeave,
        onContextMenu: _this.onContextMenu,
        onClick: _this.onSelectorClick,
        onDoubleClick: _this.onSelectorDoubleClick,
        onDragStart: draggable ? _this.onDragStart : undefined
      }, $icon, $title);
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      var _this$props6 = _this.props,
          expanded = _this$props6.expanded,
          pos = _this$props6.pos;
      var _this$context$rcTree6 = _this.context.rcTree,
          prefixCls = _this$context$rcTree6.prefixCls,
          openTransitionName = _this$context$rcTree6.openTransitionName,
          openAnimation = _this$context$rcTree6.openAnimation,
          renderTreeNode = _this$context$rcTree6.renderTreeNode;
      var animProps = {};

      if (openTransitionName) {
        animProps.transitionName = openTransitionName;
      } else if (typeof openAnimation === 'object') {
        animProps.animation = _extends({}, openAnimation);
      } // Children TreeNode


      var nodeList = _this.getNodeChildren();

      if (nodeList.length === 0) {
        return null;
      }

      var $children;

      if (expanded) {
        $children = _react["default"].createElement("ul", {
          className: (0, _classnames["default"])(prefixCls + "-child-tree", expanded && prefixCls + "-child-tree-open"),
          "data-expanded": expanded,
          role: "group"
        }, (0, _util.mapChildren)(nodeList, function (node, index) {
          return renderTreeNode(node, index, pos);
        }));
      }

      return _react["default"].createElement(_rcAnimate["default"], _extends({}, animProps, {
        showProp: "data-expanded",
        component: ""
      }), $children);
    });

    _this.state = {
      dragNodeHighlight: false
    };
    return _this;
  }

  var _proto = TreeNode.prototype;

  _proto.getChildContext = function getChildContext() {
    return _extends({}, this.context, {
      rcTreeNode: {// onUpCheckConduct: this.onUpCheckConduct,
      }
    });
  } // Isomorphic needn't load data in server side
  ;

  _proto.componentDidMount = function componentDidMount() {
    this.syncLoadData(this.props);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.syncLoadData(this.props);
  };

  _proto.isSelectable = function isSelectable() {
    var selectable = this.props.selectable;
    var treeSelectable = this.context.rcTree.selectable; // Ignore when selectable is undefined or null

    if (typeof selectable === 'boolean') {
      return selectable;
    }

    return treeSelectable;
  } // Load data to avoid default expanded tree without data
  ;

  _proto.render = function render() {
    var _classNames;

    var loading = this.props.loading;

    var _this$props7 = this.props,
        className = _this$props7.className,
        style = _this$props7.style,
        dragOver = _this$props7.dragOver,
        dragOverGapTop = _this$props7.dragOverGapTop,
        dragOverGapBottom = _this$props7.dragOverGapBottom,
        isLeaf = _this$props7.isLeaf,
        expanded = _this$props7.expanded,
        selected = _this$props7.selected,
        checked = _this$props7.checked,
        halfChecked = _this$props7.halfChecked,
        otherProps = _objectWithoutPropertiesLoose(_this$props7, ["className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "expanded", "selected", "checked", "halfChecked"]);

    var _this$context$rcTree7 = this.context.rcTree,
        prefixCls = _this$context$rcTree7.prefixCls,
        filterTreeNode = _this$context$rcTree7.filterTreeNode,
        draggable = _this$context$rcTree7.draggable;
    var disabled = this.isDisabled();
    var dataOrAriaAttributeProps = (0, _util.getDataAndAria)(otherProps);
    var filterTitle = filterTreeNode && filterTreeNode(this) || false;
    return _react["default"].createElement("li", _extends({
      className: (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefixCls + "-treenode-disabled"] = disabled, _classNames[prefixCls + "-treenode-switcher-" + (expanded ? 'open' : 'close')] = !isLeaf, _classNames[prefixCls + "-treenode-checkbox-checked"] = checked, _classNames[prefixCls + "-treenode-checkbox-indeterminate"] = halfChecked, _classNames[prefixCls + "-treenode-selected"] = selected, _classNames[prefixCls + "-treenode-loading"] = loading, _classNames['drag-over'] = !disabled && dragOver, _classNames['drag-over-gap-top'] = !disabled && dragOverGapTop, _classNames['drag-over-gap-bottom'] = !disabled && dragOverGapBottom, _classNames['current-filter-node'] = filterTitle, _classNames)),
      style: style,
      role: "treeitem",
      onDragEnter: draggable ? this.onDragEnter : undefined,
      onDragOver: draggable ? this.onDragOver : undefined,
      onDragLeave: draggable ? this.onDragLeave : undefined,
      onDrop: draggable ? this.onDrop : undefined,
      onDragEnd: draggable ? this.onDragEnd : undefined
    }, dataOrAriaAttributeProps), _react["default"].createElement("div", {
      className: prefixCls + "-treenode-container"
    }, this.renderSwitcher(), _react["default"].createElement("span", {
      className: prefixCls + "-treenode-container-title"
    }, this.renderCheckbox(), this.renderSelector(filterTitle))), this.renderChildren());
  };

  return TreeNode;
}(_react["default"].Component);

_defineProperty(TreeNode, "propTypes", {
  eventKey: _propTypes["default"].string,
  // Pass by parent `cloneElement`
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  root: _propTypes["default"].object,
  onSelect: _propTypes["default"].func,
  // By parent
  expanded: _propTypes["default"].bool,
  selected: _propTypes["default"].bool,
  checked: _propTypes["default"].bool,
  loaded: _propTypes["default"].bool,
  loading: _propTypes["default"].bool,
  halfChecked: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  title: _propTypes["default"].node,
  pos: _propTypes["default"].string,
  dragOver: _propTypes["default"].bool,
  dragOverGapTop: _propTypes["default"].bool,
  dragOverGapBottom: _propTypes["default"].bool,
  // By user
  isLeaf: _propTypes["default"].bool,
  selectable: _propTypes["default"].bool,
  disabled: _propTypes["default"].bool,
  disableCheckbox: _propTypes["default"].bool,
  icon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  switcherIcon: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].func]),
  size: _propTypes["default"].oneOf(['small', 'medium']),
  isFileNode: _propTypes["default"].bool,
  checkable: _propTypes["default"].bool,
  disabledAllWhenNodeDisabled: _propTypes["default"].bool
});

_defineProperty(TreeNode, "contextTypes", _contextTypes.nodeContextTypes);

_defineProperty(TreeNode, "childContextTypes", _contextTypes.nodeContextTypes);

_defineProperty(TreeNode, "defaultProps", {
  title: defaultTitle,
  size: 'small',
  isFileNode: false,
  disabledAllWhenNodeDisabled: false
});

TreeNode.isTreeNode = 1;
(0, _reactLifecyclesCompat.polyfill)(TreeNode);
var _default = TreeNode;
exports["default"] = _default;
module.exports = exports.default;