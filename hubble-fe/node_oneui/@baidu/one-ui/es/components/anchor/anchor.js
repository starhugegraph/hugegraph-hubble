function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import { polyfill } from 'react-lifecycles-compat';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import Affix from '../affix';
import { sharpMatcherRegx, scrollToDom, getOffsetTop } from '../../core/anchorTools';

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

      scrollToDom(link, offsetTop, getContainer, function () {
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
        var sharpLinkMatch = sharpMatcherRegx.exec(link.toString());

        if (!sharpLinkMatch) {
          return;
        }

        var target = document.getElementById(sharpLinkMatch[1]);

        if (target) {
          var top = getOffsetTop(target, container);

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
      var anchorNode = ReactDOM.findDOMNode(_assertThisInitialized(_this));
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
    this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
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
        this.scrollEvent = addEventListener(this.scrollContainer, 'scroll', this.handleScroll);
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
    var wrapperClass = classNames(className, prefixCls + "-wrapper");
    var anchorClassName = classNames(prefixCls, prefixCls + "-" + size);

    var wrapperStyle = _extends({
      maxHeight: offsetTop ? "calc(100vh - " + offsetTop + "px)" : '100vh'
    }, style);

    var anchorContent = React.createElement("div", {
      className: wrapperClass,
      style: wrapperStyle
    }, React.createElement("div", {
      className: anchorClassName
    }, children && children.map(function (child, index) {
      var childProps = _extends({}, child.props, {
        key: child.key || index,
        className: prefixCls + "-first-level",
        size: size
      });

      return cloneElement(child, childProps);
    })));
    return !affix ? anchorContent : React.createElement(Affix, {
      offsetTop: offsetTop,
      target: getContainer
    }, anchorContent);
  };

  return Anchor;
}(PureComponent);

_defineProperty(Anchor, "propTypes", {
  prefixCls: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  offsetTop: PropTypes.number,
  affix: PropTypes.bool,
  children: PropTypes.node,
  getContainer: PropTypes.func,
  onClick: PropTypes.func,
  bounds: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium'])
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
  oneAnchor: PropTypes.object
});

polyfill(Anchor);
export default Anchor;