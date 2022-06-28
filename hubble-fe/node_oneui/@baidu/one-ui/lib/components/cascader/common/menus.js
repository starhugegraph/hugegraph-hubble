"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _arrayTreeFilter = _interopRequireDefault(require("array-tree-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Menu =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Menu, _Component);

  function Menu(props) {
    var _this;

    _this = _Component.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "saveMenuItem", function (index) {
      return function (node) {
        _this.menuItems[index] = node;
      };
    });

    _this.menuItems = {};
    return _this;
  }

  var _proto = Menu.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.scrollActiveItemToView();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.scrollActiveItemToView();
    }
  };

  _proto.getFieldName = function getFieldName(name) {
    var _this$props = this.props,
        fieldNames = _this$props.fieldNames,
        defaultFieldNames = _this$props.defaultFieldNames; // 防止只设置单个属性的名字

    return fieldNames[name] || defaultFieldNames[name];
  };

  _proto.getOption = function getOption(option, menuIndex) {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        expandTrigger = _this$props2.expandTrigger,
        expandIcon = _this$props2.expandIcon,
        loadingIcon = _this$props2.loadingIcon;
    var onSelect = this.props.onSelect.bind(this, option, menuIndex);
    var onItemDoubleClick = this.props.onItemDoubleClick.bind(this, option, menuIndex);
    var expandProps = {
      onClick: onSelect,
      onDoubleClick: onItemDoubleClick
    };
    var menuItemCls = prefixCls + "-menu-item";
    var expandIconNode = null;
    var hasChildren = option[this.getFieldName('children')] && option[this.getFieldName('children')].length > 0;

    if (hasChildren || option.isLeaf === false) {
      menuItemCls += " " + prefixCls + "-menu-item-expand";

      if (!option.loading) {
        expandIconNode = _react["default"].createElement("span", {
          className: prefixCls + "-menu-item-expand-icon"
        }, expandIcon);
      }
    }

    if (expandTrigger === 'hover' && hasChildren) {
      expandProps = {
        onMouseEnter: this.delayOnSelect.bind(this, onSelect),
        onMouseLeave: this.delayOnSelect.bind(this),
        onClick: onSelect
      };
    }

    if (this.isActiveOption(option, menuIndex)) {
      menuItemCls += " " + prefixCls + "-menu-item-active";
      expandProps.ref = this.saveMenuItem(menuIndex);
    }

    if (option.disabled) {
      menuItemCls += " " + prefixCls + "-menu-item-disabled";
    }

    var loadingIconNode = null;

    if (option.loading) {
      menuItemCls += " " + prefixCls + "-menu-item-loading";
      loadingIconNode = loadingIcon || null;
    }

    var title = '';

    if (option.title) {
      title = option.title;
    } else if (typeof option[this.getFieldName('label')] === 'string') {
      title = option[this.getFieldName('label')];
    }

    return _react["default"].createElement("li", _extends({
      key: option[this.getFieldName('value')],
      className: menuItemCls,
      title: title
    }, expandProps), option[this.getFieldName('label')], option[this.getFieldName('icon')] ? _react["default"].createElement("span", {
      style: {
        marginLeft: 15
      }
    }, option[this.getFieldName('icon')]) : null, expandIconNode, loadingIconNode);
  };

  _proto.getActiveOptions = function getActiveOptions(values) {
    var _this2 = this;

    var activeValue = values || this.props.activeValue;
    var options = this.props.options;
    return (0, _arrayTreeFilter["default"])(options, function (o, level) {
      return o[_this2.getFieldName('value')] === activeValue[level];
    }, {
      childrenKeyName: this.getFieldName('children')
    });
  };

  _proto.getShowOptions = function getShowOptions() {
    var _this3 = this;

    var options = this.props.options;
    var result = this.getActiveOptions().map(function (activeOption) {
      return activeOption[_this3.getFieldName('children')];
    }).filter(function (activeOption) {
      return !!activeOption;
    });
    result.unshift(options);
    return result;
  };

  _proto.delayOnSelect = function delayOnSelect(onSelect) {
    var _this4 = this;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }

    if (typeof onSelect === 'function') {
      this.delayTimer = setTimeout(function () {
        onSelect(args);
        _this4.delayTimer = null;
      }, 150);
    }
  };

  _proto.scrollActiveItemToView = function scrollActiveItemToView() {
    // scroll into view
    var optionsLength = this.getShowOptions().length;

    for (var i = 0; i < optionsLength; i++) {
      var itemComponent = this.menuItems[i];

      if (itemComponent) {
        var target = (0, _reactDom.findDOMNode)(itemComponent);
        target.parentNode.scrollTop = target.offsetTop;
      }
    }
  };

  _proto.isActiveOption = function isActiveOption(option, menuIndex) {
    var _this$props$activeVal = this.props.activeValue,
        activeValue = _this$props$activeVal === void 0 ? [] : _this$props$activeVal;
    return activeValue[menuIndex] === option[this.getFieldName('value')];
  };

  _proto.render = function render() {
    var _this5 = this;

    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        dropdownMenuColumnStyle = _this$props3.dropdownMenuColumnStyle;
    return _react["default"].createElement("div", null, this.getShowOptions().map(function (options, menuIndex) {
      return _react["default"].createElement("ul", {
        className: prefixCls + "-menu",
        key: menuIndex,
        style: dropdownMenuColumnStyle
      }, options.map(function (option) {
        return _this5.getOption(option, menuIndex);
      }));
    }));
  };

  return Menu;
}(_react.Component);

exports["default"] = Menu;

_defineProperty(Menu, "propTypes", {
  value: _propTypes["default"].array,
  activeValue: _propTypes["default"].array,
  options: _propTypes["default"].array,
  prefixCls: _propTypes["default"].string,
  expandTrigger: _propTypes["default"].string,
  onSelect: _propTypes["default"].func,
  visible: _propTypes["default"].bool,
  dropdownMenuColumnStyle: _propTypes["default"].object,
  defaultFieldNames: _propTypes["default"].object,
  fieldNames: _propTypes["default"].object,
  expandIcon: _propTypes["default"].node,
  loadingIcon: _propTypes["default"].node,
  onItemDoubleClick: _propTypes["default"].func
});

_defineProperty(Menu, "defaultProps", {
  options: [],
  value: [],
  activeValue: [],
  onSelect: function onSelect() {},
  prefixCls: 'rc-cascader-menus',
  visible: false,
  expandTrigger: 'click'
});

module.exports = exports.default;