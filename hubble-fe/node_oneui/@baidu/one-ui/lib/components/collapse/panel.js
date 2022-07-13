"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _shallowequal = _interopRequireDefault(require("shallowequal"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _oneUiIcon = require("@baidu/one-ui-icon");

var _content = _interopRequireDefault(require("./common/content"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CollapsePanel =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(CollapsePanel, _Component);

  function CollapsePanel() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      focused: false
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      _this.setState({
        focused: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onItemClick", function () {
      var _this$props = _this.props,
          onItemClick = _this$props.onItemClick,
          panelKey = _this$props.panelKey,
          disabled = _this$props.disabled;

      if (disabled) {
        return;
      }

      if (typeof onItemClick === 'function') {
        onItemClick(panelKey);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyPress", function (e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.which === 13 || e.key === ' ' || e.which === 32 || e.keyCode === 32) {
        // tab和确认
        _this.onItemClick();

        _this.setState({
          focused: true
        });
      }
    });

    return _this;
  }

  var _proto = CollapsePanel.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !(0, _shallowequal["default"])(this.props, nextProps);
  } // 点击事件
  ;

  _proto.render = function render() {
    var _classNames, _classNames2;

    var _this$props2 = this.props,
        className = _this$props2.className,
        id = _this$props2.id,
        style = _this$props2.style,
        prefixCls = _this$props2.prefixCls,
        header = _this$props2.header,
        headerClass = _this$props2.headerClass,
        children = _this$props2.children,
        isActive = _this$props2.isActive,
        disabled = _this$props2.disabled,
        destroyNotActivePanel = _this$props2.destroyNotActivePanel,
        accordion = _this$props2.accordion,
        renderDomWhenHide = _this$props2.renderDomWhenHide;
    var headerCls = (0, _classnames["default"])(prefixCls + "-item-header", (_classNames = {}, _classNames[headerClass] = headerClass, _classNames));
    var itemCls = (0, _classnames["default"])(prefixCls + "-item", (_classNames2 = {}, _classNames2[prefixCls + "-item-active"] = isActive, _classNames2[prefixCls + "-item-not-active"] = !isActive, _classNames2[prefixCls + "-item-disabled"] = disabled, _classNames2[prefixCls + "-item-focused"] = this.state.focused, _classNames2), className);
    var iconNode = isActive ? _react["default"].createElement(_oneUiIcon.IconChevronDown, null) : _react["default"].createElement(_oneUiIcon.IconChevronRight, null);
    return _react["default"].createElement("div", {
      className: itemCls,
      style: style,
      id: id
    }, _react["default"].createElement("div", {
      className: headerCls,
      onClick: this.onItemClick,
      onKeyPress: this.onKeyPress,
      "data-type": accordion ? 'accordion' : 'normal',
      tabIndex: id,
      onBlur: this.onBlur
    }, iconNode, header || null), _react["default"].createElement(_content["default"], {
      prefixCls: prefixCls,
      isActive: isActive,
      destroyNotActivePanel: destroyNotActivePanel,
      renderDomWhenHide: renderDomWhenHide
    }, children));
  };

  return CollapsePanel;
}(_react.Component);

exports["default"] = CollapsePanel;

_defineProperty(CollapsePanel, "propTypes", {
  className: _propTypes["default"].string,
  prefixCls: _propTypes["default"].string,
  id: _propTypes["default"].string,
  children: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].node, _propTypes["default"].number]),
  header: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number, _propTypes["default"].node]),
  isActive: _propTypes["default"].bool,
  onItemClick: _propTypes["default"].func,
  headerClass: _propTypes["default"].string,
  style: _propTypes["default"].object,
  panelKey: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  disabled: _propTypes["default"].bool,
  destroyNotActivePanel: _propTypes["default"].bool,
  accordion: _propTypes["default"].bool,
  // 隐藏的时候渲染dom
  renderDomWhenHide: _propTypes["default"].bool
});

_defineProperty(CollapsePanel, "defaultProps", {
  isActive: false,
  onItemClick: function onItemClick() {},
  headerClass: '',
  prefixCls: 'new-fc-one-collapse',
  disabled: false,
  style: {},
  destroyNotActivePanel: false,
  accordion: false,
  renderDomWhenHide: false
});

module.exports = exports.default;