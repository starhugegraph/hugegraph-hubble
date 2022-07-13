"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _addEventListener = _interopRequireDefault(require("rc-util/lib/Dom/addEventListener"));

var _affix = _interopRequireDefault(require("../affix"));

var _anchorTools = require("../../core/anchorTools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Anchor =
/*#__PURE__*/
function (_PureComponent) {
  _inheritsLoose(Anchor, _PureComponent);

  function Anchor() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _PureComponent.call.apply(_PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "links", []);

    _defineProperty(_assertThisInitialized(_this), "state", {
      activeLink: null
    });

    _defineProperty(_assertThisInitialized(_this), "getChildContext", function () {
      var oneAnchor = {
        registerLink: function registerLink(link) {
          if (!_this.links.includes(link)) {
            _this.links.push(link);
          }
        },
        unregisterLink: function unregisterLink(link) {
          var index = _this.links.indexOf(link);

          if (index !== -1) {
            _this.links.splice(index, 1);
          }
        },
        activeLink: _this.state.activeLink,
        scrollTo: _this.handleScrollTo,
        onClick: _this.props.onClick
      };
      return {
        oneAnchor: oneAnchor
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleScroll", function () {
      if (_this.animating) {
        return;
      }

      var activeLink = _this.state.activeLink;
      var _this$props = _this.props,
          offsetTop = _this$props.offsetTop,
          bounds = _this$props.bounds;

      var currentActiveLink = _this.getCurrentAnchor(offsetTop, bounds);

      if (activeLink !== currentActiveLink) {
        _this.setState({
          activeLink: currentActiveLink
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleScrollTo", function (link) {
      var _this$props2 = _this.props,
          offsetTop = _this$props2.offsetTop,
          getContainer = _this$props2.getContainer;
      _this.animating = true;

      _this.setState({
        activeLink: link
      });

      (0, _anchorTools.scrollToDom)(link, offsetTop, getContainer, function () {
        _this.animating = false;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCurrentAnchor", function (offsetTop, bounds) {
      if (offsetTop === void 0) {
        offsetTop = 0;
      }

      if (bounds === void 0) {
        bounds = 5;
      }

      var activeLink = '';

      if (typeof document === 'undefined') {
        return activeLink;
      }

      var linkSections = [];
      var getContainer = _this.props.getContainer;
      var container = getContainer();

      _this.links.forEach(function (link) {
        var sharpLinkMatch = _anchorTools.sharpMatcherRegx.exec(link.toString());

        if (!sharpLinkMatch) {
          return;
        }

        var target = document.getElementById(sharpLinkMatch[1]);

        if (target) {
          var top = (0, _anchorTools.getOffsetTop)(target, container);

          if (top < offsetTop + bounds) {
            linkSections.push({
              link: link,
              top: top
            });
          }
        }
      });

      if (linkSections.length) {
        var maxSection = linkSections.reduce(function (prev, curr) {
          return curr.top > prev.top ? curr : prev;
        });
        return maxSection.link;
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "updateInk", function () {
      if (typeof document === 'undefined') {
        return;
      }

      var prefixCls = _this.prefixCls;

      var anchorNode = _reactDom["default"].findDOMNode(_assertThisInitialized(_this));

      var linkNode = anchorNode.getElementsByClassName(prefixCls + "-link-title-active")[0];

      if (linkNode) {
        _this.inkNode.style.top = linkNode.offsetTop + linkNode.clientHeight / 2 - 4.5 + "px";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveInkNode", function (node) {
      _this.inkNode = node;
    });

    return _this;
  }

  var _proto = Anchor.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var getContainer = this.props.getContainer;
    this.scrollContainer = getContainer();
    this.scrollEvent = (0, _addEventListener["default"])(this.scrollContainer, 'scroll', this.handleScroll);
    this.handleScroll();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    if (this.scrollEvent) {
      var getContainer = this.props.getContainer;
      var currentContainer = getContainer();

      if (this.scrollContainer !== currentContainer) {
        this.scrollContainer = currentContainer;
        this.scrollEvent.remove();
        this.scrollEvent = (0, _addEventListener["default"])(this.scrollContainer, 'scroll', this.handleScroll);
        this.handleScroll();
      }
    }

    this.updateInk();
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        prefixCls = _this$props3.prefixCls,
        className = _this$props3.className,
        style = _this$props3.style,
        offsetTop = _this$props3.offsetTop,
        affix = _this$props3.affix,
        children = _this$props3.children,
        getContainer = _this$props3.getContainer,
        size = _this$props3.size;
    var wrapperClass = (0, _classnames["default"])(className, prefixCls + "-wrapper");
    var anchorClassName = (0, _classnames["default"])(prefixCls, prefixCls + "-" + size);

    var wrapperStyle = _extends({
      maxHeight: offsetTop ? "calc(100vh - " + offsetTop + "px)" : '100vh'
    }, style);

    var anchorContent = _react["default"].createElement("div", {
      className: wrapperClass,
      style: wrapperStyle
    }, _react["default"].createElement("div", {
      className: anchorClassName
    }, children && children.map(function (child, index) {
      var childProps = _extends({}, child.props, {
        key: child.key || index,
        className: prefixCls + "-first-level",
        size: size
      });

      return (0, _react.cloneElement)(child, childProps);
    })));

    return !affix ? anchorContent : _react["default"].createElement(_affix["default"], {
      offsetTop: offsetTop,
      target: getContainer
    }, anchorContent);
  };

  return Anchor;
}(_react.PureComponent);

_defineProperty(Anchor, "propTypes", {
  prefixCls: _propTypes["default"].string,
  className: _propTypes["default"].string,
  style: _propTypes["default"].object,
  offsetTop: _propTypes["default"].number,
  affix: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  getContainer: _propTypes["default"].func,
  onClick: _propTypes["default"].func,
  bounds: _propTypes["default"].number,
  size: _propTypes["default"].oneOf(['small', 'medium'])
});

_defineProperty(Anchor, "defaultProps", {
  prefixCls: 'new-fc-one-anchor',
  className: '',
  style: {},
  affix: true,
  getContainer: function getContainer() {
    return window;
  },
  onClick: function onClick() {},
  bounds: 5,
  offsetTop: 0,
  size: 'small'
});

_defineProperty(Anchor, "childContextTypes", {
  oneAnchor: _propTypes["default"].object
});

(0, _reactLifecyclesCompat.polyfill)(Anchor);
var _default = Anchor;
exports["default"] = _default;
module.exports = exports.default;