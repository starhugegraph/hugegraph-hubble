"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactIs = require("react-is");

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatActiveKeyArray = function formatActiveKeyArray(activeKey) {
  var currentKey = activeKey;

  if (!Array.isArray(currentKey)) {
    currentKey = currentKey ? [currentKey] : [];
  }

  return currentKey;
};

var Collapse =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Collapse, _Component);

  function Collapse(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "onClickItem", function (key) {
      // 判断是否是手风琴折叠面板
      var activeKey = _this.state.activeKey;
      var isAccordion = _this.props.accordion;

      if (isAccordion) {
        // 选择已打开的面板 => 关闭，选择其他 => 打开面板，关闭已选择的，是全局永远只有一个打开面板
        activeKey = activeKey[0] === key ? [] : [key];
      } else {
        activeKey = [].concat(activeKey);
        var index = activeKey.indexOf(key);
        var isActive = index > -1;

        if (isActive) {
          activeKey.splice(index, 1);
        } else {
          activeKey.push(key);
        }
      }

      if (!('activeKey' in _this.props)) {
        _this.setState({
          activeKey: activeKey
        });
      }

      _this.props.onChange(isAccordion ? activeKey[0] : activeKey);
    });

    _defineProperty(_assertThisInitialized(_this), "renderPanel", function () {
      var activeKey = _this.state.activeKey;
      var _this$props = _this.props,
          children = _this$props.children,
          prefixCls = _this$props.prefixCls,
          accordion = _this$props.accordion,
          destroyNotActivePanel = _this$props.destroyNotActivePanel;
      var childList = (0, _reactIs.isFragment)(children) ? children.props.children : children;

      var newChildren = _react.Children.map(childList, function (child, index) {
        if (!child) {
          return null;
        } // 如果没有key，就用index索引做key


        var key = child.key || String(index);
        var _child$props = child.props,
            header = _child$props.header,
            headerClass = _child$props.headerClass,
            disabled = _child$props.disabled;
        var isActive = false;

        if (accordion) {
          isActive = activeKey[0] === key;
        } else {
          isActive = activeKey.indexOf(key) > -1;
        }

        var props = {
          key: key,
          panelKey: key,
          header: header,
          prefixCls: prefixCls,
          children: child.props.children,
          onItemClick: _this.onClickItem,
          headerClass: headerClass,
          isActive: isActive,
          destroyNotActivePanel: destroyNotActivePanel,
          accordion: accordion,
          disabled: _this.props.disabled || disabled,
          id: key
        };
        return _react["default"].cloneElement(child, props);
      });

      if ((0, _reactIs.isFragment)(children)) {
        return _react["default"].createElement(_react["default"].Fragment, null, newChildren);
      }

      return newChildren;
    });

    var _activeKey = _props.activeKey,
        defaultActiveKey = _props.defaultActiveKey;
    var currentKey = defaultActiveKey; // 处理受控非受控情况

    if ('activeKey' in _props) {
      currentKey = _activeKey;
    }

    _this.state = {
      activeKey: formatActiveKeyArray(currentKey)
    };
    return _this;
  }

  Collapse.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    // 判断受控情况
    if ('activeKey' in nextProps) {
      return {
        activeKey: formatActiveKeyArray(nextProps.activeKey)
      };
    }

    return null;
  };

  var _proto = Collapse.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return !(0, _shallowequal["default"])(this.props, nextProps) || !(0, _shallowequal["default"])(this.state, nextState);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        prefixCls = _this$props2.prefixCls,
        className = _this$props2.className,
        style = _this$props2.style,
        size = _this$props2.size;
    var collapseClassName = (0, _classnames["default"])(prefixCls, className, [prefixCls + "-" + size]);
    return _react["default"].createElement("div", {
      className: collapseClassName,
      style: style
    }, this.renderPanel());
  };

  return Collapse;
}(_react.Component);

_defineProperty(Collapse, "propTypes", {
  size: _propTypes["default"].oneOf(['small', 'medium']),
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  disabled: _propTypes["default"].bool,
  defaultActiveKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  activeKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]),
  onChange: _propTypes["default"].func,
  accordion: _propTypes["default"].bool,
  destroyNotActivePanel: _propTypes["default"].bool,
  children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].string, _propTypes["default"].number])
});

_defineProperty(Collapse, "defaultProps", {
  prefixCls: 'new-fc-one-collapse',
  className: '',
  style: {},
  size: 'small',
  onChange: function onChange() {}
});

(0, _reactLifecyclesCompat.polyfill)(Collapse);
var _default = Collapse;
exports["default"] = _default;
module.exports = exports.default;