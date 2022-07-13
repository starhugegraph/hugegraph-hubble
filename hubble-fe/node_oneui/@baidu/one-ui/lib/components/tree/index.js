"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _rcTree = _interopRequireDefault(require("rc-tree"));

var _treeNode = _interopRequireDefault(require("./common/treeNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tree =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tree, _Component);

  function Tree() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "renderSwitcherIcon", function (_ref) {
      var isLeaf = _ref.isLeaf,
          loading = _ref.loading;
      var _this$props = _this.props,
          prefixCls = _this$props.prefixCls,
          switcherIcon = _this$props.switcherIcon;

      if (loading) {
        return _react["default"].createElement(_oneUiIcon.IconLoading, {
          className: prefixCls + "-switcher-loading-icon"
        });
      }

      if (isLeaf) {
        return null;
      }

      var switcherCls = prefixCls + "-switcher-icon";

      if (switcherIcon) {
        var switcherOriginCls = switcherIcon.props && switcherIcon.props.className || '';
        return _react["default"].cloneElement(switcherIcon, {
          className: (0, _classnames["default"])(switcherOriginCls, switcherCls)
        });
      }

      return _react["default"].createElement(_oneUiIcon.IconChevronDown, {
        className: switcherCls
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setTreeRef", function (node) {
      _this.treeRef = node;
    });

    return _this;
  }

  var _proto = Tree.prototype;

  _proto.render = function render() {
    var _classNames,
        _this2 = this;

    var props = this.props;
    var prefixCls = props.prefixCls,
        className = props.className,
        checkable = props.checkable,
        showIcon = props.showIcon,
        size = props.size,
        switcherIcon = props.switcherIcon;
    return _react["default"].createElement(_rcTree["default"], _extends({
      ref: this.setTreeRef
    }, props, {
      className: (0, _classnames["default"])(className, (_classNames = {}, _classNames[prefixCls + "-icon-hide"] = !showIcon, _classNames), prefixCls + "-" + size),
      checkable: checkable,
      switcherIcon: switcherIcon && typeof switcherIcon === 'function' ? switcherIcon : function (nodeProps) {
        return _this2.renderSwitcherIcon(nodeProps);
      }
    }), this.props.children);
  };

  return Tree;
}(_react.Component);

exports["default"] = Tree;

_defineProperty(Tree, "TreeNode", _treeNode["default"]);

_defineProperty(Tree, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  showIcon: _propTypes["default"].bool,
  checkStrictly: _propTypes["default"].bool,
  checkable: _propTypes["default"].bool,
  defaultExpandAll: _propTypes["default"].bool,
  defaultExpandedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  expandedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  checkedKeys: _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].string), _propTypes["default"].shape({
    checked: _propTypes["default"].arrayOf(_propTypes["default"].string),
    halfChecked: _propTypes["default"].arrayOf(_propTypes["default"].string)
  })]),
  defaultCheckedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  selectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  defaultSelectedKeys: _propTypes["default"].arrayOf(_propTypes["default"].string),
  onExpand: _propTypes["default"].func,
  onCheck: _propTypes["default"].func,
  onSelect: _propTypes["default"].func,
  loadData: _propTypes["default"].func,
  style: _propTypes["default"].object,
  filterTreeNode: _propTypes["default"].func,
  children: _propTypes["default"].node,
  switcherIcon: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].func]),
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Tree, "defaultProps", {
  prefixCls: 'new-fc-one-tree',
  checkable: false,
  showIcon: false,
  checkStrictly: false,
  size: 'small'
});

module.exports = exports.default;