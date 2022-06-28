"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _partial = _interopRequireDefault(require("lodash/partial"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _lineNode = _interopRequireDefault(require("./common/lineNode"));

var _cardNode = _interopRequireDefault(require("./common/cardNode"));

var _scrollBar = _interopRequireDefault(require("./common/scrollBar"));

var _scrollContainer = _interopRequireDefault(require("./common/scrollContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tabs =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Tabs, _PureComponent);

  function Tabs(_props) {
    var _this;

    _this = _PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClick", function (key, props) {
      if (props.disabled) {
        return;
      }

      if (!('activeKey' in _this.props)) {
        // 非受控
        _this.setState({
          activeKey: key
        });
      }

      _this.props.onTabClick(key);

      _this.onChange(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onDelete", function (key, props, e) {
      if (props.disabled) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      _this.props.onDelete(key);
    });

    _defineProperty(_assertThisInitialized(_this), "onAdd", function () {
      _this.props.onAdd(_this.state.activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (currentKey) {
      if (_this.state.activeKey !== currentKey) {
        _this.props.onChange(currentKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function () {
      var newTitleChildren = [];
      var newPaneChildren = [];
      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          size = _this$props.size,
          type = _this$props.type;
      var activeKey = _this.state.activeKey;

      _react["default"].Children.forEach(children, function (child) {
        var _classNames;

        var _child$props = child.props,
            props = _child$props === void 0 ? {} : _child$props,
            key = child.key;

        var nodeProps = _extends({}, props, {
          key: key,
          currentKey: key,
          activeKey: activeKey,
          prefixCls: prefixCls,
          size: size,
          onClick: (0, _partial["default"])(_this.onClick, key, props),
          onDelete: (0, _partial["default"])(_this.onDelete, key, props)
        });

        var LineNodeDom = type === 'line' ? _react["default"].createElement(_lineNode["default"], nodeProps) : _react["default"].createElement(_cardNode["default"], nodeProps);
        newTitleChildren.push(LineNodeDom);
        var paneClassName = (0, _classnames["default"])(prefixCls + "-tab-pane", (_classNames = {}, _classNames[prefixCls + "-tab-pane-is-active"] = activeKey === key, _classNames[prefixCls + "-tab-pane-is-inactive"] = activeKey !== key, _classNames));
        newPaneChildren.push(_react["default"].createElement("div", {
          key: key,
          className: paneClassName
        }, child));
      });

      return {
        newTitleChildren: newTitleChildren,
        newPaneChildren: newPaneChildren
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getScrollBarRef", function (ref) {
      _this.scrollBarRef = ref;
    });

    var _activeKey = _props.activeKey || _props.defaultActiveKey || null;

    _this.state = {
      activeKey: _activeKey
    };
    return _this;
  }

  var _proto = Tabs.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        size = _this$props2.size,
        className = _this$props2.className,
        type = _this$props2.type,
        showAdd = _this$props2.showAdd,
        showAddDisabled = _this$props2.showAddDisabled,
        onNextClick = _this$props2.onNextClick,
        onPrevClick = _this$props2.onPrevClick,
        addButtonText = _this$props2.addButtonText;
    var activeKey = this.state.activeKey;
    var tabsClassNames = (0, _classnames["default"])(prefixCls, prefixCls + "-" + size, prefixCls + "-" + type, className);

    var _this$renderChildren = this.renderChildren(),
        newTitleChildren = _this$renderChildren.newTitleChildren,
        newPaneChildren = _this$renderChildren.newPaneChildren;

    return _react["default"].createElement("div", {
      className: tabsClassNames
    }, _react["default"].createElement(_scrollBar["default"], {
      content: newTitleChildren,
      prefixCls: prefixCls,
      showAdd: showAdd,
      type: type,
      onAdd: this.onAdd,
      activeKey: activeKey,
      showAddDisabled: showAddDisabled,
      ref: this.getScrollBarRef,
      onNextClick: onNextClick,
      onPrevClick: onPrevClick,
      addButtonText: addButtonText
    }), _react["default"].createElement(_scrollContainer["default"], {
      content: newPaneChildren,
      prefixCls: prefixCls,
      title: newTitleChildren,
      activeKey: activeKey
    }));
  };

  return Tabs;
}(_react.PureComponent);

_defineProperty(Tabs, "propTypes", {
  /** 类名前缀 */
  prefixCls: _propTypes["default"].string,

  /** 开关的样式 */
  size: _propTypes["default"].oneOf(['small', 'medium']),

  /** 自定义类名 */
  className: _propTypes["default"].string,

  /** 当前被选中的key - 受控 */
  activeKey: _propTypes["default"].string,

  /** 默认当前被选中的key - 非受控 */
  defaultActiveKey: _propTypes["default"].string,

  /** 是否展示添加按钮 */
  showAdd: _propTypes["default"].bool,
  type: _propTypes["default"].oneOf(['line', 'card']),
  onChange: _propTypes["default"].func,
  onNextClick: _propTypes["default"].func,
  onPrevClick: _propTypes["default"].func,
  onTabClick: _propTypes["default"].func,
  children: _propTypes["default"].node,
  showAddDisabled: _propTypes["default"].bool,
  onDelete: _propTypes["default"].func,
  onAdd: _propTypes["default"].func,

  /** 线性按钮支持自定义添加按钮文案 */
  addButtonText: _propTypes["default"].string
});

_defineProperty(Tabs, "defaultProps", {
  prefixCls: 'new-fc-one-tabs',
  className: '',
  size: 'small',
  showAdd: false,
  type: 'line',
  onTabClick: function onTabClick() {},
  onChange: function onChange() {},
  onDelete: function onDelete() {},
  onAdd: function onAdd() {},
  showAddDisabled: false,
  addButtonText: '添加标签'
});

_defineProperty(Tabs, "getDerivedStateFromProps", function (nextProps, prevState) {
  var newState = {};

  if ('activeKey' in nextProps && nextProps.activeKey !== prevState.activeKey) {
    newState.activeKey = nextProps.activeKey;
  }

  return newState;
});

(0, _reactLifecyclesCompat.polyfill)(Tabs);
var _default = Tabs;
exports["default"] = _default;
module.exports = exports.default;